#  [295. 数据流的中位数](https://leetcode-cn.com/problems/find-median-from-data-stream/)

## 题意



## 题解



```c++
class MedianFinder {
public:
    priority_queue<int> lo;
    priority_queue<int, vector<int>, greater<int>> hi;
    /** initialize your data structure here. */
    MedianFinder() {}
    
    void addNum(int num) {
        lo.push(num);
        hi.push(lo.top());
        lo.pop();
        if(lo.size() < hi.size()) {
            lo.push(hi.top());
            hi.pop();
        }
    }
    
    double findMedian() {
        return lo.size() > hi.size() ? lo.top() : (lo.top() + hi.top())/2.0;
    }
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * MedianFinder* obj = new MedianFinder();
 * obj->addNum(num);
 * double param_2 = obj->findMedian();
 */
```



```python3

```

