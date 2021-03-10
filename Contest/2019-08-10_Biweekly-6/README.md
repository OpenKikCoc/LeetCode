## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-6/)


### [1150. 检查一个数是否在数组中占绝大多数](https://leetcode-cn.com/problems/check-if-a-number-is-majority-element-in-a-sorted-array/)

略

```c++
class Solution {
public:
    bool isMajorityElement(vector<int>& nums, int target) {
        int cnt = 0;
        for (auto v : nums)
            if (v == target)
                ++ cnt ;
        return cnt * 2 > nums.size();
    }
};
```


### [1151. 最少交换次数来组合所有的 1](https://leetcode-cn.com/problems/minimum-swaps-to-group-all-1s-together/)

转化为定长区间内 求1个数最多是多少

```c++
class Solution {
public:
    int minSwaps(vector<int>& data) {
        int tot = 0;
        for (auto v : data)
            if (v)
                ++ tot ;
        int res = -1e9, s = 0;
        for (int i = 0; i < data.size(); ++ i ) {
            s += data[i];
            if (i >= tot - 1) {
                res = max(res, s);
                s -= data[i - tot + 1];
            }
        }
        return tot - res;
    }
};
```

### [1152. 用户网站访问行为分析](https://leetcode-cn.com/problems/analyze-user-website-visit-pattern/)


思路正确 **注意本题允许重合** 各种实现小细节 

```c++
class Solution {
public:
    using PIS = pair<int, string>;
    unordered_map<string, vector<PIS>> hash;
    
    vector<string> mostVisitedPattern(vector<string>& username, vector<int>& timestamp, vector<string>& website) {
        int n = username.size();
        for (int i = 0; i < n; ++ i )
            hash[username[i]].push_back({timestamp[i], website[i]});
        for (auto & [k, v] : hash)
            sort(v.begin(), v.end());
        
        vector<string> ve;
        for (auto & w : website)
            ve.push_back(w);
        sort(ve.begin(), ve.end());
        ve.erase(unique(ve.begin(), ve.end()), ve.end());
        
        int m = ve.size();
        int maxv = 0;
        vector<string> res;
        for (int i = 0; i < m; ++ i )
            for (int j = 0; j < m; ++ j )
                // if (i != j)
                    for (int k = 0; k < m; ++ k ) {
                        // if (j != i && j != k) {
                            int cnt = 0;
                            
                            vector<string> s = {ve[i], ve[j], ve[k]};
                            for (auto & [k, v] : hash) {
                                int p = 0;
                                for (int u = 0; u < v.size() && p < 3; ++ u ) {
                                    auto & [_, web] = v[u];
                                    if (web == s[p])
                                        ++ p ;
                                }
                                if (p == 3)
                                    ++ cnt ;
                            }
                            
                            if (cnt > maxv) {
                                maxv = cnt;
                                res = s;
                            }
                        }
        return res;
    }
};
```

### [1153. 字符串转化](https://leetcode-cn.com/problems/string-transforms-into-another-string/)


注意：原题要求转化为以下条件

> 如果 `str1 != str2` ，且 `str2` 包含所有的26个字母，则不能转化

```c++
class Solution {
public:
    bool canConvert(string str1, string str2) {
        if (str1 == str2)
            return true;
        unordered_set<char> S;
        for (auto c : str2)
            S.insert(c);
        if (S.size() == 26)
            return false;
        
        int n = str1.size();
        unordered_map<char, char> hash;
        for (int i = 0; i < n; ++ i ) {
            char c1 = str1[i], c2 = str2[i];
            if (!hash.count(c1))
                hash[c1] = c2;
            else if (hash[c1] != c2)
                return false;
        }
        return true;
    }
};
```

另一思路：

```c++
class Solution {
public:
    bool canConvert(string s, string t) {
        if (s == t) return true;
        
        int n = s.size();
        vector<int> to(26, -1);
        for (int i = 0; i < n; ++ i) {
            int x = s[i]-'a', y = t[i]-'a';
            if (to[x] == -1) to[x] = y;
            else if (to[x] != y) return false;
        }
        
        // 不是 26 个字符都转换了
        int has = 0;
        for (int i = 0; i < 26; ++ i)
            has += to[i] != -1;
        if (has != 26) return true;
        
        // 转换了 26 个字符 此时需要满足以下条件
        //  存在不同字符转化为同一字符 
        int flag = 0;
        for (int i = 0; i < 26; ++ i)
            for (int j = i+1; j < 26; ++ j)
                if (to[i] != -1 && to[j] != -1 && to[i] == to[j])
                    flag = 1;
        
        return flag;
    }
};
```

