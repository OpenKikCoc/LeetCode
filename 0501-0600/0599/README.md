#  [599. 两个列表的最小索引总和](https://leetcode-cn.com/problems/minimum-index-sum-of-two-lists/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<string> findRestaurant(vector<string>& list1, vector<string>& list2) {
        unordered_map<string, int> mp;
        for (int i = 0; i < list1.size(); ++ i )
            mp[list1[i]] = i;
        map<int, vector<string>> m;
        for (int i = 0; i < list2.size(); ++ i )
            if (mp.count(list2[i]))
                m[mp[list2[i]] + i].emplace_back(list2[i]);
        return (*m.begin()).second;
    }
};
```

```c++
class Solution {
public:
    vector<string> findRestaurant(vector<string>& list1, vector<string>& list2) {
        unordered_map<string, int> hash;
        for (int i = 0; i < list1.size(); i ++ ) hash[list1[i]] = i;
        int sum = INT_MAX;
        vector<string> res;
        for (int i = 0; i < list2.size(); i ++ ) {
            string& s = list2[i];
            if (hash.count(s)) {
                int k = i + hash[s];
                if (k < sum) {
                    sum = k;
                    res = {s};
                } else if (k == sum) {
                    res.push_back(s);
                }
            }
        }
        return res;
    }
};
```



```python3

```

