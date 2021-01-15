export default {
	state: {
		openid: '',
		date: ''
	},
	mutations: {
		setopenid(store, id) {
			store.openid = id
		},
		setdate(store,date){
			store.date = date
		}		
	}
}
