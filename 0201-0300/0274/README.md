#  [274. H 指数](https://leetcode-cn.com/problems/h-index/)

## 题意



## 题解



```c++
class Solution {
public:
    int hIndex(vector<int>& citations) {
        sort(citations.begin(), citations.end(), greater<int>());
        for (int h = citations.size(); h; -- h )
            if (citations[h - 1] >= h) return h;
        return 0;
    }

    int hIndex_2(vector<int>& citations) {
        int l = 0, r = citations.size() + 1;
        while (l < r) {
            int m = l + (r - l) / 2;
            
            int c = 0;
            for (auto & v : citations)
                if (v >= m)
                    c ++ ;

            if (c >= m)
                l = m + 1;
            else
                r = m;
        }
        return l - 1;
    }
};
```



```python
class Solution:
    def hIndex(self, citations: List[int]) -> int:
        citations.sort()
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

