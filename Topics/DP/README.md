# DP

[toc]

- [DP](#dp)
- [1. 线性DP](#1-线性dp)
  - [1.1 最经典单串：](#11-最经典单串)
      - [300. 最长上升子序列](#300-最长上升子序列)
  - [1.2 最经典双串：](#12-最经典双串)
      - [1143. 最长公共子序列](#1143-最长公共子序列)
  - [1.3 经典问题：](#13-经典问题)
      - [120. 三角形最小路径和](#120-三角形最小路径和)
      - [53. 最大子序和](#53-最大子序和)
      - [152. 乘积最大子数组](#152-乘积最大子数组)
      - [887. 鸡蛋掉落（DP+二分） poj 3783](#887-鸡蛋掉落dp二分-poj-3783)
      - [354. 俄罗斯套娃信封问题](#354-俄罗斯套娃信封问题)
  - [1.4 打家劫舍系列: (打家劫舍3 是树形DP)](#14-打家劫舍系列-打家劫舍3-是树形dp)
      - [198. 打家劫舍 ](#198-打家劫舍)
      - [213. 打家劫舍 II](#213-打家劫舍-ii)
  - [1.5 股票系列:](#15-股票系列)
      - [121. 买卖股票的最佳时机 ](#121-买卖股票的最佳时机)
      - [122. 买卖股票的最佳时机 II](#122-买卖股票的最佳时机-ii)
      - [123. 买卖股票的最佳时机 III](#123-买卖股票的最佳时机-iii)
      - [188. 买卖股票的最佳时机 IV](#188-买卖股票的最佳时机-iv)
      - [309. 最佳买卖股票时机含冷冻期](#309-最佳买卖股票时机含冷冻期)
      - [714. 买卖股票的最佳时机含手续费](#714-买卖股票的最佳时机含手续费)
  - [1.6 字符串匹配系列](#16-字符串匹配系列)
      - [72. 编辑距离](#72-编辑距离)
      - [44. 通配符匹配](#44-通配符匹配)
      - [10. 正则表达式匹配](#10-正则表达式匹配)
  - [其他](#其他)
      - [983. 最低票价](#983-最低票价)
- [2、区间 DP](#2区间-dp)
      - [516. 最长回文子序列](#516-最长回文子序列)
      - [730. 统计不同回文子序列](#730-统计不同回文子序列)
      - [1039. 多边形三角剖分的最低得分](#1039-多边形三角剖分的最低得分)
      - [664. 奇怪的打印机](#664-奇怪的打印机)
- [3、背包DP](#3背包dp)
      - [416. 分割等和子集 (01背包-要求恰好取到背包容量)](#416-分割等和子集-01背包-要求恰好取到背包容量)
      - [494. 目标和 (01背包-求方案数)](#494-目标和-01背包-求方案数)
      - [322. 零钱兑换 (完全背包)](#322-零钱兑换-完全背包)
      - [518. 零钱兑换 II (完全背包-求方案数)](#518-零钱兑换-ii-完全背包-求方案数)
      - [474. 一和零 (二维费用背包)](#474-一和零-二维费用背包)
- [4、树形DP](#4树形dp)
      - [124. 二叉树中的最大路径和](#124-二叉树中的最大路径和)
      - [1245. 树的直径 (邻接表上的树形DP)](#1245-树的直径-邻接表上的树形dp)
      - [543. 二叉树的直径](#543-二叉树的直径)
      - [333. 最大 BST 子树 ](#333-最大-bst-子树)
      - [337. 打家劫舍 III](#337-打家劫舍-iii)
- [5、状态压缩 DP](#5状态压缩-dp)
      - [464. 我能赢吗](#464-我能赢吗)
      - [526. 优美的排列](#526-优美的排列)
      - [935. 骑士拨号器](#935-骑士拨号器)
      - [1349. 参加考试的最大学生数](#1349-参加考试的最大学生数)
- [6、数位 DP](#6数位-dp)
      - [233. 数字 1 的个数](#233-数字-1-的个数)
      - [902. 最大为 N 的数字组合](#902-最大为-n-的数字组合)
      - [1015. 可被 K 整除的最小整数](#1015-可被-k-整除的最小整数)
- [7、计数型 DP](#7计数型-dp)
      - [62. 不同路径](#62-不同路径)
      - [63. 不同路径 II](#63-不同路径-ii)
      - [96. 不同的二叉搜索树 (卡特兰数)](#96-不同的二叉搜索树-卡特兰数)
      - [1259. 不相交的握手 (卢卡斯定理求大组合数模质数)](#1259-不相交的握手-卢卡斯定理求大组合数模质数)
- [8、递推型 DP](#8递推型-dp)
      - [70. 爬楼梯 ](#70-爬楼梯)
      - [509. 斐波那契数](#509-斐波那契数)
      - [935. 骑士拨号器](#935-骑士拨号器-1)
      - [957. N 天后的牢房](#957-n-天后的牢房)
      - [1137. 第 N 个泰波那契数](#1137-第-n-个泰波那契数)
- [9、概率型 DP](#9概率型-dp)
      - [808. 分汤](#808-分汤)
      - [837. 新21点](#837-新21点)
- [10、博弈型 DP](#10博弈型-dp)
      - [293. 翻转游戏](#293-翻转游戏)
      - [294. 翻转游戏 II](#294-翻转游戏-ii)
      - [292. Nim 游戏](#292-nim-游戏)
      - [877. 石子游戏](#877-石子游戏)
      - [1140. 石子游戏 II](#1140-石子游戏-ii)
      - [348. 判定井字棋胜负](#348-判定井字棋胜负)
      - [794. 有效的井字游戏 ](#794-有效的井字游戏)
      - [1275. 找出井字棋的获胜者](#1275-找出井字棋的获胜者)
- [11、记忆化搜索](#11记忆化搜索)
      - [329. 矩阵中的最长递增路径](#329-矩阵中的最长递增路径)
      - [576. 出界的路径数](#576-出界的路径数)



# 1. 线性DP

## 1.1 最经典单串：

#### [300. 最长上升子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence/)

```c++
// 朴素写法
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size(), res = 0;
        vector<int> dp(n);
        for(int i = 0; i < n; ++i) {
            dp[i] = 1;
            for(int j = 0; j < i; ++j) if(nums[j] < nums[i]) dp[i] = max(dp[i], dp[j]+1);
            res = max(res, dp[i]);
        }
        return res;
    }
// nlogn
    int lengthOfLIS(vector<int>& nums) {
        vector<int> minnums;
        for(int v : nums) {
            if(minnums.empty() || v > minnums.back()) minnums.push_back(v);
            else *lower_bound(minnums.begin(), minnums.end(), v) = v;
        }
        return minnums.size();
    }
```



## 1.2 最经典双串：

#### [1143. 最长公共子序列](https://leetcode-cn.com/problems/longest-common-subsequence)

```c++
// 朴素写法
    int longestCommonSubsequence(string text1, string text2) {
        int l1 = text1.size(), l2 = text2.size();
        vector<vector<int>> dp(l1+1,vector<int>(l2+1));
        // 边界全0 略去初始化
        for(int i = 1; i <= l1; ++i) {
            for(int j = 1; j <= l2; ++j) {
                if(text1[i-1] == text2[j-1]) dp[i][j] = dp[i-1][j-1]+1;
                else dp[i][j] = max(dp[i][j-1], dp[i-1][j]);
            }
        }
        return dp[l1][l2];
    }
// 空间
    int longestCommonSubsequence(string text1, string text2) {
        int l1 = text1.size(), l2 = text2.size();
        vector<int> dp(l2+1);
        // 需要记录左上方dp[i-1][j-1]的值
        int tmp, last;
        for(int i = 1; i <= l1; ++i) {
            last = 0;
            for(int j = 1; j <= l2; ++j) {
                tmp = dp[j];
                if(text1[i-1] == text2[j-1]) dp[j] = last+1;
                else dp[j] = max(dp[j-1], dp[j]);
                last = tmp;
            }
        }
        return dp[l2];
    }
```



## 1.3 经典问题：

#### [120. 三角形最小路径和](https://leetcode-cn.com/problems/triangle)

```c++
// top -> bottom
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        if(!n) return 0;
        vector<int> dp(n);
        dp[0] = triangle[0][0];
        for(int i = 1; i < n; ++i) {
            for(int j = i; j >= 0; --j) {
                if(j == i) dp[j] = dp[j-1];
                else if(j == 0) dp[j] = dp[j];
                else dp[j] = min(dp[j-1], dp[j]);
                dp[j] += triangle[i][j];
            }
        }
        int res = INT_MAX;
        for(int i = 0; i < n; ++i) res = min(res, dp[i]);
        return res;
    }
// bottom -> top
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        if(!n) return 0;
        vector<int> dp(n+1);
        for(int i = n-1; i >= 0; --i){
            for(int j = 0;j <= i; ++j){
                dp[j] = min(dp[j+1], dp[j]) + triangle[i][j];
            }
        }
        return dp[0];
    }
```



#### [53. 最大子序和](https://leetcode-cn.com/problems/maximum-subarray)

```c++
// 朴素算法
    int maxSubArray(vector<int>& nums) {
        int n = nums.size(), res = INT_MIN;
        vector<int> dp(n);
        for(int i = 0; i < n; ++i) {
            dp[i] = nums[i];
            if(i && dp[i-1] > 0) dp[i] = max(dp[i], dp[i-1]+nums[i]);
            res = max(res, dp[i]);
        }
        return res;
    }
// 空间
    int maxSubArray(vector<int>& nums) {
        int n = nums.size(), res = INT_MIN;
        int psum = 0, v;
        for(int i = 0; i < n; ++i) {
            v = nums[i];
            if(i && psum > 0) v = max(v, psum + v);
            res = max(res, v);
            psum = v;
        }
        return res;
    }
// 简化
    int maxSubArray(vector<int>& nums) {
        int res = INT_MIN;
        int psum = 0;
        for(auto v : nums) {
            psum = max(psum + v, v);
            res = max(res, psum);
        }
        return res;
    }
```

#### [152. 乘积最大子数组](https://leetcode-cn.com/problems/maximum-product-subarray)

```c++
// 朴素写法
    int maxProduct(vector<int>& nums) {
        int n = nums.size(), res = INT_MIN;
        vector<int> dpmax(n+1), dpmin(n+1);
        dpmax[0] = dpmin[0] = 1;
        for(int i = 1; i <= n; ++i) {
            dpmax[i] = max(nums[i-1], max(dpmax[i-1] * nums[i-1], dpmin[i-1] * nums[i-1]));
            dpmin[i] = min(nums[i-1], min(dpmax[i-1] * nums[i-1], dpmin[i-1] * nums[i-1]));
            res = max(dpmax[i], res);
        }
        return res;
    }
// 空间
    int maxProduct(vector<int>& nums) {
        int n = nums.size(), res = INT_MIN;
        int dpmax = 1, dpmin = 1;
        for(int i = 1; i <= n; ++i) {
            int a = dpmax, b = dpmin;
            dpmax = max(nums[i-1], max(a * nums[i-1], b * nums[i-1]));
            dpmin = min(nums[i-1], min(a * nums[i-1], b * nums[i-1]));
            res = max(dpmax, res);
        }
        return res;
    }
```

#### [887. 鸡蛋掉落（DP+二分）](https://leetcode-cn.com/problems/super-egg-drop/) poj 3783

```c++
// dp[N][K]
// dp[i][j] = min(dp[i][j],max(dp[k-1][j-1],dp[i-k][j])+1);
    int superEggDrop(int K, int N) {
        vector<vector<int>> dp(N+1, vector<int>(K+1));
        for(int i = 1; i <= N; ++i) dp[i][1] = i;
        for(int i = 1; i <= K; ++i) dp[1][i] = 1;
        for(int i = 2; i <= N; ++i) {
            for(int j = 2; j <= K; ++j) {
                dp[i][j] = INT_MAX;
                // 由 On 降低至 Ologn 单调性优化
                int l = 1, r = i;
                while(l+1 < r) {
                    int mid = l + (r-l)/2;
                    int t1 = dp[mid-1][j-1], t2 = dp[i-mid][j];
                    if(t1 < t2) {
                        l = mid;
                    } else if(t1 > t2) {
                        r = mid;
                    } else l = r = mid;
                }
                dp[i][j] = 1 + min(max(dp[l-1][j-1], dp[i-l][j]), max(dp[r-1][j-1], dp[i-r][j]));
            }
        }
        return dp[N][K];
    }

// dp[K][M]
// 状态定义不同 此时为K个鸡蛋操作m次能测量的区间长度最大值
    int superEggDrop(int K, int N) {
        vector<vector<int>> dp(K+1,vector<int>(N+1));
        int m = 0;
        while (dp[K][m] < N) {
            m++;
            for (int k = 1; k <= K; k++)
                dp[k][m] = dp[k][m - 1] + dp[k - 1][m - 1] + 1;
        }
        return m;
    }
```

#### [354. 俄罗斯套娃信封问题](https://leetcode-cn.com/problems/russian-doll-envelopes)

```c++
// 朴素
    int maxEnvelopes(vector<vector<int>>& envelopes) {
        int n = envelopes.size(), res = 0;
        sort(envelopes.begin(), envelopes.end());
        vector<int> dp(n+1);
        for(int i = 0; i < n; ++i) {
            dp[i] = 1;
            for(int j = 0; j < i; ++j) {
                if(envelopes[j][0] < envelopes[i][0] && envelopes[j][1] < envelopes[i][1]) dp[i] = max(dp[i], dp[j]+1);
            }
            res = max(res, dp[i]);
        }
        return res;
    }

// 优化
// h 逆序排序：保证在 w 相同的数对中最多只选取一个
    int maxEnvelopes(vector<vector<int>>& envelopes) {
        int n = envelopes.size(), res = 0;
        // 先按w排序，若w相同，则按h由高到低排序；若w不同，则按w由小到大排序
        sort(envelopes.begin(), envelopes.end(),[](const auto& a,const auto& b){
            return a[0]<b[0]||(a[0]==b[0]&&a[1]>b[1]);
        });
        //vector<int> dp(n+1);
        vector<int> minnums;
        for(auto v : envelopes) {
            if(minnums.empty() || (v[1] > minnums.back())) minnums.push_back(v[1]);
            else *lower_bound(minnums.begin(), minnums.end(), v[1]) = v[1];
        }
        return minnums.size();
    }
```

进阶：三位排序需要树状数组



## 1.4 打家劫舍系列: (打家劫舍3 是树形DP)

#### [198. 打家劫舍 ](https://leetcode-cn.com/problems/house-robber)

```c++
// 朴素
    int rob(vector<int>& nums) {
        int n = nums.size();
        vector<vector<int>> dp(n+1, vector<int>(2));
        for(int i = 1; i <= n; ++i) {
            dp[i][0] = max(dp[i-1][0], dp[i-1][1]);
            dp[i][1] = dp[i-1][0] + nums[i-1];
        }
        return max(dp[n][0], dp[n][1]);
    }
// 空间
// 本质上newDo不需要暂存 所以这里三个变量即可 只要多一个变量存oldNot 较简单 实现略
    int rob(vector<int>& nums) {
        int n = nums.size();
        int oldNot = 0, oldDo = 0, newNot, newDo;
        for(int i = 1; i <= n; ++i) {
            //dp[0] = max(dp[i-1][0], dp[i-1][1]);
            newNot = max(oldNot, oldDo);
            //dp[1] = dp[i-1][0] + nums[i-1];
            newDo = oldNot + nums[i-1];

            oldNot = newNot, oldDo = newDo;
        }
        return max(oldNot, oldDo);
    }
```



#### [213. 打家劫舍 II](https://leetcode-cn.com/problems/house-robber-ii)

```c++
// 环形dp 两次dp即可  n==1特判
    int rob(vector<int>& nums) {
        int n = nums.size();
        if(n == 1) return nums[0];
        int donot = 0, steal = 0, mem = 0;
        for(int i = 1; i < n; ++i) {
            donot = max(donot, steal);
            steal = mem + nums[i];
            mem = donot;
        }
        int res1 = max(donot, steal);

        donot = 0, steal = 0, mem = 0;
        for(int i = 0; i < n-1; ++i) {
            donot = max(donot, steal);
            steal = mem + nums[i];
            mem = donot;
        }
        int res2 = max(donot, steal);

        return max(res1, res2);
    }
```



## 1.5 股票系列:

#### [121. 买卖股票的最佳时机 ](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock)

```c++
// 朴素
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        // 0 不持有 1 持有
        vector<vector<int>> dp(n+1, vector<int>(2));
        dp[0][1] = INT_MIN;
        for(int i = 1; i <= n; ++i) {
            dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i-1]);
            // dp[i][1] = max(dp[i-1][1], dp[i-1][次数0][0] -prices[i-1]); 
            dp[i][1] = max(dp[i-1][1], -prices[i-1]); 
        }
        return dp[n][0];
    }
// 优化略
```

#### [122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

可以多次买卖

```c++

// 朴素写法
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<vector<int>> dp(n+1, vector<int>(2));
        dp[0][1] = INT_MIN;
        for(int i = 1; i <= n; ++i) {
            dp[i][0] = max(dp[i-1][0], dp[i-1][1]+prices[i-1]);
            dp[i][1] = max(dp[i-1][1], dp[i-1][0]-prices[i-1]);
        }
        return dp[n][0];
    }
// 优化略
```

#### [123. 买卖股票的最佳时机 III](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/)

最多买卖两次

```c++
// 朴素写法
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<vector<vector<int>>> dp(n+1, vector<vector<int>>(3, vector<int>(2)));
        for(int k = 1; 0 <= 2; ++k) dp[0][k][1] = INT_MIN;
        for(int i = 1; i <= n; ++i) {
            for(int k = 1; k <= 2; ++k) {
                dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i-1]);
                dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i-1]);
            }
        }
        return dp[n][2][0];
    }
// 优化
// 对于k次买卖 可以用k*2个变量表示其状态
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        int fstSell = 0, secSell = 0;
        int fstBuy = INT_MIN, secBuy = INT_MIN;
        for(int i = 1; i <= n; ++i) {
            fstSell = max(fstSell, fstBuy + prices[i-1]);
            fstBuy = max(fstBuy, -prices[i-1]);
            secSell = max(secSell, secBuy + prices[i-1]);
            secBuy = max(secBuy, fstSell - prices[i-1]);
        }
        return secSell;
    }
```

#### [188. 买卖股票的最佳时机 IV](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/)

```c++
// 朴素算法 MLE
    int maxProfit(int k, vector<int>& prices) {
        int n = prices.size();
        vector<vector<vector<int>>> dp(n+1, vector<vector<int>>(k+1, vector<int>(2)));

        for(int c = 0; c <= k; ++c) //dp[0][k][1] = INT_MIN;
            for(int i = 0; i <= n; ++i) dp[i][c][1] = INT_MIN;

        for(int i = 1; i <= n; ++i) {
            for(int c = 1; c <= k; ++c) {
                dp[i][c][0] = max(dp[i-1][c][0], dp[i-1][c][1] + prices[i-1]);
                dp[i][c][1] = max(dp[i-1][c][1], dp[i-1][c-1][0] - prices[i-1]);
            }
        }
        return dp[n][k][0];
    }
// 空间压缩
    int maxProfit(int k, vector<int>& prices) {
        int n = prices.size();
        if(k > n / 2) {
            int sell = 0, buy = INT_MIN, mem = 0;
            for(int i = 0; i < n; ++i) {
                sell = max(sell, buy + prices[i]);
                buy = max(buy, mem - prices[i]);
                mem = sell;
            }
            return sell;
        }
      
        vector<vector<int>> dp(k+1, vector<int>(2));

        for(int c = 0; c <= k; ++c) dp[c][1] = INT_MIN;

        for(int i = 1; i <= n; ++i) {
            for(int c = 1; c <= k; ++c) {
                dp[c][0] = max(dp[c][0], dp[c][1] + prices[i-1]);
                dp[c][1] = max(dp[c][1], dp[c-1][0] - prices[i-1]);
            }
        }
        return dp[k][0];
    }
```

#### [309. 最佳买卖股票时机含冷冻期](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)

卖出后再买入需隔一天

```c++
// 朴素算法
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<vector<int>> dp(n+1, vector<int>(2));
        dp[0][1] = INT_MIN;
        
        for(int i = 1; i <= n; ++i) {
            dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i-1]);
            if(i == 1) dp[i][1] = max(dp[i-1][1], - prices[i-1]);	// 相当于初始化 dp[1][1] = -prices[i-1];
            else dp[i][1] = max(dp[i-1][1], dp[i-2][0] - prices[i-1]);
        }
        return dp[n][0];
    }
// 优化
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<int> dp(2);
        dp[1] = INT_MIN;
        int mem = 0;    // dp[i-2][0];

        for(int i = 1; i <= n; ++i) {
            int t = dp[0];
            dp[0] = max(dp[0], dp[1] + prices[i-1]);
            dp[1] = max(dp[1], mem - prices[i-1]);
            mem = t;
        }
        return dp[0];
    }
```

#### [714. 买卖股票的最佳时机含手续费](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)

```c++
// 朴素算法
    int maxProfit(vector<int>& prices, int fee) {
        int n = prices.size();
        vector<vector<int>> dp(n+1, vector<int>(2));
        dp[0][1] = INT_MIN/2;
        for(int i = 1; i <= n; ++i) {
            dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i-1] - fee);
            dp[i][1] = max(dp[i-1][1], dp[i-1][0] - prices[i-1]);
        }
        return dp[n][0];
    }
// 优化略
```

## 1.6 字符串匹配系列

#### [72. 编辑距离](https://leetcode-cn.com/problems/edit-distance)

```c++
    int minDistance(string word1, string word2) {
        int l1 = word1.size(), l2 = word2.size();
        vector<vector<int>> dp(l1+1, vector<int>(l2+1));
        for(int i = 1; i <= l1; ++i) dp[i][0] = i;
        for(int i = 1; i <= l2; ++i) dp[0][i] = i;

        for(int i = 1; i <= l1; ++i) {
            for(int j = 1; j <= l2; ++j) {
                if(word1[i-1] == word2[j-1]) dp[i][j] = dp[i-1][j-1];
                else dp[i][j] = min(min(dp[i-1][j], dp[i][j-1]), dp[i-1][j-1])+1;
            }
        }
        return dp[l1][l2];
    }
```

#### [44. 通配符匹配](https://leetcode-cn.com/problems/wildcard-matching/)

```c++
    bool isMatch(string s, string p) {
        int l1 = s.size(), l2 = p.size();
        vector<vector<bool>> dp(l1+1, vector<bool>(l2+1));
        dp[0][0] = true;
        for(int i = 1; i <= l2; ++i) if(dp[0][i-1] && p[i-1] == '*') dp[0][i] = dp[0][i-1];

        for(int i = 1; i <= l1; ++i) {
            for(int j = 1; j <= l2; ++j) {
                if(s[i-1] == p[j-1] || p[j-1] == '?') dp[i][j] = dp[i-1][j-1];
                else if(p[j-1] == '*') dp[i][j] = (dp[i][j-1] || dp[i-1][j]);
            }
        }
        return dp[l1][l2];
    }
```

#### [10. 正则表达式匹配](https://leetcode-cn.com/problems/regular-expression-matching/)

```c++
    bool isMatch(string s, string p) {
        int l1 = s.size(), l2 = p.size();
        vector<vector<bool>> dp(l1+1, vector<bool>(l2+1));
        dp[0][0] = true;
        for(int i = 1; i <= l2; ++i) if(p[i-1] == '*') dp[0][i] = dp[0][i-2];
        for(int i = 1; i <= l1; ++i) {
            for(int j = 1; j <= l2; ++j) {
                if(s[i-1] == p[j-1] || p[j-1] == '.') {
                    dp[i][j] = dp[i-1][j-1];
                } else if(p[j-1] == '*') {
                    if(p[j-2] != s[i-1] && p[j-2] != '.') {
                        dp[i][j] = dp[i][j-2];  // 不使用前一个字符
                    } else {
                        //dp[i][j] = (dp[i-1][j] || dp[i][j-1] || dp[i][j-2]);	// 多个、1个、0个
                        dp[i][j] = (dp[i-1][j] || dp[i][j-2]);	// 多个、0个    两种都可以过 多个的包含了1个的情况
                        // 当匹配多个时，如 abbb 和 ab*，或者 abbb 和 a.*，
                        // 需要将 s[i] 前面的与 p 重新比较，即 dp[i][j] = dp[i-1][j]
                    }
                }
            }
        }
        return dp[l1][l2];
    }
```

## 其他

#### [983. 最低票价](https://leetcode-cn.com/problems/minimum-cost-for-tickets/)

```c++
    int mincostTickets(vector<int>& days, vector<int>& costs) {
        int last = days[days.size()-1];

        vector<int> dp(last+1, 0);
        int idx = 0;

        for (int i = 1; i <= last; i++) {
            if (i == days[idx]) {
                int cost = INT_MAX;
                int oneDayAgo = i-1;
                int sevenDaysAgo = i-7>0?i-7:0;
                int thirtyDaysAgo = i-30>0?i-30:0;
                
                cost = min(dp[oneDayAgo] + costs[0], cost);
                cost = min(dp[sevenDaysAgo] + costs[1], cost);
                cost = min(dp[thirtyDaysAgo] + costs[2], cost);

                dp[i] = cost;

                idx++;
            } else {
                dp[i] = dp[i-1];
            }
        }

        return dp[last];
    }
```



# 2、区间 DP

#### [516. 最长回文子序列](https://leetcode-cn.com/problems/longest-palindromic-subsequence/)

```c++
// 朴素写法
    int longestPalindromeSubseq(string s) {
        int n = s.size();
        vector<vector<int>> dp(n+1, vector<int>(n+1));
        for(int i = 1; i <= n; ++i) dp[i][i] = 1;
        for(int len = 2; len <= n; ++len) {        // 当然循环也可以写i和j 写法不同随意发挥
            for(int i = 1; i + len -1 <= n; ++i) {
                int j = i+len-1;
                if(s[i-1] == s[j-1]) dp[i][j] = dp[i+1][j-1] + 2;
                else dp[i][j] = max(dp[i+1][j], dp[i][j-1]);
            }
        }
        return dp[1][n];
    }
// 循环写i和j 需要反向遍历i保证正确的状态转移
// dp[i]需要dp[i+1]的结果 故反向
    int longestPalindromeSubseq(string s) {
        int n = s.size();
        vector<vector<int>> dp(n+1, vector<int>(n+1));
        for(int i = 1; i <= n; ++i) dp[i][i] = 1;
        for(int i = n; i > 0; --i) {
            for(int j = i + 1; j <= n; ++j) {
                if(s[i-1] == s[j-1]) dp[i][j] = dp[i+1][j-1]+2;
                else dp[i][j] = max(dp[i+1][j], dp[i][j-1]);
            }
        }
        return dp[1][n];
    }
// 空间压缩
// 在第二种的基础上实现
    int longestPalindromeSubseq(string s) {
        int n = s.size();
        vector<int> dp(n+1);
        for(int i = 1; i <= n; ++i) dp[i] = 1;
        for(int i = n; i > 0; --i) {
            int mem = 0;
            for(int j = i + 1; j <= n; ++j) {
                int t = dp[j];
                if(s[i-1] == s[j-1]) dp[j] = mem + 2;       // 记录左下角的值
                else dp[j] = max(dp[j], dp[j-1]);
                mem = t;
            }
        }
        return dp[n];
    }
```

#### [730. 统计不同回文子序列](https://leetcode-cn.com/problems/count-different-palindromic-subsequences/)

```c++
    const int mod = 1e9+7;
    int countPalindromicSubsequences(string S) {
        int n = S.size();
        vector<vector<int>> dp(n+1, vector<int>(n+1));
        for(int i = 1; i <= n; ++i) dp[i][i] = 1;
        // if s[i] = s[j] : dp[i][j] = 
        // else dp[i][j] = dp[i+1][j] + dp[i][j-1] - dp[i+1][j-1];

        for(int i = n; i > 0; --i) {
            for(int j = i + 1; j <= n; ++j) {
                if(S[i-1] == S[j-1]) {
                    dp[i][j] = dp[i+1][j-1] * 2;
                    int l = i+1, r = j-1;
                    while(l <= r && S[l-1] != S[i-1]) ++l;
                    while(l <= r && S[r-1] != S[i-1]) --r;
                    if(l > r) dp[i][j] += 2;        // x, xx
                    else if(l == r) dp[i][j] += 1;  // xx 因为内部已经有x了
                    else dp[i][j] -= dp[l+1][r-1];  // 去除同样以 x 字母为两端的重复
                } else dp[i][j] = dp[i+1][j] + dp[i][j-1] - dp[i+1][j-1];
                dp[i][j] %= mod;
                if(dp[i][j] < 0) dp[i][j] += mod;
            }
        }
        return dp[1][n];
    }
```

#### [1039. 多边形三角剖分的最低得分](https://leetcode-cn.com/problems/minimum-score-triangulation-of-polygon/)

```c++
// 朴素写法
    int minScoreTriangulation(vector<int>& A) {
        int n = A.size();
        vector<vector<int>> dp(n+1, vector<int>(n+1));
        for(int i = n-2; i > 0; --i) {
            for(int j = i+2; j <= n; ++j) {
                dp[i][j] = INT_MAX;
                for(int k = i+1; k < j; ++k) {
                    dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j] + A[i-1]*A[j-1]*A[k-1]);
                }
            }
        }
        return dp[1][n];
    }
// 以len为外层循环的写法
    int minScoreTriangulation(vector<int>& A) {
        int n = A.size();
        vector<vector<int>> dp(n+1, vector<int>(n+1, INT_MAX));
        for(int i = 0; i < n; ++i) dp[i][i+1] = 0;
        for(int len = 2; len < n; ++len) {
            for(int i = 1; i + len <= n; ++i) {
                int j = i+len;
                for(int k = i+1; k < j; ++k) {
                    dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j] + A[i-1]*A[j-1]*A[k-1]);
                }
            }
        }
        return dp[1][n];
    }
```

#### [664. 奇怪的打印机](https://leetcode-cn.com/problems/strange-printer/)

```c++
// 朴素算法
    int strangePrinter(string s) {
        int n = s.size();
        if(!n) return 0;
        vector<vector<int>> dp(n+1, vector<int>(n+1));
        // if s[i-1] == s[j-1] -> dp[i][j] = dp[i][j-1] : else dp[i][j] = dp[i][j-1]+1;
        for(int i = 1; i <= n; ++i) dp[i][i] = 1;
        for(int i = n-1; i > 0; --i) {
            for(int j = i+1; j <= n; ++j) {
                int f = s[i-1] == s[j-1] ? 0 : 1;
                dp[i][j] = dp[i][j-1] + f;
                for(int k = i; k < j; ++k) {
                    if(s[k-1] == s[j-1]) {
                        dp[i][j] = min(dp[i][j], dp[i][k-1]+dp[k+1][j]);
                    }
                }
            }
        }
        return dp[1][n];
    }
// 
    int strangePrinter(string s) {
        int n = s.size();
        if(!n) return 0;
        vector<vector<int>> dp(n+1, vector<int>(n+1));
        for(int i = 1; i <= n; ++i) dp[i][i] = 1;
        for(int len = 2; len <= n; ++len) {
            for(int i = 1; i+len-1 <= n; ++i) {
                int j = i + len - 1;
                if(s[i-1] == s[j-1]) {
                    dp[i][j] = dp[i][j-1];
                    continue;
                }
                dp[i][j] = dp[i][j-1]+1;
                for(int k = i+1; k < j; ++k) {
                    if(s[k-1] == s[j-1]) {
                        dp[i][j] = min(dp[i][j], dp[i][k-1] + dp[k+1][j]);
                    }
                }
            }
        }
        return dp[1][n];
    }
```



```c++
// 朴素
    int maxCoins(vector<int>& nums) {
        nums.insert(nums.begin(),1);
        nums.push_back(1);
        int n = nums.size()-2;
        vector<vector<int>> dp(n+2, vector<int>(n+2));
        
        for(int i = n; i > 0; --i) {
            for(int j = i; j <= n; ++j) {
                for(int k = i; k <= j; ++k) {
                    dp[i][j] = max(dp[i][j], dp[i][k-1]+dp[k+1][j] + nums[i-1]*nums[k]*nums[j+1]);
                }
            }
        }
        
        return dp[1][n];
    }
// 
    int maxCoins(vector<int>& nums) {
        nums.insert(nums.begin(), 1);
        nums.push_back(1);
        int n = nums.size()-2;
        vector<vector<int>> dp(n+2, vector<int>(n+2));

        for(int len = 1; len <= n; ++len) {
            for(int i = 1; i+len-1 <= n; ++i) {
                int j = i+len-1;
                for(int k = i; k <= j; ++k) {
                    dp[i][j] = max(dp[i][j], dp[i][k-1]+dp[k+1][j]+nums[i-1]*nums[k]*nums[j+1]);
                }
            }
        }
        return dp[1][n];
    }
```



# 3、背包DP

#### [416. 分割等和子集 (01背包-要求恰好取到背包容量)](https://leetcode-cn.com/problems/partition-equal-subset-sum)

```c++
// 朴素写法
    bool canPartition(vector<int>& nums) {
        int n = nums.size(), sum = 0;
        for(auto v : nums) sum += v;
        if(sum&1) return false;
        sum /= 2;
        vector<vector<bool>> dp(n+1, vector<bool>(sum+1));
        for(int i = 1; i <= n; ++i) dp[i][0] = true;
        // dp[i][j] = dp[i-1][j] || dp[i-1][j-nums[i-1]]
        for(int i = 1; i <= n; ++i) {
            for(int j = sum; j >= nums[i-1]; --j) {	// 可以正序 因为dp[i-1]不影响dp[i]
                dp[i][j] = dp[i-1][j] || dp[i-1][j-nums[i-1]];
            }
        }

        return dp[n][sum];
    }
// 空间压缩
    bool canPartition(vector<int>& nums) {
        int n = nums.size(), sum = 0;
        for(auto v : nums) sum += v;
        if(sum&1) return false;
        sum /= 2;
        vector<bool> dp(sum+1);
        dp[0] = true;
        for(int i = 1; i <= n; ++i) {
            for(int j = sum; j >= nums[i-1]; --j) {
                dp[j] = dp[j] || dp[j-nums[i-1]];
            }
        }

        return dp[sum];
    }
```

#### [494. 目标和 (01背包-求方案数)](https://leetcode-cn.com/problems/target-sum)

```c++
// 朴素算法
    int findTargetSumWays(vector<int>& nums, int S) {
        int n = nums.size();
        long sum = S;
        // 正数集的和的两倍 == 等于目标和 + 序列总和
        for(auto v : nums) sum += v;
        if(sum&1 || sum < 2*S) return 0;
        sum /= 2;
        vector<vector<int>> dp(n+1, vector<int>(sum+1));
        for(int i = 0; i <= n; ++i) dp[i][0] = 1;
        // s >= nums[i-1] : dp[i][s] = dp[i-1][s] + dp[i-1][s-nums[i-1]]
        // else : dp[i][s] = dp[i-1][s]
        for(int i = 1; i <= n; ++i) {
            for(int j = sum; j >= 0; --j) {
                if(j >= nums[i-1]) dp[i][j] = dp[i-1][j] + dp[i-1][j-nums[i-1]];
                else dp[i][j] = dp[i-1][j];
            }
        }

        return dp[n][sum];
    }
// 空间压缩略
    int findTargetSumWays(vector<int>& nums, int S) {
        int n = nums.size();
        long sum = S;
        for(auto v : nums) sum += v;
        if(sum&1 || sum < 2*S) return 0;
        sum /= 2;
        vector<int> dp(sum+1);
        dp[0] = 1;
        for(int i = 1; i <= n; ++i) {
            for(int j = sum; j >= nums[i-1]; --j) {
                dp[j] = dp[j] + dp[j-nums[i-1]];
            }
        }

        return dp[sum];
    }
```

#### [322. 零钱兑换 (完全背包)](https://leetcode-cn.com/problems/coin-change)

```c++
 // 朴素算法
    int coinChange(vector<int>& coins, int amount) {
        int n = coins.size();
        vector<vector<int>> dp(n+1, vector<int>(amount+1, INT_MAX/2));
        for(int i = 0; i <= n; ++i) dp[i][0] = 0;
        // dp[i][j] = min(dp[i-1][j], dp[i][j-coins[j]]+1);
        for(int i = 1; i <= n; ++i) {
            for(int j = 0; j <= amount; ++j) {
                if(j < coins[i-1]) dp[i][j] = dp[i-1][j];
                else dp[i][j] = min(dp[i-1][j], dp[i][j-coins[i-1]]+1);
            }
        }
        return dp[n][amount] < INT_MAX/2 ? dp[n][amount] : -1;
    }
// 压缩
    int coinChange(vector<int>& coins, int amount) {
        int n = coins.size();
        vector<int> dp(amount+1, INT_MAX/2);
        dp[0] = 0;
        for(int i = 1; i <= n; ++i) {
            for(int j = coins[i-1]; j <= amount; ++j) {
                dp[j] = min(dp[j], dp[j-coins[i-1]]+1);
            }
        }
        return dp[amount] < INT_MAX/2 ? dp[amount] : -1;
    }
```

#### [518. 零钱兑换 II (完全背包-求方案数)](https://leetcode-cn.com/problems/coin-change-2)

```c++
// 朴素算法
    int change(int amount, vector<int>& coins) {
        int n = coins.size();
        vector<vector<int>> dp(n+1, vector<int>(amount+1));
        for(int i = 0; i <= n; ++i) dp[i][0] = 1;
        for(int i = 1; i <= n; ++i) {
            for(int j = 0; j <= amount; ++j) {
                if(j < coins[i-1]) dp[i][j] = dp[i-1][j];
                else dp[i][j] = dp[i-1][j] + dp[i][j-coins[i-1]];
            }
        }

        return dp[n][amount];
    }
// 压缩
    int change(int amount, vector<int>& coins) {
        int n = coins.size();
        vector<int> dp(amount+1);
        dp[0] = 1;
        for(int i = 1; i <= n; ++i) {
            for(int j = coins[i-1]; j <= amount; ++j) {
                dp[j] = dp[j] + dp[j-coins[i-1]];
            }
        }

        return dp[amount];
    }
```

#### [474. 一和零 (二维费用背包)](https://leetcode-cn.com/problems/ones-and-zeroes)



```c++
    int findMaxForm(vector<string>& strs, int m, int n) {
        vector<vector<int>> dp(m+1, vector<int>(n+1));
        for(auto s : strs) {
            int zero = 0, one = 0;
            for(auto c : s) {
                if(c == '0') ++zero;
                else ++one;
            }
            for(int i = m; i >= zero; --i) {
                for(int j = n; j >= one; --j) {
                    dp[i][j] = max(dp[i][j], dp[i-zero][j-one] + 1);
                }
            }
        }
        return dp[m][n];
    }
```



# 4、树形DP

#### [124. 二叉树中的最大路径和](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum)

```c++

    // dp[i]记录每一个节点i 及其子树所构成的最大路径和 因为路径连续 所以只需记录使用了该节点的最大路径和
    // 状态转移 dp[i] = max(dp[lson], dp[rson], 0[这个是哪个子节点都不用]]) + i->val; 因为只能选择一个子节点加入路径
    int res = INT_MIN;
    int dfs(TreeNode* n) {
        if(!n) return 0;
        int l = max(0, dfs(n->left)), r = max(0, dfs(n->right));
        int now = l + r + n->val;
        res = max(res, now);
        return n->val + max(l, r);
    }
    int maxPathSum(TreeNode* root) {
        dfs(root);
        return res;
    }
```



#### [1245. 树的直径 (邻接表上的树形DP)](https://leetcode-cn.com/problems/tree-diameter)

todo 没开会员没权限

```c++
//

```



#### [543. 二叉树的直径](https://leetcode-cn.com/problems/diameter-of-binary-tree)

```c++
// 
    int res = INT_MIN;
    int dp(TreeNode* n) {
        if(!n) return 0;
        int l = dp(n->left), r = dp(n->right);
        res = max(res, l+r+1);
        return max(l, r)+1;
    }
    int diameterOfBinaryTree(TreeNode* root) {
        if(!root) return 0;
        dp(root);
        return res-1;
    }
```

#### [333. 最大 BST 子树 ](https://leetcode-cn.com/problems/largest-bst-subtree)

todo 权限

```c++
//

```



#### [337. 打家劫舍 III](https://leetcode-cn.com/problems/house-robber-iii)

```c++
// 
    // dp[i][0] 表示不偷当前的最大值 dp[i][1] 表示偷当前的最大值
    // dp[i][0] = max(dp[lson][0], dp[lson][1]) + max(dp[rson][0], dp[rson][1]);
    // dp[i][1] = max(0, dp[lson][0]) + max(0, dp[rson][0]) + i->val;
    int res = INT_MIN;
    pair<int, int> dfs(TreeNode* n) {
        //if(!n) return pair<int, int>{0,0};
        if(!n) return {0,0};
        auto l = dfs(n->left), r = dfs(n->right);
        int zero = max(l.first, l.second) + max(r.first, r.second);
        int one = max(0, l.first) + max(0, r.first) + n->val;
        res = max(res, max(zero, one));
        return {zero, one};
    }
    int rob(TreeNode* root) {
        if(!root) return 0;
        dfs(root);
        return res;
    }
```



# 5、状态压缩 DP



#### [464. 我能赢吗](https://leetcode-cn.com/problems/can-i-win/)

```c++
// 不能使用重复整数 状态压缩20个位
// dp[i][j] 表示剩下整数状态为i时 累积和为j的先手结果
// dp[i][j] = 穷举接下来选择每一个数的下一个状态是否可能为true
// 如果有任意一个值为true 则当前状态必败 否则必胜
// 这样自底向上写法会有很多重复计算 所以写dfs自顶向下
    int mxInt, tot;
    //unordered_map<pair<int,int>, int> m;  // hash不可用
    map<pair<int, int>, int> m;
    bool dfs(int state, int sum) {
        if(sum >= tot) return true;
        if(m.find({state, sum}) != m.end()) return m[{state,sum}];
        bool f = true;
        for(int i = 1; i <= mxInt; ++i) {
            if((state & (1<<i)) == 0) {
                if(dfs(state | (1<<i), sum+i)) {
                    f = false;
                    break;
                }
            }
        }
        return m[{state,sum}] = f;
    }
    bool canIWin(int maxChoosableInteger, int desiredTotal) {
        mxInt = maxChoosableInteger, tot = desiredTotal;
        // 所有数相加仍小于tot false
        if((mxInt+1)*mxInt/2 < tot) return false;
        for(int i = 1; i <= mxInt; ++i) {
            // 选择 i 当前sum为i
            if(dfs(1 << i, i)) return true;
        }
        return false;
    }
```



#### [526. 优美的排列](https://leetcode-cn.com/problems/beautiful-arrangement/)

```c++
// 朴素算法
    int n, tot, res;
    //map<pair<int, int>, int> m;
    void dfs(int state, int sum, int pos) {
        if(sum >= tot) {    // if(pos >= n)
            ++res;
            return;
        }
        for(int i = 1; i <= n; ++i) {
            if(((state&(1<<i)) == 0) && (i%pos == 0 || pos%i == 0)) {
                dfs(state | 1<<i, sum + i, pos+1);
            }
        }
    }
    int countArrangement(int N) {
        n = N, tot = (1+n)*n/2, res = 0;
        for(int i = 1; i <= n; ++i) {
            // if((i % 1) == 0 || (1 % i) == 0) // 隐含条件
            dfs(1 << i, i, 2);
        }
        return res;
    }
// 这里sum可以去除 对统计无关 可以直接用pos 实现略
```

#### [935. 骑士拨号器](https://leetcode-cn.com/problems/knight-dialer/)

```c++
// 考虑状态转移
    const int M = 1e9 + 7;
    int knightDialer(int N) {
        if (N == 1) return 10;
        vector<long> dp1(10, 1);
        vector<long> dp2(10, 0);
        for (int i = 1; i < N; ++i) {
            dp2[0] = (dp1[6] + dp1[4]) % M;
            dp2[2] = (dp1[7] + dp1[9]) % M;
            dp2[5] = 0;
            dp2[8] = (dp1[1] + dp1[3]) % M;
            dp2[1] = (dp1[6] + dp1[8]) % M;
            dp2[4] = (dp1[0] + dp1[3] + dp1[9]) % M;
            dp2[7] = (dp1[2] + dp1[6]) % M;
            dp2[3] = dp2[1];
            dp2[6] = dp2[4];
            dp2[9] = dp2[7];
            dp1 = dp2;
        }
        int res = 0;
        for (int i = 0; i < 10; ++i) {
            res = (res + dp2[i]) % M;
        }
        return res;
    }
// 以及简化至四种状态 进而递推或直接矩阵快速幂的思路：
// https://leetcode-cn.com/problems/knight-dialer/solution/4zhuang-tai-dong-tai-gui-hua-pythonjie-kong-jian-f/
```



#### [1349. 参加考试的最大学生数](https://leetcode-cn.com/problems/maximum-students-taking-exam)

[周赛题](https://github.com/OpenKikCoc/LeetCode/tree/master/Contest/2020-02-09_Weekly-175)



# 6、数位 DP

#### [233. 数字 1 的个数](https://leetcode-cn.com/problems/number-of-digit-one)

```c++
 // 数学
    int countDigitOne(int n) {
        int res = 0;
        long long base = 1;
        while(base <= n) {
            int t = (n/base)%10;
            if(t == 0) res += n/(base*10)*base; // front
            else if(t == 1) res += n/(base*10)*base + n%base + 1;
            else res += (n/(base*10)+1)*base;
            base *= 10;
        }
        return res;
    }
// 数位dp

```



#### [902. 最大为 N 的数字组合](https://leetcode-cn.com/problems/numbers-at-most-n-given-digit-set/)

```c++
// 数位dp模版题
    int nums[12], t[10]={0}, dp[12], s=0;
    int atMostNGivenDigitSet(vector<string>& D, int N) {
        memset(dp, -1, sizeof dp);
        for(auto x : D) t[x[0]-'0'] = 1;
        for(int i = N; i; i /= 10) nums[s++] = i%10;
        return dfs(s-1, true, true) - 1;
    }
    int dfs(int pos,bool flag,bool zero) {
        if(pos == -1) return 1;
        if(!flag && !zero && dp[pos] != -1) return dp[pos]; 
        int count = flag ? nums[pos] : 9, res = 0;
        if(zero) res += dfs(pos-1, false, zero);
        for(int i = 1; i <= count; ++i){
            if(t[i]) res += dfs(pos-1, flag&&nums[pos]==i, false); 
        }
        if(!flag && !zero) dp[pos] = res;
        return res;
    }
```

#### [1015. 可被 K 整除的最小整数](https://leetcode-cn.com/problems/smallest-integer-divisible-by-k)





# 7、计数型 DP

计数型DP都可以以组合数学的方法写出组合数，然后dp求组合数

#### [62. 不同路径](https://leetcode-cn.com/problems/unique-paths)

```c++
// 朴素算法
    int uniquePaths(int m, int n) {
        vector<vector<int>> dp(m+1, vector<int>(n+1));
        for(int i = 1; i <= n; ++i) dp[1][i] = 1;
        for(int i = 2; i <= m; ++i) {
            for(int j = 1; j <= n; ++j) {
                dp[i][j] = dp[i][j-1] + dp[i-1][j];
            }
        }
        return dp[m][n];
    }
// 压缩
    int uniquePaths(int m, int n) {
        vector<int> dp(n+1);
        for(int i = 1; i <= n; ++i) dp[i] = 1;
        for(int i = 2; i <= m; ++i) {
            for(int j = 1; j <= n; ++j) {
                dp[j] = dp[j-1] + dp[j];
            }
        }
        return dp[n];
    }
```

#### [63. 不同路径 II](https://leetcode-cn.com/problems/unique-paths-ii/)

```c++
// 朴素算法
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int m = obstacleGrid.size();
        if(!m) return 0;
        int n = obstacleGrid[0].size();
        vector<vector<int>> dp(m+1, vector<int>(n+1));
        bool can = true;
        for(int i = 1; i <= n; ++i){
            if(!can) dp[1][i] = 0;
            else if(can && obstacleGrid[0][i-1] == 1) can = false, dp[1][i] = 0;
            else dp[1][i] = 1;
        }
        for(int i = 2; i <= m; ++i) {
            for(int j = 1; j <= n; ++j) {
                if(obstacleGrid[i-1][j-1] == 1) dp[i][j] = 0;
                else dp[i][j] = dp[i-1][j] + dp[i][j-1];
            }
        }
        return dp[m][n];
    }
// 压缩
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int m = obstacleGrid.size();
        if(!m) return 0;
        int n = obstacleGrid[0].size();
        vector<int> dp(n+1);
        bool can = true;
        for(int i = 1; i <= n; ++i){
            if(!can) dp[i] = 0;
            else if(can && obstacleGrid[0][i-1] == 1) can = false, dp[i] = 0;
            else dp[i] = 1;
        }
        for(int i = 2; i <= m; ++i) {
            for(int j = 1; j <= n; ++j) {
                if(obstacleGrid[i-1][j-1] == 1) dp[j] = 0;
                else dp[j] = dp[j] + dp[j-1];
            }
        }
        return dp[n];
    }

```



#### [96. 不同的二叉搜索树 (卡特兰数)](https://leetcode-cn.com/problems/unique-binary-search-trees)

```c++
// 卡特兰数
    int numTrees(int n) {
        long c = 1;
        // 卡特兰数
        for(int i = 0; i < n; i++)
            c = c * 2 * (2 * i  + 1) /(i + 2);
        return c;
    }

    int numTrees(int n) {
        vector<int> dp(n + 1, 0);
        dp[0] = 1;
        dp[1] = 1;
        
        for(int i = 2; i <= n; i++)         // i 为长度
            for(int j = 1; j <= i; j++)     // 以 j 为根
                dp[i] += dp[j - 1] * dp[i - j];
        return dp[n];
    }

    // 0s 100%, 6.4MB 100%
    int numTrees(int n) {
        vector<vector<int>> dp(n, vector<int>(n));
        for(int i = 0; i < n; ++i) dp[i][i] = 1;
        // 区间dp 
        for(int i = n-1; i >= 0; --i) {
            for(int j = i+1; j < n; ++j) {
                // i ~ j 可以组成多少个二叉搜索树
                // 以 k 为根
                for(int k = i; k <= j; ++k) {
                    dp[i][j] += (k>i ? dp[i][k-1]:1) * (k<j ? dp[k+1][j]:1);
                }

            }
        }
        return dp[0][n-1];
    }
```

#### [1259. 不相交的握手 (卢卡斯定理求大组合数模质数)](https://leetcode-cn.com/problems/handshakes-that-dont-cross)

todo 权限题



# 8、递推型 DP

所有线性递推关系都可以用矩阵快速幂做，可以O(logN)，最典型是斐波那契数列

#### [70. 爬楼梯 ](https://leetcode-cn.com/problems/climbing-stairs)

```c++
//
    int climbStairs(int n) {
        // 这里长度没有考虑输入0的情况 输入0应直接返回1
        // if(!n) return 1;
        vector<int> dp(n+1);
        dp[0] = 1, dp[1] = 1;
        for(int i = 2; i <= n; ++i) dp[i] = dp[i-1] + dp[i-2];
        return dp[n];
    }
// 优化空间略 快速幂略
```

#### [509. 斐波那契数](https://leetcode-cn.com/problems/fibonacci-number/)

略

#### [935. 骑士拨号器](https://leetcode-cn.com/problems/knight-dialer/)

```tex
⎡A⎤   ⎡0 1 1 0⎤n−1   ⎡1⎤
⎢B⎥ = ⎢2 0 0 0⎥      ⎢1⎥
⎢C⎥   ⎢2 0 0 1⎥      ⎢1⎥
⎣D⎦   ⎣0 0 2 0⎦      ⎣1⎦
```

略

#### [957. N 天后的牢房](https://leetcode-cn.com/problems/prison-cells-after-n-days/)

14天为一个循环 模拟即可 略

#### [1137. 第 N 个泰波那契数](https://leetcode-cn.com/problems/n-th-tribonacci-number/)

```
// 对于斐波那契
⎡ f[n] ⎤ =  ⎡1 1⎤ ⎡f[n-1]⎤
⎣f[n-1]⎦    ⎣1 0⎦ ⎣f[n-2]⎦

⎡ f[n] ⎤ =  ⎡1 1⎤n−1   ⎡f[1]⎤
⎣f[n-1]⎦    ⎣1 0⎦      ⎣f[0]⎦

⎡f[n+1]  f[n] ⎤ =  ⎡1 1⎤n
⎣ f[n]  f[n-1]⎦    ⎣1 0⎦

对于泰波那契
⎡f[n+3]⎤   ⎡1 1 1⎤      ⎡f[n+2]⎤
⎢f[n+2]⎥ = ⎢1 0 0⎥      ⎢f[n+1]⎥
⎣f[n+1]⎦   ⎣0 1 0⎦      ⎣ f[n] ⎦

⎡f[n+2]⎤   ⎡1 1 1⎤n     ⎡f[2]⎤
⎢f[n+1]⎥ = ⎢1 0 0⎥      ⎢f[1]⎥
⎣ f[n] ⎦   ⎣0 1 0⎦      ⎣f[0]⎦
```



```c++
    struct matrix{
        long long m[3][3];
    };
    matrix mult(matrix x, matrix y) {
        matrix t;
        memset(t.m, 0, sizeof(t.m));
        for(int i = 0; i < 3; ++i)
            for(int j = 0; j < 3; ++j)
                for(int k = 0; k < 3; ++k)
                    t.m[i][j] += x.m[i][k] * y.m[k][j];
        return t;
    }
    matrix mod_pow(matrix P, int n) {
        matrix res;
        memset(res.m, 0, sizeof(res.m));
        res.m[0][0] = res.m[1][1] = res.m[2][2] = 1;
        while(n) {
            if(n&1) res = mult(res, P);
            P = mult(P, P);
            n >>= 1;
        }
        return res;
    }
    int tribonacci(int n) {
        matrix base;
        memset(base.m, 0, sizeof(base.m));
        base.m[0][0] = base.m[0][1] = base.m[0][2] = 1;
        base.m[1][0] = base.m[2][1] = 1;
        matrix res = mod_pow(base, n+1);
        return res.m[2][0];
    }
// 递推也可以
```



# 9、概率型 DP

求概率，求数学期望

#### [808. 分汤](https://leetcode-cn.com/problems/soup-servings/)

```c++
    double soupServings(int N) {
        // N = N / 25
        // 设dp[i][j] : 剩余i的A和j的B A先分配完的概率+A、B同时分配完的概率/2
        // dp[i][j] = 0.25 * (dp[i-4][j] + dp[i-3][j-1] + dp[i-2][j-2] + dp[i-1][j-3])
        if (N > 4800) return 1;
        N = ceil(N / 25.0);
        vector<vector<double> > dp(N+1, vector<double>(N+1, 0));
        dp[0][0] = 0.5;
        for (int i = 1; i < N+1; i++) {
            dp[i][0] = 0;
            dp[0][i] = 1;
        }

        // 每一个i的值都对应着每种情况的j值，所以这里 for...for循环
        for (int i = 1; i < N + 1; i++) {
            int a1 = i - 4 > 0 ? i - 4 : 0; // 不足4的全部分配完
            int a2 = i - 3 > 0 ? i - 3 : 0;
            int a3 = i - 2 > 0 ? i - 2 : 0;
            int a4 = i - 1 > 0 ? i - 1 : 0;
            for (int j = 1; j < N + 1; j++) {
                int b1 = j;
                int b2 = j - 1 > 0 ? j - 1 : 0;
                int b3 = j - 2 > 0 ? j - 2 : 0;
                int b4 = j - 3 > 0 ? j - 3 : 0;
                dp[i][j] = 0.25 * (dp[a1][b1] + dp[a2][b2] + dp[a3][b3] + dp[a4][b4]);
            }
        }
        return dp[N][N];
    }
```

#### [837. 新21点](https://leetcode-cn.com/problems/new-21-game/)

```c++
    double new21Game(int n, int k, int w) {
        if(k==0) return 1;
        if(n==0 || k>n) return 0;
        vector<db>dp(n+1, 0.0);
        //dp[i]表示的是当总分为i的时候的概率，最终的答案一定是k<=i<=n的所有概率之和，表示的是当取到分数大于k小于n的概率
        db sum=1.0;
        db res=0.0;
        dp[0]=1.0;
        for(int i=1;i<=n;i++){
            dp[i]=1.0*sum/w;
            if(i<k){
                sum+=dp[i];
            }else{
                res+=dp[i];//表示当前选的点是符合要求的，那么将其加入到符合条件的概率当中
            }
            if(i>=w){
                sum-=dp[i-w];//sum表示的是中间只能有w个数据，
            }
        }
        return res;
    }
```

# 10、博弈型 DP

策梅洛定理，SG 定理，minimax



**翻转游戏**

#### [293. 翻转游戏](https://leetcode-cn.com/problems/flip-game)

todo 权限题

#### [294. 翻转游戏 II](https://leetcode-cn.com/problems/flip-game-ii)

todo 权限题





**Nim游戏**

#### [292. Nim 游戏](https://leetcode-cn.com/problems/nim-game)

```c++
    bool canWinNim(int n) {
        // 0 false 4 false
        return n % 4;
    }
```

**石子游戏**

#### [877. 石子游戏](https://leetcode-cn.com/problems/stone-game)

```c++
// 先手必胜
    bool stoneGame(vector<int>& piles) {
        return true;
    }
    
// dp
    bool stoneGame(vector<int>& piles) {
        int n = piles.size();
        vector<vector<int>> dp(n, vector<int>(n));
        for(int i = 0; i < n; ++i) dp[i][i] = piles[i];
        // 求dp[0][n-1]
        for(int i = n-1; i >= 0; --i) {
            for(int j = i+1; j < n; ++j) {
                // i ~ j
                dp[i][j] = max(piles[i]-dp[i+1][j], piles[j]-dp[i][j-1]);
            }
        }
        return dp[0][n-1] > 0;
    }
```



#### [1140. 石子游戏 II](https://leetcode-cn.com/problems/stone-game-ii/)

 `dp[i, M]` 表示，当从第 `i` 堆石子开始拿，允许拿 `M <= x <= 2 * M` 时，在剩余石子中所能拿到的最大值。

```c++
    int stoneGameII(vector<int>& piles) {
        int n = piles.size();
        vector<vector<int>> dp(n+1, vector<int>(n+1));
        int sum = 0;    // 后缀和
        // 求 dp[0][1];
        // dp[i][j] = max(dp[i+x][max(M,x)])
        for(int i = n-1; i >= 0; --i) {
            sum += piles[i];
            for(int j = 1; j <= n; ++j) { // j -> M
                if(i+2*j >= n) {
                    dp[i][j] = sum;
                    continue;
                }
                for(int x = 1; i+x <= n && x <= 2*j; ++x) {
                    dp[i][j] = max(dp[i][j], sum-dp[i+x][max(j, x)]);
                }
            }
        }
        return dp[0][1];
    }
```



井字游戏

#### [348. 判定井字棋胜负](https://leetcode-cn.com/problems/design-tic-tac-toe)

todo 权限题

#### [794. 有效的井字游戏 ](https://leetcode-cn.com/problems/valid-tic-tac-toe-state)

略

#### [1275. 找出井字棋的获胜者](https://leetcode-cn.com/problems/find-winner-on-a-tic-tac-toe-game)

```c++
    int board[3][3] = {{0, 0, 0}, {0, 0, 0}, {0, 0, 0}};
    bool check() {
        return abs(board[0][0] + board[0][1] + board[0][2]) == 3 ||
            abs(board[1][0] + board[1][1] + board[1][2]) == 3 ||
            abs(board[2][0] + board[2][1] + board[2][2]) == 3 ||
            abs(board[0][0] + board[1][0] + board[2][0]) == 3 ||
            abs(board[0][1] + board[1][1] + board[2][1]) == 3 ||
            abs(board[0][2] + board[1][2] + board[2][2]) == 3 ||
            abs(board[0][0] + board[1][1] + board[2][2]) == 3 ||
            abs(board[2][0] + board[1][1] + board[0][2]) == 3;
    }
    string tictactoe(vector<vector<int>>& moves) {
        int piece = 1;
        for (auto move: moves) {
            board[move[0]][move[1]] = piece;
            if (check())
                return piece > 0 ? "A" : "B";
            piece = -piece;
        }
        return moves.size() < 9 ? "Pending" : "Draw";
    }
```



# 11、记忆化搜索

本质是 dfs + 记忆化，用在状态的转移方向不确定的情况

#### [329. 矩阵中的最长递增路径](https://leetcode-cn.com/problems/longest-increasing-path-in-a-matrix)

```c++
    int m, n;
    int dx[4] = {0, -1, 1, 0}, dy[4] = {-1, 0, 0, 1};
    int dp(int x, int y, vector<vector<int>>& matrix, vector<vector<int>>& f) {
        if(f[x][y]) return f[x][y];
        for(int i = 0; i < 4; ++i) {
            int nx = x + dx[i], ny = y + dy[i];
            if(nx >= 0 && nx < m && ny >= 0 && ny < n && matrix[x][y] < matrix[nx][ny]) {
                f[x][y] = max(f[x][y], dp(nx, ny, matrix, f));
            }
        }
        return f[x][y] = f[x][y] + 1;
    }
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        m = matrix.size();
        if(!m) return 0;
        n = matrix[0].size();
        vector<vector<int>> f(m+1, vector<int>(n+1));
        int res = 0;
        for(int i = 0; i < m; ++i) {
            for(int j = 0; j < n; ++j) {
                if(f[i][j] == 0) res = max(res, dp(i, j, matrix, f));
                else res = max(res, f[i][j]);
            }
        }
        return res;
    }
```



#### [576. 出界的路径数](https://leetcode-cn.com/problems/out-of-boundary-paths)

```c++
 // 朴素记忆化搜索
    int m, n, N, mod = 1e9+7;
    int dx[4] = {0, -1, 1, 0}, dy[4] = {-1, 0, 0, 1};
    int dp(int x, int y, int t, vector<vector<vector<int>>>& f) {
        // 边界 重要
        if(t <= 0) return 0;
        // 剪枝: 即使在某个方向走完 t 步 仍然不能出边界 说明此路不通 直接返回 0
        // 不加剪枝条件会在30 24 23 26 12 TLE
        if (y + t < n && x + t < m && y - t >= 0 && x - t >= 0) return 0;
        if(f[x][y][t]) return f[x][y][t];
        for(int i = 0; i < 4; ++i) {
            int nx = x + dx[i], ny = y + dy[i];
            if(nx >= 0 && nx < m && ny >= 0 && ny < n) {
                f[x][y][t] += dp(nx, ny, t-1, f)%mod;
                f[x][y][t] %= mod;
            }
        }
        return f[x][y][t];
    }

    int findPaths(int m, int n, int N, int i, int j) {
        this->m = m, this->n = n, this->N = N;
        vector<vector<vector<int>>> f(m+2, vector<vector<int>>(n+2, vector<int>(N+2)));  // N+2 处理N=0的情况
        for(int i = 0; i < m; ++i) ++f[i][0][1], ++f[i][n-1][1];    // 向左右
        for(int i = 0; i < n; ++i) ++f[0][i][1], ++f[m-1][i][1];    // 向上下
        int res = 0;
        for(int t = 1; t <= N; ++t) {
            res += dp(i, j, t, f)%mod;
            res %= mod;
        }
        return res%mod;
    }
// 空间优化 先转写法
    int mod = 1e9+7;
    int findPaths(int m, int n, int N, int i, int j) {
        if(!N) return 0;
        vector<vector<vector<int>>> f(m+2, vector<vector<int>>(n+2, vector<int>(N+2)));
        for(int i = 1; i <= m; ++i) ++f[i][1][1], ++f[i][n][1];    // 向左右
        for(int i = 1; i <= n; ++i) ++f[1][i][1], ++f[m][i][1];    // 向上下
        int res = f[i+1][j+1][1];
        for(int k = 2; k <= N; ++k) {
            for(int x = 1; x <= m; ++x)
                for(int y = 1; y <= n; ++y) {
                    f[x][y][k] += f[x-1][y][k-1]; f[x][y][k] %= mod;
                    f[x][y][k] += f[x+1][y][k-1]; f[x][y][k] %= mod;
                    f[x][y][k] += f[x][y-1][k-1]; f[x][y][k] %= mod;
                    f[x][y][k] += f[x][y+1][k-1]; f[x][y][k] %= mod;
                }
            res = res + f[i+1][j+1][k];
            res %= mod;
        }
        return res;
    }
// 压缩
    int mod = 1e9+7;
    int findPaths(int m, int n, int N, int i, int j) {
        if(!N) return 0;
        vector<vector<int>> pre(m+2, vector<int>(n+2)), cur(m+2, vector<int>(n+2));
        for(int i = 1; i <= m; ++i) ++pre[i][1], ++pre[i][n];    // 向左右
        for(int i = 1; i <= n; ++i) ++pre[1][i], ++pre[m][i];    // 向上下
        int res = pre[i+1][j+1];
        for(int k = 2; k <= N; ++k) {
            for(int x = 1; x <= m; ++x)
                for(int y = 1; y <= n; ++y) {
                    cur[x][y] = 0;
                    cur[x][y] += pre[x-1][y]; cur[x][y] %= mod;
                    cur[x][y] += pre[x+1][y]; cur[x][y] %= mod;
                    cur[x][y] += pre[x][y-1]; cur[x][y] %= mod;
                    cur[x][y] += pre[x][y+1]; cur[x][y] %= mod;
                }
            res = res + cur[i+1][j+1];
            res %= mod;
            pre = cur;
        }
        return res;
    }
```





