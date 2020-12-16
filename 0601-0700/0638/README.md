#  [638. 大礼包](https://leetcode-cn.com/problems/shopping-offers/)

## 题意



## 题解



```c++
class Solution {
public:
    // 本质是一个完全背包问题
    // 最多有六个维度 大礼包个物品
    // 直接写 7*10^7 容易超时

    // needs 改为八进制数 方便位运算 避免高维数组
    
    int n;
    vector<vector<int>> f;
    vector<int> price;
    vector<vector<int>> special;

    int dp(int x, int y) {
        if (f[x][y] != -1) return f[x][y];
        if (!x) {
            // 剩余物品散装买
            f[x][y] = 0;
            for (int i = 0; i < n; ++ i ) {
                int c = y >> i * 3 & 7;
                f[x][y] += c * price[i];
            }
            return f[x][y];
        }
        // 不买当前大礼包
        f[x][y] = dp(x - 1, y);
        // 买当前大礼包
        int state = 0;
        // 当前大礼包是 s 
        auto s = special[x - 1];
        for (int i = n - 1; i >= 0; -- i ) {
            int c = y >> i * 3 & 7;
            if (c < s[i]) {
                // 个数超
                state = -1;
                break;
            }
            state = state * 8 + c - s[i];
        }
        if (state != -1)
            // 买后 dp(x, state) + s.back() 其中s.back()大礼包价格
            f[x][y] = min(f[x][y], dp(x, state) + s.back());
        return f[x][y];
    }

    int shoppingOffers(vector<int>& price, vector<vector<int>>& special, vector<int>& needs) {
        this->price = price;
        this->special = special;
        n = price.size();
        f = vector<vector<int>>(special.size() + 1, vector<int>(1 << n * 3, -1));
        int state = 0;
        for (int i = needs.size() - 1; i >= 0; -- i )
            state = state * 8 + needs[i];
        return dp(special.size(), state);
    }
};
```



```python3

```

