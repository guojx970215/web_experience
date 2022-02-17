/**
 * 1.手写深拷贝
 * @param {*} obj 
 */
function deepClone(obj) {
    if (typeof obj !== 'object' || obj == null) {
        return obj
    }
    let result = (obj instanceof Array) ? [] : {}
    for (let key in obj) {
        if (obj.hasOwnPrioerty(key)) {
            result[key] = deepClone(obj[key])
        }
    }
    return result
}
/**
 * 2.手写防抖
 * @param {*} fn 执行方法
 * @param {*} delay 时间
 */
function debounce(fn, delay = 500) {
    let timer = null
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn()
            timer = null
        }, delay);
    }
}
/**
 * 3.手写节流
 * @param {*} fn 执行方法
 * @param {*} delay 时间
 */
function debounce(fn, delay = 500) {
    let timer = null
    return function () {
        if (timer) {
            return
        }
        timer = setTimeout(() => {
            fn()
            timer = null
        }, delay);
    }
}
/**
 * 4.手写promise
 * @param {*} fn 
 */
function Promise(fn) {
    var state = 'pending'; //状态
    var doneList = []; //结束状态
    var failList = []; //失败状态
    this.then = function (done, fail) {
        switch (state) {
            case 'pending':
                doneList.push(done);
                //每次如果没有推入fail方法，我也会推入一个null来占位
                failList.push(fail || null);
                return this;
                break;
            case 'fulfilled':
                //在fulfilled，执行done()
                done();
                return this;
                break;
            case 'rejected':
                //在rejected，执行fail()
                fail();
                return this;
                break;
        }
    }
    //json格式化
    function tryToJson(obj) {
        var value;
        try {
            value = JSON.parse(obj);
        } catch (e) {
            value = obj;
        }
        return value
    }
    //成功后resolve
    function resolve(newValue) {
        state = 'fulfilled'; //修改状态为fulfilled
        setTimeout(function () {
            var value = tryToJson(newValue);
            for (var i = 0; i < doneList.length; i++) { //循环doneList
                var temp = doneList[i](value);
                if (temp instanceof Promise) {
                    var newP = temp;
                    for (i++; i < doneList.length; i++) {
                        newP.then(doneList[i], failList[i]);
                    }
                } else {
                    value = temp;
                }
            }
        }, 0);
    }
    //失败后reject
    function reject(newValue) {
        state = 'rejected'; //修改状态为rejected
        setTimeout(function () {
            var value = tryToJson(newValue);
            var tempRe = failList[0](value);
            //如果reject里面传入了一个promise，那么执行完此次的fail之后，将剩余的done和fail传入新的promise中
            if (tempRe instanceof Promise) {
                var newP = tempRe;
                for (i = 1; i < doneList.length; i++) {
                    newP.then(doneList[i], failList[i]);
                }
            } else {
                //如果不是promise，执行完当前的fail之后，继续执行doneList
                value = tempRe;
                doneList.shift();
                failList.shift();
                resolve(value);
            }
        }, 0);
    }
    fn(resolve, reject);
}
/**
 * 5.实现一个call
 * 判断调用对象是否为函数，即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
 * 判断传入上下文对象是否存在，如果不存在，则设置为 window 。
 * 处理传入的参数，截取第一个参数后的所有参数。
 * 将函数作为上下文对象的一个属性。
 * 使用上下文对象来调用这个方法，并保存返回结果。
 * 删除刚才新增的属性。
 * 返回结果。
 * @param {*} context 
 */
function call(context) {
    if (typeof this !== "function") {
        console.error("type error");
    }
    // 获取参数
    let args = [...arguments].slice(1),
        result = null;
    // 判断 context 是否传入，如果未传入则设置为 window
    context = context || window;
    // 将调用函数设为对象的方法
    context.fn = this;
    // 调用函数
    result = context.fn(...args);
    // 将属性删除
    delete context.fn;
    return result;
}
/**
 * 实现一个new
 */
class Parent {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    sayName() {
        console.log(this.name);
    }
};
const child = new Parent('echo', 26);
child.sayName() //echo
/**
 * 7.实现call
 * 
 * @param {*} context 
 */
function apply(context) {
    if (typeof this !== "function") {
        throw new TypeError("Error");
    }
    let result = null;
    // 判断 context 是否存在，如果未传入则为 window
    context = context || window;
    // 将函数设为对象的方法
    context.fn = this;
    // 调用方法
    if (arguments[1]) {
        result = context.fn(...arguments[1]);
    } else {
        result = context.fn();
    }
    // 将属性删除
    delete context.fn;
    return result;
}
/**
 * 8.实现一个bind
 * @param {*} context 
 */
function bind(context) {
    if (typeof this !== "function") {
        throw new TypeError("Error");
    }
    // 获取参数
    var args = [...arguments].slice(1),
        fn = this;
    return function Fn() {
        // 根据调用方式，传入不同绑定值
        return fn.apply(
            this instanceof Fn ? this : context,
            args.concat(...arguments)
        );
    };
}
/**
 * 9.手写观察者模式
 * 实现添加/删除/派发更新三个事件
 * 观察者模式存在耦合，主体中存储的是观察者实例，而 notify 方法遍历时调用了观察者的 update 方法
 */
class Subject {
    constructor() {
        this.observers = []
    }
    add(observer) {
        this.observers.push(observer)
        this.observers = [...new Set(this.observers)]
    }
    notify(...args) {
        this.observers.forEach(observer => observer.update(...args))
    }
    remove(observer) {
        let observers = this.observers
        for (let i = 0, len = observers.length; i < len; i++) {
            if (observers[i] === observer) observers.splice(i, 1)
        }
    }
}

class Observer {
    update(...args) {
        // dosomething ....
        console.log(...args)
    }
}

let observer_1 = new Observer() // 创建观察者
let observer_2 = new Observer()
let sub = new Subject() // 创建主体
sub.add(observer_1) // 添加观察者
sub.add(observer_2)
sub.notify('send msg')
/**
 * 手写快排
 * @param {*} arr 
 */
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr
    }
    let left = []
    let right = []
    let quickIndex = Math.floor(arr.length / 2)
    let quickValue = arr.splice(quickIndex, 1)[0]
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < quickIndex) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat(quickValue, quickSort(right))
}
/**
 * 选择排序
 * @param {*} arr 
 */
function selectSort(arr) {
    var len = arr.length;
    var temp;
    for (var i = 0; i < len - 1; i++) {
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[i]) {
                temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
            }
        }
    }
    return arr;
}
/**
 * 手写数组去重
 * 
 * @param {*} a 
 * @param {*} b 
 */
//速率19000ms
function distinct1(a, b) {
    let arr = a.concat(b);
    return arr.filter((item, index) => {
        return arr.indexOf(item) === index;
    })
}
//速率20000ms
function distinct2(a, b) {
    let arr = a.concat(b)
    let result = []
    for (let i of arr) {
        !result.includes(i) && result.push(i)
    }
    return result
}
//速率43ms
function distinct3(a, b) {
    let arr = a.concat(b)
    let result = []
    let obj = {}
    for (let i of arr) {
        if (!obj[i]) {
            result.push(i)
            obj[i] = 1
        }
    }
    return result
}
//速率151ms
function distinct4(a, b) {
    return Array.from(new Set([...a, ...b]))
}
/**
 * 手写数组扁平
 * @param {*} arr 
 */
function flat(arr) {
    let res = []; // 存放扁平化数组
    arr.forEach(item => { // 遍历存入数组
        if (Array.isArray(item)) { // 判断当前元素是否为数组
            // callee 属性是 arguments 对象的一个成员，它表示对函数对象本身的引用
            res = res.concat(arguments.callee(item)); // 递归调用
        } else {
            res.push(item);
        }
    });
    return res;
}
const flat = arr => {
    return arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? myflat(cur) : cur);
    }, []);
};

/**
 * 检测是否是纯对象isPlainObject
 * @param {*} obj 
 */
function isPlainObject(obj){
	var proto, Ctor;
	if(!obj || Object.prototype.toString.call(obj) !== "[object Object]"){
		return false;
	}
	proto = Object.getPrototypeOf(obj);
	if(!proto) return true;
	Ctor = Object.prototype.hasOwnProperty.call(proto, "constructor") && proto.constructor;
	return typeof Ctor === "function" && Function.prototype.toString.call(Ctor) === Function.prototype.toString.call(Object);	
}

/**
 * 对象深合并代码实现：
 * @param {*} obj1 
 * @param {*} obj2 
 */
function deepMerge(obj1, obj2){
	var isPlain1 = isPlainObject(obj1);
	var isPlain2 = isPlainObject(obj2);
	//obj1或obj2中只要其中一个不是对象，则按照浅合并的规则进行合并
	if(!isPlain1 || !isPlain2) return shallowMerge(obj1, obj2);
	//如果都是对象，则进行每一层级的递归合并
	let keys = [
		...Object.keys(obj2),
		...Object.getOwnPropertySymbols(obj2)
	]
	keys.forEach(function(key){
		obj1[key] =  deepMerge(obj1[key], obj2[key]);//这里递归调用
	});
	
	return obj1;
}

