## [比赛链接](https://leetcode.cn/contest/biweekly-contest-42/)


### [1700. 无法吃午餐的学生数量](https://leetcode.cn/problems/number-of-students-unable-to-eat-lunch/)

模拟即可

```c++
ass Solution {
public:
    int countStudents(vector<int>& students, vector<int>& sandwiches) {
        int n = students.size();
        queue<int> q;
        for (int i = 0; i < n; ++ i ) q.push(i);
        
        vector<int> c(n);
        for (int i = 0; i < n; ++ i ) {
            int sz = q.size(), p;
            while (sz -- ) {
                if (students[q.front()] == sandwiches[i]) {
                    p = q.front();
                    q.pop();
                    break;
                } else {
                    q.push(q.front());
                    q.pop();
                }
            }
            if (sz < 0) break;
            ++ c[p];
        }
        
        int res = 0;
        for (int i = 0; i < n; ++ i ) if (!c[i]) ++ res;
        return res;
    }
};
```


### [1701. 平均等待时间](https://leetcode.cn/problems/average-waiting-time/)

略

```c++
class Solution {
public:
    double averageWaitingTime(vector<vector<int>>& customers) {
        int n = customers.size();
        long long endt = 0, tot = 0;
        for (auto cus : customers) {
            int come = cus[0], cost = cus[1];
            if (endt <= come) {
                tot += cost;
                endt = come + cost;
            } else {
                tot += cost + endt - come;
                endt = endt + cost;
            }
        }
        return double(tot) / n;
    }
};
```

### [1702. 修改后的最大二进制字符串](https://leetcode.cn/problems/maximum-binary-string-after-change/) [TAG]

模拟必然超时

考虑：
> 0 1 1 1 1 0 ===> 1 0 1 1 1 1
> 消除第一位和末尾0 产生第二位0

也即：每将最前面的0向后移动一位需要消耗掉后方一个0

```c++
class Solution {
public:
    string maximumBinaryString(string binary) {
        int n = binary.size(), k = 0;
        // 找到第一个0
        while (k < n && binary[k] == '1') ++ k ;
        if (k == n) return binary;
        
        int cnt = 0;
        for (int i = k + 1; i < n; ++ i )
            if (binary[i] == '0')
                ++ cnt;
        string res = string(n, '1');
        res[k + cnt] = '0';
        return res;
    }
};
```

### [1703. 得到连续 K 个 1 的最少相邻交换次数](https://leetcode.cn/problems/minimum-adjacent-swaps-for-k-consecutive-ones/) [TAG]

所有1坐标 如何移动使得其新的坐标成为一个等差数列（公差1）

考虑计算答案时是绝对值求和取 min ，转化映射后即绝对值不等式

做一个映射：`ai' = aix - i`

```c++
class Solution {
public:
    // 交换过程中1的相对位置必然不变
    // 绝对值不等式
    using LL = long long;
    int minMoves(vector<int>& nums, int k) {
        vector<int> ve;
        for (int i = 0; i < nums.size(); ++ i )
            if (nums[i])
                ve.push_back(i - ve.size());
        int n = ve.size();
        vector<LL> s(n + 1);
        for (int i = 1; i <= n; ++ i ) s[i] = s[i - 1] + ve[i - 1];
        LL res = 1e18;
        for (int i = k; i <= n; ++ i ) {
            int l = i - k + 1, r = i;
            int mid = (l + r) / 2;
            LL x = ve[mid - 1];
            LL left = x * (mid - l) - (s[mid - 1] - s[l - 1]);
            LL right = (s[r] - s[mid]) - x * (r - mid);
            res = min(res, left + right);
        }
        return res;
    }
};
```
