## [比赛链接](https://leetcode.cn/contest/weekly-contest-296/)


### [2293. 极大极小游戏](https://leetcode.cn/problems/min-max-game/)



```c++
class Solution {
public:
    int minMaxGame(vector<int>& nums) {
        while (nums.size() > 1) {
            int n = nums.size();
            vector<int> t(n / 2);
            for (int i = 0; i < n / 2; ++ i )
                if (i & 1)
                    t[i] = max(nums[i * 2], nums[2 * i + 1]);
                else
                    t[i] = min(nums[i * 2], nums[2 * i + 1]);
            nums = t;
        }
        return nums[0];
    }
};
```


### [2294. 划分数组使最大差为 K](https://leetcode.cn/problems/partition-array-such-that-maximum-difference-is-k/)



```c++
class Solution {
public:
    int partitionArray(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        int res = 0, n = nums.size();
        for (int i = 0; i < n; ++ i ) {
            int j = i;
            while (j < n && nums[j] - nums[i] <= k)
                j ++ ;
            i = j - 1;
            res ++ ;
        }
        return res;
    }
};
```

### [2295. 替换数组中的元素](https://leetcode.cn/problems/replace-elements-in-an-array/)



```c++
class Solution {
public:
    vector<int> arrayChange(vector<int>& nums, vector<vector<int>>& operations) {
        unordered_map<int, int> hash;
        int n = nums.size();
        for (int i = 0; i < n; ++ i )
            hash[nums[i]] = i;
        
        for (auto & op : operations) {
            int a = op[0], b = op[1];
            auto it = hash.find(a);
            int idx = it->second;
            hash.erase(it);
            hash[b] = idx;
            nums[idx] = b;
        }
        return nums;
    }
};
```

### [2296. 设计一个文本编辑器](https://leetcode.cn/problems/design-a-text-editor/) [TAG]

STL list 记录用法

```c++
class TextEditor {
public:
    list<char> L;
    list<char>::iterator p;
    
    TextEditor() {
        p = L.begin();
    }
    
    string print() {
        string t;
        for (auto c : L)
            t.push_back(c);
        return t;
    }
    
    void addText(string text) {
        for (auto c : text)
            L.insert(p, c); // ATTENTION STL insert 后的变化
    }
    
    int deleteText(int k) {
        int c = 0;
        for (; k && p != L.begin(); -- k )
            p = L.erase(prev(p)), c ++ ;    // ATTENTION erase 的返回值
        return c;
    }
    
    string getText() {
        string t;
        auto it = p;
        for (int k = 10; k && it != L.begin(); -- k ) {
            it = prev(it);
            t.push_back(*it);
        }
        reverse(t.begin(), t.end());
        return t;
    }
    
    string cursorLeft(int k) {
        for (; k && p != L.begin(); -- k )
            p = prev(p);
        return getText();
    }
    
    string cursorRight(int k) {
        for (; k && p != L.end(); -- k )
            p = next(p);
        return getText();
    }
};

/**
 * Your TextEditor object will be instantiated and called as such:
 * TextEditor* obj = new TextEditor();
 * obj->addText(text);
 * int param_2 = obj->deleteText(k);
 * string param_3 = obj->cursorLeft(k);
 * string param_4 = obj->cursorRight(k);
 */
```

**对顶栈** 经典应用 1A

```c++
class TextEditor {
public:
    vector<char> l, r;
    
    TextEditor() {
        l.clear(), r.clear();
    }
    
    void addText(string text) {
        for (auto c : text)
            l.push_back(c);
    }
    
    int deleteText(int k) {
        int c = 0;
        while (l.size() && k)
            l.pop_back(), k -- , c ++ ;
        return c;
    }
    
    string getText() {
        string t;
        int n = l.size();
        for (int i = max(0, n - 10); i < n; ++ i )
            t.push_back(l[i]);
        return t;
    }
    
    string cursorLeft(int k) {
        while (l.size() && k) {
            char c = l.back();
            r.push_back(c), l.pop_back();
            k -- ;
        }
        return getText();
    }
    
    string cursorRight(int k) {
        while (r.size() && k) {
            char c = r.back();
            l.push_back(c), r.pop_back();
            k -- ;
        }
        return getText();
    }
};

/**
 * Your TextEditor object will be instantiated and called as such:
 * TextEditor* obj = new TextEditor();
 * obj->addText(text);
 * int param_2 = obj->deleteText(k);
 * string param_3 = obj->cursorLeft(k);
 * string param_4 = obj->cursorRight(k);
 */
```

TLE

```c++
class TextEditor {
public:
    const static int N = 8e5 + 10;
    
    string s;
    int p;
    
    TextEditor() {
        this->s = "|";
        this->p = 0;
    }
    
    void addText(string text) {
        s = s.substr(0, p) + text + s.substr(p);
        p += text.size();
        // cout << " after add: " << s << endl;
    }
    
    int deleteText(int k) {
        int idx = p - k;
        if (idx >= 0) {
            s = s.substr(0, idx) + s.substr(p);
            p -= k;
        // cout << " after delete 1: " << s << endl;
            return k;
        } else {
            int t = p;
            s = s.substr(p);
            p = 0;
        // cout << " after delete 2: " << s << endl;
            return t;
        }
    }
    
    string cursorLeft(int k) {
        int n = s.size();
        int op = p;
        p = max(0, p - k);
        s = s.substr(0, p) + "|" + s.substr(p, op - p) + (op < s.size() ? s.substr(op + 1) : "");
        
        
        string t;
        for (int i = max(0, p - 10); i < p; ++ i )
            t.push_back(s[i]);
        // cout << " after cursorLeft: " << s << " p = " << p << endl;
        // cout << " t = " << t << endl;
        return t;
    }
    
    string cursorRight(int k) {
        int n = s.size();
        int op = p;
        p = min(n - 1, p + k);
        s = s.substr(0, op) + (op < s.size() ? s.substr(op + 1, p - op) : "") + s.substr(p);
        
        
        string t;
        for (int i = max(0, p - 10); i < p; ++ i )
            t.push_back(s[i]);
        // cout << " after cursorRight: " << s << " p = " << p << endl;
        // cout << " t = " << t << endl;
        return t;
    }
};

/**
 * Your TextEditor object will be instantiated and called as such:
 * TextEditor* obj = new TextEditor();
 * obj->addText(text);
 * int param_2 = obj->deleteText(k);
 * string param_3 = obj->cursorLeft(k);
 * string param_4 = obj->cursorRight(k);
 */
```

