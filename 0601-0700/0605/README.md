#  [605. 种花问题](https://leetcode-cn.com/problems/can-place-flowers/)

## 题意



## 题解



```c++
class Solution {
public:
    bool canPlaceFlowers(vector<int>& flowerbed, int n) {
        //if (!n) return true;
        int res = 0;
        for (int i = 0; i < flowerbed.size(); ++ i ) {
            if (flowerbed[i]) continue;
            int j = i;
            while (j < flowerbed.size() && !flowerbed[j]) ++ j;
            // 连续0的长度
            int k = j - i - 1;
            if (!i) ++ k;
            if (j == flowerbed.size()) ++ k;
            res += k / 2;
            if (res >= n) return true;
            i = j;  // j == f.size() || flowerbed[i] = 1
        }
        return res >= n;
    }
};
```



```python3

```

