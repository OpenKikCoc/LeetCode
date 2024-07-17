#  [376. 摆动序列](https://leetcode.cn/problems/wiggle-subsequence/)

## 题意



## 题解



```c++
// 1. 朴素
class Solution {
public:
    int wiggleMaxLength(vector<int>& nums) {
        int n = nums.size();
        vector<int> up(n + 1), dn(n + 1);
        int res = 0;
        for (int i = 1; i <= n; ++ i ) {
            up[i] = dn[i] = 1;
            for (int j = 1; j < i; ++ j ) {
                //cout << i << " " << j << endl;
                if (nums[i - 1] > nums[j - 1]) up[i] = max(up[i], dn[j] + 1);
                if (nums[i - 1] < nums[j - 1]) dn[i] = max(dn[i], up[j] + 1);
            }
            res = max(res, max(up[i], dn[i]));
        }
        return res;
    }
};

// 2. 优化
class Solution {
public:
    int wiggleMaxLength(vector<int>& nums) {
        int n = nums.size();
        if (n < 2) return n;
        vector<int> up(n + 1), dn(n + 1);
        up[1] = dn[1] = 1;
        for (int i = 2; i <= n; ++ i ) {
            if (nums[i - 1] > nums[i - 2]) {
                up[i] = dn[i - 1] + 1;
                dn[i] = dn[i - 1];
            } else if (nums[i - 1] < nums[i - 2]) {
                up[i] = up[i - 1];
                dn[i] = up[i - 1] + 1;
            } else {
                up[i] = up[i - 1];
                dn[i] = dn[i - 1];
            }
        }
        return max(up[n], dn[n]);
    }
};

// 3. 贪心
class Solution {
public:
    int wiggleMaxLength(vector<int>& nums) {
        int n = nums.size();
        if (n < 2) return n;
        // type > 0 代表上升
        int res = 1, type = 0;
        for (int i = 2; i <= n; ++ i ) {
            if (nums[i - 1] > nums[i - 2] && type <= 0) {
                ++ res;
                type = 1;
            } else if (nums[i - 1] < nums[i - 2] && type >= 0) {
                ++ res;
                type = -1;
            }
        }
        return res;
    }
};
```

```c++
// yxc
// 取两端点以及中间的每一个极值（证明）
class Solution {
public:
    int wiggleMaxLength(vector<int>& nums) {
        nums.erase(unique(nums.begin(), nums.end()), nums.end());
        if (nums.size() <= 2) return nums.size();
        int res = 2;
        for (int i = 1; i + 1 < nums.size(); i ++ ) {
            int a = nums[i - 1], b = nums[i], c = nums[i + 1];
            if (b > a && b > c || b < a && b < c) res ++ ;
        }
        return res;
    }
};
```



```python3

```

