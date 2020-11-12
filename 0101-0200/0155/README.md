#  [155. 最小栈](https://leetcode-cn.com/problems/min-stack/)

## 题意



## 题解



```c++
class MinStack {
public:
    stack<int> s, ms;
    /** initialize your data structure here. */
    MinStack() {
        
    }
    
    void push(int x) {
        s.push(x);
        if(ms.empty() || x <= ms.top()) ms.push(x);
        else ms.push(ms.top());
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



```python3

```

