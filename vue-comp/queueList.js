require('./queueListItem');
const draggable = require('vuedraggable');
const crypto = require('crypto');
const _ = require('lodash');

module.exports = Vue.component('queue-list', {
    template:
        `<div class="queue-list">
            <div class="header">
                <div v-if="shuff" class="shuffle"><i class="fas fa-random" v-on:click="shuffle"></i></div>
                <div v-else></div>
                <div class="clear-queue"><p v-on:click="clear">clear</p></div>
            </div>
            <hr>
            <ul>
            <draggable :options="{ draggable: '.queue-list-item'}">
                <queue-list-item v-for="(track, index) in queue"
                :track="track"
                :queue="queue"
                :index="index"
                :key="key()"></queue-list-item>
            </draggable>
            </ul>
        </div>`,
    props: ['queue', 'track', 'shuff'],
    methods: {
        clear() {
            if (global.juke.showQueue) {
                global.juke.queue = [];
            }
            else if (global.juke.showHistory) {
                global.juke.history = [];
            }
        },
        key() {
            return crypto.randomBytes(16).toString('hex');
        },
        shuffle() {
            if (global.juke.queue) {
                global.juke.queue = _.shuffle(global.juke.queue);
            }
        }
    },
    components: {
        draggable
    }
})