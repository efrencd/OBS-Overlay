# OBS Overlay Controller

This repository shines a transparent browser-based overlay into OBS studio while letting any device on your LAN control it through a small WebSocket bridge.

## Architecture

- `server.js`: lightweight Node.js server built with `ws`. It listens on port 8080 and broadcasts every incoming JSON payload to every connected client (both overlays and the control page share the same feed).  
- `obs.html`: the actual OBS source. It runs at 1920×1080 with a floating lower-third panel on the left. Text elements and sound cues are animated independently: the green panel slides in from the left and the copy lifts from below, so even lengthy subtitles stay inside the expanding background.  
- `ext.html`: “control panel” that lets you manage presets, send sounds, monitor connection status, and reconnect to different WebSocket endpoints. Presets are saved in `localStorage`, survive reloads, and can be edited or deleted from the UI.
- `sounds/`: four MP3s (`applause1`, `applause2`, `laugh1`, `laugh2`) that the overlay can play when it receives a `{ sound: '...' }` command.

## Usage

1. `npm install` to pull `ws`.
2. `npm start` (runs `node server.js`). Keep the console open—connections and messages are logged here.
3. Load `ext.html` in your browser (local or remote). Update the WebSocket server URL if the OBS machine has a different IP, then hit “Reconectar servidor”.  
4. Create presets (title, subtitle, duration) via the modal. They appear as buttons with accompanying edit/trash actions. All state persists thanks to `localStorage`.  
5. Use the four “Sonidos rápidos” buttons to instantly fire a sound effect on the overlay without showing the lower-third.  
6. In OBS, add a **Browser** source pointing to `obs.html` (make sure it’s sized 1920×1080 and transparency is enabled). When a preset is sent, the title/subtitle and optional sound play inside the overlay.

## Sending Custom Events

The overlay reacts to payloads shaped like:

```json
{
  "title": "LINE 1",
  "subtitle": "Line 2",
  "duration": 4,
  "sound": "applause1"
}
```

- `title`/`subtitle`: populate the lower-third copy. If both are empty the overlay stays hidden (useful for sounds).
- `duration`: controls how long the lower-third remains visible before animating out.  
- `sound`: optional key that maps to one of the MP3 files. Only `applause1`, `applause2`, `laugh1`, and `laugh2` are wired by default.

Any client connected to the WebSocket can emit that JSON and every other client (including the OBS overlay) will consume it, making the setup ideal for collaborative streams.

## Notes

- The control UI dynamically hides the connection inputs while connected, but you can still reconnect or change URLs manually.  
- All animations and fading happen purely in CSS/JS so the OBS source stays lightweight.  
- Sounds play alongside the overlay text only when specified; the quick-sound buttons deliberately send payloads with empty text so the lower-third stays hidden.
