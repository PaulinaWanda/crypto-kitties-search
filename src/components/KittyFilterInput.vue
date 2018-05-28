<template>
    <div>
        <label
            :for="filter.type"
            class="sr-only"
        >
            {{ filter.label }}
        </label>
        <input
            :id="filter.type"
            v-model="text"
            class="form-control"
            type="text"
        >
    </div>
</template>

<script>
export default {
    name: 'KittyFilterInput',
    props: {
        filter: {
            default: () => {},
            type: Object
        }
    },
    data () {
        return {
            text: ''
        }
    },
    computed: {
        filterInputIsVisible () {
            return this.$store.getters.filterInputIsVisible
        }
    },
    watch: {
        text () {
            this.updateCriteria()
        },
        filterInputIsVisible (val) {
            if (val === false) {
                this.text = ''
            }
        }
    },
    methods: {
        updateCriteria () {
            this.$store.dispatch('updateCriteria', {
                type: 'text',
                value: this.text,
                name: this.text
            })
        }
    }
}
</script>
