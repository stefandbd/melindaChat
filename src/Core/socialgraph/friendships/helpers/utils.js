import { FriendshipConstants } from '../constants'

export const getFollowerIDs = (friendships, friends, followEnabled) => {
  if (!followEnabled) {
    return friends.map(friend => friend.id)
  }
  return friendships
    .filter(
      friendship =>
        friendship.type == FriendshipConstants.FriendshipType.inbound ||
        friendship.type == FriendshipConstants.FriendshipType.reciprocal,
    )
    .map(friendship => friendship.user.id)
}

export const filteredNonFriendshipsFromUsers = (
  keyword,
  users,
  friendships,
) => {
  var filteredUsers = users
  if (keyword && keyword.length > 0) {
    filteredUsers = users.filter(user => {
      const fullName = `${user.firstName} ${user.lastName}`
      return (
        fullName && fullName.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
      )
    })
  }
  filteredUsers = filteredUsers.filter(
    user => !friendships.find(friendship => friendship.user.id == user.id),
  )
  return filteredUsers.map(user => {
    return {
      user: user,
      type: FriendshipConstants.FriendshipType.none,
    }
  })
}
