// 接口和类型几乎没有区别
// type 是在 ts 2.7 版本才出现的
// interface 在 ts 出现就存在了
// 如果是自己的业务代码推荐使用type
// 如果是通用的库，考虑到通用型，推荐使用 interface
interface ObjType2 {
	id: number;
	name: string;
}
const obj2: ObjType = {
	id: 1,
	name: 'lee',
};

interface Foo {
	foo: string;
}
class Bar implements Foo {
	foo: string = '';
}
class Baz implements Foo {
	foo: string = '';
}
function abc(a: Foo) {
	a.foo;
}
