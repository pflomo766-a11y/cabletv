# Cable TV 2011 Emulator

A nostalgic web-based emulator that simulates a 2011-era cable TV interface with 999 channels. Features HLS video streaming support and m3u8 playlist integration for US networks.

## Features

- 📺 Authentic 2011-era cable TV UI
- 📡 999 customizable channels
- 🎬 HLS video player integration
- 📋 m3u8 playlist support
- 🇺🇸 Pre-configured US network channels
- ⌨️ Remote control simulation (arrow keys, number pad)
- 🔊 Volume and brightness controls

## Project Structure

```
cabletv/
├── index.html           # Main HTML interface
├── css/
│   └── style.css        # 2011-era styling
├── js/
│   ├── app.js           # Main application logic
│   ├── player.js        # HLS video player
│   ├── channels.js      # Channel management
│   └── remote.js        # Remote control handling
├── data/
│   ├── channels.json    # Channel database
│   └── playlists.m3u    # Sample m3u8 playlist
└── assets/
    └── images/          # UI assets (2011 style)
```

## Installation

1. Clone the repository
2. No build step required - open `index.html` in a modern web browser
3. Load channels from m3u8 playlist or use default US networks

## Usage

### Keyboard Controls

- **Arrow Keys**: Navigate channels
- **0-9**: Direct channel number input
- **Enter**: Confirm channel selection
- **+/-**: Volume control
- **M**: Mute toggle
- **B**: Brightness control
- **Space**: Play/Pause

### Loading Playlists

Place m3u8 files in the `data/` directory or load via URL:

```javascript
// Load from file
channels.loadFromM3U8('data/playlists.m3u');

// Load from URL
channels.loadFromM3U8('https://example.com/playlist.m3u8');
```

## Video Streaming

The player uses HLS.js for HLS/m3u8 support. Streams are loaded from:

1. Local m3u8 playlists
2. Remote playlist URLs
3. Direct stream URLs configured in channels.json

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Dependencies

- [HLS.js](https://github.com/video-js/hls.js) - HLS streaming support
- Vanilla JavaScript (no framework dependencies)

## License

MIT
