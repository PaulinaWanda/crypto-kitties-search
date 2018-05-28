<template>
    <div class="row">
        <div class="col-xs-12">
            <h2>{{ title }}</h2>
            <div class="container-flex">
                <kitty-item
                    v-for="(kitty, index) in kitties"
                    :key="index"
                    :kitty="kitty"
                    class="col-sm-6 col-md-3"
                    @click.native="clickKittyHandler(kitty)"
                />
            </div>
            <kitty-details
                v-if="modalOpened"
                tabindex="0"
                @close="closeModalHandler"
            />
        </div>
    </div>
</template>

<script>
import KittyItem from './KittyItem'
import KittyDetails from './KittyDetails'

export default {
    name: 'KittyList',
    components: {
        KittyItem,
        KittyDetails
    },
    data () {
        return {
            title: 'Results',
            modalOpened: false
        }
    },
    computed: {
        kitties () {
            return this.$store.getters.filteredKitties
        },
        focusedElBeforeModalOpen () {
            return this.$store.getters.focusedElBeforeModalOpen
        }
    },
    watch: {
        modalOpened () {
            this.bodyScrollable()
            document.addEventListener('keyup', this.escapeListener)
        }
    },
    created () {
        this.$store.dispatch('filterKitties')
    },
    methods: {
        selectKitty (kitty) {
            this.$store.dispatch('selectKitty', kitty)
        },
        setFocusedElBeforeModalOpen (targetElement) {
            this.$store.dispatch('setFocusedElBeforeModalOpen', targetElement)
        },
        openModal () {
            this.modalOpened = true
        },
        closeModal () {
            this.modalOpened = false
        },
        clickKittyHandler (kitty) {
            this.setFocusedElBeforeModalOpen(document.activeElement)
            this.selectKitty(kitty)
            this.openModal()
        },
        escapeListener (e) {
            if (e.keyCode === 27) {
                this.closeModalHandler()
                document.removeEventListener('keyup', this.escapeListener)
            }
        },
        resetFocus () {
            const element = this.focusedElBeforeModalOpen
            element.focus()
        },
        closeModalHandler () {
            this.closeModal()
            this.resetFocus()
        },
        bodyScrollable () {
            if (this.modalOpened === true) {
                document.body.classList.add('no-scroll')
            } else {
                document.body.classList.remove('no-scroll')
            }
        }
    }
}
</script>
<style lang="scss">
    body.no-scroll {
        overflow: hidden;
    }
</style>
