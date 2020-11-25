function log(fn: (key: string) => void) {
	return function (target: Function) {
		target.prototype.log = function (key: string) {
			fn(this[key]);
		};
	};
}

// 类装饰器
@log(console.log)
class Foo {
	bar: string = 'bar';
}

const foo = new Foo();
// @ts-ignore
foo.log('bar');

// 方法装饰器
function rec(target: any, name: string, descriptor: any) {
	// 这⾥通过修改descriptor.value扩展了bar⽅法
	const baz = descriptor.value;
	descriptor.value = function (val: string) {
		console.log('run method', name);
		baz.call(this, val);
	};
}
class Foo2 {
	bar!: string;

	@rec
	setBar(val: string) {
		this.bar = val;
	}
}

const foo2 = new Foo2();
foo2.setBar('lalala');

// 属性装饰器
function mua(param: string): any {
	return function (target: any, name: string) {
		target[name] = param;
	};
}

class Foo3 {
	@mua('ns') ns!: string;
}

// 参数装饰器
