#  [503. 下一个更大元素 II](https://leetcode-cn.com/problems/next-greater-element-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> nextGreaterElements(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; ++ i ) nums.push_back(nums[i]);
        vector<int> res(n, -1);
        stack<int> st;  // 记录下标
        for (int i = 0; i < 2 * n; ++ i ) {
            while (!st.empty() && nums[st.top()] < nums[i]) {
                if (i - st.top() < n) res[st.top() % n] = nums[i];
                st.pop();
            }
            st.push(i);
        }
        return res;
    }
};


// yxc
class Solution {
public:
    vector<int> nextGreaterElements(vector<int>& nums) {
        int n = nums.size();
        nums.insert(nums.end(), nums.begin(), nums.end());
        stack<int> stk;
        vector<int> res(n);
        for (int i = n * 2 - 1; i >= 0; i -- ) {
            int x = nums[i];
            while (stk.size() && x >= stk.top()) stk.pop();
            if (i < n) {
                if (stk.empty()) res[i] = -1;
                else res[i] = stk.top();
            }
            stk.push(x);
        }
        return res;
    }
};
```



```python3

```

