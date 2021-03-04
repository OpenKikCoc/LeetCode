## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-230/)


### [1773. 统计匹配检索规则的物品数量](https://leetcode-cn.com/problems/count-items-matching-a-rule/)

略

```c++
class Solution {
public:
    int countMatches(vector<vector<string>>& items, string ruleKey, string ruleValue) {
        int res = 0;
        for (auto & sth : items) {
            string type = sth[0], color = sth[1], name = sth[2];
            if (ruleKey == "type") {
                if (type == ruleValue) ++ res;
            } else if (ruleKey == "color") {
                if (color == ruleValue) ++ res;
            } else {
                if (name == ruleValue) ++ res;
            }
        }
        return res;
    }
};
```


### [1774. 最接近目标价格的甜点成本](https://leetcode-cn.com/problems/closest-dessert-cost/) [TAG]

枚举小技巧

```c++
class Solution {
public:
    int closestCost(vector<int>& a, vector<int>& b, int T) {
        int res = INT_MAX;
        int n = a.size(), m = b.size();
        for (int i = 0; i < n; ++ i ) {
            int s = a[i];
            // 四进制来表示三进制
            for (int j = 0; j < 1 << m * 2; ++ j ) {
                int r = s;
                bool flag = false;
                for (int k = 0; k < m; ++ k ) {
                    int t = j >> k * 2 & 3;
                    if (t == 3) {
                        flag = true;
                        break;
                    }
                    r += b[k] * t;
                }
                if (flag) continue;
                if (abs(r - T) < abs(res - T) || abs(r - T) == abs(res - T) && r < res)
                    res = r;
            }
        }
        return res;
    }
};
```

可以转变为 01 背包

```c++
class Solution {
public:
    int closestCost(vector<int>& baseCosts, vector<int>& toppingCosts, int target) {
        int tt = 20000;
        vector<bool> f(tt + 1, false);
        for (int x: baseCosts)
            f[x] = true;
        for (int x: toppingCosts)
            for (int j = tt; j >= x; --j)
                if (f[j - x])
                    f[j] = true;
        for (int x: toppingCosts)
            for (int j = tt; j >= x; --j)
                if (f[j - x])
                    f[j] = true;
        int ans = tt;
        for (int i = 0; i <= tt; ++i)
            if (f[i])
                if (abs(i - target) < abs(ans - target))
                    ans = i;
        return ans;
    }
};
```

### [1775. 通过最少操作次数使数组的和相等](https://leetcode-cn.com/problems/equal-sum-arrays-with-minimum-number-of-operations/) [TAG]

技巧性

```c++
class Solution {
public:
    // 每次挑选能够变化尽可能大的数值
    int minOperations(vector<int>& nums1, vector<int>& nums2) {
        int n1 = nums1.size(), n2 = nums2.size();
        int s1 = 0, s2 = 0;
        for (auto x : nums1) s1 += x;
        for (auto x : nums2) s2 += x;
        if (s1 < s2)
            swap(s1, s2), swap(n1, n2), swap(nums1, nums2);
        
        // s1 > s2
        // 可以达到的变化量(减少量)
        vector<int> cs(6, 0);
        for (auto x : nums1) cs[x - 1] ++ ;
        for (auto x : nums2) cs[6 - x] ++ ;
        
        int cur = 0, res = 0;
        for (int i = 5; i >= 1; -- i )
            if (cur + i * cs[i] < s1 - s2)
                cur += i * cs[i], res += cs[i];
            else {
                int dif = s1 - s2 - cur;
                int use = (dif + i - 1) / i;
                cur += i * use, res += use;
                break;
            }
        if (cur < s1 - s2) return -1;
        return res;
    }
};
```

### [1776. 车队 II](https://leetcode-cn.com/problems/car-fleet-ii/) [TAG]

合并：后车撞前车，后车消失即可

graham 维护凸包 (下凸壳) 即可

与 dp 的斜率优化略有不同

```c++
using PDD = pair<double, double>;
#define x first
#define y second

class Solution {
public:
    double cross(double x1, double y1, double x2, double y2) {
        return x1 * y2 - x2 * y1;
    }
    
    double area(PDD a, PDD b, PDD c) {
        return cross(b.x - a.x, b.y - a.y, c.x - a.x, c.y - a.y);
    }
    
    vector<double> getCollisionTimes(vector<vector<int>>& cars) {
        int n = cars.size();
        vector<PDD> stk(n + 1);
        vector<double> res(n);
        int top = 0;
        for (int i = n - 1; i >= 0; -- i ) {
            auto & c = cars[i];
            PDD p(c[0], c[1]);
            while (top >= 2 && area(p, stk[top], stk[top - 1]) <= 0) top -- ;
            if (!top) res[i] = -1;
            else {
                auto & q = stk[top];
                // <= 不能相遇
                if (p.y <= q.y) res[i] = -1;
                else res[i] = (q.x - p.x) / (p.y - q.y);
            }
            stk[ ++ top] = p;
        }
        return res;
    }
};
```
