'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const id = event.openid
	const collection = db.collection(id)
	const doc = await collection.where({
		date: event.date
	}).get()
	return doc
};
