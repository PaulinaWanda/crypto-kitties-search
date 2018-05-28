import Vue from 'vue'
import Vuex from 'vuex'

import kitties from './data/kitties.json'
import filters from './data/filters.json'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        kitties: kitties,
        criteria: [],
        criteriaOrder: [
            {type: 'text'},
            {type: 'edition'},
            {type: 'color'},
            {type: 'country'},
            {type: 'gender'}
        ],
        selectedKitty: {},
        similarKitties: [],
        filteredKitties: [],
        filters,
        focusedElBeforeModalOpen: null,
        filterInputIsVisible: false
    },
    getters: {
        kitties: (state) => {
            return state.kitties
        },
        selectedKitty: (state) => {
            return state.selectedKitty
        },
        similarKitties: (state) => {
            // tmp logic...
            const max = state.kitties.length - 4
            const min = 0
            const start = Math.floor(Math.random() * (max - min + 1) + min)

            return state.kitties.slice(start, start + 4)
        },
        filteredKitties: (state) => {
            return state.filteredKitties
        },
        filters: (state) => {
            return state.filters
        },
        criteria: (state) => {
            return state.criteria
        },
        criteriaInOrder: (state) => {
            const criteria = state.criteria
            const criteriaOrder = state.criteriaOrder
            const criteriaOrdered = []

            criteriaOrder.forEach(
                (order) => {
                    criteria.forEach(
                        (criterion) => {
                            if (criterion.type === order.type) {
                                criteriaOrdered.push(criterion)
                            }
                        }
                    )
                }
            )

            return criteriaOrdered
        },
        focusedElBeforeModalOpen: (state) => {
            return state.focusedElBeforeModalOpen
        },
        filterOptionName: (state) => (type, value) => {
            const filterTypeOptions = state.filters.find(filter => filter.type === type).options
            const filterOption = filterTypeOptions.find(filterOption => filterOption.value === value)
            return filterOption.name
        },
        filterInputIsVisible: (state) => {
            return state.filterInputIsVisible
        }
    },
    actions: {
        selectKitty ({commit}, kitty) {
            commit('setSelectedKitty', kitty)
        },
        filterKitties ({state, commit, dispatch}) {
            const kitties = state.kitties
            const criteria = state.criteria

            if (criteria.length !== 0) {
                commit('clearResults')
                let filteredKitties = kitties

                for (const criterion of criteria) {
                    filteredKitties = filteredKitties.filter((kitty) => {
                        switch (criterion.type) {
                            case 'text':
                                const regex = new RegExp(criterion.value, 'i')
                                return regex.test(kitty.name)
                            case 'edition':
                                return kitty.editions.indexOf(criterion.value) !== -1
                            case 'color':
                                return kitty.colors.other.indexOf(criterion.value) !== -1
                            case 'country':
                                return kitty.country === criterion.value
                            case 'gender':
                                return kitty.gender === criterion.value
                        }
                    })
                }

                dispatch('addToFilteredKitties', filteredKitties)
            } else {
                commit('resetResults')
            }
        },
        addToFilteredKitties ({commit}, kitties) {
            commit('addToResults', kitties)
        },
        updateCriteria ({state, commit, dispatch}, newCriterion) {
            let criterion = {}

            if (newCriterion.type !== 'color' || state.criteria.length === 0) {
                criterion = state.criteria.find(criterion => criterion.type === newCriterion.type)
            } else {
                criterion = state.criteria.find(criterion => criterion.type === newCriterion.type && criterion.value === newCriterion.value)
            }

            if (criterion === undefined) {
                commit('addCriterion', newCriterion)
            } else {
                const criterionIndex = state.criteria.findIndex(criterion => criterion.type === newCriterion.type)
                commit('updateCriterion', [newCriterion, criterionIndex])
            }

            if (newCriterion.type === 'text') {
                commit('setFilterInputVisibility', true)
            }

            dispatch('filterKitties')
        },
        removeCriterion ({state, commit, dispatch}, oldCriterion) {
            const criterionIndex = state.criteria.findIndex(criterion => criterion.type === oldCriterion.type && criterion.value === oldCriterion.value)

            if (criterionIndex !== -1) {
                commit('removeCriterion', criterionIndex)
            }

            if (oldCriterion.type === 'text') {
                commit('setFilterInputVisibility', false)
            }

            dispatch('filterKitties')
        },
        resetFilters ({commit}) {
            commit('clearCriteria')
            commit('resetResults')
        },
        setFocusedElBeforeModalOpen ({commit}, targetElement) {
            commit('setFocusedElBeforeModalOpen', targetElement)
        }

    },
    mutations: {
        setSelectedKitty (state, kitty) {
            state.selectedKitty = kitty
        },
        removeCriterion (state, criterionIndex) {
            state.criteria.splice(criterionIndex, 1)
        },
        addCriterion (state, newCriterion) {
            state.criteria.push(newCriterion)
        },
        updateCriterion (state, [newCriterion, criterionIndex]) {
            state.criteria[criterionIndex].name = newCriterion.name
            state.criteria[criterionIndex].type = newCriterion.type
            state.criteria[criterionIndex].value = newCriterion.value
        },
        clearCriteria (state) {
            state.criteria = []
        },
        addToResults (state, kitties) {
            state.filteredKitties = kitties
        },
        clearResults (state) {
            state.filteredKitties = []
        },
        resetResults (state) {
            state.filteredKitties = state.kitties
        },
        setFocusedElBeforeModalOpen (state, targetElement) {
            state.focusedElBeforeModalOpen = targetElement
        },
        setFilterInputVisibility (state, boolean) {
            state.filterInputIsVisible = boolean
        }
    }
})
