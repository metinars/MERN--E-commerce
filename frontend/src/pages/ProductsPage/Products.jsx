import { useDispatch, useSelector } from 'react-redux';
import Filter from '../../layout/Filter';
import { useEffect, useState } from 'react';
import { getProducts } from '../../redux/productSlice';
import ProductCard from '../../components/ProductCard';

import classes from './Products.module.css';

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { keyword } = useSelector((state) => state.general);
  const [price, setPrice] = useState({ min: 0, max: 30000 });
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState('');

  useEffect(() => {
    dispatch(
      getProducts({
        keyword,
        price,
        rating,
        category,
      })
    );
  }, [dispatch, keyword, price, rating, category]);

  return (
    <div>
      <div className={classes.products__container}>
        <Filter
          setPrice={setPrice}
          setRating={setRating}
          setCategory={setCategory}
        />
        <div>
          {loading ? (
            'Loading..'
          ) : (
            <div>
              {products?.products && (
                <div className={classes.products}>
                  {products?.products?.map((product, i) => (
                    <ProductCard product={product} key={i} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div>Pagination</div>
    </div>
  );
};

export default Products;
