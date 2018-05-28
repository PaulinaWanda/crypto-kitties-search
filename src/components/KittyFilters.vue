<template>
    <div class="row">
        <template
            v-for="(filter, index) in filters"
        >
            <kitty-filter-input
                v-if="filter.type === 'text'"
                :key="index"
                :filter="filter"
                class="col-sm-4"
            />
            <kitty-filter-select
                v-else
                :key="index"
                :filter="filter"
                class="col-xs-6 col-sm-2"
            />
        </template>
    </div>
</template>

<script>
import KittyFilterInput from './KittyFilterInput'
import KittyFilterSelect from './KittyFilterSelect'

export default {
    name: 'KittyFilters',
    components: {
        KittyFilterInput,
        KittyFilterSelect
    },
    data () {
        return {
            filterText: ''
        }
    },
    computed: {
        filters () {
            return this.$store.getters.filters
        }
    },
    watch: {
        filterText () {
            this.updateTextCriterion()
        }
    },
    methods: {
        updateTextCriterion () {
            this.$store.commit('updateTextCriterion', this.filterText)
        }
    }
}
</script>
