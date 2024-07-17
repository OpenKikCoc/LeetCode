## [比赛链接](https://leetcode.cn/contest/weekly-contest-177/)

### [1360. 日期之间隔几天](https://leetcode.cn/problems/number-of-days-between-two-dates/) [TAG]

计算两个日期的天数差

1模拟算 

```c++
class Solution {
    bool leap_year(int year) {
         return ((year % 400 == 0) || (year % 100 != 0 && year % 4 == 0));
    }
    int date_to_int(string date) {
        int year, month, day;
        sscanf(date.c_str(), "%d-%d-%d", &year, &month, &day);
        int month_length[] = {31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30};
        int ans = 0;
        while (year != 1971 or month != 1 or day != 1) {
            ++ans;
            if (--day == 0)
                if (--month == 0)
                    --year;
            if (day == 0) {
                day = month_length[month];
                if (month == 2 && leap_year(year))
                    ++day;
            }
            if (month == 0)
                month = 12;
        }
        return ans;
    }
public:
    int daysBetweenDates(string date1, string date2) {
        return abs(date_to_int(date1) - date_to_int(date2));
    }
};
```

赛榜解法：

```c++
class Solution {
    int x[100]={0,31,28,31,30,31,30,31,31,30,31,30,31};
    int get(string date)
    {
        int y=0,m=0,d=0,i,ans=0;
        for(i=0;i<4;i++)y=y*10+date[i]-'0';
        for(i=5;i<7;i++)m=m*10+date[i]-'0';
        for(i=8;i<10;i++)d=d*10+date[i]-'0';
        for(i=0;i<y;i++)if(i%400==0||i%4==0&&i%100)ans+=366;
        else ans+=365;
        if(y%400==0||y%4==0&&y%100)x[2]=29;
        else x[2]=28;
        for(i=1;i<m;i++)ans+=x[i];
        ans+=d;
        return ans;
    }
public:
    int daysBetweenDates(string date1, string date2) {
        return abs(get(date1)-get(date2));
    }
};
```

Zeller公式：

```c++
class Solution {
public:
    int toDay(const string& dateStr) {
        int year, month, day;
        sscanf(dateStr.c_str(), "%d-%d-%d", &year, &month, &day);
        if (month <= 2) {
            year--;
            month += 10;
        }
        else month -= 2;
        return 365 * year + year / 4 - year / 100 + year / 400
             + 30 * month + (3 * month - 1) / 5 + day /* -584418 */;
    }
    int daysBetweenDates(string date1, string date2) {
        return abs(toDay(date1) - toDay(date2));
    }
};
```



### [1361. 验证二叉树](https://leetcode.cn/problems/validate-binary-tree-nodes/)

> 二叉树上有 n 个节点，按从 0 到 n - 1 编号，其中节点 i 的两个子节点分别是 leftChild[i] 和 rightChild[i]。
>
> 只有 所有 节点能够形成且 只 形成 一颗 有效的二叉树时，返回 true；否则返回 false

自己解法：并查集

```c++
class Solution {
public:
    int f[10005];
    int find(int x) {
        if(f[x] == x) return x;
        return f[x] = find(f[x]);
    }
    void merge(int i, int j) {
        int x = find(i), y = find(j);
        if(x!=y) f[i] = j;
    }
    bool judge(int i, int j) {
        return find(i) == find(j);
    }
    bool validateBinaryTreeNodes(int n, vector<int>& leftChild, vector<int>& rightChild) {
        unordered_map<int,int> l, r, fa;
        for(int i = 1; i <= n; ++i) f[i] = i;
        int v, cnt = 0;
        for(int i = 0; i < n; ++i) {
            v = leftChild[i];
            if(v != -1) {
                ++v;
                if(l[i+1] || fa[v]) return false;
                if(judge(i+1,v)) return false;
                l[i+1] = v;
                fa[v] = i+1;
                merge(i+1,v);
                ++cnt;
            }
        }
        for(int i = 0; i < n; ++i) {
            v = rightChild[i];
            if(v != -1) {
                ++v;
                if(r[i+1] || fa[v]) return false;
                if(judge(i+1,v)) return false;
                r[i+1] = v;
                fa[v] = i+1;
                ++cnt;
            }
        }
        return cnt == n-1;
    }
};
```

题解有很多按度数算是错误的



### [1362. 最接近的因数](https://leetcode.cn/problems/closest-divisors/) 

给你一个整数 `num`，请你找出同时满足下面全部要求的两个整数：

- 两数乘积等于  `num + 1` 或 `num + 2`
- 以绝对差进行度量，两数大小最接近

```c++
class Solution {
public:
    vector<int> closestDivisors(int num) {
        vector<int> res(2);
        ++num;
        int r = sqrt(num);
        int minv = INT_MAX;
        for(int i = r; i >= 1; --i) {
            if(num%i==0) {
                res[0] = i, res[1] = num/i;
                minv = res[1]-res[0];
                break;
            }
        }
        ++num;
        r = sqrt(num);
        for(int i = r; i >= 1; --i) {
            if(num%i==0) {
                if(num/i - i < minv) {
                    res[0] = i, res[1] = num/i;
                    minv = res[1]-res[0];
                }
                break;
            }
        }
        return res;
    }
};
```

### [1363. 形成三的最大倍数](https://leetcode.cn/problems/largest-multiple-of-three/)

> 给你一个整数数组 `digits`，你可以通过按任意顺序连接其中某些数字来形成 **3** 的倍数，请你返回所能得到的最大的 3 的倍数。

对所有整数求和 随后依据mod3得到的结果去除一些整数 再生成res

```c++
class Solution {
public:
    string largestMultipleOfThree(vector<int>& digits) {
        vector<int> cnt(10);
        int sum = 0;
        for(auto v : digits) {
            ++cnt[v];
            sum += v;
        }
        bool f = true;
        if(sum%3 == 0) {
            
        }else if(sum%3 == 1) {
            if(cnt[1]) --cnt[1];
            else if(cnt[4]) --cnt[4];
            else if(cnt[7]) --cnt[7];
            else if(cnt[2] >= 2) cnt[2] -= 2;
            else if(cnt[5] >= 2) cnt[5] -= 2;
            else if(cnt[8] >= 2) cnt[8] -= 2;
            else f = false;
        }else if(sum%3 == 2) {
            if(cnt[2]) --cnt[2];
            else if(cnt[5]) --cnt[5];
            else if(cnt[8]) --cnt[8];
            else if(cnt[1] >= 2) cnt[1] -= 2;
            else if(cnt[4] >= 2) cnt[4] -= 2;
            else if(cnt[7] >= 2) cnt[7] -= 2;
            else f = false;
        }
        
        string res;
        if(!f) {
            if(cnt[0]) res.push_back('0');
            return res;
        }
        for(int v = 9; v > 0; --v) {
            while(cnt[v]--) {
                res.push_back('0'+v);
            }
        }
        if(res.size()) while(cnt[0]--) res.push_back('0');
        else if(cnt[0]) res.push_back('0');
        return res;
    }
};
```
