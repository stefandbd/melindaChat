import React, {
  useContext,
  useLayoutEffect,
  useState,
  useRef,
  useEffect,
} from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { useSelector, ReactReduxContext } from 'react-redux'
import { IMFriendItem } from '../..'
import { SearchBar } from '../../../..'
import dynamicStyles from './styles'
import { useColorScheme } from 'react-native-appearance'
import { IMLocalized } from '../../../../localization/IMLocalization'
import { FriendshipConstants, filteredNonFriendshipsFromUsers } from '../..'
import { FriendshipAPITracker } from '../../api'
import UsersTracker from '../../../../users/tracker'

function IMUserSearchModal(props) {
  const { onFriendItemPress } = props

  const currentUser = useSelector(state => state.auth.user)
  const reduxUsers = useSelector(state => state.users.users)
  const friendships = useSelector(state => state.friends.friendships)

  const searchBarRef = useRef(null)
  const colorScheme = useColorScheme()
  const appStyles = props.route.params.appStyles
  const styles = dynamicStyles(appStyles, colorScheme)

  const followEnabled = props.route.params.followEnabled

  const { store } = useContext(ReactReduxContext)
  const [keyword, setKeyword] = useState('')
  const [filteredFriendships, setFilteredFriendships] = useState([])
  const userTracker = useRef(null)
  const friendshipsTracker = useRef(null)

  useEffect(() => {
    if (!currentUser?.id) {
      return
    }

    friendshipsTracker.current?.unsubscribe()
    friendshipsTracker.current = new FriendshipAPITracker(
      store,
      currentUser.id,
      followEnabled,
      followEnabled,
      followEnabled,
    )
    friendshipsTracker.current.subscribeIfNeeded()

    userTracker.current = new UsersTracker(store, currentUser.id)
    userTracker.current.subscribeIfNeeded()

    if (searchBarRef.current) {
      searchBarRef.current.focus()
    }
  }, [currentUser?.id])

  useEffect(() => {
    if (reduxUsers) {
      updateFilteredFriendships()
    }
  }, [reduxUsers])

  useEffect(() => {
    if (friendships) {
      updateFilteredFriendships()
    }
  }, [friendships])

  useEffect(() => {
    return () => {
      userTracker.current?.unsubscribe()
      friendshipsTracker.current?.unsubscribe()
    }
  }, [])

  useLayoutEffect(() => {
    let currentTheme = appStyles.navThemeConstants[colorScheme]
    props.navigation.setOptions({
      headerTitle: IMLocalized('Search users...'),
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomColor: currentTheme.hairlineColor,
      },
    })
  }, [])

  const renderItem = ({ item, index }) => (
    <IMFriendItem
      item={item}
      key={index}
      onFriendAction={() => onAddFriend(item, index)}
      onFriendItemPress={onFriendItemPress}
      appStyles={appStyles}
      followEnabled={followEnabled}
    />
  )

  const updateFilteredFriendships = (filteringKeyword = keyword) => {
    if (reduxUsers == null || friendships == null) {
      return
    }

    const filteredFriendships = filteredNonFriendshipsFromUsers(
      filteringKeyword,
      reduxUsers.filter(user => user.id != currentUser?.id),
      friendships,
    ).splice(0, 25) // Show only 25 results at a time
    setFilteredFriendships(filteredFriendships)
  }

  const onSearchClear = () => {
    setKeyword('')
  }

  const onSearchBarCancel = async () => {
    if (searchBarRef.current) {
      searchBarRef.current.blur()
    }
    props.navigation.goBack()
  }

  const onSearchTextChange = text => {
    setKeyword(text.trim())
    updateFilteredFriendships(text.trim())
  }

  const onAddFriend = (item, index) => {
    if (item.type == FriendshipConstants.FriendshipType.none) {
      const oldFilteredFriendships = filteredFriendships
      removeFriendshipAt(index)
      friendshipsTracker.current?.addFriendRequest(
        currentUser,
        item.user,
        response => {
          if (response?.error) {
            setFilteredFriendships(oldFilteredFriendships)
          }
        },
      )
    }
  }

  const removeFriendshipAt = async index => {
    const newFilteredFriendships = [...filteredFriendships]
    await newFilteredFriendships.splice(index, 1)
    setFilteredFriendships([...newFilteredFriendships])
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          placeholderTitle={IMLocalized('Search for people')}
          onChangeText={onSearchTextChange}
          onSearchBarCancel={onSearchBarCancel}
          searchRef={searchBarRef}
          onSearchClear={onSearchClear}
          appStyles={appStyles}
          searchContainerStyle={styles.searchContainer}
        />
      </View>
      {(reduxUsers == null || friendships == null) && (
        <ActivityIndicator
          style={{ marginTop: 15 }}
          size="small"
          color="#cccccc"
        />
      )}
      <FlatList
        keyboardShouldPersistTaps="always"
        data={filteredFriendships}
        renderItem={renderItem}
      />
    </View>
  )
}

export default IMUserSearchModal
