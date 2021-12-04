// Uncomment these if you want to remove firebase and add your own custom backend:
// import * as channelManager from './local/channel';
// import ChannelsTracker from './local/channelsTracker';
// import SingleChannelTracker from './local/singleChannelTracker';
// export { channelManager, ChannelsTracker, SingleChannelTracker };

// Uncomment these if you want to use our own custom backend:
// import * as channelManager from './backend/channel';
// import ChannelsTracker from './backend/channelsTracker';
// import SingleChannelTracker from './backend/singleChannelTracker';
// export { channelManager, ChannelsTracker, SingleChannelTracker };

// Remove these lines if you want to remove firebase and a different custom backend:
import * as channelManager from './firebase/channel'
import ChannelsTracker from './firebase/channelsTracker'
import SingleChannelTracker from './firebase/singleChannelTracker'
export { channelManager, ChannelsTracker, SingleChannelTracker }
