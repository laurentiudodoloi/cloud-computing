import axios from 'axios'
import { createStore } from 'vuex'

const API_URL = '//127.0.0.1:8081';

export const store = createStore({
    state: {
        wishlist: [],
        itinerary: [],
        user: null
    },

    getters: {
        wishlist: (state) => state.wishlist,
        itinerary: (state) => state.itinerary,
        user: () => {
            const user = localStorage.getItem('user');
            if (!user) {
                return false;
            }

            return JSON.parse(user);
        },
    },
    
    mutations: {
        addToWishlist(state, placeId) {
            const index = state.wishlist.findIndex(e => e === placeId);
            if (index < 0) {
                state.wishlist.push(placeId);
            }
        },

        removeFromWishlist(state, placeId) {
            const index = state.wishlist.findIndex(e => e === placeId);
            if (index >= 0) {
                state.wishlist.splice(index, 1);
            }
        },

        addToItinerary(state, placeId) {
            const index = state.itinerary.findIndex(e => e === placeId);
            if (index < 0) {
                state.itinerary.push(placeId);
            }
        },

        removeFromItinerary(state, placeId) {
            const index = state.itinerary.findIndex(e => e === placeId);
            if (index >= 0) {
                state.itinerary.splice(index, 1);
            }
        },

        clearWishlist(state) {
            state.wishlist = []
        },

        clearItinerary(state) {
            state.itinerary = []
        },

        logout(state) {
            state.user = false;
        }
    },

    actions: {
        storeToItinerary({ commit }, payload) {
            return axios
                .post(`${API_URL}/cart/add`, {
                    user_id: 1,
                    place_id: payload
                })
                .then(() => {
                    commit('addToItinerary', payload);
                })
                .catch(e => {
                    console.error('Error occured', e);
                })
        },

        deleteFromItinerary({ commit }, payload) {
            return axios
                .delete(`${API_URL}/cart/remove`, {
                    data: {
                        user_id: 1,
                        place_id: payload
                    }
                })
                .then(r => {
                    if (r.status === 204) {
                        commit('removeFromItinerary', payload);
                    }
                })
                .catch(e => {
                    console.error('Error occured', e);
                })
        },

        async checkout(state, payload) {
            console.log('CHECKOUT', payload);
        }
    }
})
