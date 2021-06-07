#  [71. 简化路径](https://leetcode-cn.com/problems/simplify-path/)

## 题意



## 题解



```c++
class Solution {
public:
    string simplifyPath(string path) {
        if(path.back() != '/') path.push_back('/');
        string res, name;
        for(auto & c : path) {
            if(c != '/') name.push_back(c);
            else {
                if(name == "..") {
                    // /home/yxc/..
                    // 弹出 /yxc
                    while(res.size() && res.back() != '/') res.pop_back();
                    if(res.size()) res.pop_back();
                } else if(name != "." && name != "") res += '/' + name;
                name.clear();
            }
        }
        if(res.empty()) res = "/";
        return res;
    }

    string simplifyPath2(string path) {
        path.push_back('/');
        int n = path.size();
        string t;
        stack<string> s;
        for(int i = 0; i < n; ++i) {
            if(path[i] == '/') {
                if(t == ".." && !s.empty()) s.pop();
                else if(t != ".." && t != "." && t != "") s.push(t);
                t = "";
            } else t.push_back(path[i]);
        }
        string res;
        while(!s.empty()) {
            t = s.top();
            s.pop();
            reverse(t.begin(), t.end());
            res += t + "/";
        }
        if(res == "") return "/";
        reverse(res.begin(), res.end());
        return res;
    }
};
```



```python
#  path = "/a/./b/../../c/": 解释： 进入a， '.'表示在当前目录不操作，然后进入b, 然后有两个 '..'，把a 和 b 都弹出来的
class Solution:
    def simplifyPath(self, path: str) -> str:
        res = []
        for c in path.split("/"):
            if c not in [".", "..", ""]:
                res.append(c)
            if res and c == "..":
                res.pop()
        return "/" + "/".join(res)
```

