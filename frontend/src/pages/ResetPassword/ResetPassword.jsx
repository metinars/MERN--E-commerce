import classes from './ResetPassword.module.css';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/userSlice';

const ResetPassword = () => {
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const token = useParams();
  const { success } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const forgotPassHandler = () => {
    let res = dispatch(resetPassword({ token, password }));

    if (success) {
      navigate('/auth');
    }
  };

  console.log(success);

  return (
    <div className={classes.reset__page}>
      <div className={classes.container}>
        <div className={classes.reset__text}>Yeni Şifre Oluştur</div>
        <Input
          placeholder={'Yeni Şifre'}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          name={'password'}
          id={''}
          type={'password'}
        />
        <Button
          text={!success ? 'Onayla' : 'Giriş Yap'}
          onClick={forgotPassHandler}
        />
      </div>
    </div>
  );
};

export default ResetPassword;
