#  [692. 前K个高频单词](https://leetcode-cn.com/problems/top-k-frequent-words/)

## 题意



## 题解

尝试以 *O*(*n* log *k*) 时间复杂度和 *O*(*n*) 空间复杂度解决。

```c++
class Solution {
public:
    using PIS = pair<int, string>;
    
    vector<string> topKFrequent(vector<string>& words, int k) {
        unordered_map<string, int> cnt;
        for (auto& w: words) cnt[w] ++ ;

        vector<PIS> ws;
        for (auto [k, v]: cnt) ws.push_back({v, k});
        auto cmp = [](PIS a, PIS b) {
            if (a.first != b.first) return a.first < b.first;
            return a.second > b.second;
        };
        make_heap(ws.begin(), ws.end(), cmp);
        
        vector<string> res;
        while (k -- ) {
            res.push_back(ws[0].second);
            pop_heap(ws.begin(), ws.end(), cmp);
            ws.pop_back();
        }

        return res;
    }
};
```



```python3

```

