## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-178/)


### [1365. 有多少小于当前数字的数字](https://leetcode-cn.com/problems/how-many-numbers-are-smaller-than-the-current-number/)

每个元素 `nums[i]`，统计数组中比它小的所有数字的数目。

```c++
class Solution {
public:
    vector<int> smallerNumbersThanCurrent(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n);
        for(int i = 0; i < n; ++i) {
            for(int j = 0; j < n; ++j) {
                if(j == i) continue;
                if(nums[j] < nums[i]) ++res[i];
            }
        }
        return res;
    }
};
```

频次数组：

```c++
class Solution {
public:
    vector<int> smallerNumbersThanCurrent(vector<int>& nums) {
        vector<int> cnt(101, 0);
        vector<int> vec((int)nums.size(), 0);
        for (int i = 0;i < (int)nums.size(); ++i){
            cnt[nums[i]]++;
        }   
        for (int i = 1;i <= 100; ++i) cnt[i] += cnt[i-1]; // 求前缀和
        for (int i = 0;i < (int)nums.size(); ++i){
            if (nums[i]) vec[i] = cnt[nums[i] - 1];
        } 
        return vec;
    }
};
```

排序后比较：

```c++
class Solution {
public:
    vector<int> smallerNumbersThanCurrent(vector<int>& nums) {
        int n = (int)nums.size();
        vector<pair<int,int> > tmp;
        tmp.clear();
        vector<int> vec(n, 0);
        for (int i = 0; i < n; ++i){
            tmp.push_back(make_pair(nums[i], i));
        }
        sort(tmp.begin(), tmp.end());
        int pre = -1;
        for (int i = 0; i < n; ++i){
            if (i == 0) vec[tmp[i].second] = pre + 1;
            else if (tmp[i].first == tmp[i-1].first) vec[tmp[i].second] = pre + 1;
            else{
                pre = i - 1;
                vec[tmp[i].second] = pre + 1;
            }
        }
        return vec;
    }
};
```



### [1366. 通过投票对团队排名](https://leetcode-cn.com/problems/rank-teams-by-votes/) 

> 参赛团队的排名次序依照其所获「排位第一」的票的多少决定。如果存在多个团队并列的情况，将继续考虑其「排位第二」的票的数量。以此类推，直到不再存在并列的情况。
> 如果在考虑完所有投票情况后仍然出现并列现象，则根据团队字母的字母顺序进行排名。

设置排序规则：

```c++
class Solution {
public:
    struct node {
        int cnt = 0, c = 0, n;
        unordered_map<int, int> v;
        bool operator<(const node& n)const{
            int sz = this->n, a, b;
            auto mpa = this->v, mpb = n.v;
            for(int i = 0; i < sz; ++i) {
                a = mpa[i], b = mpb[i];
                if(a != b) return a > b;
            }
            return c < n.c;
            //return rank < n.rank;    // rank > n.rank 降序  rank < n.rank 降序
        }
    };
    string rankTeams(vector<string>& votes) {
        int n = votes.size();
        int m = votes[0].size();
        vector<node> v(26);
        for(int i = 0; i < 26; ++i) v[i].c = i, v[i].n = m;
        
        for(int i = 0; i < n; ++i) {
            for(int j = 0; j < m; ++j) {
                ++v[votes[i][j]-'A'].v[j];
                ++v[votes[i][j]-'A'].cnt;
            }
        }
        sort(v.begin(), v.end());
        string res;
        for(int i = 0; i < 26; ++i) {
            if(v[i].cnt) res.push_back(v[i].c+'A');
            else break;
        }
        
        return res;
    }
};
```

题解区有个答案 直接利用sort对二维数组排序

```c++
class Solution {
public:
    string rankTeams(vector<string>& votes) {
        string res;
        vector<vector<int>> dw(27, vector<int>(27, 0));
        for(auto p : votes) {
            for(int i = 0; i < p.length(); ++i) {
                dw[p[i]-'A'][i]++;
                dw[p[i]-'A'][26] = 26-(p[i]-'A');
            }
        }
        sort(dw.begin(), dw.end(), greater<vector<int>>());
        for(int i = 0; i < dw.size(); ++i) {
            if(dw[i][26]) res.push_back(26-dw[i][26]+'A');
        }
        return res;
    }
};
```

### [1367. 二叉树中的列表](https://leetcode-cn.com/problems/linked-list-in-binary-tree/) 

> 如果在二叉树中，存在一条一直向下的路径，且每个点的数值恰好一一对应以 `head` 为首的链表中每个节点的值，那么请你返回 `True` ，否则返回 `False` 。

搜索

```c++
class Solution {
public:
    bool helper(ListNode* head, TreeNode* root) {
        if(root == nullptr && head == nullptr) return true;
        else if(root == nullptr && head) return false;
        else if(root && head == nullptr) return true;
        if(root->val == head->val) return helper(head->next, root->left) || helper(head->next, root->right);
        else return false;
    }
    bool isSubPath(ListNode* head, TreeNode* root) {
        if(root == nullptr && head == nullptr) return true;
        else if(root == nullptr && head) return false;
        else if(root && head == nullptr) return true;
        if(root->val == head->val) return helper(head, root) || isSubPath(head, root->left) || isSubPath(head, root->right);
        else return isSubPath(head, root->left) || isSubPath(head, root->right);
    }
};
```

更简洁的写法：

```c++
class Solution {
public:
    bool dfs(ListNode* head, TreeNode* node){
      	// 匹配完成
        if(head == nullptr) return true;
        // 检查node
      	if(node == nullptr) return false;
        if(head->val != node->val) return false;

        return dfs(head->next, node->left) || dfs(head->next, node->right);
    }

    bool isSubPath(ListNode* head, TreeNode* root) {
      	if(head == nullptr) return true;
        if(root == nullptr) return false;
        return dfs(head, root)||isSubPath(head, root->left)||isSubPath(head, root->right);
    }
};
```



### [1368. 使网格图至少有一条有效路径的最小代价](https://leetcode-cn.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/) [TAG]

最短路 可以直接到达的边权为0 需要翻转的点边权为1

0-1bfs

todo 复习最短路 spfa

```c++
const int dx[5] = {0, 1, -1, 0, 0};
const int dy[5] = {0, 0, 0, 1, -1};
typedef pair<int, int> pii;

class Solution {
public:
    int minCost(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        deque<pii> pq;
        pq.push_back(make_pair(0, 0));
        vector<vector<bool>> vis(n, vector<bool>(m));
        while (!pq.empty()) {
            pii f = pq.front();
            pq.pop_front();
            int y = f.second / m, x = f.second % m;
            if (vis[y][x]) continue;
            vis[y][x] = true;
            if (y == n - 1 && x == m - 1)
                return f.first;
            for (int k = 1; k <= 4; ++k) {
                int nx = x + dx[k], ny = y + dy[k];
                if (nx < 0 || nx >= m || ny < 0 || ny >= n)
                    continue;
                if (grid[y][x] == k) 
                    pq.push_front(make_pair(f.first, ny * m + nx));
                else
                    pq.push_back(make_pair(f.first + 1, ny * m + nx));
            }
        }
        return 0;
    }
};

//作者：lucifer1004
```
