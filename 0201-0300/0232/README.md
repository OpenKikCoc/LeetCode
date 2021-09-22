#  [232. 用栈实现队列](https://leetcode-cn.com/problems/implement-queue-using-stacks/)

## 题意



## 题解



```c++
class MyQueue {
    stack<int> in, out;
public:
    /** Initialize your data structure here. */
    MyQueue() {

    }
    
    /** Push element x to the back of queue. */
    void push(int x) {
        in.push(x);
    }
    
    /** Removes the element from in front of queue and returns that element. */
    int pop() {
        if(out.empty()) {
            int tot = in.size(), t;
            while(tot--) {
                t = in.top();
                out.push(t);
                in.pop();
            }
        }
        int t = out.top();
        out.pop();
        return t;
    }
    
    /** Get the front element. */
    int peek() {
        if(out.empty()) {
            int tot = in.size(), t;
            while(tot--) {
                t = in.top();
                out.push(t);
                in.pop();
            }
        }
        int t = out.top();
        //out.pop();
        return t;
    }
    
    /** Returns whether the queue is empty. */
    bool empty() {
        return in.empty() && out.empty();
    }
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * MyQueue* obj = new MyQueue();
 * obj->push(x);
 * int param_2 = obj->pop();
 * int param_3 = obj->peek();
 * bool param_4 = obj->empty();
 */
```



```python
class MyQueue:

    def __init__(self):
        self.A = []
        self.B = []


    def push(self, x: int) -> None:
        while self.B:
            self.A.append(self.B.pop())
        self.A.append(x)


    def pop(self) -> int:
        while self.A:
            self.B.append(self.A.pop())
        return self.B.pop()


    def peek(self) -> int:
        while self.A:
            self.B.append(self.A.pop())
        return self.B[-1]


    def empty(self) -> bool:
        return not self.A and not self.B
```

