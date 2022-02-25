## REACT知识点

### 1. React fiber
#### fiber结构
```javascript
    type Fiber = {
        // 函数组件记录以链表形式存放的hooks信息，类组件存放`state`信息
        memoizedState: any,
        // 将diff得出的结果提交给的那个节点
        return: Fiber | null,
        // 单链表结构 child：子节点，sibling：兄弟节点
        child: Fiber | null,
        sibling: Fiber | null,
        ...
        // 每个workinprogress都维护了一个effect list（很复杂，不会也不耽误我们吃饺子）
        nextEffect: Fiber | null,
        firstEffect: Fiber | null,
        lastEffect: Fiber | null,
        ...
    }
```