import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51IA23dBJkuefO43dD252FaF5DttExKCx69wgp3M150UCZG8D6oiAOOfL6kxTBn2L86joHmB2EMMA9oSEiQpv1Vkh00hKR32MVx';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout
        label='Pay Now'
        name='A trends'
        billingAddress
        shippingAddress
        image=''
        description={`Your total is$${price}`}
        amount={priceForStripe}
        token={onToken}
        stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;