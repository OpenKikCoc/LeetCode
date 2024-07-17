#   [769. 最多能完成排序的块](https://leetcode.cn/problems/max-chunks-to-make-sorted/)

## 题意



## 题解



```c++
class Solution {
public:
    int maxChunksToSorted(vector<int>& arr) {
        int mx = -1, n = arr.size();
        int cnt = 0;
        for (int i = 0; i < n; ++ i ) {
            mx = max(mx, arr[i]);
            if (mx == i)
                cnt ++ ;
        }
        return cnt;
    }
};
```



```python3

```

