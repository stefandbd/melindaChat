// Uncomment these if you want to remove firebase and add your own custom backend:
// import * as friendship from './local/friendship';
// import FriendshipAPITracker from './local/tracker';
// import FriendshipManager from './firebase/friendshipManager';
// export { friendship, FriendshipAPITracker, FriendshipManager };

// Uncomment these if you want to use our own custom nodejs backend:
// import * as friendship from './backend/friendship';
// import FriendshipAPITracker from './backend/tracker';
// import FriendshipManager from './backend/friendshipManager';
// export { friendship, FriendshipAPITracker, FriendshipManager };

// Remove these lines if you want to remove firebase and add your own custom backend:
import * as friendship from './firebase/friendship'
import FriendshipAPITracker from './firebase/tracker'
import FriendshipManager from './firebase/friendshipManager'
export { friendship, FriendshipAPITracker, FriendshipManager }
