import React, { useState } from 'react';
import defaultClasses from './account.css';
import { mergeClasses } from '../../classify';
import SignIn from '../SignIn';
import CreateAccount from '../CreateAccount';

const Register = props => {
    const [activeTab, setActiveTab] = useState('signIn');
    const { isOpen } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    const rootClass = isOpen ? classes.root_open : classes.root;
    const title = activeTab === 'signIn' ? 'Sign in to your account' : 'Create new account';

    const handleSignInTab = () => {
        setActiveTab('signIn');
    }
    const handleRegisterTab = () => {
        setActiveTab('register');
    }
    const visibleComponent = activeTab === 'signIn' ? <SignIn /> : <CreateAccount />
    return (
        <div className={rootClass}>
            <div className={classes.buttonGroup}>
                <button 
                    className={classes[activeTab === 'signIn' ? 'commonButton' : 'activeButton']} 
                    onClick={handleSignInTab}
                >
                    Sign In
                </button>
                <button 
                    className={classes[activeTab === 'register' ? 'commonButton' : 'activeButton']} 
                    onClick={handleRegisterTab}
                >
                    Register
                </button>
            </div>
            <h1>{title}</h1>
            <div className={classes.content}>
                {visibleComponent}
            </div>
        </div>
    );
}
export default Register;