import Config from 'react-native-config';

const baseUrl = Config.BASE_URL;
const publishKeyTest = Config.PUBLISH_KEY_TEST;

const getSubscriptionStatus = baseUrl + 'getSubscriptionStatus';
const payStripe = baseUrl + 'payStripe';
const paySubscription = baseUrl + 'paySubscription';


let ConfigData = {
    baseUrl,
    getSubscriptionStatus,
    payStripe,
    paySubscription,
    publishKeyTest,
};

export { ConfigData };