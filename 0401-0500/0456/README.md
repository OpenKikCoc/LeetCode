#  [456. 132模式](https://leetcode.cn/problems/132-pattern/)

## 题意



## 题解

注意 维护的是单调递减的栈

-   我们可以从右往左遍历数组考虑每个数作为1或3的情况，同时维护一个次大值，这个次大值满足左边有一个数比它大，即是132模式中的2。

    -   假如我们遇到了小于当前次大值的数说明我们就找到了一个1，构成了一个132模式。
    -   否则我们就把当前数看成3，从当前数开始向右找到比当前数小的数并且更新次大值，这里我们只用向右找到第一个比当前数大的位置x即可，因为从该位置开始再往右的数如果小于当前数那么它也一定会小于这个比当前数大的数，也就是说他们之前已经在考虑x的时候被作为次大值更新过了，没有必要再重新更新一遍。

-   我们从右往左扫描数组并维护一个单调递减的栈，初始时次大值设为无穷小。

    如果当前数小于次大值说明我们找到了一个答案，否则考虑当前数作为3的情况，当当前数大于栈顶时说明我们找到了一个32模式，我们不断的弹出栈顶来更新2，即维护我们当前遇到的次大值，直到栈顶大于当前值为止。

    注意这时栈顶的右边可能还有之前被弹出过的小于当前数的值，但他们都会比当前的2小，即在扫描过程中这个2是会单调递增的，原因是如果不是单调递增的，那么这个第一次出现下降的数和当前的栈顶以及栈顶右边的数就构成了一个132模式，会在之前就直接返回。

    >    作者：AcWing Diamondz

```c++
class Solution {
public:
/*
这个问题与Knuth所提出来的 stack-sortable permutation 类似，
即判断一个数组是否可以只用一个栈来进行排序，当且仅当它不包含231模式。
而将本问题中的数组逆序，寻找132模式就变成了寻找231模式，
也即判断数组是否可以仅用一个栈来进行排序。
*/
    bool find132pattern(vector<int>& nums) {
        stack<int> stk;
        int right = INT_MIN;
        for (int i = nums.size() - 1; i >= 0; -- i ) {
            // 考虑当前元素作为1
            if (nums[i] < right) return true;
            // 更新2
            while (!stk.empty() && nums[i] > stk.top()) {
                right = max(right, stk.top());
                stk.pop();
            }
            stk.push(nums[i]);
        }
        return false;
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
    def find132pattern(self, nums: List[int]) -> bool:
        #对于每个数，找到右边比它小的数，左边比它小的数，并且左边的数要比右边的数小。
        stack = []
        _MIN = float("-inf")
        for num in reversed(nums):
            #[3, 1, 4, 2]
            if _MIN > num: return True
            while stack and stack[-1] < num:
                _MIN = stack.pop()
            stack.append(num)
        return False     
```

