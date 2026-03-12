"""
example_tool.py — minimal stub showing the Claudex tool pattern.

Usage:
    python tools/example_tool.py status
    python tools/example_tool.py items [--limit N]

Required environment variables:
    MY_SERVICE_API_KEY   — API key for your service
    MY_SERVICE_BASE_URL  — Base URL for your service (e.g. https://api.example.com)

Output: JSON to stdout. Exit 0 on success, 1 on error.
"""

import argparse
import json
import os
import sys


def get_env(key):
    val = os.environ.get(key)
    if not val:
        print(json.dumps({"error": f"Missing environment variable: {key}"}), file=sys.stderr)
        sys.exit(1)
    return val


def cmd_status(args):
    """Return a simple status object. Replace with a real API call."""
    api_key = get_env("MY_SERVICE_API_KEY")  # noqa: used for auth, not logged
    base_url = get_env("MY_SERVICE_BASE_URL")

    # TODO: replace with an actual request, e.g.:
    # import urllib.request
    # req = urllib.request.Request(f"{base_url}/status", headers={"Authorization": f"Bearer {api_key}"})
    # with urllib.request.urlopen(req) as resp:
    #     data = json.loads(resp.read())

    data = {"status": "ok", "base_url": base_url}
    print(json.dumps(data, indent=2))


def cmd_items(args):
    """Return a list of items. Replace with a real API call."""
    api_key = get_env("MY_SERVICE_API_KEY")  # noqa: used for auth, not logged
    base_url = get_env("MY_SERVICE_BASE_URL")
    limit = args.limit

    # TODO: replace with a real paginated request
    items = [{"id": i, "name": f"item-{i}"} for i in range(1, limit + 1)]
    print(json.dumps({"items": items, "count": len(items)}, indent=2))


def main():
    parser = argparse.ArgumentParser(description="Example Claudex tool stub")
    sub = parser.add_subparsers(dest="command", required=True)

    sub.add_parser("status", help="Check service status")

    p_items = sub.add_parser("items", help="List items")
    p_items.add_argument("--limit", type=int, default=10, help="Max items to return")

    args = parser.parse_args()

    if args.command == "status":
        cmd_status(args)
    elif args.command == "items":
        cmd_items(args)


if __name__ == "__main__":
    main()
