/**
 * Channel Management Module
 * Handles channel data, m3u8 parsing, and channel selection
 */

class ChannelManager {
    constructor() {
        this.channels = [];
        this.currentChannelIndex = 0;
        this.filteredChannels = [];
        this.maxChannels = 999;
        this.loadDefaultChannels();
    }

    /**
     * Load default US network channels
     */
    loadDefaultChannels() {
        this.channels = [
            { number: 1, name: 'NBC', url: '' },
            { number: 2, name: 'ABC', url: '' },
            { number: 3, name: 'CBS', url: '' },
            { number: 4, name: 'FOX', url: '' },
            { number: 5, name: 'HBO', url: '' },
            { number: 6, name: 'CNN', url: '' },
            { number: 7, name: 'MSNBC', url: '' },
            { number: 8, name: 'ESPN', url: '' },
            { number: 9, name: 'TNT', url: '' },
            { number: 10, name: 'TBS', url: '' },
            { number: 11, name: 'AMC', url: '' },
            { number: 12, name: 'USA Network', url: '' },
            { number: 13, name: 'FX', url: '' },
            { number: 14, name: 'Discovery', url: '' },
            { number: 15, name: 'History Channel', url: '' },
            { number: 16, name: 'Animal Planet', url: '' },
            { number: 17, name: 'National Geographic', url: '' },
            { number: 18, name: 'Food Network', url: '' },
            { number: 19, name: 'Travel Channel', url: '' },
            { number: 20, name: 'HGTV', url: '' },
        ];
        this.filteredChannels = [...this.channels];
    }

    /**
     * Parse m3u8 playlist format
     * @param {string} content - m3u8 file content
     */
    parseM3U8(content) {
        const lines = content.split('\n');
        const parsedChannels = [];
        let channelNumber = this.channels.length + 1;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            if (line.startsWith('#EXTINF:')) {
                // Parse channel info from EXTINF line
                let name = line.substring(line.lastIndexOf(',') + 1).trim() || `Channel ${channelNumber}`;
                const url = lines[i + 1]?.trim();

                if (url && !url.startsWith('#')) {
                    if (channelNumber <= this.maxChannels) {
                        parsedChannels.push({
                            number: channelNumber,
                            name: name,
                            url: url
                        });
                        channelNumber++;
                    }
                }
            }
        }

        return parsedChannels;
    }

    /**
     * Load m3u8 from URL
     * @param {string} url - URL to m3u8 file
     */
    async loadFromURL(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const content = await response.text();
            return this.loadFromM3U8Content(content);
        } catch (error) {
            console.error('Error loading playlist from URL:', error);
            throw error;
        }
    }

    /**
     * Load m3u8 from file
     * @param {File} file - m3u8 file
     */
    async loadFromFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const content = e.target.result;
                    this.loadFromM3U8Content(content);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = () => reject(reader.error);
            reader.readAsText(file);
        });
    }

    /**
     * Load channels from m3u8 content
     * @param {string} content - m3u8 file content
     */
    loadFromM3U8Content(content) {
        const newChannels = this.parseM3U8(content);
        if (newChannels.length > 0) {
            this.channels.push(...newChannels);
            this.filteredChannels = [...this.channels];
            console.log(`Loaded ${newChannels.length} channels from m3u8`);
        }
    }

    /**
     * Get all channels
     */
    getAllChannels() {
        return this.channels;
    }

    /**
     * Get filtered channels
     */
    getFilteredChannels() {
        return this.filteredChannels;
    }

    /**
     * Search channels by name
     * @param {string} query - Search query
     */
    searchChannels(query) {
        if (!query || query.trim() === '') {
            this.filteredChannels = [...this.channels];
        } else {
            const lowerQuery = query.toLowerCase();
            this.filteredChannels = this.channels.filter(ch =>
                ch.name.toLowerCase().includes(lowerQuery) ||
                ch.number.toString().includes(query)
            );
        }
        return this.filteredChannels;
    }

    /**
     * Get channel by number
     * @param {number} number - Channel number
     */
    getChannelByNumber(number) {
        return this.channels.find(ch => ch.number === parseInt(number));
    }

    /**
     * Get current channel
     */
    getCurrentChannel() {
        return this.channels[this.currentChannelIndex] || null;
    }

    /**
     * Set current channel by number
     * @param {number} number - Channel number
     */
    setCurrentChannel(number) {
        const channel = this.getChannelByNumber(number);
        if (channel) {
            this.currentChannelIndex = this.channels.indexOf(channel);
            return channel;
        }
        return null;
    }

    /**
     * Next channel
     */
    nextChannel() {
        this.currentChannelIndex = (this.currentChannelIndex + 1) % this.channels.length;
        return this.getCurrentChannel();
    }

    /**
     * Previous channel
     */
    previousChannel() {
        this.currentChannelIndex = (this.currentChannelIndex - 1 + this.channels.length) % this.channels.length;
        return this.getCurrentChannel();
    }

    /**
     * Get total channel count
     */
    getChannelCount() {
        return this.channels.length;
    }
}

// Export for use in app.js
window.ChannelManager = ChannelManager;
