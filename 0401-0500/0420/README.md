#  [420. 强密码检验器](https://leetcode-cn.com/problems/strong-password-checker/)

## 题意



## 题解



```c++
class Solution {
public:
    int strongPasswordChecker(string s) {
        int a = 0, b = 0, c = 0, n = s.size(), k = 0;
        for (auto x: s) {
            if (x >= '0' && x <= '9') a = 1;
            else if (x >= 'a' && x <= 'z') b = 1;
            else if (x >= 'A' && x <= 'Z') c = 1;
        }
        k = a + b + c;
        if (n < 6) return max(6 - n, 3 - k);
        else {
            int p = 0;
            int d[3] = {0};
            // 1. 不能连续出现三次 否则必然需要每3个改一次
            //  推导知修改的步数最小 也即修改是最优操作
            //  插入: (k-1)/2 删除: k-2 修改: k/3
            for (int i = 0; i < s.size(); i ++ ) {
                int j = i;
                while (j < s.size() && s[j] == s[i]) j ++ ;
                // 1.1 取值
                int t = j - i;
                p += t / 3;
                // 1.2 所有长度大于等与3的连续段
                // 因为显然有 t/3 是向下取整
                // 故优先把余0的干掉,其次余1的,再次余2的
                if (t >= 3) d[t % 3] ++ ;
                // 更新 i
                i = j - 1;
            }
            if (n <= 20) return max(p, 3 - k);

            // 2. 还需要删
            //  则此时希望尽可能的用删除来覆盖1.1中的修改操作
            int del = n - 20, res = del;
            if (d[0] && del > 0) {
                // 删1个，同时使p减少相同数量
                int t = min(d[0], del);
                del -= t;
                p -= t;
            }
            if (d[1] && del > 0) {
                // 删2个，同时使p减少一半数量
                int t = min(d[1] * 2, del);
                del -= t;
                p -= t / 2;
            }
            if (p && del > 0) {
                // 特殊
                // 删3个
                int t = min(p * 3, del);
                p -= t / 3;
            }
            return res + max(p, 3 - k);
        }
    }
};
```



```python3

```

