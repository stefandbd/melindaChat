const UPDATE_USER = 'UPDATE_USER'
const UPDATE_STRIPE_USER_DATA = 'UPDATE_STRIPE_USER_DATA'
const LOG_OUT = 'LOG_OUT'

export const DUMMY_USER_DATA = {}

export const setUserData = data => ({
  type: UPDATE_USER,
  data,
})

export const setUserStripeData = data => ({
  type: UPDATE_STRIPE_USER_DATA,
  data,
})

export const logout = () => ({
  type: LOG_OUT,
})

const initialState = {
  user: DUMMY_USER_DATA,
}

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: action.data.user,
      }
      case UPDATE_STRIPE_USER_DATA:
        return {
          ...state,
          stripeUser: action.data.stripeUser,
        }
    case LOG_OUT: {
      return initialState
    }
    default:
      return state
  }
}
