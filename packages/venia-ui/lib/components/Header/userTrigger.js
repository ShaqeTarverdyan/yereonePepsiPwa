import React from 'react';
import defaultClasses from './header.css'
import classify from '../../classify';


const UserTrigger = props => {
    const { startRegister, classes } = props;
    return (
        <button onClick={startRegister}>
            <span className={classes.iconUser}/>
        </button>
    );
}
export default classify(defaultClasses)(UserTrigger);