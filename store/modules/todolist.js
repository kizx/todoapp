export default {
	state: {
		todolist: []
	},
	mutations: {
		initodo(state, data) {
			state.todolist = data
		},
		addtodo(state, item) {
			state.todolist.push(item)
		},
		deltodo(state, time) {
			for (let index in state.todolist) {
				if (state.todolist[index].time === time) {
					state.todolist.splice(index, 1)
					break
				}
			}
		},
		changestate(state, payload) {
			for (let item of state.todolist) {
				if (item.time === payload.time) {
					item.completed = payload.check
					break
				}
			}
		}
	},
	getters: {
		done: state => {
			return state.todolist.filter(item => item.completed)
		},
		todo: state => {
			return state.todolist.filter(item => !item.completed)
		}
	},
	actions: {
		init(context) {
			uni.showLoading({
				title: '拉取数据中...'
			})
			uniCloud.callFunction({
				name: 'init',
				data: {
					openid: context.rootState.user.openid,
					date:context.rootState.user.date
				}
			}).then((res) => {
				uni.hideLoading()
				if (!res.result.data) {
					context.commit('initodo', [])
				} else {
					context.commit('initodo', res.result.data[0].todolist)
				}
				console.log('init返回：', res.result)
			}).catch((err) => {
				uni.hideLoading()
				uni.showModal({
					content: `查询失败，错误信息为：${err.message}`,
					showCancel: false
				})
				console.error(err)
			})
		},
		addtodo(context, todo) {
			uni.showLoading({
				title: '同步中...'
			})
			context.commit('addtodo', todo)
			uniCloud.callFunction({
				name: 'update',
				data: {
					todolist: context.state.todolist,
					openid: context.rootState.user.openid,
					date:context.rootState.user.date
				}
			}).then((res) => {
				context.dispatch('refresh')
				console.log('addtodo返回', res.result)
				uni.hideLoading()
			}).catch((err) => {
				context.dispatch('refresh')
				uni.hideLoading()
				uni.showModal({
					content: `添加失败，错误信息为：${err.message}`,
					showCancel: false
				})
				console.error(err)
			})
		},
		refresh(context) {
			uniCloud.callFunction({
				name: 'init',
				data:{
					openid:context.rootState.user.openid,
					date:context.rootState.user.date
				}
			}).then((res) => {
				if (!res.result.data) {
					context.commit('initodo', [])
				} else {
					context.commit('initodo', res.result.data[0].todolist)
				}
				// console.log('refresh返回：', res.result)
			}).catch((err) => {
				uni.showModal({
					content: `刷新失败，错误信息为：${err.message}`,
					showCancel: false
				})
				console.error(err)
			})
		},
		deltodo(context, value) {
			uni.showLoading({
				title: '同步中...'
			})
			context.commit('deltodo', value)
			uniCloud.callFunction({
				name: 'update',
				data: {
					todolist: context.state.todolist,
					openid:context.rootState.user.openid,
					date:context.rootState.user.date
				},
			}).then((res) => {
				context.dispatch('refresh')
				uni.hideLoading()
			}).catch((err) => {
				context.dispatch('refresh')
				uni.hideLoading()
				uni.showModal({
					content: `删除失败，错误信息为：${err.message}`,
					showCancel: false
				})
				console.error(err)
			})
		},
		changestate(context, payload) {
			uni.showLoading({
				title: '同步中...'
			})
			context.commit('changestate', payload)
			uniCloud.callFunction({
				name: 'update',
				data: {
					todolist: context.state.todolist,
					openid:context.rootState.user.openid,
					date:context.rootState.user.date
				},
			}).then((res) => {
				// 这里刷新对用户体验较差
				// context.dispatch('refresh')
				uni.hideLoading()
			}).catch((err) => {
				context.dispatch('refresh')
				uni.hideLoading()
				uni.showModal({
					content: `更新失败，错误信息为：${err.message}`,
					showCancel: false
				})
				console.error(err)
			})

		}
	}
}
