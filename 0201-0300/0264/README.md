#  [264. 丑数 II](https://leetcode-cn.com/problems/ugly-number-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    int nthUglyNumber(int n) {
        vector<int> ugly(1, 1);
        for(int i = 0, j = 0, k = 0; ugly.size() < n;) {
            int v = min(min(ugly[i] * 2, ugly[j] * 3), ugly[k] * 5);
            ugly.push_back(v);
            if (v % 2 == 0) ++ i;
            if (v % 3 == 0) ++ j;
            if (v % 5 == 0) ++ k;
        }
        return ugly.back();
    }


    int nthUglyNumber_2(int n) {
        int two = 0, three = 0, five = 0;
        long long v = 1;
        vector<long long> ugly;
        ugly.push_back(1ll);
        while(--n) {
            v = min(min(ugly[two] * 2, ugly[three] * 3), ugly[five] * 5);
            ugly.push_back(v);
            if(v % 2 == 0) ++two;
            if(v % 3 == 0) ++three;
            if(v % 5 == 0) ++five;
        }
        return v;
    }
};
```



```python3

```

