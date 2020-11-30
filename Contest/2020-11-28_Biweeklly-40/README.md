## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-40/)

虚拟竞赛 rating: 38 / 1891

27min

### [1668. 最大重复子字符串](https://leetcode-cn.com/problems/maximum-repeating-substring/)

略

```c++
class Solution {
public:
    int maxRepeating(string sequence, string word) {
        int res = 0;
        string w = word;
        while (sequence.find(w) != sequence.npos) {
            ++ res;
            w += word;
        }
        return res;
    }
};
```


### [1669. 合并两个链表](https://leetcode-cn.com/problems/merge-in-between-linked-lists/)

模拟即可

```c++
class Solution {
public:
    ListNode* mergeInBetween(ListNode* list1, int a, int b, ListNode* list2) {
        auto dummy = new ListNode(-1);
        dummy->next = list1;
        ListNode * pre = dummy, * last = dummy;
        while (a -- ) pre = pre->next;
        while (b -- ) last = last->next;
        last = last->next;
        
        pre->next = list2;
        while (pre->next) pre = pre->next;
        pre->next = last->next;
        return dummy->next;
    }
};
```

Heltion

```c++
    ListNode* mergeInBetween(ListNode* list1, int a, int b, ListNode* list2) {
        ListNode* p = list1;
        for(int i = 0; i < a - 1; i += 1) p = p->next;
        ListNode* q = list1;
        for(int i = 0; i <= b; i += 1) q = q->next;
        ListNode* x = list2;
        while(x->next != nullptr) x = x->next;
        p->next = list2;
        x->next = q;
        return list1;
    }
```


### [5560. 设计前中后队列](https://leetcode-cn.com/problems/design-front-middle-back-queue/)

模拟即可，注意 pushMiddle 的时候需预操作

```c++
class FrontMiddleBackQueue {
public:
    // q1.size < q1.size
    deque<int> q1, q2;
    
    FrontMiddleBackQueue() {
        q1.clear(), q2.clear();
    }
    
    void pushFront(int val) {
        q1.push_front(val);
        if (q1.size() >= q2.size()) {
            q2.push_back(q1.back());
            q1.pop_back();
        }
    }
    
    void pushMiddle(int val) {
        if (q1.size() + 2 <= q2.size()) {
            q1.push_back(q2.back());
            q2.pop_back();
        }
        q1.push_back(val);
        if (q1.size() >= q2.size() && q1.size()) {
            q2.push_back(q1.back());
            q1.pop_back();
        }
    }
    
    void pushBack(int val) {
        q2.push_front(val);
        if (q2.size() > q1.size() + 2) {
            q1.push_back(q2.back());
            q2.pop_back();
        }
    }
    
    int popFront() {
        if (q1.empty() && q2.empty()) return -1;
        if (q1.size()) {
            int res = q1.front();
            q1.pop_front();
            if (q2.size() > q1.size() + 2) {
                q1.push_back(q2.back());
                q2.pop_back();
            }
            return res;
        } else {
            int res = q2.back();
            q2.pop_back();
            return res;
        }
    }
    
    int popMiddle() {
        if (q2.empty()) return -1;
        int res = q2.back();
        q2.pop_back();
        if (q1.size() >= q2.size() && q1.size()) {
            q2.push_back(q1.back());
            q1.pop_back();
        }
        return res;
    }
    
    int popBack() {
        if (q2.empty()) return -1;
        int res = q2.front();
        q2.pop_front();
        if (q1.size() >= q2.size() && q1.size()) {
            q2.push_back(q1.back());
            q1.pop_back();
        }
        return res;
    }
};

/**
 * Your FrontMiddleBackQueue object will be instantiated and called as such:
 * FrontMiddleBackQueue* obj = new FrontMiddleBackQueue();
 * obj->pushFront(val);
 * obj->pushMiddle(val);
 * obj->pushBack(val);
 * int param_4 = obj->popFront();
 * int param_5 = obj->popMiddle();
 * int param_6 = obj->popBack();
 */
```

这题暴力竟然也过。。。

Heltion:

```c++
class FrontMiddleBackQueue {
public:
    vector<int> v;
    FrontMiddleBackQueue() {

    }
    
    void pushFront(int val) {
        v.insert(v.begin(), val);
    }
    
    void pushMiddle(int val) {
        v.insert(v.begin() + v.size() / 2, val);
    }
    
    void pushBack(int val) {
        v.push_back(val);
    }
    
    int popFront() {
        if(v.empty()) return -1;
        int res = v[0];
        v.erase(v.begin());
        return res;
    }
    
    int popMiddle() {
        if(v.empty()) return -1;
        int res = v[(v.size() - 1) / 2];
        v.erase(v.begin() + (v.size() - 1) / 2);
        return res;
    }
    
    int popBack() {
        if(v.empty()) return -1;
        int res = v.back();
        v.pop_back();
        return res;
    }
};
```


### [5559. 得到山形数组的最少删除次数](https://leetcode-cn.com/problems/minimum-number-of-removals-to-make-mountain-array/)

简单 LIS

必须有上升有下降 所以不统计 1 和 n 的位置， WA 1

```c++
ass Solution {
public:
    int minimumMountainRemovals(vector<int>& nums) {
        int n = nums.size();
        vector<int> fu(n + 1), fd(n + 1);
        for (int i = 1; i <= n; ++ i ) {
            fu[i] = 1;
            for (int j = 1; j < i; ++ j )
                if (nums[j - 1] < nums[i - 1]) fu[i] = max(fu[i], fu[j] + 1);
        }
        for (int i = n; i >= 1; -- i ) {
            fd[i] = 1;
            for (int j = n; j > i; -- j )
                if (nums[j - 1] < nums[i - 1]) fd[i] = max(fd[i], fd[j] + 1);
        }
        int res = 0;
        for (int i = 2; i <= n - 1; ++ i )
            res = max(res, fu[i] + fd[i] - 1);
        return n - res;
    }
};
```

关于不使用两头的元素 其实更好的判断是

```c++
if (fu[i] >= 2 && fd[i] >= 2)
    res = max(res, fu[i] + fd[i] - 1);
```
