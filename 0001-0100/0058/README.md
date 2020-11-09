#  [58. 最后一个单词的长度](https://leetcode-cn.com/problems/length-of-last-word/)

## 题意



## 题解



```c++
class Solution {
public:
    int lengthOfLastWord(string s) {
        int n = s.size();
        int p = n-1;
        while(p >= 0 && s[p] == ' ') --p;
        if(p < 0) return 0;
        int cnt = 0;
        while(p >= 0 && s[p] != ' ') --p, ++cnt;
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



```python3

```

