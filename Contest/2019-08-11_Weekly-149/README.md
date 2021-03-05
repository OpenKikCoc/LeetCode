## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-149/)


### [1154. 一年中的第几天](https://leetcode-cn.com/problems/day-of-the-year/)

略

```c++
class Solution {
public:
    int days[13] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    int dayOfYear(string date) {
        int year = stoi(date.substr(0, 4).c_str());
        int mon = stoi(date.substr(5, 2).c_str());
        int day = stoi(date.substr(8, 2).c_str());
        // cout << year << ' ' << mon << ' ' << day << endl;
        
        int res = 0;
        for (int i = 1; i < mon; ++ i ) {
            res += days[i];
            if (i == 2)
                if (year % 400 == 0 || year % 100 != 0 && year % 4 == 0)
                    ++ res;
        }
        res += day;
        return res;
    }
};
```

sscanf 读入

```c++
int days[] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
class Solution {
public:
    int ordinalOfDate(string date) {
        int y, m, d;
        sscanf(date.c_str(), "%d-%d-%d", &y, &m, &d);
        int ret = 0;
        for (int i = 1; i < m; ++ i) {
            int day = days[i];
            if (y%400 == 0 || y%4 == 0 && y%100 != 0) if (i == 2) day ++;
            ret += day;
        }
        return ret+d;
    }
};
```


### [1155. 掷骰子的N种方法](https://leetcode-cn.com/problems/number-of-dice-rolls-with-target-sum/) [TAG]

分组背包

```c++
class Solution {
public:
    // 分组背包
    const static int MOD = 1e9 + 7;
    int numRollsToTarget(int d, int f, int target) {
        vector<int> ff(target + 1);
        ff[0] = 1;
        for (int i = 1; i <= d; ++ i )
            for (int j = target; j >= 0; -- j ) {   // j >= 0 因为后面可能用到 ff[0]
                ff[j] = 0;                          // ATTENTION 一维状态下必须初始化为 0
                for (int k = 1; k <= f; ++ k )
                    if (j - k >= 0)
                        ff[j] = (ff[j] + ff[j - k]) % MOD;
            }
                
        return ff[target];
    }
};
```

### [1156. 单字符重复子串的最大长度](https://leetcode-cn.com/problems/swap-for-longest-repeated-character-substring/) [TAG]

记录连续值

```c++
ass Solution {
public:
    int maxRepOpt1(string text) {
        int n = text.size();
        
        vector<char> s(n + 2);
        vector<int> L(n + 2), R(n + 2);
        vector<int> cnt(27);
        
        for (int i = 1; i <= n; ++ i ) s[i] = text[i - 1];
        s[0] = s[n + 1] = 0;
        
        int res = 0;
        for (int i = 1; i <= n; ++ i ) {
            L[i] = s[i] == s[i - 1] ? L[i - 1] + 1 : 1;
            res = max(res, L[i]);
        }
        for (int i = n; i >= 1; -- i ) {
            R[i] = s[i] == s[i + 1] ? R[i + 1] + 1 : 1;
            res = max(res, R[i]);   // 和上一个for循环计算的是同一个内容 其实可以省略
        }
        for (int i = 1; i <= n; ++ i )
            cnt[s[i] - 'a'] ++ ;
        
        for (int i = 1; i <= n; ++ i )
            if (s[i - 1] == s[i + 1]) {
                if (s[i] != s[i - 1]) {
                    int t = L[i - 1] + R[i + 1];
                    // != cnt 则还有一个不在这两段的字母可以交换过来
                    if (L[i - 1] + R[i + 1] != cnt[s[i - 1] - 'a']) ++ t ;
                    res = max(res, t);
                }
                // 若 s[i - 1] == s[i + 1] == s[i] 当无事发生过 ovo
            } else {
                if (i > 1 && s[i - 1] != s[i] && L[i - 1] != cnt[s[i - 1] - 'a'])
                    res = max(res, L[i - 1] + 1);
                if (i < n && s[i + 1] != s[i] && R[i + 1] != cnt[s[i + 1] - 'a'])
                    res = max(res, R[i + 1] + 1);
            }
        return res;
    }
};
```

### [1157. 子数组中占绝大多数的元素](https://leetcode-cn.com/problems/online-majority-element-in-subarray/) [TAG]

权值线段树

```c++
class MajorityChecker {
private:
    unordered_map<int, vector<int>> pos;
    vector<int> tree;
    vector<int> a;
    
public:
    MajorityChecker(vector<int>& arr): a(arr) {
        for (int i = 0; i < arr.size(); ++i) {
            pos[arr[i]].push_back(i);
        }
        tree = vector<int>(arr.size() * 4, -1);
        build_tree(1, 0, arr.size() - 1);
    }
    
    void build_tree(int tree_pos, int l, int r) {
        if (l == r) {
            tree[tree_pos] = a[l];
            return;
        }
        int mid = (l + r) >> 1;
        build_tree(tree_pos * 2, l, mid);
        build_tree(tree_pos * 2 + 1, mid + 1, r);
        if (tree[tree_pos * 2] != -1 && get_occurrence(tree[tree_pos * 2], l, r) * 2 > r - l + 1) {
            tree[tree_pos] = tree[tree_pos * 2];
        }
        else if (tree[tree_pos * 2 + 1] != -1 && get_occurrence(tree[tree_pos * 2 + 1], l, r) * 2 > r - l + 1) {
            tree[tree_pos] = tree[tree_pos * 2 + 1];
        }
    }
    
    pair<int, int> query(int tree_pos, int l, int r, int queryl, int queryr) {
        if (l > queryr || r < queryl) {
            return make_pair(-1, -1);
        }
        if (queryl <= l && r <= queryr) {
            if (tree[tree_pos] == -1) {
                return make_pair(-1, -1);
            }
            int occ = get_occurrence(tree[tree_pos], queryl, queryr);
            if (occ * 2 > queryr - queryl + 1) {
                return make_pair(tree[tree_pos], occ);
            }
            else {
                return make_pair(-1, -1);
            }
        }
        int mid = (l + r) >> 1;
        pair<int, int> res_l = query(tree_pos * 2, l, mid, queryl, queryr);
        if (res_l.first > -1) {
            return res_l;
        }
        pair<int, int> res_r = query(tree_pos * 2 + 1, mid + 1, r, queryl, queryr);
        if (res_r.first > -1) {
            return res_r;
        }
        return make_pair(-1, -1);
    }
    
    int get_occurrence(int num, int l, int r) {
        auto iter = pos.find(num);
        if (iter == pos.end()) {
            return 0;
        }
        const auto& vec = iter->second;
        auto iter_l = lower_bound(vec.begin(), vec.end(), l);
        if (iter_l == vec.end()) {
            return 0;
        }
        auto iter_r = upper_bound(vec.begin(), vec.end(), r);
        return iter_r - iter_l;
    }
    
    int query(int left, int right, int threshold) {
        pair<int, int> ans = query(1, 0, a.size() - 1, left, right);
        if (ans.second >= threshold) {
            return ans.first;
        }
        return -1;
    }
};

/**
 * Your MajorityChecker object will be instantiated and called as such:
 * MajorityChecker* obj = new MajorityChecker(arr);
 * int param_1 = obj->query(left,right,threshold);
 */
```
