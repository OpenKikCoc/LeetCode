#  [496. 下一个更大元素 I](https://leetcode.cn/problems/next-greater-element-i/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
        int n = nums2.size();
        unordered_map<int, int> hash;
        stack<int> st;
        for (int i = 0; i < n; ++ i ) {
            while (!st.empty() && st.top() < nums2[i]) {
                hash[st.top()] = nums2[i];
                st.pop();
            }
            st.push(nums2[i]);
        }
        // while (!st.empty()) hash[st.top()] = -1, st.pop();
        vector<int> res;
        for (auto v : nums1)
            if (hash.count(v)) res.push_back(hash[v]);
            else res.push_back(-1);
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

#写法1:从前向后遍历
class Solution:
    def nextGreaterElement(self, nums1: List[int], nums2: List[int]) -> List[int]:
        my_dic={}
        n=len(nums2)
        stack=[]
        for i in range(n):
            while stack and nums2[stack[-1]]<nums2[i]:
                my_dic[nums2[stack[-1]]]=nums2[i]
                stack.pop()
            stack.append(i)
        return [my_dic.get(x,-1)for x in nums1]
```

