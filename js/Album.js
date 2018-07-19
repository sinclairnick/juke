const path = require('path');

module.exports = class Album {

    constructor(name, link) {
        this.linkName = name;
        this.link = link || null;
        this.health = null;
        this.seeds = null;
        this.artist = null;
        this.songs = [];
        this.cover = null;
        this.year = null;
        this.metadata = false;
        this.flac = false;
    }

    addSong(fileName, torrentIndex) {

        //extract file type
        let type = path.extname(fileName);

        if (type === '.flac') {
            this.flac = true;
        }

        //remove extension for display purposes
        fileName = fileName.replace(type, '');

        this.songs.push({
            fileName,
            torrentIndex,
            type,
            link: this.link,
            title: null,
            track: null,
            durationPretty: null,
            duration: null,
            artists: null,
            cover: null,
            metadata: false
        });

    }

}