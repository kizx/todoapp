<template>
	<view class="content">
		<view class="container">
			<h2>{{date}}</h2>
			<h1>ToDo</h1>
			<TodoAdd />
			<TodoFilter />
			<TodoList />
		</view>
		<BarButton />
	</view>
</template>

<script>
	export default {
		computed:{
			date(){
				return new Date(this.$store.state.user.date).toLocaleDateString()
			}
		},
		onLoad() {
			let self = this
			uni.getStorage({
				key: 'openid',
				success: (res) => {
					this.$store.commit('setopenid', res.data)
					self.$store.commit('setdate', new Date().toDateString())
					self.$store.dispatch('init');
				},
				fail(res) {
					console.log('没有openid', res);
					uni.login({
						provider: 'weixin',
						success: (loginRes) =>{
							uniCloud.callFunction({
								name: 'code2openid',
								data: {
									code: loginRes.code
								}
							}).then((res) => {
								console.log('openid: ', res.result.data.openid);
								uni.setStorageSync('openid', res.result.data.openid);
								self.$store.commit('setopenid', res.result.data.openid);
								self.$store.commit('setdate', new Date().toDateString())
								self.$store.dispatch('init');
							})
						}
					});

				}
			});

		},
		onReady() {
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: '#2c3e50',
			})
		},
		onPullDownRefresh(){
			this.$store.commit('setdate', new Date().toDateString())
			this.$store.dispatch('init')
			uni.stopPullDownRefresh()
		}
	}
</script>

<style>
	.content {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		overflow: hidden;
		padding: 100px 0;
		margin: 0 0;
		text-align: center;
	}

	.container {
		width: 66%;
		max-width: 350px;
		box-shadow: 0 0 20px aliceblue;
		border-radius: 10px;
		padding: 24px 28px 38px;
		background: hsla(0, 0%, 100%, .9);
		margin: 0 10px;
		margin: auto;
	}

	h1 {
		font-size: 28px;
		margin: 20rpx auto;
		font-weight: 500;
	}
	
	h2{
		font-size: 14px;
		text-align: left;
		font-style: italic;
	}
</style>
