#   [763. 划分字母区间](https://leetcode.cn/problems/partition-labels/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> partitionLabels(string S) {
        unordered_map<int, int> last;
        for (int i = 0; i < S.size(); i ++ ) last[S[i]] = i;
        vector<int> res;
        int start = 0, end = 0;
        for (int i = 0; i < S.size(); i ++ ) {
            end = max(end, last[S[i]]);
            if (i == end) {
                res.push_back(end - start + 1);
                start = end = i + 1;
            }
        }
        return res;
    }
};
```



```python
# 模拟题：边扫描 边输出每段的长度即可。
# 用哈希表 记录每个字母最后出现的位置。从前往后扫描的时候，需要定义这一段的起始位置和终止位置。

class Solution:
    def partitionLabels(self, s: str) -> List[int]:
        my_dict = dict(); res = []
        for i in range(len(s)):
            my_dict[s[i]] = i 
        l, r = 0, 0 
        for i in range(len(s)):
            r = max(r, my_dict[s[i]])
            if r == i:
                res.append(r - l + 1)
                r = l = i + 1
        return res
```

