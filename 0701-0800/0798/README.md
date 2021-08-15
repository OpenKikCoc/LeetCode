#  [798. 得分最高的最小轮调](https://leetcode-cn.com/problems/smallest-rotation-with-highest-score/)

## 题意



## 题解



```c++
class Solution {
public:
    int bestRotation(vector<int>& A) {
        int n = A.size();
        vector<int> b(n + 1);   // 记录每个数不得分的区间
        // i < a[i] 时 a[i] 不得分
        // 故考虑哪些区间不得分
        // 下界： i - k < a[i]  上界：i
        // (i - a[i], i] ==> [i - a[i] + 1, i]
        for (int i = 0; i < n; ++ i ) {
            int l = i - A[i] + 1, r = i;
            if (l >= 0)
                b[l] ++ , b[r + 1] -- ;
            else
                b[0] ++ , b[r + 1] -- , b[l + n] ++ , b[n] -- ;
        }
        int res = INT_MAX, k = 0;
        for (int i = 0, s = 0; i < n; ++ i ) {
            s += b[i];
            if (res > s)
                res = s, k = i;
        }
        return k;
    }
};
```



```python3

```

