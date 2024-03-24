import { useDispatch, useSelector } from 'react-redux';
import classes from './Cart.module.css';
import { removeFromCart } from '../../redux/cartSlice';

const Cart = () => {
  const { carts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const deleteItem = (id) => {
    dispatch(removeFromCart(id));
  };

  console.log(carts);
  return (
    <div className={classes.cart__page}>
      {carts?.length > 0 ? (
        <div>
          {carts?.map((cart, i) => (
            <div className={classes.product__cart} key={i}>
              <div className={classes.cart__img}>
                <img src={cart?.images?.url} alt="" />
              </div>
              <div className={classes.cart__info}>
                <div>{cart?.name}</div>
                <div>{cart?.price}₺</div>
              </div>
              <div
                onClick={() => deleteItem(cart?.id)}
                className={classes.remove__btn}
              >
                Sil
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Sepetinizde Ürün Bulunmamaktadır..</div>
      )}
    </div>
  );
};

export default Cart;
