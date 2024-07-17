#  [396. 旋转函数](https://leetcode.cn/problems/rotate-function/)

## 题意



## 题解



```c++
class Solution {
public:
    int maxRotateFunction(vector<int>& A) {
        typedef long long LL;
        LL sum = 0, cur = 0;
        for (auto v : A) sum += v;
        int n = A.size();
        for (int i = 0; i < n; ++ i ) cur += i * A[i];
        LL res = cur;
        for (int i = n - 1; i >= 0; -- i ) {
            cur += sum - (LL)n * A[i];
            res = max(res, cur);
        }
        return res;
    }
    int maxRotateFunction_2(vector<int>& A) {
        int n = A.size();
        long long tot = 0;
        for (int i = 0; i < n; ++ i ) A.push_back(A[i]), tot += A[i];
        
        long long sum = 0;
        for (int i = 1; i <= n; ++ i ) sum += (i - 1) * A[i - 1];
        long long res = sum;
        for (int i = 2; i <= n; ++ i ) {
            // 上次的开头为 i , 末尾为 i + n - 1
            // 对于当前 i , 上次的末尾为 i + n - 2
            //cout << " - : " <<  A[n - i + 1] << endl;
            sum += tot;
            sum -= (long long)n * A[n - i + 1];
            //cout << "get sum at " << i - 1 << " = " << sum << endl;
            res = max(res, sum);
        }
        return res;
    }
};
```



```python3

```

