#  [355. 设计推特](https://leetcode-cn.com/problems/design-twitter/)

## 题意



## 题解



```c++
class Twitter {
public:
    /** Initialize your data structure here. */
    typedef pair<int, int> PII;
    #define x first
    #define y second

    unordered_map<int, vector<PII>> tweets;
    unordered_map<int, unordered_set<int>> follows;
    int ts;

    Twitter() {
        ts = 0;
    }
    
    /** Compose a new tweet. */
    void postTweet(int userId, int tweetId) {
        tweets[userId].push_back({ts, tweetId});
        ++ ts;
    }
    
    /** Retrieve the 10 most recent tweet ids in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user herself. Tweets must be ordered from most recent to least recent. */
    vector<int> getNewsFeed(int userId) {
        priority_queue<vector<int>> heap;
        follows[userId].insert(userId);
        for (auto user : follows[userId]) {
            auto & uts = tweets[user];
            if (uts.size()) {
                int i = uts.size() - 1;
                heap.push({uts[i].first, uts[i].second, i, user});
            }
        }

        vector<int> res;
        for (int i = 0; i < 10 && heap.size(); ++ i ) {
            auto t = heap.top(); heap.pop();
            res.push_back(t[1]);
            int j = t[2];
            if (j) {
                -- j;
                int user = t[3];
                auto & uts = tweets[user];
                heap.push({uts[j].x, uts[j].y, j, user});
            }
        }
        return res;
    }
    
    /** Follower follows a followee. If the operation is invalid, it should be a no-op. */
    void follow(int followerId, int followeeId) {
        follows[followerId].insert(followeeId);
    }
    
    /** Follower unfollows a followee. If the operation is invalid, it should be a no-op. */
    void unfollow(int followerId, int followeeId) {
        follows[followerId].erase(followeeId);
    }
};

/**
 * Your Twitter object will be instantiated and called as such:
 * Twitter* obj = new Twitter();
 * obj->postTweet(userId,tweetId);
 * vector<int> param_2 = obj->getNewsFeed(userId);
 * obj->follow(followerId,followeeId);
 * obj->unfollow(followerId,followeeId);
 */
```



```python3

```

