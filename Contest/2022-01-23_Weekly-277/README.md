## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-277/)

>   virtual rank: 294 / 5060


### [2148. 元素计数](https://leetcode-cn.com/problems/count-elements-with-strictly-smaller-and-greater-elements/)

略

```c++
class Solution {
public:
    int countElements(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        int l = 0, r = n - 1;
        while (l < n && nums[l] == nums[0])
            l ++ ;
        while (r >= 0 && nums[r] == nums[n - 1])
            r -- ;
        return max(0, r - l + 1);
    }
};
```


### [2149. 按符号重排数组](https://leetcode-cn.com/problems/rearrange-array-elements-by-sign/)

略

```c++
class Solution {
public:
    vector<int> rearrangeArray(vector<int>& nums) {
        vector<int> a, b, res;
        for (auto x : nums)
            if (x > 0)
                a.push_back(x);
            else
                b.push_back(x);
        int n = a.size();
        for (int i = 0; i < n; ++ i ) {
            res.push_back(a[i]);
            res.push_back(b[i]);
        }
        return res;
    }
};
```

### [2150. 找出数组中的所有孤独数字](https://leetcode-cn.com/problems/find-all-lonely-numbers-in-the-array/)

略

```c++
class Solution {
public:
    vector<int> findLonely(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<int> res;
        int n = nums.size();
        for (int i = 0; i < n; ++ i ) {
            int x = nums[i];
            bool flag = true;
            if (i - 1 >= 0 && (nums[i - 1] == x - 1 || nums[i - 1] == x))
                flag = false;
            if (i + 1 < n && (nums[i + 1] == x + 1 || nums[i + 1] == x))
                flag = false;
            if (flag)
                res.push_back(x);
        }
        return res;
    }
};
```

### [2151. 基于陈述统计最多好人数](https://leetcode-cn.com/problems/maximum-good-people-based-on-statements/)

状压即可 注意判断合法的条件

```c++
class Solution {
public:
    const static int N = 20;
    
    vector<vector<int>> g;
    int n;
    
    int st[N];
    bool check(int x) {
        memset(st, -1, sizeof st);
        for (int i = 0; i < n; ++ i )
            if (x >> i & 1) {
                for (int j = 0; j < n; ++ j )
                    if (g[i][j] != 2) {
                        if (st[j] == -1)
                            st[j] = g[i][j];
                        else if (st[j] != g[i][j])
                            return false;
                    }
            }
        for (int i = 0; i < n; ++ i )
            // 注意：之前自认为只有第一个条件 其实还需要第二个条件
            if ((x >> i & 1) && st[i] == 0 || ((x >> i & 1) == 0 && st[i] == 1))
                return false;
        return true;
    }
    
    int maximumGood(vector<vector<int>>& sts) {
        this->g = sts;
        this->n = g.size();
        int res = 0;
        for (int i = 0; i < 1 << n; ++ i )
            if (check(i)) {
                int c = 0;
                // cout << " got : ";
                for (int j = 0; j < n; ++ j )
                    if (i >> j & 1) {
                        c ++ ;
                        // cout << j << ' ';
                    }
                // cout << endl;
                        
                res = max(res, c);
            }
        return res;
    }
};
```
