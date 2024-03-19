import classes from './Input.module.css';

const Input = ({ placeholder, value, type, id, name, onChange }) => {
  return (
    <input
      className={classes.input__container}
      placeholder={placeholder}
      value={value}
      type={type}
      id={id}
      name={name}
      onChange={onChange}
    />
  );
};

export default Input;
