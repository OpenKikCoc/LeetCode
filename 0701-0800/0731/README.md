#  [731. 我的日程安排表 II](https://leetcode.cn/problems/my-calendar-ii/)

## 题意



## 题解



```c++
class MyCalendarTwo {
public:
    map<int, int> S;

    MyCalendarTwo() {
    }
    
    bool book(int start, int end) {
        S[start] ++ , S[end] -- ;
        int sum = 0;
        for (auto [k, v] : S) {
            sum += v;
            if (sum >= 3) {
                S[start] -- , S[end] ++ ;
                return false;
            }
        }
        return true;
    }
};

/**
 * Your MyCalendarTwo object will be instantiated and called as such:
 * MyCalendarTwo* obj = new MyCalendarTwo();
 * bool param_1 = obj->book(start,end);
 */
```



```python3

```

