#  [739. 每日温度](https://leetcode-cn.com/problems/daily-temperatures/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& T) {
        int n = T.size();
        vector<int> res(n);
        stack<int> st;
        for (int i = 0; i < n; ++ i ) {
            while (st.size() && T[st.top()] < T[i]) {
                res[st.top()] = i - st.top();
                st.pop();
            }
            st.push(i);
        }
        return res;
    }
};
```



```python
# 单调栈
"""
# 模板
# 当前数向右找第一个比自己大的位置：从左向右维护一个单调递减栈
def nextBiggerElement(nums: list):
    n=len(nums)
    #先初始化所有res，只用改变存在的；
    #小技巧：stack里保存的是数组下标
    res,stack=[-1]*n,[]
    for i in range(n):
        while stack and nums[stack[-1]]<nums[i]:
            #当前数nums[i]大于栈顶元素时，就把栈顶元素对应的res的值更新为当前元素
            #然后把栈顶元素pop出去，继续比较
            res[stack[-1]=nums[i]
            stack.pop()
        #当前数小于或者等于栈顶元素时，直接把当前数的下标append到栈中        
        stack.append(i)
    return res
                   
                
# 当前数向左找第一个比自己的大的位置：从左边向右边维护一个单调递减栈         
def nextBiggerElement(nums: list):
  	n=len(nums)
    res,stack=[-1]*(n),[]
    for i in range(n-1，-1，-1):
      	while stack and nums[stack[-1]]<nums[i]:
            re
class Solution:
    def dailyTemperatures(self, T: List[int]) -> List[int]:
        n=len(T)
        res=[0]*n
        stack=[]
        for i in range(n):
            while stack and T[stack[-1]]<T[i]:
                res[stack[-1]]=i-stack[-1]
                stack.pop()
            stack.append(i)
        return res
```

