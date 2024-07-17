#  [732. 我的日程安排表 III](https://leetcode.cn/problems/my-calendar-iii/)

## 题意



## 题解



```c++
class MyCalendarThree {
public:
    map<int, int> S;
    int ret = 0;

    MyCalendarThree() {
    }
    
    int book(int start, int end) {
        S[start] ++ , S[end] -- ;
        int sum = 0;
        for (auto [k, v] : S) {
            sum += v;
            if (sum > ret)
                ret = sum;
        }
        return ret;
    }
};

/**
 * Your MyCalendarThree object will be instantiated and called as such:
 * MyCalendarThree* obj = new MyCalendarThree();
 * int param_1 = obj->book(start,end);
 */
```



```c++
class MyCalendarThree {
public:
    map<int, int> S;

    MyCalendarThree() {

    }

    int book(int start, int end) {
        S[start] ++ , S[end] -- ;
        int sum = 0, res = 0;
        for (auto [k, v]: S) {
            sum += v;
            res = max(res, sum);
        }
        return res;
    }
};

/**
 * Your MyCalendarThree object will be instantiated and called as such:
 * MyCalendarThree* obj = new MyCalendarThree();
 * int param_1 = obj->book(start,end);
 */
```





```python3

```

