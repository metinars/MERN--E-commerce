import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetail } from '../../redux/productSlice';
import { useState } from 'react';

import classes from './Detail.module.css';
import Slider from 'react-slick';
import Button from '../../components/Button';

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(getProductDetail(id));
    }
  }, [dispatch, id]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const addBasket = () => {};

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increment = () => {
    if (quantity < product?.product?.stock) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <>
      {loading ? (
        'Loading..'
      ) : (
        <div className={classes.product__detail}>
          {product?.product && (
            <div className={classes.detail__slider}>
              <Slider {...settings}>
                {product?.product?.images?.map((image, i) => (
                  <img key={i} src={image.url} alt="" />
                ))}
              </Slider>
            </div>
          )}
          <div className={classes.detail__info}>
            <div className={classes.name}>{product?.product?.name}</div>
            <div className={classes.desc}>{product?.product?.description}</div>
            {product?.product?.stock > 0 ? (
              <div className={classes.stock}>
                Stok Sayısı: {product?.product?.stock}
              </div>
            ) : (
              <div className={classes.dont__stock}>Stok Yok</div>
            )}
            <div className={classes.cetagory__name}>
              Kategori: {product?.product?.category}
            </div>
            <div>Rating: {product?.product?.rating}</div>
            <div className={classes.basket__counter}>
              <div onClick={decrement} className={classes.minus__counter}>
                -
              </div>
              <div className={classes.result__counter}>{quantity}</div>
              <div onClick={increment} className={classes.plus__counter}>
                +
              </div>
            </div>
            <Button text={'Sepete Ekle'} onClick={addBasket} />
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
