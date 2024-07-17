#  [497. 非重叠矩形中的随机点](https://leetcode.cn/problems/random-point-in-non-overlapping-rectangles/)

## 题意



## 题解

用前缀和算出所有矩形面积的累加，在0-最大面积和范围产生随机数，看当前随机数落在哪个矩形的前缀和区间内，

这样选定矩形，确定矩形是时候使用二分快速确定，确定好当前矩形后，在当前矩形区域生成随机数

矩形面积越大，前缀和所占面积越大，被选中的概率越大

```c++
class Solution {
public:
    int n;
    vector<vector<int>> rects;
    vector<int> s;

    Solution(vector<vector<int>>& _rects) {
        rects = _rects;
        n = rects.size();
        s.push_back(0);
        for (auto& r: rects) {
            int dx = r[2] - r[0] + 1;
            int dy = r[3] - r[1] + 1;
            s.push_back(s.back() + dx * dy);
        }
    }

    vector<int> pick() {
        int k = rand() % s.back() + 1;
        int l = 1, r = n;
        while (l < r) {
            int mid = l + r >> 1;
            if (s[mid] >= k) r = mid;
            else l = mid + 1;
        }
        auto& t = rects[r - 1];
        int dx = t[2] - t[0] + 1;
        int dy = t[3] - t[1] + 1;
        return {rand() % dx + t[0], rand() % dy + t[1]};
    }
};

/**
 * Your Solution object will be instantiated and called as such:
 * Solution* obj = new Solution(rects);
 * vector<int> param_1 = obj->pick();
 */
```



```python3

```

