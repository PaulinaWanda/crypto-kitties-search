<template>
    <div class="row">
        <div class="col-xs-12">
            <p>Active filters:</p>
            <ul>
                <criterion
                    v-for="(criterion, index) in criteria"
                    v-if="criterion.value"
                    :criterion="criterion"
                    :key="index"
                />
            </ul>
            <button
                class="btn btn-xs"
                @click.stop="removeAllCriteria"
            >
                Clear All
            </button>
        </div>
    </div>
</template>

<script>
import Criterion from './Criterion'

export default {
    name: 'Criteria',
    components: {
        Criterion
    },
    computed: {
        criteria () {
            return this.$store.getters.criteriaInOrder
        }
    },
    methods: {
        removeAllCriteria () {
            this.$store.dispatch('resetFilters')
        }
    }
}
</script>
