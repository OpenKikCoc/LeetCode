## [比赛链接](https://leetcode.cn/contest/weekly-contest-279/)


### [2164. 对奇偶下标分别排序](https://leetcode.cn/problems/sort-even-and-odd-indices-independently/)

略

```c++
class Solution {
public:
    vector<int> sortEvenOdd(vector<int>& nums) {
        int n = nums.size();
        vector<int> a, b;
        for (int i = 0; i < n; ++ i )
            if (i & 1)
                b.push_back(nums[i]);
            else
                a.push_back(nums[i]);
        sort(a.begin(), a.end());
        sort(b.begin(), b.end());
        reverse(b.begin(), b.end());
        
        vector<int> res;
        for (int i = 0; i < a.size() && i < b.size(); ++ i )
            res.push_back(a[i]), res.push_back(b[i]);
        if (a.size() != b.size()) {
            res.push_back(a.back());
        }
        return res;
    }
};
```


### [2165. 重排数字的最小值](https://leetcode.cn/problems/smallest-value-of-the-rearranged-number/)



```c++
class Solution {
public:
    using LL = long long;
    
    long long smallestNumber(long long num) {
        if (num == 0)
            return 0;
        
        bool positive = num >= 0;
        if (num < 0)
            num = -num;
        
        string s = to_string(num);
        int n = s.size();
        vector<LL> f;
        {
            if (positive) {
                f = vector<LL>(1 << n, 1e18);
            } else {
                f = vector<LL>(1 << n, -1e18);
            }
        }
        
        f[0] = 0;
        for (int i = 0; i < 1 << n; ++ i )
            for (int j = 0; j < n; ++ j )
                if (i >> j & 1) {
                    // 前导0
                    if (s[j] - '0' == 0 && f[i ^ (1 << j)] == 0)
                        continue;
                    if (f[i ^ (1 << j)] == 1e18 || f[i ^ (1 << j)] == -1e18)
                        continue;
                    
                    if (positive)
                        f[i] = min(f[i], f[i ^ (1 << j)] * 10 + s[j] - '0');
                    else
                        f[i] = max(f[i], f[i ^ (1 << j)] * 10 + s[j] - '0');
                }
        
        if (positive)
            return f[(1 << n) - 1];
        return -f[(1 << n) - 1];
    }
};
```

简洁代码

```c++
class Solution {
public:
    long long smallestNumber(long long num) {
        bool neg = num < 0;
        if (num < 0) num = -num;
        string s = to_string(num);
        if (neg) {
            sort(s.begin(), s.end(), greater<int>());
            return -stoll(s);
        }
        sort(s.begin(), s.end());
        if (s[0] == '0') {
            for (int i = 0; i < s.size(); i++)
                if (s[i] != '0') {
                    swap(s[i], s[0]);
                    break;
                }
        }
        return stoll(s);
    }
};
```

### [2166. 设计位集](https://leetcode.cn/problems/design-bitset/)



```c++
class Bitset {
public:
    const static int N = 1e5 + 10;
    
    int n, fliped, cnt;
    bool a[N];
    
    Bitset(int size) {
        memset(a, 0, sizeof a);
        n = size, fliped = 0, cnt = 0;
    }
    
    void fix(int idx) {
        if (fliped) {
            if (a[idx] == 1)
                a[idx] = 0, cnt -- ;
        } else {
            if (a[idx] == 0)
                a[idx] = 1, cnt ++ ;
        }
    }
    
    void unfix(int idx) {
        if (fliped) {
            if (a[idx] == 0)
                a[idx] = 1, cnt ++ ;
        } else {
            if (a[idx] == 1)
                a[idx] = 0, cnt -- ;
        }
    }
    
    void flip() {
        fliped ^= 1;
    }
    
    bool all() {
        if (fliped) {
            return cnt == 0;
        }
        return cnt == n;
    }
    
    bool one() {
        if (fliped)
            return n - cnt > 0;
        return cnt > 0;
    }
    
    int count() {
        if (fliped)
            return n - cnt;
        return cnt;
    }
    
    string toString() {
        string res;
        for (int i = 0; i < n; ++ i )
            if ((a[i] ^ fliped) == 1)
                res.push_back('1');
            else
                res.push_back('0');
        return res;
    }
};

/**
 * Your Bitset object will be instantiated and called as such:
 * Bitset* obj = new Bitset(size);
 * obj->fix(idx);
 * obj->unfix(idx);
 * obj->flip();
 * bool param_4 = obj->all();
 * bool param_5 = obj->one();
 * int param_6 = obj->count();
 * string param_7 = obj->toString();
 */
```

更简洁

```c++
class Bitset {
public:
    vector<int> a;
    int cnt;
    int tag;

    Bitset(int size) : a(size), cnt(0), tag(0) {}

    void fix(int idx) {
        if (a[idx] != (tag ^ 1)) {
            a[idx] = tag ^ 1;
            cnt += 1;
        }
    }

    void unfix(int idx) {
        if (a[idx] != tag) {
            a[idx] = tag;
            cnt -= 1;
        }
    }

    void flip() {
        cnt = a.size() - cnt;
        tag ^= 1;
    }

    bool all() {
    	return cnt == a.size();
    }

    bool one() {
    	return cnt >= 1;
    }

    int count() {
        return cnt;
    }

    string toString() {
        string s(a.size(), '0');
        for (int i = 0; i < a.size(); ++i) s[i] = (a[i] ^ tag) + '0';
        return s;
    }
};

/**
 * Your Bitset object will be instantiated and called as such:
 * Bitset* obj = new Bitset(size);
 * obj->fix(idx);
 * obj->unfix(idx);
 * obj->flip();
 * bool param_4 = obj->all();
 * bool param_5 = obj->one();
 * int param_6 = obj->count();
 * string param_7 = obj->toString();
 */
```

### [2167. 移除所有载有违禁货物车厢所需的最少时间](https://leetcode.cn/problems/minimum-time-to-remove-all-cars-containing-illegal-goods/) [TAG]

重点在于理清楚【对于任意一个 1 只会作为前缀被消除或作为后缀或在中间被消除，且**三段不交叉**】

明确以上结论 剩下的就很清晰 直接前后缀分解即可

```c++
class Solution {
public:
    int minimumTime(string s) {
        int n = s.size();
        vector<int> l(n + 2), r(n + 2);
        
        l[0] = 0;
        for (int i = 1; i <= n; ++ i )
            if (s[i - 1] == '0')
                l[i] = l[i - 1];
            else
                l[i] = min(l[i - 1] + 2, i);
        
        r[n + 1] = 0;
        for (int i = n; i >= 1; -- i )
            if (s[i - 1] == '0')
                r[i] = r[i + 1];
            else
                r[i] = min(r[i + 1] + 2, n - i + 1);
        
        int res = 1e9;
        for (int i = 1; i <= n; ++ i )
            res = min(res, l[i - 1] + r[i]);
        return res;
    }
};
```
