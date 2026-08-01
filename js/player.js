/**
 * HLS Video Player Module
 * Handles HLS streaming with HLS.js
 */

class VideoPlayer {
    constructor() {
        this.video = document.getElementById('videoPlayer');
        this.hls = null;
        this.currentStream = null;
        this.isPlaying = false;
    }

    /**
     * Initialize HLS player
     */
    init() {
        if (Hls.isSupported()) {
            this.hls = new Hls({
                debug: false,
                enableWorker: true,
                lowLatencyMode: true
            });

            this.hls.attachMedia(this.video);

            // Handle HLS events
            this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
                console.log('HLS manifest loaded');
            });

            this.hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                    this.handleError(data);
                }
            });
        } else if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
            // Native HLS support (Safari)
            this.video.src = '';
        }

        // Video event listeners
        this.video.addEventListener('play', () => {
            this.isPlaying = true;
            document.getElementById('powerLed').querySelector('.led-dot').classList.add('power-on');
        });

        this.video.addEventListener('pause', () => {
            this.isPlaying = false;
        });

        this.video.addEventListener('error', (e) => {
            this.handleError(e);
        });
    }

    /**
     * Load a stream URL
     * @param {string} url - HLS stream URL
     */
    loadStream(url) {
        if (!url) {
            this.showError('No stream URL provided');
            return;
        }

        this.currentStream = url;
        this.showLoading(true);

        try {
            if (this.hls) {
                this.hls.loadSource(url);
                this.hls.startLoad();
            } else if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
                this.video.src = url;
                this.video.load();
            } else {
                this.showError('HLS streaming not supported in this browser');
            }
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Play the video
     */
    play() {
        if (this.video.src || this.currentStream) {
            this.video.play().catch(err => {
                console.error('Play error:', err);
            });
        }
    }

    /**
     * Pause the video
     */
    pause() {
        this.video.pause();
    }

    /**
     * Stop the video
     */
    stop() {
        this.video.pause();
        this.video.currentTime = 0;
        if (this.hls) {
            this.hls.stopLoad();
        }
        this.showLoading(false);
    }

    /**
     * Set volume (0-100)
     * @param {number} volume - Volume level
     */
    setVolume(volume) {
        this.video.volume = volume / 100;
    }

    /**
     * Set brightness (0-100)
     * @param {number} brightness - Brightness level
     */
    setBrightness(brightness) {
        this.video.style.filter = `brightness(${brightness}%)`;
    }

    /**
     * Toggle mute
     */
    toggleMute() {
        this.video.muted = !this.video.muted;
        return this.video.muted;
    }

    /**
     * Show/hide loading spinner
     * @param {boolean} show - Show or hide
     */
    showLoading(show) {
        const spinner = document.getElementById('loadingSpinner');
        if (show) {
            spinner.classList.add('active');
        } else {
            spinner.classList.remove('active');
        }
    }

    /**
     * Show error message
     * @param {string} message - Error message
     */
    showError(message) {
        const errorEl = document.getElementById('errorMessage');
        errorEl.textContent = `Error: ${message}`;
        errorEl.classList.add('visible');
        this.showLoading(false);

        setTimeout(() => {
            errorEl.classList.remove('visible');
        }, 5000);
    }

    /**
     * Handle HLS errors
     * @param {object} data - Error data
     */
    handleError(data) {
        let errorMsg = 'Unknown error';

        if (data.type) {
            switch (data.type) {
                case 'networkError':
                    errorMsg = 'Network error - unable to load stream';
                    break;
                case 'mediaError':
                    errorMsg = 'Media error - stream format not supported';
                    break;
                default:
                    errorMsg = `Error: ${data.type}`;
            }
        }

        console.error('HLS Error:', data);
        this.showError(errorMsg);
    }

    /**
     * Destroy player
     */
    destroy() {
        if (this.hls) {
            this.hls.destroy();
        }
    }
}

// Export for use in app.js
window.VideoPlayer = VideoPlayer;
