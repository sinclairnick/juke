module.exports = Vue.component('next-track', {
    template:
        `<div>
            <h5>{{title}}</h5>
            <h6>{{artist}}</h6>
        </div>`,
    props: ['title', 'artist']
})