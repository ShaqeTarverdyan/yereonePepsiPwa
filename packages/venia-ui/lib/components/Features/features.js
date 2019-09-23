import React from 'react';
import Feature from './feature';
import deliveryTruck from './images/deliveryTruck.png';
import moneyBag from './images/moneyBag.png';
import support from './images/support.png';

const data = [
    {
        id: 1,
        title: 'FREE SHIPPING',
        text: 'Loream ipsum dolor sit amet dolor. ',
        image: deliveryTruck
    },
    {
        id: 2,
        title: 'MONEY BACK',
        text: 'Loream ipsum dolor sit amet dolor. ',
        image: moneyBag
    },
    {
        id: 3,
        title: 'CUSTOMER SUPPORT',
        text: 'Loream ipsum dolor sit amet dolor. ',
        image: support
    }
]

const Features = () => {
    return (
        data.map(feature =>
            <Feature 
                feature={feature} 
                key={feature.id}
            />
        )
    );
}
export default Features;