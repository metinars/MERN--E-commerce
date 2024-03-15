import { useDispatch, useSelector } from 'react-redux';
import Filter from '../../layout/Filter';
import { useEffect } from 'react';
import { getProducts } from '../../redux/productSlice';
import ProductCard from '../../components/ProductCard';

import classes from './Products.module.css';

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <div>
      <div className={classes.products__container}>
        <Filter />
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
