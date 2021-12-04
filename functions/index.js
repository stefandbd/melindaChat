const functions = require("firebase-functions");
const stripe = require('stripe')('sk_test_bVU9hhfHm6orcdQJwBRcK6Pd00Xypi7BB3');

exports.payStripe = functions.https.onRequest((async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: req.body.currency,
    });
    // Return client secret
    res.json({
        clientSecret: paymentIntent.client_secret
    });
}));

exports.paySubscription = functions.https.onRequest((async (req, res) => {
    const { email, payment_method } = req.body;
    const customer = await stripe.customers.create({
        payment_method: payment_method,
        email: email,
        invoice_settings: {
            default_payment_method: payment_method,
        },
    });

    const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: 'price_1Jw4nmLEN29tXnqDWB71l4ea' }],
        expand: ['latest_invoice.payment_intent']
    });

    console.log('subscription === ', subscription);
    const status = subscription['latest_invoice']['payment_intent']['status']
    const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']

    res.json({ 'client_secret': client_secret, 'status': status });
}));

exports.getSubscriptionStatus = functions.https.onRequest((async (req, res) => {
    const { email } = req.body;
    const customers = await stripe.customers.list({
        email: email,
        limit: 1
    }).then(res => {
        return res.data;
    });
    res.json({ 'customer': customers });
}));
