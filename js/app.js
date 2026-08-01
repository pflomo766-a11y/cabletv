/**
 * Main Application Module
 * Initializes and manages the cable TV emulator
 */

class CableTVEmulator {
    constructor() {
        this.player = null;
        this.channels = null;
        this.remote = null;
        this.isInitialized = false;
    }

    /**
     * Initialize the application
     */
    init() {
        if (this.isInitialized) return;

        console.log('Initializing Cable TV Emulator...');

        // Initialize modules
        this.player = new window.VideoPlayer();
        this.channels = new window.ChannelManager();
        this.remote = new window.RemoteControl(this);

        // Setup player
        this.player.init();

        // Setup remote control
        this.remote.init();

        // Populate channel list
        this.updateChannelList();

        // Select first channel
        this.selectChannel(1);

        this.isInitialized = true;
        console.log('Cable TV Emulator initialized successfully!');
    }

    /**
     * Update channel list display
     */
    updateChannelList() {
        const channelListEl = document.getElementById('channelList');
        channelListEl.innerHTML = '';

        const channels = this.channels.getFilteredChannels();
        channels.forEach(channel => {
            const channelItem = document.createElement('div');
            channelItem.className = 'channel-item';
            channelItem.innerHTML = `
                <span class="channel-number">${channel.number}</span>
                <span class="channel-title">${channel.name}</span>
            `;

            channelItem.addEventListener('click', () => {
                this.selectChannel(channel.number);
            });

            channelListEl.appendChild(channelItem);
        });
    }

    /**
     * Select a channel by number
     */
    selectChannel(number) {
        const channel = this.channels.setCurrentChannel(number);

        if (!channel) {
            this.player.showError(`Channel ${number} not found`);
            return;
        }

        console.log(`Switching to channel ${channel.number}: ${channel.name}`);

        // Update UI
        this.updateChannelInfo(channel);
        this.updateActiveSidebar(channel.number);

        // Load stream if available
        if (channel.url) {
            this.player.loadStream(channel.url);
            this.player.play();
        } else {
            this.player.showError(`No stream available for ${channel.name}`);
        }
    }

    /**
     * Update channel info display
     */
    updateChannelInfo(channel) {
        document.getElementById('channelNumber').textContent = channel.number;
        document.getElementById('channelName').textContent = channel.name;
        document.getElementById('channelStatus').textContent = channel.url ? 'Online' : 'No Signal';

        const channelInfo = document.getElementById('channelInfo');
        channelInfo.classList.add('visible');

        // Hide after 3 seconds
        setTimeout(() => {
            channelInfo.classList.remove('visible');
        }, 3000);

        // Update sidebar info
        const sidebarInfo = document.getElementById('sidebarChannelInfo');
        sidebarInfo.innerHTML = `
            <p><strong>Number:</strong> ${channel.number}</p>
            <p><strong>Name:</strong> ${channel.name}</p>
            <p><strong>Stream:</strong> ${channel.url ? 'Available' : 'None'}</p>
        `;
    }

    /**
     * Update active channel in sidebar
     */
    updateActiveSidebar(channelNumber) {
        document.querySelectorAll('.channel-item').forEach(item => {
            item.classList.remove('active');
            if (item.querySelector('.channel-number').textContent == channelNumber) {
                item.classList.add('active');
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    /**
     * Next channel
     */
    nextChannel() {
        const channel = this.channels.nextChannel();
        this.selectChannel(channel.number);
    }

    /**
     * Previous channel
     */
    previousChannel() {
        const channel = this.channels.previousChannel();
        this.selectChannel(channel.number);
    }

    /**
     * Play video
     */
    play() {
        this.player.play();
    }

    /**
     * Pause video
     */
    pause() {
        this.player.pause();
    }

    /**
     * Stop video
     */
    stop() {
        this.player.stop();
    }

    /**
     * Toggle play/pause
     */
    togglePlayPause() {
        if (this.player.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    /**
     * Set volume
     */
    setVolume(volume) {
        this.player.setVolume(volume);
        document.getElementById('volumeValue').textContent = `${volume}%`;
    }

    /**
     * Set brightness
     */
    setBrightness(brightness) {
        this.player.setBrightness(brightness);
        document.getElementById('brightnessValue').textContent = `${brightness}%`;
    }

    /**
     * Toggle mute
     */
    toggleMute() {
        const isMuted = this.player.toggleMute();
        const muteBtn = document.getElementById('muteBtn');
        const muteIndicator = document.getElementById('muteIndicator').querySelector('.led-dot');

        if (isMuted) {
            muteBtn.classList.add('mute-on');
            muteIndicator.classList.add('mute-on');
            muteBtn.textContent = '🔇 UNMUTE';
        } else {
            muteBtn.classList.remove('mute-on');
            muteIndicator.classList.remove('mute-on');
            muteBtn.textContent = '🔊 MUTE';
        }
    }

    /**
     * Search channels
     */
    searchChannels(query) {
        this.channels.searchChannels(query);
        this.updateChannelList();
    }

    /**
     * Load playlist from URL or file
     */
    async loadPlaylist() {
        const urlInput = document.getElementById('playlistUrl');
        const fileInput = document.getElementById('playlistFile');

        if (fileInput.files.length > 0) {
            await this.handleFileUpload(fileInput.files[0]);
        } else if (urlInput.value) {
            try {
                await this.channels.loadFromURL(urlInput.value);
                this.updateChannelList();
                console.log('Playlist loaded from URL');
            } catch (error) {
                this.player.showError('Failed to load playlist from URL');
            }
        } else {
            this.player.showError('Please select a file or enter a URL');
        }
    }

    /**
     * Handle file upload
     */
    async handleFileUpload(file) {
        try {
            await this.channels.loadFromFile(file);
            this.updateChannelList();
            console.log('Playlist loaded from file');
            this.player.showError(`Loaded ${this.channels.getChannelCount()} channels`);
        } catch (error) {
            this.player.showError('Failed to load playlist file');
            console.error(error);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new CableTVEmulator();
    app.init();

    // Search functionality
    document.getElementById('searchChannels').addEventListener('input', (e) => {
        app.searchChannels(e.target.value);
    });

    // Make app globally accessible for debugging
    window.cableTVApp = app;
});
