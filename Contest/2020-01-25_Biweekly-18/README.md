## [比赛链接](https://leetcode.cn/contest/biweekly-contest-18/)


### [1331. 数组序号转换](https://leetcode.cn/problems/rank-transform-of-an-array/)

每个元素替换为排序后的序号 相同元素序号可相等

自己思路是排序然后扫描同时hash记录序号 最后验证哈希返回

```c++
    vector<int> arrayRankTransform(vector<int>& arr) {
        // v -> order
        vector<int> t, res;
        for(auto v : arr) t.push_back(v);
        sort(t.begin(), t.end());
        unordered_map<int, int> m;
        int p = 0;
        for(auto v : t) if(!p || !m[v]) m[v] = ++p;
        for(auto v : arr) res.push_back(m[v]);
        return res;
    }
```

赛榜有更优雅的做法 stl：

```c++
    vector<int> arrayRankTransform(vector<int>& arr) {
        vector<int> ret = arr;
        sort(arr.begin(),arr.end());
        int len = unique(arr.begin(), arr.end()) - arr.begin();
        for(int &i:ret) i = lower_bound(arr.begin(), arr.begin()+len, i) - arr.begin() + 1;
        return ret;
    }
```



### [1328. 破坏回文串](https://leetcode.cn/problems/break-a-palindrome/) 

删除一个字符使得原始回文串不再回文 且新字符串字典序最小 若做不到返回空串

找到前半部分比 a 大的改为 a   若不存在说明全是a 把最后一个改为+1（其实就是改为b）即可

```c++
    string breakPalindrome(string palindrome) {
        int n = palindrome.size();
        if(n <= 1) return "";
        for(int i = 0; i < n/2; ++i) {
            if(palindrome[i] > 'a') {
                palindrome[i] = 'a';
                return palindrome;
            }
        }
        //if(palindrome.back() == 'z') return "";	// 不用 因为可以从前到后遍历注定了后面不会比a大
        palindrome.back() = palindrome.back() + 1;
        return palindrome;
    }
```

需要稍加思考的是中间字符的处理 n为奇数则 5: 01-345   6: 012-345  中间字符不能动 所以 i < n/2

### [1329. 将矩阵按对角线排序](https://leetcode.cn/problems/sort-the-matrix-diagonally/)

利用对角线上 `i-j` 相同

```c++
    // 每一组 mat[i][j] i-j的值相同 组成pair<i-j, mat[i][j]> 值 0-n+1 ~ m-1
    vector<vector<int>> diagonalSort(vector<vector<int>>& mat) {
        int m = mat.size(), n = mat[0].size();
        // vector<pair<int, int>> t; // 优化 使用map i-j有序故不能unordered
        map<int, vector<int>> h;
        for(int i = 0; i < m; ++i)
            for(int j = 0; j < n; ++j) 
                h[i-j].push_back(mat[i][j]);
        for(auto &v : h){
            sort(v.second.begin(), v.second.end());
            v.second.push_back(0);   // 负数标记有多少个
            v.second.push_back(v.second.size()-1);
            //for(auto vv : v.second) cout <<vv<<" ";
            //cout <<endl;
        }
        for(int i = 0; i < m; ++i) {
            for(int j = 0; j < n; ++j) {
                int sz = h[i-j].back();
                // p = h[i-j][sz];
                mat[i][j] = h[i-j][h[i-j][sz]++];
            }
        }
        return mat;
    }
```

赛榜更优雅的做法：

```c++
    vector<vector<int>> diagonalSort(vector<vector<int>>& a) {
        int m = a.size();
        int n = a[0].size();
        map<int, vector<int>> v;
        for (int i = 0; i < m; ++i)
            for (int j = 0; j < n; ++j)
                v[i-j].push_back(a[i][j]);
        for (auto &[x, y] : v)
            sort(y.begin(), y.end());
        auto b = a;      // 也可以直接用a
        for (int i = m-1; i >= 0; --i)
            for (int j = n-1; j >= 0; --j) {
                b[i][j] = v[i-j].back();
                v[i-j].pop_back();
            }
        return b;
    }
```



### [1330. 翻转子数组得到最大的数组值](https://leetcode.cn/problems/reverse-subarray-to-maximize-array-value/) [TAG]

比赛的时候n^2 TLE一发 尝试优化表达式 思路可以参考 [这里](https://leetcode.cn/problems/reverse-subarray-to-maximize-array-value/solution/onzuo-fa-jie-jue-ci-wen-ti-by-hu-tu-tu-7/)

首先是超时代码：

```c++
    // 翻转子数组不会影响子数组内部的数组值 只会影响子数组边界
    // nums[l-1] nums[l] ... nums[r] nums[r+1] => nums[l-1] nums[r] ... nums[l] nums[r+1]
    // 所以枚举 l r 即可 区间dp dp[i][j] 为翻转 i~j 带来的增益
    // 增益 = abs(nums[l-1] - nums[r]) + abs(nums[l] - nums[r+1]) - abs(nums[l-1] - nums[l]) - abs(nums[r] - nums[r+1])
    // 直接这样算 n^2 超时
    int maxValueAfterReverse(vector<int>& nums) {
        int osum = 0;
        int n = nums.size();
        for(int i = 0; i < n-1; ++i) osum += abs(nums[i]-nums[i+1]);
        vector<vector<int>> dp(n, vector<int>(n));
        int maxv = 0;
        for(int i = 0; i < n-1; ++i) {
            for(int j = i+1; j < n; ++j) {
                int lc = (i-1>=0)?abs(nums[i-1]-nums[j])-abs(nums[i-1]-nums[i]):0;
                int rc = (j+1<n)?abs(nums[i]-nums[j+1])-abs(nums[j]-nums[j+1]):0;
                dp[i][j] = lc+rc;
                //cout <<"i="<<i<<" j="<<j<<" lc="<<lc<<" rc="<<rc<<" dp["<<i<<"]["<<j<<"]="<<dp[i][j]<<endl;
                maxv = max(maxv, dp[i][j]);
            }
        }
        return osum+maxv;
    }
```

优化：

```c++
    // 
    int maxValueAfterReverse(vector<int>& nums) {
        int osum = 0;
        int n = nums.size(), maxv = 0;
        for(int i = 0; i < n-1; ++i) osum += abs(nums[i]-nums[i+1]);
        // 边界情况
        for(int i = 0; i < n; ++i) {
            if(i != n-1) maxv = max(maxv, abs(nums[0]-nums[i+1])-abs(nums[i]-nums[i+1]));   // 左端点为0右端点为i
            if(i != 0) maxv = max(maxv, abs(nums[n-1]-nums[i-1])-abs(nums[i]-nums[i-1]));       // 右端点为n-1,左端点为i
        }
        
        int mx[4] = {1,1,-1,-1};
        int my[4] = {1,-1,1,-1};
        // 枚举四种情况
        for(int i = 0; i < 4; ++i) {
            vector<int> v1, v2;
            for(int j = 0; j < n-1; ++j) {
                int a = mx[i] * nums[j];
                int b = my[i] * nums[j + 1];
                int cur = abs(nums[j] - nums[j + 1]);
                v1.push_back(a + b - cur);
                v2.push_back(a + b + cur);
            }
            int a = get_max(v1);
            int b = get_min(v2);
            maxv = max(maxv, a - b);
        }
        return osum+maxv;
    }
    
    int get_max(vector<int> &v) {
        int res = INT_MIN;
        for(auto x : v) res = max(res, x);
        return res;
    }
    int get_min(vector<int> &v) {
        int res = INT_MAX;
        for(auto x : v) res = min(res,x);
        return res;
    }
```

更进一步：找到一个最大一个最小

贪心：

> 一个数组的[数组值] 即为 na ,可以表示为:
>
> *na* =  *i=1*∑*n*  max(*nums*[i], *nums*[i−1])  −  *i=1*∑*n*  min(*nums*[i], *nums*[i−1])
>
> na′= na+2 * maxMinu−2 * minAdd

```c++
    int maxValueAfterReverse(vector<int>& nums) {
        int ans = 0, n = nums.size();
        for(int i = 0; i < n -1; i++) ans += abs(nums[i+1]-nums[i]);
        int tmp = 0;
        for(int i = 1; i < n-1; i++){
            tmp = max(tmp, abs(nums[i+1]-nums[0])-abs(nums[i+1]-nums[i]) );
            tmp = max(tmp, abs(nums[n-1]-nums[i-1])-abs(nums[i]-nums[i-1]));
        }
        int a = INT_MIN, b = INT_MAX;
        for(int j = 0; j < n-1; j++){
            a = max(a, min(nums[j], nums[j+1]));
            b = min(b, max(nums[j], nums[j+1]));
        }
        return ans + max(tmp, 2*(a-b));
    }
```

