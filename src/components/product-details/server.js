// // const express = require('express');
// import { express } from 'express';

// // const SSLCommerzPayment = require('/node_modules/sslcommerz-lts'); // sslcommerz-lts  d:/CC/Vue JS/Part 1 Setup/New folder/class11-deshboard/sakai-vue/node_modules/sslcommerz-lts/index

// import SSLCommerzPayment from '/node_modules/sslcommerz-lts';

// const app = express();
// const port = 5174;

// app.get('/init', (req, res) => {
//     const sslcz = new SSLCommerzPayment('totoc672cf77aac671', 'totoc672cf77aac671@ssl', false);
//     const data = {
//         total_amount: 100,
//         currency: 'BDT',
//         tran_id: 'REF123',
//         success_url: 'http://localhost:5173/success',
//         fail_url: 'http://localhost:5173/fail',
//         cancel_url: 'http://localhost:5173/cancel',
//         cus_name: 'Customer Name',
//         cus_email: 'customer@example.com',
//         cus_phone: '01711111111'
//     };

//     sslcz.init(data).then((apiResponse) => {
//         res.json(apiResponse); // Send URL to frontend
//     });
// });

// app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
