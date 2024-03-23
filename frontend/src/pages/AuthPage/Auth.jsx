import { useEffect, useState } from 'react';

import classes from './Auth.module.css';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [signUp, setSignUp] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuth } = useSelector((state) => state.user);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
  });
  const [previev, setPreviev] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx9tjaExsY-srL4VsHNE_OKGVCJ-eIFNBktw&usqp=CAU'
  );

  const registerHandler = () => {
    dispatch(register(data));
  };

  const loginHandler = () => {
    dispatch(login(data));
  };

  const handleChange = (e) => {
    if (e.target.name == 'avatar') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setData((prev) => ({ ...prev, avatar: reader.result }));
          setPreviev(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth]);

  console.log(isAuth);

  return (
    <div className={classes.auth__container}>
      <div className={classes.auth__form}>
        <div className={classes.auth__check}>
          {signUp ? 'Kayıt Ol' : 'Giriş Yap'}
        </div>
        {signUp && (
          <Input
            onChange={handleChange}
            value={data.name}
            type={'text'}
            name={'name'}
            id={'name'}
            placeholder={'Ad Soyad'}
          />
        )}
        <Input
          value={data.email}
          onChange={handleChange}
          type={'text'}
          name={'email'}
          id={'email'}
          placeholder={'Email'}
        />
        <Input
          value={data.password}
          onChange={handleChange}
          type={'password'}
          name={'password'}
          id={'password'}
          placeholder={'Şifre'}
        />
        {signUp && (
          <div className={classes.added__avatar}>
            <img src={previev} />
            <Input
              onChange={handleChange}
              type={'file'}
              name={'avatar'}
              id={'avatar'}
              placeholder={'avatar'}
              classes={{ cursor: 'pointer' }}
            />
          </div>
        )}
        <div
          onClick={() => setSignUp(!signUp)}
          className={classes.auth__change__status}
        >
          {signUp ? 'Hesabın Varsa Giriş Yap' : 'Yeni Hesap Oluştur'}
        </div>
        <div className={classes.auth__action}>
          <Button
            text={signUp ? 'Kayıt Ol' : 'Giriş Yap'}
            onClick={signUp ? registerHandler : loginHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
