#  [460. LFU 缓存](https://leetcode-cn.com/problems/lfu-cache/)

## 题意



## 题解



```c++
// 网络很多做法并不是 O1

class LFUCache {
public:
    struct Node {
        Node *left, *right;
        int key, val;
        Node(int _key, int _val) {
            key = _key, val = _val;
            left = right = NULL;
        }
    };
    struct Block {
        Block *left, *right;
        Node *head, *tail;
        int cnt;
        Block(int _cnt) {
            cnt = _cnt;
            left = right = NULL;
            head = new Node(-1, -1), tail = new Node(-1, -1);
            head->right = tail, tail->left = head;
        }
        ~Block() {
            delete head;
            delete tail;
        }
        void insert(Node* p) {
            p->right = head->right;
            head->right->left = p;
            p->left = head;
            head->right = p;
        }
        void remove(Node* p) {
            p->left->right = p->right;
            p->right->left = p->left;
        }
        bool empty() {
            return head->right == tail;
        }
    }*head, *tail;
    int n;
    unordered_map<int, Block*> hash_block;
    unordered_map<int, Node*> hash_node;

    void insert(Block* p) {  // 在p的右侧插入新块，cnt是p->cnt + 1
        auto cur = new Block(p->cnt + 1);
        cur->right = p->right;
        p->right->left = cur;
        p->right = cur;
        cur->left = p;
    }

    void remove(Block* p) {
        p->left->right = p->right;
        p->right->left = p->left;
        delete p;
    }

    LFUCache(int capacity) {
        n = capacity;
        head = new Block(0), tail = new Block(INT_MAX);
        head->right = tail, tail->left = head;
    }

    int get(int key) {
        if (hash_block.count(key) == 0) return -1;
        auto block = hash_block[key];
        auto node = hash_node[key];
        block->remove(node);
        if (block->right->cnt != block->cnt + 1) insert(block);
        block->right->insert(node);
        hash_block[key] = block->right;
        if (block->empty()) remove(block);
        return node->val;
    }

    void put(int key, int value) {
        if (!n) return;
        if (hash_block.count(key)) {
            hash_node[key]->val = value;
            get(key);
        } else {
            if (hash_block.size() == n) {
                auto p = head->right->tail->left;
                head->right->remove(p);
                if (head->right->empty()) remove(head->right);
                hash_block.erase(p->key);
                hash_node.erase(p->key);
                delete p;
            }
            auto p = new Node(key, value);
            if (head->right->cnt > 1) insert(head);
            head->right->insert(p);
            hash_block[key] = head->right;
            hash_node[key] = p;
        }
    }
};

// ---------------------------------------------------------------
struct Node {
    int cnt, time, key, value;
    Node(int c, int t, int k, int v):cnt(c),time(t),key(k),value(v) {}
    bool operator < (const Node& rhs) const {
        return cnt == rhs.cnt ? time < rhs.time : cnt < rhs.cnt;
    }
};

class LFUCache {
public:
    int cap, time;
    unordered_map<int, Node> m;
    set<Node> s;
    LFUCache(int capacity) {
        cap = capacity;
        time = 0;
    }
    
    int get(int key) {
        if(!cap) return -1;
        auto it = m.find(key);
        if(it == m.end()) return -1;
        auto node = it->second;
        s.erase(node);
        ++node.cnt, node.time = ++time;
        s.insert(node);
        it->second = node;
        return node.value;
    }
    
    void put(int key, int value) {
        if(!cap) return;
        auto it = m.find(key);
        if(it == m.end()) {
            if(m.size() == cap) {
                m.erase(s.begin()->key);
                s.erase(s.begin());
            }
            Node node = Node(1, ++time, key, value);
            m.insert({key, node});
            s.insert(node);
        } else {
            Node node = it->second;
            s.erase(node);
            ++node.cnt, node.time = ++time, node.value = value;
            s.insert(node);
            it->second = node;
        }
    }
};
/**
 * Your LFUCache object will be instantiated and called as such:
 * LFUCache* obj = new LFUCache(capacity);
 * int param_1 = obj->get(key);
 * obj->put(key,value);
 */
```



```python3

```

