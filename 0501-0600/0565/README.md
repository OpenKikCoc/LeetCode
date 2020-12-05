#  [565. 数组嵌套](https://leetcode-cn.com/problems/array-nesting/)

## 题意



## 题解



```c++
class Solution {
public:
    int arrayNesting(vector<int>& nums) {
        int n = nums.size();
        vector<bool> vis(n);
        int res = 0;
        for (int i = 0; i < n; ++ i ) if (!vis[i]) {
            int cnt = 0;
            int j = i;
            while (!vis[j]) {
                ++ cnt;
                vis[j] = true;
                j = nums[j];
            }
            res = max(res, cnt);
        }
        return res;
    }
};
```

```c++
class Solution {
public:
    int arrayNesting(vector<int>& nums) {
        int res = 0;
        for (int i = 0; i < nums.size(); i ++ )
            if (nums[i] != -1) {
                int j = i, s = 0;
                while (nums[j] != -1) {
                    s ++ ;
                    int next = nums[j];
                    nums[j] = -1;
                    j = next;
                }
                res = max(res, s);
            }
        return res;
    }
};
```





```python3

```

