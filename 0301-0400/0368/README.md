#  [368. 最大整除子集](https://leetcode-cn.com/problems/largest-divisible-subset/)

## 题意



## 题解

```c++
// yxc
class Solution {
public:
    vector<int> largestDivisibleSubset(vector<int>& w) {
        if (w.empty()) return {};
        sort(w.begin(), w.end());
        int n = w.size();
        vector<int> f(n);

        int k = 0;
        for (int i = 0; i < n; i ++ ) {
            f[i] = 1;
            for (int j = 0; j < i; j ++ )
                if (w[i] % w[j] == 0)
                    f[i] = max(f[i], f[j] + 1);
            if (f[k] < f[i]) k = i;
        }

        vector<int> res(1, w[k]);
        while (f[k] > 1) {
            for (int i = 0; i < k; i ++ )
                if (w[k] % w[i] == 0 && f[k] == f[i] + 1) {
                    res.push_back(w[i]);
                    k = i;
                    break;
                }
        }
        return res;
    }
};
```


```c++
class Solution {
public:
    vector<int> largestDivisibleSubset(vector<int>& nums) {
        int n = nums.size(), maxl = 0, end = -1;
        sort(nums.begin(), nums.end());
        vector<int> f(n, 1), last(n, -1), res;
        for (int i = 0; i < n; ++ i ) {
            for (int j = 0; j < i; ++ j ) {
                if (nums[i] % nums[j] == 0 && f[i] <= f[j]) {
                    f[i] = f[j] + 1;
                    last[i] = j;
                }
            }
            if (f[i] > maxl) {
                maxl = f[i];
                end = i;
            }
        }
        for (int i = end; i != -1; i = last[i])
            res.push_back(nums[i]);
        return res;
    }
};
```



```python3

```

