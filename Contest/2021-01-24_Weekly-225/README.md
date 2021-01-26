## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-225/)


### [1736. 替换隐藏数字得到的最晚时间](https://leetcode-cn.com/problems/latest-time-by-replacing-hidden-digits/)

扫一遍即可

```c++
class Solution {
public:
    string maximumTime(string time) {
        int n = time.size();
        for (int i = 0; i < n; ++ i )
            if (time[i] == '?') {
                if (i == 0) {
                    if (time[1] == '?' || time[1] >= '0' && time[1] <= '3') time[0] = '2';
                    else time[0] = '1';
                } else if (i == 1) {
                    if (time[0] == '2') time[1] = '3';
                    else time[1] = '9';
                } else if (i == 3) {
                    time[3] = '5';
                } else time[4] = '9';
            }
        return time;
    }
};
```

更优雅：

```c++
class Solution {
public:

    bool check(string time, char str[]) {
        for (int i = 0; i < 5; i ++ ) {
            if (time[i] == str[i] || time[i] == '?') continue;
            return false;
        }
        return true;
    }

    string maximumTime(string time) {
        for (int i = 23; i >= 0; i -- ) {
            for (int j = 59; j >= 0; j -- ) {
                char str[20];
                sprintf(str, "%02d:%02d", i, j);
                if (check(time, str))
                    return str;
            }
        }
        return "";
    }
};
```

### [1737. 满足三条件之一需改变的最少字符数](https://leetcode-cn.com/problems/change-minimum-characters-to-satisfy-one-of-three-conditions/)

没读题导致 WA

```c++
class Solution {
public:
    // a < b
    int func1(string a, string b) {
        int n1 = a.size(), n2 = b.size();
        vector<int> c1(30), c2(30), s1(30), s2(30);
        for (auto c : a) c1[c - 'a'] ++ ;
        for (auto c : b) c2[c - 'a'] ++ ;
        
        for (int i = 1; i <= 26; ++ i ) s1[i] = s1[i - 1] + c1[i - 1];
        for (int i = 1; i <= 26; ++ i ) s2[i] = s2[i - 1] + c2[i - 1];
        
        int res = 1e9;
        for (int top = 0; top < 25; ++ top ) {
            int cost1 = s1[26] - s1[top + 1], cost2 = s2[top + 1];
            res = min(res, cost1 + cost2);
        }
        return res;
    }
    
    int func2(string a, string b) {
        int n1 = a.size(), n2 = b.size();
        vector<int> c1(30), c2(30);
        for (auto c : a) c1[c - 'a'] ++ ;
        for (auto c : b) c2[c - 'a'] ++ ;
        
        int res = 1e9;
        for (int i = 0; i < 26; ++ i ) {
            int cost1 = n1 - c1[i], cost2 = n2 - c2[i];
            res = min(res, cost1 + cost2);
        }
        return res;
    }
    int minCharacters(string a, string b) {
        // cout << func1(a, b) << ' ' << func1(b, a) << ' ' << func2(a, b) << endl;
        return min(min(func1(a, b), func1(b, a)), func2(a, b));
    }
};
```

代码可简单优化 略

### [1738. 找出第 K 大的异或坐标值](https://leetcode-cn.com/problems/find-kth-largest-xor-coordinate-value/)

堆即可

```c++
class Solution {
public:
    int kthLargestValue(vector<vector<int>>& matrix, int k) {
        int n = matrix.size(), m = matrix[0].size();
        vector<vector<int>> g(n + 1, vector<int>(m + 1));
        
        priority_queue<int> heap;
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j ) {
                g[i][j] = g[i - 1][j] ^ g[i][j - 1] ^ g[i - 1][j - 1] ^ matrix[i - 1][j - 1];
                heap.push(g[i][j]);
            }
        
        int t = 0;
        while (k -- ) {
            t = heap.top();
            heap.pop();
        }
        
        return t;
    }
};
```

数组排序

```c++
const int N = 1000010;

int q[N];

class Solution {
public:
    int kthLargestValue(vector<vector<int>>& w, int k) {
        int n = w.size(), m = w[0].size();
        int cnt = 0;
        for (int i = 0; i < n; i ++ )
            for (int j = 0; j < m; j ++ ) {
                if (i) w[i][j] ^= w[i - 1][j];
                if (j) w[i][j] ^= w[i][j - 1];
                if (i && j) w[i][j] ^= w[i - 1][j - 1];
                q[cnt ++ ] = w[i][j];
            }
        k = cnt - k;
        nth_element(q, q + k, q + cnt);
        return q[k];
    }
};
```

stl

```c++
class Solution {
public:
    int kthLargestValue(vector<vector<int>>& matrix, int k) {
		int n = matrix.size();
		int m = matrix[0].size();
		vector<vector<int>> a(n, vector<int>(m));
		vector<int> result;
		result.reserve(n * m);
		for (int i = 0; i < n; ++i) {
			for (int j = 0; j < m; ++j) {
				int r = matrix[i][j];
				if (i) r ^= a[i - 1][j];
				if (j) r ^= a[i][j - 1];
				if (i && j) r ^= a[i - 1][j - 1];
				a[i][j] = r;
				result.push_back(r);
			}
		}
		k = n * m - k;
		nth_element(result.begin(), result.begin() + k, result.end());
		return result[k];
	}
};
```

### [1739. 放置盒子](https://leetcode-cn.com/problems/building-boxes/) [TAG]

如果摆 `k` 层，共可以摆

> (1 * 2 + 2 * 3 + ... + k * (k + 1)) / 2  =  k * (k + 1) * (k + 2) / 6

个方块

考虑满 `k` 个之后在底面再铺，已有方块为 `k * (k - 1) / 2`

**随后令 k = 1 则第 k 次增加接触地面面积可以增加 k 个放置总量**

```c++
class Solution {
public:
    int minimumBoxes(int n) {
        int sum = 0, k = 1;
        while (sum + k * (k + 1) / 2 <= n) {
            sum += k * (k + 1) / 2;
            k ++ ;
        }
        
        int res = k * (k - 1) / 2;
        k = 1;
        while (sum < n) {
            sum += k;
            k ++ ;
            res ++ ;
        }
        return res;
    }
};
```

下面代码超时

> 本质先求出必定大于等于 n 的方块塔，再挨个往下减
>
> 二分的部分计算较多，超时。。。距离 AC 一步之遥

```c++
class Solution {
public:
    using LL = long long;
    int calc(int x) {
        return (LL)x * (x + 1) / 2;
    }
    LL get(int x) {
        LL res = 0;
        while (x) {
            res += calc(x);
            -- x ;
        }
        return res;
    }
    int minimumBoxes(int n) {
        int l = 0, r = n;
        while (l < r) {
            int m = l + r >> 1;
            if (get(m) < n) l = m + 1;
            else r = m;
        }
        // cout << "l = " << l << " get = " << get(l) << endl;
        int res = calc(l), tot = get(l), x = l;
        while (tot - x >= n) {
            tot -= x;
            res -= 1;
            x -- ;
        }
        return res;
    }
};
```

超时代码优化 AC ：

```c++
class Solution {
public:
    int minimumBoxes(int n) {
        int sum = 0, k = 1;
        for (;;) {
            sum += k * (k + 1) / 2;
            if (sum >= n) break;
            k ++ ;
        }
        
        int res = k * (k + 1) / 2;
        while (sum - k >= n) {
            sum -= k;
            k -- ;
            res -- ;
        }
        return res;
    }
};
```

