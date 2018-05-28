<template>
    <section id="crypto-kitties">
        <kitty-filters/>
        <criteria/>
        <kitty-list/>
    </section>
</template>

<script>
import KittyFilters from './components/KittyFilters'
import Criteria from './components/Criteria'
import KittyList from './components/KittyList'

export default {
    name: 'App',
    components: {
        KittyFilters,
        Criteria,
        KittyList
    }
}
</script>
<style lang="scss">
    @import 'styles/container-flex';
    @import 'styles/fontello';

    #crypto-kitties {
        padding: 45px;

        *:focus {
            outline: red 3px solid;
        }
    }
</style>
