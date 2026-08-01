# Development Guide

## Project Architecture

```
CableTVEmulator (Main App)
├── VideoPlayer (HLS streaming)
├── ChannelManager (Channel data & m3u8 parsing)
└── RemoteControl (Input handling)
```

## Module Overview

### VideoPlayer (`js/player.js`)

Handles all video streaming functionality.

**Key Methods:**
- `init()` - Initialize HLS.js
- `loadStream(url)` - Load and play a stream
- `play()` / `pause()` / `stop()` - Playback control
- `setVolume(0-100)` - Volume control
- `setBrightness(0-100)` - Brightness adjustment
- `toggleMute()` - Mute/unmute

**Events:**
- `Hls.Events.MANIFEST_PARSED` - Playlist loaded
- `Hls.Events.ERROR` - Streaming error

### ChannelManager (`js/channels.js`)

Manages channel data and playlist parsing.

**Key Methods:**
- `loadDefaultChannels()` - Load built-in channels
- `parseM3U8(content)` - Parse m3u8 format
- `loadFromURL(url)` - Load remote playlist
- `loadFromFile(file)` - Load local file
- `searchChannels(query)` - Filter channels
- `getChannelByNumber(num)` - Find channel
- `nextChannel()` / `previousChannel()` - Navigation

**Data Structure:**
```javascript
{
    number: 1,           // Channel number (1-999)
    name: 'NBC',         // Channel name
    url: 'https://...'   // HLS stream URL
}
```

### RemoteControl (`js/remote.js`)

Handles user input (keyboard & buttons).

**Keyboard Bindings:**
- `0-9` - Number input
- `Arrow Keys` - Navigation and volume
- `Enter` - Submit
- `M` - Mute toggle
- `B` - Brightness
- `Space` - Play/pause

### CableTVEmulator (`js/app.js`)

Main application orchestrating all modules.

**Key Methods:**
- `init()` - Initialize app
- `selectChannel(number)` - Switch channel
- `nextChannel()` / `previousChannel()` - Navigate
- `setVolume()` / `setBrightness()` - Control
- `searchChannels(query)` - Search
- `loadPlaylist()` - Load m3u8

## Adding Features

### Add a New Channel

Edit `js/channels.js` in `loadDefaultChannels()`:

```javascript
this.channels = [
    // ... existing channels
    { number: 21, name: 'My Channel', url: 'https://example.com/stream.m3u8' },
];
```

### Add a New Control Button

1. Add HTML in `index.html`:
```html
<button id="myButton" class="control-btn">My Button</button>
```

2. Add listener in `js/remote.js`:
```javascript
document.getElementById('myButton').addEventListener('click', () => {
    this.app.myMethod();
});
```

3. Add method in `js/app.js`:
```javascript
myMethod() {
    console.log('Button clicked!');
}
```

### Custom Styling

Edit `css/style.css` to change colors:

```css
:root {
    --primary-color: #1a1a1a;      /* Main background */
    --accent-color: #ff6600;        /* Orange highlights */
    --text-color: #ffffff;          /* Text color */
    --led-green: #00ff00;           /* LED indicator */
}
```

## Testing

### Manual Testing

1. Open `index.html` in browser
2. Test channel navigation
3. Test volume/brightness controls
4. Load a test playlist
5. Check console for errors

### Test Streams

Add these URLs to test playlists:
```
https://test-streams.mux.dev/x36xhzz/x3uyqvf/f1ddemas86d46mapm.m3u8
https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8
```

## Browser DevTools

### Console

Access the app for debugging:
```javascript
window.cableTVApp              // Main app instance
window.cableTVApp.channels     // Channel manager
window.cableTVApp.player       // Video player
window.cableTVApp.remote       // Remote control
```

### Network Tab

Monitor:
- m3u8 playlist requests
- Video segment requests
- CORS issues

### Performance

- Check for memory leaks
- Monitor video frame drops
- Profile long script execution

## Extending the Emulator

### Add Recording Feature

```javascript
// In js/app.js
recordChannel() {
    // Implement recording logic
}
```

### Add Channel Favorites

```javascript
// Store in localStorage
saveFavorite(channelNumber) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.includes(channelNumber)) {
        favorites.push(channelNumber);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}
```

### Add Program Guide (EPG)

```javascript
// Fetch EPG data
async loadEPG(channelNumber) {
    const response = await fetch(`/api/epg/${channelNumber}`);
    return response.json();
}
```

## Code Style

- Use ES6+ features
- Use meaningful variable names
- Add JSDoc comments
- Keep functions focused and small
- Prefer arrow functions for callbacks

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push to repository
git push origin feature/new-feature

# Create Pull Request on GitHub
```

## Performance Tips

1. **Minimize DOM updates** - Batch updates together
2. **Lazy load channels** - Load only visible items
3. **Use requestAnimationFrame** - For smooth animations
4. **Cache streams** - Use service workers
5. **Optimize images** - Use compressed assets

## Debugging Common Issues

### Streams not loading
```javascript
// Check HLS errors
window.cableTVApp.player.hls.on(Hls.Events.ERROR, (event, data) => {
    console.log('HLS Error:', data);
});
```

### Channel list not updating
```javascript
// Manually update
window.cableTVApp.updateChannelList();
```

### Remote control not responding
```javascript
// Check if remote is initialized
console.log(window.cableTVApp.remote);
```
