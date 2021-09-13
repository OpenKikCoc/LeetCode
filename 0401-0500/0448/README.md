#  [448. 找到所有数组中消失的数字](https://leetcode-cn.com/problems/find-all-numbers-disappeared-in-an-array/)

## 题意



## 题解

```c++
// 标准写法
class Solution {
public:
    vector<int> findDisappearedNumbers(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; ++ i )
            while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] != nums[i])
                swap(nums[nums[i] - 1], nums[i]);
        vector<int> res;
        for (int i = 0; i < n; ++ i )
            if (nums[i] != i + 1)
                res.push_back(i + 1);
        return res;
    }
};
```


```c++
class Solution {
public:
    vector<int> findDisappearedNumbers(vector<int>& nums) {
        int n = nums.size();
        vector<int> res;
        for (auto x : nums) {
            x = abs(x);
            if (nums[x - 1] > 0) nums[x - 1] *= -1;
        }
        for (int i = 0; i < n; ++ i )
            if (nums[i] > 0) res.push_back(i + 1);
        return res;
    }

    vector<int> findDisappearedNumbers_2(vector<int>& nums) {
        int n = nums.size();
        vector<int> res;
        for (int i = 0; i < n; ++ i )
            while (nums[nums[i] - 1] != nums[i]) swap(nums[nums[i] - 1], nums[i]); 
        for (int i = 0; i < n; ++ i ) if (nums[i] != i + 1) res.push_back(i + 1);
        return res;
    }
};
```



```python
# 一个萝卜一个坑
# 消失的数字是 整理完数组后，不相等的数字的【下标+1】

class Solution:
    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
        n = len(nums)
        res = []
        for i in range(n):
            while nums[nums[i]-1] != nums[i]:
                nums[nums[i]-1], nums[i] = nums[i], nums[nums[i]-1]
        for i in range(n):
            if nums[i] != i+1:
                res.append(i+1)
        return res
```

