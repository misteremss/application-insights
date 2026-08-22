#!/usr/bin/env python3
"""
Template test runner for a generated design-dna style skill.

Copy this into <slug>/tools/check.py when a design-dna skill is emitted, then
fill in CHECKS below with the actual `auto: true` tests from that style's
dna.json. This template intentionally does not guess at image analysis —
every check here is a stub raising NotImplementedError until you wire it to
real measurement (PIL/Pillow for pixel sampling, fonttools for type metrics,
etc.) for this specific style.

Usage:
    python3 tools/check.py path/to/generated_output.png

Exits 0 if every check passes, 1 if any fails or errors.
"""
import sys
from pathlib import Path

# Fill this in from dna.json's `tests` array (the entries with auto: true).
# Each entry: (id, check_description, fn) where fn(image_path) -> bool
CHECKS = [
    # Example shape — replace with this style's real tests:
    # (
    #     "accent-coverage-under-8pct",
    #     "Accent colour covers under 8% of the canvas.",
    #     lambda path: measure_color_coverage(path, role="accent") < 0.08,
    # ),
]


def run(image_path: str) -> bool:
    if not CHECKS:
        print("No checks configured yet — copy this template's CHECKS list "
              "from the style's dna.json `tests` array before relying on it.")
        return False

    all_passed = True
    for check_id, description, fn in CHECKS:
        try:
            passed = fn(image_path)
        except NotImplementedError:
            print(f"[SKIP] {check_id}: {description} (not implemented)")
            continue
        except Exception as exc:  # noqa: BLE001 - report and keep going
            print(f"[ERROR] {check_id}: {description} -> {exc}")
            all_passed = False
            continue

        status = "PASS" if passed else "FAIL"
        print(f"[{status}] {check_id}: {description}")
        if not passed:
            all_passed = False

    return all_passed


def main() -> int:
    if len(sys.argv) != 2:
        print(f"usage: {sys.argv[0]} <image-path>")
        return 1

    image_path = Path(sys.argv[1])
    if not image_path.exists():
        print(f"no such file: {image_path}")
        return 1

    passed = run(str(image_path))
    return 0 if passed else 1


if __name__ == "__main__":
    raise SystemExit(main())
