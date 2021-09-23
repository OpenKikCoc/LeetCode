#  [503. 下一个更大元素 II](https://leetcode-cn.com/problems/next-greater-element-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> nextGreaterElements(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; ++ i ) nums.push_back(nums[i]);
        vector<int> res(n, -1);
        stack<int> st;  // 记录下标
        for (int i = 0; i < 2 * n; ++ i ) {
            while (!st.empty() && nums[st.top()] < nums[i]) {
                if (i - st.top() < n) res[st.top() % n] = nums[i];
                st.pop();
            }
            st.push(i);
        }
        return res;
    }
};


// yxc
class Solution {
public:
    vector<int> nextGreaterElements(vector<int>& nums) {
        int n = nums.size();
        nums.insert(nums.end(), nums.begin(), nums.end());
        stack<int> stk;
        vector<int> res(n);
        for (int i = n * 2 - 1; i >= 0; i -- ) {
            int x = nums[i];
            while (stk.size() && x >= stk.top()) stk.pop();
            if (i < n) {
                if (stk.empty()) res[i] = -1;
                else res[i] = stk.top();
            }
            stk.push(x);
        }
        return res;
    }
};
```



```python
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
            res[stack[-1]]=nums[i]
            stack.pop()
        stack.append(i)
    return res   
"""

class Solution:
    def nextGreaterElements(self, nums: List[int]) -> List[int]:
        n=len(nums)
        for i in range(n):
            nums.append(nums[i])
        stack=[]
        res = [-1] * n
        for i in range (2*n):
            while stack and nums[stack[-1]] < nums[i]:
                #保证是在有效区间内，一定要有这个判断 不然可能会报错
                if stack[-1] > i - n:
                    res[stack[-1] % n] = nums[i]
                		stack.pop()
            stack.append(i)
        return res
   
```

