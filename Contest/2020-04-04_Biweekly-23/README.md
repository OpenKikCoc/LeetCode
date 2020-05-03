## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-23/)


### [1399. 统计最大组的数目](https://leetcode-cn.com/problems/count-largest-group/)

求1-n每个整数10进制下数位和 把数位和相同的放一个组 求并列数目最多的组的个数

计算位数即可 最后统计

```c++
class Solution {
public:
    int check(int n) {
        int res = 0;
        while(n) {
            res += n%10;
            n /= 10;
        }
        return res;
    }
    int countLargestGroup(int n) {
        vector<int> cnt(40);
        for(int i = 1; i <= n; ++i) {
            int v = check(i);
            ++cnt[v];
        }
        int res = 0, maxv = 0;
        for(int i = 0; i < 40; ++i) {
            if(cnt[i] > maxv) {
                maxv = cnt[i];
                res = 1;
            } else if(cnt[i] == maxv) ++res;
        }
        return res;
    }
};
```


### [1400. 构造 K 个回文字符串](https://leetcode-cn.com/problems/construct-k-palindrome-strings/)

给你一个字符串 `s` 和一个整数 `k` 。请你用 `s` 字符串中 **所有字符** 构造 `k` 个非空 **回文串** 。 可以构造返回true 否则false

首先统计各个字母出现个数 个数为奇数的数量即最少的回文串个数

```c++
class Solution {
public:
    bool canConstruct(string s, int k) {
        vector<int> cnt(27);
        for(auto c : s) ++cnt[c-'a'];
        int least = 0;
        for(int i = 0; i < 27; ++i) {
            if(cnt[i]&1) ++least;
        }
        int most = s.size();
        return k >= least && k <= most;
    }
};
```

### [1401. 圆和矩形是否有重叠*](https://leetcode-cn.com/problems/circle-and-rectangle-overlapping/)

向量法 取自[知乎](https://www.zhihu.com/question/24251545)

```c++
class Solution {
public:
    bool checkOverlap(int radius, int x_center, int y_center, int x1, int y1, int x2, int y2) {
        double x0 = 0.5*(x1+x2), y0 = 0.5*(y1+y2);
        double px = abs(x0-x_center), py = abs(y0-y_center);
        double qx = x2-x0, qy = y2-y0;
        double ux = max((px-qx), 0.0), uy = max((py-qy), 0.0);
        return sqrt(ux*ux+uy*uy) <= radius;
    }
};
```

投影法

```c++
class Solution {
public:
    bool checkOverlap(int r, int x, int y, int x1, int y1, int x2, int y2) {
        auto incircle = [&](int a,int b) {return (a-x)*(a-x)+(b-y)*(b-y)<=r*r;};
        auto insquare = [&](int a,int b) {return x1<=a && a<=x2 && y1<=b && b<=y2;};
        vector<int> vx{x,x1,x2},vy{y,y1,y2};
        for(int xx:vx) for(int yy:vy) if(incircle(xx,yy) && insquare(xx,yy)) return true;
        return false;
    }
};
```

### [1402. 做菜顺序](https://leetcode-cn.com/problems/reducing-dishes/)

做出每道菜的时间都是 1 单位时间。一道菜的 「喜爱时间」系数定义为烹饪这道菜以及之前每道菜所花费的时间乘以这道菜的满意程度，也就是 time[i]*satisfaction[i] 。顺序随便排，可以舍弃任意菜。返回做完所有菜 「喜爱时间」总和的最大值为多少。

贪心 每次选满意度最高的 然后向后移动(sum) 相当于后面的菜全部又加了后面的菜满意度之和: v + sum

```c++
class Solution {
public:
    int maxSatisfaction(vector<int>& satisfaction) {
        int res = 0, sum = 0, v = 0;
        sort(satisfaction.begin(), satisfaction.end());
        int n = satisfaction.size();
        for(int i = n-1; i >= 0; --i) {
            v = v + sum + satisfaction[i];
            if(v > res) res = v;
            sum += satisfaction[i];
        }
        return res;
    }
};
```

