#  [456. 132模式](https://leetcode-cn.com/problems/132-pattern/)

## 题意



## 题解



```c++
class Solution {
public:
/*
这个问题与Knuth所提出来的 stack-sortable permutation 类似，
即判断一个数组是否可以只用一个栈来进行排序，当且仅当它不包含231模式。
而将本问题中的数组逆序，寻找132模式就变成了寻找231模式，
也即判断数组是否可以仅用一个栈来进行排序。
*/
    bool find132pattern(vector<int>& nums) {
        stack<int> stk;
        int right = INT_MIN;
        for (int i = nums.size() - 1; i >= 0; -- i ) {
            if (nums[i] < right) return true;
            while (!stk.empty() && nums[i] > stk.top()) {
                right = max(right, stk.top());
                stk.pop();
            }
            stk.push(nums[i]);
        }
        return false;
    }
};
```



```python3

```

