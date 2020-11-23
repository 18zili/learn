export default function({ $axios, store }) {
	$axios.onRequest((config) => {
		const token = store.state.user.token;
		if (token) {
			config.headers.Authorization = 'Bearer' + token;
		}
		return config;
	});
}
