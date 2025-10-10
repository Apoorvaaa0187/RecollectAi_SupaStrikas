Memory Lane — Extension build and load


How to build the popup for the browser extension (popup-only project)

1. Install dependencies and build

```powershell
cd client
npm install
npm run build
```

2. The build output will be in `client/dist`. That folder includes:
- `popup.html` — the extension popup
- `manifest.json` — copied from `public/manifest.json`
- `background.js` — copied from `public/background.js`

3. Load the extension in Chrome/Edge (Developer mode):
- Open `chrome://extensions/` (or `edge://extensions/`)
- Enable "Developer mode"
- Click "Load unpacked" and select the `client/dist` folder

Dev preview
- While developing, run `npm run dev` and open the preview URL with `/popup.html` appended, e.g. `http://localhost:5173/popup.html`.

Notes:
- This repository is configured as popup-only: there is no `index.html` or `src/main.jsx` web page. The popup UI is in `popup.html` and `src/popup.jsx`.
- For the popup to interact with captured data, wire the background service worker to manage storage or message passing.
- If you want icons to appear, add them to `client/public/icons/` before building.
