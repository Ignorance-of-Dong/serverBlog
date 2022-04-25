---
title: TypeScript 基础
date: "4/25/2022 4:28:16 PM "
tag: ["TypeScript", "ts"]
meta:
  - name: description
    content: null
  - name: keywords
    content: null
---
# TypeScript 基础

## TS 与 JS 的区别

### 定义
> TypeScript 是一种由微软开发的自由和开源的编程语言，他是JavaScript的一个超集，而且本质上向这个语言添加了可选的静态类和基于类的面向对象编程


TypeScript | JavaScript |
:---:|:---:
JavaScript的超集，用于解决大型项目的代码复杂性 | 一种脚本语言，用于创建动态网页
强类型，支持静态和动态类型 | 动态弱语言类型
可以在编译的时候发现并纠正错误 | 只能在编译完成后发现错误（运行时）
不允许改变变量的数据类型 | 变量可以被赋值任意类型的值

## 基础类型

### boolean

```typescript
let bool: boolean = true;
```

### string

```typescript
let str: string = "hello";
```

### number

```typescript
let num: number = 1;
```

### undefined

```typescript
let variable: undefined = undefined;
```

### null

```typescript
let object: null = null;
```

> - `undefined` 和 `null` 是所有类型的字类型，可以把`undefined` `null` 赋值给任意的其他基础类型
> - **但是如果在`tsconfig.json`指定`strictNullChecks`的话,则只能赋值给void以及他们自身，不然就会报错**

```typescript
let num: number = null;
let str: string = undefined;
```

### any

```typescript
let str: any = "hello";
let num: any = 11;
let bool: any = true;
bool = "hello";
str = 11;
bool = 22
```

> any类型可以赋值给任意类型

### unknown

```typescript
let num: unknown;
// 配合断言使用  不写as断言的话，报错：运算符“+”不能应用于类型“unknown”和“10”。
num = (num as number) + 10;
```

### void

```typescript
function callback(): void {
    let a;
    a = 1
}
```
> 用来表示没返回任何类型

### never

```typescript
function callback(): never {
    throw new Error("this is a error")
}
```
> never表示永远不存在值的类型

### 数组类型

```typescript
let arr: number[] = [11, 122];
let arr1: Array<number> = [11, 122];
```

### 元组类型

```typescript
let tuple: [number, string] = [11, "122"];
```
> 元组Tuple表示一个已知（数量，类型）数组元素

### 函数类型

```typescript
// 定义函数类型需要定 参数类型 和 输出类型
function add(x: number, y: number): number {
    return x + y
}

// 函数没有返回值的时候，返回void
function handle(): void {
    console.log("log")
}

// 可选参数，参数后加问号，可选参数在函数入参的最后
function add(x: number, y?: number): number {
    return y ? x + y : x 
}

// 默认参数 与js一样在参数上直接赋值
function add(x: number, y: number = 10): number {
    return x + y
}
```

### 函数重载

```typescript
function add(x: number): number;
function add(x: string): string;
function add(x: any): number | string {
  return x;
}
add(1);
add("1")

add(true); // 报错
// 没有与此调用匹配的重载。
//   第 1 个重载(共 2 个)，“(x: number): number”，出现以下错误。
//     类型“boolean”的参数不能赋给类型“number”的参数。
//   第 2 个重载(共 2 个)，“(x: string): string”，出现以下错误。
//     类型“boolean”的参数不能赋给类型“string”的参数。
```
> 实现函数重载，需要多次声明这个函数，前几次是函数定义，列出所有情况，最后一次是啊函数实现，函数实现是需要定义包含以上重载的类型

## interface

### root
> interface (接口) 是用来定义对象类型的，可以对对象类型进行描述，定义时一般字母大写
```typescript
interface Person {
  name: string;
  age: number;
}

let user: Person = {
  name: "111",
  age: 22
};
```

### 可选属性

```typescript
interface Person {
  name: string;
  age?: number;
}

let user: Person = {
  name: "111"
};
```
> 和函数的可选参数类似，在属性上加？，就代表这个属性是可选的

### 只读属性

```typescript
interface Person {
  readonly name: string;
  age?: number;
}

let user: Person = {
  name: "111"
};

user.name = "22" // Error: 无法分配到 "name" ，因为它是只读属性。
```
> 只读属性：只可以读取不可以修改，修改时会报错

### 描述函数类型

```typescript
interface Func {
    (x: number, y: number): number
}
let adds: Func = function (x,y) {
    return x + y
}
```

### 自定义函数类型

```typescript
interface Params {
    [propName: string]: string
}
let callback = function (obj: Params) {
    return ""
}

callback({
    a: "hello",
    b: "line"
})
```
> 当属性上的类型定义完全一样的话，同时不确定有多少属性的时候使用

## 类

> ts 通过`public, private, protected` 三个修饰符来增强js中的类

### 基本写法

```typescript
class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    speak() {
        console.log(this.name);
    }
}

const p1 = new Person("lilei");
p1.speak();
```

### Public

```typescript
class Person {
    public name: string;
    constructor(name: string) {
        this.name = name;
    }
    public speak() {
        console.log(this.name);
    }
}

const p1 = new Person("lilei");
p1.speak();
```
> public 公有的，一个类里面默认所有方法属性都是public（可写可不写）

### private

```typescript
class Person {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  speak() {
    console.log(this.name);
  }
}

const p1 = new Person("lilei");
p1.speak();
p1.name; // 报错： 属性“name”为私有属性，只能在类“Person”中访问。

///////////////////////////

class Person1 extends Person {
    constructor(name:  string) {
        super(name);
        console.log(this.name); // 报错： 属性“name”为私有属性，只能在类“Person”中访问。
    }
}
```
> private 私有的，只属于类自己，他的实例和继承他的子类都访问不到

### protected

```typescript
class Person {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  speak() {
    console.log(this.name);
  }
}

const p1 = new Person("lilei");
p1.speak();
p1.name; // 报错： 属性“name”受保护，只能在类“Person”及其子类中访问。

///////////////////////////

class Person1 extends Person {
    constructor(name:  string) {
        super(name);
        console.log(this.name); // 可以访问
    }
}
```
> protected代表是受保护的，继承他的子类可以访问到

### static

```typescript
class Person {
  static surname = "张";
  public nickName: string;
  constructor(name: string) {
    this.nickName = name;
  }
  public speak() {
    console.log(Person.surname + this.nickName);
  }
}

const p1 = new Person("li lei");
p1.speak();
p1.surname // 报错
// 属性“surname”在类型“Person”上不存在。你的意思是改为访问静态成员“Person.surname”吗?
```
> static 是静态属性，类上的常量，实例不能访问

### 抽象类

> 抽象类不能被实例化，只能被继承【抽象类中的方法必须被子类实现】抽象类使用`abstract`关键字来定义

**抽象类不能被实例化**

```typescript
abstract class Animal {}
new Animal() // 报错：无法创建抽象类的实例。
```

**抽象类中的抽象方法必须被子类实现**

```typescript
abstract class Department {
  abstract printMeeting(): void; // 这个方法必须在派生类中实现
}

class AccountingDepartment extends Department {
  printMeeting(): void {} // 如果不实现该方法则会报错
  //非抽象类“AccountingDepartment”不会实现继承自“Department”类的抽象成员“printMeeting”。
}
```
> - 通俗来说抽象类是用来定义一个基类，声明共有的属性和方法。目的是为了被继承
> - 好处是可以抽离出事物的共性，有利于提高代码的复用率

## interface 与 class

> interface 是用来定义对象类型的，对对象进行描述，但是他也可以对class进行约束。需要使用到`implements`关键字

### implements

> implements 是实现的意思，class实现interface

```typescript
interface ClockInterface {
  currentTime: Date;
}

// 定义了约束后，需要满足接口上的所有条件
class Clock implements ClockInterface {
  currentTime: Date; // 不实现该变量则会报错： 如下
  // 类“Clock”错误实现接口“ClockInterface”。
  // 类型 "Clock" 中缺少属性 "currentTime"，但类型 "ClockInterface" 中需要该属性。
  constructor() {}
}
```

### 处理公共的属性和方法

```typescript
interface MusicInterface {
  playMusic(): void;
}

class Phone implements MusicInterface {
  playMusic(): void {
    // ..
  }
}

class Ipad implements MusicInterface {
  playMusic(): void {
    // ...
  }
}

// 多约束写法
interface MusicInterface {
  playMusic(): void;
}
interface EmailInterface {
  sendEmail(): void
}

class Phone implements MusicInterface, EmailInterface {
  playMusic(): void {
    // ..
  }
  sendEmail(): void {
    // ..
  }
}

```

### 约束构造结构和静态属性

> 使用implements 只能约束实例上的属性和方法，要想约束构造函数和静态属性需要给class定义一个变量

```typescript
interface ParamsInterface {
    new(name: string): void
    nickName: string
}

let Person2: ParamsInterface = class Person2 {
    static nickName:string;
    constructor(name: string) {

    }
}
```

## 枚举（Enum）

### 数字枚举

```typescript
enum Week {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday
}
// 如上定义了一个数字枚举 Monday 初始值为0 ，其他值进行自增
console.log(Week[0])      // Monday
console.log(Week[1])      // Tuesday
console.log(Week[2])      // Wednesday
console.log(Week[3])      // Thursday

// 也可以设定默认值。
enum Week {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday
}
// 这样就会从 1 开始递增（从初始值开始递增）
console.log(Week[1])      // Monday
console.log(Week[2])      // Tuesday
console.log(Week[3])      // Wednesday
console.log(Week[4])      // Thursday
```

### 字符串枚举

> 字符串枚举：在每一个字符串枚举中，每个成员都必须用字符串的字面量（初始化）


```typescript
// 多用于映射
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
```

### 反相映射

> 数字枚举具有反射映射特性，从枚举值到枚举值枚举名字

```typescript
enum Enum {
    A
}
let a = Enum.A; // 0
let nameOfA = Enum[a]; //Enum[0]  =  "A"
```

> 枚举的意义在于可以定义一些名字的常量集合，可以更清晰的调试和理解
> 多用于定义一些状态值（提高代码的阅读性）

## 高级类型

### 联合类型

> 如果希望一个变量可以支持多种类型（例如：一个变量可以支持number 又可以支持string）

```typescript
let num: string | number;
num = 8;
num = "str"
```
> 联合类型只能访问他们身上的公有属性

```typescript
let num: string | number;
num.length // 报错
// 类型“string | number”上不存在属性“length”。
// 类型“number”上不存在属性“length”。
```

### 交叉类型

> 如果想要对对象进行扩展可以使用交叉类型 `&`

```typescript
// 比如 Person 有 name 和 age 的属性，而 Student 在 name 和 age 的基础上还有 grade 属性，就可以这么写，
interface Person {
    name: string
    age: number
}

type Student = Person & { grade: number } // 类似于extend

```
### 类型别名 （type）

> 类型别名会给类型起一个新的名字，可以作用于原始值，联合类型，元组以及其他需要手写的类型

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}
```

### interface 和 type 的区别

- 相同点： 
    - 都可以定义一个对象和函数
    - 都可以允许继承

- 不同点：
    - interface是用来专门定义对象类型的，对对象类型进行藐视
    - type 是类型别名，可以声明任何类型，interface 不行（只能声明对象和函数）
    - interface 可以合并重复声明，type 不行

```typescript
interface Person {
    name: string
}
// 重复声明 interface，就合并了
interface Person {
    age: number
}
const person: Person = {
    name: 'lin',
    age: 18
}


// 使用type 就报错了
type Person = {
    name: string
}
// 报错：标识符“Person”重复。
type Person = {
    age: number
}
// 报错：对象文字可以只指定已知属性，并且“name”不在类型“Person”中。
const person: Person = {
    name: 'lin',
    age: 18
}
```

### 类型断言

> 对于一些ts无法识别的类型同时开发者清楚这些变量的类型，就是可以使用，语法：`值 as 类型`

```typescript
function getLength(arg: number | string): number {
    const str = arg as string // 先断言为字符串
    if (str.length) { // 如果有length属性，则输出 
        return str.length
    } else {
        // 如果没有length 属性 则断言为 number类型
        const number = arg as number
        // 转为字符串输出length
        return number.toString().length
    }
}
```

> **注意⚠️：类型断言不是类型转换，把一个类型断言成联合类型不存在的类型就会报错**

### 字面量类型
```typescript
type Size = "mini" | "small" | "large";

// 如果乱取值就会报错：不能将类型“"normal"”分配给类型“Size”。
let size:Size = "normal"
```

## 泛型

> 使用泛型解决重用性的问题,使其可以支持多种类型的数据

```typescript
// 写一个函数，并定义其参数类型是string，并且返回这个参数
function print(arg: string): string {
    console.log(arg)
    return arg
}
print("1")
// 如果想要将其参数变为number，可以使用联合类型
function print(arg: number | string): number | string {
    console.log(arg)
    return arg
}
// 但是如果还有其他类型，不可能一直用联合类型写，any当然也不行，不能保证返回类型与参数类型一致
// 可以使用泛型来处理
```
### 使用泛型处理函数

> 泛型的语法是 `<>` 里面写参数，一般可以用 `T` 来表示

```typescript
function prints<T>(arg: T): T {
    console.log(arg)
    return arg
}
prints<string>("1")
```
> 泛型中的  `T`  就像一个占位符，或者说是一个变量，在使用的时候可以把定义的类型像参数一样传入，他可以原封不动的输出

**泛型可以使用两种方式进行指定类型**

- 定义自己要使用的类型
- TS类型推断，自动推导出类型

```typescript
prints<string>("1") // 定义T为string

prints("1") // ts类型推断，自动推导
```

**使用 `type` `interface` 方式定义函数类型**
```typescript
// 使用type定义
type Print = <T>(arg: T) => T;
const printFn: Print = (arg) => {
    return arg
}
// 使用interface定义
interface Print<T> {
    (arg: T): T
}
const printFn: Print<string> = (arg) => {
    return arg
}
```

### 泛型默认参数

```typescript
// 类似函数的默认参数
interface Print<T = number> {
    (arg: T): T
}
const printFn: Print = (arg) => {
    return arg
}
```

### 处理多个函数参数

**创建一个函数，参数为只有两项的元组数据，交换元组数据并返回**
```typescript
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}
// let result: [number, string]
let result = swap(["string", 2]);
```

### 函数的副作用操作
```typescript
// 这样可以清晰的获取到返回的类型是什么数据结构，提高了开发效率
interface UserInfo {
    name: string
    age: number
}
function request<T>(url:string): Promise<T> {
    return fetch(url).then(res => res.json())
}
request<UserInfo>('user/info').then(res =>{
    console.log(res)
})
```
### 约束泛型

新建一个函数，打印传入参数的长度
```typescript
function printLength<T>(arg: T): T {
    // 因为 T 属于泛型，则只能在函数被调用的时候才能知道他是什么类型
    // 这里要获取length，ts不知道该变量是否有length属性，则会报错
    // 类型“T”上不存在属性“length”。
    console.log(arg.length)
    return arg
}
```
解决方法：使用interface 来约束泛型

```typescript
interface ILength {
    length: number
}
// 让泛型继承接口 ILength ，这样就能约束泛型
function printLength<T extends ILength>(arg: T): T {
    console.log(arg.length)
    return arg
}
// 定义的变量一定要有length属性，才会通过编译
const str = printLength('lin')
const arr = printLength([1,2,3])
const obj = printLength({ length: 10 })

// 如果该参数上没有 length 属性则会报错： 类型“number”的参数不能赋给类型“ILength”的参数。
const num = printLength(2)
```
### 泛型的应用

---

- 泛型约束类

---

**定义栈，有入栈和出栈两个方法，如果想让入栈和出栈的数据类型一样，可以这样写**

```typescript
class Stack<T> {
  private data: T[] = [];
  push(item: T) {
    return this.data.push(item);
  }
  pop(): T | undefined {
    return this.data.pop();
  }
}
const s1 = new Stack<number>();
s1.push(1)
s1.pop() // 返回最后一位
```

---

- 泛型约束接口

---

> 对接口进行改造，是interface 更灵活

```typescript
interface IkeyVlaue<T, U> {
  key: T;
  value: U;
}

const k1: IkeyVlaue<string, number> = { key: "111", value: 2 };
const k2: IkeyVlaue<number, string> = { key: 2, value: "22" };
```

---

- 泛型定义数组

---

```typescript

const arr:Array<number> = [1, 2, 3]
// 如果数组中包含不属于number类型的值则会报错：不能将类型“string”分配给类型“number”。
const arr:Array<number> = ["1", 2, 3]

```

> **总结：**
> - 泛型是指在定义函数，接口或类的时候，不预先指定具体类型，而是在使用的时候进行指定
> - 泛型中的 `T` 就像一个占位符或者说是一个变量 ，在使用的时候可以把定义 的类型像参数一样传入，他可以原封不动的输出
> - 泛型在成员之间提供有意义 的约束，这些成员可以是： 函数参数，函数返回值，类的实例成员，类的方法

---

> **好处：**
> - 函数和类可以轻松的支持多种类型，增强程序的扩展性
> - 不必写冗余的联合类型，增强代码的可读性
> - 灵活控制类型之间的约束

## 索引类型

从对象中抽取一些属性的值，然后拼接成数组

```typescript
const userInfo = {
  name: "lin",
  age: 22
};

function getValues(userInfo: any, keys: string[]) {
  return keys.map(key => userInfo[key]);
}

console.log(getValues(userInfo, ["name", "age"])); // ["lin", 22]
console.log(getValues(userInfo, ["sex", "outlook"])); // [undefined, undefined]
```
虽然对象中没有 sex 和 outlook，但是ts检测并未报错

**此时使用ts索引类型，对这种情况做类型约束，实现动态属性的检查**

> 要想使用索引类型，需要先理解 `keyof (索引查询)，T[K] (索引访问), extends (泛型约束)`

### keyof (索引查询)

> keyof 操作符可以用于获取某种类型的所有键值，其返回的类型是联合类型

```typescript
interface IPerson {
  name: string;
  age: number;
}

type Test = keyof IPerson; // "name" | "age"

const names: Test = "name";

// 报错：不能将类型“"11"”分配给类型“keyof IPerson”。
const names: Test = "11"
```

### T[K] 索引访问

> T[K]，表示接口 T 的属性 K 所代表的类型

```typescript
interface IPerson {
  name: string;
  age: number;
}

let type1: IPerson["name"] = "11";
let type2: IPerson["age"] = 11;
```

### extends (泛型约束)

> T extends U ，表示泛型变量可以通过继承某个类型，获得某些属性

```typescript
interface ILength {
    length: number
}
// 让泛型继承接口 ILength ，这样就能约束泛型
function printLength<T extends ILength>(arg: T): T {
    console.log(arg.length)
    return arg
}
// 定义的变量一定要有length属性，才会通过编译
const str = printLength('lin')
const arr = printLength([1,2,3])
const obj = printLength({ length: 10 })
```
### 检测动态属性

```typescript
const userInfo = {
  name: "lin",
  age: 22
};

function getValues(userInfo: any, keys: string[]) {
  return keys.map(key => userInfo[key]);
}
```
> - 定义泛型T U ， 用于约束userInfo和keys
> - 为K增加一个泛型约束,使 K 继承userInfo的所有属性的联合类型，即 `U extends keyof T`

```typescript
function getValues<T, U extends keyof T>(
  userInfo: T,
  keys: Array<U>
): Array<T[U]> {
  return keys.map(key => userInfo[key]);
}
getValues(userInfo, ["name", "age"]);
// 如果指定的属性不在对象里的时候，就会报错：不能将类型“"sex"”分配给类型“"name" | "age"”
getValues(userInfo, ["name", "ages"]);

```

## 映射类型

> ts 允许将一个类型映射成另一个类型

### `in`

> `in`操作符，用来对联合类型实现遍历

```typescript
type Persons = "name" | "school" | "magor"

type Obj = {
    [p in Persons]: string
}
// 解析出来如下
type Obj = {
    name: string;
    school: string;
    magor: string;
}
```

### Partial 

> Partial<T> 将 T 的所有属性映射成可选的

```ts
interface IPersons {
    name: string,
    age: number
}

let p3: IPerson = {
    name: "li lei",
    age: 12
}
// 要想讲 IPersons 中的类型变为可选属性，就可以使用 Partial

type IPartial = Partial<IPersons>;
// 解析出来，如下
type IPartial = {
    name?: string;
    age?: number;
}
let p4: IPartial = {};

```

> Partail 原理： 使用  in 和 keyof

```ts
type IPartial<T> = {
  [P in keyof T]?: T[P];
};
let p4: IPartial<IPersons> = {};
```
- `[P in keyof T]` 遍历 T 上的所有属性
- `?`  设置可选属性类型
- `T[P]` 设置类型为原来属性的类型

### Readonly

> Readonly<T> 将 T 的所有属性映射为只读

```ts
interface IPersons {
    name: string,
    age: number
}

type IReadonly = Readonly<IPersons>;

let p2: IReadonly = {
  name: "lin",
  age: 12
};
// 只读属性不能修改，报错：无法分配到 "name" ，因为它是只读属性。
p2.name = "lihua";
```
**原理和`Partail` 一样**

### Pick

>  `Pick` 用于抽取对象子集，挑选一组属性并组成一个新的类型

```ts
interface IPerson1 {
  name: string;
  age: number;
  sex: boolean;
}
// 将 name 和 age 抽取
type IPick = Pick<IPerson1, "name" | "age">;
// 解析出来如下
type IPick = {
    name: string;
    age: number;
}

let p5: IPick = {
  name: "li lei",
  age: 22
};
```

> Pick 原理

```ts
type IPicks<T, K extends keyof T> = {
  [P in K]: T[P];
};
```
- 第一个参数 T 代表要抽取的目标对象
- 第二参数 K 代表要分离的属性key 值，但是他必须被约束在 参数 T 的key值范围内

### Record

> Record 是会创建新的非同态映射类型

```ts
interface IPerson3 {
  name: string;
  age: number;
}

type IRecord = Record<string, IPerson3>;
// 解析出来，如下
type IRecord = {
    [x: string]: IPerson3;
}

let PersonMap: IRecord = {
  person1: {
    name: "lilei",
    age: 12
  },
  person2: {
    name: "lilei",
    age: 12
  }
};

```
> Record 原理

```ts
type RecordPlus<K extends keyof any, T> = {
  [P in K]: T;
};
```
- 第一个参数可以是任意类型，因此约束与any的各种类型
- 第二参数作为，新创建对象的值被传入

## 条件类型

```ts
// 如果类型 T 可以被赋值给类型 U ，那么结果类型就是 X 类型，否则就是 Y 类型
T extends U ? X : Y
```

> Exclude 和 Extract 的实现就用到了条件类型

### `Exclude`: 排除的意思

> Exclude 的意思是不包含，`Exclude<T, U>` 会返回联合类型 T 中 不包含 联合类型 U 的部分

```ts
type Test1 = Exclude<"a" | "b", "a">
// 解析出来，如下
type Test1 = "b"
```

> Exclude原理：
```ts
type Exclude<T, U> = T extends U ? never : T
type Test1 = Exclude<"a" | "b", "a">
// 解析
"a" extends "a" = never 
type Test1 = never
"b" extends "a" = "b"
type Test1 = "b"
type Test1 = never | "b" 
```

### `Extract`: 提取的意思

> `Extract<T, U>` 提取联合类型 T 和联合类型 U 的所有交集

```ts
type Test2 = Extract<"a" | "b", "a">
// 解析出来如下：
type Test2 = "a"
```

> Extract原理：

```ts
type Extract<T, U> = T extends U ? T : never
type Test2 = Extract<"a" | "b", "a">
// 解析
"a" extends "a" = "a"
"b" extends "a" = never
type Test2 = "a" | never
```

## 工具类型 （util type）

### Omit

> `Omit<T, U>` 从类型 T 中 删除 U 中的所有属性

```ts
interface IPerson4 {
    name: string
    age: number
}
type IOmit = Omit<IPerson4, "age">
// 结果如下
type IOmit = {
    name: string;
}
```
> Omit 原理

```ts
type Omits<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

// Pick: 用于从 T 中 挑选 一组属性组成一个新的类型
// Exclude: 排除 T 中 的 k 属性  
// 组合 = Omit
```

### NonNullable

> `NonNullable<T>` 用来过滤类型中的null 以及 undefined 类型

```ts
type T0 = NonNullable<string | number | undefined>; // string number
type T1 = NonNullable<string | number | null>; // string number
```

> NonNullable 原理

```ts
type NonNullable<T> = T extends undefined | null ? never : T;
// ....
```

### Parameters

> Parameters 获取函数的参数类型，并将每一个参数放入一个元组中

```ts
type Fn = (arg: string, arg2: number) => void;
type P1 = Parameters<Fn>;
// 结果为
type P1 = [arg: string, arg2: number]
```

> Parameters 原理

```ts
type ParametersPlus<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never 
type Fn = (arg: string, arg2: number) => void;
type P1 = ParametersPlus<Fn>;

// Paramaters 首先必须约束参数 T 必须是一个函数类型
// 判断 T 是否为函数类型，如果是 则定义 P 暂存 函数的参数类型 ，否则就返回never
```

### ReturnType

> ReturnType 获取函数类型的返回类型

```ts
type Fn = (arg: string, arg2: number) => void;
type R1 = ReturnType<Fn>
// 结果为
type R1 = void
```

> ReturnType 原理

```ts
// 同 Parameters 原理
type ReturnTypePlus<T extends (...args: any) => any> = T extends (...args: any) => infer P ? P : never
type R1 = ReturnTypePlus<Fn>
```