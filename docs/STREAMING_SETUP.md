# Streaming Setup Guide

## HLS Stream Configuration

This emulator uses HLS.js to stream video content via m3u8 playlists. Here's how to set up your streams.

## Creating HLS Streams

### Option 1: Using FFmpeg

Convert your media to HLS format:

```bash
ffmpeg -i input.mp4 \
  -c:v libx264 -preset medium \
  -b:v 2500k -maxrate 2500k -bufsize 5000k \
  -c:a aac -b:a 128k \
  -f hls -hls_time 10 -hls_list_size 0 \
  output.m3u8
```

### Option 2: Using Handbrake

1. Open Handbrake
2. Select your source video
3. Choose "Apple HLS 1080p30" preset
4. Export with `.m3u8` extension

### Option 3: Professional CDN

Use services like:
- **HLS.io** - Professional HLS hosting
- **Wowza** - Streaming engine
- **Mux** - Video API
- **AWS Elemental** - AWS streaming solution

## Playlist Structure

### Simple Playlist (Single Bitrate)

```m3u8
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:10
#EXT-X-MEDIA-SEQUENCE:0
#EXTINF:10.0,
segment-0.ts
#EXTINF:10.0,
segment-1.ts
#EXT-X-ENDLIST
```

### Master Playlist (Multiple Bitrates)

```m3u8
#EXTM3U
#EXT-X-STREAM-INF:BANDWIDTH=5000000,RESOLUTION=1920x1080
high.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=2500000,RESOLUTION=1280x720
middle.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=1000000,RESOLUTION=854x480
low.m3u8
```

## Stream URLs for Testing

Use these public test streams:

```
https://test-streams.mux.dev/x36xhzz/x3uyqvf/f1ddemas86d46mapm.m3u8
https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8
https://mnmedias.api.telstra.com/mnwork/od/CMS20210917105857987SPF/01.m3u8
```

## CORS Configuration

If streams are from a different domain, configure CORS headers:

### Nginx

```nginx
add_header Access-Control-Allow-Origin *;
add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
add_header Access-Control-Allow-Headers "Origin, Content-Type";
```

### Apache

```apache
Header set Access-Control-Allow-Origin "*"
Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
Header set Access-Control-Allow-Headers "Origin, Content-Type"
```

### Node.js / Express

```javascript
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
```

## Local Testing

### Using Python

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open: `http://localhost:8000`

### Using Node.js

```bash
npm install -g http-server
http-server
```

### Using Live Server (VS Code)

1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

## Stream Quality Settings

### Recommended Bitrates

| Resolution | Bitrate | Use Case |
|------------|---------|----------|
| 480p | 1-2 Mbps | Mobile/Low bandwidth |
| 720p | 2.5-5 Mbps | Standard quality |
| 1080p | 5-8 Mbps | High quality |
| 4K | 15-25 Mbps | Ultra HD |

### Segment Configuration

```
Segment Duration: 10-12 seconds
Target Duration: 12-15 seconds
Playlist Size: 3-5 segments (30-60 seconds buffer)
```

## Debugging

### Enable Debug Mode

Edit `js/player.js`:

```javascript
this.hls = new Hls({
    debug: true,  // Set to true
    enableWorker: true,
    lowLatencyMode: true
});
```

### Check Browser Console

Open DevTools (F12) and check:
- Network tab: Request/response headers
- Console: HLS.js debug messages
- Application > Storage: CORS issues

### Common Issues

**Issue**: "Failed to load segment"
- Solution: Check segment URLs are correct and accessible

**Issue**: "CORS error"
- Solution: Configure CORS headers on streaming server

**Issue**: "Stalled at loading manifest"
- Solution: Verify playlist URL is correct and accessible

## Performance Optimization

1. **Enable Low Latency Mode**
   - Already configured in player.js
   - Reduces latency to 2-3 seconds

2. **Use CDN**
   - Distribute content globally
   - Improves load times

3. **Adaptive Bitrate**
   - HLS.js automatically switches quality
   - Monitor network conditions

4. **Segment Optimization**
   - Keep segments 10-15 seconds
   - Reduces buffering issues
