#  [75. 颜色分类](https://leetcode-cn.com/problems/sort-colors/)

## 题意



## 题解



```c++
class Solution {
public:
    void sortColors(vector<int>& nums) {
        for(int i = 0, j = 0, k = nums.size()-1; i <= k;) {
            if(nums[i] == 0) swap(nums[i++], nums[j++]);
            else if(nums[i] == 2) swap(nums[i], nums[k--]);
            else ++i;
        }
    }

    void sortColors2(vector<int>& nums) {
        int n = nums.size();
        int zero = 0, two = n-1;
        int p = 0;
        while(p <= two) {
            if(nums[p] == 0) {
                swap(nums[p++], nums[zero++]);
            } else if(nums[p] == 2) {
                swap(nums[p], nums[two--]);
            } else ++p;
        }
        return;
    }
};
```



```python3

```

