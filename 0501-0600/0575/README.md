#  [575. 分糖果](https://leetcode-cn.com/problems/distribute-candies/)

## 题意



## 题解



```c++
class Solution {
public:
    int distributeCandies(vector<int>& candyType) {
        int n = candyType.size();
        unordered_map<int, int> mp;
        for (auto c : candyType) ++ mp[c];
        return min(int(mp.size()), n / 2);
    }
};
```

```c++
class Solution {
public:
    int distributeCandies(vector<int>& candyType) {
        unordered_set<int> S;
        for (auto c: candyType) S.insert(c);
        return min(candyType.size() / 2, S.size());
    }
};
```



```python3

```

