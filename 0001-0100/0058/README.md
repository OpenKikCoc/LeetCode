#  [58. 最后一个单词的长度](https://leetcode-cn.com/problems/length-of-last-word/)

## 题意



## 题解

```c++
// 标准
class Solution {
public:
    int lengthOfLastWord(string s) {
        for (int i = s.size() - 1; i >= 0; i -- ) {
            if (s[i] == ' ') continue;
            int j = i - 1;
            while (j >= 0 && s[j] != ' ') j -- ;
            return i - j;
        }
        return 0;
    }
};
```



```c++
class Solution {
public:
    int lengthOfLastWord(string s) {
        int n = s.size();
        int p = n - 1;
        while (p >= 0 && s[p] == ' ') -- p ;
        if (p < 0) return 0;
        int cnt = 0;
        while (p >= 0 && s[p] != ' ') -- p , ++ cnt ;
        return cnt;
    }
};

class Solution {
public:
    int lengthOfLastWord(string s) {
        int sum = 0, res = 0;
        for (int i = 0; i < s.size(); i ++ )
            if (s[i] == ' ') {
                if (sum) res = sum;
                sum = 0;
            } else sum ++ ;
        if (sum) res = sum;
        return res;
    }
};
```



```python
class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        s = s.strip(' ')
        if not s:return 0 # 踩坑： 判断 去掉后面的空格后，是否为空字符串
        res = 0
        for i in range(len(s)-1, -1, -1):
            print(s[i])
            if s[i] != ' ':
                res += 1
            else:break
        return res
      
      
class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        s = s.split()
        if not s:return 0
        return len(s[-1])
```

