## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-182/)


### [1394. 找出数组中的幸运数](https://leetcode-cn.com/problems/find-lucky-integer-in-an-array/)

一个整数的出现频次和它的数值大小相等，称这个整数为「幸运数」

如果数组中存在多个幸运数，只需返回 最大 的那个。

```c++
class Solution {
public:
    int findLucky(vector<int>& arr) {
        unordered_map<int, int> m;
        for(auto v : arr) {
            ++m[v];
        }
        int res = -1;
        for(auto v : m) {
            if(v.first == v.second) {
                if(v.first > res) res = v.first;
            }
        }
        return res;
    }
};
```


### [1395. 统计作战单位数](https://leetcode-cn.com/problems/count-number-of-teams/)

一排n个rating 升序/降序3个可以成为一组单位 求可以组建的单位数量

暴力 以及dp

```c++
class Solution {
public:
    int numTeams(vector<int>& rating) {
        int n = rating.size();
        int res = 0;
        for(int i = 0; i < n; ++i) {
            for(int j = i+1; j < n; ++j) {
                for(int k = j+1; k < n; ++k) {
                    if(rating[i] < rating[j] && rating[j] < rating[k]) {
                        //cout <<i<<j<<k<<endl;
                        ++res;
                    }
                    if(rating[i] > rating[j] && rating[j] > rating[k]) {
                        //cout <<i<<j<<k<<endl;
                        ++res;
                    }
                }
            }
        }
        return res;
    }
};
```

```c++
class Solution {
public:
    int numTeams(vector<int>& rating) {
        int n = rating.size();
        int res = 0;
        vector<int> dp1(n+1),dp2(n+1);
        for(int i = 1; i < n; ++i) {
            // skip i = 0
            for(int j = 0; j < i; ++j) {
                if(rating[j] < rating[i]) {
                    ++dp1[i];
                    if(dp1[j]) {
                        res += dp1[j];
                    }
                }
                if(rating[j] > rating[i]) {
                    ++dp2[i];
                    if(dp2[j]) {
                        res += dp2[j];
                    }
                }
            }
        }
        return res;
    }
};
```



### [1396. 设计地铁系统](https://leetcode-cn.com/problems/design-underground-system/)

主要是建模

```c++
class UndergroundSystem {
    unordered_map<int, pair<string, int>> checkRecord;
    unordered_map<string, pair<double, int>> count;    
    string getStationName(string startStation, string endStation) {
        return startStation + "," + endStation;
    }

public:
    UndergroundSystem() {
    }
    
    void checkIn(int id, string stationName, int t) {
        checkRecord[id] = {stationName, t};
    }
    
    void checkOut(int id, string stationName, int t) {
        string name = getStationName(checkRecord[id].first, stationName);
        t -= checkRecord[id].second;
        count[name].first += (double)t;
        count[name].second += 1;
    }
    
    double getAverageTime(string startStation, string endStation) {
        string name = getStationName(startStation, endStation);
        double ans = count[name].first / (double)count[name].second;
        return ans;
    }
};

```

### [1397. 找到所有好字符串](https://leetcode-cn.com/problems/find-all-good-strings/)

数位dp

todo

```c++

```
