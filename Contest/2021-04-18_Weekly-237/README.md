## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-237/)


### [1832. 判断句子是否为全字母句](https://leetcode-cn.com/problems/check-if-the-sentence-is-pangram/)

略

```c++
class Solution {
public:
    bool checkIfPangram(string sentence) {
        unordered_set<char> S;
        for (auto c : sentence)
            S.insert(c);
        return S.size() == 26;
    }
};
```


### [1833. 雪糕的最大数量](https://leetcode-cn.com/problems/maximum-ice-cream-bars/)

排序 略

```c++
class Solution {
public:
    int maxIceCream(vector<int>& costs, int coins) {
        sort(costs.begin(), costs.end());
        int res = 0, n = costs.size();
        for (int i = 0; i < n; ++ i )
            if (costs[i] > coins)
                break;
            else {
                coins -= costs[i];
                res ++ ;
            }
        return res;
    }
};
```

### [1834. 单线程 CPU](https://leetcode-cn.com/problems/single-threaded-cpu/) [TAG]

外层**写法**

```c++
class Solution {
public:
    using LL = long long;
    struct Task {
        int et, pt, id;
        // heap
        bool operator < (const Task & t) const {
            return pt == t.pt ? id > t.id : pt > t.pt;
        }
    };
    
    vector<int> getOrder(vector<vector<int>>& tasks) {
        int n = tasks.size();
        vector<Task> qt;
        for (int i = 0; i < n; ++ i )
            qt.push_back({tasks[i][0], tasks[i][1], i});
        sort(qt.begin(), qt.end(), [](const Task & a, const Task & b) {
            return a.et == b.et ? a.pt < b.pt : a.et < b.et;
        });
        
        priority_queue<Task> heap;
        vector<int> res;
        int last = 0;
        LL time = 0;
        // 每次过程执行一个任务
        while (heap.size() || last < n) {
            // 细节 更新time基准【所谓的时间戳快进】
            if (heap.empty())
                time = max(time, (LL)qt[last].et);
            while (last < n && qt[last].et <= time)
                heap.push(qt[last ++ ]);
            
            auto t = heap.top(); heap.pop();
            res.push_back(t.id);
            time += t.pt;
        }
        return res;
    }
};
```

### [1835. 所有数对按位与结果的异或和](https://leetcode-cn.com/problems/find-xor-sum-of-all-pairs-bitwise-and/)

注意判断条件的思考

```c++
class Solution {
public:
    using LL = long long;
    int getXORSum(vector<int>& arr1, vector<int>& arr2) {
        int n1 = arr1.size(), n2 = arr2.size();
        int res = 0;
        for (int i = 0; i < 32; ++ i ) {
            LL c1 = 0, c2 = 0;
            for (auto v : arr1)
                c1 += (v >> i & 1);
            for (auto v : arr2)
                c2 += (v >> i & 1);
            LL t = c1 * c2;
            // 判断条件: 为奇数个则最终AND结果中该位1的有奇数个
            if (t & 1)
                res += 1 << i;
        }
        return res;
    }
};
```
