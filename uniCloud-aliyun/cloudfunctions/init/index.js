'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const id = event.openid
	const collection = db.collection(id) //没有对应的id表自动创建
	const doc = await collection.where({
		date: event.date
	}).get()
	if (!doc.data || doc.data.length === 0) {
		const res = await collection.add({
			date: event.date,
			todolist: []
		})
		return res
	} else {
		return doc
	}
};