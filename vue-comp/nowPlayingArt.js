module.exports = Vue.component('now-playing-art', {
    props: ['coverPath', 'playing'],
    template:
        `<div class="art" v-bind:class="{ playing: playing }" v-on:click="enlarge">
            <img :src="coverPath">
        </div>
    `,
    methods: {
        enlarge() {
            console.log(this);
        }
    }
})