#  [475. 供暖器](https://leetcode.cn/problems/heaters/)

## 题意



## 题解



```c++
class Solution {
public:
    const int inf = 0x3f3f3f3f;
    vector<int> cs, ws;
    bool check(int m) {
        // not empty
        int p1 = 0, p2 = 0;
        while (p1 < cs.size() && p2 < ws.size()) {
            int x1 = cs[p1], x2 = ws[p2];
            if (abs(x2 - x1) <= m) ++ p1;
            else ++ p2;
        }
        return p1 == cs.size();
    }
    int findRadius(vector<int>& houses, vector<int>& heaters) {
        cs = houses, ws = heaters;
        sort(cs.begin(), cs.end());
        sort(ws.begin(), ws.end());
        int l = 0, r = inf;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (check(m)) r = m;
            else l = m + 1;
        }
        return l;
    }
};

// ----------------------------------------
// yxc check函数写法
    bool check(int mid) {
        for (int i = 0, j = 0; i < houses.size(); i ++ ) {
            while (j < heaters.size() && abs(heaters[j] - houses[i]) > mid)
                j ++ ;
            if (j >= heaters.size()) return false;
        }
        return true;
    }
```



```python3

```

