#   [775. 全局倒置与局部倒置](https://leetcode-cn.com/problems/global-and-local-inversions/)

## 题意



## 题解



```c++
class Solution {
public:
    bool isIdealPermutation(vector<int>& A) {
        for (int i = 0; i < A.size(); ++ i )
            if (abs(A[i] - i) > 1)
                return false;
        return true;
    }
};
```



```python3

```

