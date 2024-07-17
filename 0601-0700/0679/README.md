#  [679. 24 点游戏](https://leetcode.cn/problems/24-game/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<double> get(vector<double>& nums, int i, int j, double x) {
        vector<double> ret;
        for (int k = 0; k < nums.size(); ++ k )
            if (k != i && k != j)
                ret.push_back(nums[k]);
        ret.push_back(x);
        return ret;
    }

    bool dfs(vector<double> nums) {
        if (nums.size() == 1)
            return fabs(nums[0] - 24) < 1e-8;
        for (int i = 0; i < nums.size(); ++ i )
            for (int j = 0; j < nums.size(); ++ j )
                if (i != j) {
                    double a = nums[i], b = nums[j];
                    if (dfs(get(nums, i, j, a + b)))
                        return true;
                    if (dfs(get(nums, i, j, a - b)))
                        return true;
                    if (dfs(get(nums, i, j, a * b)))
                        return true;
                    if (b && dfs(get(nums, i, j, a / b)))
                        return true;
                }
        return false;
    }

    bool judgePoint24(vector<int>& nums) {
        vector<double> a(nums.begin(), nums.end());
        return dfs(a);
    }
};
```

旧代码：

```c++
class Solution {
public:
    double exp = 1e-6;
    double tag = 24;
    bool dfs(vector<double>& nums) {
        if (nums.size() == 0) return false;
        if (nums.size() == 1) return abs(tag - nums[0]) < exp;
        // 挑两个数 四种运算
        for (int i = 0; i < nums.size(); ++ i )
            for (int j = 0; j < nums.size(); ++ j ) if(i != j) {
                vector<double> curnums; // 保存剩余元素
                for (int k = 0; k < nums.size(); ++ k ) if (k != i && k != j) curnums.push_back(nums[k]);
                // add
                curnums.push_back(nums[i] + nums[j]);
                bool f = dfs(curnums);
                if (f) return true;
                curnums.pop_back();
                // sub
                curnums.push_back(nums[i] - nums[j]);
                f = dfs(curnums);
                if (f) return true;
                curnums.pop_back();
                // mul
                curnums.push_back(nums[i] * nums[j]);
                f = dfs(curnums);
                if (f) return true;
                curnums.pop_back();
                // div
                curnums.push_back(nums[i] / nums[j]);
                f = dfs(curnums);
                if (f) return true;
                curnums.pop_back();
            }
        return false;
    }
    bool judgePoint24(vector<int>& nums) {
        vector<double> curnums;
        for(auto v : nums) curnums.push_back(double(v));
        return dfs(curnums);
    }
};
```





```python3

```

