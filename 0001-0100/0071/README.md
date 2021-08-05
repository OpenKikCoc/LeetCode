#  [71. 简化路径](https://leetcode-cn.com/problems/simplify-path/)

## 题意



## 题解

只留标准写法

```c++
class Solution {
public:
    string simplifyPath(string path) {
        string res, name;
        if (path.back() != '/') path += '/'; // ATTENTION
        for (auto c : path) {
            if (c != '/') name += c;
            else {
                if (name == "..") {
                    while (res.size() && res.back() != '/') res.pop_back();
                    if (res.size()) res.pop_back();
                } else if (name != "." && name != "") {
                    res += '/' + name;
                }
                name.clear();
            }
        }

        if (res.empty()) res = "/";
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

