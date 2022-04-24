## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-287)

>   453 / 6811

### [6055. 转化时间需要的最少操作数](https://leetcode-cn.com/problems/minimum-number-of-operations-to-convert-time/)

模拟

```c++
class Solution {
public:
    int convertTime(string current, string correct) {
        int h1, m1, h2, m2;
        sscanf(current.c_str(), "%d:%d", &h1, &m1);
        sscanf(correct.c_str(), "%d:%d", &h2, &m2);
        int t1 = h1 * 60 + m1, t2 = h2 * 60 + m2;
        vector<int> v = {60, 15, 5, 1};
        int res = 0, d = t2 - t1;
        for (auto x : v) {
            while (d >= x)
                d -= x, res ++ ;
        }
        return res;
    }
};
```



```python
class Solution:
    def convertTime(self, a: str, b: str) -> int:
        s1, s2 = int(a[0:2]) * 60 + int(a[3:5]), int(b[0:2]) * 60 + int(b[3:5])
        res = 0
        diff = s2 - s1
        for x in [60, 15, 5, 1]:
            while diff >= x:
                diff -= x
                res += 1
        return res
```



### [5235. 找出输掉零场或一场比赛的玩家](https://leetcode-cn.com/problems/find-players-with-zero-or-one-losses/)

模拟

```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    
    int win[N], lose[N];
    
    vector<vector<int>> findWinners(vector<vector<int>>& matches) {
        memset(win, 0, sizeof win);
        memset(lose, 0, sizeof lose);
        
        for (auto & m : matches)
            win[m[0]] ++ , lose[m[1]] ++ ;
        
        vector<vector<int>> res;
        {
            vector<int> a, b;
            for (int i = 1; i < N; ++ i )
                if (win[i] || lose[i]) {
                    if (win[i] && !lose[i])
                        a.push_back(i);
                    if (lose[i] == 1)
                        b.push_back(i);
                }
            res.push_back(a);
            res.push_back(b);
        }
        return res;
    }
};
```



```python
# 自己的写法
class Solution:
    def findWinners(self, nums: List[List[int]]) -> List[List[int]]:
        n = len(nums)
        dict1 = collections.defaultdict(int)
        dict2 = collections.defaultdict(int)
        for i in range(n):
            if nums[i][0] not in dict2:
                dict1[nums[i][0]] += 1
            dict2[nums[i][1]] += 1
            if nums[i][1] in dict1:
                del dict1[nums[i][1]]
        res = [[] for i in range(2)]
        for k in dict1.keys():
            res[0].append(k)
        for k, v in dict2.items():
            if v == 1:
                res[1].append(k)
        res[0].sort()
        res[1].sort()
        return res     
      
      
# dict1: 统计参赛的队伍的参赛次数
# dict2: 记录输了比赛的队伍的输了的次数
class Solution:
    def findWinners(self, matches: List[List[int]]) -> List[List[int]]:
        dict1 = Counter()
        dict2 = Counter()
        for x, y in matches:
            dict1[x] += 1
            dict1[y] += 1
            dict2[y] += 1
        s = []
        t = []
        for i in sorted(dict1):
            if dict2[i] == 0:
                s.append(i)
            if dict2[i] == 1:
                t.append(i)
        return s, t
```

### [5219. 每个小孩最多能分到多少糖果](https://leetcode-cn.com/problems/maximum-candies-allocated-to-k-children/)

二分答案 注意右边界

```c++
class Solution {
public:
    using LL = long long;
    
    vector<int> cs;
    LL k;
    
    bool check(LL m) {
        LL c = 0;
        for (auto x : cs)
            c += (LL)x / m;
        return c >= k;
    }
    
    int maximumCandies(vector<int>& candies, long long k) {
        this->cs = candies, this->k = k;
        LL l = 1, r = *max_element(cs.begin(), cs.end()) + 1;
        while (l < r) {
            LL m = l + r >> 1;
            if (check(m))
                l = m + 1;
            else
                r = m;
        }
        return l - 1;
    }
};
```



```python
class Solution:
    def maximumCandies(self, nums: List[int], k: int) -> int:
        # 注意右边界
        l, r = 1, max(nums) + 1
        
        def check(m):
            c = 0
            for x in nums:
                c += x // m
            return c >= k 
        while l < r:
            m = l + (r - l) // 2
            if check(m):
                l = m + 1
            else:
                r = m 
        return l - 1
```

### [5302. 加密解密字符串](https://leetcode-cn.com/problems/encrypt-and-decrypt-strings/)

Trie + 搜索即可

```c++
const static int N = 18; // 100*100*26 = 2^18
static int tr[1 << N][26], f[1 << N];
int idx;
    

class Encrypter {
public:
    unordered_map<char, string> hash1;
    unordered_map<string, unordered_set<char>> hash2;

    void insert(string s) {
        int p = 0;
        for (auto c : s) {
            int t = c - 'a';
            if (!tr[p][t])
                tr[p][t] = ++ idx ;
            p = tr[p][t];
        }
        f[p] = 1;
    }
    
    Encrypter(vector<char>& keys, vector<string>& values, vector<string>& dictionary) {
        int n = keys.size();
        for (int i = 0; i < n; ++ i )
            hash1[keys[i]] = values[i], hash2[values[i]].insert(keys[i]);
        idx = 0;
        memset(tr, 0, sizeof tr);
        memset(f, 0, sizeof f);
        for (auto & s : dictionary)
            insert(s);
    }
    
    string encrypt(string word1) {
        string res;
        for (auto c : word1)
            res += hash1[c];
        return res;
    }
    
    int cnt, n;
    string s;
    
    void dfs(int u, int p) {
        if (u == n) {
            if (f[p])
                cnt ++ ;
            return;
        }
        string t = s.substr(u, 2);
        for (auto c : hash2[t]) {
            int t = c - 'a', x = tr[p][t];
            if (x)
                dfs(u + 2, x);
        }
    }
    
    int decrypt(string word2) {
        this->cnt = 0;
        this->s = word2;
        this->n = s.size();
        dfs(0, 0);
        return cnt;
    }
};

/**
 * Your Encrypter object will be instantiated and called as such:
 * Encrypter* obj = new Encrypter(keys, values, dictionary);
 * string param_1 = obj->encrypt(word1);
 * int param_2 = obj->decrypt(word2);
 */
```

**有脑筋急转弯做法**

>   s 解密后能变成 dictionary 里几种数，其实反过来就是说 dictionary 里有几种数加密后能变成 s。
>
>   因此一开始预处理 dictionary 里所有数加密后的结果，decrypt 函数直接查表输出即可。

```c++
class Encrypter {
    std::map<char, std::string> en;
    std::map<std::string, int> cnt;

public:
    Encrypter(vector<char>& keys, vector<string>& values,
        vector<string>& dictionary) {
        for (int i = 0; i < int(keys.size()); i++)
            en[keys[i]] = values[i];
        // 用哈希表记录每个加密后的字符串的出现次数
        for (auto s : dictionary)
            cnt[encrypt(s)]++;
    }

    string encrypt(string word1) {
        std::string s;
        for (auto c : word1)
            s += en[c];
        return s;
    }

    int decrypt(string word2) {
        return cnt[word2];
    }
};

/**
 * Your Encrypter object will be instantiated and called as such:
 * Encrypter* obj = new Encrypter(keys, values, dictionary);
 * string param_1 = obj->encrypt(word1);
 * int param_2 = obj->decrypt(word2);
 */
```



```python
class Encrypter(object):

    def __init__(self, keys, values, dictionary):
        """
        :type keys: List[str]
        :type values: List[str]
        :type dictionary: List[str]
        """
        self.keys = keys
        self.values = values
        self.key_index = dict()
        for i, k in enumerate(keys):
            self.key_index[k] = i
        self.cache = collections.defaultdict(int)
        for d in dictionary:
            self.cache[self.encrypt(d)]+=1

    def encrypt(self, word1):
        """
        :type word1: str
        :rtype: str
        """
        ans = []
        for w in word1:
            ans.append(self.values[self.key_index[w]])
        return ''.join(ans)


    def decrypt(self, word2):
        """
        :type word2: str
        :rtype: int
        """
        return self.cache[word2]
```
