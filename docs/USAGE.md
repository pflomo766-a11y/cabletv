# Cable TV 2011 Emulator - Usage Guide

## Getting Started

1. Open `index.html` in a modern web browser
2. The emulator will load with a default set of 20 US network channels
3. Use the on-screen remote or keyboard controls to navigate

## Remote Control

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `0-9` | Direct channel input (auto-submits after 2 seconds) |
| `↑` / `↓` | Previous/Next channel |
| `←` / `→` | Volume down/up |
| `Enter` | Submit channel number |
| `Backspace` / `C` | Clear channel input |
| `M` | Toggle mute |
| `B` | Brightness adjustment |
| `Space` | Play/Pause |

### On-Screen Controls

**Number Pad**
- Click numbers 0-9 to input a channel
- Click `ENTER` to switch to that channel
- Click `C` to clear input

**Arrow Pad**
- `▲` / `▼` - Navigate channels
- `◄` / `►` - Adjust volume
- `OK` - Confirm selection

**Media Controls**
- `▶ PLAY` - Play current stream
- `⏸ PAUSE` - Pause stream
- `⏹ STOP` - Stop stream

**Volume & Settings**
- Drag volume slider or use arrow keys
- Adjust brightness slider
- Click `MUTE` to toggle sound

## Loading Custom Playlists

### Method 1: From File

1. Click on the file input in the sidebar
2. Select your `.m3u8` playlist file
3. Click `LOAD PLAYLIST`

### Method 2: From URL

1. Paste a playlist URL in the text field
2. Click `LOAD PLAYLIST`

### Method 3: Programmatically

```javascript
// Access the app through the global window object
const app = window.cableTVApp;

// Load from URL
await app.channels.loadFromURL('https://example.com/playlist.m3u8');
app.updateChannelList();

// Or search for channels
app.searchChannels('ESPN');
```

## M3U8 Playlist Format

Your playlist should follow the standard m3u8 format:

```
#EXTM3U
#EXTINF:-1 tvg-id="1" tvg-name="Channel Name",Channel Name
http://stream-url.m3u8
#EXTINF:-1 tvg-id="2" tvg-name="Another Channel",Another Channel
http://another-stream.m3u8
```

## Customization

### Changing Default Channels

Edit `js/channels.js` and modify the `loadDefaultChannels()` method:

```javascript
loadDefaultChannels() {
    this.channels = [
        { number: 1, name: 'My Channel', url: 'https://example.com/stream.m3u8' },
        // Add more channels...
    ];
}
```

### Styling

Modify `css/style.css` to customize colors and appearance:

```css
:root {
    --primary-color: #1a1a1a;
    --accent-color: #ff6600;  /* Change the orange accent */
    /* ... more variables */
}
```

## Troubleshooting

### Streams Not Loading

1. Check that the stream URL is valid and accessible
2. Ensure the URL points to a valid HLS (m3u8) stream
3. Check browser console for CORS errors (may need server-side configuration)

### Audio/Video Not Playing

1. Verify browser supports HLS streaming (Chrome 34+, Firefox, Safari, Edge)
2. Click PLAY button to start playback
3. Check volume is not muted

### Playlist Won't Load

1. Ensure m3u8 file is properly formatted
2. Check that URLs in the playlist are accessible
3. For local files, use the file upload feature (URL loading may face CORS restrictions)

## Browser Support

- ✅ Chrome 34+
- ✅ Firefox 25+
- ✅ Safari 8+
- ✅ Edge 12+
- ✅ Opera 21+

## Performance Tips

1. Use adaptive bitrate streams for better performance
2. Limit to ~100 channels for optimal sidebar performance
3. Close browser DevTools to improve video performance

## API Reference

### Accessing the App

```javascript
const app = window.cableTVApp;
```

### Common Methods

```javascript
// Navigation
app.selectChannel(5);        // Go to channel 5
app.nextChannel();           // Next channel
app.previousChannel();       // Previous channel

// Playback
app.play();                  // Play current stream
app.pause();                 // Pause stream
app.stop();                  // Stop and reset

// Control
app.setVolume(75);           // Set volume (0-100)
app.setBrightness(80);       // Set brightness (0-100)
app.toggleMute();            // Toggle mute

// Search
app.searchChannels('news');  // Filter channels by name

// Playlist
await app.loadPlaylist();    // Load from URL or file input
```
