import { useSelector } from 'react-redux';

import classes from './Profile.module.css';

const Profile = () => {
  const { user, isAuth } = useSelector((state) => state.user);

  console.log(user);
  return (
    <div className={classes.profile__page}>
      <div className={classes.user__details}>
        <div>
          <img src={user?.user?.avatar?.url} />
        </div>
        <div>
          <div>{user?.user?.name}</div>
          <div>{user?.user?.email}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
