# [346. 数据流中的移动平均值](https://leetcode.cn/problems/moving-average-from-data-stream/) 

## 题意



## 题解



```c++

```



```python
class MovingAverage:
    def __init__(self, size: int):
        """
        Initialize your data structure here.
        """
        self.q = collections.deque()
        self.size = size
        self.sum = 0

    def next(self, val: int) -> float:
        if len(self.q) == self.size:
            self.sum -= self.q.popleft()
        self.q.append(val)
        self.sum += val
        return self.sum / len(self.q)
            

# Your MovingAverage object will be instantiated and called as such:
# obj = MovingAverage(size)
# param_1 = obj.next(val)
```

