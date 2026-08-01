# Cable TV 2011 Emulator - Quick Start Guide

## 🚀 Get Started in 60 Seconds

### Step 1: Open the App
Simply open `index.html` in your web browser. No installation needed!

```
Click: index.html → Opens in browser
```

### Step 2: Try the Controls

**Keyboard:**
- Press `1` through `9` to tune channels
- Press `↑` / `↓` to change channels
- Press `←` / `→` to adjust volume
- Press `M` to mute/unmute
- Press `Space` to play/pause

**Mouse:**
- Click number buttons on the remote
- Click arrow buttons to navigate
- Drag sliders for volume & brightness

### Step 3: Load Your First Stream

You have two options:

**Option A: Use a Test Playlist**
1. Click "Load Playlist" button
2. Enter this URL: `https://test-streams.mux.dev/x36xhzz/x3uyqvf/f1ddemas86d46mapm.m3u8`
3. Click "Load Playlist"

**Option B: Upload Local File**
1. Create a `.m3u8` file with your streams
2. Click the file input in the sidebar
3. Select your file
4. Click "Load Playlist"

### Step 4: Select a Channel

- Click a channel number (1-9)
- Press Enter
- Or click a channel name in the sidebar

## 📋 M3U8 Format Example

Create a file called `my-playlist.m3u8`:

```m3u8
#EXTM3U
#EXTINF:-1,Channel 1
https://example.com/stream1.m3u8
#EXTINF:-1,Channel 2
https://example.com/stream2.m3u8
#EXTINF:-1,Channel 3
https://example.com/stream3.m3u8
```

## 🔧 Customization

### Change the Default Channels

Edit `js/channels.js` line ~20:

```javascript
loadDefaultChannels() {
    this.channels = [
        { number: 1, name: 'My Channel 1', url: 'https://example.com/stream1.m3u8' },
        { number: 2, name: 'My Channel 2', url: 'https://example.com/stream2.m3u8' },
    ];
}
```

### Change Colors

Edit `css/style.css` line ~10:

```css
:root {
    --accent-color: #ff6600;  /* Change orange to something else */
    --primary-color: #1a1a1a; /* Dark background */
}
```

## 🌐 For Local Development

Start a local server:

### Python 3
```bash
python -m http.server 8000
# Open: http://localhost:8000
```

### Python 2
```bash
python -m SimpleHTTPServer 8000
# Open: http://localhost:8000
```

### Node.js
```bash
npm install -g http-server
http-server
# Open: http://localhost:8080
```

## 📺 Keyboard Shortcuts Reference

| Key | Action |
|-----|--------|
| `0-9` | Enter channel number |
| `↑` / `↓` | Previous/next channel |
| `←` / `→` | Volume down/up |
| `Enter` | Confirm selection |
| `C` | Clear input |
| `M` | Toggle mute |
| `B` | Brightness adjustment |
| `Space` | Play/pause |

## 🎮 Button Controls

- **Number Pad**: Direct channel input
- **Arrow Pad**: Navigate and control
- **Media Buttons**: Play/pause/stop
- **Volume Slider**: Adjust audio level
- **Brightness Slider**: Adjust screen brightness
- **Mute Button**: Toggle audio

## 🐛 Troubleshooting

### Nothing appears on screen
- Check browser console (F12)
- Verify index.html file exists
- Try a different browser

### Can't load streams
- Verify stream URLs are correct
- Check they point to valid m3u8 files
- Check your internet connection
- CORS issues? Configure server headers

### Volume controls don't work
- Click the PLAY button first
- Check if muted (check LED indicator)
- Adjust volume slider directly

### Slow performance
- Close browser DevTools
- Reduce number of channels
- Try a lower quality stream

## 📚 Documentation

For more detailed information, see:

- **[USAGE.md](docs/USAGE.md)** - Full user guide
- **[STREAMING_SETUP.md](docs/STREAMING_SETUP.md)** - Setting up streams
- **[DEVELOPMENT.md](docs/DEVELOPMENT.md)** - Developer guide
- **[CONFIGURATION.md](docs/CONFIGURATION.md)** - Advanced configuration

## 🌟 Key Features

✅ 999 customizable channels  
✅ HLS/m3u8 playlist support  
✅ Authentic 2011 cable TV UI  
✅ Keyboard & mouse controls  
✅ Volume & brightness adjustment  
✅ Search/filter channels  
✅ Load local or remote playlists  
✅ Fully responsive design  

## 💡 Tips & Tricks

**Search Channels**: Type in the search box to find channels by name

**Direct Tuning**: Press number keys quickly (1→2→3 = channel 123)

**Auto-submit**: Wait 2 seconds after entering a channel number to auto-tune

**Favorites**: Channels remain selected when you close/reopen

**Debug Mode**: Open console: `window.cableTVApp` to access app directly

## 🔗 Test Streams

These public streams are great for testing:

```
https://test-streams.mux.dev/x36xhzz/x3uyqvf/f1ddemas86d46mapm.m3u8
https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8
```

## 🚢 Ready to Deploy?

### GitHub Pages
```bash
git push origin main:gh-pages
# Access: https://username.github.io/cabletv
```

### Netlify
Drag & drop the folder into Netlify

### Vercel
Connect your GitHub repo

## 📞 Support

- Check the **docs/** folder for detailed guides
- Open browser DevTools (F12) to see errors
- Check GitHub Issues for known problems

## 🎉 You're All Set!

Enjoy your 2011 cable TV experience! Try loading some streams and exploring all the channels.

**Questions?** See the full documentation in the `docs/` folder.
