#  [393. UTF-8 编码验证](https://leetcode.cn/problems/utf-8-validation/)

## 题意



## 题解



```c++
class Solution {
public:
    int get(int x, int k) {
        return x >> k & 1;
    }
    bool validUtf8(vector<int>& data) {
        for (int i = 0; i < data.size(); ++ i ) {
            // 1 字节
            if (!get(data[i], 7)) continue;
            int k = 0;
            while (k <= 4 && get(data[i], 7 - k)) ++ k ;
            if (k == 1 || k > 4) return false;
            // 此时 k = n + 1 应为 0
            for (int j = 0; j < k - 1; ++ j ) {
                int t = i + 1 + j;
                if (t >= data.size()) return false;
                // 应为 1,0 开头
                if (!(get(data[t], 7) && !get(data[t], 6))) return false;
            }
            i += k - 1;
        }
        return true;
    }
};
```



```python3

```

