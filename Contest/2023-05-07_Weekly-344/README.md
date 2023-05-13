## [比赛链接](https://leetcode.cn/contest/weekly-contest-344/)


### [2670. 找出不同元素数目差数组](https://leetcode.cn/problems/find-the-distinct-difference-array/)



```c++
class Solution {
public:
    vector<int> distinctDifferenceArray(vector<int>& nums) {
        int n = nums.size();
        vector<int> res;
        for (int i = 0; i < n; ++ i ) {
            unordered_set<int> l, r;
            for (int j = 0; j <= i; ++ j )
                l.insert(nums[j]);
            for (int j = i + 1; j < n; ++ j )
                r.insert(nums[j]);
            res.push_back(l.size() - r.size());
        }
        return res;
    }
};
```


### [2671. 频率跟踪器](https://leetcode.cn/problems/frequency-tracker/)



```c++
class FrequencyTracker {
public:
    using PII = pair<int, int>;
    
    unordered_map<int, int> h1, h2;  // num->fre, fre->count
    
    FrequencyTracker() {
        h1.clear(), h2.clear();
    }
    
    void add(int number) {
        int c = h1[number];
        if (c)
            h2[c] -- ;
        c ++ ;
        h1[number] = c;
        h2[c] ++ ;
    }
    
    void deleteOne(int number) {
        int c = h1[number];
        if (!c)
            return;
        h2[c] -- ;
        c -- ;
        h1[number] = c;
        h2[c] ++ ;
    }
    
    bool hasFrequency(int frequency) {
        return h2[frequency] > 0;
    }
};

/**
 * Your FrequencyTracker object will be instantiated and called as such:
 * FrequencyTracker* obj = new FrequencyTracker();
 * obj->add(number);
 * obj->deleteOne(number);
 * bool param_3 = obj->hasFrequency(frequency);
 */
```

### [2672. 有相同颜色的相邻元素数目](https://leetcode.cn/problems/number-of-adjacent-elements-with-the-same-color/)



```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    
    int c[N];
    
    vector<int> colorTheArray(int n, vector<vector<int>>& queries) {
        memset(c, 0, sizeof c);
        
        // 每设置一个位置 只会对【这个位置之前 / 当前位置】产生影响
        vector<int> res;
        int cnt = 0;
        for (auto & q : queries) {
            int idx = q[0], cor = q[1], ori = c[idx];
            // 颜色不变 答案不变
            if (ori == cor) {
                res.push_back(cnt);
                continue;
            }
            // 颜色变 则可能要消去当前位置原有的统计结果
            
            // 考虑当前位置
            if (ori) {
                if (idx + 1 < n && c[idx + 1] == ori)
                    cnt -- ;
                if (idx - 1 >= 0 && c[idx - 1] == ori)
                    cnt -- ;
            }
            if (cor) {
                if (idx + 1 < n && c[idx + 1] == cor)
                    cnt ++ ;
                if (idx - 1 >= 0 && c[idx - 1] == cor)
                    cnt ++ ;
            }
            c[idx] = cor;
            res.push_back(cnt);
        }
        return res;
    }
};
```

### [2673. 使二叉树所有路径值相等的最小代价](https://leetcode.cn/problems/make-costs-of-paths-equal-in-a-binary-tree/) [TAG]



```c++
class Solution {
public:
    // 题意: 满二叉树 求使得所有叶子结点路径和相同的最少操作次数
    //
    // 有一个较直观的想法是直接让每一层的节点值都相同，但这显然不是最优（思考 有可能不同的）
    // 考虑【修改一个非叶子结点相当于直接修改一段连续区间】则题意可以转化为：
    //  => 已知一个值可能不同的连续数组，每次可以修改特定的区间使其+1，求让所有数组相同的最小操作次数
    //  => INSTEAD 【对于一个以某个节点为根的子树，其排除根节点之后的左右子树的和应彼此相同】
    using LL = long long;
    
    int n, res;
    vector<int> c;
    
    LL dfs(int u) {
        int l = u * 2, r = u * 2 + 1;
        if (l > n)
            return c[u - 1];
        
        LL a = dfs(l), b = dfs(r);
        res += max(a, b) - min(a, b);   // 补齐该子树
        return max(a, b) + c[u - 1];
    }
    
    int minIncrements(int n, vector<int>& cost) {
        this->n = n, this->c = cost;
        res = 0;
        dfs(1);
        return res;
    }
};
```
