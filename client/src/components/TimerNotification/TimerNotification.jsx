import React, { useState, useEffect } from 'react';
import './Timer.css'

const TimerNotification = ({ text, func, id, setState,filteredPostsList,setFilteredPostsLists }) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (timeLeft <= 0 && isVisible) {
      func(id);
      setIsVisible(false);
      setState(true)
      setFilteredPostsLists(filteredPostsList.filter(post => post.id !== id))
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
    setIsVisible(false);
    setState(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className='notification'>
      <div className="notification__text">{text}: {timeLeft} сек.</div>
      <button
        onClick={handleCancel}
        className='notification__button'
      >
        Отменить
      </button>
    </div>
  );
};



export default TimerNotification;