const express = require('express');
const app = express();
const cors = require('cors');
const SSLCommerzPayment = require('/node_modules/sslcommerz-lts/api/payment-controller');
const store_id = 'totoc672cf77aac671';
const store_passwd = 'totoc672cf77aac671@ssl';
const is_live = false; //true for live, false for sandbox

const port = 5174;

app.use(
    cors({
        origin: 'http://localhost:3000' // Replace with your Vue app's URL
    })
);

//sslcommerz init
app.get('/init', (req, res) => {
    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: 'REF123',
        success_url: 'http://localhost:3030/success',
        fail_url: 'http://localhost:3030/fail',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh'
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data).then((apiResponse) => {
        let GatewayPageURL = apiResponse.GatewayPageURL;
        res.json({ GatewayPageURL }); // Send URL in JSON response
        console.log('Redirecting to:', GatewayPageURL);
    });
});

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });
