"""
PDF Report Generator for GCP Sales Enablement
==============================================
Generates branded PDF reports for research reports, demo trainer guides,
and competitive battlecards using HTML+CSS -> PDF via WeasyPrint.

Usage:
    from generators.pdf_report import generate_research_report, generate_trainer_guide, generate_battlecard

    pdf_path = generate_research_report(config)
    pdf_path = generate_trainer_guide(config)
    pdf_path = generate_battlecard(config)
"""

from __future__ import annotations

import os
import textwrap
from typing import Any

# ---------------------------------------------------------------------------
# Brand tokens
# ---------------------------------------------------------------------------

GCP_BLUE = "#1a73e8"
GCP_DARK_BLUE = "#0d47a1"
GCP_NAVY = "#1a237e"
GCP_GREEN = "#34a853"
GCP_RED = "#ea4335"
GCP_YELLOW = "#fbbc04"
GCP_GREY_DARK = "#202124"
GCP_GREY_MID = "#5f6368"
GCP_GREY_LIGHT = "#f8f9fa"
GCP_GREY_BORDER = "#dadce0"
GCP_WHITE = "#ffffff"

SEVERITY_COLORS = {
    "HIGH": GCP_RED,
    "MEDIUM": GCP_YELLOW,
    "LOW": GCP_GREEN,
}

# ---------------------------------------------------------------------------
# Shared base CSS
# ---------------------------------------------------------------------------

BASE_CSS = f"""
@import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&family=Roboto:wght@300;400;500;700&display=swap');

* {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}}

body {{
    font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
    font-size: 10pt;
    color: {GCP_GREY_DARK};
    background: {GCP_WHITE};
    line-height: 1.5;
}}

h1, h2, h3, h4 {{
    font-family: 'Google Sans', 'Roboto', sans-serif;
    font-weight: 700;
    line-height: 1.2;
}}

@page {{
    size: A4 portrait;
    margin: 0;
}}

.page {{
    width: 210mm;
    min-height: 297mm;
    position: relative;
    page-break-after: always;
    overflow: hidden;
}}

.page:last-child {{
    page-break-after: avoid;
}}
"""


# ---------------------------------------------------------------------------
# Helper utilities
# ---------------------------------------------------------------------------

def _esc(text: str) -> str:
    """Escape HTML special characters."""
    return (
        str(text)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def _severity_badge(severity: str) -> str:
    """Return an inline HTML badge for a severity level."""
    color = SEVERITY_COLORS.get(severity.upper(), GCP_GREY_MID)
    return (
        f'<span style="background:{color};color:{GCP_WHITE};'
        f'font-size:7pt;font-weight:700;padding:2px 7px;border-radius:10px;'
        f'letter-spacing:0.5px;">{_esc(severity.upper())}</span>'
    )


def _section_header(title: str, subtitle: str = "") -> str:
    return f"""
    <div style="border-left:4px solid {GCP_BLUE};padding:4px 0 4px 12px;margin-bottom:16px;">
        <h2 style="font-size:14pt;color:{GCP_DARK_BLUE};">{_esc(title)}</h2>
        {"<p style='font-size:9pt;color:" + GCP_GREY_MID + ";margin-top:2px;'>" + _esc(subtitle) + "</p>" if subtitle else ""}
    </div>
    """


def _html_page(body: str, css: str = "") -> str:
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<style>
{BASE_CSS}
{css}
</style>
</head>
<body>
{body}
</body>
</html>"""


def _write_pdf(html: str, output_path: str) -> str:
    """Convert HTML string to PDF file. Returns output_path."""
    try:
        from weasyprint import HTML, CSS  # type: ignore
    except ImportError as exc:
        raise ImportError(
            "weasyprint is required. Install it with: pip install weasyprint"
        ) from exc

    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    HTML(string=html).write_pdf(output_path)
    return output_path


# ---------------------------------------------------------------------------
# Shared page footer
# ---------------------------------------------------------------------------

_FOOTER_CSS = f"""
.footer {{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 24px;
    background: {GCP_NAVY};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20mm;
}}

.footer span {{
    font-size: 7pt;
    color: rgba(255,255,255,0.7);
    letter-spacing: 0.3px;
}}

@page {{
    @bottom-center {{
        content: "";
    }}
}}
"""

def _footer(page_num: int | str = "") -> str:
    page_str = f"Page {page_num}" if page_num != "" else ""
    return f"""
    <div class="footer">
        <span>CONFIDENTIAL &mdash; Prepared by Google Cloud</span>
        <span>{page_str}</span>
    </div>
    """


# ===========================================================================
# 1. Research Report
# ===========================================================================

def generate_research_report(config: dict[str, Any]) -> str:
    """
    Generate a branded GCP Account Intelligence Brief PDF.

    Parameters
    ----------
    config : dict
        Keys: company_name, date, confidence, executive_summary,
              company_profile, pain_points, technology_landscape,
              stakeholder_map, opportunity_assessment, risk_factors,
              recommended_approach, output_path.

    Returns
    -------
    str
        Absolute path to the generated PDF file.
    """
    company = _esc(config.get("company_name", "Unnamed Company"))
    date = _esc(config.get("date", ""))
    confidence = config.get("confidence", "MEDIUM").upper()
    conf_color = SEVERITY_COLORS.get(confidence, GCP_GREY_MID)
    output_path = config.get("output_path", "/tmp/research_report.pdf")

    pages: list[str] = []

    # ------------------------------------------------------------------
    # Page 1 — Cover
    # ------------------------------------------------------------------
    cover_css = f"""
    .cover {{
        background: linear-gradient(160deg, {GCP_NAVY} 0%, {GCP_DARK_BLUE} 60%, {GCP_BLUE} 100%);
        width: 210mm;
        min-height: 297mm;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 30mm 20mm;
        position: relative;
    }}

    .cover-eyebrow {{
        font-size: 9pt;
        font-weight: 500;
        letter-spacing: 2px;
        color: rgba(255,255,255,0.6);
        text-transform: uppercase;
        margin-bottom: 8px;
    }}

    .cover-company {{
        font-size: 32pt;
        font-weight: 700;
        color: {GCP_WHITE};
        margin-bottom: 10px;
        line-height: 1.1;
    }}

    .cover-subtitle {{
        font-size: 14pt;
        font-weight: 300;
        color: rgba(255,255,255,0.85);
        margin-bottom: 32px;
        letter-spacing: 0.5px;
    }}

    .cover-meta {{
        display: flex;
        gap: 24px;
        align-items: center;
    }}

    .cover-date {{
        font-size: 10pt;
        color: rgba(255,255,255,0.7);
    }}

    .conf-badge {{
        background: {conf_color};
        color: {GCP_WHITE};
        font-size: 8pt;
        font-weight: 700;
        padding: 4px 14px;
        border-radius: 12px;
        letter-spacing: 1px;
        text-transform: uppercase;
    }}

    .cover-stripe {{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 6px;
        background: linear-gradient(90deg, {GCP_BLUE} 0%, {GCP_GREEN} 33%, {GCP_YELLOW} 66%, {GCP_RED} 100%);
    }}

    .cover-google-logo {{
        position: absolute;
        bottom: 24px;
        right: 20mm;
        font-size: 9pt;
        color: rgba(255,255,255,0.5);
        letter-spacing: 1px;
        font-weight: 500;
    }}
    """

    cover_html = f"""
    <div class="page cover">
        <div class="cover-eyebrow">Account Intelligence Brief</div>
        <div class="cover-company">{company}</div>
        <div class="cover-subtitle">Google Cloud Sales Intelligence</div>
        <div class="cover-meta">
            <span class="cover-date">{date}</span>
            <span class="conf-badge">Confidence: {confidence}</span>
        </div>
        <div class="cover-stripe"></div>
        <div class="cover-google-logo">Google Cloud</div>
    </div>
    """

    pages.append(cover_css + cover_html)

    # ------------------------------------------------------------------
    # Page 2 — Executive Summary + Company Profile
    # ------------------------------------------------------------------
    exec_summary = _esc(config.get("executive_summary", ""))
    profile = config.get("company_profile", {})

    profile_rows = "".join(
        f"""<tr>
            <td style="font-weight:500;color:{GCP_GREY_MID};padding:6px 12px;
                border-bottom:1px solid {GCP_GREY_BORDER};width:35%;">{_esc(k)}</td>
            <td style="padding:6px 12px;border-bottom:1px solid {GCP_GREY_BORDER};">{_esc(str(v))}</td>
           </tr>"""
        for k, v in profile.items()
    )

    p2_css = f"""
    .content-page {{
        padding: 18mm 20mm 28mm 20mm;
        min-height: 297mm;
        position: relative;
    }}

    .exec-box {{
        background: {GCP_GREY_LIGHT};
        border-left: 4px solid {GCP_BLUE};
        padding: 14px 18px;
        margin-bottom: 24px;
        border-radius: 0 4px 4px 0;
    }}

    .exec-box p {{
        font-size: 10pt;
        line-height: 1.6;
        color: {GCP_GREY_DARK};
    }}

    .profile-table {{
        width: 100%;
        border-collapse: collapse;
        font-size: 9.5pt;
        border-top: 2px solid {GCP_BLUE};
    }}

    .profile-table tr:last-child td {{
        border-bottom: none;
    }}
    """

    p2_html = f"""
    <div class="page content-page">
        {_section_header("Executive Summary")}
        <div class="exec-box">
            <p>{exec_summary}</p>
        </div>
        {_section_header("Company Profile")}
        <table class="profile-table">
            {profile_rows}
        </table>
        {_footer(2)}
    </div>
    """

    pages.append(p2_css + p2_html)

    # ------------------------------------------------------------------
    # Page 3 — Pain Point Map
    # ------------------------------------------------------------------
    pain_points = config.get("pain_points", [])

    pain_cards = ""
    for pp in pain_points:
        severity = str(pp.get("severity", "MEDIUM")).upper()
        card_color = SEVERITY_COLORS.get(severity, GCP_GREY_MID)
        pain_cards += f"""
        <div style="border:1px solid {GCP_GREY_BORDER};border-top:4px solid {card_color};
                    border-radius:4px;padding:12px 14px;background:{GCP_WHITE};
                    break-inside:avoid;margin-bottom:12px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <span style="font-weight:700;font-size:10pt;">{_esc(str(pp.get("pain", "")))}</span>
                {_severity_badge(severity)}
            </div>
            <div style="font-size:8.5pt;color:{GCP_GREY_MID};margin-bottom:6px;">
                <strong>Evidence:</strong> {_esc(str(pp.get("evidence", "")))}
            </div>
            <div style="font-size:8.5pt;background:#e8f0fe;padding:5px 8px;border-radius:3px;
                        color:{GCP_DARK_BLUE};">
                <strong>GCP Solution:</strong> {_esc(str(pp.get("gcp_solution", "")))}
            </div>
        </div>
        """

    p3_html = f"""
    <div class="page content-page">
        {_section_header("Pain Point Map", "Identified challenges ranked by business severity")}
        <div style="column-count:2;column-gap:16px;">
            {pain_cards}
        </div>
        {_footer(3)}
    </div>
    """

    pages.append(p3_html)

    # ------------------------------------------------------------------
    # Page 4 — Technology Landscape
    # ------------------------------------------------------------------
    tech = config.get("technology_landscape", {})
    current_techs = tech.get("current", [])
    recommended_techs = tech.get("recommended", [])

    def _tech_list(items: list) -> str:
        if not items:
            return "<p style='color:#ccc;font-style:italic;font-size:9pt;'>None listed</p>"
        rows = ""
        for item in items:
            if isinstance(item, dict):
                name = item.get("name", "")
                detail = item.get("detail", "")
                rows += f"""<div style="padding:7px 10px;background:{GCP_GREY_LIGHT};
                                border-radius:3px;margin-bottom:6px;font-size:9pt;">
                                <strong>{_esc(str(name))}</strong>
                                {"<br><span style='color:" + GCP_GREY_MID + ";font-size:8pt;'>" + _esc(str(detail)) + "</span>" if detail else ""}
                            </div>"""
            else:
                rows += f"""<div style="padding:7px 10px;background:{GCP_GREY_LIGHT};
                                border-radius:3px;margin-bottom:6px;font-size:9pt;">
                                {_esc(str(item))}
                            </div>"""
        return rows

    p4_html = f"""
    <div class="page content-page">
        {_section_header("Technology Landscape", "Current state vs. recommended GCP path")}
        <div style="display:grid;grid-template-columns:1fr 40px 1fr;gap:0;align-items:start;">
            <div>
                <div style="background:{GCP_GREY_MID};color:{GCP_WHITE};padding:7px 12px;
                            border-radius:4px 4px 0 0;font-size:9pt;font-weight:700;
                            text-transform:uppercase;letter-spacing:0.5px;">
                    Current State
                </div>
                <div style="border:1px solid {GCP_GREY_BORDER};border-top:none;
                            padding:12px;border-radius:0 0 4px 4px;min-height:160px;">
                    {_tech_list(current_techs)}
                </div>
            </div>
            <div style="display:flex;align-items:center;justify-content:center;
                        font-size:18pt;color:{GCP_BLUE};padding-top:32px;">
                &#8594;
            </div>
            <div>
                <div style="background:{GCP_BLUE};color:{GCP_WHITE};padding:7px 12px;
                            border-radius:4px 4px 0 0;font-size:9pt;font-weight:700;
                            text-transform:uppercase;letter-spacing:0.5px;">
                    Recommended GCP
                </div>
                <div style="border:1px solid {GCP_BLUE};border-top:none;
                            padding:12px;border-radius:0 0 4px 4px;min-height:160px;">
                    {_tech_list(recommended_techs)}
                </div>
            </div>
        </div>
        {_footer(4)}
    </div>
    """

    pages.append(p4_html)

    # ------------------------------------------------------------------
    # Page 5 — Stakeholder Map (2x2 influence/attitude grid)
    # ------------------------------------------------------------------
    stakeholders = config.get("stakeholder_map", [])

    # Quadrants: (attitude: positive/negative) x (influence: high/low)
    # We place initials as badges in the 2x2 grid using absolute positioning
    quadrant_labels = {
        "TL": ("Champions", GCP_GREEN, "High Influence / Positive"),
        "TR": ("Blockers", GCP_RED, "High Influence / Negative"),
        "BL": ("Allies", "#5bb3a8", "Low Influence / Positive"),
        "BR": ("Skeptics", GCP_YELLOW, "Low Influence / Negative"),
    }

    # Build stakeholder badge HTML - placed in correct quadrant area
    def _influence_pos(influence: str, attitude: str) -> str:
        """Return grid-area identifier."""
        inf_high = str(influence).lower() in ("high", "h", "3", "4", "5")
        att_pos = str(attitude).lower() in ("positive", "pos", "champion", "ally", "supporter", "support")
        if inf_high and att_pos:
            return "TL"
        if inf_high and not att_pos:
            return "TR"
        if not inf_high and att_pos:
            return "BL"
        return "BR"

    quadrant_contents: dict[str, list[str]] = {"TL": [], "TR": [], "BL": [], "BR": []}
    for sh in stakeholders:
        name = str(sh.get("name", "?"))
        initials = "".join(w[0].upper() for w in name.split()[:2])
        role = _esc(str(sh.get("role", "")))
        attitude = str(sh.get("attitude", "neutral"))
        influence = str(sh.get("influence", "low"))
        quad = _influence_pos(influence, attitude)
        color = quadrant_labels[quad][1]
        quadrant_contents[quad].append(
            f'<div style="background:{color};color:{GCP_WHITE};width:32px;height:32px;'
            f'border-radius:50%;display:inline-flex;align-items:center;justify-content:center;'
            f'font-weight:700;font-size:8pt;margin:2px;cursor:default;" title="{_esc(name)} — {role}">'
            f'{initials}</div>'
        )

    def _quad_html(key: str) -> str:
        label, color, desc = quadrant_labels[key]
        badges = "".join(quadrant_contents.get(key, []))
        if not badges:
            badges = f'<span style="font-size:8pt;color:{GCP_GREY_BORDER};font-style:italic;">None identified</span>'
        return f"""
        <div style="border:1px solid {GCP_GREY_BORDER};padding:10px;min-height:100px;
                    border-radius:3px;background:{GCP_WHITE};">
            <div style="font-size:8pt;font-weight:700;color:{color};
                        text-transform:uppercase;margin-bottom:6px;letter-spacing:0.5px;">
                {label}
            </div>
            <div style="font-size:7.5pt;color:{GCP_GREY_MID};margin-bottom:8px;">{desc}</div>
            <div>{badges}</div>
        </div>
        """

    # Build legend
    legend_items = ""
    for sh in stakeholders:
        name = _esc(str(sh.get("name", "")))
        role = _esc(str(sh.get("role", "")))
        influence = _esc(str(sh.get("influence", "")))
        attitude = _esc(str(sh.get("attitude", "")))
        initials = "".join(w[0].upper() for w in str(sh.get("name", "?")).split()[:2])
        quad = _influence_pos(str(sh.get("influence", "")), str(sh.get("attitude", "")))
        color = quadrant_labels[quad][1]
        legend_items += f"""
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:5px;font-size:8.5pt;">
            <div style="background:{color};color:{GCP_WHITE};width:22px;height:22px;
                        border-radius:50%;display:flex;align-items:center;justify-content:center;
                        font-weight:700;font-size:7pt;flex-shrink:0;">{initials}</div>
            <div><strong>{name}</strong> &mdash; {role}
                <span style="color:{GCP_GREY_MID};"> (Influence: {influence}, Attitude: {attitude})</span>
            </div>
        </div>
        """

    p5_html = f"""
    <div class="page content-page">
        {_section_header("Stakeholder Map", "Influence vs. attitude positioning")}
        <div style="display:grid;grid-template-columns:1fr 1fr;grid-template-rows:auto auto;gap:8px;margin-bottom:20px;">
            {_quad_html("TL")}
            {_quad_html("TR")}
            {_quad_html("BL")}
            {_quad_html("BR")}
        </div>
        <div style="background:{GCP_GREY_LIGHT};padding:12px;border-radius:4px;">
            <div style="font-size:8pt;font-weight:700;color:{GCP_GREY_MID};
                        text-transform:uppercase;margin-bottom:8px;letter-spacing:0.5px;">
                Stakeholder Directory
            </div>
            {legend_items if legend_items else '<p style="font-size:9pt;color:#ccc;font-style:italic;">No stakeholders defined</p>'}
        </div>
        {_footer(5)}
    </div>
    """

    pages.append(p5_html)

    # ------------------------------------------------------------------
    # Page 6 — Opportunity Assessment + Risk Factors
    # ------------------------------------------------------------------
    opp = config.get("opportunity_assessment", {})
    risks = config.get("risk_factors", [])

    def _gauge_bar(label: str, value: str, fill_pct: int, color: str) -> str:
        return f"""
        <div style="margin-bottom:14px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
                <span style="font-size:9pt;font-weight:500;">{_esc(label)}</span>
                <span style="font-size:9pt;font-weight:700;color:{color};">{_esc(value)}</span>
            </div>
            <div style="background:{GCP_GREY_BORDER};height:8px;border-radius:4px;">
                <div style="background:{color};height:8px;border-radius:4px;width:{fill_pct}%;"></div>
            </div>
        </div>
        """

    deal_size = str(opp.get("deal_size", "TBD"))
    timeline = str(opp.get("timeline", "TBD"))
    probability = str(opp.get("probability", "50%"))
    prob_num = int("".join(c for c in probability if c.isdigit()) or "50")

    opp_html = f"""
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:24px;">
        <div style="background:{GCP_GREY_LIGHT};border-radius:6px;padding:14px;text-align:center;">
            <div style="font-size:8pt;color:{GCP_GREY_MID};text-transform:uppercase;
                        letter-spacing:0.5px;margin-bottom:4px;">Deal Size</div>
            <div style="font-size:16pt;font-weight:700;color:{GCP_BLUE};">{_esc(deal_size)}</div>
        </div>
        <div style="background:{GCP_GREY_LIGHT};border-radius:6px;padding:14px;text-align:center;">
            <div style="font-size:8pt;color:{GCP_GREY_MID};text-transform:uppercase;
                        letter-spacing:0.5px;margin-bottom:4px;">Timeline</div>
            <div style="font-size:16pt;font-weight:700;color:{GCP_GREEN};">{_esc(timeline)}</div>
        </div>
        <div style="background:{GCP_GREY_LIGHT};border-radius:6px;padding:14px;text-align:center;">
            <div style="font-size:8pt;color:{GCP_GREY_MID};text-transform:uppercase;
                        letter-spacing:0.5px;margin-bottom:4px;">Probability</div>
            <div style="font-size:16pt;font-weight:700;color:{GCP_YELLOW};">{_esc(probability)}</div>
        </div>
    </div>
    {_gauge_bar("Win Probability", probability, min(prob_num, 100), GCP_YELLOW)}
    """

    risk_cards = ""
    for risk in risks:
        if isinstance(risk, dict):
            r_name = str(risk.get("risk", risk.get("name", str(risk))))
            r_severity = str(risk.get("severity", risk.get("level", "MEDIUM"))).upper()
            r_mitigation = str(risk.get("mitigation", ""))
        else:
            r_name = str(risk)
            r_severity = "MEDIUM"
            r_mitigation = ""
        r_color = SEVERITY_COLORS.get(r_severity, GCP_GREY_MID)
        risk_cards += f"""
        <div style="border-left:3px solid {r_color};padding:8px 12px;margin-bottom:8px;
                    background:{GCP_GREY_LIGHT};border-radius:0 4px 4px 0;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px;">
                <span style="font-weight:600;font-size:9.5pt;">{_esc(r_name)}</span>
                {_severity_badge(r_severity)}
            </div>
            {"<div style='font-size:8.5pt;color:" + GCP_GREY_MID + ";'><strong>Mitigation:</strong> " + _esc(r_mitigation) + "</div>" if r_mitigation else ""}
        </div>
        """

    p6_html = f"""
    <div class="page content-page">
        {_section_header("Opportunity Assessment")}
        {opp_html}
        {_section_header("Risk Factors")}
        {risk_cards if risk_cards else '<p style="font-size:9pt;color:#ccc;font-style:italic;">No risks identified</p>'}
        {_footer(6)}
    </div>
    """

    pages.append(p6_html)

    # ------------------------------------------------------------------
    # Page 7 — Recommended Approach + Next Steps
    # ------------------------------------------------------------------
    recommended = _esc(config.get("recommended_approach", ""))
    next_steps = config.get("next_steps", [])

    steps_html = ""
    for i, step in enumerate(next_steps, 1):
        if isinstance(step, dict):
            s_text = str(step.get("action", str(step)))
            s_owner = str(step.get("owner", ""))
            s_due = str(step.get("due", ""))
        else:
            s_text = str(step)
            s_owner = ""
            s_due = ""
        steps_html += f"""
        <div style="display:flex;gap:12px;margin-bottom:10px;align-items:flex-start;">
            <div style="background:{GCP_BLUE};color:{GCP_WHITE};width:24px;height:24px;
                        border-radius:50%;display:flex;align-items:center;justify-content:center;
                        font-weight:700;font-size:9pt;flex-shrink:0;">{i}</div>
            <div style="flex:1;">
                <div style="font-size:9.5pt;font-weight:500;">{_esc(s_text)}</div>
                {"<div style='font-size:8pt;color:" + GCP_GREY_MID + ";margin-top:2px;'>" + ("Owner: " + _esc(s_owner) if s_owner else "") + (" &nbsp;&bull;&nbsp; Due: " + _esc(s_due) if s_due else "") + "</div>" if s_owner or s_due else ""}
            </div>
        </div>
        """

    p7_html = f"""
    <div class="page content-page">
        {_section_header("Recommended Approach")}
        <div style="background:{GCP_GREY_LIGHT};border-left:4px solid {GCP_GREEN};
                    padding:14px 18px;border-radius:0 4px 4px 0;margin-bottom:24px;">
            <p style="font-size:10pt;line-height:1.6;">{recommended}</p>
        </div>
        {_section_header("Next Steps")}
        {steps_html if steps_html else '<p style="font-size:9pt;color:#ccc;font-style:italic;">No next steps defined</p>'}
        {_footer(7)}
    </div>
    """

    pages.append(p7_html)

    # ------------------------------------------------------------------
    # Assemble + render
    # ------------------------------------------------------------------
    body = "\n".join(pages)
    html = _html_page(body)
    return _write_pdf(html, output_path)


# ===========================================================================
# 2. Demo Trainer Guide
# ===========================================================================

def generate_trainer_guide(config: dict[str, Any]) -> str:
    """
    Generate a demo trainer guide PDF for pre-demo preparation.

    Parameters
    ----------
    config : dict
        Keys: company_name, demo_date, duration_minutes, language,
              presenters, attendees, sections, pre_demo_checklist,
              fallback_plans, post_demo_email, output_path.

    Returns
    -------
    str
        Absolute path to the generated PDF file.
    """
    company = _esc(config.get("company_name", "Customer"))
    demo_date = _esc(config.get("demo_date", ""))
    duration = config.get("duration_minutes", 45)
    language = _esc(config.get("language", "en").upper())
    presenters = config.get("presenters", [])
    attendees = config.get("attendees", [])
    sections = config.get("sections", [])
    checklist = config.get("pre_demo_checklist", [])
    fallbacks = config.get("fallback_plans", [])
    post_email = _esc(config.get("post_demo_email", ""))
    output_path = config.get("output_path", "/tmp/trainer_guide.pdf")

    pages: list[str] = []

    guide_css = f"""
    .guide-page {{
        padding: 15mm 18mm 28mm 18mm;
        min-height: 297mm;
        position: relative;
    }}

    .attendee-card {{
        border: 1px solid {GCP_GREY_BORDER};
        border-radius: 6px;
        padding: 12px;
        margin-bottom: 10px;
        background: {GCP_WHITE};
    }}

    .attendee-avatar {{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: {GCP_BLUE};
        color: {GCP_WHITE};
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 12pt;
        flex-shrink: 0;
    }}

    .concern-tag {{
        background: #fce8e6;
        color: {GCP_RED};
        font-size: 7.5pt;
        padding: 2px 8px;
        border-radius: 10px;
        margin-right: 4px;
        display: inline-block;
        margin-top: 3px;
    }}

    .say-col {{
        background: #e8f0fe;
        border-left: 4px solid {GCP_BLUE};
        padding: 10px 12px;
        border-radius: 0 4px 4px 0;
    }}

    .show-col {{
        background: #e6f4ea;
        border-left: 4px solid {GCP_GREEN};
        padding: 10px 12px;
        border-radius: 0 4px 4px 0;
    }}

    .key-message-box {{
        background: #fffde7;
        border: 1px solid {GCP_YELLOW};
        border-radius: 4px;
        padding: 8px 12px;
        margin-top: 8px;
        font-size: 9pt;
    }}

    .transition-text {{
        font-style: italic;
        color: {GCP_GREY_MID};
        font-size: 8.5pt;
        border-top: 1px dashed {GCP_GREY_BORDER};
        padding-top: 6px;
        margin-top: 6px;
    }}

    .objection-box {{
        border: 1.5px solid {GCP_RED};
        border-radius: 4px;
        padding: 8px 10px;
        margin-top: 8px;
        font-size: 8.5pt;
        background: #fff5f4;
    }}

    .timing-badge {{
        background: {GCP_NAVY};
        color: {GCP_WHITE};
        font-size: 8pt;
        padding: 3px 10px;
        border-radius: 10px;
        font-weight: 700;
    }}
    """

    # ------------------------------------------------------------------
    # Cover page
    # ------------------------------------------------------------------
    presenter_html = " &bull; ".join(_esc(p) for p in presenters)

    attendee_cover = ""
    for att in attendees[:6]:  # max 6 on cover
        name = str(att.get("name", ""))
        role = _esc(str(att.get("role", "")))
        initials = "".join(w[0].upper() for w in name.split()[:2])
        name = _esc(name)
        attendee_cover += f"""
        <div style="display:inline-flex;align-items:center;gap:8px;
                    background:rgba(255,255,255,0.12);border-radius:4px;
                    padding:6px 10px;margin:4px;">
            <div style="background:rgba(255,255,255,0.3);color:{GCP_WHITE};width:28px;height:28px;
                        border-radius:50%;display:flex;align-items:center;justify-content:center;
                        font-weight:700;font-size:9pt;">{initials}</div>
            <div>
                <div style="font-size:9pt;font-weight:600;color:{GCP_WHITE};">{name}</div>
                <div style="font-size:7.5pt;color:rgba(255,255,255,0.7);">{role}</div>
            </div>
        </div>
        """

    cover_page = f"""
    <div class="page" style="background:linear-gradient(145deg,{GCP_DARK_BLUE} 0%,{GCP_BLUE} 100%);
         padding:25mm 20mm 20mm 20mm;position:relative;min-height:297mm;">
        <div style="font-size:8pt;letter-spacing:2px;color:rgba(255,255,255,0.6);
                    text-transform:uppercase;margin-bottom:8px;">Demo Trainer Guide</div>
        <div style="font-size:28pt;font-weight:700;color:{GCP_WHITE};line-height:1.1;margin-bottom:6px;">
            {company}
        </div>
        <div style="font-size:11pt;color:rgba(255,255,255,0.8);margin-bottom:30px;">
            {demo_date} &nbsp;&bull;&nbsp; {duration} minutes &nbsp;&bull;&nbsp; {language}
        </div>

        <div style="margin-bottom:20px;">
            <div style="font-size:8pt;color:rgba(255,255,255,0.5);text-transform:uppercase;
                        letter-spacing:1px;margin-bottom:6px;">Presenters</div>
            <div style="font-size:10pt;color:{GCP_WHITE};">{presenter_html}</div>
        </div>

        <div>
            <div style="font-size:8pt;color:rgba(255,255,255,0.5);text-transform:uppercase;
                        letter-spacing:1px;margin-bottom:8px;">Attendees</div>
            <div style="display:flex;flex-wrap:wrap;">
                {attendee_cover}
            </div>
        </div>

        <div style="position:absolute;bottom:0;left:0;right:0;height:6px;
                    background:linear-gradient(90deg,{GCP_BLUE} 0%,{GCP_GREEN} 33%,{GCP_YELLOW} 66%,{GCP_RED} 100%);"></div>
        <div style="position:absolute;bottom:14px;right:20mm;font-size:8pt;
                    color:rgba(255,255,255,0.4);">Google Cloud</div>
    </div>
    """

    pages.append(guide_css + cover_page)

    # ------------------------------------------------------------------
    # Attendee details page
    # ------------------------------------------------------------------
    attendee_detail_cards = ""
    for att in attendees:
        name = str(att.get("name", ""))
        role = _esc(str(att.get("role", "")))
        concerns = att.get("concerns", [])
        notes = _esc(str(att.get("notes", "")))
        initials = "".join(w[0].upper() for w in name.split()[:2])
        name_esc = _esc(name)
        concern_tags = "".join(
            f'<span class="concern-tag">{_esc(str(c))}</span>' for c in concerns
        )
        attendee_detail_cards += f"""
        <div style="display:flex;gap:12px;border:1px solid {GCP_GREY_BORDER};
                    border-radius:6px;padding:12px;margin-bottom:10px;">
            <div class="attendee-avatar">{initials}</div>
            <div style="flex:1;">
                <div style="font-weight:700;font-size:10.5pt;">{name_esc}</div>
                <div style="font-size:9pt;color:{GCP_GREY_MID};margin-bottom:6px;">{role}</div>
                {"<div style='margin-bottom:6px;'><span style='font-size:8pt;font-weight:500;color:" + GCP_GREY_MID + ";'>Known concerns: </span>" + concern_tags + "</div>" if concerns else ""}
                {"<div style='font-size:8.5pt;color:" + GCP_GREY_MID + ";'>" + notes + "</div>" if notes else ""}
            </div>
        </div>
        """

    checklist_items = ""
    for item in checklist:
        checklist_items += f"""
        <div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:6px;font-size:9.5pt;">
            <span style="font-size:12pt;line-height:1;color:{GCP_GREY_MID};">&#9744;</span>
            <span>{_esc(str(item))}</span>
        </div>
        """

    p2_guide = f"""
    <div class="page guide-page">
        {_section_header("Attendee Intelligence")}
        {attendee_detail_cards if attendee_detail_cards else '<p style="font-size:9pt;color:#ccc;font-style:italic;">No attendees defined</p>'}

        {_section_header("Pre-Demo Checklist")}
        {checklist_items if checklist_items else '<p style="font-size:9pt;color:#ccc;font-style:italic;">No checklist items</p>'}
        {_footer(2)}
    </div>
    """

    pages.append(p2_guide)

    # ------------------------------------------------------------------
    # Section pages
    # ------------------------------------------------------------------
    elapsed = 0
    for page_num, section in enumerate(sections, 3):
        title = _esc(str(section.get("title", f"Section {page_num - 2}")))
        dur_str = str(section.get("duration", ""))
        say_this = _esc(str(section.get("say_this", "")))
        show_that = _esc(str(section.get("show_that", "")))
        key_message = _esc(str(section.get("key_message", "")))
        transition = _esc(str(section.get("transition", "")))
        objections = section.get("objections", [])

        # Timing
        try:
            dur_min = int("".join(c for c in dur_str if c.isdigit()))
        except (ValueError, TypeError):
            dur_min = 0
        remaining = duration - elapsed
        elapsed += dur_min

        objection_html = ""
        for obj in objections:
            if isinstance(obj, dict):
                ob_q = _esc(str(obj.get("objection", str(obj))))
                ob_r = _esc(str(obj.get("response", "")))
            else:
                ob_q = _esc(str(obj))
                ob_r = ""
            objection_html += f"""
            <div class="objection-box">
                <div style="font-weight:700;color:{GCP_RED};font-size:8pt;
                            text-transform:uppercase;margin-bottom:4px;">&#9888; Objection Handler</div>
                <div style="font-weight:600;margin-bottom:4px;">&ldquo;{ob_q}&rdquo;</div>
                {"<div style='font-style:italic;'>&rarr; " + ob_r + "</div>" if ob_r else ""}
            </div>
            """

        section_page = f"""
        <div class="page guide-page">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
                <div>
                    <div style="font-size:8pt;color:{GCP_GREY_MID};text-transform:uppercase;
                                letter-spacing:1px;margin-bottom:3px;">Section {page_num - 2}</div>
                    <h2 style="font-size:14pt;color:{GCP_DARK_BLUE};">{title}</h2>
                </div>
                <div style="text-align:right;">
                    <span class="timing-badge">{_esc(dur_str)}</span>
                    <div style="font-size:7.5pt;color:{GCP_GREY_MID};margin-top:4px;">
                        Elapsed: {elapsed} min &nbsp;|&nbsp; Remaining: {remaining} min
                    </div>
                </div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
                <div>
                    <div style="font-size:8pt;font-weight:700;color:{GCP_BLUE};
                                text-transform:uppercase;margin-bottom:6px;letter-spacing:0.5px;">
                        &#128172; Say This
                    </div>
                    <div class="say-col">{say_this}</div>
                </div>
                <div>
                    <div style="font-size:8pt;font-weight:700;color:{GCP_GREEN};
                                text-transform:uppercase;margin-bottom:6px;letter-spacing:0.5px;">
                        &#128250; Show That
                    </div>
                    <div class="show-col">{show_that}</div>
                </div>
            </div>

            {"<div class='key-message-box'><strong style='font-size:8pt;color:#f9a825;text-transform:uppercase;'>&#11088; Key Message: </strong>" + key_message + "</div>" if key_message else ""}
            {objection_html}
            {"<div class='transition-text'>&#8594; <strong>Transition: </strong>" + transition + "</div>" if transition else ""}
            {_footer(page_num)}
        </div>
        """

        pages.append(section_page)

    next_page_num = len(sections) + 3

    # ------------------------------------------------------------------
    # Fallback plans page
    # ------------------------------------------------------------------
    fallback_html = ""
    for i, fb in enumerate(fallbacks, 1):
        if isinstance(fb, dict):
            fb_situation = _esc(str(fb.get("situation", str(fb))))
            fb_action = _esc(str(fb.get("action", "")))
            fb_script = _esc(str(fb.get("script", "")))
        else:
            fb_situation = _esc(str(fb))
            fb_action = ""
            fb_script = ""
        fallback_html += f"""
        <div style="border:1px solid {GCP_GREY_BORDER};border-radius:6px;padding:12px;
                    margin-bottom:10px;border-left:4px solid {GCP_YELLOW};">
            <div style="font-weight:700;font-size:10pt;margin-bottom:4px;">
                {i}. {fb_situation}
            </div>
            {"<div style='font-size:9pt;margin-bottom:4px;'><strong>Action: </strong>" + fb_action + "</div>" if fb_action else ""}
            {"<div style='font-size:8.5pt;font-style:italic;color:" + GCP_GREY_MID + ";background:" + GCP_GREY_LIGHT + ";padding:6px 8px;border-radius:3px;'>&ldquo;" + fb_script + "&rdquo;</div>" if fb_script else ""}
        </div>
        """

    post_email_html = f"""
    <div style="background:{GCP_GREY_LIGHT};border:1px solid {GCP_GREY_BORDER};border-radius:4px;
                padding:14px;font-size:9pt;white-space:pre-wrap;font-family:monospace;line-height:1.6;">
{post_email}
    </div>
    """ if post_email else '<p style="font-size:9pt;color:#ccc;font-style:italic;">No email template defined</p>'

    fallback_page = f"""
    <div class="page guide-page">
        {_section_header("Fallback Plans", "What to do when things go sideways")}
        {fallback_html if fallback_html else '<p style="font-size:9pt;color:#ccc;font-style:italic;">No fallbacks defined</p>'}

        {_section_header("Post-Demo Follow-Up Email Template")}
        {post_email_html}
        {_footer(next_page_num)}
    </div>
    """

    pages.append(fallback_page)
    next_page_num += 1

    # ------------------------------------------------------------------
    # Back cover with QR placeholder
    # ------------------------------------------------------------------
    back_cover = f"""
    <div class="page" style="background:{GCP_NAVY};min-height:297mm;position:relative;
         display:flex;flex-direction:column;align-items:center;justify-content:center;
         padding:20mm;">
        <div style="font-size:10pt;color:rgba(255,255,255,0.5);text-transform:uppercase;
                    letter-spacing:2px;margin-bottom:12px;">Demo Complete?</div>
        <div style="font-size:22pt;font-weight:700;color:{GCP_WHITE};margin-bottom:8px;
                    text-align:center;">Share Your Feedback</div>
        <div style="font-size:10pt;color:rgba(255,255,255,0.6);margin-bottom:32px;
                    text-align:center;">Help us improve future demos</div>

        <div style="width:120px;height:120px;background:{GCP_WHITE};border-radius:8px;
                    display:flex;align-items:center;justify-content:center;margin-bottom:20px;">
            <div style="font-size:8pt;color:{GCP_GREY_MID};text-align:center;
                        line-height:1.4;padding:10px;">QR Code<br>Placeholder<br>(feedback link)</div>
        </div>

        <div style="font-size:9pt;color:rgba(255,255,255,0.4);">Google Cloud &mdash; {company}</div>
        <div style="position:absolute;bottom:0;left:0;right:0;height:6px;
                    background:linear-gradient(90deg,{GCP_BLUE} 0%,{GCP_GREEN} 33%,{GCP_YELLOW} 66%,{GCP_RED} 100%);"></div>
    </div>
    """

    pages.append(back_cover)

    body = "\n".join(pages)
    html = _html_page(body)
    return _write_pdf(html, output_path)


# ===========================================================================
# 3. Competitive Battlecard
# ===========================================================================

def generate_battlecard(config: dict[str, Any]) -> str:
    """
    Generate a one-page landscape competitive battlecard PDF.

    Parameters
    ----------
    config : dict
        Keys: title, comparison (list of dicts with dimension/google/competitor),
              key_wins, objections, output_path.

    Returns
    -------
    str
        Absolute path to the generated PDF file.
    """
    title = _esc(config.get("title", "Competitive Battlecard"))
    comparison = config.get("comparison", [])
    key_wins = config.get("key_wins", [])
    objections = config.get("objections", [])
    output_path = config.get("output_path", "/tmp/battlecard.pdf")

    battlecard_css = f"""
    @page {{
        size: A4 landscape;
        margin: 0;
    }}

    body {{
        font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
        font-size: 8.5pt;
        color: {GCP_GREY_DARK};
    }}

    .bc-page {{
        width: 297mm;
        min-height: 210mm;
        position: relative;
        display: grid;
        grid-template-rows: auto 1fr;
    }}

    .bc-header {{
        background: {GCP_DARK_BLUE};
        padding: 10px 16mm;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }}

    .bc-title {{
        font-size: 14pt;
        font-weight: 700;
        color: {GCP_WHITE};
    }}

    .bc-subtitle {{
        font-size: 8pt;
        color: rgba(255,255,255,0.6);
        margin-top: 2px;
    }}

    .bc-body {{
        padding: 10mm 16mm 20mm 16mm;
        display: grid;
        grid-template-columns: 1.2fr 1fr 1fr;
        gap: 14px;
        align-items: start;
    }}

    /* Comparison table */
    .bc-table {{
        width: 100%;
        border-collapse: collapse;
        font-size: 8pt;
    }}

    .bc-table th {{
        padding: 6px 8px;
        text-align: left;
        font-size: 7.5pt;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        border-bottom: 2px solid {GCP_GREY_BORDER};
    }}

    .bc-table th.google-col {{
        color: {GCP_BLUE};
        background: #e8f0fe;
    }}

    .bc-table th.competitor-col {{
        color: {GCP_GREY_MID};
        background: {GCP_GREY_LIGHT};
    }}

    .bc-table th.dim-col {{
        color: {GCP_GREY_MID};
        background: {GCP_WHITE};
    }}

    .bc-table td {{
        padding: 6px 8px;
        vertical-align: top;
        border-bottom: 1px solid {GCP_GREY_BORDER};
        line-height: 1.35;
    }}

    .bc-table td.google-td {{
        background: #f8fbff;
        color: {GCP_GREY_DARK};
    }}

    .bc-table td.competitor-td {{
        color: {GCP_GREY_MID};
    }}

    .bc-table tr:last-child td {{
        border-bottom: none;
    }}

    /* Win arguments */
    .win-box {{
        display: flex;
        align-items: flex-start;
        gap: 6px;
        background: #e6f4ea;
        border-left: 3px solid {GCP_GREEN};
        padding: 6px 8px;
        border-radius: 0 3px 3px 0;
        margin-bottom: 6px;
        font-size: 8pt;
    }}

    .win-bullet {{
        color: {GCP_GREEN};
        font-weight: 700;
        font-size: 9pt;
        flex-shrink: 0;
        line-height: 1.2;
    }}

    /* Objection handlers */
    .obj-box {{
        border: 1px solid {GCP_YELLOW};
        border-radius: 4px;
        padding: 7px 8px;
        margin-bottom: 6px;
        background: #fffde7;
        font-size: 8pt;
    }}

    .obj-q {{
        font-weight: 600;
        color: {GCP_GREY_DARK};
        margin-bottom: 3px;
    }}

    .obj-a {{
        color: {GCP_GREY_MID};
        font-style: italic;
        line-height: 1.4;
    }}

    .bc-footer {{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 20px;
        background: {GCP_NAVY};
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16mm;
    }}

    .bc-footer span {{
        font-size: 6.5pt;
        color: rgba(255,255,255,0.6);
    }}

    .section-label {{
        font-size: 8pt;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: {GCP_GREY_MID};
        margin-bottom: 8px;
        padding-bottom: 4px;
        border-bottom: 1px solid {GCP_GREY_BORDER};
    }}
    """

    # Comparison table rows
    table_rows = ""
    for row in comparison:
        dim = _esc(str(row.get("dimension", "")))
        google = _esc(str(row.get("google", "")))
        competitor = _esc(str(row.get("competitor", "")))
        table_rows += f"""
        <tr>
            <td style="font-weight:500;">{dim}</td>
            <td class="google-td">{google}</td>
            <td class="competitor-td">{competitor}</td>
        </tr>
        """

    # Determine competitor name from title
    parts = config.get("title", "").split(" vs ")
    google_label = "Google" if len(parts) < 1 else parts[0].replace("Google ", "")
    competitor_label = "Competitor" if len(parts) < 2 else parts[1].strip()

    comparison_html = f"""
    <div>
        <div class="section-label">Feature Comparison</div>
        <table class="bc-table">
            <thead>
                <tr>
                    <th class="dim-col">Dimension</th>
                    <th class="google-col">{_esc(google_label)}</th>
                    <th class="competitor-col">{_esc(competitor_label)}</th>
                </tr>
            </thead>
            <tbody>
                {table_rows}
            </tbody>
        </table>
    </div>
    """

    # Win arguments
    wins_html = '<div class="section-label">Why Google Wins</div>'
    for win in key_wins:
        wins_html += f"""
        <div class="win-box">
            <span class="win-bullet">&#10003;</span>
            <span>{_esc(str(win))}</span>
        </div>
        """
    if not key_wins:
        wins_html += '<p style="font-size:8pt;color:#ccc;font-style:italic;">No win arguments defined</p>'

    # Objection handlers
    objs_html = '<div class="section-label">Objection Handlers</div>'
    for obj in objections:
        if isinstance(obj, dict):
            ob_q = _esc(str(obj.get("objection", str(obj))))
            ob_r = _esc(str(obj.get("response", "")))
        else:
            ob_q = _esc(str(obj))
            ob_r = ""
        objs_html += f"""
        <div class="obj-box">
            <div class="obj-q">&ldquo;{ob_q}&rdquo;</div>
            {"<div class='obj-a'>&rarr; " + ob_r + "</div>" if ob_r else ""}
        </div>
        """
    if not objections:
        objs_html += '<p style="font-size:8pt;color:#ccc;font-style:italic;">No objections defined</p>'

    right_col = f"""
    <div style="display:grid;grid-template-rows:auto auto;gap:14px;">
        <div>{wins_html}</div>
        <div>{objs_html}</div>
    </div>
    """

    body = f"""
    <style>{battlecard_css}</style>
    <div class="bc-page">
        <div class="bc-header">
            <div>
                <div class="bc-title">{title}</div>
                <div class="bc-subtitle">Google Cloud Sales Battlecard &mdash; Internal Use Only</div>
            </div>
            <div style="font-size:8pt;color:rgba(255,255,255,0.5);">Google Cloud</div>
        </div>
        <div class="bc-body">
            {comparison_html}
            {right_col}
        </div>
        <div class="bc-footer">
            <span>CONFIDENTIAL &mdash; Prepared by Google Cloud</span>
            <span>Internal use only. Do not distribute to customers.</span>
        </div>
    </div>
    """

    html = f"""<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/></head>
<body>
{body}
</body>
</html>"""

    return _write_pdf(html, output_path)


# ===========================================================================
# Sample data + main
# ===========================================================================

def _sample_research_report() -> str:
    """Generate a sample research report for testing."""
    config: dict[str, Any] = {
        "company_name": "KGHM Polska Miedz",
        "date": "2026-03-17",
        "confidence": "MEDIUM",
        "executive_summary": (
            "KGHM Polska Miedz S.A. is one of the world's largest copper and silver producers, "
            "operating extensive underground mining infrastructure across Poland, Chile, and Canada. "
            "The company faces significant operational technology modernization pressure driven by ESG "
            "reporting mandates, underground worker safety requirements, and commodity market volatility. "
            "GCP's Vertex AI, BigQuery, and IoT real-time telemetry capabilities align directly with "
            "KGHM's Digital Mine 2030 initiative, presenting a EUR 4-8M annual contract opportunity "
            "over a 3-year horizon."
        ),
        "company_profile": {
            "Revenue": "PLN 35.3B (FY2025)",
            "Employees": "34,500",
            "Industry": "Mining & Metals",
            "Headquarters": "Lubin, Poland",
            "Ownership": "State-owned (31.8% State Treasury)",
            "IT Budget (est.)": "PLN 850M",
            "Cloud Maturity": "Early Adopter",
        },
        "pain_points": [
            {
                "pain": "Underground worker safety",
                "severity": "HIGH",
                "evidence": "3 fatalities in 2025; seismic event monitoring gaps",
                "gcp_solution": "Vertex AI anomaly detection + Pub/Sub real-time alerting",
            },
            {
                "pain": "ESG reporting compliance",
                "severity": "HIGH",
                "evidence": "EU CSRD mandatory from FY2025; current manual process",
                "gcp_solution": "BigQuery + Looker for automated sustainability dashboards",
            },
            {
                "pain": "Predictive equipment maintenance",
                "severity": "MEDIUM",
                "evidence": "Unplanned downtime costs est. PLN 180M/year",
                "gcp_solution": "Cloud IoT + Vertex AI predictive ML models",
            },
            {
                "pain": "Data silos across mine sites",
                "severity": "MEDIUM",
                "evidence": "10+ legacy SCADA systems, no unified data lake",
                "gcp_solution": "Cloud Storage + Dataflow unified data platform",
            },
            {
                "pain": "Cybersecurity of OT networks",
                "severity": "HIGH",
                "evidence": "ICS/SCADA systems on legacy Windows XP/7",
                "gcp_solution": "Chronicle SIEM + Security Command Center",
            },
        ],
        "technology_landscape": {
            "current": [
                {"name": "SAP ERP (on-prem)", "detail": "S/4HANA migration pending"},
                {"name": "OSIsoft PI Historian", "detail": "OT telemetry, siloed"},
                {"name": "IBM Maximo", "detail": "Asset management, outdated"},
                {"name": "On-prem data warehouse", "detail": "Teradata, end-of-life 2027"},
                {"name": "Oracle DB", "detail": "Finance & HR systems"},
            ],
            "recommended": [
                {"name": "BigQuery", "detail": "Unified analytics & ESG reporting"},
                {"name": "Vertex AI", "detail": "Safety anomaly detection & predictive maintenance"},
                {"name": "Pub/Sub + Dataflow", "detail": "Real-time OT telemetry ingestion"},
                {"name": "Looker", "detail": "Executive & regulatory dashboards"},
                {"name": "Chronicle SIEM", "detail": "OT/IT security monitoring"},
            ],
        },
        "stakeholder_map": [
            {"name": "Marcin Chludzinski", "role": "CEO", "influence": "high", "attitude": "neutral"},
            {"name": "Pawel Gruza", "role": "VP Operations", "influence": "high", "attitude": "positive"},
            {"name": "Tomasz Zdzikot", "role": "CIO", "influence": "high", "attitude": "positive"},
            {"name": "Anna Kolonko", "role": "CFO", "influence": "high", "attitude": "negative"},
            {"name": "Rafal Pawelczak", "role": "CISO", "influence": "low", "attitude": "positive"},
            {"name": "Boguslaw Szarek", "role": "IT Director", "influence": "low", "attitude": "negative"},
        ],
        "opportunity_assessment": {
            "deal_size": "EUR 4-8M / year",
            "timeline": "Q3 2026",
            "probability": "35%",
            "stage": "Discovery",
        },
        "risk_factors": [
            {
                "risk": "State treasury procurement rules",
                "severity": "HIGH",
                "mitigation": "Engage GCP public sector team; use framework agreements",
            },
            {
                "risk": "AWS incumbent relationship",
                "severity": "MEDIUM",
                "mitigation": "Lead with unique Vertex AI + BigQuery differentiation",
            },
            {
                "risk": "Polish data residency requirements",
                "severity": "MEDIUM",
                "mitigation": "GCP Warsaw region (europe-central2) fully available",
            },
            {
                "risk": "SAP migration dependency",
                "severity": "LOW",
                "mitigation": "Position as complementary analytics layer, not replacement",
            },
        ],
        "recommended_approach": (
            "Lead with a 30-day proof-of-value on underground seismic anomaly detection using "
            "existing OSIsoft PI historian data. This directly addresses the board-level safety "
            "concern, bypasses procurement gatekeeping, and can be executed under a EUR 50K "
            "innovation budget without competitive tender. Use the POV results to build the business "
            "case for the full Digital Mine platform."
        ),
        "next_steps": [
            {
                "action": "Schedule executive briefing with CIO Tomasz Zdzikot",
                "owner": "Kacper Ptasinski (AE)",
                "due": "2026-03-28",
            },
            {
                "action": "Prepare seismic anomaly detection demo on synthetic PI data",
                "owner": "CE Team",
                "due": "2026-04-04",
            },
            {
                "action": "Submit innovation budget proposal (< EUR 50K)",
                "owner": "Kacper Ptasinski + Legal",
                "due": "2026-04-10",
            },
            {
                "action": "Align with GCP Public Sector on state-owned enterprise procurement path",
                "owner": "Kacper Ptasinski",
                "due": "2026-03-24",
            },
        ],
        "output_path": "/tmp/KGHM_research_report.pdf",
    }
    return generate_research_report(config)


def _sample_trainer_guide() -> str:
    """Generate a sample trainer guide for testing."""
    config: dict[str, Any] = {
        "company_name": "TransNova Logistics",
        "demo_date": "2026-03-24",
        "duration_minutes": 45,
        "language": "PL",
        "presenters": ["Kacper Ptasinski (AE)", "Jan Kowalski (CE)"],
        "attendees": [
            {
                "name": "Tomasz Nowicki",
                "role": "IT Director",
                "concerns": ["migration risk", "team workload", "vendor lock-in"],
                "notes": "Technically strong; skeptical of cloud costs. Cite TCO study.",
            },
            {
                "name": "Anna Wisniewska",
                "role": "HR Director",
                "concerns": ["adoption", "training", "job displacement"],
                "notes": "Focuses on people impact. Emphasize change management support.",
            },
            {
                "name": "Piotr Kaminski",
                "role": "CFO",
                "concerns": ["CAPEX to OPEX shift", "ROI timeline"],
                "notes": "Will ask about 3-year TCO. Prepare Looker dashboard for this.",
            },
        ],
        "sections": [
            {
                "title": "Opening & Discovery",
                "duration": "8 min",
                "say_this": (
                    "Before I start any slides, I want to understand what keeps you up at night. "
                    "Tomasz, you mentioned migration risk in our pre-call — can you tell me more? "
                    "What does your ideal outcome from today look like?"
                ),
                "show_that": "No slides — open notebook, active listening",
                "key_message": "Establish credibility through listening, not pitching",
                "transition": "Based on what you've shared, let me show you how other logistics companies have tackled exactly this...",
                "objections": [
                    {
                        "objection": "We don't have time for another vendor pitch",
                        "response": "Understood — this isn't a pitch. I want 8 minutes to understand your constraints, then you decide if this is worth continuing.",
                    }
                ],
            },
            {
                "title": "Route Optimization Live Demo",
                "duration": "15 min",
                "say_this": (
                    "I'm going to show you a live system running on TransNova's own route data — "
                    "we pre-loaded your Poland-Germany corridor. Watch what happens when I introduce "
                    "a weather event near Frankfurt..."
                ),
                "show_that": "GCP demo environment — Maps API + Vertex AI route optimizer. Tab: chrome://newtab if demo fails.",
                "key_message": "Real data, real results: 18% reduction in fuel cost in the Frankfurt simulation",
                "transition": "Now that you've seen the optimization engine, let me show Anna how the driver adoption piece works...",
                "objections": [
                    {
                        "objection": "Our routes are more complex than this demo",
                        "response": "Agreed — we simplified for time. In the POC we'd model your full network with all constraints. Want to define that scope today?",
                    },
                    {
                        "objection": "What about our SAP integration?",
                        "response": "Great timing — next slide shows exactly that. We have a pre-built SAP S/4HANA connector.",
                    },
                ],
            },
            {
                "title": "TCO & Commercial Structure",
                "duration": "12 min",
                "say_this": (
                    "Piotr, I know you need numbers. Here's a 3-year TCO model we built with "
                    "a comparable Polish logistics company. Line 1 is today's cost. Line 2 is GCP. "
                    "The crossover point is month 14."
                ),
                "show_that": "Looker dashboard — TCO model (bookmark: bit.ly/transnova-tco). Have PDF backup ready.",
                "key_message": "OPEX model eliminates EUR 2.3M upfront infrastructure investment",
                "transition": "Let me now walk through what the first 90 days would look like operationally...",
            },
            {
                "title": "Implementation Roadmap & Next Steps",
                "duration": "10 min",
                "say_this": (
                    "I want to propose a 30-day paid pilot on your Poznan depot — no risk, "
                    "no commitment beyond that. If you don't see value, we part as friends. "
                    "If you do, we have a clear path to full rollout. Can we agree on a start date today?"
                ),
                "show_that": "Roadmap slide — 90-day phased plan. Close on pilot approval.",
                "key_message": "Low-risk pilot removes the decision barrier. Ask for the date, not the contract.",
                "transition": "Let me leave you with one final thought...",
            },
        ],
        "pre_demo_checklist": [
            "Demo environment credentials verified (demo@gcp-transnova.iam.gserviceaccount.com)",
            "TransNova route data pre-loaded in Vertex AI demo project",
            "Looker TCO dashboard accessible on both laptops",
            "Backup PDF slides ready on USB + Google Drive",
            "Attendee research completed — LinkedIn profiles reviewed",
            "Room booked with screen/projector (confirmed with Anna Wisniewska)",
            "Post-demo email template personalized and ready to send within 2 hours",
            "CE (Jan) briefed on objection handling for SAP integration questions",
        ],
        "fallback_plans": [
            {
                "situation": "Demo environment is down",
                "action": "Switch to pre-recorded demo video immediately",
                "script": "I want to show you the actual product, but rather than waste your time on a tech issue, I have a 5-minute recorded walkthrough that covers the same points. Is that OK?",
            },
            {
                "situation": "CFO pushes back hard on pricing",
                "action": "Offer to do a formal TCO workshop with finance team",
                "script": "I hear you — the numbers need to be right. Can we schedule a 2-hour working session with your finance team to model your specific numbers? I'll bring our commercial team.",
            },
            {
                "situation": "IT Director shuts down the meeting early",
                "action": "Acknowledge and offer executive escalation",
                "script": "I respect that your time is valuable. Can I ask — what would make this conversation worth 15 more minutes for you?",
            },
        ],
        "post_demo_email": textwrap.dedent("""\
            Subject: TransNova x Google Cloud — Follow-Up & Pilot Proposal

            Hi Tomasz,

            Thank you for your time today. As promised, I'm sending a summary within 2 hours.

            Key points we discussed:
            - Route optimization: 18% fuel cost reduction modeled on your Poznan-Frankfurt corridor
            - TCO model: EUR 2.3M infrastructure investment eliminated; 14-month payback period
            - Pilot proposal: 30-day, no-commitment proof-of-value on Poznan depot

            Attached:
            - Slide deck with speaker notes
            - TCO model (Excel + Looker link)
            - Pilot scope proposal (1 page)

            Proposed next step: 30-minute call Thursday 2026-03-26 to confirm pilot parameters.
            Does 10:00 CET work for you?

            Best regards,
            Kacper Ptasinski
            Account Executive, Google Cloud Poland
            kacper@google.com | +48 XXX XXX XXX
        """),
        "output_path": "/tmp/TransNova_trainer_guide.pdf",
    }
    return generate_trainer_guide(config)


def _sample_battlecard() -> str:
    """Generate a sample battlecard for testing."""
    config: dict[str, Any] = {
        "title": "Google Workspace vs Microsoft 365",
        "comparison": [
            {
                "dimension": "AI Assistant",
                "google": "Gemini included in all plans — no extra SKU",
                "competitor": "Copilot M365 = +$30/user/month add-on",
            },
            {
                "dimension": "Email",
                "google": "Gmail — AI-powered spam, search, smart reply",
                "competitor": "Outlook — desktop-first, complex UI",
            },
            {
                "dimension": "Collaboration",
                "google": "Google Docs real-time co-editing, no conflicts",
                "competitor": "SharePoint/OneDrive sync conflicts common",
            },
            {
                "dimension": "Video Conferencing",
                "google": "Google Meet — no download, browser-native",
                "competitor": "Teams — heavy client, known reliability issues",
            },
            {
                "dimension": "Admin Console",
                "google": "Single unified Admin Console for all products",
                "competitor": "Multiple portals (Azure AD, Exchange Admin, Teams Admin...)",
            },
            {
                "dimension": "Security",
                "google": "BeyondCorp Zero Trust built-in",
                "competitor": "Requires separate Azure AD P2 license",
            },
            {
                "dimension": "Storage",
                "google": "Pooled storage across org — no per-user limits",
                "competitor": "1TB per user; SharePoint tenant quotas",
            },
            {
                "dimension": "Uptime SLA",
                "google": "99.9% financially backed SLA (actual: 99.99%)",
                "competitor": "99.9% SLA; multiple outage incidents in 2025",
            },
            {
                "dimension": "Pricing",
                "google": "Business Starter from $6/user/month",
                "competitor": "Microsoft 365 Business Basic from $6/user + Copilot $30",
            },
            {
                "dimension": "Offline Mode",
                "google": "Full offline editing in Chrome with sync",
                "competitor": "Full offline with desktop apps",
            },
        ],
        "key_wins": [
            "AI (Gemini) included — not an expensive add-on",
            "Single admin console reduces IT overhead by ~40%",
            "Real-time collaboration eliminates version conflict issues",
            "Zero Trust security architecture built-in at no extra cost",
            "True browser-native — works on any device, any OS",
            "Pooled storage eliminates per-user quota management",
        ],
        "objections": [
            {
                "objection": "We're already deeply invested in Microsoft",
                "response": "That investment was made before AI became mandatory. The Copilot add-on cost alone offsets the migration cost within 18 months.",
            },
            {
                "objection": "Our users know Office, retraining is expensive",
                "response": "Google Workspace has Docs/Sheets/Slides compatibility. We include change management and training in the migration package.",
            },
            {
                "objection": "We need Outlook/Exchange for complex email rules",
                "response": "Gmail supports all standard IMAP rules + advanced Workspace Admin policies. 94% of Outlook features are available in Gmail.",
            },
            {
                "objection": "What about our SharePoint intranet?",
                "response": "Google Sites + Drive can replicate SharePoint functionality. We have 3 SharePoint migration tools — 60-day migration typical.",
            },
        ],
        "output_path": "/tmp/battlecard_workspace_vs_m365.pdf",
    }
    return generate_battlecard(config)


if __name__ == "__main__":
    import sys

    print("GCP Sales Enablement PDF Generator")
    print("=" * 50)

    results: list[tuple[str, str | Exception]] = []

    print("\n[1/3] Generating Research Report (KGHM)...")
    try:
        path = _sample_research_report()
        results.append(("Research Report", path))
        print(f"      OK -> {path}")
    except Exception as exc:
        results.append(("Research Report", exc))
        print(f"      FAILED: {exc}", file=sys.stderr)

    print("\n[2/3] Generating Trainer Guide (TransNova)...")
    try:
        path = _sample_trainer_guide()
        results.append(("Trainer Guide", path))
        print(f"      OK -> {path}")
    except Exception as exc:
        results.append(("Trainer Guide", exc))
        print(f"      FAILED: {exc}", file=sys.stderr)

    print("\n[3/3] Generating Battlecard (Workspace vs M365)...")
    try:
        path = _sample_battlecard()
        results.append(("Battlecard", path))
        print(f"      OK -> {path}")
    except Exception as exc:
        results.append(("Battlecard", exc))
        print(f"      FAILED: {exc}", file=sys.stderr)

    print("\n" + "=" * 50)
    print("Summary:")
    for name, result in results:
        if isinstance(result, Exception):
            print(f"  FAIL  {name}: {result}")
        else:
            print(f"  OK    {name}: {result}")
