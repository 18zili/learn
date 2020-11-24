// !是赋值断言，表示该属性一定会被赋值，编译器不用警告
// 类型需要更具体时使用 as 断言
let e: KeyboardEvent;
let inp = e!.target as HTMLInputElement;
