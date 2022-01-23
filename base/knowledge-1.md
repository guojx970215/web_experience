1. #### Transform动画和直接使用Left、Top改变位置有什么优缺点

最首要的区别是元素位置：
使用 top left 定位是直接改变元素真实位置的，简单来说你 top: 5px 那就真的是离父容器上端 5px 或者偏离顶部定位 5px（这里我们不讨论 position 各种定位的破事）

但是你用 transform: translateY(-5px) 只是改变了视觉位置，元素本身位置还是在 0px，只是视觉上向上偏移了 5px。这一点对于 css 布局是非常重要的，因为大多数情况下你不希望一个元素在动画的时候（比如飞离 fade off）会导致父元素大小改变然后导致 siblings 元素位置变动从而导致集体 shaking，所以很多时候我们用 transform。

其次的区别是这两种定位本身的语法：

做效果的时候 transform 相对来说是比较方便的，因为 transform 的视角是元素本身，所以比较直观。比如你希望一个元素向左飞 50px 那就是 transform: translateX(-50px)，但是如果用 left 而你的父子元素都是 position: absolute，那可能你用 left 就要写成从 left: 100px 到 left: 30px，这就很不直观。

最后的区别是效率：
由于 transform 不改动 css 布局，因为渲染行为大多数情况下在元素本身，所以效率比 top left 要高。另外在早期的一些版本，用 transform: translateZ(0px) 强制开启硬件加速好像只能应用在 transform 上，不知道现在这个东西改了没。

2. #### 如何判断链表是否有环



3. #### 介绍二叉搜索树的特点

4. #### 介绍暂时性死区

5. #### ES6中的Map和原生的对象有什么区别

6. #### Redux中异步的请求怎么处理

7. ### Redux中间件是什么东西，接受几个参数（两端的柯里化函数）

8. #### 柯里化函数两端的参数具体是什么东西

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