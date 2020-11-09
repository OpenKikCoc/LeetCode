#  [42. 接雨水](https://leetcode-cn.com/problems/trapping-rain-water/)

## 题意



## 题解



```c++
class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size(), res = 0;
        stack<int> s;
        for(int i = 0; i < n; ++i) {
            while(!s.empty() && height[s.top()] < height[i]) {
                int v = s.top(); s.pop();
                if(s.empty()) break;
                int l = s.top();
                res += (min(height[s.top()], height[i]) - height[v]) * (i-l-1);
            }
            s.push(i);
        }
        return res;
    }
};
```



```python3

```

