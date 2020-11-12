#  [225. 用队列实现栈](https://leetcode-cn.com/problems/implement-stack-using-queues/)

## 题意



## 题解



```c++
class MyStack {
    queue<int> nums;
public:
    /** Initialize your data structure here. */
    MyStack() {

    }
    
    /** Push element x onto stack. */
    void push(int x) {
        nums.push(x);
        for(int i = 0; i < nums.size()-1; ++i) {
            nums.push(nums.front());
            nums.pop();
        }
    }
    
    /** Removes the element on top of the stack and returns that element. */
    int pop() {
        int num = nums.front();
        nums.pop();
        return num;
    }
    
    /** Get the top element. */
    int top() {
        return nums.front();
    }
    
    /** Returns whether the stack is empty. */
    bool empty() {
        return nums.empty();
    }
};

/**
 * Your MyStack object will be instantiated and called as such:
 * MyStack* obj = new MyStack();
 * obj->push(x);
 * int param_2 = obj->pop();
 * int param_3 = obj->top();
 * bool param_4 = obj->empty();
 */
```



```python3

```

