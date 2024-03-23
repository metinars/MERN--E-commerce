import { useSelector } from 'react-redux';

import classes from './Profile.module.css';
import Button from '../../components/Button';

const Profile = () => {
  const { user, isAuth } = useSelector((state) => state.user);

  return (
    <div className={classes.profile__page}>
      <div className={classes.user__details}>
        <div>
          <img src={user?.user?.avatar?.url} />
        </div>
        <div className={classes.user__info}>
          <div className={classes.name}>{user?.user?.name}</div>
          <div className={classes.email}>{user?.user?.email}</div>
          <Button text={'Profili Güncelle'} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
