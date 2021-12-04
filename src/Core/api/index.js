// Uncomment these if you want to remove firebase and add your own custom backend:
// import storageAPI from './local/storage';
// import * as authAPI from './local/auth';
// import PaymentAPIManager from './local/paymentMethods';
// import * as userAPIManager from './local/user';
// export { storageAPI, authAPI, PaymentAPIManager, userAPIManager };

// Uncomment these if you want to remove firebase and add your own custom backend:
// import storageAPI from './backend/storage';
// import * as authAPI from './backend/auth';
// import PaymentAPIManager from './backend/paymentMethods';
// import * as userAPIManager from './backend/user';
// export { storageAPI, authAPI, PaymentAPIManager, userAPIManager };

// Remove these lines if you want to remove firebase and add your own custom backend:
import storageAPI from './firebase/storage'
import * as authAPI from './firebase/auth'
import PaymentAPIManager from './firebase/paymentMethods'
import * as userAPIManager from './firebase/user'
export { storageAPI, authAPI, PaymentAPIManager, userAPIManager }
