#  [284. 顶端迭代器](https://leetcode.cn/problems/peeking-iterator/)

## 题意



## 题解



```c++
/*
 * Below is the interface for Iterator, which is already defined for you.
 * **DO NOT** modify the interface for Iterator.
 *
 *  class Iterator {
 *		struct Data;
 * 		Data* data;
 *		Iterator(const vector<int>& nums);
 * 		Iterator(const Iterator& iter);
 *
 * 		// Returns the next element in the iteration.
 *		int next();
 *
 *		// Returns true if the iteration has more elements.
 *		bool hasNext() const;
 *	};
 */

class PeekingIterator : public Iterator {
public:
    int _next;
    bool _has_next;

    PeekingIterator(const vector<int>& nums) : Iterator(nums) {
        // Initialize any member here.
        // **DO NOT** save a copy of nums and manipulate it directly.
        // You should only use the Iterator interface methods.
        _has_next = Iterator::hasNext();
        if (_has_next)
            _next = Iterator::next();
    }

    // Returns the next element in the iteration without advancing the iterator.
    int peek() {
        return _next;
    }

    // hasNext() and next() should behave the same as in the Iterator interface.
    // Override them if needed.
    int next() {
        int res = _next;
        _has_next = Iterator::hasNext();
        if (_has_next)
            _next = Iterator::next();
        return res;
    }

    bool hasNext() const {
        return _has_next;
    }
};
```



```python3

```

