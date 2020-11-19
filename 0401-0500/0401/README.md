#  [401. 二进制手表](https://leetcode-cn.com/problems/binary-watch/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<string> readBinaryWatch(int num) {
        vector<string> res;
        char str[10];
        for (int i = 0; i < 1 << 10; i ++ ) {
            int s = 0;
            for (int j = 0; j < 10; j ++ )
                if (i >> j & 1)
                    s ++ ;
            if (s == num) {
                int a = i >> 6, b = i & 63;
                if (a < 12 && b < 60) {
                    sprintf(str, "%d:%02d", a, b);
                    res.push_back(str);
                }
            }
        }
        return res;
    }


    int get(int x) {
        int ret = 0;
        while (x) x = x & (x - 1), ++ ret;
        return ret;
    }
    vector<string> readBinaryWatch_2(int num) {
        unordered_map<int, vector<string>> mp;
        for (int h = 0; h < 12; ++ h )
            for (auto m = 0; m < 60; ++ m ) {
                int c1 = get(h), c2 = get(m);
                char s[10];
                sprintf(s, "%d:%02d", h, m);
                mp[c1 + c2].push_back(s);
            }
        return mp[num];
    }
};
```



```python3

```

