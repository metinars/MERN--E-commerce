import { SlBasket } from 'react-icons/sl';

import classes from './Header.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getKeyword } from '../../redux/generalSlice';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [keyword, setKeyword] = useState('');
  const { user, isAuth } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuItems = [
    {
      name: 'Profil',
      url: '/profile',
    },
    {
      name: 'Admin',
      url: '/admin',
    },
    {
      name: 'Çıkış',
      url: '/logout',
    },
  ];

  const keywordFunc = () => {
    dispatch(getKeyword(keyword));
    setKeyword('');
    navigate('./products');
  };

  return (
    <div className={classes.header}>
      <div className={classes.logo}>e.com</div>
      <div className={classes.header__actions}>
        <div className={classes.search}>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            type="text"
            placeholder="Arama yap"
          />
          <button onClick={keywordFunc} className={classes.search__button}>
            Ara
          </button>
        </div>
        <div className={classes.user__profile}>
          <img
            onClick={() => setOpenMenu(!openMenu)}
            src={
              user?.user
                ? user?.user?.avatar?.url
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx9tjaExsY-srL4VsHNE_OKGVCJ-eIFNBktw&usqp=CAU'
            }
            alt={`${user?.user ? user?.user?.name + 'avatar' : 'avatar'}`}
          />
          {openMenu && (
            <div className={classes.user__profile__card}>
              {menuItems.map((item, i) => (
                <div
                  onClick={() => (window.location = item.url)}
                  className={classes.user__profile__item}
                  key={i}
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={classes.basket}>
          <SlBasket className={classes.basket__icon} />
          <span>4</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
