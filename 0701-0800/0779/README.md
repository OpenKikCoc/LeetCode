#   [779. 第K个语法符号](https://leetcode.cn/problems/k-th-symbol-in-grammar/)

## 题意



## 题解



```c++
class Solution {
public:
    // 新的左侧和原一致 右侧和原取反
    int kthGrammar(int N, int K) {
        K -- ;
        int res = 0;
        while (K)
            res ^= K & 1, K >>= 1;
        return res;
    }
};
```



```python3

```

