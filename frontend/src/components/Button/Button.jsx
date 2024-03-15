import classes from './Button.module.css';

const Button = ({ text, onClick }) => {
  return (
    <button className={classes.button} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
