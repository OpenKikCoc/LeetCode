#  [169. 多数元素](https://leetcode-cn.com/problems/majority-element/)

## 题意



## 题解



```c++
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int n = nums.size();
        int res = nums[0], vote = 1;
        for(int i = 1; i < n; ++i) {
            if(nums[i] != res) {
                --vote;
                if(!vote) {
                    vote = 1;
                    res = nums[i];
                }
            } else ++vote;
        }
        return res;
    }
};
```



```python3

```

