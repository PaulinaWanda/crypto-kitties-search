<template>
    <li
        :data-type="criterion.type"
    >
        {{ criterion.name }}
        <button
            class="btn btn-xs"
            @click="removeCriterion"
        >
            <span class="icon icon-cancel"/>
        </button>
    </li>
</template>

<script>
export default {
    name: 'Criterion',
    props: {
        criterion: {
            default: () => {},
            type: Object
        }
    },
    methods: {
        removeCriterion () {
            this.$store.dispatch('removeCriterion', {
                type: this.criterion.type,
                value: this.criterion.value
            })
        }
    }
}
</script>
