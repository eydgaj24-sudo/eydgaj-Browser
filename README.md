# Khram Browser

A modern, customizable desktop browser built with Electron and Chromium.

Khram focuses on clean design, performance, and control — giving you a fast, distraction-free browsing experience with powerful built-in features like ad blocking, session restore, and a secure password manager.

**Current release:** v2.0.2 (see `package.json` for the canonical version).

---

## Screenshots


| Area | Preview |
|------|----------|
| New tab | ![New tab](docs/screenshots/new-tab.png) |
| Settings | ![Settings](docs/screenshots/settings.png) |

---

## What you get today

- Frameless window with custom controls (Windows layout and macOS traffic-light spacing where it matters).
- Real tabs on a shared `persist:khram` content session.
- Omnibar for URLs, `khram://` pages, and search (several engines selectable in settings).
- Navigation, new tab, close tab, basic session behaviour including **restore previous session** when that option is enabled in settings.
- Internal pages: new tab, welcome, settings (including performance and appearance), history, bookmarks, downloads, password manager.
- Local **history**, **bookmarks**, and **settings** persisted on disk; **downloads** list and optional **ad blocking** (Cliqz-style engine, level configurable).
- **Password vault** with encryption at rest, unlock, CSV import/export, and autofill hooks (see settings and the capture bar when the app offers to save credentials).
- DevTools: **F12** targets the active tab; **Ctrl+Shift+I** opens the shell; menu entries mirror that.
- Packaging via **electron-builder** (Windows NSIS, macOS DMG, Linux AppImage) with bundled `public/` assets and `browser-backgrounds/` images for new-tab photos. Installed app name and main binary follow `productName` in the build config.
- **Default browser:** Settings includes **Default browser** — register **HTTP/HTTPS** with the OS where Electron can, open system default-app settings as a fallback, and reuse a **single running instance** where the protocol handler reopens existing windows instead of spawning duplicates.

Hardening in broad terms: `contextIsolation`, no `nodeIntegration` in the shell, small preload surfaces, and IPC payloads validated with Zod. Internal-only APIs are restricted to `khram://` documents and cross-checked with sender identity.

---

## Requirements

- **Node.js** 18 or newer (20+ is a sane default).
- **npm** (or another client that understands `package.json` scripts).

To **install a prebuilt binary**, you only need the installer for your OS (see below). You do not need Node on the machine where you only run Khram.

---

## Installing the browser

### Windows

1. Obtain `Khram-Installer-Windows-2.0.2.exe` from the releases on this repo (or build it yourself; see **Building**).
2. Run the installer. You can change the install directory when prompted (NSIS is configured for a classic wizard, not one-click).
3. Launch **Khram** from the Start menu or desktop shortcut. The main executable is **Khram.exe** (typical per-user install under `%LOCALAPPDATA%\Programs\khram-browser` or similar, depending on NSIS installer settings).
4. If Windows SmartScreen warns about an **unsigned** build, that is expected for local or CI builds until you attach a code-signing certificate.

### macOS

1. Obtain `Khram-Installer-macOS-2.0.2.dmg` (build on a Mac; cross-building macOS installers from Windows is not practical).
2. Open the DMG and drag **Khram** into Applications (the bundle name follows `productName` in the build config).
3. If Gatekeeper blocks an unnotarized app, use **System Settings → Privacy & Security** to allow it, or sign and notarize your own builds for distribution.

### Linux

1. Obtain `Khram-Installer-Linux-2.0.2.AppImage`.
2. `chmod +x Khram-Installer-Linux-2.0.2.AppImage` if needed, then run it. Integrating with the desktop environment is up to your distro and launcher.

Version numbers in filenames follow **`package.json`**; after a version bump, the installer names change accordingly.

---

## Building from source

Clone the repository, install dependencies, then either run in development mode or produce `out/` / `release/` artifacts.

```bash
git clone https://github.com/eydgaj24-sudo/eydgaj-Browser.git khram
cd khram
npm install
```

### Run during development

```bash
npm run dev
```

This starts the Vite dev server for the shell and launches Electron against it.

### Compile without an installer

```bash
npm run build
npm run preview
```

`preview` runs Electron using the production bundle in `out/`.

### Create installers

Outputs land in **`release/`** (ignored by git).

```bash
npm run dist
```

Or target a specific OS:

```bash
npm run dist:win      # Windows NSIS
npm run dist:mac      # macOS DMG
npm run dist:linux    # Linux AppImage
```

---

## Development: Important paths and modules

### Application structure

- **`src/main/`** — Electron main process: window management, IPC handlers, internal APIs (default browser, auto-update, etc).
  - **`src/main/khram-pages/`** — Server-side page renderers for `khram://` routes (newtab, settings, history, bookmarks, downloads, welcome, about, etc).
  - **`src/main/protocol.ts`** — Custom protocol handler for `khram://` and browser-backgrounds.
  - **`src/main/tab-manager.ts`** — Tab lifecycle, session splits, workspaces, and state machine.
  - **`src/main/default-browser.ts`** — OS-level registration (Windows registry, macOS/Linux fallback).
  - **`src/main/auto-updater.ts`** — Electron-updater wiring and status broadcast.
  - **`src/main/adblock.ts`** — @cliqz/adblocker integration and runtime settings.
  - **`src/main/password-vault.ts`** — Encrypted vault with Electron's `safeStorage`, CSV import/export.
  - **`src/main/password-fill-script.ts`** — Autofill script injection for credential picker.

- **`src/preload/`** — Preload scripts that expose safe APIs to renderer contexts.
  - **`src/preload/tab.ts`** — Main context-bridge: `window.khramPage` (settings, history, bookmarks, downloads, password manager, autoupdate status, browser data import, etc) and `window.khramTab` (tab-only APIs).
  - **`src/preload/shell.ts`** — Shell-chrome APIs (omnibar, downloads/bookmark/site-info/overflow popovers, password bar, default-browser prompt, etc).

- **`src/renderer/`** — React app for the browser shell and internal pages.
  - **`src/renderer/shell/`** — Omnibar, tab bar, windows chrome, workspaces, menus.
  - **`src/renderer/pages/`** — React routes for new-tab, welcome, settings, internal pages (history, bookmarks, downloads, password manager).

- **`src/shared/`** — Shared code (IPC message names, types, URL utilities).
  - **`src/shared/ipc.ts`** — IPC channel definitions and TypeScript interfaces for all payloads.
  - **`src/shared/khram-url.ts`** — URL parsing for `khram://` and bare hostnames.

- **`public/`** — Static assets: Khram.png, Khram.ico, Khram-mac.png, etc.
- **`browser-backgrounds/`** — Optional background images for the new-tab page.

### Running the dev server

```bash
npm run dev
```

- Vite watches `src/renderer/` and `src/preload/` in real-time.
- Electron main process is started and reloads when main-process files change.
- Edit `.ts` / `.tsx` files; changes apply on next navigation or window focus.

### Debugging

- **`F12`** in the app opens DevTools for the active tab content.
- **`Ctrl+Shift+I`** opens DevTools for the shell chrome.
- **Inspector on main process** — To debug the main process, start with `npm run dev`, then in a separate terminal:
  ```bash
  node --inspect-brk=9229 ./node_modules/.bin/electron .
  ```
  Then open `chrome://inspect` in Chrome/Chromium to attach.

---

## Licensing

MIT. See [LICENSE](LICENSE).

---

## Contributing

Contributions are welcome. Fork this repository, create a feature branch, and open a pull request.
