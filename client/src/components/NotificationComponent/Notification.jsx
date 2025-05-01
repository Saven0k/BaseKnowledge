import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TimerNotification = ({ text, func, id, setState, filteredPostsList, setFilteredPostsLists}) => {
    const [timeLeft, setTimeLeft] = useState(10);
    const [isVisible, setIsVisible] = useState(true);
    

    useEffect(() => {
        if (timeLeft <= 0 && isVisible) {
            func(id);
            setFilteredPostsLists(filteredPostsList.filter(item => item.id !== id))
            setState(false)
            setIsVisible(false);
            return;
        }

        const timer = setTimeout(() => {
            if (isVisible) {
                setTimeLeft(timeLeft - 1);
            }
        }, 1000);


        return () => clearTimeout(timer);
    }, [timeLeft, isVisible, func]);

    const handleCancel = () => {
        setState(false)
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '15px',
            borderRadius: '0 0 5px 0',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            minWidth: '250px',
            borderRight: '1px solid #388E3C',
            borderBottom: '1px solid #388E3C'
        }}>
            <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>{text}</div>
            <div style={{ marginBottom: '10px' }}>{timeLeft} сек.</div>
            <button
                onClick={handleCancel}
                style={{
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    padding: '8px 15px',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    alignSelf: 'flex-end'
                }}
            >
                Отменить
            </button>
        </div>
    );
};



export default TimerNotification;