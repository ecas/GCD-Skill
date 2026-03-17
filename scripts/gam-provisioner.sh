#!/bin/bash
# GCP Sales Enablement — Demo Environment Provisioner (GAM CLI)
#
# Prerequisites:
#   - GAMADV-XTD3 installed and configured (https://github.com/taers232c/GAMADV-XTD3)
#   - Admin access to the target Google Workspace domain
#
# Usage:
#   ./gam-provisioner.sh --config novatech --target demo@yourdomain.com --dry-run
#   ./gam-provisioner.sh --config novatech --target demo@yourdomain.com --execute

set -euo pipefail

# --- Defaults ---
CONFIG_NAME=""
TARGET_ACCOUNT=""
DRY_RUN=true

# --- Parse arguments ---
while [[ $# -gt 0 ]]; do
  case $1 in
    --config)   CONFIG_NAME="$2"; shift 2 ;;
    --target)   TARGET_ACCOUNT="$2"; shift 2 ;;
    --dry-run)  DRY_RUN=true; shift ;;
    --execute)  DRY_RUN=false; shift ;;
    --help|-h)
      echo "Usage: $0 --config <name> --target <email> [--dry-run|--execute]"
      echo ""
      echo "Options:"
      echo "  --config    Customer config name (e.g., novatech)"
      echo "  --target    Target demo account email"
      echo "  --dry-run   Preview changes without executing (default)"
      echo "  --execute   Actually create the demo environment"
      exit 0 ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done

# --- Validation ---
if [[ -z "$CONFIG_NAME" ]]; then
  echo "ERROR: --config is required. Specify a customer config name (e.g., novatech)."
  exit 1
fi

if [[ -z "$TARGET_ACCOUNT" ]]; then
  echo "ERROR: --target is required. Specify the demo account email."
  exit 1
fi

# Warn if target account doesn't look like a demo account
if [[ "$TARGET_ACCOUNT" != *"demo"* && "$TARGET_ACCOUNT" != *"test"* ]]; then
  echo "WARNING: Target account '$TARGET_ACCOUNT' doesn't contain 'demo' or 'test'."
  echo "   Are you sure this is a demo account and not a production account?"
  read -r -p "   Continue? (y/N): " confirm
  [[ "$confirm" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 1; }
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  GCP Sales Enablement — Demo Provisioner"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Config:  $CONFIG_NAME"
echo "  Target:  $TARGET_ACCOUNT"
if [[ "$DRY_RUN" = true ]]; then
  echo "  Mode:    DRY RUN (preview only — no changes)"
else
  echo "  Mode:    EXECUTE (changes will be made)"
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# --- Helper: run a command or preview it ---
run_or_preview() {
  local description="$1"
  shift
  if [[ "$DRY_RUN" = true ]]; then
    echo "  [DRY RUN] Would: $description"
    echo "            Command: $*"
  else
    echo "  [EXECUTE] $description"
    "$@"
  fi
}

# ─────────────────────────────────────────────────────────────────────────────
# STEP 1: Drive Folders
# ─────────────────────────────────────────────────────────────────────────────
echo "Step 1: Drive Folders"

run_or_preview "Create root folder '[DEMO] NovaTech Logistics'" \
  gam user "$TARGET_ACCOUNT" create drivefile drivefilename "[DEMO] NovaTech Logistics" mimetype gfolder

run_or_preview "Create subfolder 'IT Department'" \
  gam user "$TARGET_ACCOUNT" create drivefile drivefilename "IT Department" mimetype gfolder

run_or_preview "Create subfolder 'Finance'" \
  gam user "$TARGET_ACCOUNT" create drivefile drivefilename "Finance" mimetype gfolder

run_or_preview "Create subfolder 'HR'" \
  gam user "$TARGET_ACCOUNT" create drivefile drivefilename "HR" mimetype gfolder

run_or_preview "Create subfolder 'Executive'" \
  gam user "$TARGET_ACCOUNT" create drivefile drivefilename "Executive" mimetype gfolder

run_or_preview "Create subfolder '_Admin — DO NOT DELETE'" \
  gam user "$TARGET_ACCOUNT" create drivefile drivefilename "_Admin — DO NOT DELETE" mimetype gfolder

echo ""

# ─────────────────────────────────────────────────────────────────────────────
# STEP 2: Calendar Events
# ─────────────────────────────────────────────────────────────────────────────
echo "Step 2: Calendar Events"

run_or_preview "Create event 'All-Hands: Transformacja Cyfrowa Q2 2026'" \
  gam user "$TARGET_ACCOUNT" create event calendarid primary \
    summary "All-Hands: Transformacja Cyfrowa Q2 2026" \
    start "2026-03-24T10:00:00" end "2026-03-24T11:30:00" \
    description "Kwartalne spotkanie wszystkich działów — przegląd postępów Inicjatywy Cyfrowej."

run_or_preview "Create event 'Kick-off: Platforma Cyfrowa'" \
  gam user "$TARGET_ACCOUNT" create event calendarid primary \
    summary "Kick-off: Platforma Cyfrowa" \
    start "2026-03-26T11:00:00" end "2026-03-26T13:00:00" \
    description "Spotkanie inauguracyjne projektu Platforma Cyfrowa. Agenda: zakres, harmonogram, role."

run_or_preview "Create event 'Przegląd Budżetu IT — Q2'" \
  gam user "$TARGET_ACCOUNT" create event calendarid primary \
    summary "Przegląd Budżetu IT — Q2" \
    start "2026-03-27T09:00:00" end "2026-03-27T10:00:00" \
    description "Kwartalny przegląd wydatków IT z Działem Finansów."

echo ""

# ─────────────────────────────────────────────────────────────────────────────
# STEP 3: Demo Emails
# ─────────────────────────────────────────────────────────────────────────────
echo "Step 3: Demo Emails"

run_or_preview "Send email 'Projekt Cyfrowa Logistyka — kick-off'" \
  gam user "$TARGET_ACCOUNT" sendemail \
    recipient "$TARGET_ACCOUNT" \
    subject "Projekt Cyfrowa Logistyka — kick-off w czwartek" \
    message "Cześć Zespole, potwierdzam kick-off projektu Platforma Cyfrowa w czwartek o 11:00. Agenda w zaproszeniu. Do zobaczenia. Anna"

run_or_preview "Send email 'Raport miesięczny — IT — luty 2026'" \
  gam user "$TARGET_ACCOUNT" sendemail \
    recipient "$TARGET_ACCOUNT" \
    subject "Raport miesięczny — IT — luty 2026" \
    message "Piotrze, w załączniku raport IT za luty. Kluczowe punkty: uptime 99.8%, 3 incydenty (wszystkie rozwiązane), migracja do chmury na poziomie 42%. Szczegóły w dokumencie. Pozdrawiam, Anna"

run_or_preview "Send email 'Bezpieczeństwo: Wymagana aktualizacja polityki'" \
  gam user "$TARGET_ACCOUNT" sendemail \
    recipient "$TARGET_ACCOUNT" \
    subject "Bezpieczeństwo: Wymagana aktualizacja polityki dostępu" \
    message "Wszyscy, zgodnie z audytem bezpieczeństwa Q1 prosimy o przegląd i potwierdzenie polityki dostępu do systemów do 31 marca. Link do formularza w dokumencie. Marta — Security"

echo ""

# ─────────────────────────────────────────────────────────────────────────────
# STEP 4: Gmail Labels (if GAM supports label creation for the user)
# ─────────────────────────────────────────────────────────────────────────────
echo "Step 4: Gmail Labels"
echo "  NOTE: GAM label creation requires Gmail API access for the target user."

run_or_preview "Create label 'Projects'" \
  gam user "$TARGET_ACCOUNT" create label "Projects"

run_or_preview "Create label 'Projects/DT Initiative'" \
  gam user "$TARGET_ACCOUNT" create label "Projects/DT Initiative"

run_or_preview "Create label 'Security'" \
  gam user "$TARGET_ACCOUNT" create label "Security"

run_or_preview "Create label 'Finance'" \
  gam user "$TARGET_ACCOUNT" create label "Finance"

run_or_preview "Create label 'IT'" \
  gam user "$TARGET_ACCOUNT" create label "IT"

echo ""

# ─────────────────────────────────────────────────────────────────────────────
# SUMMARY
# ─────────────────────────────────────────────────────────────────────────────
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [[ "$DRY_RUN" = true ]]; then
  echo "  DRY RUN COMPLETE — no changes were made."
  echo "  To execute for real, run with --execute flag:"
  echo "    $0 --config $CONFIG_NAME --target $TARGET_ACCOUNT --execute"
else
  echo "  PROVISIONING COMPLETE"
  echo "  Check $TARGET_ACCOUNT for demo content."
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""
echo "To clean up demo content after the demo, run:"
echo "  gam user $TARGET_ACCOUNT delete drivefile query \"title contains '[DEMO]'\""
echo "  gam user $TARGET_ACCOUNT delete events calendarid primary query \"NovaTech\""
