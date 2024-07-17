#  [335. 路径交叉](https://leetcode.cn/problems/self-crossing/)

## 题意



## 题解



我们分类讨论相交的情况有哪些。一共有三种：

连续的四条边相交：![QQ图片20180628203655.png](https://www.acwing.com/media/article/image/2018/06/28/1_093408127a-QQ%E5%9B%BE%E7%89%8720180628203655.png)

连续的五条边相交：![QQ图片20180628203840.png](https://www.acwing.com/media/article/image/2018/06/28/1_35f2d1f87a-QQ%E5%9B%BE%E7%89%8720180628203840.png)

连续的六条边相交：![QQ图片20180628203957.png](https://www.acwing.com/media/article/image/2018/06/28/1_643568fa7a-QQ%E5%9B%BE%E7%89%8720180628203957.png)

然后遍历整个数组，判断这三种情况即可。

```c++
class Solution {
public:
    bool isSelfCrossing(vector<int>& x) {
        int n = x.size();
        if (n <= 3) return false;
        for (int i = 3; i < n; i ++ ) {
            if (x[i - 1] <= x[i - 3] && x[i] >= x[i - 2]) return true;
            if (i >= 4 && x[i - 3] == x[i - 1] && x[i] + x[i - 4] >= x[i - 2]) return true;
            if (i >= 5 && x[i - 3] >= x[i - 1] && x[i - 1] + x[i - 5] >= x[i - 3] && x[i - 2] >= x[i - 4] && x[i - 4] + x[i] >= x[i - 2])
                return true;
        }
        return false;
    }
};
```



```python3

```

