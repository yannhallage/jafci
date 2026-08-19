# -*- coding: utf-8 -*-
"""Génère le pré-programme JAFCI 2026 (PDF) — identité visuelle du site."""

import json
from pathlib import Path

import pymupdf
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
JSON_PATH = ROOT / "src" / "data" / "programme.json"
OUT_PATH = ROOT / "public" / "PRE PROGRAMME V10 JAFCI 2026.pdf"
ASSETS = Path(__file__).resolve().parent / "assets"
FONTS = Path(r"C:\Windows\Fonts")

W, H = 595.32, 841.92
ML, MR = 28.0, 28.0
HEADER_H = 64.0
FOOTER_H = 52.0
TIME_W = 86.0
GAP = 12.0
CONTENT_X = ML + TIME_W + GAP
CONTENT_W = W - MR - CONTENT_X
RADIUS = 0.12

NAVY = (13 / 255, 33 / 255, 61 / 255)
GOLD = (201 / 255, 137 / 255, 13 / 255)
GOLD_DK = (166 / 255, 112 / 255, 10 / 255)
CREAM = (248 / 255, 244 / 255, 234 / 255)
SOFT = (247 / 255, 248 / 255, 250 / 255)
WHITE = (1, 1, 1)
INK = (0.14, 0.16, 0.20)
MUTED = (0.40, 0.41, 0.44)
LINE = (0.88, 0.88, 0.89)


def font_path(*names):
    for name in names:
        path = FONTS / name
        if path.exists():
            return str(path)
    raise FileNotFoundError(names)


def prepare_png(src, dest, thresh=None, max_w=720):
    im = Image.open(src).convert("RGBA")
    if thresh is not None:
        px = im.load()
        for y in range(im.height):
            for x in range(im.width):
                r, g, b, a = px[x, y]
                if r <= thresh and g <= thresh and b <= thresh:
                    px[x, y] = (r, g, b, 0)
    if im.width > max_w:
        ratio = max_w / im.width
        im = im.resize((max_w, max(1, int(im.height * ratio))), Image.Resampling.LANCZOS)
    dest.parent.mkdir(exist_ok=True)
    im.save(dest, format="PNG", optimize=True)


def wrap(font, text, size, width):
    if not text:
        return []
    words = str(text).replace("\n", " ").split()
    lines, cur = [], ""
    for word in words:
        test = f"{cur} {word}".strip()
        if font.text_length(test, size) <= width:
            cur = test
            continue
        if cur:
            lines.append(cur)
        if font.text_length(word, size) <= width:
            cur = word
            continue
        chunk = ""
        for ch in word:
            if font.text_length(chunk + ch, size) <= width:
                chunk += ch
            else:
                if chunk:
                    lines.append(chunk)
                chunk = ch
        cur = chunk
    if cur:
        lines.append(cur)
    return lines


class Builder:
    def __init__(self, data):
        self.data = data
        self.doc = pymupdf.open()
        self.page = None
        self.y = 0
        self.font = pymupdf.Font(fontfile=font_path("calibri.ttf", "segoeui.ttf"))
        self.bold = pymupdf.Font(fontfile=font_path("calibrib.ttf", "segoeuib.ttf"))
        self.italic = pymupdf.Font(fontfile=font_path("calibrii.ttf", "segoeuii.ttf"))
        self.logo_header = ASSETS / "logo-header.png"
        self.logo_cover = ROOT / "public" / "img" / "logo-dark.png"

    def rrect(self, rect, fill, stroke=None, width=0.6, radius=RADIUS):
        self.page.draw_rect(
            rect,
            color=stroke,
            fill=fill,
            width=0 if stroke is None else width,
            radius=radius,
        )

    def write(self, x, y, text, font, size, color, width=None, align="left"):
        s = str(text)
        tw = pymupdf.TextWriter(self.page.rect, color=color)
        w = font.text_length(s, size)
        if align == "center" and width is not None:
            x = x + (width - w) / 2
        elif align == "right" and width is not None:
            x = x + width - w
        tw.append((x, y), s, font=font, fontsize=size)
        tw.write_text(self.page)

    def block(self, x, y, text, font, size, color, width, leading=None, align="left"):
        leading = leading or size * 1.28
        lines = wrap(font, text, size, width)
        for line in lines:
            self.write(x, y, line, font, size, color, width, align)
            y += leading
        return y, len(lines)

    def new_page(self, header=True):
        self.page = self.doc.new_page(width=W, height=H)
        if header:
            self.draw_header()
            self.y = HEADER_H + 14
        else:
            self.y = 36

    def ensure(self, height):
        if self.page is None:
            self.new_page()
        if self.y + height > H - FOOTER_H - 8:
            self.new_page()

    def draw_header(self):
        p = self.page
        p.draw_rect(pymupdf.Rect(0, 0, W, HEADER_H), color=None, fill=NAVY, width=0)
        p.draw_rect(
            pymupdf.Rect(0, HEADER_H - 3.2, W, HEADER_H),
            color=None,
            fill=GOLD,
            width=0,
        )
        if self.logo_header.exists():
            p.insert_image(
                pymupdf.Rect(22, 8, 228, 56),
                filename=str(self.logo_header),
                keep_proportion=True,
            )
        self.write(250, 24, "PRÉ-PROGRAMME", self.bold, 10, GOLD, W - 36 - 250, "right")
        self.write(
            250,
            40,
            "10 – 12 septembre 2026  ·  Noom Hôtel, Abidjan",
            self.font,
            8.2,
            WHITE,
            W - 36 - 250,
            "right",
        )
        self.write(
            250,
            54,
            "Journées Africaines de Cardiologie Interventionnelle",
            self.font,
            7.4,
            (0.78, 0.84, 0.90),
            W - 36 - 250,
            "right",
        )

    def draw_cover(self):
        self.new_page(header=False)
        p = self.page
        p.draw_rect(pymupdf.Rect(0, 0, W, H), color=None, fill=NAVY, width=0)
        p.draw_rect(pymupdf.Rect(0, 0, W, 6), color=None, fill=GOLD, width=0)
        p.draw_rect(pymupdf.Rect(0, H - 92, W, H), color=None, fill=CREAM, width=0)
        p.draw_rect(pymupdf.Rect(0, H - 92, W, H - 89), color=None, fill=GOLD, width=0)

        if self.logo_header.exists():
            p.insert_image(
                pymupdf.Rect(70, 78, 525, 210),
                filename=str(self.logo_header),
                keep_proportion=True,
            )

        self.write(ML, 250, "PRÉ-PROGRAMME", self.bold, 22, GOLD, W - ML - MR, "center")

        p.draw_rect(
            pymupdf.Rect(W / 2 - 36, 272, W / 2 + 36, 275),
            color=None,
            fill=GOLD,
            width=0,
        )

        self.write(
            ML,
            322,
            "10 – 12 septembre 2026",
            self.bold,
            16,
            WHITE,
            W - ML - MR,
            "center",
        )
        self.write(
            ML,
            346,
            "Noom Hôtel, Abidjan  ·  Côte d’Ivoire",
            self.font,
            12,
            (0.82, 0.86, 0.90),
            W - ML - MR,
            "center",
        )

        chips = [
            ("JOUR 1", "Jeudi 10 sept.", "Workshop"),
            ("JOUR 2", "Vendredi 11 sept.", "Sessions scientifiques"),
            ("JOUR 3", "Samedi 12 sept.", "Grand public"),
        ]
        chip_w = 164
        gap = 12
        total = chip_w * 3 + gap * 2
        x0 = (W - total) / 2
        y0 = 420
        for i, (num, date, tag) in enumerate(chips):
            x = x0 + i * (chip_w + gap)
            rect = pymupdf.Rect(x, y0, x + chip_w, y0 + 78)
            self.rrect(rect, (18 / 255, 40 / 255, 70 / 255), GOLD, 0.8, 0.08)
            self.write(x, y0 + 22, num, self.bold, 8, GOLD, chip_w, "center")
            self.write(x, y0 + 42, date, self.bold, 10, WHITE, chip_w, "center")
            self.write(x, y0 + 60, tag, self.font, 8, (0.78, 0.84, 0.90), chip_w, "center")

        self.write(
            ML,
            545,
            "Les horaires, titres de sessions et intervenants pourront encore",
            self.font,
            9,
            (0.70, 0.75, 0.80),
            W - ML - MR,
            "center",
        )
        self.write(
            ML,
            560,
            "évoluer jusqu’au programme définitif.",
            self.font,
            9,
            (0.70, 0.75, 0.80),
            W - ML - MR,
            "center",
        )

        partners = [
            ASSETS / "gram-clear.png",
            ASSETS / "sicard.png",
            ASSETS / "ascaoc.png",
            ASSETS / "ica-50.png",
        ]
        x = 48
        for path in partners:
            if not path.exists():
                continue
            p.insert_image(
                pymupdf.Rect(x, H - 78, x + 90, H - 22),
                filename=str(path),
                keep_proportion=True,
            )
            x += 108

    def time_pill(self, y, time, kind):
        fill, fg = NAVY, WHITE
        if kind == "break":
            fill, fg = CREAM, GOLD_DK
        elif kind in ("ceremony", "symposium"):
            fill, fg = GOLD, NAVY
        rect = pymupdf.Rect(ML, y, ML + TIME_W, y + 18)
        self.rrect(rect, fill, None, 0, 0.28)
        size = 7.1 if len(time) > 14 else 7.6
        self.write(ML, y + 12.6, time, self.bold, size, fg, TIME_W, "center")

    def measure_session(self, session, width, variant):
        if variant == "break":
            return 30
        pad, inner = 10, width - 20
        tsize = 9 if width < 190 else 11
        h = pad + 14 * max(1, len(wrap(self.bold, session["title"], tsize, inner)))
        if session.get("theme"):
            h += 4 + 12 * max(1, len(wrap(self.italic, session["theme"], 8.2, inner)))
        if session.get("moderators"):
            h += 15 + 11.5 * max(1, len(wrap(self.font, session["moderators"], 8.2, inner)))
        if session.get("speakers"):
            h += 15 + 11.5 * max(1, len(wrap(self.font, " · ".join(session["speakers"]), 8.2, inner)))
        countries = session.get("countries") or []
        if countries:
            cols = 1 if width < 210 else 2
            h += 8 + ((len(countries) + cols - 1) // cols) * 16
        for talk in session.get("talks") or []:
            h += 4 + 11.2 * max(1, len(wrap(self.font, talk["title"], 8.2, inner - 18)))
            if talk.get("speaker"):
                h += 10
        for item in session.get("items") or []:
            h += 3 + 11.2 * max(1, len(wrap(self.font, item, 8.2, inner - 12)))
        if session.get("note"):
            h += 16
        return max(h + pad + 6, 36)

    def draw_session(self, x, y, session, width, variant, height=None):
        h = height or self.measure_session(session, width, variant)
        fill = WHITE
        accent = None
        if variant == "break":
            fill = CREAM
        elif variant == "ceremony":
            fill = NAVY
        elif variant == "symposium":
            fill = CREAM
            accent = GOLD
        elif variant == "public":
            fill = CREAM
            accent = GOLD
        elif variant == "parallel":
            fill = SOFT
        self.rrect(pymupdf.Rect(x, y, x + width, y + h), fill, LINE, 0.5, 0.08)
        if accent:
            self.page.draw_rect(
                pymupdf.Rect(x, y, x + 3.4, y + h),
                color=None,
                fill=accent,
                width=0,
            )

        if variant == "break":
            self.write(x, y + h / 2 + 4, session["title"].upper(), self.bold, 10, GOLD_DK, width, "center")
            return h

        pad = 10
        cx, inner = x + pad, width - pad * 2
        cy = y + pad + 11
        title_color = WHITE if variant == "ceremony" else NAVY
        body = (0.82, 0.86, 0.90) if variant == "ceremony" else MUTED
        text_c = WHITE if variant == "ceremony" else INK
        tsize = 9 if width < 190 else 11

        live = "Live" in (session.get("badges") or [])
        title_w = inner - (36 if live and width > 200 else 0)
        cy, _ = self.block(cx, cy, session["title"], self.bold, tsize, title_color, title_w, 13)
        if live:
            bw = self.bold.text_length("LIVE", 6.4) + 10
            bx = x + width - pad - bw
            self.rrect(pymupdf.Rect(bx, y + pad, bx + bw, y + pad + 12), GOLD, None, 0, 0.3)
            self.write(bx, y + pad + 9.2, "LIVE", self.bold, 6.4, WHITE, bw, "center")
        cy += 3

        if session.get("theme"):
            gold = GOLD if variant == "ceremony" else GOLD_DK
            cy, _ = self.block(cx, cy, session["theme"], self.italic, 8.2, gold, inner, 11.5)
            cy += 3
        if session.get("moderators"):
            self.write(cx, cy, "MODÉRATEURS", self.bold, 6.4, GOLD)
            cy += 12
            cy, _ = self.block(cx, cy, session["moderators"], self.font, 8.2, body, inner, 11.5)
            cy += 3
        if session.get("speakers"):
            self.write(cx, cy, "INTERVENANTS", self.bold, 6.4, GOLD)
            cy += 12
            cy, _ = self.block(cx, cy, " · ".join(session["speakers"]), self.font, 8.2, body, inner, 11.5)
            cy += 3

        countries = session.get("countries") or []
        if countries:
            cols = 1 if width < 210 else 2
            col_w = inner if cols == 1 else (inner - 8) / 2
            for i, item in enumerate(countries):
                col, row = i % cols, i // cols
                ix = cx + col * (col_w + 8)
                iy = cy + row * 16
                chip = (0.12, 0.20, 0.32) if variant == "ceremony" else (0.96, 0.96, 0.97)
                self.page.draw_rect(pymupdf.Rect(ix, iy - 8, ix + col_w, iy + 6), color=None, fill=chip, width=0)
                self.block(ix + 5, iy, f"{item['country']}  —  {item.get('speaker', '')}", self.font, 7.5, text_c, col_w - 8, 10)
            cy += ((len(countries) + cols - 1) // cols) * 16 + 4

        for n, talk in enumerate(session.get("talks") or [], 1):
            self.write(cx, cy, f"{n:02d}", self.bold, 7.4, GOLD)
            ny, _ = self.block(cx + 20, cy, talk["title"], self.font, 8.2, text_c, inner - 20, 11.2)
            cy = ny
            if talk.get("speaker"):
                self.write(cx + 20, cy, talk["speaker"], self.bold, 7.8, GOLD if variant == "ceremony" else GOLD_DK)
                cy += 10
            cy += 3

        for item in session.get("items") or []:
            cy, _ = self.block(cx, cy, "–  " + item, self.font, 8.2, text_c, inner, 11.2)
        if session.get("note"):
            cy += 4
            self.block(cx, cy, session["note"], self.italic, 7.8, GOLD_DK, inner, 11)
        return h

    def draw_slot(self, slot):
        if slot["type"] == "parallel":
            sessions = slot["sessions"]
            n = len(sessions)
            gap = 8
            col_w = (CONTENT_W - gap * (n - 1)) / n
            heights = [self.measure_session(s, col_w, "parallel") for s in sessions]
            total = max(heights) + 16
            self.ensure(total + 4)
            self.time_pill(self.y + 2, slot["time"], "parallel")
            self.write(CONTENT_X, self.y + 10, "SESSIONS SIMULTANÉES", self.bold, 6.6, GOLD)
            y0 = self.y + 16
            for i, session in enumerate(sessions):
                self.draw_session(
                    CONTENT_X + i * (col_w + gap),
                    y0,
                    session,
                    col_w,
                    "parallel",
                    height=max(heights),
                )
            self.y = y0 + max(heights) + 10
            return

        variant = slot["type"]
        h = self.measure_session(slot, CONTENT_W, variant)
        self.ensure(h + 4)
        self.time_pill(self.y + 2, slot["time"], variant)
        self.draw_session(CONTENT_X, self.y, slot, CONTENT_W, variant)
        self.y += h + 10

    def day_banner(self, day, index):
        h = 34
        self.ensure(h + 80)
        r = pymupdf.Rect(ML, self.y, W - MR, self.y + h)
        self.rrect(r, NAVY, None, 0, 0.10)
        self.page.draw_rect(pymupdf.Rect(ML, self.y, ML + 4, self.y + h), color=None, fill=GOLD, width=0)
        self.write(ML + 14, self.y + 13, f"JOUR {index + 1}", self.bold, 7.6, GOLD)
        self.write(
            ML + 14,
            self.y + 26,
            f"{day['date'].upper()}   ·   {day['tag'].upper()}",
            self.bold,
            10,
            WHITE,
        )
        self.y += h + 12

    def draw_footers(self):
        partners = [
            ASSETS / "gram-clear.png",
            ASSETS / "sicard.png",
            ASSETS / "ascaoc.png",
            ASSETS / "ica-50.png",
        ]
        n = self.doc.page_count
        for i in range(n):
            if i == 0:
                continue
            page = self.doc[i]
            page.draw_rect(pymupdf.Rect(0, H - FOOTER_H, W, H), color=None, fill=(0.97, 0.97, 0.975), width=0)
            page.draw_rect(pymupdf.Rect(0, H - FOOTER_H, W, H - FOOTER_H + 2), color=None, fill=GOLD, width=0)
            x = 24
            for path in partners:
                if not path.exists():
                    continue
                page.insert_image(
                    pymupdf.Rect(x, H - 44, x + 72, H - 10),
                    filename=str(path),
                    keep_proportion=True,
                )
                x += 80
            label = f"{i} / {n - 1}"
            tw = pymupdf.TextWriter(page.rect, color=NAVY)
            tw.append((W - 42 - self.bold.text_length(label, 9), H - 22), label, font=self.bold, fontsize=9)
            tw.write_text(page)

    def build(self):
        self.doc.set_metadata(
            {
                "title": "Pré-programme JAFCI 2026",
                "author": "JAFCI",
                "subject": "Journées Africaines de Cardiologie Interventionnelle",
            }
        )
        self.draw_cover()
        for i, day in enumerate(self.data["days"]):
            self.new_page()
            self.day_banner(day, i)
            for slot in day["slots"]:
                self.draw_slot(slot)
        self.draw_footers()
        self.doc.subset_fonts()
        self.doc.save(str(OUT_PATH), garbage=4, deflate=True, deflate_images=True, deflate_fonts=True)
        self.doc.close()
        return OUT_PATH


def main():
    ASSETS.mkdir(exist_ok=True)
    src_logo = ROOT / "public" / "img" / "logo-pied-de-page.png"
    if not src_logo.exists():
        src_logo = ASSETS / "logo-footer-clear.png"
    prepare_png(src_logo, ASSETS / "logo-header.png", thresh=28, max_w=900)
    if (ASSETS / "gram.png").exists():
        prepare_png(ASSETS / "gram.png", ASSETS / "gram-clear.png", thresh=22, max_w=240)
    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    print(Builder(data).build())


if __name__ == "__main__":
    main()
