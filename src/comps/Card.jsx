import React, { useState } from 'react';
import classes from './css-modules/Card.module.css';

const Popup = ({ title, text, onClose }) => {
    return (
        <div className={classes.popupOverlay} onClick={onClose}>
            <div className={classes.popup} onClick={(e) => e.stopPropagation()}>
                <div className={classes.popup__row}>
                    <h1 className={classes.header}>{title}</h1>
                    <div className={classes.close} onClick={onClose}><ion-icon name="close-outline"></ion-icon></div>
                </div>
                <p className={classes.description}>{text}</p>
            </div>
        </div>
    );
};

const Card = ({ title, text, tags, autor, img, img_2x, date, views }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    if (!isPopupOpen == true) {
        document.body.style.overflow = 'auto';
    }
    else {
        document.body.style.overflow = 'hidden';
    }

    return (
        <div>
            <div className={classes.card} onClick={openPopup}>
                <img srcSet={`${img} 1x, ${img_2x} 2x`} src={img} alt="#" className={classes.image} />
                <p className={classes.category}>{tags}</p>
                <h1 className={classes.header}>{title}</h1>
                <div className={classes.stats}>
                    <p className={classes.author}>{autor}</p>
                    <p className={classes.date}>{date}</p>
                    <p className={classes.views}>{views}</p>
                </div>
                <p className={classes.description}>{text}</p>
            </div>

            {isPopupOpen && <Popup title={title} text={text} onClose={closePopup} />}
        </div>
    );
};

export default Card;
