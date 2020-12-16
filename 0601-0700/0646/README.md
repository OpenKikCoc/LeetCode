#  [646. 最长数对链](https://leetcode-cn.com/problems/maximum-length-of-pair-chain/)

## 题意



## 题解



```c++
class Solution {
public:
    // 选出最多个完全不想交的区间
    int findLongestChain(vector<vector<int>>& pairs) {
        sort(pairs.begin(), pairs.end(), [](vector<int> & a, vector<int> & b){
            return a[1] < b[1];
        });
        int res = 1, end = pairs[0][1];
        for (auto & p : pairs)
            if (p[0] > end)
                ++ res , end = p[1];
        return res;
    }
};
```



```python3

```

