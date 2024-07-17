## [比赛链接](https://leetcode.cn/contest/weekly-contest-209/)


### [1608. 特殊数组的特征值](https://leetcode.cn/problems/special-array-with-x-elements-greater-than-or-equal-x/)

暴力 可以二分优化

```c++
    int specialArray(vector<int>& nums) {
        int n = nums.size();
        sort(nums.begin(), nums.end());
        for(int v = 0; v <= 1000; ++v) {
            int cnt = 0;
            for(int j = 0; j < n; ++j) if(nums[j] >= v) ++cnt;
            if(cnt == v) return v;
        }
        return -1;
    }
```


### [1609. 奇偶树](https://leetcode.cn/problems/even-odd-tree/)

层次遍历即可

```c++
    bool isEvenOddTree(TreeNode* root) {
        queue<TreeNode*> q;
        int l = 0;
        q.push(root);
        while(!q.empty()) {
            int sz = q.size();
            TreeNode* pre = nullptr, *now;
            for(int i = 0; i < sz; ++i) {
                now = q.front(); q.pop();
                if(l&1 && now->val&1) return false;
                if(!(l&1) && !(now->val&1)) return false;
                if(pre) {
                    if(l&1 && now->val >= pre->val) return false;
                    else if(!(l&1) && now->val <= pre->val) return false;
                }
                pre = now;
                if(now->left) q.push(now->left);
                if(now->right) q.push(now->right);
            }
            ++l;
        }
        return true;
    }
```

### [1610. 可见点的最大数目](https://leetcode.cn/problems/maximum-number-of-visible-points/) [TAG]

思路：计算所有点到location的角度，排序再在后面补，方便循环查找。

需要注意：

1. 自己写的处理大 case 超时，原因在于 for 内部再二分仍然很大。实际上，可以用双指针替代二分搜索，进一步降低复杂度。

2. 关于 pi 的处理，直接写 3.1415926 还会有精度问题，使用 acos(-1.0)

c++ 三角函数:

cos 余弦
sin 正弦
tan 正切
acos 反余弦
asin 反正弦
atan 反正切
atan2 取值范围为 (-pi, pi]



```c++
    int visiblePoints(vector<vector<int>>& points, int angle, vector<int>& location) {
        double pi = acos(-1.0);
        int x = location[0], y = location[1];
        vector<double> ps;
        int same = 0;
        for(auto & p : points) {
            if(p[0] == x && p[1] == y) {++same; continue;}
            ps.push_back(atan2(p[1]-y, p[0]-x));
        }
        sort(ps.begin(), ps.end());
        int n = ps.size();
        for(int i = 0; i < n; ++i) ps.push_back(ps[i] + acos(-1.)*2);
        double t = 1.0 * angle * pi / 180;
        int res = 0;
        for(int i = 0, j = 0; i < n; ++i) {
            while(j < 2*n && ps[j] - ps[i] <= t) ++j;
            res = max(res, j-i);
        }
        return same + res;
    }
```

### [1611. 使整数变为 0 的最少操作次数](https://leetcode.cn/problems/minimum-one-bit-operations-to-make-integers-zero/) [TAG]

递归TODO

题目要求的处理规则其实对应格雷码解码，故直接向零方向解码即可：

```c++
/*
 * 其实这种变为全0的操作就是格雷码为n的解码
 * [格雷码百度百科](https://baike.baidu.com/item/%E6%A0%BC%E9%9B%B7%E7%A0%81)
 * 格雷码→二进制码（解码）：
 * 从左边第二位起，将每位与左边一位解码后的值异或，作为该位解码后的值（最左边一位依然不变）。
 * 依次异或，直到最低位。依次异或转换后的值（二进制数）就是格雷码转换后二进制码的值。
 * eg:n=1110
   1. n的左边第二位：1，与前一位已经解码：1，进行异或，1^1=0，所以数字变成10xx
   2. n的左边第三位：1，与前一位已经解码：0，进行异或，1^0=1，所以数字变成101x
   3. n的左边第四位：0，与前一位已经解码：1，进行异或，0^1=1，所以数字变成1011
   所以答案就是1011B=11D
 */
    int minimumOneBitOperations(int n) {
        int res = 0;
        while(n) {
            res ^= n;
            n /= 2;
        }
        return res;
    }
```
