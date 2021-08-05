#  [155. 最小栈](https://leetcode-cn.com/problems/min-stack/)

## 题意



## 题解

```c++
// yxc
    stack<int> stk, f;
    MinStack() {
    }

    void push(int x) {
        stk.push(x);
        if (f.empty() || f.top() >= x) f.push(x);
    }

    void pop() {
        if (stk.top() <= f.top()) f.pop();
        stk.pop();
    }

    int top() {
        return stk.top();
    }

    int getMin() {
        return f.top();
    }
```


```c++
class MinStack {
public:
    stack<int> s, ms;
    /** initialize your data structure here. */
    MinStack() {
        
    }
    
    void push(int x) {
        s.push(x);
        if (ms.empty() || x <= ms.top())
            ms.push(x);
        else
            ms.push(ms.top());
    }
    
    void pop() {
        s.pop();
        ms.pop();
    }
    
    int top() {
        return s.top();
    }
    
    int getMin() {
        return ms.top();
    }
};

/**
 * Your MinStack object will be instantiated and called as such:
 * MinStack* obj = new MinStack();
 * obj->push(x);
 * obj->pop();
 * int param_3 = obj->top();
 * int param_4 = obj->getMin();
 */
```



```python
# 栈：先进后出；取最小值 应该是取后进去的，栈顶的元素
# 所以维护一个最小栈，保持栈顶元素 永远是最小的。

class MinStack:
    def __init__(self):
        self.A = []
        self.min = []

    def push(self, val: int) -> None:
        self.A.append(val)
        if not self.min or self.min[-1] >= val:
            self.min.append(val)
       
    def pop(self) -> None:
        if self.A[-1] == self.min[-1]:
            self.min.pop()
        self.A.pop()

    def top(self) -> int:
        return self.A[-1]

    def getMin(self) -> int:
        return self.min[-1]


# Your MinStack object will be instantiated and called as such:
# obj = MinStack()
# obj.push(val)
# obj.pop()
# param_3 = obj.top()
# param_4 = obj.getMin()
```

