#  [528. 按权重随机选择](https://leetcode.cn/problems/random-pick-with-weight/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> s;
    /*
    Solution(vector<int>& w):s(std::move(w)) {
        partial_sum(s.begin(), s.end(), s.begin());
    }
    */
    Solution(vector<int>& w) {
        s = w;
        for (int i = 1; i < s.size(); ++ i ) s[i] += s[i - 1];
    }
    
    int pickIndex() {
        int x = rand() % s.back() + 1;
        return lower_bound(s.begin(), s.end(), x) - s.begin();
    }
};

/**
 * Your Solution object will be instantiated and called as such:
 * Solution* obj = new Solution(w);
 * int param_1 = obj->pickIndex();
 */
```



```python3

```

