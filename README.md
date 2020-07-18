# ts-learning

typescript常见的类型关键字
1. number
2. boolean
3. string
4. Array<number>|number[]
5. null、undefined
6. object
7. symbol

```ts
let num:number = 10;
let bool:boolean = true;
let str:string = "str";
let arrNumber:number[] = [1,2,3]
let data:null = null;
let dataSrouce:undefined = undefined;
let obj:object = {name:"lvanboy"};

```

typescript扩展的6中类型

### 元组
```ts
let tuple:[string,number,boolean] = ["a",1,true]; 
```

### 枚举
枚举默认值
```js
//枚举默认从0开始赋值
enum Roles{                  
    SUPER_ADMIN,
    ADMIN,
    USER
}
//等价于
enum Roles{
    SUPER_ADMIN=0,
    ADMIN=1,
    USER =2
}
```
修改枚举初始值
```js
enum Roles{
   SUPER_ADMIN = 1,
   ADMIN,
   USER 
}
//等价于
enum Roles{
   SUPER_ADMIN = 1,
   ADMIN = 2,
   USER = 3
}
```

不遵循自增规律的枚举值，就需要明确指定了，并且可使用value来索引key（称为反向映射）
```js
enum Roles{
    SUPER_ADMIN = 2,
    ADMIN = 4,
    USER =6
}
console.log("Roles",Roles[4])
```
或者还可以指定部分字段,未指定部分按照指定部分的起始值自增
```js
enum Status{
    Ok = 200,
    Created,
    Accepted,
    BadRequest = 400,
    Unauthrized
}
console.log(Status.Created,Status.Unauthrized); //201,401

```

### Any
any为任意类型,即没有类型约束
```js
let value:any;
value = 123;
value = "abc";
value =false
```


### void
void为无类型或者空类型,void类型只能赋值null和undefined
```js
const consoleText = (text: string): void => {
    console.log(text);
    return undefined;
}
consoleText('hello typescript')
```


### never
总会返回异常或者根本不会由返回值的函数表达式的返回类型。never类型除了赋值给never类型，不能赋值其他类型，即没有子类型；any也不能赋值never类型变量。
```js
const errFunc = (message: string): never => {
    throw new Error(message)
}
```

### unknown
它表示未知类型，当指定值为unknown类型时，如果没有通过控制流的类型断言来缩小范围，是不能对它进行任何操作的。


交叉类型
```js
const merge = <T,U>(arg1:T,arg2:U):T&U =>{
    let res:<T,U> = {...arg1,...arg2};
    return res;
}
const info1 ={
    name:"lvanboy";
}
const info2 = {
    age:23
}
const  mergeinfo = merge(info1,info2);

```

联合类型
要求多个类型中，满足其中一个类型即可
```js
const getLength = (content:string|number):number =>{
    if(typeof content === "string") return content.length;
    else return content.toString().length;
}
console.log(getLength("123"));
console.log(getLength(123));

```

数字枚举在定义时，可使用计算值和常量值。而使用计算值和常量值的后一项，必须设置初始值，否则报错
```js
const getValue = ()=> {return 0};

enum RightIndex{
    a = getValue(),
    b = 1,//这里必须指定初始值,
    c
}

const Start = 1;
enum Index{
    a = Start,
    b = 1,//这里必须指定初始值
    c
}

```

typescript编译后的枚举，实际是对象
```js
enum Status{
    Success = 200,
    NotFound = 404,
    Error = 500
}
//编译后等价于

Status = {
    Success:200,
    NotFound:404,
    Error:500,
    200:Success,
    404:NotFound,
    500:Error
}

```

字符串枚举
字符串枚举要求枚举值必须是字符串字面量，或者是当前已有枚举元素；
```js
enum Message  {
    Error = "error message",
    ServerError = Error,
    ClientError = Error,
}
console.log(Message.Error,Message.ClientError);
```

异构枚举
异构枚举指的是枚举字段值既有数字也有字符串，在使用尽量不使用异构枚举，因为一般枚举值都是同类型的值。
```js
enum Result{
    Faild = 0,
    Success = "success"
}
console.log(Result.Faild,Result.Success)
```

当枚举中所有成员的值都是字面量类型时，那么枚举的每个成员和枚举值本身都可以作为类型使用。
```js
enum Animal{
    Dog = 1,
    Cat = 2
}

interface Dog{
    type:Animal.Dog
}
interface Cat{
    type:Animal.Cat
}

let cat1:Cat = {
    type:Animal.Dog //报错：Type 'Animal.Dog' is not assignable to type 'Animal.Cat'.
}

let dog:Dog = {
    type:Animal.Dog
}

```
联合枚举类型
```js
enum Status{
    Off,
    On
}

enum Animal{
    Dog = 1,
}

interface Light{
    status:Status  //当该属性被定义为枚举值时，相等于联合类型，只能是枚举中的其中一个值
}

const light1:Light = {
    status:Status.Off
}

const light2:Light = {
    status:Status.On
}
const light3:Light = {
    status:Animal.Dog //报错：Type 'Animal' is not assignable to type 'Status'.
}

```
运行时的枚举实际是一个对象，那么就可以按照对象的方式来使用它
```js
enum E{
    A,
    B
}

const getIndex = (enumObj:{A:number}):number =>{
    return enumObj.A + 1;
}
console.log(getIndex(E))

```

编译后的枚举对象，如果用不到，而仅仅使用枚举类型增加程序可读性和扩展性，那么使用const声明枚举，编译后将不再创建枚举对象,直接将枚举类型替换为相应的字面量值。

```js
enum Status{
    Off,
    On
}
const enum Animal{
    Dog,
    Cat
}

const status = Status.On;
const cat = Animal.Cat;
//编译后的结果

"use strict";
var Status;
(function (Status) {
    Status[Status["Off"] = 0] = "Off";
    Status[Status["On"] = 1] = "On";
})(Status || (Status = {}));
const stat = Status.On;
const cat = 1 /* Cat */;

```

### 类型断言
当我们认为typescript不如自身更了解这个值时，期望typescript不要对该值进行类型检查，而交给自己处理，就要使用类型断言。类型断言有点像类型转化，把某个值强行指定为特定类型。
```js
const getLength = target =>{
    if(target.length){
        return target.length
    }else{
        return target.toString().length;
    }
}

```
假定现在target参数只能是字符串或者数字,显然数字类型是没有length属性的，此时参数报错。
```js
const getLength = (target:number|string):number =>{
    if(target.length){ 
        return target.length
    }else{
        return target.toString().length;
    }
}
//产生报错
// Property 'length' does not exist on type 'string | number'.
//  Property 'length' does not exist on type 'number'.

```

使用类型断言value as type
```js
const getLength = (target:number|string):number =>{
    if((target as string).length){ 
        return (target as string).length
    }else{
        return target.toString().length;
    }
}

```
这样就不会报错，但是每一处值有不同情况的地方都要使用类型断言，这里需要更高级的方式来简化。


### 接口
接口几乎可以定义任何结构。
```js
const getFullName = ({firstname,lastName}:{firstname:string,lastName:string})=>{
    return `${firstname} ${lastName}`
}
getFullName() //Expected 1 arguments, but got 0.
getFullName({age:19,lastName:"lvanboy"}) //...
getFullName({firstname:"korl",lastname:"cccc"}) 
```
typescript在预检查阶段就能判断出是否传参错误,并且使用红色波浪线标出，提示错误原因。

但是上面的做法定义出的字段类型是无法复用的，如果这个结构需要复用，就使用接口定义出来。
```js
interface Name{
   firstName:string;
   lastName:string; 
}
const getFullName = ({firstName,lastName}:Name)=>{
    return `${firstName} ${lastName}`
}
getFullName() //Expected 1 arguments, but got 0.
getFullName({age:19,lastName:"lvanboy"}) //...
getFullName({firstName:"korl",lastName:"cccc"})

```
另外ts还提供了可选属性，对于一些结构，某些字段要求是可选的，有则校验，没有就忽略。
```js

const getVegetables = ({color,type}:Vegetables) =>{
    return `A ${color?color+"":""} ${type}`;
}

interface Vegetables {
    color?:string;
    type:string;
}

getVegetables({type:"tstype"})

```
这里的color就是可选的一个参数，另外ts要求接口的名称首字母必须大写,可在tslint.json的rules里面添加"interface-name":[true,"never-prefix"]来关闭这个tslint检查。

如果这里传入了接口中没有定义的字段，也会产生报错，这被称为多余属性检查。
```js
const getVegetables = ({color,type}:Vegetables) =>{
    return `A ${color?color+"":""} ${type}`;
}

interface Vegetables {
    color?:string;
    type:string;
}

getVegetables({type:"tstype",size:18}) //报错

```
如果你期望规避多余属性检查这个特性，有如下方法：
1. 使用类型断言
```js
const getVegetables = ({color,type}:Vegetables) =>{
    return `A ${color?color+"":""} ${type}`;
}

interface Vegetables {
    color?:string;
    type:string;
}

getVegetables({type:"tstype",size:18} as Vegetables) //此时的size就被屏蔽了

```

2. 添加索引签名
索引签名是一种更好的解决方法
```js
interface Vegetables{
    color?:string;
    type:string;
    [prop:string]:any;
}
const getVegetables = ({color,type}:Vegetables) =>{
    return `A ${color?color+"":""} ${type}`;
}

console.log(getVegetables({color:"red",type:"tomato",size:12,price:1.2}));

```

3. 类型兼容性
不推荐使用，不容易理解，可读性差。
```js
interface Vegetables{
    color?:string;
    type:string;
}
const getVegetables = ({color,type}:Vegetables) =>{
    return `A ${color?color+"":""} ${type}`;
}
const options = {type:"tomato",size:12};
getVegetables(options)

```
首先将字面量传入函数，和赋值后将赋值内容传入函数是不一样的，后者会产生类型兼容性；类型兼容性可理解为a=b;b只要满足a所需要的所有类型即可，即使b多出的其他值也不在乎。

ts还提供了只读属性，避免变量被无意修改，这符合程序不可变性的原则。使用readonly声明
```js
interface Role{
    readonly 0：string;
    readonly 1: string;
}

let role:Role = {
    0:"super_admin",
    1:"admin"
}

role[1] = "super_admin"; //因为设置只读类型的接口字段，所以产生报错。

```
ES6的const也符合只读的特性，但const无法在对象内部声明；所以const声明变量，对象属性使用readonly来限定。

接口可描述普通对象，也可描述函数类型，这的概念类似于抽象类的概念

```ts
interface AddFunc{
    (num1:number,num2:number):number;
}

```
这里声明的函数，主要约束传入参数的类型和返回值类型

```js
interface AddFunc{
    (num1:number,num2:number):number;
}
const add:AddFunc = (n1,n2) => n1+n2;
const join:AddFunc = (n1,n2) => `${n1} ${n2}` //报错，Type 'string' is not assignable to type 'number'.
add('a',2);//报错
```


### 索引类型
使用接口描述索引类型
```ts
interface RoleDic{
   readonly [id:number]:string;
}
const role1:RoleDic = {
    0:"super_admin",
    1:"admin"
}

const role2:RoleDic = ["super_admin","admin"]
role1[0] = "admin"; //报错 :Index signature in type 'RoleDic' only permits reading
```

当索引设置成字符串类型，即使属性名是数值类型也没问题；因为数值类型的属性名会经过toString操作转化为字符串；
```js
const obj = {
    123:"a",
    "123":"b"
}
console.log(obj)
```
JS的运行结果为{123: "b"};


继承接口
继承接口类似于类的继承，使接口更加具有复用性。
```ts
interface Vegetables{
    color:string;
}
interface Tomato{
    color:string;
    radius:number;
}

interface Carrot{
    color:string;
    length:number;
}

```
三个接口中都有color，用继承改写
```ts
interface Vegetables{
    color:string;
}
interface Tomato extends Vegetables{
    radius:number;
}

interface Carrot extends Vegetables{
    length:number;
}

const tomato:Tomato = {
    radius:1.2   //报错：Property 'color' is missing in type '{ radius: number; }' but required in type 'Tomato'.
}

const carrot:Carrot = {
    color:"orange",
    length:20
}

```


接口也可以多继承
```js
interface Vegetables{
    color:string;
}

interface Food{
    type:string;
}

interface Tomato extends Vegetables,Food{
    radius:number;
}

const tomato:Tomato = {
    type:"vegetables",
    color:"red",
    radius:1.2
}

```

混合类型接口
实现一个计时器，简单的做法，暴露一个全局对象，定义一个自增函数；
```js
let count = 0;
const countUp = () => count++;
console.log(countUp())
console.log(countUp())
```
为了减少全局上的污染，使用闭包实现
```js
const countUp = (()=>{
    let count = 0;
    return ()=>{
        return ++count;
    }
})()

console.log(countUp())
console.log(countUp())

```
在或者不使用第三方变量，直接挂载为函数属性
```js
let countUp = ()=>{
    return ++countUp.count;
}
countUp.count = 0;
console.log(countUp());
console.log(countUp());

```

使用ts中的混合类型约束
```ts
interface Counter{
    ():void;
    count:number;
}
const getCounter = ():Counter =>{
    const c = ()=>{
        c.count++;
    }
    c.count = 0;
    return c;
}
const counter:Counter = getCounter();
counter();
console.log(counter.count);
counter();
console.log(counter.count);

```


### 函数类型
为函数定义类型
```ts
function add(x:number,y:number){
    return x+y;
}
//或者
const add = (arg1:number,arg2:number):number =>{
    return arg1 + arg2;
}

```
如果省略参数的类型，默认为any类型，如果函数无返回值，默认是void类型；如果有返回值，ts会进行逻辑推断。

使用接口定义函数类型
```js

interface Add{
    (x:number,y:number):number;
}
let add:Add = (arg1:string,arg2:string):string=>arg1+arg2; //不符合Add函数定义，报错。

```

使用类型别名
```ts
type Add = (x:number,y:number)=>number;
let add:Add = (arg1:string,arg2:string):string =>arg1+arg2; //报错

```

可选参数
可选参数与接口中的可选属性一样，可选参数一定要写在必传参数后面，否则发生报错。
```ts
type Add = (x?:number,y:number)=>number; //报错

```

默认参数
默认参数的位置没有约束，当指定默认参数后，ts会自动识别默认参数的类型，当手动传入默认参数时，必须保持同类型，否则报错
```ts
const add = (x:number,y=2):number=>{
    return x+y;
}
add(1,2);
add(1,"a");

```

也可以显式的指明默认参数类型
```ts
const add = (x:number,y:number = 2):number=>{
    return x+y;
}
add(1,2);
add(1,"a");

```

剩余参数
同ES6语法
```ts
const handleData =(arg1:number,...arg2:number[])=>{
    console.log(arg2);
}
handleData(1,2,3);
handleData(1,2,"3")

```

函数重载
JS中是没有函数重载的概念了，不能根据传入参数的个数或者类型差异，匹配同名函数。而是在函数内部，手动根据参数个数或者类型，做相应的逻辑处理。

```js
const handleData = value=>{
    if(typeof value === "string"){
        return value.split("");
    }else{
        return value.toString().split("").join("-");
    }
}
handleData('abc');
handleData(123)
```

TS中的函数重载，更像是函数类型的重载，根据传入的参数个数和类型匹配定义的函数类型，这样TS能够更好的进行类型推断；
```ts
function handleData(x:string):string[];
function handleData(x:number):string; 
function handleData(x:any):any{  //函数实体，用于匹配函数类型重载
    if(typeof x === "string"){
        return x.split("");
    }else{
        return x.toString().split("").join("_")
    }
}
handleData("123")
handleData(123);
handleData(false);
```

使用泛型拯救any
当无法确定这个类型到底是什么时，指定为any；
```ts
const getArray = (value:any,times:number = 5):any[] =>{
    return new Array(times).fill(value);
}
getArray([1],2).forEach(item=>{
    console.log(item.length);
})
getArray(2,3).forEach(item=>{
    console.log(item.length);
})
```
当item为number类型时，length属性是不存在的，但这里指定为any，任何操作都是允许的，只是结果是预料之外的。为了解决这个问题，引入了泛型。

```ts
const getArray = <T>(value:T,times:number = 5):T[] =>{
    return new Array(times).fill(value);
}
getArray<number[]>([1,2],3).forEach(item=>{
    console.log(item.length);
})

getArray<number>(2,3).forEach(item=>{
    console.log(item.length); //报错，此时的泛型被指定为number，number不存在length所以报错。
})
//可省略<number[]>的指定，ts会根据传入参数，自动推断T的类型
getArray([4,5,5],3).forEach(item=>{
    console.log(item.length); //报错，此时的泛型被指定为number，number不存在length所以报错。
})
```
这里的泛型变量为T，你可以任意取名，泛型变量的T在运行时确定，由ts根据传入参数或者变量推断T的类型。所以说，泛型变量T在运行时是确定下来的，所以可以检查类型操作是否违法。

```ts
const getArray = <T,U>(p1:T,p2:U,times:number):[T,U][]=>{
    return new Array(times).fill([p1,p2]);
}
getArray(1,"a",3).forEach(item=>{
    console.log(item[0].length); //报错
    console.log(item[1].toFixed(2));//报错
})

```

使用泛型定义函数类型
```ts
//ex1
const getArray = <T>(arg:T,times:number)=> T[] = (args,times)=>{
    return new Array(times).fill(arg);
}

//ex2 类型别名
type GetArray = <T>(arg:T,times:number)=> T[];
const getArray:GetArray =<T>(arg:T,times:number):T[] =>{
    return new Array(times).fill(arg);
}

//ex3 接口
interface GetArray{
    <T>(arg:T,times:number):T[]
}
const getArray:GetArray =<T>(arg:T,times:number):T[]=>{
    return new Array(times).fill(arg);
}

//ex4将泛型变量作为接口参数，供整个接口使用，在使用接口时要明确传入一个类型

interface GetArray<T>{
    (arg:T,times:number):T[];
    tag:T;
}

const getArray:GetArray<number> = <T>(arg:T,times:number):T[] =>{
    return new Array(times).fill(arg);
}
getArray.tag = 1;
getArray(1, 2);

```

泛型约束
接口可约束一个对象必须有哪些属性
```ts
interface ValueWithLength{
    length:number;
}

```

使用泛型变量来继承接口约束，这个泛型必须包含指定字段
```ts
interface ValueWithLength{
    length:number;
}
const getLength = <T extends ValueWithLength>(params:T):number =>{
    return params.length
}

getLength("123");
getLength([1,2,3])
getLength({length:3})
getLength(123) //报错：Argument of type '123' is not assignable to parameter of type 'ValueWithLength'.

```

在泛型约束中使用类型参数
假设，添加访问对象上已有属性的约束，防止undefined引起报错。
使用索引类型keyof结合泛型，keyof T,相当于由泛型变量T的属性名构成联合类型
```ts
const getProps = <T,K extends keyof T>(object:T,propName:K)=>{
    return object[propName];
}
const obj = {a:"aa",b:"bb"};
getProps(obj,"c");
```

### 类
TS中的类
```ts
class Point{
    x:number;
    y:number;
    constructor(x:number,y:number){
        this.x = x;
        this.y = y;
    }
    getPosition(){
        return `(${this.x},${this.y})`
    }
}

const point = new Point(1,2);
```

和ES6中的类一样，拥有继承特性
```ts
class Parent{
    name:string;
    constructor(name:string){
        this.name = name;
    }
}
class Child extends Parent{
    constructor(name:string){
        super(name);
    }
}

```

Ts中的修饰符
public:表示公共的，创建实例后，可通过实例访问，默认public
```ts
class Point{
    public x:number;
    public y:number;
    constructor(x:number,y:number){
        this.x = x;
        this.y = y;
    }
    public getPosition(){
        return `(${this.x},${this.y})`
    }
}

```
private:表示私有的，在类的外部无法访问
```ts
class Parent{
    private age:number;
    constructor(age:number){
        this.age = age;
    }
}
const p = new Parent(18);
console.log(p);
console.log(p.age); //报错 Property 'age' is private and only accessible within class 'Parent'.
console.log(Parent.age); //报错 Property 'age' does not exist on type 'typeof Parent'.

class Child extends Parent{
    constructor(age:number){
        super(age);
        console.log(super.age) //报错 Property 'age' is private and only accessible within class 'Parent'.
    }
}

```

protected:表示受保护的
```ts
class Parent{
    protected age:number;
    constructor(age:number){
        this.age = age;
    }
    protected getAge(){
        return this.age;
    }
}
const p = new Parent(18);
console.log(p.age); //报错 Property 'age' is protected and only accessible within class 'Parent' and its subclasses.
console.log(Parent.age); //报错 Property 'age' does not exist on type 'typeof Parent'.

class Child extends Parent{
    constructor(age:number){
        super(age);
        console.log(super.age) 
        console.log(super.getAge());
    }
}
const c = new Child(1);

```

protected还可以修饰构造函数，这样当前类只能作为基类，被子类继承使用。
```ts
class Parent{
    protected constructor(){  
    //Constructor of class 'Parent' is protected and only accessible within the class declaration.
    }
}
const p = new Parent();
class Child extends Parent{
    constructor(){
        super();
    }
}
const c = new Child();

```

在类中可以使用readonly，将属性设置为只读。
```ts
class UserInfo{
    readonly name:string;
    constructor(name:string){
        this.name = name;
    }
}
let userinfo = new UserInfo('lv');
userinfo.name = "xxx";//报错 Cannot assign to 'name' because it is a read-only property.

```

参数属性
使用参数属性来简化成员的定义
```ts
class A {
    constructor(name:string){}
}
const a = new A("a");
console.log(a.name); //报错：Property 'name' does not exist on type 'A'.

class B{
    constructor(public name:string){}
}
const b = new B("B");
console.log(b.name);
```

static关键字
static用于声明静态属性和方法,实例不会添加静态属性，也不会继承静态方法，修饰符和static和同时使用
```ts
class Parent{
    public static age:number;
    public static getAge(){
        return Parent.age;
    }
    constructor(){}
}
const p = new Parent();
console.log(p.getAge()); //报错 Property 'getAge' is a static member of type 'Parent'
console.log(p.age); //报错 Property 'getAge' is a static member of type 'Parent'
console.log(Parent.age)

```

可选参数也可以用于类的属性，这里称为可选类属性
```ts
class Info{
    name:string;
    age?:number;
    constructor(name:string,age?:number,sex?:boolean){
        this.name = name;
        this.age = age;
    }
}
const info = new Info("a");
const info1 = new Info("a",19);
const info2 = new Info("a",1,true);

```

存取器
概念和ES6的访问修饰符类似，用于设置属性时调用的函数，和访问属性时调用的函数。
```ts
class UserInfo{
    private _fullName:string = "";
    constructor(){}
    get fullName(){
        return this._fullName;
    }
    set fullName(value:string){
        console.log(`setter:${value}`)
        this._fullName = value;
    }
}
const userinfo = new UserInfo();
userinfo.fullName = "xxx";
console.log(userinfo.fullName);

```

抽象类
抽象类一般用于继承，不能创建实例，抽象类内部用于定义抽象方法
```ts
abstract class Person{
    constructor(public name:string){};
    abstract printName():void;
}

class Man extends Person{
    constructor(name:string){
        super(name);
        this.name = name;
    }
    printName(){
        console.log(this.name);
    }
}
const m = new Man("man");
m.printName();
const p = new Person("person");  //报错：Cannot create an instance of an abstract class.

```
abstract还可以用于修饰属性和配合存储器使用。
```ts
abstract class Person{
    abstract _name:string;
    abstract get insideName():string;
    abstract set insideName(value:string);
}
class P extends Person{
    constructor(name:string,insideName:string){
        super()
        this._name =name;
        this.insideName = insideName
    }
    _name:string;
    insideName:string;
}

```

实例类型
```ts
class Person{
    constructor(name:string){}
}
let p:Person = new Person("lvanboy");

```
Person这个类实例化时，为p声明Person类型不是必须的，ts会推断出他的类型。


类实现接口
```ts
interface FoodInterface{
    type:string;
}
class FoodClass implements FoodInterface{
    static type:string;
    constructor(public type:string){

    }
}

```

接口继承类
接口可以继承一个类，将类的成员和类型继承包括修饰符，不包括具体实现。当继承修饰符为private和protected，这个接口只能被这个类或者这个类的字类实现。
```ts
class A {
    protected name:string = "";
}

interface I extends A{}

class B implements I{} //报错
class C implements I{
    name:string; //报错
}

class D extends A implements I {
    getName(){
        return this.name;
    }
}
```


泛型中使用类
```ts
const create = <T>(c:{new ():T}):T =>{
    return new c();
}
class Info{
    age:number = 1;
}

create(Info).age;
create(Info).name; //报错 Property 'name' does not exist on type 'Info'.

```

### 类型推断
在一些定义中，如果没有明确指定类型，那么ts编译器会自动推断合适的类型；
```ts
let name1 = "xxx";
name1 = 123; //报错 Type '123' is not assignable to type 'string'

```
基本推断，根据赋值号右边的类型，推断左边的类型。

多类型联合
```ts
let arr = [1,"a"];
arr = ['b',2]
arr = ["c",3,false] //报错 Type 'false' is not assignable to type 'string | number'.
```
当多个元素拥有不同的类型，ts会将多类型合并，arr被推断为string和number

```ts
let value = Math.random()*10 > 5 ?"abc":123;
value = false //报错 Type 'false' is not assignable to type 'string | number'.
```
此时value的类型推断为string和number

上下文类型
上下文类型与基本推断相反，从左边推测 右边的值
```ts
window.onmousedown = function(mouseEvent){ //Parameter 'mouseEvent' implicitly has an 'any' type.
    console.log(mouseEvent.a) //报错 
}

```
此时，mouseEvent没有进行正确的推断，导致any类型，发错报错。


### 类型兼容性
typescript在实现强类型校验的同时，还满足JavaScript灵活的特点，所有就有类型兼容性这个概念。

类型兼容性如下：
函数类型
1. 函数参数的个数
函数参数个数兼容规则：函数参数少的可以赋值给函数参数多的
```ts
let x = (a:number) => 0;
let y = (a:number,b:string) => 0;
y = x;
```

2. 函数参数类型
函数参数的类型需要对应，才能进行赋值。
```ts
let x = (a:number) => 0;
let y = (b:string) => 0;
let z = (c:string) => false;
x = y; //报错 Type '(b: string) => number' is not assignable to type '(a: number) => number'.
x = z; //报错 Type '(b: string) => number' is not assignable to type '(a: number) => number'.
```

3. 剩余参数和可选参数
当要被赋值的函数参数包含剩余参数时，赋值函数可用任意个数参数代替，但类型要对应
```ts
const getNum = (arr:number[],callback:(...args:number[])=>number):number=>{
    return callback(...arr);
}
getNum([1,2],(...args:number[]):number => args.length)
```

```ts
const getNum = (arr:number[],callback:(arg1:number,arg2?:number)=>number):number=>{
    return callback(...arr); //An argument for 'arg1' was not provided.
}
//应修改为
const getNum = (arr:number[],callback:(arg1:number,arg2?:number)=>number):number=>{
    return callback(arr[0],...arr); 
}

```

4. 函数参数双向协变
双向协变的意思：参数类型无需绝对相同
```ts
let a = function(arg:number|string) :void{};
let b = function(arg:number):void{};
a = b; //不能赋值，产生报错

```
5. 函数返回值类型
```ts
let x = (a:number):number|string => 0;
let y = (b:number) => "a";
let z = (c:number) => false;
x = y;
x =z; //报错 Type '(c: number) => boolean' is not assignable to type '(a: number) => number | string'.

```
6. 函数重载
需要赋值函数与被赋值函数的每个重载函数类型都能完全匹配才能赋值。


枚举
数字枚举类型和数字类型相互兼容
```ts
enum Status{
    On,
    Off
}
let s = Status.On;
s = 1;
s = 3;

```
字符串枚举类型和字符串类型是不兼容的
```ts
enum Status{
    On = "on",
    Off = "off"
}
let s = Status.On
s = "lion"; //报错 Type '"lion"' is not assignable to type 'Status'

```

类
在类进行赋值时，只比较实例成员，不比较类的静态成员和构造函数
```ts
class Animal{
    static age:number =1;
    constructor(public name :string){

    }
}
class Person {
    static age:string ="1";
    constructor(public name :string){

    }
}

class Food{
        constructor(public name :number){

    }
}


let a:Animal = new Animal("aa");
let p:Person = new Person("xx");
let f:Food = new Food(123);

a = p;
a = f; //报错 Type 'Food' is not assignable to type 'Animal'.
```

类的私有成员和保护成员会影响兼容性。如果目标类型包含一个私有成员，那么源类型必须包含来自同一个类的私有成员。
```ts
class Parent{
    private age:number =1;
    constructor(){

    }
}

class Child extends Parent{
    constructor() {
        super()
    }
}

class Other{
    private age:number =1 ;
    constructor(){

    }
}

let child:Parent = new Child();
let other:Parent = new Other(); //Type 'Other' is not assignable to type 'Parent'.

```
同理保护修饰符属性也是如此
```ts
class Parent{
    protected age:number =1;
    constructor(){

    }
}

class Child extends Parent{
    constructor() {
        super()
    }
}

class Other{
    protected age:number =1 ;
    constructor(){

    }
}

let child:Parent = new Child();
let other:Parent = new Other(); //Type 'Other' is not assignable to type 'Parent'.

```


泛型
```ts
interface Data<T>{

}
let data1:Data<string> = {}
let data2:Data<number> = {}

data1 = data2;
```
因为接口中并没有使用泛型变量T，如果无论传入string和number都没有产生影响，不会产生报错。

但如果在接口中使用了泛型变量，并且产生类型冲突，在赋值时就会产生报错
```ts
interface Data<T>{
    data:T;
}
let data1:Data<string> = {data:"x"}
let data2:Data<number> = {data:1}

data1 = data2; //报错 Type 'Data<number>' is not assignable to type 'Data<string>'.
```


### 类型保护
函数返回无固定值时，在读取属性和使用方法时，容易产生报错
```ts
const valueList = [123,"abc"];
const getRandomValue = ()=>{
    const number = Math.random() * 10;
    if(number < 5) return valueList[0];
    else return valueList[1];
}
const item = getRandomValue(); //item可能是number|string
if(item.length){ //这里参数报错
    console.log(item.length);
}else{
    console.log(item.toFixed()) //这里也会产生报错
}

```
使用类型断言
```ts

const valueList = [123,"abc"];
const getRandomValue = ()=>{
    const number = Math.random() * 10;
    if(number < 5) return valueList[0];
    else return valueList[1];
}
const item = getRandomValue(); //item可能是number|string
if((item as string).length){ //这里参数报错
    console.log((item as string).length);
}else{
    console.log((item as number).toFixed()) //这里也会产生报错
}

```
这样的做法有点繁琐，可以使用自定义类型保护来解决
自定义类型保护
```ts
const valueList = [123,"abc"];
const getRandomValue = ()=>{
    const number = Math.random() * 10;
    if(number < 5) return valueList[0];
    else return valueList[1];
}
function isString(value:number|string):value is string{
    const number = Math.random() * 10;
    return number >= 5;
}

const item = getRandomValue(); //item可能是number|string
if((isString(item))){ //这里参数报错
    console.log(item.length);
}else{
    console.log(item.toFixed()) //这里也会产生报错
}

```
当isString返回为true时，说明返回值是string。否则则不是。

typeof 类型保护
相对于JavaScript的类型判断，这样的写法有点复杂。在Ts中如果是基本类型，不是复杂类型可直接使用typeof判断。
```ts
const valueList = [123,"abc"];
const getRandomValue = ()=>{
    const number = Math.random() * 10;
    if(number < 5) return valueList[0];
    else return valueList[1];
}


const item = getRandomValue(); //item可能是number|string
if(typeof item === "string"){
    console.log(item.length);
}else{
    console.log(item.toFixed());
}

```
Ts中使用typeof只能是number，string，boolean，和symbol类型，只能使用等号或者不等号。这样才具备类型保护。否则只是普通的js语句。比如使用typeof {} == "object"，这样的判断，是没有类型保护的作用的。
```ts
const valueList = [{},()=>{}];
const getRandomValue = ()=>{
    const number = Math.random() * 10;
    if(number < 5) return valueList[0];
    else return valueList[1];
}


const item = getRandomValue(); //item可能是number|string
if(typeof item === "object"){
    console.log(item.toString());
}else{
    console.log(item()); //报错This expression is not callable.
}

```

在Ts中使用instanceof操作符同样具有类型保护效果
```ts
class CreateByClass1{
    public age = 18;
    constructor(){}
}

class CreateByClass2{
    public name = "lvanboy";
    constructor(){}
}

function getRandomItem(){
    return Math.random() < 0.5 ?new CreateByClass1():new CreateByClass2();
}
const item = getRandomItem();
if(item instanceof CreateByClass1){
    console.log(item.age);
}else{
    console.log(item.name)
}

```

### 显式断言
在开启strictNullChecks，可选参数和可选属性会自动加上|undefined类型，也就是兼容undefined。
```ts
const sum = (x:number,y?:number)=>{
    return x + (y || 0);
}
sum(1,2);
sum(1);
sum(1,undefined);
sum(1,null); //报错

```
这里y可以穿数字，可以不传，也可以传undefined，但是不能传null。
```ts
interface PositionInterface{
    x:number;
    b?:number;
}
const position:PositionInterface = {
    x:12
}
position.b = 1;
position.b = undefined;
position.b = null;  //报错 Type 'null' is not assignable to type 'number | undefined'.
 
```

显式赋值断言
在一些情况下，编译器无法在我们声明变量之前直到一个值是否为null，这就需要类型断言手动兼容该值不为null。并使用!告诉ts编译器，某个变量一定不为null。
```ts
function getSpeliceStr(num:number|null):string{
    function getRes(prefix:string){
        return prefix + num!.toFixed().toString();
    }
    num = num || 0.1;
    return getRes("lvanboy");
}

```
在使用!声明一个值一定不为null时，一定要记住这个值做了兼容处理。


### 类型别名与字面量类型
类型别名就是给一个类型取一个小名。之后使用到这个类型的时候都可以使用这个小名，也就是类型别名。它只是起到取名字的作用，并不是创建一个类型。

定义类型别名，使用type关键字
```ts
type typeString = string;
let str:typeString;
str = 123; // 报错 Type '123' is not assignable to type 'string'.

```
类型别名也可以用泛型
```ts
type Position<T> = {x:T,y:T};
const p1:Position<number> = {
    x:1,
    y:-1
}
const p2:Position<string> = {
    x:"a",
    y:"b",
}

```

类型别名可在对象属性中引用自身
```ts
type Child<T> = {
    current:T,
    child?:Child<T>
}
let c:Child<string> ={
    current:"a",
    child:{
        current:"b",
        child:{
            current:"c"
        }
    }
}

```
类型别名不能用extends和implement这种ts关键字。

接口和类型别名可以起到同样的作用
```ts
type Alias = {
    num:number
}
interface Interface{
    num:number
}

let _alias:Alias = {
    num:1
}

let _interface:Interface ={
    num:2
}
_alias = _interface; //可以兼容

```
如何抉择类型别名和接口?
1. 当定义类型用于扩展，即使用implement修饰时，用接口
2. 当无法通过接口，并且使用联合类型或者元组时，用类型别名


字面量类型
字符串字面量类型和字符串类型并不一样
字符串字面量类型属于常量类型，与字符串类型不同的是它是具体的值
```ts
type Name = "lvanboy";
const name1:Name = "test"; //报错 ：Type '"test"' is not assignable to type '"lvanboy"'.
const name2:Name = "lvanboy";

```

联合多个字符串字面量类型
```ts
type Direction = "north" | "south" | "east" | "west";
function getDirection(direction:Direction){
    return direction.substr(0,1);
}

getDirection("test"); //报错： Argument of type '"test"' is not assignable to parameter of type 'Direction'.
getDirection("north");

```

数字字面量类型
```ts
type Age = 18;
interface Info {
    name:string;
    age:Age;
}

const info:Info = {
    name:"lvanboy",
    age:19
}


```

### 可辨识联合合并
将单例类型、联合类型、类型保护、类型别名进行合并，创建一种可辨别的高级类型，也可称为标签类型或者代数数据类型。
单例类型，符合单例模式的数据类型，如枚举、字面量类型。
```ts
interface Square{
    kind:"square",
    size:number,
}

interface Rectangle{
    kind:"rectangle";
    height:number;
    width:number;
}

interface Circle{
    kind:"circle";
    radius:number;
}

type Shape = Square|Rectangle|Circle;
function getArea(s:Shape){
    switch(s.kind){
        case "square":
            return s.size * s.size;
        case "rectangle":
            return s.height * s.width;
        case "circle":
            return Math.PI * s.radius**2;
    }

}
```

利用strictNullChecks，在没有匹配到case后，函数返回undefined
```ts
interface Square{
    kind:"square",
    size:number,
}

interface Rectangle{
    kind:"rectangle";
    height:number;
    width:number;
}

interface Circle{
    kind:"circle";
    radius:number;
}

interface Triangle{
    kind:"triangle";
    bottom:number;
    height:number;
}

type Shape = Square|Rectangle|Circle | Triangle;
function getArea(s:Shape){
    switch(s.kind){
        case "square":
            return s.size * s.size;
        case "rectangle":
            return s.height * s.width;
        case "circle":
            return Math.PI * s.radius**2;
    }
    return ;
}
getArea({kind:"triangle",bottom:10,height:20});


```

使用never类型，检查代码逻辑是否已经犯错。当函数返回错误或者不可能有返回值时，返回never类型
```ts
interface Square{
    kind:"square",
    size:number,
}

interface Rectangle{
    kind:"rectangle";
    height:number;
    width:number;
}

interface Circle{
    kind:"circle";
    radius:number;
}

interface Triangle{
    kind:"triangle";
    bottom:number;
    height:number;
}
type Shape = Square|Rectangle|Circle | Triangle;
function assertNever(value:never):never{
    throw new Error("unexprect object" + value);
}
function getArea(s:Shape){
    switch(s.kind){
        case "square":
            return s.size * s.size;
        case "rectangle":
            return s.height * s.width;
        case "circle":
            return Math.PI * s.radius**2;
        default:
            return assertNever(s); //报错 Argument of type 'Triangle' is not assignable to parameter of type 'never'.
    }
    return ;
}

```


### this
在ts中，this也是一种类型
```ts
class Counter{
    constructor(public count:number = 0){}
    add(value:number){
        this.count +=value;
        return this;
    }
    subtract(value:number){
        this.count -= value;
        return this;
    }
}

let counter = new Counter(10);
console.log(counter.count);
counter.add(5).subtract(2);
console.log(counter.count);

```
当使用extends继承这个类来扩展时，添加一些方法，依然返回this，使用链式调用时，在1.7版本之前就会产生问题。
```ts
class Counter{
    constructor(public count:number = 0){}
    add(value:number){
        this.count +=value;
        return this;
    }
    subtract(value:number){
        this.count -= value;
        return this;
    }
}

class PowerCounter extends Counter{
    constructor(public count = 0){
        super(count);
    }
    pow(value:number){
        this.count = this.count ** value;
        return this;
    }

}

let powCounter = new PowerCounter(10);
powCounter.pow(2).subtract(3).add(1);
console.log(powCounter.count);

```

对于一个对象而言，对象属性值可以是函数，也可以叫做方法，在方法内访问this，默认是当前对象的引用。this类型就是这个对象的字面量类型。
```ts
let info = {
    name:"lvanboy",
    getName(){
        return this.name;
    }
}
```
但如果显示指明这个this表示某个对象,若这个访问这个对象没有的属性，将报错
```ts
let info = {
    name:"lvanboy",
    getName(this:{age:18}){
        return this.name; //Property 'name' does not exist on type '{ age: 18; }'.
    }
}

```

当对象字面量具有ThisType<T>指定类型时，此时的this就是T
```ts
type ObjectDescriptor<D,M> ={
    data?:D;
    methods?:M & ThisType<D&M>;
}

function makeObject<D,M>(desc:ObjectDescriptor<D,M>):D&M{
    let data = desc.data || {};
    let methods = desc.methods || {};
    return {...data,...methods} as D&M;
}

let obj = makeObject({
    data:{x:0,y:0},
    methods:{
        moveBy(dx:number,dy:number){
            this.x = dx;
            this.y = dy;
        }
    }
})
obj.x = 10;
obj.y = 11;
obj.moveBy(5,5);

```
当对象不包含ThisType<T>指定的上下文，那么this的上下文，为普通情况下的this。上例若去去掉ThisType<D&M>;此时的this表示methods这个对象，这个对象this没有x和y的；



### 索引类型查询连接符
使用keyof关键字，连接一个类型，返回一个由类型所有的属性组成的联合类型
```ts
interface Info{
    name:string;
    age:number;
}
let infoProp:keyof Info;
infoProp = "name";
infoProp = "age";
infoProp = "xx";  //报错 Type '"xx"' is not assignable to type '"name" | "age"'.

```

结合泛型使用，Ts可以检查使用动态属性名
```ts
function getValue<T,K extends keyof T>(obj:T,names:K[]):T[K][]{
    return names.map(n =>obj[n]);
}
const info = {
    name:"lvanboy",
    age:18
}

let values:string[] = getValue(info,["name"]);
values = getValue(info,["age"]);//报错 Type 'number[]' is not assignable to type 'string[]'.
```

### 索引访问操作符
使用[]，和访问对象属性一样的语法，TS中可以用来访问某个属性的类型
```ts
interface Info{
    name:string;
    age:number;
}
type nameType = Info["name"];
let name:nameType = 11; //报错 Type '11' is not assignable to type 'string'.

```
```ts
function getProperty<T,K extends keyof T>(o:T,name:K):T[K]{
    return o[name];
}

```
结合接口
```ts
interface Obj<T>{
 [key:number]:T
}
const keys:keyof Obj<number> = 1; //keys类型为number

```

使用访问操作符，获取索引签名的类型
```ts
interface Obj<T>{
    [key:string]:T
}
let obj:Obj<number> = {
    age:18
}

let value:Obj<number>['age'] = 1;

```


### 映射
通过映射可以得到新的类型，借助已有类型创建新类型的方式。
```ts
interface Info{
    age:number;
    name:string;
}

type ReadonlyType<T> = {readonly [P in keyof T]:T[P]};
type ReadonlyInfo = ReadonlyType<Info>;
let info:ReadonlyInfo = {
    age:18,
    name:"string"
}
info.age = 11;//报错 Cannot assign to 'age' because it is a read-only property.
```

同理，可创建每个属性都可选的接口
```ts
interface Info{
    age:number;
    name:string;
}

type ReadonlyType<T> = {readonly [P in keyof T]?:T[P]};
type ReadonlyInfo = ReadonlyType<Info>;
let info:ReadonlyInfo = {};
```
TS内部使用for...in，定义映射类型，这里涉及三个部分：
1. 类型变量，上例是P，好似for...in中定义的变量
2. 属性名联合：上例是keyof T,返回对象T的属性名联合
3. 属性的结果：上例是T[P]

TS内置提供了这两种常见的映射类型，分别为Readonly和Partial，还有Pick和Record，实现如下：
```ts
type Pick<T,K extends keyof T> = {[P in K]:T[P]}
type Record<K extends keyof any,T> = {[P in K]:T}
```

Pick使用方式,返回包含已有对象键值的新的对象
```ts
interface Info{
    name:string;
    age:number;
    address:string;
}
const info:Info = {
    name:"lvanboy",
    age:19,
    address:"shanghai"
}

function pick<T,K extends keyof T>(obj:T,keys:K[]):Pick<T,K>{
    let res = {} as Pick<T,K>;
    keys.forEach(key=>{
        res[key] = obj[key];
    })
    return res;
}

const nameAndAddress = pick(info,["name","age"]);
```

Record使用方式，适用将已有对象每个值转换成其他值的场景
```ts
function mapObject<K extends string|number,T,U>(obj:Record<K,T>,f:(x:T)=>U):Record<K,U>{
    let res = {} as Record<K,U>;
    for(const key in obj){
        res[key] = f(obj[key]);
    }
    return res;
}

let names = {0:"hello",1:"world",2:"bye"};
const lengths = mapObject(names,s => s.length);
```

Readonly、Partial、Pick是同态，而Record不是。Record映射出的对象属性是新的，和输入值的属性值不同。同态：两个相同类型的代数结构之间的结构保持映射。


### 映射类型推断
使用映射类型包装一个类型的属性后，也可以逆向操作，称为拆包。

```ts
//包装
type Proxy<T> = {
    get():T;
    set(value:T):void;
}

type Proxify<T> = {[P in keyof T]:Proxy<T[P]>};

function proxify<T>(obj:T):Proxify<T>{
    let result = {} as Proxify<T>;
    for(const key in obj){
        result[key] = {
            get:() => obj[key],
            set:value => obj[key] = value
        }
    }
    return result;
}

let props = {
    name:"lvanboy",
    age:18
}
let proxyProps = proxify(props);
console.log(proxyProps.name.get());
proxyProps.name.set("xx");

//拆包
function unproxify<T>(t:Proxify<T>):T{
    let result = {} as T;
    for(const k in t){
        result[k] = t[k].get()
    }
    return result;
}

let originalProps = (proxyProps)

```

TS2.8为映射扩展了添加或者移除特定修饰符的能力。使用+或者-来代表增加或者删除修饰符
```ts
interface Info{
    name:string;
    age:number;
}

type ReadonlyInfo<T>  = {+readonly [P in keyof T]+?:T[P]};
let info:ReadonlyInfo<Info> = {
    name:"lvanboy"
}
info.name = "";//报错 Cannot assign to 'name' because it is a read-only property.

```

```ts
interface Info{
    name:string;
    age:number;
}

type RemoveModifier<T>  = {-readonly [P in keyof T]-?:T[P]};
type InfoType = RemoveModifier<Readonly<Partial<Info>>>
let info:InfoType = {
    name:"lvanboy"
}

let info2:InfoType = {
    name:"lvanboy",
    age:12
}
info2.age = 18;

```

在ts2.9中，keyof和映射类型支持使用number和symbol命名的属性。
```ts
const stringIndex = "a";
const numberIndex = 1;
const symbolIndex = Symbol();
type Obj = {
    [stringIndex]:string;
    [numberIndex]:number;
    [symbolIndex]:symbol;
}

type keys = keyof Obj;
let key:keys = 1;
key = "a";
key =  symbolIndex;
key = 2; //报错 Type '2' is not assignable to type '"a" | 1 | unique symbol'.
key = "b"; //报错
key = Symbol(); //报错 

```

```ts
const stringIndex = "a";
const numberIndex = 1;
const symbolIndex = Symbol();
type Obj = {
    [stringIndex]:string;
    [numberIndex]:number;
    [symbolIndex]:symbol;
}
type ReadonlyType<T> = {readonly [P in keyof T]?:T[P]}
let obj:ReadonlyType<Obj> = {
    a:"111",
    1:111,
    [symbolIndex]:Symbol()
}
obj.a = '222'; //报错 Cannot assign to 'a' because it is a read-only property.
obj[1] = 222;  //报错
obj[symbolIndex] = Symbol(); //报错

```

元组和数组上的映射类型
在元组和数组上的映射类型不会产生新的元组和数组，并不会创建新类型；这个类型上会具有push、pop等数组方法和属性。
```ts
type MaptoPromise<T> = {[K in keyof T]:Promise<T[K]>}
type Tuple = [number,string,boolean];
type promiseTuple = MaptoPromise<Tuple>;
let tuple: promiseTuple = [
    new Promise((resolve,reject)=>resolve(1)),
    new Promise((resolve,reject)=>resolve("a")),
    new Promise((resolve,reject)=>resolve(false))
];

```

### unknown
TS3.0新增unknow类型，它相对any来说是安全的。
1. 任何类型的值都可以给unknown类型
```ts
let value1:unknown;
value1 = "1";
value1 = false;
```
2. 如果没有类型断言或基于控制流的类型细化时unknown不能赋值给其他类型，此时只能赋值给unknown或者any;
```ts
let value1:unknown;
let value2:unknown;
let value3:string = value2; //报错 Type 'unknown' is not assignable to type 'string'.
value1 = value2;
```
3. 如果没有类型断言或者基于控制流的类型细化，则不能进行任何运算操作
```ts
let value4:unknown;
value4 = 1;
value4+=1;

```

4. unknown与任何其他类型组成交叉类型，最后都等于其他类型
```ts
type type1 = unknown & string; //string
type type2 = number & unknown; //number
type type3 = unknown & unknown; //unknown
type type4 = unknown & string[]; //string[]
```

5. unknown与其他类型组成联合类型，都等于unknown类型，但any除外，unknown与any联合等于any
```ts
type type5 = string | unknown; //unknown
type type6 = any | unknown; //any 
type type7 = number[] | unknown; //unknown
```

6. never类型是unknown的子类型
```ts
type type8 = never extends unknown ? true : false; //true

```

7. keyof unknown等于类型never
```ts
type type9 = keyof unknown; //never

```
8. 只能对unknown进行等或不等操作
```ts
let value1:unknown;
let value2:unknown;
value1 === value2;
value2 !== value1;
value1 += value2; //报错 Object is of type 'unknown'.
```

9. unknown类型的值不能访问其属性、作为函数调用、创建实例
```ts
let value5:unknown;
value5.age; //报错
value5(); //报错
new value5(); //报错
```

10. 使用映射类型时，如果遍历是unknown类型，则不会映射任何类型；
```ts
type Types<T> = {[P in keyof T]:number}
type type10 = Types<any>; // {[x:string]:number}
type type11 = Types<unknown>; //type10 => {}
```

在实际使用中，尽量不要使用any，而使用unknown代替，避免类型导致的运行错误。


### 条件类型
条件类型ts2.8引入的，语法上像三元操作符，他会以条件表达式进行类型关系检查，从中选择一种类型
```ts
//基本形式
T extends U ? X:Y;
//
type Type<T> = T extends string | number;
let index:Type<'a'>; //string
let index2:Type<false>;//number
```

分布式条件类型
当待检测类型为联合类型，则该条件类型被称为“分布式联合类型”，在实例化时自动分发成联合类型
```ts
type Type<T> = T extends any ? T :never;
type Type1 = Type<string|number> ; //string|number;

```
条件增加类型的灵活性
```ts
type TypeName<T> = T extends string? string:
                    T extends number? number:
                    T extends boolean ? boolean :
                    T extends undefined ? undefined:
                    T extends Function ? Function:
                    object;

type Type1 = TypeName<()=>{}>; //Function
type Type2 = TypeName<string[]>; //object
type Type3 = TypeName<(()=>void)|string[]>;//object|Function
```

分布式条件类型实际应用
```ts
type Diff<T,U> = T extends U? never:T;
type Test = Diff<string|number|boolean,undefined|number>;//string,boolean;

```

条件类型和映射结合的例子
```ts
type Type<T> = {[K in keyof T]:T[K] extends Function ? K :never}[keyof T]
interface Part{
    id:number;
    name:string;
    subparts:Part[];
    updatePart(newName:string):void;
}

type Test = Type<Part>
let a:Test = "updatePart"

```

条件类型的类型推断
条件类型提供一个infer关键字用来推断类型；假设定义一个条件类型，传入类型是数组，则返回数组元素的类型，如果是普通类型，则直接返回。如果不使用infer
```ts
//T[number] 索引访问类型
type Type<T> = T extends any[] ? T[number]:T;
type test = Type<string[]> //string
type test2 = Type<number> //number

```
使用infer
```ts
//这里定义一个U接收数组的推断类型
type Type<T> = T extends Array<infer U>?U:T;
type test = Type<string[]>; //string
type test2 = Type<string>;//string

```
TS3.11.4预定义条件类型
Exclude<T,U>从T中去掉赋值给U的类型
```ts
type Type = Exclude<"a"|"b"|"c","a"|"b">;//Type => c
type Type2 = Exclude<string|number|boolean,string|number>; //Type2 => boolean

```

Extract<T,U>,选取T中可以赋值给U的类型,（T和U中的交集）
```ts
type Type = Extract<"a"|"b"|"c","a"|"c"|"f"> //type => a,c
type Type2 = Extract<number|string|boolean,string|boolean> //string|boolean
```

NonNullable,从T中去掉null和undefined
```ts
type Type = NonNullable<string|number|undefined|null> //string|number

```

ReturnType,获取函数类型返回值
```ts
type Type = ReturnType<()=>string> //string

type Type2 = ReturnType<(arg:number)=>void> //void

```

InstanceType,获取构造函数实例类型
InstanceType实现
```ts
type InstanceType<T extends new (...args:any[]) => any> = T extends new (...args:any[]) => infer R?R:any;

```
使用InstanceType
```ts
class A{
    constructor(){

    }
}
//typeof A 返回的是类A的类型
type T1 = InstanceType<typeof A>;
type T2 = InstanceType<any>;
type T3 = InstanceType<never>;
type T4 = InstanceType<string>; //报错 Type 'string' does not satisfy the constraint 'new (...args: any) => any'.

```

### 装饰器
装饰器能够作用于 类声明，方法，访问符，属性和参数上，使用@符号来定义，@expression，expression必须是一个函数或者求值后为函数，在运行时比调用，并将参数传入函数中。所有的装饰器不能用在d.ts中，或者其他外部上下文中。


装饰器工厂
```ts
function setProp(){
    return function (target){
        //...
    }
}
@setProp();
```

装饰器组合
装饰器可以组合，也就是对于同一个目标，引用多个装饰器
@setName @setAge @target
@setName
@setAge
@target

多的装饰器的执行顺序
```ts

function setName(){
    console.log("get setName");
    return function(target){
        console.log("setName");
    }
}

function setAge(){
    console.log("get setAge");
    return function(target){
        console.log("setAge");
    }
}
@setName()
@setAge()
class Test{}
//打印结果
/*
get setName
get setAge
setAge
setName

*/

```

装饰器求值
类的定义中不通声明上的装饰器的按以下规定的顺序引用
1. 参数装饰器、方法装饰器、访问符装饰器、属性装饰器应用到每个实例成员
2. 参数装饰器、方法装饰器、访问符装饰器、属性装饰器应用到每个静态成员
3. 参数装饰器应用到构造函数
4. 类装饰器应用到类



类装饰器

```ts
let sign = null;
function setName(name:string){  
    return function(target:Function){
        sign =target;
        console.log(target.name) //Info
    }
}
@setName("lison");
class Info{
    constructor(){}
}

console.log(sign === Info); //true
console.log(sign === Info.prototype.constructor) //true

```

通过构造器，修改类的原型对象和构造函数
```ts
function addName(constructor:{new ():any}){
    constructor.prototype.name = "lvanboy";
}
@addName
class A{};
const a = new A();
console.log(a.name) //报错 Property 'name' does not exist on type 'A'.

```
因为类型Aname属性没有定义，报错，导致赋值失败。通过定义A类型的name属性，这样就不会报错
```ts
function addName(constructor:{new ():any}){
    constructor.prototype.name = "lvanboy";
}
@addName
class A{};
interface A{
    name:string;
}
const a = new A();
console.log(a.name) 

```

如果装饰器返回一个值，那么这个返回值会替换被装饰的类的声明，利用此特性实现修改类的特性。
```ts
function classDecorator<T extends {new (...args:any[]):{}}>(target:T){
    return class extends target{
        newProperty = "new property";
        hello = "override";
    }
}
@classDecorator
class Greeter{
    property = "property";
    hello:string;
    constructor(m:string){
        this.hello = m;
    }
}
console.log(new Greeter("world"));
/*
        newProperty = "new property";
        hello = "override";
        property = "property";

*/ 

```

如果不实现对原有类的继承，应该是这样
```ts
function classDecorator(target:any){
    return class {
        newProperty = "new property";
        hello = "override";
    }
}
@classDecorator
class Greeter{
    property = "property";
    hello:string;
    constructor(m:string){
        this.hello = m;
    }
}
console.log(new Greeter("world"));
/*
        newProperty = "new property";
        hello = "override";

*/ 

```
如果类构造器有返回值，但不是构造函数，就会报错。

方法装饰器
方法装饰器用来处理类中的方法，可以处理方法的属性描述符，处理方法定义。
方法构造器在运行时当作函数调用，包含3个参数：
1. 装饰静态成员时，是类的构造函数；装饰实例成员时是类的原型对象
2. 成员的名字
3. 成员的属性描述符

```ts
function enumerable(bool:boolean){
    return function(        
        target:any,
        propertyName:string,
        descriptor:PropertyDescriptor){
            console.log(target); //Info的原型对象：{getAge(),constructor()}
            descriptor.enumerable =bool;

    }
}

class Info{
    constructor(public age:number){}
    @enumerable(false);
    getAge(){
        return this.age;
    }
}
const info = new Info(18);
console.log(info)
for(let propertyName in info){
    console.log(propertyName) //只能遍历到age属性
}

```

如果方法装饰器返回一个值，那么会用这个值作为方法的属性描述符对象
```ts
function enumberable(bool:boolean):any{
    return function(
        target:any,
        propertyName:string,
        descriptor:PropertyDescriptor
    ){
        return {
            value:function(){
                return "not age"
            },
            enumberable:bool
        }
    }
}

class Info{
    constructor(public age:number){}
    @enumberable(false)
    getAge(){
        return this.age;
    }
}

let info =new Info(11);
console.log(info.getAge);

```

访问器装饰器
TS不允许同时装饰一个成员的get和set访问器。
访问器装饰器和方法装饰器的参数一样
```ts

function enumerable(bool:boolean){
    return function(        
        target:any,
        propertyName:string,
        descriptor:PropertyDescriptor){
            descriptor.enumerable = bool;
    }
}

class Info{
    private _name:string = "1";
    constructor(name:string){}
    @enumerable(false)
    get name(){
        return this._name;
    }
    set name(name){
         this._name =name;
    }
}


```

属性装饰器
属性装饰器有2个参数，同方法装饰器的前两个参数一样。
```ts
function printPropertyName(target:any,propertyName:string){
    console.log(propertyName)
}
class Info{
    @printPropertyName
    name:string = "lvanboy";
    age:number = 24;
}

```

参数装饰器
参数装饰器前两个参数同方法装饰器，最后一个参数：参数在函数参数列表中的索引
```ts
function required(target:any,propertyName:string,index:number){
    console.log(`修饰的是${propertyName}的第${index + 1}个参数`)
}
class Info{
    name:string = "lvanboy";
    age:number= 24;
    getInfo(prefix:string,@required infoType:Info):any{
        return prefix + "" +  this[infoType]
    }
}

interface Info{
    [key:string]:string|number|Function
}
let info = new Info();
info.getInfo("hah","age");

```

### 模块
TS1.5开始内部模块称作命名空间，外部模块称为模块。
typescript和ES6保持一致，包含顶级import和export的文件都被当作一个模块。
typescript模块除了遵循ES6标准的模块语法外，还有特定语法，用于类型系统兼容多个模块格式。


export
使用export导出声明，而且能够导出的不仅有变量、函数、类；还包括typescript特有的类型别名和接口
```ts
//funInterface.ts
export interface Func{
    (arg:number):string;
}
export class C{
    constructor(){}
}
class B{}
export {B}
export {B as ClassB}

```

导入再导出
```ts
//main.ts
export * from "./moduleB";
export {name} from "./moduleB";
export {name as nameProp} from "./moduleB";

```


import
```ts
import {name} from "./moduleB";
import * as info from "./moduleB";
import {name as nameProp} from "./moduleB";

```

export = ,import = require()
typescript可以将代码编译为commonjs、amd或者其他模块系统代码，同时生成对应的声明文件。typescript为了兼容这两种语法，使得编译后的声明同时支持这两种模块系统；
```ts
//moduleC.ts
class C {}
export = C;

//main.ts
import ClassC = require("./moduleC.ts");
const c = new ClassC();
```

### 命名空间
命名空间的定义实际相当于定义了一个大对象，里面可以定义变量、接口、类、方法等等；如果不适用export关键字导出内容，对外是不可见的。
```ts
//validate.ts
namespace Validation{
    const isLetterReg = /^[A-Za-z]+$/;
    export const isNumber = /^[0-9]+$/;
    export const checkLetter = (text:any)=>{
        return isLetterReg.test(text);
    }
}

```
使用tsc命令编译时，命名空间引入这样写：
```ts
/// <reference path="validate.ts">
let isLetter =  Validation.checkLetter("aaa");
const reg = Validation.isNumber;

```

使用命令`tsc --outFile src/index.js src/index.ts`;

--outFile用于指定输出文件位置,支持amd和system两种模块标准，需要再配置文件中，设置module编译选项。


如果使用webpack加载loader编译，使用正常的export和import即可。
```ts
//validate.ts
export namespace Validation{
    const isLetterReg = /^[A-Za-z]+$/;
    export const isNumber = /^[0-9]+$/;
    export const checkLetter = (text:any)=>{
        return isLetterReg.test(text);
    }
}

//main.ts
import {Validation} from "./validate.ts";
let isLetter =  Validation.checkLetter("aaa");
const reg = Validation.isNumber;
```

同一个命名空间，拆分多个文件，再编译后，依旧会合并为一个文件。
```ts
// LetterValidation.ts
namespace Validation {
  export const isLetterReg = /^[A-Za-z]+$/;
  export const checkLetter = (text: any) => {
    return isLetterReg.test(text);
  };
}
// NumberValidation.ts
namespace Validation {
  export const isNumberReg = /^[0-9]+$/;
  export const checkNumber = (text: any) => {
    return isNumberReg.test(text);
  };
}
// index.ts
/// <reference path="./LetterValidation.js"/>
/// <reference path="./NumberValidation.js"/>
let isLetter = Validation.checkLetter("sdfsd");
const reg = Validation.isNumberReg;

```

使用import关键字给嵌套命名空间取别名
```ts
namespace Shapes {
  export namespace Polygons {
    export class Triangle {}
    export class Squaire {}
  }
}
import polygons = Shapes.Polygons; // 使用 import 关键字给 Shapes.Polygons 取一个别名polygons
let sq = new polygons.Square();

```


### 声明合并
typescript会将名字相同的多个声明合并为一个。
```ts
interface Info{
    name:string;
}
interface Info{
    age:number;
}
let info:Info;
info = {
    name:"lvanboy"; //报错 Property 'age' is missing in type '{ name: string; }' but required in type 'Info'
}
info = {
    name:"lvanboy",
    age:24
}

```
typescript所有声明会创建以下三种实体之一：
1. 命名空间：创建一个对象，对象的属性是再命名空间导出的内容
2. 类型：创建一个类型并赋给一个类型
3. 值:创建一个再JavaScript可以使用的值

![类型](./pic2.png)


合并接口
多个同名接口，如果定义重复属性，并类型不同，则报错
```ts
interface Info{
    name:string;
}
interface Info{
    age:number;
}
interface Info{
    age:string;//报错 Subsequent property declarations must have the same type.  Property 'age' must be of type 'number', but here has type 'string'.
}


```

对于同名函数成员会当作函数重载,后书写的接口具有更高优先级
```ts
interface Res{
    getRes(input:string):number;
}
interface Res{
    getRes(input:number):string;
}

const res :Res ={
    getRes:(input:any):any=>{
        if(typeof input === "string") return input.length;
        return input.toString();
    }
}
console.log(res.getRes("123"))
console.log(res.getRes(123).length);

```


合并命名空间
多个命名空间会将导出内容进行合并
```ts
namespace Validation {
    export const checkNumber = () => {}
}
namespace Validation {
    export const checkString = () => {}
}
//等价于
namespace Validation {
    export const checkNumber = () => {}
    export const checkString = () => {}
}
```

命名空间分别和类、函数、枚举都可以合并,但都必须再命名空间前声明。

命名空间和类
```ts
class Validation {
    checkType() { }
}
namespace Validation {
    export const numberReg = /^[0-9]+$/
    export const stringReg = /^[A-Za-z]+$/
    export const checkString = () => { }
}
namespace Validation {
    export const checkNumber = (value: any) => {
        return numberReg.test(value)
    }
}
console.log(Validation.prototype) // { checkType: fun () {} }
console.log(Validation.prototype.constructor) 
/**
{
    checkNumber: ...
    checkString: ...
    numberReg: ...
    stringReg: ...
}
*/

```
命名空间和函数
再JavaScript中，JavaScript也是对象，可以给函数设置属性；
```ts
function countUp () {
    countUp.count++
}
namespace countUp {
    export let count = 0
}
countUp()
countUp()
console.log(countUp.count) // 2

```

命名空间和枚举
```ts
enum Colors {
    red,
    green,
    blue
}
namespace Colors {
    export const yellow = 3
}
console.log(Colors)
/*
{
    0: "red",
    1: "green",
    2: "blue",
    red: 0,
    green: 1,
    blue: 2,
    yellow: 3 
}
*/


```

### 混入
混入即将两个对象或者类的内容混合起来，实现功能复用，在Vue中使用了mixins这个api，它允许将一些抽离到对象的属性和方法混入到组件。JavaScript混入，通过键值拷贝
```js
class A{
    constructor(){}
    FunA(){
        console.log("A");
    }
}
class B{
    constructor(){}
    FunB(){
        console.log("B");
    }
}
const mixin = (target,from) =>{
    Object.getOwnPropertyNames.forEach(key=>{
        target[key] = from[key];
    })
}
mixin(B.prototype,A.prototype);
const b = new B();
b.FunA();

```
ts中存在类型的概念，直接赋值，缺少类型不行。
```ts
class A{
    isA = false;
    FunA(){
        console.log("A");
    }
}
class B{
    isB = false;
    FunB(){
        console.log("B");
    }
}

class AB implements A,B{
    constructor(){}
    isA:boolean = false;
    isB:boolean = true;
    FunA: () => void = () => {
        
    };
    FunB: () => void = () => {
        
    };
}

function mixin(base:any,from:any[]){
    from.forEach((fromItem)=>[
        Object.getOwnPropertyNames(fromItem.prototype).forEach(key=>{
            base.prototype[key] = fromItem.prototype[key]
        })
    ])
}
//通过 mixins 函数将类 A 和类 B 的原型对象的属性方法赋值给类 AB，因为类 AB 有 funcA 和 funcB 的类型定义，所以可以把 funcA 和 funcB 函数实体赋值给类 AB
mixin(AB,[A,B]);
console.log(AB);
/*
{
    isA: false,
    isB: false,
    __proto__: {
        funcA: f ()
        funcB: f ()
        constructor: f
    }
}
*/

```

### Promise
Ts1.6实验性地支持async函数，typescript这样使用async和await
```ts
interface Res{
    data:{
        [key:string]:any;
    }
}

namespace axios{
    export function post(url:string,config:object):Promise<Res>{
        return new Promise((resolve,rejecct)=>{
            setTimeout(()=>{
                let res:Res = {data:{}}
                if(url === "/login") res.data.user_id = 111;
                else res.data.role = "admin";
                console.log(2);
                resolve(res);
            },100)
        })
    }
}

interface Info{
    username:string;
    password:string;
}

async function loginReq({username,password}:Info){
    try{
        console.log(1);
        const res = await axios.post("/login",{
            data:{
                username,
                password
            }
        })
        console.log(3);
        return res;
    }catch(err){
        throw new Error(err);
    }
}

async function getRoleReq(user_id:number){
    try{
        console.log(1);
        const res = await axios.post("/user_roles",{
            data:{
                user_id,
            }
        })
        console.log(3);
        return res;
    }catch(err){
        throw new Error(err);
    }
}

loginReq({username:"123",password:"123"}).then(res=>{
    const {data:{user_id}} =res;
    getRoleReq(user_id).then(res=>{
        const {data:{
            role
        }} = res;
        console.log(role);
    })
})

```


### tsconfig.js
TS文件配置
```ts
{
    compileOnSave:boolean //编辑保存后，更加ts配置重新生成文件，需要编辑器支持
    files:[] //编译files中配置的文件路径，不能是目录，不支持通配符。
    include:[] //指定编译文件路径，可以是目录，可以是通配符
    exclude:[] //排除编译文件路径，支持目录、文件、通配符
    extends:string //指定其他的tsconfig.js文件继承当前配置，继承文件配置覆盖当前文件定义配置
    compilerOptions：{ //用来配置编译选项
        target:string //指定编译后的版本目标
        module:string //指定要使用的模块标准
        lib:[] //指定要包含中编译中的库文件，不设置lib，则由target决定默认引入库，target：es6,默认引入DOM、ES6、DOM.Iterable和ScriptHost
        allowJs:boolean //是否编译JS文件
        checkJs:boolean //是否检查报告JS文件中的错误
        declaration:boolean //是否在编译时生成相应的.d.ts声明文件
        sourceMap:boolean //编译时是否生成.map文件
        outFile:string //只有module设置amd和system才支持，将输出文件合并为一个文件
        outDir:string //指定输出文件夹
        rootDir:string //指定编译文件的跟目录
        removeComments：boolean //是否将编译后的注释删除
        noEmit:boolean //是否生成编译文件
        importHelpers:boolean //是否引入tslib中的辅助工具函数
        isolatedModules:boolean //是否将每个文件作为单独模块，不可和declaration同时设置
        //和检查相关配置 ，开启后会产生报错
        noImplicitAny:boolean //没有明确设置类型，默认为any
        alwaysStrict: boolean //是否始终以严格模式检查每个模块
        strictNullChecks:boolean //是否null和undefined不能赋值给自身的其他类型；
        strictFunctionTypes:boolean //是否使用函数参数双向协变检查，兼容型的赋值
        strictPropertyInitialization:boolean //是否检查非undefined属性已经在构造函数中初始化
        strictBindCallApply:boolean //是否严格检查bind、call、apply绑定方法的参数类型
        strict:boolean //是否开启所有类型检查，上述的检查项目统一开关
        //额外检查，开启后提示性错误
        noUnusedLocals:boolean //是否检查定义了但是没有使用的的变量
        noUnusedParameters:boolean //是否检查函数中没有使用的参数
        noImplicitReturns:boolean //是否检查函数的返回值
        noFallthroughCasesInSwitch:boolean //是否检查switch没有使用break跳出
        //解析相关
        moduleResolution:['node','classic'] //模块解析策略
        baseUrl:string //设置解析非相对模块的基地址
        paths:object //设置模块名到基于baseUrl的路径映射，为没有声明的第三方文件写声明时，设置如下
        //{*:["./node_modules/@types/*","./typings/*"]}
        rootDirs:[] //编译时，路径列表中的内容都放在同一个文件夹中
        typeRoots:[] //指定声明文件或者声明文件夹路径
        types:[] //指定需要包含的模块
        allowSyntheticDefaultImports:boolean //是否允许没有默认导出的模块进行默认导入
        sourceRoot:"",//指定调试器找typescript文件而不是源文件位置，不会被写进.map
        mapRoot:"",//指定调试器找到映射文件而不是生成文件，指定map文件的跟路径
        inlineSourceMap:boolean //是否将map文件的内容和js文件编译在同一个js文件中
        inlineSources:boolean //是否进一步将.ts文件也包含到输出文件中
        experimentalDecorators:boolean //是否启用实验性的装饰特性
        emitDecoratorMetadata:boolean //是否为装饰器提供元数据支持

    }
}


```

### 识别库文件类型
全局库
在html文件中，通过普通type类型的script标签引入的库文件，如jquery，这就是全局库。在一个库可以作为全局库使用时，需要考虑它是不是UMD模块，如果不是，它就是单纯的全局库。通过源码也可以判断，全局库顶级一般有一个或者多个顶级的var语句或者function声明，判断document和window是否存在的语句。因为将全局库转为UMD库比较容易，所以现在全局库比较少
假设有全局库
```ts
//handle-title.js
function setTitle(title){
   document && ( document.title = title )
}
function getTitle(){
    return (document && document.title || "")
}

let documentTitle = getTitle();

```
为这个全局写一个声明文件handle-title.d.ts，官方为每一种库类型都提供了相应的声明文件模板，全局库的模板时global.d.ts;模板内容如：
```ts
//有一个全局暴露的函数，他可能可以传入不同类型的参数，返回不同的值，所以可以为它定义函数重载
declare function myLib(a:string):string;
declare function myLib(a:number):number;

//想要让这库称为一个类型，通过定义接口
declare interface myLib{
    name:string;
    length:number;
    extras?:string[];
}

// 如果这个库有一些需要在全局暴露的属性，可以定义这个命名空间，将值、接口和类型别名等定义在这里
// 这样，在下面命名空间中没有列出的内容，通过myLib.xxx访问时在编译阶段会报错，但是运行时是可以访问的，只要这个JS库里定义了。
declare namespace myLib{
    let timeout:number;
    const version:string;
    class Cat{
        constructor(){}
        readonly age:number;
        purr():void;
    }
    interface CatSettings{
        weight:number;
        name:string;
        tailLength?:number;
    }
    type VetID = string|number;
    function catCheck(c:Cat,s?:VetID)
}


```

同理，handle-title.d.ts声明文件内容应该是：
```ts
//handle-title.d.ts
declare function setTitle(title:string|number):void;
declare function getTitle():string;
declare let documentTitle:string;

```
通过在tsconfig中设置include引入src下的所有声明文件
```ts
{
    ...
    "include":[
        "./src/**/*.ts",
        "./src/**/*.d.ts"
    ]
}

```

模块化库
模块化库依赖模块解析器，如commonjs或者ES6。在模块库中，一般会看到require或define方法；
还有import * as a from "b"或者export c;赋值给exports.someName或者module.exports.
针对模块，官方有三个模板声明文件，module.d.ts、module-class.d.ts 和 module-function.d.ts


UMD库
UMD 库将全局库和模块库的功能进行了结合，它会先判断环境中有没有模块加载器的一些特定方法。如果有，说明是模块加载器环境，UMD 库就会使用模块的方式导出；如果没有检测到这些方法，则会将内容添加到全局环境。一般你会在 UMD 库中看到这种逻辑判断：
```ts
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["libName"], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory(require("libName"));
  } else {
    root.returnExports = factory(root.libName);
  }
})(this, function(b) {
  // ...
});

```

## 不同库类型的声明文件书写
模块插件或者umd插件，使用官方模板module-plugin.d.ts

全局插件，往往修改全局中的一些对象，在这些对象上添加或者修改方法，比如下面的示例：
```js
// add-methods-to-string.js
String.prototype.getFirstLetter = function(){
    return this[0];
}

```

在html中使用，直接引入add-methods-to-string.js即可使用，如果在ts中使用，就需要书写声明文件，如global-plugin.d.ts
```ts
//global-plugin.d.ts
interface String{
    getFirstLetter():number;
}
//index.ts
var str = "lvanboy";
console.log(str.getFirstLetter());

```


修改全局的模块
还有影响全局的模块，这些模块除了导出内容，还直接修改全局对象;可以参数官方模块 global-modifying-module.d.ts
下面是示例：
```js
//add-methods-to-string
String.prototype.getFirstLetter = function(){
    return this[0];
}

//index.js
require("add-methods-to-string");
const name = "lvanboy";
console.log(name.getFirstLetter());

```
在ts中使用，声明文件global-modifying-module.d.ts
```ts
declare global{
    interface String{
        getFirstLetter():number;
    }
}
export {};

```


使用依赖
一个库一般都会依赖其他库，这时候就需要声明对其他库的依赖，从而加载其他库的内容。
如果是全局依赖库库，使用`///<reference types="UMDModuleName" />`指定加载某个全局库
```ts
///<reference types="globalLib">
function func():globalLib.someName;
```
如果是依赖模块库，使用import语句
```ts
import * as moment from "moment"; //避免没有默认导出的模块
function func():moment;
```
全局库依赖UMD库，使用`///<reference types="UMDModuleName" />`引入
模块或者UMD库依赖另一个UMD库，使用`import * as`引入

注意
1. 全局库声明，全局范围定义大量类型，可能导致命名冲突，将定义放入命名空间内。
2. 如果一个新模块不想花时间为这个模块写声明，TS2.0支持了快捷外部声明，例如为moment书写外部声明，在typings创建moment文件夹，创建index.d.ts声明文件：
```ts
declare module "moment";
```

这样就可在ts中使用moment。




























