<template>
    <div class="kitty">
        <button class="kitty-btn">
            <img
                :alt="kitty.name"
                :src="kitty.avatarUrl"
                class="kitty-img img-responsive"
            >
            <p class="kitty-color">{{ filterOptionName('color', kitty.colors.main) }}</p>
            <p class="kitty-name">{{ kitty.name }}</p>
            <p class="kitty-intro">{{ kitty.intro }}</p>
        </button>
    </div>
</template>

<script>
export default {
    name: 'KittyItem',
    props: {
        kitty: {
            default: () => {},
            type: Object
        }
    },
    methods: {
        filterOptionName (type, value) {
            return this.$store.getters.filterOptionName(type, value)
        }
    }
}
</script>
<style scoped lang="scss">
    .kitty {
        margin-top: 15px;
        margin-bottom: 15px;

        .kitty-btn {
            width: 100%;
            height: 100%;
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            padding: 30px;
        }

        .kitty-img {
            max-height: 200px;
            width: auto;
            flex: 0 1 auto;
        }

        .kitty-color {
            flex: 0 1 2em;
        }

        .kitty-name {
            flex: 0 0 4em;
        }

        .kitty-intro {
            flex: 1 0 auto;
        }
    }
</style>
