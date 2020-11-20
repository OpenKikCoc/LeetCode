#  [454. 四数相加 II](https://leetcode-cn.com/problems/4sum-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    int fourSumCount(vector<int>& A, vector<int>& B, vector<int>& C, vector<int>& D) {
        unordered_map<int, int> cnt;
        for (auto c : C)
            for (auto d : D)
                ++ cnt[c + d];
        int res = 0;
        for (auto a : A)
            for (auto b : B)
                res += cnt[- (a + b)];
        return res;
    }
};
```



```python3

```

