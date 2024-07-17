## [比赛链接](https://leetcode.cn/contest/biweekly-contest-21/)


### [1370. 上升下降字符串](https://leetcode.cn/problems/increasing-decreasing-string/)

字符升序再降序 重复操作

```c++
class Solution {
public:
    string sortString(string s) {
        string res;
        vector<int> cnt(30);
        for(auto c : s) ++cnt[c-'a'];
        for(;;) {
            bool f = false;
            for(int i = 0; i < 27; ++i) {
                if(cnt[i]) {
                    res += (i+'a');
                    --cnt[i];
                    f = true;
                }
            }
            for(int i = 26; i >= 0; --i) {
                if(cnt[i]) {
                    res += (i+'a');
                    --cnt[i];
                    f = true;
                }
            }
            if(!f) break;
        }
        return res;
    }
};
```


### [1371. 每个元音包含偶数次的最长子字符串](https://leetcode.cn/problems/find-the-longest-substring-containing-vowels-in-even-counts/)  [TAG]

奇偶次数为一个状态 状态dp

```c++
class Solution {
public:
    int findTheLongestSubstring(string s) {
        vector<int> last(32, -2);
        int v = 0, n = s.size();
        int res = 0;
        last[0] = -1;
        for(int i = 0; i < n; ++i) {
            if(s[i] == 'a') v ^= (1<<0);
            else if(s[i] == 'e') v ^= (1<<1);
            else if(s[i] == 'i') v ^= (1<<2);
            else if(s[i] == 'o') v ^= (1<<3);
            else if(s[i] == 'u') v ^= (1<<4);
            if(last[v] == -2) last[v] = i;
            else res = max(res, i - last[v]);
        }
        return res;
    }
};
```

### [1372. 二叉树中的最长交错路径](https://leetcode.cn/problems/longest-zigzag-path-in-a-binary-tree/)

左右左右 用map本质是树形dp

```c++
class Solution {
public:
    unordered_map<TreeNode*, int> l,r;
    int helper(TreeNode* node, int dir) {
        if(!node) return 0;
        if(dir == 0) {
            if(!r[node]) r[node] = helper(node->right, 1)+1;
            return r[node];
        } else {
            if(!l[node]) l[node] = helper(node->left, 0)+1;
            return l[node];
        }
    }
    int longestZigZag(TreeNode* root) {
        if(!root) return -1;
        int l = helper(root->left, 0);
        int r = helper(root->right, 1);
        //cout <<l<<" "<<r<<endl;
        int t = max(l, r);
        t = max(t, longestZigZag(root->left));
        t = max(t, longestZigZag(root->right));
        return t;
    }
};
```

官方题解更简洁一些：

```c++
class Solution {
public:
    int maxAns;
    /* 0 => left, 1 => right */
    void dfs(TreeNode* o, bool dir, int len) {
        maxAns = max(maxAns, len);
        if (!dir) {		// left		
            if (o->left) dfs(o->left, 1, len + 1);
            if (o->right) dfs(o->right, 0, 1);
        } else {
            if (o->right) dfs(o->right, 0, len + 1);
            if (o->left) dfs(o->left, 1, 1);
        }
    } 

    int longestZigZag(TreeNode* root) {
        if (!root) return 0;
        maxAns = 0;
        dfs(root, 0, 0);
        dfs(root, 1, 0);
        return maxAns;
    }
};
```

以及：

```c++
class Solution {
public:
    int res;
    unordered_map<TreeNode*, int> l, r;
    void dfs(TreeNode* root) {
        if(!root) return;
        if(root->left) {
            dfs(root->left);
            l[root] = r[root->left]+1;
        } else l[root] = 0;
        if(root->right) {
            dfs(root->right);
            r[root] = l[root->right]+1;
        } else r[root] = 0;
        res = max(res, l[root]);
        res = max(res, r[root]);
    }
    int longestZigZag(TreeNode* root) {
        res = 0;
        dfs(root);
        return res;
    }
};
```



### [1373. 二叉搜索子树的最大键值和](https://leetcode.cn/problems/maximum-sum-bst-in-binary-tree/) [TAG]

求满足二叉搜索树性质的最大节点和

比赛的时候写的乱 跑600ms：

```c++
class Solution {
public:
    long long res;
    unordered_map<TreeNode*, long long> sum, is;
    int isBST(TreeNode* root) {
        if(is[root]) return is[root];
        if(!root) {
            sum[root] = 0;
            return is[root] = 1;
        } else if(root->left == nullptr && root->right == nullptr) {
            sum[root] = root->val;
            return is[root] = 1;
        } else if(root->left == nullptr) {
            if(root->val < root->right->val && (isBST(root->right) == 1)) {
                sum[root] = sum[root->right] + root->val;
                return is[root] = 1;
            } else {
                sum[root] = INT_MIN;
                return is[root] = -1;
            }
        } else if(root->right == nullptr) {
            if(root->val > root->left->val && (isBST(root->left) == 1)) {
                sum[root] = sum[root->left] + root->val;
                return is[root] = 1;
            } else {
                sum[root] = INT_MIN;
                return is[root] = -1;
            }
        } else {
            if((root->val < root->right->val && root->val > root->left->val && isBST(root->right)==1 && isBST(root->left))==1) {
                sum[root] = sum[root->left] + sum[root->right] + root->val;
                return is[root] = 1;
            } else {
                sum[root] = INT_MIN;
                return is[root] = 1;
            }
        }
    }
    void helper(TreeNode* root) {
        if(!root) return;
        if(!is[root]) isBST(root);
        res = max(res, sum[root]);
        helper(root->left);
        helper(root->right);
    }
    int maxSumBST(TreeNode* root) {
        res = 0;
        helper(root);
        //for(auto v : sum) {
        //    cout <<v.first->val<<" "<<v.second<<endl;
        //}
        return res;
    }
};
```

需要helper 还要进行isBST判断的原因在于 之前在isBST if判断的有短路原则 下面跑600ms：

```c++
class Solution {
public:
    long long res;
    unordered_map<TreeNode*, long long> sum, is;
    int isBST(TreeNode* root) {
        if(is[root]) return is[root];
        if(!root) {
            sum[root] = 0;
            return 1;
        } else {
            is[root->left] = isBST(root->left);
            is[root->right] = isBST(root->right);
            if(is[root->left] == -1 || is[root->right] == -1) {
                return -1;
            }
            // 增加判断二叉树是否合法
            if(root->left && root->left->val >= root->val) return -1;
            if(root->right && root->right->val <= root->val) return -1;
            sum[root] = sum[root->right] + sum[root->left] + root->val;
            res = max(res, sum[root]);
            return 1;
            // 规避短路原则
            //if(root->val < root->right->val && (isBST(root->right) == 1)) {  
        }
    }
    int maxSumBST(TreeNode* root) {
        res = 0;
        isBST(root);
        return res;
    }
};
```

另一种思路：传递minv maxv和sum  两个200ms的代码：

```c++
typedef struct _ResultTYpe{
    bool isValid = true;
    int minVal = INT_MAX;
    int maxVal = INT_MIN;
    int sum = 0;
}ResultType;

class Solution {
public:
    int maxSum = 0;
    ResultType dfs(TreeNode* root){
        ResultType res = ResultType();
        if(root == nullptr) return res;
        
        auto left = dfs(root->left);
        auto right = dfs(root->right);
        if(left.isValid == false || right.isValid == false || left.maxVal >= root->val || right.minVal <= root->val){
            res.isValid = false;
            res.minVal = 0;
            res.maxVal = 0;
            res.sum = 0;
            return res;
        }
        
        res.isValid = true;
        res.minVal = root->left ? left.minVal : root->val;
        res.maxVal = root->right ? right.maxVal : root->val;
        res.sum = left.sum + root->val + right.sum;
        maxSum = max(maxSum, res.sum);
        return res;
    }
    int maxSumBST(TreeNode* root) {
        dfs(root);
        return maxSum;
    }
};
```

以及：

```c++
class Solution {
public:
    struct Node{
        int sum,lo,hi;
        Node(int sum,int lo,int hi):sum(sum),lo(lo),hi(hi){}
    };
    int res;
    Node dfs(TreeNode* root){
        Node l=Node(0,root->val,INT_MIN), r=Node(0,INT_MAX,root->val);
        if(root->left) l=dfs(root->left);
        if(root->right) r=dfs(root->right);
        
        if(root->val > l.hi && root->val < r.lo){
            res=max(res, root->val+l.sum+r.sum);
            return Node(l.sum+r.sum+root->val, l.lo, r.hi);
        }
        return Node(INT_MIN,INT_MIN,INT_MAX);
    }
    
    int maxSumBST(TreeNode* root) {
        res=0;
        dfs(root);
        return res;
    }
};
```

