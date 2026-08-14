# -*- coding: utf-8 -*-
"""Génère le pré-programme JAFCI 2026 (PDF) à partir de programme.json."""

import json
import os
from pathlib import Path

import pymupdf
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
JSON_PATH = ROOT / "src" / "data" / "programme.json"
OUT_PATH = ROOT / "public" / "PRE PROGRAMME V9 JAFCI 2026.pdf"
ASSETS = Path(__file__).resolve().parent / "assets"
LOGO = ASSETS / "logo-footer-clear.png"
FONTS = Path(r"C:\Windows\Fonts")

W, H = 595.32, 841.92
ML, MR = 32.0, 32.0
HEADER_H = 70.0
FOOTER_H = 58.0
TIME_W = 74.0
GAP = 10.0
CONTENT_X = ML + TIME_W + GAP
CONTENT_W = W - MR - CONTENT_X

NAVY = (13 / 255, 33 / 255, 61 / 255)
GOLD = (201 / 255, 137 / 255, 13 / 255)
GOLD_DK = (166 / 255, 112 / 255, 10 / 255)
CREAM = (248 / 255, 244 / 255, 234 / 255)
SOFT = (247 / 255, 248 / 255, 250 / 255)
WHITE = (1, 1, 1)
TEXT = (0.18, 0.18, 0.2)
MUTED = (0.42, 0.42, 0.45)
LINE = (0.90, 0.90, 0.91)

TYPE_LABEL = {
    "session": "Session",
    "break": "Pause",
    "ceremony": "Cérémonie",
    "symposium": "Symposium",
    "parallel": "En parallèle",
    "public": "Grand public",
}
KIND_LABEL = {
    "atelier": "Atelier",
    "paramedical": "Paramédical",
    "imagerie": "Imagerie",
    "sante-travail": "Santé au travail",
}


def make_transparent(src, dest, thresh=30):
    im = Image.open(src).convert("RGBA")
    px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            if r < thresh and g < thresh and b < thresh:
                px[x, y] = (r, g, b, 0)
    im.save(dest)


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
        self.pages = []
        self.page = None
        self.y = 0
        self.font = pymupdf.Font(fontfile=str(FONTS / "segoeui.ttf"))
        self.bold = pymupdf.Font(fontfile=str(FONTS / "segoeuib.ttf"))
        self.italic = pymupdf.Font(fontfile=str(FONTS / "segoeuii.ttf"))

    def new_page(self):
        self.page = self.doc.new_page(width=W, height=H)
        self.pages.append(self.page)
        self.draw_header()
        self.y = HEADER_H + 14

    def ensure(self, height):
        if self.page is None:
            self.new_page()
        if self.y + height > H - FOOTER_H - 8:
            self.new_page()

    def text(self, x, y, s, font, size, color, width=None):
        tw = pymupdf.TextWriter(self.page.rect, color=color)
        tw.append((x, y), s, font=font, fontsize=size)
        tw.write_text(self.page)
        return y

    def block(self, x, y, text, font, size, color, width, leading=None):
        leading = leading or size * 1.32
        lines = wrap(font, text, size, width)
        for line in lines:
            self.text(x, y, line, font, size, color)
            y += leading
        return y, len(lines)

    def draw_header(self):
        p = self.page
        p.draw_rect(pymupdf.Rect(0, 0, W, HEADER_H), color=None, fill=NAVY, width=0)
        p.draw_rect(
            pymupdf.Rect(0, HEADER_H - 3, W, HEADER_H),
            color=None,
            fill=GOLD,
            width=0,
        )
        if LOGO.exists():
            p.insert_image(pymupdf.Rect(28, 10, 210, 60), filename=str(LOGO))
        self._write(
            p,
            318,
            26,
            "PRÉ-PROGRAMME OFFICIEL  ·  V9",
            self.bold,
            9,
            GOLD,
            W - 36 - 318,
            align="right",
        )
        self._write(
            p,
            318,
            42,
            "10 – 12 septembre 2026  ·  Noom Hôtel, Abidjan",
            self.font,
            8,
            WHITE,
            W - 36 - 318,
            align="right",
        )
        self._write(
            p,
            318,
            56,
            "Journées Africaines de Cardiologie Interventionnelle",
            self.font,
            7.5,
            (0.82, 0.86, 0.92),
            W - 36 - 318,
            align="right",
        )

    def _write(self, page, x, y, s, font, size, color, width, align="left"):
        tw = pymupdf.TextWriter(page.rect, color=color)
        w = font.text_length(s, size)
        if align == "right":
            x = x + width - w
        elif align == "center":
            x = x + (width - w) / 2
        tw.append((x, y), s, font=font, fontsize=size)
        tw.write_text(page)

    def draw_footers(self):
        partners = [
            ASSETS / "gram.png",
            ASSETS / "sicard.png",
            ASSETS / "ascaoc.png",
            ASSETS / "ica-50.png",
        ]
        n = self.doc.page_count
        for i in range(n):
            page = self.doc[i]
            page.draw_rect(
                pymupdf.Rect(0, H - FOOTER_H, W, H),
                color=None,
                fill=(0.97, 0.97, 0.975),
                width=0,
            )
            page.draw_rect(
                pymupdf.Rect(0, H - FOOTER_H, W, H - FOOTER_H + 1.5),
                color=None,
                fill=GOLD,
                width=0,
            )
            x = 28
            for path in partners:
                if not path.exists():
                    continue
                page.insert_image(
                    pymupdf.Rect(x, H - 50, x + 78, H - 10),
                    filename=str(path),
                )
                x += 86
            label = f"{i + 1} / {n}"
            tw = pymupdf.TextWriter(page.rect, color=NAVY)
            tw.append(
                (W - 48 - self.bold.text_length(label, 9), H - 24),
                label,
                font=self.bold,
                fontsize=9,
            )
            tw.write_text(page)

    def day_banner(self, day, index):
        h = 36
        self.ensure(h + 10)
        r = pymupdf.Rect(ML, self.y, W - MR, self.y + h)
        self.page.draw_rect(r, color=None, fill=NAVY, width=0)
        self.page.draw_rect(
            pymupdf.Rect(ML, self.y, ML + 5, self.y + h),
            color=None,
            fill=GOLD,
            width=0,
        )
        num = f"JOUR {index + 1}"
        self.text(ML + 16, self.y + 14, num, self.bold, 8, GOLD)
        self.text(
            ML + 16,
            self.y + 28,
            f"{day['date'].upper()}  ·  {day['tag'].upper()}",
            self.bold,
            10,
            WHITE,
        )
        self.y += h + 12

    def time_pill(self, y, time, kind):
        fill, fg = NAVY, WHITE
        if kind == "break":
            fill, fg = CREAM, GOLD_DK
        elif kind == "ceremony":
            fill, fg = GOLD, NAVY
        elif kind == "symposium":
            fill, fg = GOLD, NAVY
        rect = pymupdf.Rect(ML, y, ML + TIME_W, y + 16)
        self.page.draw_rect(rect, color=None, fill=fill, width=0)
        tw = pymupdf.TextWriter(self.page.rect, color=fg)
        s = time
        size = 7 if len(s) > 14 else 7.4
        w = self.bold.text_length(s, size)
        tw.append(
            (ML + (TIME_W - w) / 2, y + 11.2),
            s,
            font=self.bold,
            fontsize=size,
        )
        tw.write_text(self.page)

    def badge(self, x, y, label, fill, fg):
        pad = 4
        bw = self.bold.text_length(label, 6.2) + pad * 2
        bh = 11
        self.page.draw_rect(
            pymupdf.Rect(x, y, x + bw, y + bh),
            color=None,
            fill=fill,
            width=0,
        )
        self.text(x + pad, y + 8.4, label, self.bold, 6.2, fg)
        return bw

    def title_size(self, width, variant):
        if variant == "parallel" and width < 200:
            return 8.4
        return 10

    def measure_session(self, session, width, variant):
        if variant == "break":
            return 28
        pad = 9
        inner = width - pad * 2
        narrow = variant == "parallel" and width < 200
        tsize = self.title_size(width, variant)
        title_w = inner if narrow else max(inner - 82, inner * 0.55)
        h = pad
        h += 12 * max(1, len(wrap(self.bold, session["title"], tsize, title_w)))
        if narrow:
            h += 14
        if session.get("theme"):
            h += 4 + 11 * max(
                1, len(wrap(self.italic, session["theme"], 7.8, inner))
            )
        if session.get("moderators"):
            h += 16 + 11 * max(
                1, len(wrap(self.font, session["moderators"], 8, inner))
            )
        if session.get("speakers"):
            txt = " · ".join(session["speakers"])
            h += 16 + 11 * max(1, len(wrap(self.font, txt, 8, inner)))
        countries = session.get("countries") or []
        if countries:
            cols = 1 if narrow else 2
            rows = (len(countries) + cols - 1) // cols
            h += 6 + rows * 16
        talks = session.get("talks") or []
        if talks:
            h += 6
            for talk in talks:
                t_w = inner - 22
                h += 3 + 10.5 * max(
                    1, len(wrap(self.font, talk["title"], 8, t_w))
                )
                if talk.get("speaker"):
                    h += 10
                if talk.get("debate") == "vs":
                    h += 12
        items = session.get("items") or []
        if items:
            h += 4 + 12 * len(items)
        if session.get("note"):
            h += 16
        h += pad + 4
        return max(h, 34)

    def draw_session(self, x, y, session, width, variant):
        h = self.measure_session(session, width, variant)
        rect = pymupdf.Rect(x, y, x + width, y + h)
        fill = WHITE
        accent = None
        if variant == "break":
            fill = CREAM
        elif variant == "ceremony":
            fill = NAVY
        elif variant == "symposium":
            fill = (0.99, 0.95, 0.86)
            accent = GOLD
        elif variant == "public":
            fill = CREAM
            accent = GOLD
        elif variant == "parallel":
            fill = SOFT
        self.page.draw_rect(rect, color=LINE, fill=fill, width=0.4)
        if accent:
            self.page.draw_rect(
                pymupdf.Rect(x, y, x + 3.2, y + h),
                color=None,
                fill=accent,
                width=0,
            )

        pad = 9
        cx = x + pad
        inner = width - pad * 2
        cy = y + pad + 10
        title_color = WHITE if variant == "ceremony" else NAVY
        body_color = (0.85, 0.88, 0.92) if variant == "ceremony" else MUTED
        text_color = WHITE if variant == "ceremony" else TEXT
        narrow = variant == "parallel" and width < 200
        tsize = self.title_size(width, variant)

        if variant == "break":
            self._write(
                self.page,
                x,
                y + 18,
                session["title"].upper(),
                self.bold,
                9.5,
                GOLD_DK,
                width,
                align="center",
            )
            return h

        label = KIND_LABEL.get(session.get("kind")) or TYPE_LABEL.get(
            variant, "Session"
        )
        badges = [label] + list(session.get("badges") or [])

        def paint_badges(bx, by):
            for b in reversed(badges):
                if b == "Live":
                    fill_b, fg_b = GOLD, WHITE
                else:
                    fill_b = (
                        (0.12, 0.22, 0.36) if variant != "ceremony" else GOLD
                    )
                    fg_b = WHITE if variant != "ceremony" else NAVY
                bw = self.bold.text_length(b.upper(), 6.2) + 8
                bx -= bw
                self.badge(bx, by, b.upper(), fill_b, fg_b)
                bx -= 4

        title_w = inner if narrow else max(inner - 82, inner * 0.55)
        ny, _ = self.block(
            cx, cy, session["title"], self.bold, tsize, title_color, title_w, 12
        )
        if narrow:
            paint_badges(x + width - pad, ny + 2)
            cy = ny + 16
        else:
            paint_badges(x + width - pad, y + pad)
            cy = max(ny, y + pad + 16) + 4

        if session.get("theme"):
            cy, _ = self.block(
                cx,
                cy,
                session["theme"],
                self.italic,
                8,
                GOLD_DK if variant != "ceremony" else GOLD,
                inner,
                11,
            )
            cy += 2

        if session.get("moderators"):
            self.text(cx, cy, "MODÉRATEURS", self.bold, 6.4, GOLD)
            cy += 11
            cy, _ = self.block(
                cx, cy, session["moderators"], self.font, 8, body_color, inner, 11
            )
            cy += 3

        if session.get("speakers"):
            self.text(cx, cy, "INTERVENANTS", self.bold, 6.4, GOLD)
            cy += 11
            cy, _ = self.block(
                cx,
                cy,
                " · ".join(session["speakers"]),
                self.font,
                8,
                body_color,
                inner,
                11,
            )
            cy += 3

        countries = session.get("countries") or []
        if countries:
            col_w = (inner - 6) / 2
            for i, item in enumerate(countries):
                col = i % 2
                row = i // 2
                ix = cx + col * (col_w + 6)
                iy = cy + row * 16
                self.page.draw_rect(
                    pymupdf.Rect(ix, iy - 8, ix + col_w, iy + 6),
                    color=None,
                    fill=(0.96, 0.96, 0.97) if variant != "ceremony" else (0.1, 0.18, 0.3),
                    width=0,
                )
                label_c = f"{item['country']}  —  {item.get('speaker', '')}"
                self.block(ix + 4, iy, label_c, self.font, 7.4, text_color, col_w - 8, 10)
            cy += ((len(countries) + 1) // 2) * 16 + 4

        talks = session.get("talks") or []
        if talks:
            num = 0
            for talk in talks:
                num += 1
                nlab = f"{num:02d}"
                self.text(cx, cy, nlab, self.bold, 7.5, GOLD)
                t_w = inner - 22
                ny, nlines = self.block(
                    cx + 20, cy, talk["title"], self.font, 8, text_color, t_w, 10.5
                )
                cy = ny
                if talk.get("speaker"):
                    self.text(
                        cx + 20,
                        cy,
                        talk["speaker"],
                        self.bold,
                        7.6,
                        GOLD_DK if variant != "ceremony" else GOLD,
                    )
                    cy += 10
                if talk.get("debate") == "vs":
                    self._write(
                        self.page,
                        cx,
                        cy,
                        "VS",
                        self.bold,
                        7,
                        GOLD,
                        inner,
                        align="center",
                    )
                    cy += 12
                cy += 3

        items = session.get("items") or []
        for item in items:
            self.text(cx, cy, "–  " + item, self.font, 8, text_color)
            cy += 12

        if session.get("note"):
            self.page.draw_rect(
                pymupdf.Rect(cx, cy - 2, cx + inner, cy - 1.4),
                color=None,
                fill=GOLD,
                width=0,
            )
            cy += 12
            self.block(cx, cy, session["note"], self.italic, 7.6, GOLD_DK, inner, 10)

        return h

    def draw_slot(self, slot):
        if slot["type"] == "parallel":
            sessions = slot["sessions"]
            n = len(sessions)
            gap = 8
            col_w = (CONTENT_W - gap * (n - 1)) / n
            heights = [self.measure_session(s, col_w, "parallel") for s in sessions]
            label_h = 14
            total = max(heights) + label_h
            self.ensure(total + 4)
            self.time_pill(self.y + 2, slot["time"], "parallel")
            self.text(
                CONTENT_X,
                self.y + 10,
                "SESSIONS SIMULTANÉES",
                self.bold,
                6.6,
                GOLD,
            )
            y0 = self.y + label_h
            for i, session in enumerate(sessions):
                self.draw_session(
                    CONTENT_X + i * (col_w + gap),
                    y0,
                    session,
                    col_w,
                    "parallel",
                )
            self.y = y0 + max(heights) + 8
            return

        variant = slot["type"]
        h = self.measure_session(slot, CONTENT_W, variant)
        self.ensure(h + 2)
        self.time_pill(self.y + 2, slot["time"], variant)
        self.draw_session(CONTENT_X, self.y, slot, CONTENT_W, variant)
        self.y += h + 8

    def build(self):
        days = self.data["days"]
        for i, day in enumerate(days):
            if self.page is None:
                self.new_page()
            elif self.y > HEADER_H + 20:
                # keep a bit of air before a new day, else new page
                if self.y > H - FOOTER_H - 120:
                    self.new_page()
                else:
                    self.y += 6
            self.day_banner(day, i)
            for slot in day["slots"]:
                self.draw_slot(slot)
        self.draw_footers()
        self.doc.save(str(OUT_PATH), garbage=4, deflate=True)
        self.doc.close()
        return OUT_PATH


def prepare_assets():
    ASSETS.mkdir(exist_ok=True)
    make_transparent(ROOT / "public" / "img" / "logo-pied-de-page.png", LOGO, 28)


def main():
    prepare_assets()
    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    path = Builder(data).build()
    print(path)


if __name__ == "__main__":
    main()
