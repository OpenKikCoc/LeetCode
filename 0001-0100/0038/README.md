#  [38. 外观数列](https://leetcode-cn.com/problems/count-and-say/)

## 题意



## 题解



```c++
class Solution {
public:
    string countAndSay(int n) {
        string s = "1";
        for (int i = 0; i < n - 1; i ++ ) {
            string t;
            for (int j = 0; j < s.size();) {
                int k = j + 1;
                while (k < s.size() && s[k] == s[j]) k ++ ;
                t += to_string(k - j) + s[j];
                j = k;
            }
            s = t;
        }

        return s;
    }

    string countAndSay(int n) {
        string say = "1", s;
        for(int i = 2; i <= n; ++i) {
            for(int j = 1, cnt = 1; j <= say.size(); ++j) {
                if(say[j-1] != say[j]) {
                    s.push_back(cnt+'0');
                    s.push_back(say[j-1]);
                    cnt = 1;
                } else ++cnt;
            }
            say = s;
            s = "";
        }
        return say;
    }

    string countAndSay(int n) {
        string ori = "1";
        if(n == 1) return ori;
        string res;
        for(int i = 2; i <= n; ++i) {
            int sz = ori.size();
            int cnt = 1, c = ori[0] - '0';
            for(int j = 1; j < sz; ++j) {
                while(j < sz && ori[j] == ori[j-1]) ++cnt, ++j;
                if(j == sz) break;
                res += to_string(cnt);
                res.push_back(c+'0');
                cnt = 1, c = ori[j]-'0';
            }
            res += to_string(cnt);
            res.push_back(c+'0');
            ori = res;res = "";
        }
        return ori;
    }
};
```



```python3

```

