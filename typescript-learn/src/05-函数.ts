// 必填参
// 可选参
// 默认值
function greeing(
	person: string,
	msg: string = 'hello',
	deft: string = '11'
): string {
	return '...' + msg + deft;
}

greeing('lee');

// 重载：以参数的数量和返回值的类型，区分多个同名函数
// 为了代码提示
function watch(cb1: () => void): void;
function watch(cb1: () => void, cb2: (v1: any, v2: any) => void): void;

// 实现
function watch(cb1: () => void, cb2?: (v1: any, v2: any) => void): void {
	if (cb1 && cb2) {
		//
	} else {
		//
	}
}
