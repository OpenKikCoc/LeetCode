## [比赛链接](https://leetcode.cn/contest/weekly-contest-244)


### [5776. 判断矩阵经轮转后是否一致](https://leetcode.cn/problems/determine-whether-matrix-can-be-obtained-by-rotation/)

略

```c++
class Solution {
public:
    int n;
    vector<vector<int>> a, b;
    
    bool check() {
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < n; ++ j )
                if (a[i][j] != b[i][j])
                    return false;
        return true;
    }
    
    void rotate() {
        for (int i = 0; i < n / 2; ++ i )
            for (int j = i; j < n - i - 1; ++ j ) {
                int x1 = i, y1 = j;
                int x2 = j, y2 = n - i - 1;
                int x3 = n - i - 1, y3 = n - j - 1;
                int x4 = n - j - 1, y4 = i;
                int t = a[x1][y1];
                a[x1][y1] = a[x4][y4];
                a[x4][y4] = a[x3][y3];
                a[x3][y3] = a[x2][y2];
                a[x2][y2] = t;
            }
    }
    
    bool findRotation(vector<vector<int>>& mat, vector<vector<int>>& target) {
        this->n = mat.size();
        this->a = mat, this->b = target;
        for (int i = 0; i < 4; ++ i ) {
            if (check())
                return true;
            rotate();
        }
        return false;
    }
};
```

```c++
class Solution {
public:
    bool findRotation(vector<vector<int>>& mat, vector<vector<int>>& target) {
        int n = mat.size();
        if(mat == target) return true;
        for(int i = 0; i < 3; i += 1){
            vector<vector<int>> tmp(n, vector<int>(n));
            for(int i = 0; i < n; i += 1)
                for(int j = 0; j < n; j += 1){
                    tmp[j][n - 1 - i] = mat[i][j];
                }
            swap(tmp, mat);
            if(mat == target) return true;
        }
        return false;
    }
};
```



```python
# 原地旋转算法(比赛过程中用的算法)
class Solution:
    def findRotation(self, mat: List[List[int]], target: List[List[int]]) -> bool:
        n = len(mat)
        k = 0
        def rotate():
            for i in range(n):
                for j in range(n):
                    if i < j:
                        mat[i][j], mat[j][i] =  mat[j][i],  mat[i][j]
            for row in mat:
                row.reverse()
            
        while True:
            rotate()
            k += 1
            if mat == target:return True
            if k > 3 :return False
            
# 用一个新数组存储旋转后的数组     
class Solution:
    def findRotation(self, mat: List[List[int]], target: List[List[int]]) -> bool:
        n = len(mat)

        def rotate():
            nums = [[0] * n for _ in range(n)]
            for i in range(n):
                k = n - 1
                for j in range(n):
                    nums[i][j] = mat[k][i]
                    k -= 1
            return nums 
        
        for i in range(4):
            mat = rotate() # 踩坑：每次旋转完后 记得要把值赋值给mat,后续才能在此基础上继续旋转
            if mat == target:return True 
        return False      
```



### [5777. 使数组元素相等的减少操作次数](https://leetcode.cn/problems/reduction-operations-to-make-the-array-elements-equal/)

从最大的开始即可

```c++
class Solution {
public:
    using LL = long long;
    using PII = pair<int, int>;
    
    int reductionOperations(vector<int>& nums) {
        map<int, int> hash;
        for (auto & v : nums)
            hash[v] ++ ;
        
        vector<PII> ve;
        for (auto & [k, v] : hash)
            ve.push_back({k, v});
        sort(ve.begin(), ve.end());
        
        int n = ve.size();
        LL res = 0, c = 0;
        for (int i = n - 1; i >= 0; -- i ) {
            res += c;
            c += ve[i].second;
        }
        
        return res;
    }
};
```

简化代码

```c++
class Solution {
public:
    int reductionOperations(vector<int>& nums) {
        map<int, int, greater<int>> mp;
        for (int x : nums) mp[x] += 1;
        int ans = 0, sum = 0;
        for (auto& [x, y] : mp){
            ans += sum;
            sum += y;
        }
        return ans;
    }
};
```

另一种思路

```c++
class Solution {
public:
    int reductionOperations(vector<int>& a) {
        sort(a.begin(), a.end());
        int res = 0;
        for (int i = 1, s = 0; i < a.size(); i ++ ) {
            if (a[i] != a[i - 1]) s ++ ;
            res += s;
        }
        return res;
    }
};
```



```python
# 每个数 变动的次数 等于 比小于他的数的个数；
# 从前到后扫描，记录一下当前一共有多少个数 比当前数小。

# 哈希表 + 遍历
class Solution:
    def reductionOperations(self, nums: List[int]) -> int:
        import collections
        my_cnt = collections.Counter(nums)
        ve = []
        for k, v in my_cnt.items():
            ve.append([k,v])
        ve.sort()
        n = len(ve)
        res = 0; c = 0
        for i in range(n-1, -1, -1):
            res += c 
            c += ve[i][1]
        return res
      
# 更简单的写法：
class Solution:
    def reductionOperations(self, nums: List[int]) -> int:
        nums.sort()
        res = 0
        s = 0
        for i in range(1, len(nums)):
            if nums[i] != nums[i-1]:
                s += 1
            res += s 
        return res
```





### [5778. 使二进制字符串字符交替的最少反转次数](https://leetcode.cn/problems/minimum-number-of-flips-to-make-the-binary-string-alternating/) [TAG]

#### 经典通用思路

分析，经过若干轮转：

1.  n  为偶数

    总计只有 `010101...01` 和 `101010...10` 两种情况，取 min 即可

2.  两大类

    2.1 `101010...01` 或 `010101...10` 首尾相同

    2.2 `010101...11...01` 或 `101010...00...10` 中间有两个相同相同，两侧分别交替

>   通用思路：
>
>   **前后缀分解**
>
>   >   ```c++
>   >   l[0][i];		// 以 0 从【起点】开始交替出现直到 i 的最小修改次数
>   >   l[1][i];		// 以 1 从【起点】开始交替出现直到 i 的最小修改次数
>   >   r[0][i];		// 以 0 从【末尾】开始交替出现直到 i 的最小修改次数
>   >   r[1][i];		// 以 1 从【末尾】开始交替出现直到 i 的最小修改次数
>   >   ```
>   >
>   >   则每个位置 `i` 和 `i + 1` 都可以 `O(1)` 求出。

```c++
class Solution {
public:
    int minFlips(string s) {
        int n = s.size();
        vector<int> l[2], r[2];
        l[0] = l[1] = r[0] = r[1] = vector<int>(n);
        
        for (int i = 0; i < 2; ++ i )
            // c 当前变了多少个字母
            for (int j = 0, c = 0, k = i; j < n; ++ j , k ^= 1) {
                if (k != s[j] - '0')
                    c ++ ;
                l[i][j] = c;
            }
        for (int i = 0; i < 2; ++ i )
            for (int j = n - 1, c = 0, k = i; j >= 0; -- j , k ^= 1) {
                if (k != s[j] - '0')
                    c ++ ;
                r[i][j] = c;
            }
        
        if (n % 2 == 0)
            return min(l[0][n - 1], l[1][n - 1]);
        else {
            int res = min(l[0][n - 1], l[1][n - 1]);
            for (int i = 0; i + 1 < n; ++ i ) {
                res = min(res, l[0][i] + r[1][i + 1]);
                res = min(res, l[1][i] + r[0][i + 1]);
            }
            return res;
        }
    }
};
```

#### 滑动窗口

显然 `s + s` 同时**取模简化操作**

```c++
class Solution {
public:
    int minFlips(string s) {
        int n = s.size(), cnt = 0;
        // 将字符串变成 01 串需要反转的次数
        string tar = "01";
        for (int i = 0; i < n; ++ i )
            cnt += (s[i] != tar[i % 2]);
        
        int res = min(cnt, n - cnt);
        s += s;
        for (int i = 0; i < n; ++ i ) {
            cnt -= (s[i] != tar[i % 2]);
            cnt += (s[i + n] != tar[(i + n) % 2]);
            res = min(res, min(cnt, n - cnt));
        }
        return res;
    }
};
```

以及考虑：最终一定是形成 `010101` 或 `101010` 这样的字符串，故直接**将当前串与目标串比较并维护窗口**的思路

```c++
class Solution {
public:
    int minFlips(string s) {
        int n = s.size();
        s = s + s;
        
        string a, b;    // a = "0101...", b = "1010..."
        for (int i = 0; i < 2 * n; ++ i )
            a.push_back('0' + i % 2), b.push_back('0' + (i + 1) % 2);
        
        int res = n, da = 0, db = 0;
        for (int i = 0; i < 2 * n; ++ i ) {
            if (s[i] != a[i])
                da ++ ;
            if (s[i] != b[i])
                db ++ ;
            
            // 维护窗口的实现
            if (i >= n) {
                if (s[i - n] != a[i - n])
                    da -- ;
                if (s[i - n] != b[i - n])
                    db -- ;
            }
            if (i >= n - 1)
                res = min(res, min(da, db));
        }
        return res;
    }
};

// 转化为常见方式
class Solution {
public:
    int minFlips(string s) {
        int n = s.size();
        s = s + s;
        
        string a, b;    // a = "0101...", b = "1010..."
        for (int i = 0; i < 2 * n; ++ i )
            a.push_back('0' + i % 2), b.push_back('0' + (i + 1) % 2);
        
        int res = n, da = 0, db = 0;
        for (int i = 0; i < n; ++ i ) {
            if (s[i] != a[i])
                da ++ ;
            if (s[i] != b[i])
                db ++ ;
        }
        
        res = min(res, min(da, db));
        
        for (int i = n; i < 2 * n; ++ i ) {
            if (s[i] != a[i])
                da ++ ;
            if (s[i] != b[i])
                db ++ ;
            
            {
                if (s[i - n] != a[i - n])
                    da -- ;
                if (s[i - n] != b[i - n])
                    db -- ;
            }
            
            res = min(res, min(da, db));
        }
        return res;
    }
};
```



#### 自己的思路TLE

```c++
// 51 / 65 个通过测试用例
class Solution {
public:
    const static int N = 2e5 + 10;
    int n;
    int f[N];
    string ns;
    
    int get(int l, int r) {
        int c = 0;
        for (int i = l, flag = 1; i < r; i += f[i], flag ^= 1 )
            if (flag == 0)
                c += min(r - i, f[i]);
        
        return min(c, n - c);
    }
    
    int minFlips(string s) {
        n = s.size();
        ns = s + s;
        
        memset(f, 0, sizeof f);
        f[2 * n] = 1;
        for (int i = 2 * n - 1; i > 0; -- i )
            if (ns[i - 1] != ns[i])
                f[i] = f[i + 1] + 1;
            else
                f[i] = 1;
        
        int res = n;
        for (int i = 1; i <= n; i += f[i] ) {
            int t = get(i, i + n);
            // cout << "i = " << i << " t = " << t << endl;
            res = min(res, min(t, n - t));
        }
        // cout << endl;
        
        return res;
    }
};
```



### [5779. 装包裹的最小浪费空间](https://leetcode.cn/problems/minimum-space-wasted-from-packaging/) [TAG]

考虑 **每个箱子只会装一个包裹 则每个包裹都只需要大于等于其尺寸的最小的箱子即可**

显然需要遍历供应商

>   如果暴力模拟：
>
>   >   每个包裹二分找对应的箱子 复杂度可能高达 `1e5 * 1e5 * log(1e5)`
>   >
>   >   考虑逆向 对供应商的箱子二分找对应的包裹 则可以划分数个区间 并利用包裹前缀和快速计算浪费的空间 时间复杂度 `1e5 * log(1e5)`

```c++
class Solution {
public:
    using LL = long long;
    const LL MOD = 1e9 + 7, INF = 1e18;
    
    int minWastedSpace(vector<int>& packages, vector<vector<int>>& boxes) {
        int n = packages.size();
        sort(packages.begin(), packages.end());
        LL sum = accumulate(packages.begin(), packages.end(), 0ll);
        
        LL res = INF;
        for (auto & b : boxes) {
            sort(b.begin(), b.end());
            
            // 供应商不满足要求
            if (b.back() < packages.back())
                continue;
            LL t = -sum, last = 0;
            for (auto x : b) {
                int l = 1, r = n + 1;
                // 找到大于当前的第一个 往前一个就是小于等于的最后一个
                while (l < r) {
                    int m = l + r >> 1;
                    if (packages[m - 1] <= x)
                        l = m + 1;
                    else
                        r = m;
                }
                int next = l - 1;
                if (next <= last)
                    continue;
                t += (next - last) * x;
                last = next;
            }
            res = min(res, t);
        }
        
        if (res == INF)
            return -1;
        return res % MOD;
    }
};
```

也可重复利用 last

```c++
class Solution {
public:
    using LL = long long;
    const LL MOD = 1e9 + 7, INF = 1e18;
    
    int minWastedSpace(vector<int>& packages, vector<vector<int>>& boxes) {
        int n = packages.size();
        sort(packages.begin(), packages.end());
        LL sum = accumulate(packages.begin(), packages.end(), 0ll);
        
        LL res = INF;
        for (auto & b : boxes) {
            sort(b.begin(), b.end());
            
            // 供应商不满足要求
            if (b.back() < packages.back())
                continue;
            LL t = -sum, last = 0;
            for (auto x : b) {
                int l = last + 1, r = n + 1;
                // 找到大于当前的第一个 往前一个就是小于等于的最后一个
                while (l < r) {
                    int m = l + r >> 1;
                    if (packages[m - 1] <= x)
                        l = m + 1;
                    else
                        r = m;
                }
                int next = l - 1;
                if (next <= last)
                    continue;
                t += (next - last) * x;
                last = next;
            }
            res = min(res, t);
        }
        
        if (res == INF)
            return -1;
        return res % MOD;
    }
};


class Solution {
public:
    using LL = long long;
    const LL MOD = 1e9 + 7, INF = 1e18;
    
    int minWastedSpace(vector<int>& packages, vector<vector<int>>& boxes) {
        int n = packages.size();
        sort(packages.begin(), packages.end());
        LL sum = accumulate(packages.begin(), packages.end(), 0ll);
        
        LL res = INF;
        for (auto & b : boxes) {
            sort(b.begin(), b.end());
            
            // 供应商不满足要求
            if (b.back() < packages.back())
                continue;
            LL t = -sum, last = -1;
            for (auto x : b) {
                int l = last + 1, r = n;
                // 找到大于当前的第一个 往前一个就是小于等于的最后一个
                while (l < r) {
                    int m = l + r >> 1;
                    if (packages[m] <= x)
                        l = m + 1;
                    else
                        r = m;
                }
                int next = l - 1;
                if (next <= last)
                    continue;
                t += (next - last) * x;
                last = next;
            }
            res = min(res, t);
        }
        
        if (res == INF)
            return -1;
        return res % MOD;
    }
};
```

