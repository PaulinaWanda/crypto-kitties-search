<template>
    <div>
        <label
            :for="filter.type"
            class="sr-only"
        >
            {{ filter.label }}
        </label>
        <select
            :id="filter.type"
            v-model="selectedOption"
            class="form-control"
        >
            <option
                v-for="(option, index) in filter.options"
                :key="index"
                :value="option.value"
            >
                {{ option.name }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'KittyFilterSelect',
    props: {
        filter: {
            default: () => {},
            type: Object
        }
    },
    data () {
        return {
            selectedOption: ''
        }
    },
    computed: {
        selectedFilter () {
            const filterOption = this.filter.options.find(
                (option) => option.value === this.selectedOption
            )

            return {
                type: this.filter.type,
                name: filterOption.name,
                value: filterOption.value
            }
        }
    },
    watch: {
        selectedOption () {
            if (this.selectedOption !== '') {
                this.updateCriteria()
            }

            this.selectedOption = ''
        }
    },
    methods: {
        updateCriteria () {
            this.$store.dispatch('updateCriteria', this.selectedFilter)
        }
    }
}
</script>
