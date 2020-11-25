// 扩展

import axios from 'axios';

declare module 'axios' {
	interface AxiosInstance {
		myConfig: string;
	}
}

// 有提示了
axios.myConfig;
