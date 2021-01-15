'use strict';
exports.main = async (event, context) => {
	const appid = '小程序后台查看'
	const secret = '小程序后台查看'
	const js_code = event.code
	const grant_type = 'authorization_code'
	const url = 'https://api.weixin.qq.com/sns/jscode2session'
	const res = await uniCloud.httpclient.request(url, {
		data: {
			appid,
			secret,
			js_code,
			grant_type
		},
		dataType: 'json'
	})
	return res
};
