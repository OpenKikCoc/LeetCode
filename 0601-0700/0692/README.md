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



```python
# 1. 用哈希表统计每个单词出现的次数； 2. 原地建堆，取前k个；
class Solution:
    def topKFrequent(self, words: List[str], k: int) -> List[str]:
        # my_cnt = collections.Counter(words) 也可以直接用计数器 进行计数。 
        my_dict = collections.defaultdict(int)
        for c in words:
            my_dict[c] += 1 
        
        q = []
        for key, val in my_dict.items():
            heapq.heappush(q, (-val, key))  #  堆的元素可以是元组/列表 类型; 小根堆 所以 取负数
        res = []
        for _ in range(k):
            res.append(heapq.heappop(q)[1])
        return res
```

