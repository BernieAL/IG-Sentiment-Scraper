import React from 'react';
import { Link } from 'react-router-dom';

function ProfileItems(props) {
  return (
    <>
      <li className='profile__item'>
        <Link className='profile__items__link' to={`/analysis/${props.title}`}>
          <figure className='profile__items__pic-wrap' data-category={props.label}>
            <img
              className='profile__items__img'
              alt=''
              src={props.src}
            />
          </figure>
          <div className='profile__items__info'>
            <h5 className='profile__items__text'>{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}
export default ProfileItems;