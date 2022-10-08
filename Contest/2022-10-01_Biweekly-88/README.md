## [比赛链接](https://leetcode.cn/contest/biweekly-contest-88/)


### [2423. 删除字符使频率相同](https://leetcode.cn/problems/remove-letter-to-equalize-frequency/)



```c++
class Solution {
public:
    bool equalFrequency(string word) {
        int n = word.size();
        for (int i = 0; i < n; ++ i ) {
            unordered_map<char, int> hash;
            for (int j = 0; j < n; ++ j )
                if (j != i)
                    hash[word[j]] ++ ;
            vector<int> t;
            for (auto [k, v] : hash)
                t.push_back(v);
            
            bool flag = true;
            for (int j = 1; j < t.size(); ++ j )
                if (t[j] != t[j - 1]) {
                    flag = false;
                    break;
                }
            if (flag)
                return true;
        }
        return false;
    }
};
```


### [2424. 最长上传前缀](https://leetcode.cn/problems/longest-uploaded-prefix/)



```c++
class LUPrefix {
public:
    const static int N = 1e5 + 10;
    int tr[N];
    int lowbit(int x) {
        return x & -x;
    }
    void add(int x, int y) {
        for (int i = x; i < N; i += lowbit(i))
            tr[i] += y;
    }
    int sum(int x) {
        int ret = 0;
        for (int i = x; i; i -= lowbit(i))
            ret += tr[i];
        return ret;
    }
    
    int n;
    
    LUPrefix(int n) {
        this->n = n;
        memset(tr, 0, sizeof tr);
    }
    
    void upload(int video) {
        add(video, 1);
    }
    
    int longest() {
        int l = 1, r = n + 1;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (sum(m) >= m)
                l = m + 1;
            else
                r = m;
        }
        return l - 1;
    }
};

/**
 * Your LUPrefix object will be instantiated and called as such:
 * LUPrefix* obj = new LUPrefix(n);
 * obj->upload(video);
 * int param_2 = obj->longest();
 */
```

trick

```c++
class LUPrefix {
public:
    set<int> S;
    int z;

    LUPrefix(int n) {
        z = 1;
    }
    
    void upload(int video) {
        S.insert(video);
    }
    
    int longest() {
        while (S.find(z) != S.end()) {
            z ++ ;
        }
        return z - 1;
    }
};

/**
 * Your LUPrefix object will be instantiated and called as such:
 * LUPrefix* obj = new LUPrefix(n);
 * obj->upload(video);
 * int param_2 = obj->longest();
 */
```



### [2425. 所有数对的异或和](https://leetcode.cn/problems/bitwise-xor-of-all-pairings/)



```c++
class Solution {
public:
    using LL = long long;
    
    vector<int> get(vector<int> & t) {
        vector<int> ret;
        for (int i = 0; i < 32; ++ i ) {
            int c = 0;
            for (auto x : t)
                if (x >> i & 1)
                    c ++ ;
            ret.push_back(c);
        }
        return ret;
    }
    int xorAllNums(vector<int>& nums1, vector<int>& nums2) {
        int n1 = nums1.size(), n2 = nums2.size();
        auto t1 = get(nums1);
        auto t2 = get(nums2);
        int res = 0;
        for (int i = 0; i < 32; ++ i ) {
            // x: 1, y: 0
            LL x = (LL)t1[i] * (n2 - t2[i]) + (LL)(n1 - t1[i]) * t2[i];
            LL y = (LL)t1[i] * t2[i] + (LL)(n1 - t1[i]) * (n2 - t2[i]);
            // cout << " i = " << i << " x = " << x << " y = " << y << endl;
            x %= 2, y %= 2;
            if (!x && !y) {
                
            } else if (x && y) {
                res += 1 << i;
            } else if (x) {
                res += 1 << i;
            } else if (y) {
                
            }
        }
        return res;
    }
};
```

trick

```c++
class Solution {
public:
    // nums1 的每个元素在 nums3 中出现 n2 次
    // nums2 的每个元素在 nums3 中出现 n1 次
    int xorAllNums(vector<int>& nums1, vector<int>& nums2) {
        int n1 = nums1.size(), n2 = nums2.size();
        int res = 0;
        if (n2 & 1)
            for (auto x : nums1)
                res ^= x;
        if (n1 & 1)
            for (auto x : nums2)
                res ^= x;
        return res;
    }
};
```



### [2426. 满足不等式的数对数目](https://leetcode.cn/problems/number-of-pairs-satisfying-inequality/)

BIT 维护即可

特别注意 M 和 DIFF 的取值，WA2

```c++
class Solution {
public:
    // ATTENTION i < j
    // (nums1[i] - nums2[i]) - (nums1[j] - nums2[j]) <= diff
    // (nums1[i] - nums2[i]) <= (nums1[j] - nums2[j]) + diff
    using LL = long long;
    const static int N = 1e5 + 10, M = 6e4 + 10, DIFF = 3e4 + 5;    // ATTENTION M,DIFF
    
    int tr[M];
    int lowbit(int x) {
        return x & -x;
    }
    void add(int x, int y) {
        for (int i = x; i < M; i += lowbit(i))
            tr[i] += y;
    }
    int sum(int x) {
        int ret = 0;
        for (int i = x; i; i -= lowbit(i))
            ret += tr[i];
        return ret;
    }
    
    int n;
    int t[N];
    
    long long numberOfPairs(vector<int>& nums1, vector<int>& nums2, int diff) {
        memset(t, 0, sizeof t);
        n = nums1.size();
        LL res = 0;
        for (int i = 1; i <= n; ++ i ) {
            int x = nums1[i - 1] - nums2[i - 1];
            int target = x + diff;
            res += (LL)sum(target + DIFF);
            add(x + DIFF, 1);
        }
        return res;
    }
};
```
