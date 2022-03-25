import Vue from 'vue'

Vue.directive('close', {
    bind: function (el, { expression }, { context }) {
        el.clickOutside = ({ clientX, clientY }) => {
            var { left, top, width, height } = el.getBoundingClientRect()
            if (!(clientX > left && clientX < left + width && clientY > top && clientY < top + height)) {
                context[expression]()
            
            }
        }
        setTimeout(() => {
            document.addEventListener('click', el.clickOutside)
        }, 0)
    },
    unbind: (el) => {
        document.removeEventListener('click', el.clickOutside)
    }
})