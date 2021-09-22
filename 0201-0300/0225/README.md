#  [225. 用队列实现栈](https://leetcode-cn.com/problems/implement-stack-using-queues/)

## 题意



## 题解

```c++
class MyStack {
public:
    /** Initialize your data structure here. */

    queue<int> q, w;
    MyStack() {

    }

    /** Push element x onto stack. */
    void push(int x) {
        q.push(x);
    }

    /** Removes the element on top of the stack and returns that element. */
    int pop() {
        while (q.size() > 1) w.push(q.front()), q.pop();
        int t = q.front();
        q.pop();
        while (w.size()) q.push(w.front()), w.pop();
        return t;
    }

    /** Get the top element. */
    int top() {
        while (q.size() > 1) w.push(q.front()), q.pop();
        int t = q.front();
        q.pop();
        while (w.size()) q.push(w.front()), w.pop();
        q.push(t);
        return t;
    }

    /** Returns whether the stack is empty. */
    bool empty() {
        return q.empty();
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



```python
class MyStack:

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.q=[]


    def push(self, x: int) -> None:
        """
        Push element x onto stack.
        """
        self.q.append(x)
        n=len(self.q)
        while n>1:
            self.q.append(self.q.pop(0))
            n-=1



    def pop(self) -> int:
        """
        Removes the element on top of the stack and returns that element.
        """
        return self.q.pop(0)


    def top(self) -> int:
        """
        Get the top element.
        """
        return self.q[0]


    def empty(self) -> bool:
        """
        Returns whether the stack is empty.
        """
        return not bool(self.q)



# Your MyStack object will be instantiated and called as such:
# obj = MyStack()
# obj.push(x)
# param_2 = obj.pop()
# param_3 = obj.top()
# param_4 = obj.empty()
```

