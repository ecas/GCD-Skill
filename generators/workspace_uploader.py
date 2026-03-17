"""
GCP Sales Enablement — Google Workspace Provisioner
====================================================
Creates an entire demo environment directly in a Google Workspace account:
  - Google Slides presentations (native, not PPTX)
  - Google Docs (formatted)
  - Google Sheets (with headers, data, conditional formatting)
  - Calendar events (with Meet links, attendees NOT notified)
  - Gmail drafts (NOT sent — seller reviews before sending)
  - Drive folder structure

Usage:
  python workspace_uploader.py provision --config /tmp/config.json        # dry run
  python workspace_uploader.py provision --config /tmp/config.json --execute
  python workspace_uploader.py slides   --config /tmp/slides_config.json
  python workspace_uploader.py cleanup  --manifest /tmp/config_manifest.json
  python workspace_uploader.py          # generates /tmp/demo_config.json sample
"""

from __future__ import annotations

import argparse
import base64
import email as email_lib
import json
import os
import pickle
import sys
import uuid
from email.mime.text import MIMEText
from typing import Any

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

# ---------------------------------------------------------------------------
# Auth
# ---------------------------------------------------------------------------

SCOPES = [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/documents",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/presentations",
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/gmail.compose",
]

# Google brand colours used across slide templates
_GOOGLE_BLUE = {"red": 0.259, "green": 0.522, "blue": 0.957}
_DARK_BLUE = {"red": 0.067, "green": 0.224, "blue": 0.451}
_GOOGLE_GREEN = {"red": 0.204, "green": 0.659, "blue": 0.325}
_GOOGLE_RED = {"red": 0.859, "green": 0.204, "blue": 0.204}
_GOOGLE_YELLOW = {"red": 0.988, "green": 0.729, "blue": 0.012}
_WHITE = {"red": 1.0, "green": 1.0, "blue": 1.0}
_LIGHT_GREY = {"red": 0.953, "green": 0.953, "blue": 0.953}
_MID_GREY = {"red": 0.6, "green": 0.6, "blue": 0.6}
_DARK_TEXT = {"red": 0.133, "green": 0.133, "blue": 0.133}


def get_credentials(
    credentials_file: str = "credentials.json",
    token_file: str = "token.pickle",
) -> Credentials:
    """Authenticate via OAuth2. Opens browser on first run.

    Args:
        credentials_file: Path to the OAuth client secrets JSON downloaded from
            Google Cloud Console > APIs & Credentials > OAuth 2.0 Client ID.
        token_file: Path where the obtained token will be cached between runs.

    Returns:
        Valid Google OAuth2 Credentials object.
    """
    creds: Credentials | None = None

    if os.path.exists(token_file):
        with open(token_file, "rb") as fh:
            creds = pickle.load(fh)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not os.path.exists(credentials_file):
                print(f"ERROR: {credentials_file} not found.")
                print(
                    "   Download it from Google Cloud Console > "
                    "APIs & Credentials > OAuth 2.0 Client ID"
                )
                print(
                    "   See: https://developers.google.com/workspace/guides/create-credentials"
                )
                sys.exit(1)
            flow = InstalledAppFlow.from_client_secrets_file(credentials_file, SCOPES)
            creds = flow.run_local_server(port=0)

        with open(token_file, "wb") as fh:
            pickle.dump(creds, fh)

    return creds


def _get_current_user(creds: Credentials) -> str:
    """Returns the email address of the currently authenticated user."""
    service = build("oauth2", "v2", credentials=creds)
    info = service.userinfo().get().execute()
    return info.get("email", "unknown")


# ---------------------------------------------------------------------------
# Internal helpers — Slides API request builders
# ---------------------------------------------------------------------------

def _emu(pt: float) -> int:
    """Converts points to EMU (English Metric Units). 1 pt = 12700 EMU."""
    return int(pt * 12700)


def _pt_size(pt_val: float) -> dict[str, Any]:
    return {"magnitude": pt_val, "unit": "PT"}


def _rgb(color: dict[str, float]) -> dict[str, Any]:
    return {"rgbColor": color}


def _solid_fill(color: dict[str, float]) -> dict[str, Any]:
    return {"solidFill": {"color": _rgb(color)}}


def _text_style(
    *,
    bold: bool = False,
    italic: bool = False,
    font_size: float | None = None,
    color: dict[str, float] | None = None,
    font_family: str = "Google Sans",
) -> dict[str, Any]:
    style: dict[str, Any] = {
        "bold": bold,
        "italic": italic,
        "fontFamily": font_family,
    }
    if font_size is not None:
        style["fontSize"] = _pt_size(font_size)
    if color is not None:
        style["foregroundColor"] = _rgb(color)
    return style


def _size(width_pt: float, height_pt: float) -> dict[str, Any]:
    return {
        "width": _pt_size(width_pt),
        "height": _pt_size(height_pt),
    }


def _translate(x_pt: float, y_pt: float) -> dict[str, Any]:
    return {"translateX": _emu(x_pt), "translateY": _emu(y_pt)}


def _transform(x_pt: float, y_pt: float) -> dict[str, Any]:
    return {
        "scaleX": 1,
        "scaleY": 1,
        "translateX": _emu(x_pt),
        "translateY": _emu(y_pt),
        "unit": "EMU",
    }


def _new_id() -> str:
    return "obj_" + uuid.uuid4().hex[:12]


def _req_create_slide(slide_id: str, layout: str = "BLANK") -> dict[str, Any]:
    return {
        "createSlide": {
            "objectId": slide_id,
            "slideLayoutReference": {"predefinedLayout": layout},
            "placeholderIdMappings": [],
        }
    }


def _req_create_shape(
    obj_id: str,
    slide_id: str,
    shape_type: str,
    x_pt: float,
    y_pt: float,
    w_pt: float,
    h_pt: float,
) -> dict[str, Any]:
    return {
        "createShape": {
            "objectId": obj_id,
            "shapeType": shape_type,
            "elementProperties": {
                "pageObjectId": slide_id,
                "size": _size(w_pt, h_pt),
                "transform": _transform(x_pt, y_pt),
            },
        }
    }


def _req_insert_text(obj_id: str, text: str, insertion_index: int = 0) -> dict[str, Any]:
    return {
        "insertText": {
            "objectId": obj_id,
            "insertionIndex": insertion_index,
            "text": text,
        }
    }


def _req_update_text_style(
    obj_id: str,
    style: dict[str, Any],
    start: int = 0,
    end: int | None = None,
) -> dict[str, Any]:
    fields = ", ".join(
        k for k in ["bold", "italic", "fontSize", "foregroundColor", "fontFamily"]
        if k in style
    )
    req: dict[str, Any] = {
        "updateTextStyle": {
            "objectId": obj_id,
            "style": style,
            "fields": fields,
        }
    }
    if end is not None:
        req["updateTextStyle"]["textRange"] = {
            "type": "FIXED_RANGE",
            "startIndex": start,
            "endIndex": end,
        }
    else:
        req["updateTextStyle"]["textRange"] = {"type": "ALL"}
    return req


def _req_update_shape_bg(obj_id: str, color: dict[str, float]) -> dict[str, Any]:
    return {
        "updateShapeProperties": {
            "objectId": obj_id,
            "fields": "shapeBackgroundFill",
            "shapeProperties": {
                "shapeBackgroundFill": _solid_fill(color),
            },
        }
    }


def _req_update_shape_no_border(obj_id: str) -> dict[str, Any]:
    return {
        "updateShapeProperties": {
            "objectId": obj_id,
            "fields": "outline",
            "shapeProperties": {
                "outline": {"propertyState": "NOT_RENDERED"},
            },
        }
    }


def _req_para_align(obj_id: str, alignment: str = "CENTER") -> dict[str, Any]:
    return {
        "updateParagraphStyle": {
            "objectId": obj_id,
            "fields": "alignment",
            "style": {"alignment": alignment},
        }
    }


def _req_update_page_bg(slide_id: str, color: dict[str, float]) -> dict[str, Any]:
    return {
        "updatePageProperties": {
            "objectId": slide_id,
            "fields": "pageBackgroundFill",
            "pageProperties": {
                "pageBackgroundFill": _solid_fill(color),
            },
        }
    }


# ---------------------------------------------------------------------------
# Slide type builders — each returns a list of Slides API request dicts
# ---------------------------------------------------------------------------

def _build_slide_title(slide_id: str, cfg: dict[str, Any]) -> list[dict[str, Any]]:
    """Dark blue title slide with company name and subtitle."""
    reqs: list[dict[str, Any]] = [_req_create_slide(slide_id)]
    reqs.append(_req_update_page_bg(slide_id, _DARK_BLUE))

    # Accent bar
    bar_id = _new_id()
    reqs += [
        _req_create_shape(bar_id, slide_id, "RECTANGLE", 0, 290, 720, 6),
        _req_update_shape_bg(bar_id, _GOOGLE_BLUE),
        _req_update_shape_no_border(bar_id),
    ]

    # Title text
    title_id = _new_id()
    title_text = cfg.get("title", "Google Cloud")
    reqs += [
        _req_create_shape(title_id, slide_id, "TEXT_BOX", 60, 130, 600, 100),
        _req_insert_text(title_id, title_text),
        _req_update_text_style(title_id, _text_style(bold=True, font_size=40, color=_WHITE)),
        _req_para_align(title_id, "LEFT"),
    ]

    # Subtitle
    if cfg.get("subtitle"):
        sub_id = _new_id()
        reqs += [
            _req_create_shape(sub_id, slide_id, "TEXT_BOX", 60, 245, 600, 40),
            _req_insert_text(sub_id, cfg["subtitle"]),
            _req_update_text_style(sub_id, _text_style(font_size=18, color=_LIGHT_GREY)),
            _req_para_align(sub_id, "LEFT"),
        ]

    # Footer line
    if cfg.get("footer"):
        foot_id = _new_id()
        reqs += [
            _req_create_shape(foot_id, slide_id, "TEXT_BOX", 60, 320, 600, 28),
            _req_insert_text(foot_id, cfg["footer"]),
            _req_update_text_style(foot_id, _text_style(font_size=11, color=_MID_GREY)),
            _req_para_align(foot_id, "LEFT"),
        ]

    return reqs


def _build_slide_agenda(slide_id: str, cfg: dict[str, Any]) -> list[dict[str, Any]]:
    """Agenda slide — numbered items in two columns."""
    reqs: list[dict[str, Any]] = [_req_create_slide(slide_id)]
    reqs.append(_req_update_page_bg(slide_id, _WHITE))

    # Top accent bar
    bar_id = _new_id()
    reqs += [
        _req_create_shape(bar_id, slide_id, "RECTANGLE", 0, 0, 720, 8),
        _req_update_shape_bg(bar_id, _GOOGLE_BLUE),
        _req_update_shape_no_border(bar_id),
    ]

    # Heading
    h_id = _new_id()
    reqs += [
        _req_create_shape(h_id, slide_id, "TEXT_BOX", 60, 28, 600, 50),
        _req_insert_text(h_id, cfg.get("title", "Agenda")),
        _req_update_text_style(h_id, _text_style(bold=True, font_size=28, color=_DARK_BLUE)),
        _req_para_align(h_id, "LEFT"),
    ]

    items: list[str] = cfg.get("items", [])
    col_size = max(1, (len(items) + 1) // 2)
    for idx, item in enumerate(items):
        col = idx // col_size
        row = idx % col_size
        x = 60 + col * 340
        y = 105 + row * 52

        # Number circle
        num_id = _new_id()
        reqs += [
            _req_create_shape(num_id, slide_id, "ELLIPSE", x, y, 36, 36),
            _req_update_shape_bg(num_id, _GOOGLE_BLUE),
            _req_update_shape_no_border(num_id),
            _req_insert_text(num_id, str(idx + 1)),
            _req_update_text_style(num_id, _text_style(bold=True, font_size=14, color=_WHITE)),
            _req_para_align(num_id, "CENTER"),
        ]

        # Item text
        txt_id = _new_id()
        reqs += [
            _req_create_shape(txt_id, slide_id, "TEXT_BOX", x + 46, y + 4, 280, 32),
            _req_insert_text(txt_id, item),
            _req_update_text_style(txt_id, _text_style(font_size=14, color=_DARK_TEXT)),
            _req_para_align(txt_id, "LEFT"),
        ]

    return reqs


def _build_slide_pain_points(slide_id: str, cfg: dict[str, Any]) -> list[dict[str, Any]]:
    """Three pain-point cards in a row."""
    reqs: list[dict[str, Any]] = [_req_create_slide(slide_id)]
    reqs.append(_req_update_page_bg(slide_id, _LIGHT_GREY))

    bar_id = _new_id()
    reqs += [
        _req_create_shape(bar_id, slide_id, "RECTANGLE", 0, 0, 720, 8),
        _req_update_shape_bg(bar_id, _GOOGLE_RED),
        _req_update_shape_no_border(bar_id),
    ]

    h_id = _new_id()
    reqs += [
        _req_create_shape(h_id, slide_id, "TEXT_BOX", 60, 24, 600, 50),
        _req_insert_text(h_id, cfg.get("title", "Key Challenges")),
        _req_update_text_style(h_id, _text_style(bold=True, font_size=26, color=_DARK_BLUE)),
        _req_para_align(h_id, "LEFT"),
    ]

    cards: list[dict[str, Any]] = cfg.get("cards", [])[:3]
    card_w, card_h = 200, 230
    gap = 20
    total_w = len(cards) * card_w + (len(cards) - 1) * gap
    start_x = (720 - total_w) / 2

    for i, card in enumerate(cards):
        cx = start_x + i * (card_w + gap)
        cy = 100.0

        # Card background
        card_bg_id = _new_id()
        reqs += [
            _req_create_shape(card_bg_id, slide_id, "RECTANGLE", cx, cy, card_w, card_h),
            _req_update_shape_bg(card_bg_id, _WHITE),
            _req_update_shape_no_border(card_bg_id),
        ]

        # Top accent strip on card
        strip_id = _new_id()
        reqs += [
            _req_create_shape(strip_id, slide_id, "RECTANGLE", cx, cy, card_w, 6),
            _req_update_shape_bg(strip_id, _GOOGLE_RED),
            _req_update_shape_no_border(strip_id),
        ]

        # Card title
        ct_id = _new_id()
        reqs += [
            _req_create_shape(ct_id, slide_id, "TEXT_BOX", cx + 12, cy + 18, card_w - 24, 40),
            _req_insert_text(ct_id, card.get("title", "")),
            _req_update_text_style(ct_id, _text_style(bold=True, font_size=14, color=_DARK_BLUE)),
            _req_para_align(ct_id, "LEFT"),
        ]

        # Card body
        cb_id = _new_id()
        reqs += [
            _req_create_shape(cb_id, slide_id, "TEXT_BOX", cx + 12, cy + 68, card_w - 24, 150),
            _req_insert_text(cb_id, card.get("body", "")),
            _req_update_text_style(cb_id, _text_style(font_size=12, color=_DARK_TEXT)),
            _req_para_align(cb_id, "LEFT"),
        ]

    return reqs


def _build_slide_solution_map(slide_id: str, cfg: dict[str, Any]) -> list[dict[str, Any]]:
    """Solution map as a two-column table (Challenge | GCP Product)."""
    reqs: list[dict[str, Any]] = [_req_create_slide(slide_id)]
    reqs.append(_req_update_page_bg(slide_id, _WHITE))

    bar_id = _new_id()
    reqs += [
        _req_create_shape(bar_id, slide_id, "RECTANGLE", 0, 0, 720, 8),
        _req_update_shape_bg(bar_id, _GOOGLE_GREEN),
        _req_update_shape_no_border(bar_id),
    ]

    h_id = _new_id()
    reqs += [
        _req_create_shape(h_id, slide_id, "TEXT_BOX", 60, 24, 600, 48),
        _req_insert_text(h_id, cfg.get("title", "Solution Mapping")),
        _req_update_text_style(h_id, _text_style(bold=True, font_size=26, color=_DARK_BLUE)),
        _req_para_align(h_id, "LEFT"),
    ]

    rows: list[dict[str, Any]] = cfg.get("rows", [])
    row_h = 44
    table_y = 88
    col_widths = [320, 340]

    for i, row in enumerate(rows):
        row_y = table_y + i * row_h
        bg_color = _LIGHT_GREY if i % 2 == 0 else _WHITE

        for j, (text_key, col_x) in enumerate(zip(["challenge", "solution"], [40, 380])):
            cell_id = _new_id()
            bg_id = _new_id()
            cell_color = _DARK_BLUE if i == 0 else bg_color
            text_color = _WHITE if i == 0 else _DARK_TEXT

            reqs += [
                _req_create_shape(bg_id, slide_id, "RECTANGLE", col_x, row_y, col_widths[j], row_h),
                _req_update_shape_bg(bg_id, cell_color),
                _req_update_shape_no_border(bg_id),
                _req_create_shape(cell_id, slide_id, "TEXT_BOX", col_x + 8, row_y + 8, col_widths[j] - 16, row_h - 16),
                _req_insert_text(cell_id, str(row.get(text_key, ""))),
                _req_update_text_style(cell_id, _text_style(bold=(i == 0), font_size=13, color=text_color)),
                _req_para_align(cell_id, "LEFT"),
            ]

    return reqs


def _build_slide_comparison_table(slide_id: str, cfg: dict[str, Any]) -> list[dict[str, Any]]:
    """Three-column comparison: Feature | GCP | Competitor."""
    reqs: list[dict[str, Any]] = [_req_create_slide(slide_id)]
    reqs.append(_req_update_page_bg(slide_id, _WHITE))

    bar_id = _new_id()
    reqs += [
        _req_create_shape(bar_id, slide_id, "RECTANGLE", 0, 0, 720, 8),
        _req_update_shape_bg(bar_id, _GOOGLE_BLUE),
        _req_update_shape_no_border(bar_id),
    ]

    h_id = _new_id()
    reqs += [
        _req_create_shape(h_id, slide_id, "TEXT_BOX", 60, 24, 600, 48),
        _req_insert_text(h_id, cfg.get("title", "Comparison")),
        _req_update_text_style(h_id, _text_style(bold=True, font_size=26, color=_DARK_BLUE)),
        _req_para_align(h_id, "LEFT"),
    ]

    rows: list[dict[str, Any]] = cfg.get("rows", [])
    row_h = 42
    table_y = 88
    cols = [
        ("feature", 30, 240),
        ("gcp", 278, 210),
        ("competitor", 495, 195),
    ]
    header_colors = [_DARK_BLUE, _GOOGLE_BLUE, _MID_GREY]

    for i, row in enumerate(rows):
        row_y = table_y + i * row_h
        for j, (key, x, w) in enumerate(cols):
            cell_id = _new_id()
            bg_id = _new_id()
            if i == 0:
                bg_color = header_colors[j]
                txt_color = _WHITE
                is_bold = True
            else:
                bg_color = _LIGHT_GREY if i % 2 == 0 else _WHITE
                txt_color = _DARK_TEXT
                is_bold = False

            reqs += [
                _req_create_shape(bg_id, slide_id, "RECTANGLE", x, row_y, w, row_h),
                _req_update_shape_bg(bg_id, bg_color),
                _req_update_shape_no_border(bg_id),
                _req_create_shape(cell_id, slide_id, "TEXT_BOX", x + 8, row_y + 6, w - 16, row_h - 12),
                _req_insert_text(cell_id, str(row.get(key, ""))),
                _req_update_text_style(cell_id, _text_style(bold=is_bold, font_size=12, color=txt_color)),
                _req_para_align(cell_id, "LEFT"),
            ]

    return reqs


def _build_slide_customer_proof(slide_id: str, cfg: dict[str, Any]) -> list[dict[str, Any]]:
    """Customer proof slide with 2-3 reference cards."""
    reqs: list[dict[str, Any]] = [_req_create_slide(slide_id)]
    reqs.append(_req_update_page_bg(slide_id, _DARK_BLUE))

    h_id = _new_id()
    reqs += [
        _req_create_shape(h_id, slide_id, "TEXT_BOX", 60, 24, 600, 50),
        _req_insert_text(h_id, cfg.get("title", "Customer References")),
        _req_update_text_style(h_id, _text_style(bold=True, font_size=26, color=_WHITE)),
        _req_para_align(h_id, "LEFT"),
    ]

    references: list[dict[str, Any]] = cfg.get("references", [])[:3]
    ref_w = 200
    gap = 20
    total_w = len(references) * ref_w + (len(references) - 1) * gap
    start_x = (720 - total_w) / 2

    for i, ref in enumerate(references):
        rx = start_x + i * (ref_w + gap)
        ry = 100.0

        bg_id = _new_id()
        reqs += [
            _req_create_shape(bg_id, slide_id, "RECTANGLE", rx, ry, ref_w, 220),
            _req_update_shape_bg(bg_id, {"red": 0.1, "green": 0.25, "blue": 0.48}),
            _req_update_shape_no_border(bg_id),
        ]

        name_id = _new_id()
        reqs += [
            _req_create_shape(name_id, slide_id, "TEXT_BOX", rx + 12, ry + 14, ref_w - 24, 36),
            _req_insert_text(name_id, ref.get("company", "")),
            _req_update_text_style(name_id, _text_style(bold=True, font_size=14, color=_GOOGLE_YELLOW)),
            _req_para_align(name_id, "LEFT"),
        ]

        metric_id = _new_id()
        reqs += [
            _req_create_shape(metric_id, slide_id, "TEXT_BOX", rx + 12, ry + 58, ref_w - 24, 44),
            _req_insert_text(metric_id, ref.get("metric", "")),
            _req_update_text_style(metric_id, _text_style(bold=True, font_size=22, color=_GOOGLE_GREEN)),
            _req_para_align(metric_id, "LEFT"),
        ]

        quote_id = _new_id()
        reqs += [
            _req_create_shape(quote_id, slide_id, "TEXT_BOX", rx + 12, ry + 112, ref_w - 24, 96),
            _req_insert_text(quote_id, ref.get("quote", "")),
            _req_update_text_style(quote_id, _text_style(font_size=11, italic=True, color=_LIGHT_GREY)),
            _req_para_align(quote_id, "LEFT"),
        ]

    return reqs


def _build_slide_roi_snapshot(slide_id: str, cfg: dict[str, Any]) -> list[dict[str, Any]]:
    """ROI snapshot with large stat numbers."""
    reqs: list[dict[str, Any]] = [_req_create_slide(slide_id)]
    reqs.append(_req_update_page_bg(slide_id, _WHITE))

    bar_id = _new_id()
    reqs += [
        _req_create_shape(bar_id, slide_id, "RECTANGLE", 0, 0, 720, 8),
        _req_update_shape_bg(bar_id, _GOOGLE_GREEN),
        _req_update_shape_no_border(bar_id),
    ]

    h_id = _new_id()
    reqs += [
        _req_create_shape(h_id, slide_id, "TEXT_BOX", 60, 24, 600, 50),
        _req_insert_text(h_id, cfg.get("title", "ROI Snapshot")),
        _req_update_text_style(h_id, _text_style(bold=True, font_size=26, color=_DARK_BLUE)),
        _req_para_align(h_id, "LEFT"),
    ]

    stats: list[dict[str, Any]] = cfg.get("stats", [])[:4]
    stat_w = 160
    gap = 16
    total_w = len(stats) * stat_w + (len(stats) - 1) * gap
    start_x = (720 - total_w) / 2

    stat_colors = [_GOOGLE_BLUE, _GOOGLE_GREEN, _GOOGLE_RED, _GOOGLE_YELLOW]

    for i, stat in enumerate(stats):
        sx = start_x + i * (stat_w + gap)
        sy = 110.0
        color = stat_colors[i % len(stat_colors)]

        box_id = _new_id()
        reqs += [
            _req_create_shape(box_id, slide_id, "RECTANGLE", sx, sy, stat_w, 190),
            _req_update_shape_bg(box_id, _LIGHT_GREY),
            _req_update_shape_no_border(box_id),
        ]

        strip_id = _new_id()
        reqs += [
            _req_create_shape(strip_id, slide_id, "RECTANGLE", sx, sy, stat_w, 6),
            _req_update_shape_bg(strip_id, color),
            _req_update_shape_no_border(strip_id),
        ]

        val_id = _new_id()
        reqs += [
            _req_create_shape(val_id, slide_id, "TEXT_BOX", sx + 8, sy + 20, stat_w - 16, 72),
            _req_insert_text(val_id, stat.get("value", "")),
            _req_update_text_style(val_id, _text_style(bold=True, font_size=36, color=color)),
            _req_para_align(val_id, "CENTER"),
        ]

        lbl_id = _new_id()
        reqs += [
            _req_create_shape(lbl_id, slide_id, "TEXT_BOX", sx + 8, sy + 100, stat_w - 16, 80),
            _req_insert_text(lbl_id, stat.get("label", "")),
            _req_update_text_style(lbl_id, _text_style(font_size=12, color=_DARK_TEXT)),
            _req_para_align(lbl_id, "CENTER"),
        ]

    if cfg.get("source"):
        src_id = _new_id()
        reqs += [
            _req_create_shape(src_id, slide_id, "TEXT_BOX", 60, 330, 600, 28),
            _req_insert_text(src_id, f"Source: {cfg['source']}"),
            _req_update_text_style(src_id, _text_style(font_size=10, italic=True, color=_MID_GREY)),
            _req_para_align(src_id, "LEFT"),
        ]

    return reqs


def _build_slide_timeline(slide_id: str, cfg: dict[str, Any]) -> list[dict[str, Any]]:
    """Three-phase implementation timeline."""
    reqs: list[dict[str, Any]] = [_req_create_slide(slide_id)]
    reqs.append(_req_update_page_bg(slide_id, _WHITE))

    bar_id = _new_id()
    reqs += [
        _req_create_shape(bar_id, slide_id, "RECTANGLE", 0, 0, 720, 8),
        _req_update_shape_bg(bar_id, _GOOGLE_BLUE),
        _req_update_shape_no_border(bar_id),
    ]

    h_id = _new_id()
    reqs += [
        _req_create_shape(h_id, slide_id, "TEXT_BOX", 60, 24, 600, 50),
        _req_insert_text(h_id, cfg.get("title", "Implementation Timeline")),
        _req_update_text_style(h_id, _text_style(bold=True, font_size=26, color=_DARK_BLUE)),
        _req_para_align(h_id, "LEFT"),
    ]

    # Horizontal connector bar
    conn_id = _new_id()
    reqs += [
        _req_create_shape(conn_id, slide_id, "RECTANGLE", 80, 173, 560, 6),
        _req_update_shape_bg(conn_id, _MID_GREY),
        _req_update_shape_no_border(conn_id),
    ]

    phases: list[dict[str, Any]] = cfg.get("phases", [])[:3]
    phase_colors = [_GOOGLE_BLUE, _GOOGLE_GREEN, _GOOGLE_YELLOW]
    phase_w = 180
    gap = 10
    total_w = len(phases) * phase_w + (len(phases) - 1) * gap
    start_x = (720 - total_w) / 2

    for i, phase in enumerate(phases):
        px = start_x + i * (phase_w + gap)
        phase_color = phase_colors[i % len(phase_colors)]

        # Circle node
        node_id = _new_id()
        reqs += [
            _req_create_shape(node_id, slide_id, "ELLIPSE", px + phase_w / 2 - 22, 152, 44, 44),
            _req_update_shape_bg(node_id, phase_color),
            _req_update_shape_no_border(node_id),
            _req_insert_text(node_id, str(i + 1)),
            _req_update_text_style(node_id, _text_style(bold=True, font_size=18, color=_WHITE)),
            _req_para_align(node_id, "CENTER"),
        ]

        # Duration label (above timeline)
        dur_id = _new_id()
        reqs += [
            _req_create_shape(dur_id, slide_id, "TEXT_BOX", px, 108, phase_w, 32),
            _req_insert_text(dur_id, phase.get("duration", "")),
            _req_update_text_style(dur_id, _text_style(bold=True, font_size=13, color=phase_color)),
            _req_para_align(dur_id, "CENTER"),
        ]

        # Phase heading (below timeline)
        ph_id = _new_id()
        reqs += [
            _req_create_shape(ph_id, slide_id, "TEXT_BOX", px, 210, phase_w, 36),
            _req_insert_text(ph_id, phase.get("phase", "")),
            _req_update_text_style(ph_id, _text_style(bold=True, font_size=14, color=_DARK_BLUE)),
            _req_para_align(ph_id, "CENTER"),
        ]

        # Phase activities
        act_id = _new_id()
        reqs += [
            _req_create_shape(act_id, slide_id, "TEXT_BOX", px, 254, phase_w, 100),
            _req_insert_text(act_id, phase.get("activities", "")),
            _req_update_text_style(act_id, _text_style(font_size=11, color=_DARK_TEXT)),
            _req_para_align(act_id, "LEFT"),
        ]

    return reqs


def _build_slide_next_steps(slide_id: str, cfg: dict[str, Any]) -> list[dict[str, Any]]:
    """Next-steps action table with owner and date columns."""
    reqs: list[dict[str, Any]] = [_req_create_slide(slide_id)]
    reqs.append(_req_update_page_bg(slide_id, _DARK_BLUE))

    h_id = _new_id()
    reqs += [
        _req_create_shape(h_id, slide_id, "TEXT_BOX", 60, 24, 600, 50),
        _req_insert_text(h_id, cfg.get("title", "Next Steps")),
        _req_update_text_style(h_id, _text_style(bold=True, font_size=26, color=_WHITE)),
        _req_para_align(h_id, "LEFT"),
    ]

    actions: list[dict[str, Any]] = cfg.get("actions", [])
    row_h = 46
    table_y = 90
    cols = [
        ("action", 40, 360, "Action"),
        ("owner", 408, 150, "Owner"),
        ("date", 566, 120, "Target Date"),
    ]

    # Header row
    for key, cx, cw, label in cols:
        hdr_bg = _new_id()
        hdr_txt = _new_id()
        reqs += [
            _req_create_shape(hdr_bg, slide_id, "RECTANGLE", cx, table_y, cw, row_h),
            _req_update_shape_bg(hdr_bg, _GOOGLE_BLUE),
            _req_update_shape_no_border(hdr_bg),
            _req_create_shape(hdr_txt, slide_id, "TEXT_BOX", cx + 8, table_y + 8, cw - 16, row_h - 16),
            _req_insert_text(hdr_txt, label),
            _req_update_text_style(hdr_txt, _text_style(bold=True, font_size=13, color=_WHITE)),
            _req_para_align(hdr_txt, "LEFT"),
        ]

    for i, action in enumerate(actions):
        row_y = table_y + (i + 1) * row_h
        row_bg_color = {"red": 0.1, "green": 0.25, "blue": 0.48} if i % 2 == 0 else {"red": 0.12, "green": 0.28, "blue": 0.52}

        for key, cx, cw, _ in cols:
            cell_bg = _new_id()
            cell_txt = _new_id()
            reqs += [
                _req_create_shape(cell_bg, slide_id, "RECTANGLE", cx, row_y, cw, row_h),
                _req_update_shape_bg(cell_bg, row_bg_color),
                _req_update_shape_no_border(cell_bg),
                _req_create_shape(cell_txt, slide_id, "TEXT_BOX", cx + 8, row_y + 6, cw - 16, row_h - 12),
                _req_insert_text(cell_txt, str(action.get(key, ""))),
                _req_update_text_style(cell_txt, _text_style(font_size=12, color=_WHITE)),
                _req_para_align(cell_txt, "LEFT"),
            ]

    return reqs


def _build_slide_text_slide(slide_id: str, cfg: dict[str, Any]) -> list[dict[str, Any]]:
    """Generic text slide — heading + body text."""
    reqs: list[dict[str, Any]] = [_req_create_slide(slide_id)]
    reqs.append(_req_update_page_bg(slide_id, _WHITE))

    bar_id = _new_id()
    reqs += [
        _req_create_shape(bar_id, slide_id, "RECTANGLE", 0, 0, 720, 8),
        _req_update_shape_bg(bar_id, _GOOGLE_BLUE),
        _req_update_shape_no_border(bar_id),
    ]

    h_id = _new_id()
    reqs += [
        _req_create_shape(h_id, slide_id, "TEXT_BOX", 60, 24, 600, 50),
        _req_insert_text(h_id, cfg.get("title", "")),
        _req_update_text_style(h_id, _text_style(bold=True, font_size=26, color=_DARK_BLUE)),
        _req_para_align(h_id, "LEFT"),
    ]

    body_id = _new_id()
    reqs += [
        _req_create_shape(body_id, slide_id, "TEXT_BOX", 60, 90, 600, 270),
        _req_insert_text(body_id, cfg.get("body", "")),
        _req_update_text_style(body_id, _text_style(font_size=14, color=_DARK_TEXT)),
        _req_para_align(body_id, "LEFT"),
    ]

    if cfg.get("speaker_notes"):
        note_id = _new_id()
        reqs += [
            _req_create_shape(note_id, slide_id, "TEXT_BOX", 60, 375, 600, 30),
            _req_insert_text(note_id, f"Speaker note: {cfg['speaker_notes']}"),
            _req_update_text_style(note_id, _text_style(font_size=10, italic=True, color=_MID_GREY)),
            _req_para_align(note_id, "LEFT"),
        ]

    return reqs


# Dispatch table
_SLIDE_BUILDERS = {
    "title": _build_slide_title,
    "agenda": _build_slide_agenda,
    "pain_points": _build_slide_pain_points,
    "solution_map": _build_slide_solution_map,
    "comparison_table": _build_slide_comparison_table,
    "customer_proof": _build_slide_customer_proof,
    "roi_snapshot": _build_slide_roi_snapshot,
    "timeline": _build_slide_timeline,
    "next_steps": _build_slide_next_steps,
    "text_slide": _build_slide_text_slide,
}


def _build_slide_requests(
    slide_cfg: dict[str, Any],
    _presentation_id: str,
) -> list[dict[str, Any]]:
    """Dispatches to the correct slide builder based on slide_cfg['type']."""
    slide_type = slide_cfg.get("type", "text_slide")
    slide_id = slide_cfg.get("id") or _new_id()
    builder = _SLIDE_BUILDERS.get(slide_type, _build_slide_text_slide)
    return builder(slide_id, slide_cfg)


# ---------------------------------------------------------------------------
# Public API — Slides
# ---------------------------------------------------------------------------

def create_presentation(creds: Credentials, config: dict[str, Any]) -> str:
    """Creates a branded Google Cloud pitch deck in Google Slides.

    Args:
        creds: Authenticated Google credentials.
        config: Presentation config dict. Expected keys:
            - company_name (str)
            - title (str, optional — defaults to company_name + ' — Google Cloud Pitch')
            - target_folder_id (str, optional)
            - slides (list of slide config dicts)

    Returns:
        The URL of the created presentation.
    """
    slides_service = build("slides", "v1", credentials=creds)
    drive_service = build("drive", "v3", credentials=creds)

    deck_title = config.get(
        "title",
        f"{config.get('company_name', 'Demo')} \u2014 Google Cloud Pitch",
    )

    presentation = slides_service.presentations().create(
        body={"title": deck_title}
    ).execute()
    presentation_id = presentation["presentationId"]

    # Move to target folder if specified
    if config.get("target_folder_id"):
        drive_service.files().update(
            fileId=presentation_id,
            addParents=config["target_folder_id"],
            removeParents="root",
            fields="id, parents",
        ).execute()

    # Delete default blank slide
    all_requests: list[dict[str, Any]] = []
    default_slides = presentation.get("slides", [])
    if default_slides:
        all_requests.append(
            {"deleteObject": {"objectId": default_slides[0]["objectId"]}}
        )

    # Build slide requests
    for slide_cfg in config.get("slides", []):
        all_requests.extend(_build_slide_requests(slide_cfg, presentation_id))

    if all_requests:
        slides_service.presentations().batchUpdate(
            presentationId=presentation_id,
            body={"requests": all_requests},
        ).execute()

    url = f"https://docs.google.com/presentation/d/{presentation_id}/edit"
    print(f"  Presentation created: {url}")
    return url


# ---------------------------------------------------------------------------
# Public API — Docs
# ---------------------------------------------------------------------------

def create_document(creds: Credentials, config: dict[str, Any]) -> str:
    """Creates a formatted Google Doc in Drive.

    Args:
        creds: Authenticated Google credentials.
        config: Document config dict. Expected keys:
            - title (str)
            - target_folder_id (str, optional)
            - sections (list of section dicts with keys: heading, body, bullets)

    Returns:
        The URL of the created document.
    """
    docs_service = build("docs", "v1", credentials=creds)
    drive_service = build("drive", "v3", credentials=creds)

    doc = docs_service.documents().create(
        body={"title": config.get("title", "Untitled Document")}
    ).execute()
    doc_id = doc["documentId"]

    if config.get("target_folder_id"):
        drive_service.files().update(
            fileId=doc_id,
            addParents=config["target_folder_id"],
            removeParents="root",
            fields="id, parents",
        ).execute()

    requests: list[dict[str, Any]] = []
    current_index = 1  # Docs API uses 1-based insertion index

    for section in config.get("sections", []):
        heading = section.get("heading", "")
        body_text = section.get("body", "")
        bullets: list[str] = section.get("bullets", [])

        if heading:
            requests.append(
                {
                    "insertText": {
                        "location": {"index": current_index},
                        "text": heading + "\n",
                    }
                }
            )
            requests.append(
                {
                    "updateParagraphStyle": {
                        "range": {
                            "startIndex": current_index,
                            "endIndex": current_index + len(heading) + 1,
                        },
                        "paragraphStyle": {"namedStyleType": "HEADING_1"},
                        "fields": "namedStyleType",
                    }
                }
            )
            current_index += len(heading) + 1

        if body_text:
            requests.append(
                {
                    "insertText": {
                        "location": {"index": current_index},
                        "text": body_text + "\n",
                    }
                }
            )
            current_index += len(body_text) + 1

        for bullet in bullets:
            bullet_line = bullet + "\n"
            requests.append(
                {
                    "insertText": {
                        "location": {"index": current_index},
                        "text": bullet_line,
                    }
                }
            )
            requests.append(
                {
                    "createParagraphBullets": {
                        "range": {
                            "startIndex": current_index,
                            "endIndex": current_index + len(bullet_line),
                        },
                        "bulletPreset": "BULLET_DISC_CIRCLE_SQUARE",
                    }
                }
            )
            current_index += len(bullet_line)

    if requests:
        docs_service.documents().batchUpdate(
            documentId=doc_id,
            body={"requests": requests},
        ).execute()

    url = f"https://docs.google.com/document/d/{doc_id}/edit"
    print(f"  Document created: {url}")
    return url


# ---------------------------------------------------------------------------
# Public API — Sheets
# ---------------------------------------------------------------------------

def create_spreadsheet(creds: Credentials, config: dict[str, Any]) -> str:
    """Creates a Google Sheet with headers, data rows, and basic formatting.

    Args:
        creds: Authenticated Google credentials.
        config: Spreadsheet config dict. Expected keys:
            - title (str)
            - target_folder_id (str, optional)
            - sheets (list of sheet config dicts with: name, headers, rows)

    Returns:
        The URL of the created spreadsheet.
    """
    sheets_service = build("sheets", "v4", credentials=creds)
    drive_service = build("drive", "v3", credentials=creds)

    sheet_configs = config.get("sheets", [])
    sheet_properties = [
        {"properties": {"title": s.get("name", f"Sheet{i+1}")}}
        for i, s in enumerate(sheet_configs)
    ] or [{"properties": {"title": "Sheet1"}}]

    spreadsheet = sheets_service.spreadsheets().create(
        body={
            "properties": {"title": config.get("title", "Untitled Spreadsheet")},
            "sheets": sheet_properties,
        }
    ).execute()
    spreadsheet_id = spreadsheet["spreadsheetId"]

    if config.get("target_folder_id"):
        drive_service.files().update(
            fileId=spreadsheet_id,
            addParents=config["target_folder_id"],
            removeParents="root",
            fields="id, parents",
        ).execute()

    # Populate each sheet
    data_updates: list[dict[str, Any]] = []
    format_requests: list[dict[str, Any]] = []

    for i, sheet_cfg in enumerate(sheet_configs):
        sheet_title = sheet_cfg.get("name", f"Sheet{i+1}")
        headers: list[str] = sheet_cfg.get("headers", [])
        rows: list[list[Any]] = sheet_cfg.get("rows", [])

        if headers:
            all_data = [headers] + rows
        else:
            all_data = rows

        if all_data:
            data_updates.append(
                {
                    "range": f"'{sheet_title}'!A1",
                    "values": all_data,
                }
            )

        if headers:
            # Get the sheet id from the response
            sheet_id_val = spreadsheet["sheets"][i]["properties"]["sheetId"]

            # Bold header row
            format_requests.append(
                {
                    "repeatCell": {
                        "range": {
                            "sheetId": sheet_id_val,
                            "startRowIndex": 0,
                            "endRowIndex": 1,
                        },
                        "cell": {
                            "userEnteredFormat": {
                                "textFormat": {"bold": True},
                                "backgroundColor": {
                                    "red": 0.259,
                                    "green": 0.522,
                                    "blue": 0.957,
                                },
                                "horizontalAlignment": "CENTER",
                            }
                        },
                        "fields": "userEnteredFormat(textFormat,backgroundColor,horizontalAlignment)",
                    }
                }
            )

            # Alternating row background
            for row_idx in range(1, len(rows) + 1):
                bg = (
                    {"red": 0.953, "green": 0.953, "blue": 0.953}
                    if row_idx % 2 == 0
                    else {"red": 1.0, "green": 1.0, "blue": 1.0}
                )
                format_requests.append(
                    {
                        "repeatCell": {
                            "range": {
                                "sheetId": sheet_id_val,
                                "startRowIndex": row_idx,
                                "endRowIndex": row_idx + 1,
                            },
                            "cell": {
                                "userEnteredFormat": {"backgroundColor": bg}
                            },
                            "fields": "userEnteredFormat.backgroundColor",
                        }
                    }
                )

            # Auto-resize columns
            format_requests.append(
                {
                    "autoResizeDimensions": {
                        "dimensions": {
                            "sheetId": sheet_id_val,
                            "dimension": "COLUMNS",
                            "startIndex": 0,
                            "endIndex": len(headers),
                        }
                    }
                }
            )

    if data_updates:
        sheets_service.spreadsheets().values().batchUpdate(
            spreadsheetId=spreadsheet_id,
            body={"valueInputOption": "USER_ENTERED", "data": data_updates},
        ).execute()

    if format_requests:
        sheets_service.spreadsheets().batchUpdate(
            spreadsheetId=spreadsheet_id,
            body={"requests": format_requests},
        ).execute()

    url = f"https://docs.google.com/spreadsheets/d/{spreadsheet_id}/edit"
    print(f"  Spreadsheet created: {url}")
    return url


# ---------------------------------------------------------------------------
# Public API — Calendar
# ---------------------------------------------------------------------------

def create_calendar_events(
    creds: Credentials, events: list[dict[str, Any]]
) -> list[str]:
    """Creates calendar events with optional Meet links.

    Attendees are NOT notified (sendUpdates='none') — safe for demo accounts.

    Args:
        creds: Authenticated Google credentials.
        events: List of event config dicts. Expected keys:
            - summary (str)
            - description (str, optional)
            - start (str) — ISO 8601 datetime, e.g. '2026-04-15T10:00:00'
            - end (str) — ISO 8601 datetime
            - timezone (str, optional — defaults to 'Europe/Warsaw')
            - attendees (list of email strings, optional)
            - add_meet_link (bool, optional)

    Returns:
        List of event HTML links.
    """
    calendar_service = build("calendar", "v3", credentials=creds)
    urls: list[str] = []

    for event_cfg in events:
        tz = event_cfg.get("timezone", "Europe/Warsaw")
        body: dict[str, Any] = {
            "summary": event_cfg.get("summary", "Demo Event"),
            "description": event_cfg.get("description", ""),
            "start": {"dateTime": event_cfg["start"], "timeZone": tz},
            "end": {"dateTime": event_cfg["end"], "timeZone": tz},
        }

        if event_cfg.get("attendees"):
            body["attendees"] = [
                {"email": addr} for addr in event_cfg["attendees"]
            ]

        if event_cfg.get("add_meet_link", True):
            body["conferenceData"] = {
                "createRequest": {
                    "requestId": uuid.uuid4().hex,
                    "conferenceSolutionKey": {"type": "hangoutsMeet"},
                }
            }

        created = calendar_service.events().insert(
            calendarId="primary",
            body=body,
            sendUpdates="none",
            conferenceDataVersion=1 if event_cfg.get("add_meet_link", True) else 0,
        ).execute()

        link = created.get("htmlLink", "")
        urls.append(link)
        print(f"  Calendar event created: {created.get('summary', '')} — {link}")

    return urls


# ---------------------------------------------------------------------------
# Public API — Gmail drafts
# ---------------------------------------------------------------------------

def create_gmail_drafts(
    creds: Credentials, emails: list[dict[str, Any]]
) -> list[str]:
    """Creates Gmail DRAFTS — they are NOT sent. Seller reviews and sends manually.

    Args:
        creds: Authenticated Google credentials.
        emails: List of email config dicts. Expected keys:
            - to (str or list of str)
            - subject (str)
            - body (str)
            - cc (str or list of str, optional)

    Returns:
        List of draft IDs.
    """
    gmail_service = build("gmail", "v1", credentials=creds)
    draft_ids: list[str] = []

    for email_cfg in emails:
        to_field = email_cfg.get("to", "")
        if isinstance(to_field, list):
            to_field = ", ".join(to_field)

        msg = MIMEText(email_cfg.get("body", ""), "plain", "utf-8")
        msg["to"] = to_field
        msg["subject"] = email_cfg.get("subject", "(no subject)")

        cc_field = email_cfg.get("cc", "")
        if isinstance(cc_field, list):
            cc_field = ", ".join(cc_field)
        if cc_field:
            msg["cc"] = cc_field

        raw = base64.urlsafe_b64encode(msg.as_bytes()).decode("utf-8")
        draft = gmail_service.users().drafts().create(
            userId="me",
            body={"message": {"raw": raw}},
        ).execute()

        draft_id = draft["id"]
        draft_ids.append(draft_id)
        print(f"  Gmail draft created: id={draft_id} subject='{email_cfg.get('subject', '')}'")

    return draft_ids


# ---------------------------------------------------------------------------
# Public API — Drive folder structure
# ---------------------------------------------------------------------------

def create_drive_folder_structure(
    creds: Credentials,
    structure: dict[str, Any],
    parent_id: str | None = None,
) -> dict[str, str]:
    """Creates a nested folder tree in Google Drive.

    Args:
        creds: Authenticated Google credentials.
        structure: Nested dict where keys are folder names and values are either
            an empty dict (leaf folder) or another nested dict.
            Example::

                {
                    "NovaTech Demo": {
                        "Pitch Materials": {},
                        "Technical Docs": {
                            "Architecture": {},
                            "Security": {},
                        },
                    }
                }

        parent_id: Drive folder ID to create the top-level folders inside.
            Defaults to the user's root Drive.

    Returns:
        Flat dict mapping folder name -> folder ID for every created folder.
    """
    drive_service = build("drive", "v3", credentials=creds)
    created: dict[str, str] = {}

    def _create_folder(name: str, parent: str | None) -> str:
        metadata: dict[str, Any] = {
            "name": name,
            "mimeType": "application/vnd.google-apps.folder",
        }
        if parent:
            metadata["parents"] = [parent]
        folder = drive_service.files().create(
            body=metadata, fields="id"
        ).execute()
        folder_id = folder["id"]
        print(f"  Drive folder created: '{name}' (id={folder_id})")
        return folder_id

    def _recurse(tree: dict[str, Any], current_parent: str | None) -> None:
        for folder_name, subtree in tree.items():
            fid = _create_folder(folder_name, current_parent)
            created[folder_name] = fid
            if subtree:
                _recurse(subtree, fid)

    _recurse(structure, parent_id)
    return created


# ---------------------------------------------------------------------------
# Master provisioner
# ---------------------------------------------------------------------------

def provision_demo_environment(
    config_path: str, dry_run: bool = True
) -> dict[str, Any]:
    """Provisions a complete demo environment in Google Workspace.

    Args:
        config_path: Path to JSON config file.
        dry_run: If True, only previews what would be created. No API calls made.

    Returns:
        Manifest dict of all created resources (empty dict in dry-run mode).
    """
    with open(config_path) as fh:
        config = json.load(fh)

    creds = get_credentials()
    user_email = _get_current_user(creds)

    print("=" * 52)
    print("  GCP Sales Enablement -- Workspace Provisioner")
    print("=" * 52)
    print(f"  Target account : {user_email}")
    print(f"  Company        : {config.get('company_name', 'N/A')}")
    print(f"  Mode           : {'DRY RUN' if dry_run else 'EXECUTE'}")
    print("=" * 52)

    if not dry_run:
        if "demo" not in user_email.lower() and "test" not in user_email.lower():
            print(f"\nWARNING: '{user_email}' does not look like a demo account.")
            print("  Running against a real account may create unwanted content.")
            confirm = input("  Type 'yes' to continue, anything else to cancel: ")
            if confirm.strip().lower() != "yes":
                print("Cancelled.")
                return {}

    manifest: dict[str, Any] = {"created": [], "config": config_path}
    folder_map: dict[str, str] = {}

    def _run_step(step_name: str, fn: Any) -> Any:
        print(f"\n{step_name}")
        if dry_run:
            print(f"  [DRY RUN] Would execute: {step_name}")
            return None
        try:
            result = fn()
            manifest["created"].append({"step": step_name, "result": result})
            print(f"  Done")
            return result
        except Exception as exc:
            print(f"  FAILED: {exc}")
            manifest["created"].append({"step": step_name, "error": str(exc)})
            return None

    # 1 — Drive folder structure
    def _folders() -> dict[str, str]:
        nonlocal folder_map
        folder_map = create_drive_folder_structure(
            creds, config.get("folders", {})
        )
        return folder_map

    _run_step("Drive Folders", _folders)

    # Resolve target folder ID for assets
    def _target_folder() -> str | None:
        if config.get("target_folder_name") and folder_map:
            return folder_map.get(config["target_folder_name"])
        return config.get("target_folder_id")

    # 2 — Presentation
    def _presentation() -> str:
        pres_cfg = config.get("presentation", {})
        pres_cfg.setdefault("company_name", config.get("company_name", "Demo"))
        tf = _target_folder()
        if tf:
            pres_cfg["target_folder_id"] = tf
        return create_presentation(creds, pres_cfg)

    _run_step("Google Slides Presentation", _presentation)

    # 3 — Documents
    def _documents() -> list[str]:
        results = []
        for doc_cfg in config.get("documents", []):
            tf = _target_folder()
            if tf:
                doc_cfg.setdefault("target_folder_id", tf)
            results.append(create_document(creds, doc_cfg))
        return results

    _run_step("Google Docs", _documents)

    # 4 — Spreadsheets
    def _spreadsheets() -> list[str]:
        results = []
        for sheet_cfg in config.get("spreadsheets", []):
            tf = _target_folder()
            if tf:
                sheet_cfg.setdefault("target_folder_id", tf)
            results.append(create_spreadsheet(creds, sheet_cfg))
        return results

    _run_step("Google Sheets", _spreadsheets)

    # 5 — Calendar events
    _run_step(
        "Calendar Events",
        lambda: create_calendar_events(creds, config.get("calendar_events", [])),
    )

    # 6 — Gmail drafts
    _run_step(
        "Gmail Drafts",
        lambda: create_gmail_drafts(creds, config.get("emails", [])),
    )

    # Save manifest
    if not dry_run and manifest["created"]:
        manifest_path = config_path.replace(".json", "_manifest.json")
        with open(manifest_path, "w") as fh:
            json.dump(manifest, fh, indent=2, default=str)
        print(f"\nManifest saved to {manifest_path}")

    print("\n" + "=" * 52)
    if dry_run:
        print("  DRY RUN complete -- no changes made.")
        print("  Add --execute to provision for real.")
    else:
        print("  Demo environment provisioned successfully.")
    print("=" * 52)

    return manifest


# ---------------------------------------------------------------------------
# Cleanup
# ---------------------------------------------------------------------------

def cleanup_demo_environment(manifest_path: str) -> None:
    """Removes all resources listed in a provisioning manifest.

    Args:
        manifest_path: Path to the *_manifest.json file created during provisioning.
    """
    creds = get_credentials()
    drive_service = build("drive", "v3", credentials=creds)
    calendar_service = build("calendar", "v3", credentials=creds)
    gmail_service = build("gmail", "v1", credentials=creds)

    with open(manifest_path) as fh:
        manifest = json.load(fh)

    print(f"Cleaning up demo environment from manifest: {manifest_path}")

    for item in manifest.get("created", []):
        step = item.get("step", "")
        result = item.get("result")
        if not result:
            continue

        try:
            if "Folder" in step or "Presentation" in step or "Docs" in step or "Sheets" in step:
                # Extract file ID from URL or folder map
                file_ids: list[str] = []
                if isinstance(result, str) and "/d/" in result:
                    file_ids = [result.split("/d/")[1].split("/")[0]]
                elif isinstance(result, list):
                    for r in result:
                        if isinstance(r, str) and "/d/" in r:
                            file_ids.append(r.split("/d/")[1].split("/")[0])
                elif isinstance(result, dict):
                    file_ids = list(result.values())

                for fid in file_ids:
                    drive_service.files().delete(fileId=fid).execute()
                    print(f"  Deleted Drive file/folder: {fid}")

            elif "Calendar" in step:
                event_ids: list[str] = []
                if isinstance(result, list):
                    event_ids = [
                        r.split("eid=")[1].split("&")[0]
                        for r in result
                        if "eid=" in r
                    ]
                for eid in event_ids:
                    calendar_service.events().delete(
                        calendarId="primary", eventId=eid
                    ).execute()
                    print(f"  Deleted calendar event: {eid}")

            elif "Gmail" in step:
                draft_ids: list[str] = result if isinstance(result, list) else [result]
                for did in draft_ids:
                    if did:
                        gmail_service.users().drafts().delete(
                            userId="me", draftId=did
                        ).execute()
                        print(f"  Deleted Gmail draft: {did}")

        except Exception as exc:
            print(f"  Could not clean up {step}: {exc}")

    print("Cleanup complete.")


# ---------------------------------------------------------------------------
# Sample config generator
# ---------------------------------------------------------------------------

def generate_sample_config() -> dict[str, Any]:
    """Returns a complete NovaTech Logistics demo config.

    This covers all supported resource types and can be used as a template.
    """
    return {
        "company_name": "NovaTech Logistics",
        "target_folder_name": "NovaTech Demo",
        "folders": {
            "NovaTech Demo": {
                "Pitch Materials": {},
                "Technical Docs": {
                    "Architecture": {},
                    "Security & Compliance": {},
                },
                "Demo Content": {},
            }
        },
        "presentation": {
            "title": "NovaTech Logistics \u2014 Google Cloud Pitch",
            "slides": [
                {
                    "type": "title",
                    "title": "Google Cloud for NovaTech Logistics",
                    "subtitle": "Scaling your logistics platform with AI-powered infrastructure",
                    "footer": "Confidential \u2014 Google Cloud Sales \u2014 2026",
                },
                {
                    "type": "agenda",
                    "title": "Agenda",
                    "items": [
                        "Company Challenges",
                        "Google Cloud Solution",
                        "Product Overview",
                        "Customer References",
                        "ROI Analysis",
                        "Implementation Timeline",
                        "Next Steps",
                    ],
                },
                {
                    "type": "pain_points",
                    "title": "Key Challenges at NovaTech",
                    "cards": [
                        {
                            "title": "Scalability Bottlenecks",
                            "body": "Peak season spikes cause 40% order processing delays. Current infrastructure cannot elastically scale to demand.",
                        },
                        {
                            "title": "Data Silos",
                            "body": "Fleet, warehouse, and customer data live in 5 separate systems with no unified analytics layer.",
                        },
                        {
                            "title": "Rising Cloud Costs",
                            "body": "AWS costs grew 68% YoY without corresponding performance gains. Committed use discounts not fully utilized.",
                        },
                    ],
                },
                {
                    "type": "solution_map",
                    "title": "Mapping Challenges to GCP Solutions",
                    "rows": [
                        {"challenge": "Challenge", "solution": "GCP Solution"},
                        {"challenge": "Elastic compute at peak demand", "solution": "GKE Autopilot + Cloud Run"},
                        {"challenge": "Unified analytics across silos", "solution": "BigQuery + Looker"},
                        {"challenge": "Predictive route optimization", "solution": "Vertex AI + Maps Platform"},
                        {"challenge": "Cost optimization", "solution": "Active Assist + CUD recommendations"},
                        {"challenge": "Real-time tracking pipeline", "solution": "Pub/Sub + Dataflow"},
                    ],
                },
                {
                    "type": "comparison_table",
                    "title": "Google Cloud vs AWS",
                    "rows": [
                        {"feature": "Capability", "gcp": "Google Cloud", "competitor": "AWS"},
                        {"feature": "Data warehouse", "gcp": "BigQuery (serverless)", "competitor": "Redshift (cluster mgmt)"},
                        {"feature": "ML platform", "gcp": "Vertex AI (unified)", "competitor": "SageMaker (fragmented)"},
                        {"feature": "Global network latency", "gcp": "35% lower avg (2025)", "competitor": "Baseline"},
                        {"feature": "Committed use savings", "gcp": "Up to 57%", "competitor": "Up to 40%"},
                        {"feature": "Container runtime", "gcp": "GKE Autopilot", "competitor": "EKS (manual node mgmt)"},
                    ],
                },
                {
                    "type": "customer_proof",
                    "title": "Logistics Companies Running on GCP",
                    "references": [
                        {
                            "company": "DHL",
                            "metric": "30% faster",
                            "quote": "GCP enabled real-time visibility across our global network, reducing routing errors by 30%.",
                        },
                        {
                            "company": "Maersk",
                            "metric": "$50M saved",
                            "quote": "BigQuery unified our container data and cut reporting cycle from 3 days to 4 hours.",
                        },
                        {
                            "company": "FedEx",
                            "metric": "99.99% SLA",
                            "quote": "Google's global fiber network gives us the reliability our customers demand.",
                        },
                    ],
                },
                {
                    "type": "roi_snapshot",
                    "title": "Expected ROI for NovaTech",
                    "source": "Google Cloud Economic Value Study, IDC 2025",
                    "stats": [
                        {"value": "47%", "label": "Infrastructure cost reduction vs current AWS spend"},
                        {"value": "3.2x", "label": "Faster data processing with BigQuery vs Redshift"},
                        {"value": "18 mo", "label": "Estimated payback period"},
                        {"value": "$2.4M", "label": "3-year NPV based on 1200-node fleet"},
                    ],
                },
                {
                    "type": "timeline",
                    "title": "Implementation Roadmap",
                    "phases": [
                        {
                            "phase": "Phase 1: Foundation",
                            "duration": "Months 1\u20133",
                            "activities": "- GCP project setup\n- Network & IAM\n- Dev/staging env\n- First BigQuery datasets",
                        },
                        {
                            "phase": "Phase 2: Migration",
                            "duration": "Months 4\u20138",
                            "activities": "- Workload migration\n- Data pipeline rebuild\n- Vertex AI training\n- Looker dashboards",
                        },
                        {
                            "phase": "Phase 3: Optimise",
                            "duration": "Months 9\u201312",
                            "activities": "- Cost tuning & CUDs\n- AI model rollout\n- FinOps tooling\n- Full cutover",
                        },
                    ],
                },
                {
                    "type": "next_steps",
                    "title": "Next Steps",
                    "actions": [
                        {"action": "Technical discovery call with NovaTech architecture team", "owner": "GCP CE", "date": "Apr 1"},
                        {"action": "Share BigQuery Sandbox access for evaluation", "owner": "GCP CE", "date": "Apr 5"},
                        {"action": "Provide AWS cost export for detailed TCO analysis", "owner": "NovaTech", "date": "Apr 5"},
                        {"action": "Schedule executive sponsor meeting", "owner": "GCP AE", "date": "Apr 10"},
                        {"action": "Submit formal proposal and commercial offer", "owner": "GCP AE", "date": "Apr 20"},
                    ],
                },
            ],
        },
        "documents": [
            {
                "title": "NovaTech Logistics \u2014 Discovery Questionnaire",
                "sections": [
                    {
                        "heading": "Current State Assessment",
                        "body": "Please complete this questionnaire before our technical discovery session. This will help us tailor our recommendations to NovaTech's specific environment.",
                        "bullets": [],
                    },
                    {
                        "heading": "Infrastructure",
                        "body": "",
                        "bullets": [
                            "How many compute instances are you currently running on AWS?",
                            "What is your average monthly AWS spend (rough estimate)?",
                            "Which AWS services account for the majority of your spend?",
                            "Do you currently use any Kubernetes-based deployments?",
                        ],
                    },
                    {
                        "heading": "Data & Analytics",
                        "body": "",
                        "bullets": [
                            "What data warehouse or analytics platform do you currently use?",
                            "How much data do you process daily (approximate GB/TB)?",
                            "How long does your current end-of-day reporting cycle take?",
                            "Are there specific data sources you wish were integrated but aren't?",
                        ],
                    },
                    {
                        "heading": "AI & Machine Learning",
                        "body": "",
                        "bullets": [
                            "Do you have any ML models in production today?",
                            "What ML use cases are highest priority (e.g., route optimization, demand forecasting)?",
                            "Do you have in-house data science capability or would you rely on managed services?",
                        ],
                    },
                ],
            }
        ],
        "spreadsheets": [
            {
                "title": "NovaTech \u2014 GCP TCO Model",
                "sheets": [
                    {
                        "name": "Summary",
                        "headers": ["Category", "Current AWS Cost (Annual)", "GCP Estimate (Annual)", "Saving ($)", "Saving (%)"],
                        "rows": [
                            ["Compute", "$1,240,000", "$680,000", "$560,000", "45%"],
                            ["Storage", "$180,000", "$95,000", "$85,000", "47%"],
                            ["Data Transfer", "$210,000", "$140,000", "$70,000", "33%"],
                            ["Database", "$320,000", "$195,000", "$125,000", "39%"],
                            ["Analytics", "$290,000", "$120,000", "$170,000", "59%"],
                            ["Support", "$80,000", "$60,000", "$20,000", "25%"],
                            ["TOTAL", "$2,320,000", "$1,290,000", "$1,030,000", "44%"],
                        ],
                    },
                    {
                        "name": "Compute Detail",
                        "headers": ["Workload", "AWS Instance", "vCPU", "RAM (GB)", "GCP Equivalent", "AWS $/hr", "GCP $/hr", "Annual Saving"],
                        "rows": [
                            ["API Gateway", "c5.4xlarge", 16, 32, "c2-standard-16", "$0.68", "$0.48", "$17,520"],
                            ["Order Processing", "m5.2xlarge", 8, 32, "n2-standard-8", "$0.384", "$0.312", "$6,307"],
                            ["Data Pipeline", "r5.4xlarge", 16, 128, "n2-highmem-16", "$1.008", "$0.772", "$20,678"],
                            ["ML Training", "p3.2xlarge (GPU)", 8, 61, "a2-highgpu-1g", "$3.06", "$2.48", "$50,808"],
                        ],
                    },
                ],
            }
        ],
        "calendar_events": [
            {
                "summary": "GCP Technical Discovery \u2014 NovaTech Logistics",
                "description": "Initial technical discovery session to assess NovaTech's current AWS architecture and identify GCP migration opportunities.\n\nAgenda:\n1. Current state walkthrough (30 min)\n2. Pain points deep-dive (20 min)\n3. GCP sandbox demo (30 min)\n4. Q&A and next steps (10 min)",
                "start": "2026-04-01T10:00:00",
                "end": "2026-04-01T11:30:00",
                "timezone": "Europe/Warsaw",
                "attendees": [],
                "add_meet_link": True,
            },
            {
                "summary": "NovaTech \u2014 GCP Executive Alignment",
                "description": "Executive sponsor meeting to present TCO analysis and commercial proposal.",
                "start": "2026-04-10T14:00:00",
                "end": "2026-04-10T15:00:00",
                "timezone": "Europe/Warsaw",
                "attendees": [],
                "add_meet_link": True,
            },
        ],
        "emails": [
            {
                "to": "demo-account@example.com",
                "subject": "Following up: Google Cloud proposal for NovaTech Logistics",
                "body": (
                    "Hi Sarah,\n\n"
                    "Thank you for your time during our technical discovery session yesterday. "
                    "As promised, I'm sending over the materials we discussed.\n\n"
                    "Attached you'll find:\n"
                    "- The Google Cloud pitch deck with our solution recommendations\n"
                    "- The TCO model comparing your current AWS spend against GCP estimates\n"
                    "- The discovery questionnaire for your architecture team\n\n"
                    "The headline number: based on the figures you shared, we're projecting a "
                    "44% cost reduction in your first full year, with a payback period of under 18 months.\n\n"
                    "I'd like to schedule a follow-up with your CTO and CFO to walk through the "
                    "commercial proposal in detail. Are you available the week of April 7?\n\n"
                    "Best regards,\n"
                    "Alex Chen\n"
                    "Google Cloud Account Executive\n"
                    "alex.chen@google.com"
                ),
            },
            {
                "to": "demo-account@example.com",
                "subject": "NovaTech x GCP: BigQuery Sandbox access is ready",
                "body": (
                    "Hi Marcus,\n\n"
                    "Your BigQuery evaluation sandbox is now live.\n\n"
                    "Access details:\n"
                    "- Project: novatech-gcp-eval-2026\n"
                    "- Console: https://console.cloud.google.com\n"
                    "- Your sample dataset has been loaded: 90 days of order history\n\n"
                    "To run your first query:\n"
                    "1. Open BigQuery in the console\n"
                    "2. Select the 'novatech_orders' dataset\n"
                    "3. Try: SELECT COUNT(*), AVG(delivery_time_hours) FROM orders WHERE status='delivered'\n\n"
                    "I'll be available Thursday 2-4pm if you'd like a guided walkthrough.\n\n"
                    "Cheers,\n"
                    "Jamie Rodriguez\n"
                    "Google Cloud Customer Engineer"
                ),
            },
        ],
    }


# ---------------------------------------------------------------------------
# CLI entry point
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="GCP Sales Enablement \u2014 Google Workspace Provisioner",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=(
            "Examples:\n"
            "  python workspace_uploader.py                             # generate sample config\n"
            "  python workspace_uploader.py provision --config cfg.json # dry run\n"
            "  python workspace_uploader.py provision --config cfg.json --execute\n"
            "  python workspace_uploader.py slides   --config cfg.json\n"
            "  python workspace_uploader.py cleanup  --manifest cfg_manifest.json\n"
        ),
    )
    subparsers = parser.add_subparsers(dest="command")

    # provision
    prov = subparsers.add_parser("provision", help="Create a full demo environment")
    prov.add_argument("--config", required=True, help="Path to JSON config file")
    prov.add_argument(
        "--execute",
        action="store_true",
        help="Actually create resources (default: dry run preview only)",
    )

    # slides — create a presentation only
    slides_cmd = subparsers.add_parser(
        "slides", help="Create a Google Slides presentation only"
    )
    slides_cmd.add_argument(
        "--config", required=True, help="Path to presentation config JSON"
    )

    # cleanup
    clean = subparsers.add_parser(
        "cleanup", help="Remove all resources from a provisioning manifest"
    )
    clean.add_argument(
        "--manifest", required=True, help="Path to *_manifest.json file"
    )

    args = parser.parse_args()

    if args.command == "provision":
        provision_demo_environment(args.config, dry_run=not args.execute)

    elif args.command == "slides":
        creds = get_credentials()
        with open(args.config) as fh:
            cfg = json.load(fh)
        create_presentation(creds, cfg)

    elif args.command == "cleanup":
        cleanup_demo_environment(args.manifest)

    else:
        # No command — generate sample config and print usage hint
        print("No command given. Generating sample config...")
        sample = generate_sample_config()
        sample_path = "/tmp/demo_config.json"
        with open(sample_path, "w") as fh:
            json.dump(sample, fh, indent=2, ensure_ascii=False)
        print(f"Sample config written to {sample_path}")
        print()
        print("Quick start:")
        print(f"  python workspace_uploader.py provision --config {sample_path}")
        print(f"  python workspace_uploader.py provision --config {sample_path} --execute")


if __name__ == "__main__":
    main()
