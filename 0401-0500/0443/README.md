#  [443. 压缩字符串](https://leetcode-cn.com/problems/string-compression/)

## 题意



## 题解

更好的处理

```c++
class Solution {
public:
    int compress(vector<char>& s) {
        int k = 0;
        for (int i = 0; i < s.size(); i ++ ) {
            int j = i + 1;
            while (j < s.size() && s[j] == s[i]) j ++ ;
            int len = j - i;
            s[k ++ ] = s[i];
            if (len > 1) {
                int t = k;
                while (len) {
                    s[t ++ ] = '0' + len % 10;
                    len /= 10;
                }
                reverse(s.begin() + k, s.begin() + t);
                k = t;
            }
            i = j - 1;
        }
        return k;
    }
};
```

```c++
class Solution {
public:

    int compress(vector<char>& chars) {
        int p = 0;
        for (int i = 0; i < chars.size(); ++ i ) {
            int j = i + 1;
            while (j < chars.size() && chars[j] == chars[i]) ++ j ;
            int len = j - i;
            chars[p ++ ] = chars[i];
            if (len > 1) {
                int t = p;
                while (len) chars[t ++ ] = '0' + len % 10, len /= 10;
                reverse(chars.begin() + p, chars.begin() + t);
                p = t;
            }
            i = j - 1;
        }
        return p;
    }

    string get(int x) {
        string ret;
        while (x) {
            ret.push_back(x % 10 + '0');
            x /= 10;
        }
        reverse(ret.begin(), ret.end());
        return ret;
    }



    int compress_2(vector<char>& chars) {
        if (chars.empty()) return 0;
        int n = chars.size(), p = 0, cnt = 1;
        char c = chars[0];
        for (int i = 1; i < n; ++ i ) {
            if (chars[i] == c) ++ cnt;
            else {
                chars[p ++ ] = c;
                // 如果不处理cnt > 1需先记录需要更新的c值 否则会被覆盖
                // 实际按照下面的写法 c 更新可放后面
                // c = chars[i];
                if (cnt > 1) {
                    string s = get(cnt);
                    for (auto v : s) chars[p ++ ] = v;
                }
                c = chars[i];
                cnt = 1;
            }
        }
        
        if (cnt) {
            chars[p ++ ] = c;
            if (cnt > 1) {
                auto s = get(cnt);
                for (auto v : s) chars[p ++ ] = v;
            }
        }
        return p;
    }
};
```



```python3

```

