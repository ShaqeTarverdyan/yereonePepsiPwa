import React from 'react';
import user from './user.png';
import Image from '../Image';


const UserTrigger = () => {
    return (
        <button>
            <Image src={user} style={{width:'25px', height:'25px'}}/>
        </button>
    );
}
export default UserTrigger;