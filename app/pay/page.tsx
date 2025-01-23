'use client';
import React from 'react';

const handleClick = async () => {
    try {
        // Replace with your backend payment API endpoint
        const response = await fetch(`https://api.abhipay.com.pk/api/v2/createOrder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `80A5857FE1BC41B0964B379E5584772A`,
            },
            body: JSON.stringify(
                {
                    "merchant": "ES1092545",
                    "body": {
                        "amount": 10,
                        "language": "EN",
                        "currencyType": "PKR",
                        "description": "NGO Donation",
                        "approveURL": "https://example.com/success",
                        "cancelURL": "https://example.com/cancel",
                        "declineURL": "https://example.com/decline",
                        "uuid": "4169733213495869",
                        "cardStorage": true
                    }
                }
            ),
        });

        if (!response.ok) {
            throw new Error('Payment initiation failed');
        }

        const data = await response.json();
        console.log('Payment Successful:', data);

        // Handle further actions (e.g., redirect to a success page or show a success message)
        alert('Payment successful!');
    } catch (error) {
        console.error('Error:', error);
        alert('Payment failed. Please try again.');
    }
};

const Pay = () => {
    return (
        <div className="payment-iframe-container">
        <iframe
          src="https://pay.abhipay.com.pk/po/v3/RSc0n"
          scrolling="no"
          height="230px"
          width="300px"
          style={{ border: 'none' }}
          title="Payment Iframe"
        ></iframe>
      </div>
    );
};

export default Pay;
