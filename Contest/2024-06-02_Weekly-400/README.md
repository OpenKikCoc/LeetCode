## [比赛链接](https://leetcode.cn/contest/weekly-contest-400/)

>   virtual rank: 46 / 3534
>
>   18  0:23:16  0:02:36  0:09:56  0:16:46  0:23:16


### [3168. 候诊室中的最少椅子数](https://leetcode.cn/problems/minimum-number-of-chairs-in-a-waiting-room/)



```c++
class Solution {
public:
    int minimumChairs(string s) {
        int minv = 0, c = 0;
        for (auto x : s) {
            if (x == 'E')
                c -- ;
            else
                c ++ ;
            minv = min(minv, c);
        }
        return -minv;
    }
};
```


### [3169. 无需开会的工作日](https://leetcode.cn/problems/count-days-without-meetings/)



```c++
class Solution {
public:
    int countDays(int days, vector<vector<int>>& meetings) {
        sort(meetings.begin(), meetings.end());
        vector<vector<int>> ms;
        int l = -1, r = -1;
        for (auto & m : meetings)
            if (m[0] > r) {
                if (l != -1)
                    ms.push_back({l, r});
                l = m[0], r = m[1];
            } else
                r = max(r, m[1]);
        if (l != -1)
            ms.push_back({l, r});
        
        int res = 0, last = 0;
        for (auto & m : ms) {
            int l = m[0], r = m[1];
            res += l - last - 1;
            last = r;
        }
        res += days - ms.back()[1];
        return res;
    }
};
```

### [3170. 删除星号以后字典序最小的字符串](https://leetcode.cn/problems/lexicographically-minimum-string-after-removing-stars/)



```c++
class Solution {
public:
    // 要让最终得到的字符串字典序最小 则删除时必定尽量删除最靠右的
    const static int N = 1e5 + 10;
    
    vector<int> c[26];
    bool st[N];
    
    string clearStars(string s) {
        memset(st, 0, sizeof st);
        for (int i = 0; i < 26; ++ i )
            c[i].clear();
        
        int n = s.size();
        for (int i = 0; i < n; ++ i )
            if (s[i] == '*') {
                for (int j = 0; j < 26; ++ j )
                    if (c[j].size()) {
                        int t = c[j].back();
                        c[j].pop_back();    // ATTENTION j
                        st[t] = true;
                        break;
                    }
                st[i] = true;   // ATTENTION
            } else {
                int t = s[i] - 'a';
                c[t].push_back(i);
            }
        
        string res;
        for (int i = 0; i < n; ++ i )
            if (!st[i])
                res.push_back(s[i]);
        return res;
    }
};
```

### [3171. 找到按位或最接近 K 的子数组](https://leetcode.cn/problems/find-subarray-with-bitwise-or-closest-to-k/)

经典 LogTrick

```c++
class Solution {
public:
    int minimumDifference(vector<int>& nums, int k) {
        int res = 2e9;
        int n = nums.size();
        for (int i = 0; i < n; ++ i ) {
            res = min(res, abs(nums[i] - k));
            for (int j = i - 1; j >= 0; -- j ) {
                if ((nums[j] | nums[i]) == nums[j])
                    break;
                nums[j] |= nums[i];
                res = min(res, abs(nums[j] - k));
            }
        }
        return res;
    }
};
```
