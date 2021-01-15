import Vue from 'vue'
import Vuex from 'vuex'
import todo from './modules/todolist.js'
import filter from './modules/filter.js'
import user from './modules/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: true,
	modules:{
		todo,
		filter,
		user
	}
})
