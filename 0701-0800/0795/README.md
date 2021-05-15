#  [795. 区间子数组个数](https://leetcode-cn.com/problems/number-of-subarrays-with-bounded-maximum/)

## 题意



## 题解



```c++
class Solution {
public:
    int calc(vector<int> & A, int k) {
        int res = 0, n = A.size();
        for (int i = 0; i < n; ++ i ) {
            if (A[i] > k)
                continue;
            int j = i + 1;
            while (j < n && A[j] <= k)
                j ++ ;
            int len = j - i;
            res += len * (len + 1) / 2;
            i = j - 1; // i = j 也可 因为 j == n || A[j] > k 必成立
        }
        return res;
    }

    int numSubarrayBoundedMax(vector<int>& nums, int left, int right) {
        return calc(nums, right) - calc(nums, left - 1);
    }
};
```



```python3

```

