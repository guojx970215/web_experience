1. #### Transform动画和直接使用Left、Top改变位置有什么优缺点

最首要的区别是元素位置：
**使用 top left 定位是直接改变元素真实位置的，简单来说你 top: 5px 那就真的是离父容器上端 5px 或者偏离顶部定位 5px（这里我们不讨论 position 各种定位的破事）**

但是你用 transform: translateY(-5px) 只是改变了视觉位置，元素本身位置还是在 0px，只是视觉上向上偏移了 5px。这一点对于 css 布局是非常重要的，因为大多数情况下你不希望一个元素在动画的时候（比如飞离 fade off）会导致父元素大小改变然后导致 siblings 元素位置变动从而导致集体 shaking，所以很多时候我们用 transform。

其次的区别是这两种定位本身的语法：

做效果的时候 transform 相对来说是比较方便的，因为 transform 的视角是元素本身，所以比较直观。比如你希望一个元素向左飞 50px 那就是 transform: translateX(-50px)，但是如果用 left 而你的父子元素都是 position: absolute，那可能你用 left 就要写成从 left: 100px 到 left: 30px，这就很不直观。

2. #### 如何判断链表是否有环
（1）.给一个单链表，判断其中是否有环的存在；
主要是利用的「Floyd 判圈算法」（又称龟兔赛跑算法），**首先慢指针每次移动一步，快指针移动2步，如果没有环，那么慢指针永远也追不上快指针。如果有环，那么快指针一定会遇到慢指针**
``` javascript
    var hasCycle = function (head) {
        let fast = head, slow = head;
        // 零个结点或者一个结点，肯定无环
        if (fast.next == null || fast.next.next == null) return false;
        while (fast && fast.next) {
            //走一步
            slow = slow.next;
            //走二步
            fast = fast.next.next;
            if (slow === fast) {
                return true;
            }
        }
        return false;
    };
```

（2）.如果存在环，找出环的入口点；

（3）.如果存在环，求出环上节点的个数；

（4）.如果存在环，求出链表的长度；

（5）.如果存在环，求出环上距离任意一个节点最远的点（对面节点）；

（6）.（扩展）如何判断两个无环链表是否相交；

（7）.（扩展）如果相交，求出第一个相交的节点；

3. #### 介绍二叉搜索树的特点
1.本质是查找所有符合条件的元素，朴素思想是 检查每个元素，本题目中利用规律不断对搜索空间剪枝
2.二叉搜索树的中序遍历是一个有序数组，假设根节点的值为val，则所有比val大的点在右边，比val小的点在左边。

4. #### 介绍暂时性死区
在代码块内，使用let、const命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”
“暂时性死区”也意味着typeof不再是一个百分之百安全的操作

5. #### ES6中的Map和原生的对象有什么区别
object的键的类型是 字符串；
map的键的类型是 可以是任意类型；
object获取键值使用Object.keys（返回数组）；
Map获取键值使用 map变量.keys() (返回迭代器)。

6. #### 讲讲redux
原理
**Redux将整个应用的存储到一个地方（store)，组件可以通过将意图（action)分发到（dispatch）到store，store接收到会将放到reducer来处理，reducer接受旧state和action，处理之后将新state返回，然后通知订阅store的组件改变state来刷新的视图。**

创建redux的store对象，需要调用combineReducers和createStore函数，下面解释不包含中间件。
```javascript
    const reducer = combineReducers({
        home: homeNumber,
        number: addNumber
    })
    const store = createStore(reducer)
    // 暂时挂载在window下，下面会使用到
    window.$reduxStore = store
```

combineReducers函数
首先调用combineReducers函数，将多个reducer函数作为参数传入
```javascript
    function combineReducers(reducers) {
        return function combination(state = {}, action) {
            let hasChanged = false
            const nextState = {}
            for (let i = 0; i < finalReducerKeys.length; i++) {
                // finalReducerKeys 是传入reducers对象的key值
                const key = finalReducerKeys[i]
                // finalReducers 等价于 reducers
                const reducer = finalReducers[key]
                const previousStateForKey = state[key]
                // 运行reducer函数，返回一个state
                // 核心：调用combination函数，实际就是循环调用传入的reducer函数
                const nextStateForKey = reducer(previousStateForKey, action)
    
                nextState[key] = nextStateForKey
                // hasChanged = hasChanged || nextStateForKey !== previousStateForKey
            }
            // hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length
            // 返回state对象
            return nextState
        }
    }
```
**上面的代码其实非常简单，combineReducers函数运行，返回一个新的combination函数。combination函数的主要作用是返回一个挂载全部state的对象。 当combination函数被调用时，实际就是循环调用传入的reducer函数，返回state对象。将combination函数作为参数传入到createStore函数中。**

createStore函数
```javascript
    function createStore(reducer, preloadedState, enhancer) {
        // reducer --> combination函数
        let currentReducer = reducer
        // 全部的state属性，挂载在currentState上
        let currentState = preloadedState
    
        // 下面的中间件会用到
        if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
            // 第二个参数是一个函数，没有第三个参数的情况
            enhancer = preloadedState
            // 将preloadedState重置
            preloadedState = undefined
        }
        if (typeof enhancer !== 'undefined') {
            // 存在中间件时，将createStore传入中间件函数，调用enhancer函数，return结束。
            return enhancer(createStore)(reducer, preloadedState)
        }
    
        function dispatch(action) {
            // currentReducer --> combination函数
            currentState = currentReducer(currentState, action)
        }
    
        // 初始化调用dispatch，创建初始state
        dispatch({ type: ActionTypes.INIT })
    
        const store = ({
            dispatch: dispatch,
            subscribe,s
            getState,
            replaceReducer,
            [$$observable]: observable
        }
        return store
    }
```

**reducer就是传入的combination函数，preloadedState是初始化的state(没有太大的作用)，enhancer是中间件，没有第三个参数enhancer的情况下，同时第二个参数preloadedState是一个函数，preloadedState被赋值给enhancer。**

**调用dispatch函数初始化，currentReducer即是传入combination函数，就向上文提到的，调用combination函数实际就是循环调用reducer函数。所有的state对象，被挂载在内部变量currentState上。存在中间件enhancer时，将createStore传入中间件函数，调用enhancer函数，return结束，这个下文会继续讲到。**

创建的store对象，暴露出的方法如下：
```javascript
    const store = ({
        // 分发 action，这是触发 state 变化的惟一途径。
        dispatch: dispatch as Dispatch<A>,
        // 变化监听器
        subscribe,
        // 获取store下的 全部state
        getState,
        // 替换 store 当前用来计算 state 的 reducer
        replaceReducer
    }
    return store
```

**dispatch函数触发action，调用reducer函数，修改state。subscribe函数可以监听变化state的变化。getState函数获取全部state。replaceReducer函数替换用来计算state的reducer函数。**

**通过combineReducers函数合并reducer函数，返回一个新的函数combination（这个函数负责循环遍历运行reducer函数，返回全部state）。将这个新函数作为参数传入createStore函数，函数内部通过dispatch，初始化运行传入的combination，state生成，返回store对象**


三大原则（官网）
单一数据源
**整个应用state的被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个store中。**

State 是只读的
唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。

使用纯函数来执行修改
为了描述 action 如何改变 state tree，你需要编写 reducers

7. #### Redux中间件是什么东西，接受几个参数（两端的柯里化函数）

8. #### Redux中异步的请求怎么处理

9. #### React怎么做数据的检查和变化

10. #### React-Router怎么实现路由切换

11. #### 介绍观察者模式

12. #### 介绍中介者模式

13. #### 文件上传如何做断点续传

14. #### 路由的动态加载模块

15. #### 服务端渲染SSR

16. #### 介绍路由的History

17. #### 打包时Hash码是怎么生成的

18. #### 随机值存在一样的情况，如何避免

19. #### 使用Webpack构建时有无做一些自定义操作

20. #### Webpack做了什么

21. #### 堆和栈的区别

22. #### 介绍闭包

23. #### 闭包的核心是什么

24. #### HTTPS的加密过程

25. #### 介绍SSL和TLS

26. #### 介绍DNS解析

27. #### 使用Canvas绘图时如何组织成通用组件

28. #### 类数组和数组的区别

29. #### JS是什么范式语言(面向对象还是函数式编程)

30. #### 介绍箭头函数的this

31. #### 介绍Promise和then

32. #### 介绍Localstorage的API

33. #### Html语义化的理解

34. #### <b>和<strong>的区别

35. #### 实现new

36. #### 实现call

37. #### a，b两个按钮，点击aba，返回顺序可能是baa，如何保证是aba（Promise.then）

38. #### Get和Post有什么区别

39. #### React15/16.x的区别

40. #### 重新渲染Render会做些什么

41. #### 哪些方法会触发React重新渲染

42. #### setTimeout(1)和setTimeout(2)之间的区别

43. #### 介绍宏任务和微任务

44. #### 如何实现H5手机端的适配

45. #### Rrem、Flex的区别（Root em）

46. #### em和px的区别

47. #### React声明周期

48. #### 如何去除url中的#号

49. #### CSS选择器有哪些

50. #### 盒子模型，以及标准情况和IE下的区别

51. #### 如何实现高度自适应

52. #### Prototype和Proto区别

53. #### _construct是什么

54. #### 手写数组去重函数

55. #### 手写数组扁平化函数

56. #### 网站SEO怎么处理

57. #### React异步渲染的概念，介绍Time Slicing 和 Suspense

58. #### 介绍纯函数

59. #### 前端怎么做单元测试

60. #### 加上CORS之后从发起到请求正式成功的过程

61. #### Xsrf跨域攻击的安全性问题怎么防范

62. #### 使用Async会注意哪些东西

63. #### Async里面有多个await请求，可以怎么优化（请求是否有依赖）

64. #### Webpack如何配Sass，需要配哪些Loader

65. #### 配CSS需要哪些Loader

66. #### 如何配置把JS、CSS、Html单独打包成一个文件

67. #### Redux的设计思想

68. #### 接入Redux的过程

69. #### 绑定Cconnect的过程

70. #### Cconnect原理

71. #### Webpack介绍

72. #### == 和 ===的区别，什么情况下用相等==

73. #### Bind、Call、Apply的区别

74. #### 动画的了解

75. #### 为什么有时候⽤translate来改变位置⽽不是定位？

76. #### li 与 li 之间有看不见的空白间隔是什么原因引起的？如何解决？

77. #### 为什么0.1+0.2 ! == 0.3，如何让其相等 

78. #### intanceof 操作符的实现原理及实现

79. #### typeof null 的结果是什么，为什么？

80. #### Unicode、UTF-8、UTF-16、UTF-32的区别？

81. #### 为什么函数的 arguments 参数是类数组而不是数组？如何遍历类数组?

82. #### vue-router如何实现路由懒加载（ 动态加载路由 ）
```javascript

```
83. #### vue-router路由的两种模式
```javascript

```
84. #### 如何编译template 模板？
```javascript

```
85. #### vue中proxy代理？
```javascript

```
86. #### Vue 为什么要用 vm.$set() 解决对象新增属性不能响应的问题 ？你能说说如下代码的实现原理么？
```javascript

```
87. #### 讲一下浏览器缓存，什么时候使用本地缓存，什么时候使用协商缓存，什么时候不使用缓存
```javascript

```
88. #### v-model原理
```javascript

```
89. #### 手写 观察者模式 
```javascript

```
90. #### vue react区别
```javascript

```
91. ####  react diff算法
```javascript

```
92. ####  Vue生命周期介绍一下。created和mounted分别做了哪些事情？有哪些区别？DOM在哪里被渲染？
```javascript

```
93. ####  async的关键字原理是什么
```javascript

```
94. ####  手写吸顶逻辑
```javascript

```
95. #### Cache-Control有哪些属性?分别表示什么意思
```javascript

```
96. #### 说一下this指向的各种情况?
```javascript

```
97. #### 双向绑定原理 vue2,vue3
```javascript

```
98. #### xss攻击、csrf攻击
```javascript

```
99. #### 实现一个发布订阅模式 
```javascript

```
100. #### vue data为什么是一个函数而不是对象
```javascript

```

101. #### 柯里化函数两端的参数具体是什么东西
