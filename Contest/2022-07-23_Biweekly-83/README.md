## [比赛链接](https://leetcode.cn/contest/biweekly-contest-83/)


### [2347. 最好的扑克手牌](https://leetcode.cn/problems/best-poker-hand/)



```c++
class Solution {
public:
    string bestHand(vector<int>& ranks, vector<char>& suits) {
        {
            unordered_map<char, int> hash;
            for (auto c : suits) {
                hash[c] ++ ;
                if (hash[c] >= 5)
                    return "Flush";
            }
        }
        {
            unordered_map<int, int> hash;
            for (auto x : ranks) {
                hash[x] ++ ;
                if (hash[x] >= 3)
                    return "Three of a Kind";
            }
        }
        {
            unordered_map<int, int> hash;
            for (auto x : ranks) {
                hash[x] ++ ;
                if (hash[x] >= 2)
                    return "Pair";
            }
        }
        {
            unordered_set<int> set;
            for (auto x : ranks) {
                set.insert(x);
            }
            if (set.size() >= 5)
                return "High Card";
        }
        return "";
    }
};
```


### [2348. 全 0 子数组的数目](https://leetcode.cn/problems/number-of-zero-filled-subarrays/)



```c++
class Solution {
public:
    using LL = long long;
    
    long long zeroFilledSubarray(vector<int>& nums) {
        LL res = 0;
        int n = nums.size();
        for (int i = 0; i < n; ++ i ) {
            if (nums[i] != 0)
                continue;
            int j = i;
            while (j < n && nums[j] == 0)
                j ++ ;
            LL d = j - i;
            res += d * (d + 1) / 2;
            i = j - 1;
        }
        return res;
    }
};
```

### [2349. 设计数字容器系统](https://leetcode.cn/problems/design-a-number-container-system/)



```c++
class NumberContainers {
public:
    unordered_map<int, int> h1;         // index->value
    unordered_map<int, set<int>> h2;    // value->indexs
    
    NumberContainers() {
        h1.clear(), h2.clear();
    }
    
    void change(int index, int number) {
        if (h1.count(index)) {
            int x = h1[index];
            h2[x].erase(index);
            if (h2[x].empty()) {
                h2.erase(x);
            }
        }
        h1[index] = number;
        h2[number].insert(index);
    }
    
    int find(int number) {
        if (!h2.count(number) || h2[number].empty())
            return -1;
        return *h2[number].begin();
    }
};

/**
 * Your NumberContainers object will be instantiated and called as such:
 * NumberContainers* obj = new NumberContainers();
 * obj->change(index,number);
 * int param_2 = obj->find(number);
 */
```

### [2350. 不可能得到的最短骰子序列](https://leetcode.cn/problems/shortest-impossible-sequence-of-rolls/) [TAG]

trick

考虑一个包含了所有 k 种数的周期

则每形成一个完整的周期，可以表示的长度 +1

==> 思考 推导

```c++
class Solution {
public:
    int shortestSequence(vector<int>& rolls, int k) {
        unordered_set<int> S;
        int res = 0;
        for (auto x : rolls) {
            S.insert(x);
            if (S.size() == k) {
                S.clear();
                res ++ ;    // ATTENTION
            }
        }
        return res + 1;
    }
};
```
