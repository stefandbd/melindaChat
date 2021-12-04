import React, {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useContext,
} from 'react'
import { BackHandler } from 'react-native'
import { ReactReduxContext, useSelector } from 'react-redux'
import { FriendshipAPITracker, FriendshipManager } from '../../api'
import { IMFriendsListComponent, FriendshipConstants } from '../..'
import { IMLocalized } from '../../../../localization/IMLocalization'
import { Appearance } from 'react-native-appearance'

function IMAllFriendsScreen(props) {
  const appStyles = props.route.params.appStyles
  let colorScheme = Appearance.getColorScheme()
  const currentTheme = appStyles.navThemeConstants[colorScheme]

  const stateFriendships = useSelector(state => state.friends.friendships)
  const currentUser = useSelector(state => state.auth.user)

  const emptyStateConfig = {
    title: IMLocalized('No ') + title,
    description: IMLocalized("There's nothing to see here yet."),
  }

  const didFocusSubscription = useRef(null)
  const willBlurSubscription = useRef(null)

  const title = props.route.params.title
  const otherUser = props.route.params.otherUser
  const followEnabled = props.route.params.followEnabled
  const includeInbound = props.route.params.includeInbound
  const includeOutbound = props.route.params.includeOutbound
  const includeReciprocal = props.route.params.includeReciprocal
  const stackKeyTitle = props.route.params.stackKeyTitle
    ? props.route.params.stackKeyTitle
    : 'Profile'

  const vieweeID = otherUser ? otherUser.id : currentUser.id

  const [isLoading, setIsLoading] = useState(true)
  const [friendships, setFriendships] = useState(null)
  const [loggedInUserFriendships, setLoggedInUserFriendships] = useState(null)

  const { store } = useContext(ReactReduxContext)

  const friendshipTracker = useRef(
    new FriendshipAPITracker(store, currentUser, true, followEnabled, true),
  )

  const onFriendshipsRetrieved = (
    reciprocalFriendships,
    inboundFriendships,
    outboundFriendships,
  ) => {
    var finalFriendships = []
    if (includeReciprocal) {
      finalFriendships = finalFriendships.concat(reciprocalFriendships)
    }
    if (includeInbound) {
      finalFriendships = finalFriendships.concat(inboundFriendships)
    }
    if (includeOutbound) {
      finalFriendships = finalFriendships.concat(outboundFriendships)
    }
    setIsLoading(false)

    setLoggedInUserFriendships(stateFriendships)
    setFriendships(hydrateFriendshipStatusesForCurrentUser(stateFriendships))
  }

  const friendshipManager = useRef(
    new FriendshipManager(followEnabled, onFriendshipsRetrieved),
  )

  useEffect(() => {
    didFocusSubscription.current = props.navigation.addListener(
      'focus',
      payload => {
        BackHandler.addEventListener(
          'hardwareBackPress',
          onBackButtonPressAndroid,
        )
      },
    )

    willBlurSubscription.current = props.navigation.addListener(
      'beforeRemove',
      payload => {
        isBlur = true
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onBackButtonPressAndroid,
        )
      },
    )
    return () => {
      didFocusSubscription.current && didFocusSubscription.current()
      willBlurSubscription.current && willBlurSubscription.current()
    }
  }, [])

  useEffect(() => {
    friendshipManager.current.fetchFriendships(vieweeID)
    return () => {
      friendshipManager.current && friendshipManager.current.unsubscribe()
    }
  }, [])

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: props.route.params.title,
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomColor: currentTheme.hairlineColor,
      },
      headerTintColor: currentTheme.fontColor,
    })
  }, [])

  const hydrateFriendshipStatusesForCurrentUser = otherFriendships => {
    const myFriendships = stateFriendships
    return otherFriendships.map(otherFriendship => {
      const friendship = myFriendships.find(
        friendship => friendship.user.id == otherFriendship.user.id,
      )
      const type = friendship ? friendship.type : 'none'
      return {
        user: otherFriendship.user,
        type,
      }
    })
  }

  const onBackButtonPressAndroid = () => {
    props.navigation.goBack()
    return true
  }

  const onFriendAction = (item, index) => {
    if (isLoading) {
      return
    }
    switch (item.type) {
      case FriendshipConstants.FriendshipType.none:
        onAddFriend(item, index)
        break
      case FriendshipConstants.FriendshipType.reciprocal:
        onUnfriend(item, index)
        break
      case FriendshipConstants.FriendshipType.inbound:
        onAccept(item, index)
        break
      case FriendshipConstants.FriendshipType.outbound:
        onCancel(item, index)
        break
    }
  }

  const onUnfriend = (item, index) => {
    setIsLoading(true)
    friendshipTracker.unfriend(currentUser, item.user, respone => {
      setIsLoading(false)
    })
  }

  const onAddFriend = (item, index) => {
    setIsLoading(true)
    friendshipTracker.addFriendRequest(currentUser, item.user, response => {
      setIsLoading(false)
    })
  }

  const onCancel = (item, index) => {
    setIsLoading(true)
    friendshipTracker.cancelFriendRequest(currentUser, item.user, response => {
      setIsLoading(false)
    })
  }

  const onAccept = (item, index) => {
    setIsLoading(true)
    friendshipTracker.addFriendRequest(currentUser, item.user, response => {
      setIsLoading(false)
    })
  }

  const onFriendItemPress = item => {
    const user = item.user || item
    if (user.id === user.id) {
      // my own profile
      props.navigation.push(stackKeyTitle, {
        stackKeyTitle: stackKeyTitle,
      })
    } else {
      props.navigation.push(stackKeyTitle, {
        user,
        stackKeyTitle: stackKeyTitle,
      })
    }
  }

  return (
    <IMFriendsListComponent
      viewer={currentUser}
      friendsData={friendships}
      searchBar={false}
      onFriendItemPress={onFriendItemPress}
      onFriendAction={onFriendAction}
      appStyles={appStyles}
      isLoading={isLoading}
      followEnabled={followEnabled}
      displayActions={true}
      emptyStateConfig={emptyStateConfig}
    />
  )
}

export default IMAllFriendsScreen
