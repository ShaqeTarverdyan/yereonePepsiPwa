import React from 'react';
import Feature from './feature';

const data = [
    {
        id: 1,
        title: 'FREE SHIPPING',
        text: 'Loream ipsum dolor sit amet dolor. ',
        icon: 'iconTruck'
    },
    {
        id: 2,
        title: 'MONEY BACK',
        text: 'Loream ipsum dolor sit amet dolor. ',
        icon: 'iconPocket'
    },
    {
        id: 3,
        title: 'CUSTOMER SUPPORT',
        text: 'Loream ipsum dolor sit amet dolor. ',
        icon: 'iconSetting'
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