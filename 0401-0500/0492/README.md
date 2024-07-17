#  [492. 构造矩形](https://leetcode.cn/problems/construct-the-rectangle/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> constructRectangle(int area) {
        for (int i = sqrt(area); ; i -- )
            if (area % i == 0)
                return {area / i, i};
        return {};
    }
};

class Solution {
public:
    vector<int> constructRectangle(int area) {
        vector<int> res;
        int top = sqrt(area);
        for (int i = top; i >= 1; -- i ) {
            int j = area / i;
            if (i * j != area) continue;
            res = {j, i};
            break;
        }
        // return res.empty() ? vector<int>{area, 1} : res;
        return res;
    }
};
```



```python3

```

