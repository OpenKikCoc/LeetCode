## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-176/)


### [1351. 统计有序矩阵中的负数](https://leetcode-cn.com/problems/count-negative-numbers-in-a-sorted-matrix/)

数据范围很小 暴力即可

```c++
class Solution {
public:
    int countNegatives(vector<vector<int>>& grid) {
        int res = 0;
        for(int i = 0; i < grid.size(); ++i) {
            for(int j = 0; j < grid[0].size(); ++j) if(grid[i][j] < 0) ++res;
        }
        return res;
    }
};
```

也可以倒序遍历 复杂度更低

### [1352. 最后 K 个数的乘积](https://leetcode-cn.com/problems/product-of-the-last-k-numbers/) [TAG]

想到了把0处理为1 以及使用前缀积 没想到遇到0就把前缀积更新为1 导致溢出出错

```c++
class ProductOfNumbers {
public:
    vector<int> num, get;//, zero;
    int zero;
    ProductOfNumbers() {
        num.push_back(1);
        get.push_back(1);
    }
    
    void add(int m) {
        if(m) {
            num.push_back(m);
            get.push_back((get[get.size()-1])*m);
        } else {
            zero = num.size();
            //zero.push_back(num.size());
            num.push_back(1);
            // 因为出现为0的 前面都已经没有价值了 可以直接赋值1
            // get.push_back(get[get.size()-1]);
            get.push_back(1);
        }
    }
    
    int getProduct(int k) {
        int res = 1, n = num.size();
        //for(auto v : zero) if(v>=n-k) return 0;
        if(zero >= n-k) return 0;
        return get[n-1]/get[n-k-1];
    }
};
```

### [1353. 最多可以参加的会议数目](https://leetcode-cn.com/problems/maximum-number-of-events-that-can-be-attended/) [TAG]

线性扫描问题 考虑每一天可选的会议范围 并选择结束时间最早的会议

主要是使用优先队列维护 不能简单贪心

```c++
const int MAX = 1e5 + 1;
class Solution {
public:
    int maxEvents(vector<vector<int>>& events) {
        vector<vector<int>> left(MAX);
        for (int i = 0; i < events.size(); ++i)
            left[events[i][0]].emplace_back(i);
        // 每个时间点开始的会议 存下标
        
        int ans = 0;
        priority_queue<int, vector<int>, greater<>> pq;
        for (int i = 1; i < MAX; ++i) {
            for (int j : left[i])
                pq.push(events[j][1]);
            while (!pq.empty() && pq.top() < i)
                pq.pop();
            if (!pq.empty()) {
                pq.pop();
                ans++;
            }
        }
        return ans;
    }
};
```

### [1354. 多次求和构造目标数组](https://leetcode-cn.com/problems/construct-target-array-with-multiple-sums/)

比赛中好多暴力模拟代码都过了 主要应对两个case

```c++
// [2]
// [1,1000000000]
class Solution {
public:
    bool isPossible(vector<int>& target) {
        if (target.size()==1) return target[0]==1;
        int n = target.size();
        long long sum = 0, maxv, newv, left, y, k;
        priority_queue<int> pq;
        for(auto v : target) {sum += v;pq.push(v);}
        while(!pq.empty() && pq.top()>1) {
            maxv = pq.top();
            pq.pop();
            // check 新数字
            if(2*maxv-sum < 1) return false;
            // 其他数的和为 sum-maxv 新数为 maxv - (sum-maxv) 新sum为 maxv
            left = sum-maxv;
            /*
            if(!pq.empty()) {
                y = pq.top();
                if(y == 1) k = (maxv-y+left-1)/left;
                else k = (maxv-y)/left+1;
                maxv -= k*left;
                if(maxv < 1) return false;
                sum -= k*left;
            }
            */
            k = (maxv-1)/left;
            maxv -= k*left;
            sum -= k*left;

            pq.push(maxv);
        }
        return true;
    }
};
```

对于`[2]` left计算得0 所以最好放在第一行特判

对于`[1,1000000000]` 如果当前取出的maxv在处理后还会是maxv 需要考虑：

每次减去的数值都是其他数的值(sum-maxv)=left

因此考虑取余 但要-1因为减后的结果不能是0

【此办法减少循环中操作优先队列的次数】