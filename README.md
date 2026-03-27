# ✨ EPUB Forge

![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg)
![PWA Ready](https://img.shields.io/badge/PWA-Installable-6f42c1.svg)
![Offline First](https://img.shields.io/badge/Offline-First-0f766e.svg)
![Background Sync](https://img.shields.io/badge/Background-Sync-10b981.svg)
![Frontend](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-f59e0b.svg)
![No Backend](https://img.shields.io/badge/Backend-None-64748b.svg)

A polished, mobile-friendly web app for turning structured manuscript folders into Kindle-ready `.epub` files — completely in-browser.

---

## 🚀 Highlights

- 📁 **Folder-based import** with automatic scan for chapters, cover, and inline images.
- 🧾 **Metadata editor** for title, author, language, publisher, rights, and description.
- 🎨 **Kindle-focused styling** with preset CSS themes and custom CSS support.
- 📚 **Automatic TOC and chapter ordering** from filename conventions.
- 📦 **Installable PWA** with custom install prompt.
- 📴 **Offline-first experience** powered by a service worker cache strategy.
- 🔄 **Background sync refresh** to update cached app assets when back online.
- 📱 **Touch-first interface** designed for modern mobile devices.

---

## 🧱 Expected Manuscript Structure

```text
my-book/
├── cover.jpg
└── chapters/
    ├── 0_Introduction.html
    ├── 1_Chapter_One.html
    └── scene-image.jpg
```

### Notes

- `cover.*` should be at the root of your selected folder.
- Chapters should be HTML files inside a subfolder (e.g., `chapters/`).
- Numeric filename prefixes control chapter order.

---

## 🛠️ Local Development

Because this is a PWA, run it through an HTTP server (not directly via `file://`).

### Option A: Python

```bash
python -m http.server 8080
```

### Option B: Node

```bash
npx serve .
```

Then open:

```text
http://localhost:8080
```

---

## 📲 Install as an App

1. Open EPUB Forge in a supported browser.
2. Use the in-app **Install App** prompt (or browser install menu).
3. Launch it from your home screen/app launcher.

---

## 🔐 Privacy

EPUB Forge runs fully in your browser.

- No account required.
- No backend upload pipeline.
- Your manuscript files stay local to your device session.

---

## 🧭 Roadmap Ideas

- Drag-and-drop chapter reordering UI
- Validation panel for malformed HTML
- Multiple export profiles (Kindle, Kobo, Apple Books)
- Optional local project save/restore

---

## 📄 License

Released under the MIT License. See [`LICENSE`](./LICENSE).

---

## 👨‍💻 About / Contact Dev

- GitHub: update the footer link in `index.html` with your repository URL
- Contact: update the footer email in `index.html`

© 2026-present All Rights Reserved.
