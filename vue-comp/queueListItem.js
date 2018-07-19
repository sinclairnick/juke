const { playFromQueue } = require('../app-methods/index');

module.exports = Vue.component('queue-list-item', {
    template:
        `<li class="queue-list-item" v-on:dblclick="playFromQueue" v-on:dragstart="drag">
            <div class="track-info">
            <h4>{{track.title || track.name}}</h4>
            <h5>{{track.artists[0]}}</h5>
            </div>
            <div class="delete-from-queue">
                <i v-on:click="removeFromQueue" class="fas fa-times"></i>
            </div>
        </li>`,
    props: ['track', 'index', 'queue'],
    methods: {
        playFromQueue,
        drag() {
            global.juke.dragItem = [];
            global.juke.dragItem.push(this.track);
        },
        removeFromQueue() {
            this.queue.splice(this.index, 1);
        }
    }
})