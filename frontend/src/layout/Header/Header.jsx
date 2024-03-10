import { SlBasket } from 'react-icons/sl';

import classes from './Header.module.css';
import { useState } from 'react';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
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

  return (
    <div className={classes.header}>
      <div className={classes.logo}>e.com</div>
      <div className={classes.header__actions}>
        <div className={classes.search}>
          <input type="text" placeholder="Arama yap" />
          <button className={classes.search__button}>Ara</button>
        </div>
        <div className={classes.user__profile}>
          <img
            onClick={() => setOpenMenu(!openMenu)}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx9tjaExsY-srL4VsHNE_OKGVCJ-eIFNBktw&usqp=CAU"
          />
          {openMenu && (
            <div className={classes.user__profile__card}>
              {menuItems.map((item, i) => (
                <div className={classes.user__profile__item} key={i}>
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
