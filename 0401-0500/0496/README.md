#  [496. 下一个更大元素 I](https://leetcode-cn.com/problems/next-greater-element-i/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
        int n = nums2.size();
        unordered_map<int, int> hash;
        stack<int> st;
        for (int i = 0; i < n; ++ i ) {
            while (!st.empty() && st.top() < nums2[i]) {
                hash[st.top()] = nums2[i];
                st.pop();
            }
            st.push(nums2[i]);
        }
        // while (!st.empty()) hash[st.top()] = -1, st.pop();
        vector<int> res;
        for (auto v : nums1)
            if (hash.count(v)) res.push_back(hash[v]);
            else res.push_back(-1);
        return res;
    }
};
```



```python3

```

