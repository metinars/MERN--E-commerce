import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../components/Input';
import Button from '../../components/Button';
import classes from './ForgotPassword.module.css';
import { forgotPassword } from '../../redux/userSlice';

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.user);

  const forgotPassHandler = () => {
    let res = dispatch(forgotPassword(email));

    return res;
  };

  return (
    <div className={classes.forgot__page}>
      <div className={classes.container}>
        <div className={classes.forgot__text}>Şifremi Unuttum</div>
        <Input
          placeholder={'Email'}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          name={'email'}
          id={''}
          type={'text'}
        />
        {!success ? (
          <Button text={'Onayla'} onClick={forgotPassHandler} />
        ) : (
          'Mailinizi Kontrol Edin'
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
