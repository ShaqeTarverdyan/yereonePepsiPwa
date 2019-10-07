import React, { useState } from 'react';
import defaultClasses from './Tab.css';
import { mergeClasses } from '../../classify';
import $ from "jquery";

const Tab = props => {
    const { data } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    const [ active, setActive ] = useState(0);
    const changeActive = (e) => {
        const active = $(e.target).data('index');
        setActive(active);
    }
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                {
                    data.map((tab, index) =>
                        <div  
                            key={index} 
                            className={index == active ? classes.activeTitle : classes.title}
                        >
                            <button onClick={changeActive} >
                                <span data-index={index}>{tab.title}</span>
                            </button>
                        </div>
                    )
                }
            </div>
            <div className={classes.body}>
                {
                    data.map((tab, index) =>
                        <div 
                            key={index} 
                            className={index == active ? classes.content + ' ' + classes.active : classes.content}
                        >
                            <div>{tab.content}</div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Tab;