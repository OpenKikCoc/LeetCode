#  [275. H 指数 II](https://leetcode-cn.com/problems/h-index-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    int hIndex(vector<int>& citations) {
        // 对于某个下标 i , 其位置及其右侧的值均大于等于 c[i] 也即个数为 n - i
        // 故找到最左侧的 i
        int n = citations.size(), l = 0, r = n;
        // if (!n) return 0;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (citations[m] < n - m)
                l = m + 1;
            else
                r = m;
        }
        return n - l;
    }
};
```



```python
class Solution:
    def hIndex(self, citations: List[int]) -> int:
        l = 0
        r = n = len(citations)
        while l<r:
            mid = l + (r-l)//2
            if citations[mid] < n - mid:
                l = mid+1
            else:
                r = mid
        return n-l
```

