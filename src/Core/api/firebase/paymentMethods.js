import { firebase } from './config'

export default class PaymentMethodDataManager {
  constructor(appConfig) {
    this.appConfig = appConfig
    this.paymentMethodsRef = firebase
      .firestore()
      .collection(this.appConfig.FIREBASE_COLLECTIONS.PAYMENT_METHODS)
  }

  updateUserPaymentMethods = async ({ ownerId, card }) => {
    try {
      this.paymentMethodsRef.doc(card.cardId).set({ ownerId, card })
    } catch (error) {
      return { error, success: false }
    }
  }

  deleteFromUserPaymentMethods = async cardId => {
    try {
      this.paymentMethodsRef.doc(cardId).delete()
    } catch (error) {
      return { error, success: false }
    }
  }

  subscribePaymentMethods = (ownerId, callback) => {
    if (!ownerId) {
      return
    }
    return this.paymentMethodsRef
      .where('ownerId', '==', ownerId)
      .onSnapshot(querySnapshot => {
        const paymentMethods = []

        querySnapshot.forEach(doc => {
          const data = doc.data()

          paymentMethods.push(data)
        })

        return callback(paymentMethods)
      })
  }

  savePaymentSource = async (userId, source) => {
    try {
      const response = await firebase
        .firestore()
        .collection(this.appConfig.FIREBASE_COLLECTIONS.STRIPE_CUSTOMERS)
        .doc(userId)
        .collection(this.appConfig.FIREBASE_COLLECTIONS.SOURCES)
        .doc(source.fingerprint)
        .set(source)

      return { response, success: true }
    } catch (error) {
      console.log(error)
      return { error, success: false }
    }
  }
}
