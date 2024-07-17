#  [622. 设计循环队列](https://leetcode.cn/problems/design-circular-queue/)

## 题意



## 题解



```c++
class MyCircularQueue {
public:
    int hh = 0, tt = 0;
    vector<int> q;

    /** Initialize your data structure here. Set the size of the queue to be k. */
    MyCircularQueue(int k) {
        q.resize(k + 1);
    }
    
    /** Insert an element into the circular queue. Return true if the operation is successful. */
    bool enQueue(int value) {
        if (isFull()) return false;
        // ATTENTION 循环队列 tt 开区间
        q[tt ++ ] = value;
        if (tt == q.size()) tt = 0;
        return true;
    }
    
    /** Delete an element from the circular queue. Return true if the operation is successful. */
    bool deQueue() {
        if (isEmpty()) return false;
        ++ hh;
        if (hh == q.size()) hh = 0;
        return true;
    }
    
    /** Get the front item from the queue. */
    int Front() {
        if (isEmpty()) return -1;
        return q[hh];
    }
    
    /** Get the last item from the queue. */
    int Rear() {
        if (isEmpty()) return -1;
        int t = tt - 1;
        if (t < 0) t += q.size();
        return q[t];
    }
    
    /** Checks whether the circular queue is empty or not. */
    bool isEmpty() {
        return hh == tt;
    }
    
    /** Checks whether the circular queue is full or not. */
    bool isFull() {
        return (tt + 1) % q.size() == hh;
    }
};

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * MyCircularQueue* obj = new MyCircularQueue(k);
 * bool param_1 = obj->enQueue(value);
 * bool param_2 = obj->deQueue();
 * int param_3 = obj->Front();
 * int param_4 = obj->Rear();
 * bool param_5 = obj->isEmpty();
 * bool param_6 = obj->isFull();
 */
```



```python
"""
1. 用数组模拟 O(1), hh 表示 队列的头， tt 表示 尾
2. 整个队列的有效存储元素的范围是：[hh, t) 【注意：整个过程都是一个  “前闭后开” 区间， 在这个区间内的元素是有效的】
3. 所以 初始状态是 hh == tt = 0, 整个队列其实是空的，因为：[0, 0) 里没有数据
4. 初始化一个队列的最大长度为 k + 1, 这个是为了 用 hh 和 tt 区分 队列的【满】和【空】的状态
5. 定义 hh == tt时：此时队列是空（这里和我们初始化相对应）； (tt + 1) % (k + 1) == hh时，队列是满的
6. 我们也可以用一个额外变量 cnt 来记录队列中元素的个数，这样就队列的最大长度可以为 k。
"""

class MyCircularQueue:

    def __init__(self, k: int):
        # 前闭后开区间，队列是空的
        self.hh, self.tt = 0, 0
        self.q = [0] * (k + 1)

    def enQueue(self, value: int) -> bool:
        if self.isFull():return False 
        # tt 本身是不可大的，所以每次加入数据，就直接把上一轮的 tt 位置赋值就可以，然后再把tt+= 1
        self.q[self.tt] = value
        self.tt += 1
        # 需要做一个边界判断，当 下标 tt == k的时候，越界了，就把 tt 置为0
        if self.tt == len(self.q):
            self.tt = 0 
        return True

    def deQueue(self) -> bool:
        if self.isEmpty():return False
        # 当要取出元素的时候，直接把 队头的指针往后移一位，把那个数移除队列的有效范围呢
        self.hh += 1
        if self.hh == len(self.q):
            self.hh = 0
        return True

    def Front(self) -> int:
        if self.isEmpty():return -1
        return self.q[self.hh]


    def Rear(self) -> int:
        if self.isEmpty():return -1
        t = self.tt - 1
        if t < 0:
            t += len(self.q)
        return self.q[t]


    def isEmpty(self) -> bool:
        return self.hh == self.tt


    def isFull(self) -> bool:
        return (self.tt + 1) % len(self.q) == self.hh



# Your MyCircularQueue object will be instantiated and called as such:
# obj = MyCircularQueue(k)
# param_1 = obj.enQueue(value)
# param_2 = obj.deQueue()
# param_3 = obj.Front()
# param_4 = obj.Rear()
# param_5 = obj.isEmpty()
# param_6 = obj.isFull()
```

