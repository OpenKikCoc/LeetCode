## [比赛链接](https://leetcode.cn/contest/weekly-contest-303/)


### [2351. 第一个出现两次的字母](https://leetcode.cn/problems/first-letter-to-appear-twice/)



```c++
class Solution {
public:
    char repeatedCharacter(string s) {
        unordered_set<char> S;
        for (auto c : s)
            if (S.count(c))
                return c;
            else
                S.insert(c);
        return '0';
    }
};
```


### [2352. 相等行列对](https://leetcode.cn/problems/equal-row-and-column-pairs/)



```c++
class Solution {
public:
    int equalPairs(vector<vector<int>>& grid) {
        int n = grid.size();
        int res = 0;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < n; ++ j ) {
                bool flag = true;
                for (int k = 0; k < n; ++ k )
                    if (grid[i][k] != grid[k][j]) {
                        flag = false;
                        break;
                    }
                if (flag)
                    res ++ ;
            }
        return res;
    }
};
```

### [2353. 设计食物评分系统](https://leetcode.cn/problems/design-a-food-rating-system/)

加快速度

```c++
class FoodRatings {
public:
    using PIS = pair<int, string>;
    
    unordered_map<string, PIS> sc;  // food->rating,cuisines
    unordered_map<string, set<PIS>> cs; // cuisines->foods
    
    
    FoodRatings(vector<string>& foods, vector<string>& cuisines, vector<int>& ratings) {
        int n = foods.size();
        for (int i = 0; i < n; ++ i ) {
            sc[foods[i]] = PIS{-ratings[i], cuisines[i]};
            cs[cuisines[i]].insert(PIS{-ratings[i], foods[i]});
        }
    }
    
    void changeRating(string food, int newRating) {
        auto [oldRating, cuisine] = sc[food];
        sc[food] = {-newRating, cuisine};
        cs[cuisine].erase({oldRating, food});
        cs[cuisine].insert({-newRating, food});
    }
    
    string highestRated(string cuisine) {
        auto [rating, food] = *cs[cuisine].begin();
        return food;
    }
};

/**
 * Your FoodRatings object will be instantiated and called as such:
 * FoodRatings* obj = new FoodRatings(foods, cuisines, ratings);
 * obj->changeRating(food,newRating);
 * string param_2 = obj->highestRated(cuisine);
 */
```

### [2354. 优质数对的数目](https://leetcode.cn/problems/number-of-excellent-pairs/)

较显然的，`x or y` + `x and y` 的 1 的数量和即为其各自的 1 的数量的和

为什么不需要考虑去重？==> 因为 

>   **注意：**如果 `num1` 在数组中至少出现 **一次** ，则满足 `num1 == num2` 的数对 `(num1, num2)` 也可以是优质数对。

```c++
class Solution {
public:
    using LL = long long;
    using PII = pair<int, int>;
    const static int N = 1e5 + 10, M = 62;
    
    
    vector<PII> xs[M];
    int c[M], s[M];
    
    long long countExcellentPairs(vector<int>& nums, int k) {
        {
            memset(c, 0, sizeof c), memset(s, 0, sizeof s);
            sort(nums.begin(), nums.end());
            nums.erase(unique(nums.begin(), nums.end()), nums.end());
            for (auto x : nums)
                c[__builtin_popcount(x)] ++ ;
            for (int i = 60; i >= 0; -- i )
                s[i] = s[i + 1] + c[i];
        }
        
        LL res = 0;
        for (int i = 0; i < M; ++ i ) {
            int need = k - i;
            res += (LL)c[i] * (LL)s[max(0, need)];
            // ATTENTION: 为什么不需要在 res -= (相同值的数目?)
            // 相同时 res += c[i] * (c[i] - 1) + c[i];
        }
        return res;
    }
};
```
