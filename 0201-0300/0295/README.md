#  [295. 数据流的中位数](https://leetcode.cn/problems/find-median-from-data-stream/)

## 题意



## 题解

```c++
class MedianFinder {
public:
    priority_queue<int, vector<int>, greater<int>> up;
    priority_queue<int> down;

    /** initialize your data structure here. */
    MedianFinder() {

    }

    void addNum(int num) {
        if (down.empty() || num <= down.top()) {
            down.push(num);
            if (down.size() > up.size() + 1) {
                up.push(down.top());
                down.pop();
            }
        } else {
            up.push(num);
            if (up.size() > down.size()) {
                down.push(up.top());
                up.pop();
            }
        }
    }

    double findMedian() {
        if ((down.size() + up.size()) % 2) return down.top();
        return (down.top() + up.top()) / 2.0;
    }
};
```

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
        if (lo.size() < hi.size()) {
            lo.push(hi.top());
            hi.pop();
        }
    }
    
    double findMedian() {
        return lo.size() > hi.size() ? lo.top() : (lo.top() + hi.top()) / 2.0;
    }
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * MedianFinder* obj = new MedianFinder();
 * obj->addNum(num);
 * double param_2 = obj->findMedian();
 */
```



```python
class MedianFinder:

    def __init__(self):
        """
        initialize your data structure here.
        """
        self.minh = []
        self.maxh = []


    def addNum(self, num: int) -> None:
        heapq.heappush(self.maxh, -num)
        if self.minh and self.minh[0] < - self.maxh[0]:
            minv = heapq.heappop(self.minh)
            maxv = - heapq.heappop(self.maxh)
            heapq.heappush(self.maxh, -minv)
            heapq.heappush(self.minh, maxv)
        if len(self.maxh) > len(self.minh) + 1:
            heapq.heappush(self.minh, -heapq.heappop(self.maxh))


    def findMedian(self) -> float:
        if len(self.maxh) + len(self.minh) & 1:
            return -self.maxh[0]
        else:
            return (-self.maxh[0] + self.minh[0]) / 2



# Your MedianFinder object will be instantiated and called as such:
# obj = MedianFinder()
# obj.addNum(num)
# param_2 = obj.findMedian()
```

