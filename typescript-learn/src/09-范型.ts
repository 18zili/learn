// 增加代码通用型

// no
// interface Result1 {
//     ok: 0 | 1;
//     data: Feature1[]
// }
// interface Result2 {
//     ok: 0 | 1;
//     data: Feature2[]
// }

// yes
interface Result<T> {
	ok: 0 | 1;
	data: T;
}

// Result<Feature1[]>
// Result<Feature2[]>

// demo1
// interface Feature {
// 	id: number;
// 	name: string;
// }

// function getList<T>(): T {
// 	return [
// 		{ id: 1, name: 'lee' },
// 		{ id: 2, name: 'cong' },
// 	] as any;
// }
// let features = getList<Feature[]>();

// demo2
interface Feature {
	id: number;
	name: string;
}

function getList<T>(): Promise<T> {
	return Promise.resolve([
		{ id: 1, name: 'lee' },
		{ id: 2, name: 'cong' },
	] as any);
}

async function created1() {
	let features = await getList<Feature[]>();
}

import axios from 'axios';

async function created2() {
	const res = await axios.get<Feature[]>('/api/list');
	let features = res.data;
}
