import { IoIosCloseCircle } from 'react-icons/io';

import classes from './Modal.module.css';
import { useDispatch } from 'react-redux';
import { openModalFunc } from '../../redux/generalSlice';
import Button from '../Button';

const Modal = ({ title, content, onClick, btnName }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={classes.backdrop}
        onClick={() => dispatch(openModalFunc())}
      />
      <div className={classes.container}>
        <div className={classes.modal}>
          <div className={classes.modal__header}>
            <div className={classes.title}>{title}</div>
            <div onClick={() => dispatch(openModalFunc())}>
              <IoIosCloseCircle />
            </div>
          </div>
          <div className={classes.modal__content}> {content}</div>
          <Button text={btnName} onClick={onClick} />
        </div>
      </div>
    </>
  );
};

export default Modal;
