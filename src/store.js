import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { firebase as config } from './config'
import {
  SET_USER,
  SET_PLAYERS,
  SET_ACTIVITIES,
  SET_IS_SHOWN_ME
} from './action-types'

firebase.initializeApp(config)

const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })

Vue.use(Vuex)

const timestampToStr = function (timestamp) {
  if (!timestamp) return ''
  var d = new Date(timestamp)
  return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes()
}

export default new Vuex.Store({
  state: {
    user: null,
    isLoaded: false,
    isShownMe: false,
    players: null,
    activities: null
  },
  getters: {
    sortedByAmountPlayers: state => {
      const players = Object
        .keys(state.players)
        .map(key => state.players[key])
        .sort((a, b) => b.amount - a.amount)
      return players
    },
    timelineActivites: state => {
      const activities = state.activities.map(activity => {
        const player = state.players[activity.authorId]

        const icon = player ? player.icon : null
        const displayName = player ? player.displayName : null

        return Object.assign({
          playerIcon: icon,
          playerDisplayName: displayName
        }, activity)
      })

      return activities
    }
  },
  mutations: {
    [SET_IS_SHOWN_ME] (state, isShownMe) {
      state.isShownMe = isShownMe
    },
    [SET_USER] (state, user) {
      state.isLoaded = true
      state.user = user
    },
    [SET_PLAYERS] (state, players) {
      state.players = players
    },
    [SET_ACTIVITIES] (state, activities) {
      state.activities = activities
    }
  },
  actions: {
    setIsShownMe ({ commit }, isShownMe) {
      commit(SET_IS_SHOWN_ME, isShownMe)
    },
    async fetchUser ({ commit }) {
      return firebase.auth().onAuthStateChanged((user) => {
        commit(SET_USER, user)
      })
    },
    async fetchPlayers ({ commit }) {
      return db.collection('players').onSnapshot((snapshot) => {
        var players = {}
        snapshot.forEach((doc) => {
          var data = doc.data()
          players[data.author_id] = {
            id: doc.id,
            authorId: data.author_id,
            displayName: data.display_name,
            icon: data.icon,
            position: data.position,
            amount: data.amount,
            currency: data.currency
          }
        })
        commit(SET_PLAYERS, players)
      })
    },
    async fetchActivities ({ commit }) {
      db.collection('activities').orderBy('created_at', 'desc').limit(30).onSnapshot((snapshot) => {
        var activities = []

        snapshot.docs.forEach((doc) => {
          var data = doc.data()
          activities.push({
            id: doc.id,
            authorId: data.author_id,
            createdAt: timestampToStr(data.created_at),
            content: data.content
          })
        })

        commit(SET_ACTIVITIES, activities)
      })
    },
    async signUp ({ commit }, { email, password }) {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
    },
    async signIn ({ commit }, { email, password }) {
      return firebase.auth().signInWithEmailAndPassword(email, password)
    },
    async signOut () {
      return firebase.auth().signOut()
    },
    async createPlayer ({ commit }, { authorId, displayName, icon, amount, currency, position }) {
      return db.collection('players').add({
        author_id: authorId,
        display_name: displayName,
        icon,
        amount,
        currency,
        position
      })
    },
    async updateProfile ({ commit }, { id, displayName, icon }) {
      return db.collection('players').doc(id).update({
        display_name: displayName,
        icon
      })
    },
    async updateStatus ({ commit }, { id, amount, position, currency }) {
      amount = +amount
      if (amount.isNaN) amount = 0

      return db.collection('players').doc(id).update({
        amount,
        position,
        currency,
        updated_at: new Date().getTime()
      })
    },
    async createActivity ({ commit }, { authorId, content }) {
      return db.collection('activities').add({
        author_id: authorId,
        content: content,
        created_at: new Date().getTime()
      })
    }
  }
})
