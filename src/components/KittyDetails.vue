<template>
    <transition name="open">
        <div
            id="kitty-details"
            aria-labelledby="ck-modal-title"
            class="ck-modal"
            role="dialog"
        >
            <div
                class="ck-dialog"
                role="document"
            >
                <article class="ck-content">
                    <vue-perfect-scrollbar
                        :settings="scrollSettings"
                        class="scroll-area"
                    >
                        <div class="ck-data">
                            <div class="container-flex">
                                <div class="col-md-3">
                                    <img
                                        :alt="selectedKitty.name"
                                        :src="selectedKitty.avatarUrl"
                                        class="ck-img img-responsive"
                                    >
                                </div>
                                <div class="col-sm-8 col-md-6">
                                    <h3 class="ck-heading">{{ selectedKitty.name }}</h3>
                                    <p class="ck-title">{{ selectedKitty.title }}</p>
                                    <p class="ck-country">{{ filterOptionName('country', selectedKitty.country) }}</p>
                                    <p class="ck-intro">{{ selectedKitty.intro }}</p>
                                </div>
                                <div class="col-sm-4 col-md-3">
                                    <p>Contact {{ selectedKitty.name }}</p>
                                    <ul>
                                        <li
                                            v-for="(link, index) in selectedKitty.links"
                                            :key="index"
                                            class="ck-link"
                                        >
                                            <a :href="link.url">
                                                <span
                                                    :class="linkIconClass(link)"
                                                    class="icon"
                                                />
                                                <span v-if="link.type === 'www'">{{ link.url }}</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <ul>
                                <li
                                    v-for="(colorValue, index) in otherColorValues"
                                    :key="index"
                                    class="ck-color"
                                >
                                    {{ filterOptionName('color', colorValue) }}
                                </li>
                            </ul>
                        </div>
                        <section class="ck-description">
                            <h4 id="ck-modal-title">About {{ selectedKitty.name }}</h4>
                            <div v-html="selectedKitty.description"/>
                        </section>
                        <section class="ck-similar">
                            <h4>People similar to {{ selectedKitty.name }}</h4>
                            <div class="container-flex">
                                <kitty-item
                                    v-for="(similarKitty, index) in similarKitties"
                                    :key="index"
                                    :kitty="similarKitty"
                                    class="col-sm-6 col-md-3"
                                    @click.native="clickSimilarHandler(similarKitty)"
                                />
                            </div>
                        </section>
                    </vue-perfect-scrollbar>
                    <button
                        aria-label="Close"
                        class="ck-close"
                        type="button"
                        @click="closeModal"
                        @keydown.tab="handleTabOnClose"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </article>
            </div>
        </div>
    </transition>
</template>

<script>
import KittyItem from './KittyItem'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
    name: 'KittyDetails',
    components: {
        KittyItem,
        VuePerfectScrollbar
    },
    data () {
        return {
            scrollSettings: {
                maxScrollbarLength: 60,
                suppressScrollX: true
            },
            dialogEl: null,
            focusableEls: null,
            firstFocusableEl: null
        }
    },
    computed: {
        selectedKitty () {
            return this.$store.getters.selectedKitty
        },
        similarKitties () {
            return this.$store.getters.similarKitties
        },
        otherColorValues () {
            return this.selectedKitty.colors.other.filter(color => color !== this.selectedKitty.colors.main)
        }
    },
    mounted () {
        this.setFocus()
    },
    methods: {
        linkIconClass (link) {
            return `icon-${link.type}`
        },
        filterOptionName (type, value) {
            return this.$store.getters.filterOptionName(type, value)
        },
        closeModal () {
            this.$emit('close')
        },
        selectKitty (kitty) {
            this.$store.dispatch('selectKitty', kitty)
        },
        setFocus () {
            this.dialogEl = document.getElementById('kitty-details')
            this.focusableEls = [...this.dialogEl.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]')]
            this.firstFocusableEl = this.focusableEls[0]
            this.dialogEl.focus()
            this.firstFocusableEl.addEventListener('keydown', this.handleTabOnFirstEl)
        },
        handleTabOnFirstEl (e) {
            if (e.keyCode === 9 && e.shiftKey) {
                e.preventDefault()
                document.querySelector('.ck-close').focus()
            }
        },
        handleTabOnClose (e) {
            if (!e.shiftKey) {
                e.preventDefault()
                this.firstFocusableEl.focus()
            }
        },
        clickSimilarHandler (similarKitty) {
            this.selectKitty(similarKitty)
            this.setFocus()
        }
    }
}
</script>

<style lang="scss" scoped>
.ck-modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1040;
    background-color: rgba(0, 0, 0, 0.6);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    opacity: 1;

    &.open-enter-active,
    &.open-leave-active {
        transition: background-color .5s;

        & .ck-dialog {
            transition: transform .5s;
        }
    }

    &.open-enter,
    &.open-leave-to {
        background-color: rgba(0,0,0,0);

        & .ck-dialog {
            transform: translateY(-150%);
        }
    }

    .ck-dialog {
        position: relative;
        width: auto;
        margin: 10px;
        transform: translateY(0);
    }

    .ck-content {
        position: relative;
        background-color: #fff;
        border: 1px solid rgba(0,0,0,.2);
        border-radius: 6px;
        box-shadow: 0 3px 9px rgba(0,0,0,.5);
        background-clip: padding-box;
        outline: 0;
        overflow: hidden;
    }

    .scroll-area {
        position: relative;
        padding: 0;
        width: 100%;
        max-height: calc(100vh - 20px);
    }

    .ck-data {
        padding: 15px 0;
    }

    .ck-close {
        padding: 0;
        cursor: pointer;
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        font-weight: 700;
        line-height: 1;
        color: #000;
        text-shadow: 0 1px 0 #fff;
        opacity: .4;
        float: none;
        position: fixed;
        right: 10px;
        top: 10px;
        z-index: 1;

        &:hover {
            opacity: 1;
        }
    }

    .ck-heading {
        margin: 0;
        line-height: 1.42857143;
    }

    .ck-description {
        position: relative;
        padding: 15px;
    }

    .ck-similar {
        padding: 15px;
        border-top: 1px solid #e5e5e5;
    }
}
</style>
