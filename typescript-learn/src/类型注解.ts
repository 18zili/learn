// 类型注解
let a1: string;
a1 = '111'; // ok

// 类型推断
let a2 = true;
// a2 = '21'  error

// 类型数组
let arr: string[];
// arr = [11] no
arr = ['12'];

// 任意类型
let varAng: any;
varAng = 1;
varAng = '23';

// 任意类型数组
let anyArr: any[];
anyArr = [1, false, '23'];

// 函数中的类型: 形参 和 返回值
function greet(person: string): string {
	return person + 'hello';
}

// 没有返回值
function warn(): void {}
