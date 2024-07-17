#  [480. 滑动窗口中位数](https://leetcode.cn/problems/sliding-window-median/)

## 题意



## 题解



```c++
class Solution {
public:
    int k;
    // r.size() >= l.size()
    multiset<int> left, right;

    double get_medium() {
        if (k % 2) return *right.begin();
        // 这里写double 处理整数溢出
        return ((double)*left.rbegin() + *right.begin()) / 2;
    }
    vector<double> medianSlidingWindow(vector<int>& nums, int _k) {
        k = _k;
        for (int i = 0; i < k; ++ i ) right.insert(nums[i]);
        // 较小的一半压入left
        for (int i = 0; i < k / 2; ++ i ) {
            left.insert(*right.begin());
            right.erase(right.begin());
        }
        vector<double> res;
        res.push_back(get_medium());

        for (int i = k; i < nums.size(); ++ i ) {
            int x = nums[i], y = nums[i - k];

            if (x >= *right.begin()) right.insert(x);
            else left.insert(x);
            if (y >= *right.begin()) right.erase(right.find(y));
            else left.erase(left.find(y));

            while (left.size() > right.size()) {
                right.insert(*left.rbegin());
                // rbegin 必须写find
                left.erase(left.find(*left.rbegin()));
            }
            while (left.size() + 1 < right.size()) {
                left.insert(*right.begin());
                right.erase(right.begin());
            }
            res.push_back(get_medium());
        }
        return res;
    }
};
```



```python3

```

