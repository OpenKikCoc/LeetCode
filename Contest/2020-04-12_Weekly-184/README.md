## [比赛链接](https://leetcode.cn/contest/weekly-contest-184/)

### [1408. 数组中的字符串匹配](https://leetcode.cn/problems/string-matching-in-an-array/)

查找在其他串中出现过的串 m用于去重


```c++
class Solution {
public:
    vector<string> stringMatching(vector<string>& words) {
        int len = words.size();
        vector<string> res;
        unordered_map<int,bool> m;
        for(int i = 0; i < len; ++i) {
            for(int j = 0; j < len; ++j) {
                if(j == i) continue;
                int idx = words[i].find(words[j]);
                if(idx != string::npos) {
                    if(m[j] == false) {
                        m[j] = true;
                        res.push_back(words[j]);
                    }
                }
            }
        }
        return res;
    }
};
```

### [1409. 查询带键的排列](https://leetcode.cn/problems/queries-on-a-permutation-with-key/)

一个排列 每次把某个位置放到第一个 返回操作结束的排列

记录对应关系 复杂度比有些操作后还要遍历的好hhh


```c++
class Solution {
public:
    vector<int> processQueries(vector<int>& queries, int m) {
        int len = queries.size();
        vector<int> res;   
        unordered_map<int, int> m1, m2; // m1 idx=>num    m2 num=>idx
        for(int i = 0; i < m; ++i) {
            m1[i] = i+1;
            m2[i+1] = i;
        }
        
        for(int i = 0; i < len; ++i) {
            int num = queries[i];
            int idx = m2[num];
            res.push_back(idx);
            for(int j = idx; j >= 0; --j) {
                m2[m1[j]]++;
                m1[j] = m1[j-1];
            }
            m1[0] = num;
            m2[num] = 0;
        }
        return res;
    }
};
```

### [1410. HTML 实体解析器](https://leetcode.cn/problems/html-entity-parser/)

从后向前遍历


```c++
class Solution {
public:
    string entityParser(string text) {
        int len = text.size();
        string res, tmp;
        for(int i = len-1; i >=0; --i) {
            if(text[i] == ';') {
                if(i-5>=0 && text[i-1] == 't' && text[i-2] == 'o' && text[i-3] == 'u' && text[i-4] == 'q' && text[i-5] == '&') {
                    if(tmp.size()>0) {res += tmp; tmp = "";}
                    res.push_back('"');
                    i-=5;
                } else if(i-5>=0 && text[i-1] == 's' && text[i-2] == 'o' && text[i-3] == 'p' && text[i-4] == 'a' && text[i-5] == '&') {
                    if(tmp.size()>0) {res += tmp; tmp = "";}
                    res.push_back('\'');
                    i-=5;
                } else if(i-4>=0 && text[i-1] == 'p' && text[i-2] == 'm' && text[i-3] == 'a' && text[i-4] == '&') {
                    if(tmp.size()>0) {res += tmp; tmp = "";}
                    res.push_back('&');
                    i-=4;
                } else if(i-3>=0 && text[i-1] == 't' && text[i-2] == 'g' && text[i-3] == '&') {
                   	if(tmp.size()>0) {res += tmp; tmp = "";}
                    res.push_back('>');
                    i-=3;
                } else if(i-3>=0 && text[i-1] == 't' && text[i-2] == 'l' && text[i-3] == '&') {
                    if(tmp.size()>0) {res += tmp; tmp = "";}
                    res.push_back('<');
                    i-=3;
                } else if(i-6>=0 && text[i-1] == 'l' && text[i-2] == 's' && text[i-3] == 'a' && text[i-4] == 'r'  && text[i-5] == 'f'  && text[i-6] == '&') {
                    if(tmp.size()>0) {res += tmp; tmp = "";}
                    res.push_back('/');
                    i-=6;
                } else tmp.push_back(text[i]);
            } else tmp.push_back(text[i]);
        }
        if(tmp.size()>0) res+=tmp;
        reverse(res.begin(),res.end());
        return res;
    }
};
//双引号：字符实体为 &quot; ，对应的字符是 " 。
//单引号：字符实体为 &apos; ，对应的字符是 ' 。
//与符号：字符实体为 &amp; ，对应对的字符是 & 。
//大于号：字符实体为 &gt; ，对应的字符是 > 。
//小于号：字符实体为 &lt; ，对应的字符是 < 。
//斜线号：字符实体为 &frasl; ，对应的字符是 / 。
```

### [1411. 给 N x 3 网格图涂色的方案数](https://leetcode.cn/problems/number-of-ways-to-paint-n-3-grid/)

数学找规律


```c++
class Solution {
public:
    long long mod = 1e9+7;
    int numOfWays(int n) {
        long long last3 = 6, last2 = 6;
        for(int i = 2; i <= n; ++i) {
            long long nlast3 = last3*2%mod + last2*2%mod;  // pass
            long long nlast2 = last3*2%mod + last2*3%mod;
            last3 = nlast3%mod;
            last2 = nlast2%mod;
            //cout <<"i="<<i<<" res="<<(last3+last2)%mod<<endl;
        }
        return (last3+last2)%mod;
    }
};
```
