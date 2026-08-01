# Configuration Guide

## Environment Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- HTTP/HTTPS server (for local development)
- Text editor or IDE

### Local Development Server

#### Using Python 3
```bash
python -m http.server 8000
```

#### Using Python 2
```bash
python -m SimpleHTTPServer 8000
```

#### Using Node.js
```bash
npm install -g http-server
http-server
```

#### Using PHP
```bash
php -S localhost:8000
```

Then open: `http://localhost:8000`

## File Structure

```
cabletv/
├── index.html              # Main HTML
├── css/
│   └── style.css           # All styling
├── js/
│   ├── app.js              # Main application
│   ├── player.js           # HLS video player
│   ├── channels.js         # Channel management
│   └── remote.js           # Input control
├── data/
│   ├── channels.json       # Channel database
│   └── playlists.m3u8      # Sample playlist
└── docs/
    ├── USAGE.md            # User guide
    ├── STREAMING_SETUP.md  # Stream configuration
    ├── DEVELOPMENT.md      # Developer guide
    └── CONFIGURATION.md    # This file
```

## Configuration Options

### Default Channels

Edit `js/channels.js` - `loadDefaultChannels()` method:

```javascript
loadDefaultChannels() {
    this.channels = [
        { number: 1, name: 'NBC', url: 'https://...' },
        { number: 2, name: 'ABC', url: 'https://...' },
        // Add your channels here
    ];
    this.filteredChannels = [...this.channels];
}
```

### Player Settings

Edit `js/player.js` - `init()` method:

```javascript
this.hls = new Hls({
    debug: false,              // Enable debug logging
    enableWorker: true,        // Use web workers
    lowLatencyMode: true,      // Reduce latency
    fragLoadingRetryDelay: 1000,
    manifestLoadingRetryDelay: 1000
});
```

### UI Colors

Edit `css/style.css` - `:root` section:

```css
:root {
    --primary-color: #1a1a1a;      /* Dark background */
    --secondary-color: #2a2a2a;    /* Medium background */
    --accent-color: #ff6600;        /* Orange accent */
    --text-color: #ffffff;          /* White text */
    --text-secondary: #cccccc;      /* Gray text */
    --button-bg: #333333;           /* Button background */
    --button-hover: #444444;        /* Button hover */
    --border-color: #555555;        /* Border color */
    --led-green: #00ff00;           /* Green LED */
    --led-red: #ff0000;             /* Red LED */
    --screen-bg: #000000;           /* Screen black */
}
```

### Channel Limits

Edit `js/channels.js`:

```javascript
class ChannelManager {
    constructor() {
        this.maxChannels = 999;  // Maximum channels
    }
}
```

## Playlist Configuration

### Adding Playlists

Place `.m3u8` files in `data/` directory or load via URL.

### Playlist Format

Ensure playlists follow standard m3u8 format:

```m3u8
#EXTM3U
#EXTINF:-1 tvg-id="1" tvg-name="Channel Name",Channel Name
http://stream-url.m3u8
```

## Performance Tuning

### Memory

Limit cached segments in `js/player.js`:

```javascript
const config = {
    maxBufferLength: 30,       // Seconds
    backBufferLength: 5,       // Seconds
};
```

### Network

Adjust retry settings:

```javascript
this.hls = new Hls({
    fragLoadingRetryDelay: 1000,      // ms between retries
    manifestLoadingRetryDelay: 1000,  // ms between manifest retries
});
```

## Security

### HTTPS

For production, always use HTTPS:

```bash
# Generate self-signed certificate
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365

# Serve with HTTPS
python -m http.server 443 --certfile=cert.pem --keyfile=key.pem
```

### CORS

If streams fail due to CORS, configure server:

```nginx
add_header Access-Control-Allow-Origin *;
```

## Backup & Recovery

### Backup Channels

```javascript
// Export channels
const backup = JSON.stringify(window.cableTVApp.channels.channels);
console.log(backup);
```

### Restore Channels

```javascript
// Import channels
const backup = JSON.parse(backupString);
window.cableTVApp.channels.channels = backup;
window.cableTVApp.updateChannelList();
```

## Advanced Configuration

### Custom Theme

Create a new CSS file:

```css
/* custom-theme.css */
:root {
    --accent-color: #00ff00;  /* Green instead of orange */
    --primary-color: #111111; /* Darker black */
}
```

Link in `index.html`:
```html
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/custom-theme.css">
```

### Custom Player Skin

Override video player styles:

```css
.video-player {
    border-radius: 0;          /* No rounded corners */
    box-shadow: none;          /* No shadow */
}
```

### Keyboard Mapping

Customize keyboard bindings in `js/remote.js` - `handleKeyDown()` method.

## Troubleshooting

### Issue: Blank Screen
- Check browser console for errors
- Verify all JavaScript files are loaded
- Clear browser cache

### Issue: Streams Won't Load
- Verify HLS.js is loaded (check Network tab)
- Check stream URLs are correct
- Configure CORS if needed

### Issue: Slow Performance
- Reduce number of channels
- Lower video quality/bitrate
- Close browser DevTools

## Deployment

### GitHub Pages

```bash
# Push to gh-pages branch
git push origin main:gh-pages
```

Access at: `https://username.github.io/cabletv`

### Static Hosting

- Netlify: Drag and drop folder
- Vercel: Import from GitHub
- AWS S3: Upload all files
- Firebase Hosting: `firebase deploy`

## Monitoring

### Error Tracking

Add error logging:

```javascript
window.addEventListener('error', (e) => {
    console.error('Global error:', e);
    // Send to logging service
});
```

### Performance Monitoring

```javascript
console.time('channel-switch');
app.selectChannel(5);
console.timeEnd('channel-switch');
```
