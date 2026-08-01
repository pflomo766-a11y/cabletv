/**
 * Remote Control Module
 * Handles keyboard and button inputs
 */

class RemoteControl {
    constructor(app) {
        this.app = app;
        this.channelInput = '';
        this.inputTimeout = null;
    }

    /**
     * Initialize remote control
     */
    init() {
        this.attachKeyboardListeners();
        this.attachButtonListeners();
    }

    /**
     * Attach keyboard event listeners
     */
    attachKeyboardListeners() {
        document.addEventListener('keydown', (e) => {
            this.handleKeyDown(e);
        });
    }

    /**
     * Handle keyboard input
     */
    handleKeyDown(e) {
        const key = e.key.toLowerCase();

        // Number keys (0-9)
        if (/^[0-9]$/.test(key)) {
            e.preventDefault();
            this.handleNumberInput(key);
        }
        // Arrow keys
        else if (key === 'arrowup') {
            e.preventDefault();
            this.app.previousChannel();
        }
        else if (key === 'arrowdown') {
            e.preventDefault();
            this.app.nextChannel();
        }
        else if (key === 'arrowleft') {
            e.preventDefault();
            this.handleVolumeDown();
        }
        else if (key === 'arrowright') {
            e.preventDefault();
            this.handleVolumeUp();
        }
        // Control keys
        else if (key === 'enter') {
            e.preventDefault();
            this.submitChannelInput();
        }
        else if (key === 'backspace' || key === 'c') {
            e.preventDefault();
            this.clearChannelInput();
        }
        else if (key === 'm') {
            e.preventDefault();
            this.app.toggleMute();
        }
        else if (key === 'b') {
            e.preventDefault();
            this.showBrightnessControl();
        }
        else if (key === ' ') {
            e.preventDefault();
            this.app.togglePlayPause();
        }
    }

    /**
     * Handle number pad input
     */
    handleNumberInput(num) {
        this.channelInput += num;
        this.updateInputDisplay();

        // Clear input after 2 seconds of inactivity
        clearTimeout(this.inputTimeout);
        this.inputTimeout = setTimeout(() => {
            this.submitChannelInput();
        }, 2000);
    }

    /**
     * Update input display
     */
    updateInputDisplay() {
        const channelNumber = document.getElementById('channelNumber');
        channelNumber.textContent = this.channelInput || '---';
    }

    /**
     * Submit channel input
     */
    submitChannelInput() {
        if (this.channelInput) {
            const channelNum = parseInt(this.channelInput);
            this.app.selectChannel(channelNum);
        }
        this.clearChannelInput();
    }

    /**
     * Clear channel input
     */
    clearChannelInput() {
        this.channelInput = '';
        this.updateInputDisplay();
        clearTimeout(this.inputTimeout);
    }

    /**
     * Handle volume up
     */
    handleVolumeUp() {
        const volumeSlider = document.getElementById('volumeSlider');
        let newVolume = parseInt(volumeSlider.value) + 5;
        newVolume = Math.min(100, newVolume);
        volumeSlider.value = newVolume;
        this.app.setVolume(newVolume);
    }

    /**
     * Handle volume down
     */
    handleVolumeDown() {
        const volumeSlider = document.getElementById('volumeSlider');
        let newVolume = parseInt(volumeSlider.value) - 5;
        newVolume = Math.max(0, newVolume);
        volumeSlider.value = newVolume;
        this.app.setVolume(newVolume);
    }

    /**
     * Show brightness control (placeholder)
     */
    showBrightnessControl() {
        console.log('Brightness control activated - use slider');
    }

    /**
     * Attach button event listeners
     */
    attachButtonListeners() {
        // Number buttons
        document.querySelectorAll('.num-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const channel = btn.getAttribute('data-channel');
                if (channel === '0' || /^[0-9]$/.test(channel)) {
                    this.handleNumberInput(channel);
                }
            });
        });

        // Clear button
        document.getElementById('clearBtn').addEventListener('click', () => {
            this.clearChannelInput();
        });

        // Enter button
        document.getElementById('enterBtn').addEventListener('click', () => {
            this.submitChannelInput();
        });

        // Arrow buttons
        document.getElementById('upBtn').addEventListener('click', () => {
            this.app.previousChannel();
        });

        document.getElementById('downBtn').addEventListener('click', () => {
            this.app.nextChannel();
        });

        document.getElementById('leftBtn').addEventListener('click', () => {
            this.handleVolumeDown();
        });

        document.getElementById('rightBtn').addEventListener('click', () => {
            this.handleVolumeUp();
        });

        document.getElementById('selectBtn').addEventListener('click', () => {
            this.submitChannelInput();
        });

        // Media buttons
        document.getElementById('playBtn').addEventListener('click', () => {
            this.app.play();
        });

        document.getElementById('pauseBtn').addEventListener('click', () => {
            this.app.pause();
        });

        document.getElementById('stopBtn').addEventListener('click', () => {
            this.app.stop();
        });

        // Volume control
        document.getElementById('volumeSlider').addEventListener('change', (e) => {
            this.app.setVolume(parseInt(e.target.value));
        });

        // Brightness control
        document.getElementById('brightnessSlider').addEventListener('change', (e) => {
            this.app.setBrightness(parseInt(e.target.value));
        });

        // Mute button
        document.getElementById('muteBtn').addEventListener('click', () => {
            this.app.toggleMute();
        });

        // Playlist loading
        document.getElementById('loadPlaylistBtn').addEventListener('click', () => {
            this.app.loadPlaylist();
        });

        // File upload
        document.getElementById('playlistFile').addEventListener('change', (e) => {
            this.app.handleFileUpload(e.target.files[0]);
        });
    }
}

// Export for use in app.js
window.RemoteControl = RemoteControl;
