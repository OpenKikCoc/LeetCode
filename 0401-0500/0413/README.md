#  [413. 等差数列划分](https://leetcode.cn/problems/arithmetic-slices/)

## 题意



## 题解



```c++
class Solution {
public:
    int numberOfArithmeticSlices(vector<int>& A) {
        int len = A.size(), res = 0;
        if (len < 3) return 0;
        int dp = 0;
        for (int i = 2; i < len; ++ i ) {
            if (A[i] - A[i - 1] == A[i - 1] - A[i - 2]) {
                dp = 1 + dp;
                res += dp;
            } else {
                dp = 0;
            }
        }
        return res;
    }

    int numberOfArithmeticSlices(vector<int>& A) {
        int len = A.size();
        if (len < 3) return 0;
        int one = 0, two = 0, three = 0, res = 0;
        for (int i = 2; i < len; ++ i ) {
            if (A[i] - A[i - 1] == A[i - 1] - A[i - 2]) {
                // 此处可以优化 因为只用到了two
                three = two >= 3 ? two + 1 : 3;
                res += three - 2;
                one = two, two = three;
            } else {
                one = two = three = 0;
            }
        }
        return res;
    }
};

// yxc 计算思路更清晰
class Solution {
public:
    int numberOfArithmeticSlices(vector<int>& A) {
        for (int i = A.size() - 1; i > 0; i -- ) A[i] -= A[i - 1];
        int res = 0;
        for (int i = 1; i < A.size(); i ++ ) {
            int j = i;
            while (j < A.size() && A[j] == A[i]) j ++ ;
            int k = j - i;
            res += k * (k - 1) / 2;
            i = j - 1;
        }
        return res;
    }
};
```



```python3

```

