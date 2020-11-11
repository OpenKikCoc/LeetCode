#  [97. 交错字符串](https://leetcode-cn.com/problems/interleaving-string/)

## 题意



## 题解



```c++
class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        int l1 = s1.size(), l2 = s2.size(), l3 = s3.size();
        if(l1+l2 != l3) return false;
        vector<vector<bool>> f(l1+1, vector<bool>(l2+1));
        f[0][0] = true;
        for(int i = 1; i <= l1; ++i) if(f[i-1][0] && s1[i-1] == s3[i-1]) f[i][0] = true;
        for(int i = 1; i <= l2; ++i) if(f[0][i-1] && s2[i-1] == s3[i-1]) f[0][i] = true;
        for(int i = 1; i <= l1; ++i) {
            for(int j = 1; j <= l2; ++j) {
                f[i][j] = (f[i-1][j] && s1[i-1] == s3[i+j-1]) || (f[i][j-1] && s2[j-1] == s3[i+j-1]);
            }
        }
        return f[l1][l2];
    }
};
```



```python3

```

