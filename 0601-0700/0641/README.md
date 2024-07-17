#  [641. 设计循环双端队列](https://leetcode.cn/problems/design-circular-deque/)

## 题意



## 题解



```c++
class MyCircularDeque {
public:
    int hh = 0, tt = 0;
    vector<int> q;

    /** Initialize your data structure here. Set the size of the deque to be k. */
    MyCircularDeque(int k) {
        q.resize(k + 1);
    }

    int get(int x) {
        return (x + q.size()) % q.size();
    }
    
    /** Adds an item at the front of Deque. Return true if the operation is successful. */
    bool insertFront(int value) {
        if (isFull()) return false;
        hh = get(hh - 1);
        q[hh] = value;
        return true;
    }
    
    /** Adds an item at the rear of Deque. Return true if the operation is successful. */
    bool insertLast(int value) {
        if (isFull()) return false;
        q[tt ++ ] = value;
        tt = get(tt);
        return true;
    }
    
    /** Deletes an item from the front of Deque. Return true if the operation is successful. */
    bool deleteFront() {
        if (isEmpty()) return false;
        hh = get(hh + 1);
        return true;
    }
    
    /** Deletes an item from the rear of Deque. Return true if the operation is successful. */
    bool deleteLast() {
        if (isEmpty()) return false;
        tt = get(tt - 1);
        return true;
    }
    
    /** Get the front item from the deque. */
    int getFront() {
        if (isEmpty()) return -1;
        return q[hh];
    }
    
    /** Get the last item from the deque. */
    int getRear() {
        if (isEmpty()) return -1;
        return q[get(tt - 1)];
    }
    
    /** Checks whether the circular deque is empty or not. */
    bool isEmpty() {
        return hh == tt;
    }
    
    /** Checks whether the circular deque is full or not. */
    bool isFull() {
        return get(hh - 1) == tt;
    }
};

/**
 * Your MyCircularDeque object will be instantiated and called as such:
 * MyCircularDeque* obj = new MyCircularDeque(k);
 * bool param_1 = obj->insertFront(value);
 * bool param_2 = obj->insertLast(value);
 * bool param_3 = obj->deleteFront();
 * bool param_4 = obj->deleteLast();
 * int param_5 = obj->getFront();
 * int param_6 = obj->getRear();
 * bool param_7 = obj->isEmpty();
 * bool param_8 = obj->isFull();
 */
```



```python3

```

