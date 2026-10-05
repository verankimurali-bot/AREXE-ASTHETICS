#!/usr/bin/env python3
"""
PANDU COLLECTIONS & AURA ATELIER - PYTHON BACKEND SERVER
Zero-dependency HTTP & REST API Server using Python Standard Library

Run with: python server.py
Default Port: 3000 (http://localhost:3000)
"""

import http.server
import socketserver
import json
import os
import urllib.parse
import mimetypes
import time
import random

PORT = int(os.environ.get("PORT", 3000))
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
PRODUCTS_FILE = os.path.join(DATA_DIR, "products.json")
ORDERS_FILE = os.path.join(DATA_DIR, "orders.json")
NEWSLETTER_FILE = os.path.join(DATA_DIR, "newsletter.json")


def ensure_database():
    os.makedirs(DATA_DIR, exist_ok=True)
    for f in [PRODUCTS_FILE, ORDERS_FILE, NEWSLETTER_FILE]:
        if not os.path.exists(f):
            with open(f, "w", encoding="utf-8") as fp:
                json.dump([], fp, indent=2)


ensure_database()


def read_json(path):
    try:
        with open(path, "r", encoding="utf-8") as fp:
            return json.load(fp)
    except Exception as e:
        print(f"Error reading {path}: {e}")
        return []


def write_json(path, data):
    with open(path, "w", encoding="utf-8") as fp:
        json.dump(data, fp, indent=2)


class AtelierHandler(http.server.BaseHTTPRequestHandler):

    def send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")

    def send_json(self, status_code, data):
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_cors_headers()
        self.end_headers()
        self.wfile.write(json.dumps(data).encode("utf-8"))

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_cors_headers()
        self.end_headers()

    def get_parsed_body(self):
        content_length = int(self.headers.get("Content-Length", 0))
        if content_length > 0:
            body = self.rfile.read(content_length).decode("utf-8")
            try:
                return json.loads(body)
            except Exception:
                return {}
        return {}

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        pathname = parsed.path

        # 1. GET /api/products
        if pathname == "/api/products":
            products = read_json(PRODUCTS_FILE)
            return self.send_json(200, {"success": True, "count": len(products), "data": products})

        # 2. GET /api/orders
        if pathname == "/api/orders":
            orders = read_json(ORDERS_FILE)
            return self.send_json(200, {"success": True, "count": len(orders), "data": orders})

        # 3. GET /api/status
        if pathname == "/api/status":
            return self.send_json(200, {
                "status": "online",
                "backend": "python",
                "brand": "Pandu Collections & Aura Atelier"
            })

        # Static File Serving
        self.serve_static(pathname)

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        pathname = parsed.path
        body = self.get_parsed_body()

        # 1. POST /api/products (Add New Item)
        if pathname == "/api/products":
            name = body.get("name")
            price = body.get("price")
            if not name or price is None:
                return self.send_json(400, {"success": False, "message": "Name and price are required."})

            products = read_json(PRODUCTS_FILE)
            new_id = body.get("id") or f"pandu-{body.get('category', 'drop')[:3]}-{str(int(time.time()))[-4:]}"
            new_item = {
                "id": new_id,
                "name": name,
                "category": body.get("category", "streetwear"),
                "price": float(price),
                "material": body.get("material", "Organic Fabric"),
                "badge": body.get("badge", "NEW DROP"),
                "image": body.get("image", "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80"),
                "description": body.get("description", ""),
                "swatches": body.get("swatches", [{"name": "Obsidian Black", "hex": "#121214"}]),
                "createdAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
            }
            products.insert(0, new_item)
            write_json(PRODUCTS_FILE, products)
            print(f"[API] Added new garment: {name} ({new_id})")
            return self.send_json(201, {"success": True, "message": "Product created", "data": new_item})

        # 2. POST /api/admin/login
        if pathname == "/api/admin/login":
            user = body.get("username")
            pwd = body.get("password")
            if user == "admin" and pwd == "admin123":
                token = f"adm_token_{int(time.time())}_{random.randint(1000, 9999)}"
                return self.send_json(200, {
                    "success": True,
                    "message": "Authorized",
                    "token": token,
                    "admin": {"username": "admin"}
                })
            return self.send_json(401, {"success": False, "message": "Invalid admin credentials"})

        # 3. POST /api/orders
        if pathname == "/api/orders":
            orders = read_json(ORDERS_FILE)
            ref_num = f"AU-{random.randint(10000, 99999)}-X"
            new_order = {
                "orderId": ref_num,
                "items": body.get("items", []),
                "subtotal": body.get("subtotal", 0),
                "discount": body.get("discount", 0),
                "shipping": body.get("shipping", 0),
                "total": body.get("total", 0),
                "currency": body.get("currency", "USD"),
                "status": "Confirmed & In Processing",
                "createdAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
            }
            orders.insert(0, new_order)
            write_json(ORDERS_FILE, orders)
            print(f"[API] Received customer order: {ref_num}")
            return self.send_json(201, {"success": True, "orderRef": ref_num, "order": new_order})

        # 4. POST /api/newsletter
        if pathname == "/api/newsletter":
            email = body.get("email")
            if not email:
                return self.send_json(400, {"success": False, "message": "Email required"})
            subscribers = read_json(NEWSLETTER_FILE)
            if not any(s.get("email") == email for s in subscribers):
                subscribers.append({"email": email, "subscribedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())})
                write_json(NEWSLETTER_FILE, subscribers)
            return self.send_json(200, {"success": True, "message": "Subscribed", "promoCode": "AURA15"})

        self.send_json(404, {"success": False, "message": "Endpoint not found"})

    def do_DELETE(self):
        parsed = urllib.parse.urlparse(self.path)
        pathname = parsed.path

        if pathname.startswith("/api/products/"):
            item_id = pathname.replace("/api/products/", "")
            products = read_json(PRODUCTS_FILE)
            initial_count = len(products)
            products = [p for p in products if p.get("id") != item_id]

            if len(products) == initial_count:
                return self.send_json(404, {"success": False, "message": f"Product {item_id} not found"})

            write_json(PRODUCTS_FILE, products)
            print(f"[API] Deleted garment: {item_id}")
            return self.send_json(200, {"success": True, "message": f"Product {item_id} deleted"})

        self.send_json(404, {"success": False, "message": "Endpoint not found"})

    def serve_static(self, pathname):
        rel = pathname.lstrip("/")
        if not rel or rel == "index.html":
            rel = "index.html"
        elif rel == "admin":
            rel = "admin.html"

        file_path = os.path.join(BASE_DIR, rel)
        if not os.path.isfile(file_path):
            self.send_response(404)
            self.send_header("Content-Type", "text/plain")
            self.end_headers()
            self.wfile.write(b"404 Not Found")
            return

        mime_type, _ = mimetypes.guess_type(file_path)
        if not mime_type:
            mime_type = "application/octet-stream"

        try:
            with open(file_path, "rb") as fp:
                content = fp.read()
            self.send_response(200)
            self.send_header("Content-Type", mime_type)
            self.send_cors_headers()
            self.end_headers()
            self.wfile.write(content)
        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(str(e).encode("utf-8"))


if __name__ == "__main__":
    server_address = ("", PORT)
    with socketserver.TCPServer(server_address, AtelierHandler) as httpd:
        print(f"""
============================================================
  PANDU COLLECTIONS & AURA ATELIER - PYTHON BACKEND
============================================================
  Status   : RUNNING
  URL      : http://localhost:{PORT}
  Admin    : http://localhost:{PORT}/admin.html
  API Base : http://localhost:{PORT}/api/products
============================================================
  Press Ctrl+C to stop the server.
""")
        httpd.serve_forever()
