import React from 'react';
import user from './user.png';
import Image from '../Image';


const UserTrigger = props => {
    const { startRegister } = props;
    return (
        <button onClick={startRegister}>
            <Image src={user} style={{ width: '25px', height: '25px' }} />
        </button>
    );
}
export default UserTrigger;