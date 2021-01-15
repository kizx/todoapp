export default {
	state: {
		filterlist: [{
				name: '全部',
				value: 'all'
			},
			{
				name: '已完成',
				value: 'done'
			},
			{
				name: '未完成',
				value: 'todo'
			},
		],
		filterchoose: 'all'
	},
	mutations: {
		changefilter(state, item) {
			state.filterchoose = item
		}
	}
}
