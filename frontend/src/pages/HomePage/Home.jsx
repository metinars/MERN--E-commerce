import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/productSlice';
import ProductCard from '../../components/ProductCard';

import classes from './Home.module.css';
import bannerImage from '../../assets/banner.jpg';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(
      getProducts({
        rating: '',
        keyword: '',
        price: { min: 0, max: 30000 },
        category: '',
      })
    );
  }, [dispatch]);

  return (
    <>
      <div className={classes.banner}>
        <img src={bannerImage} alt="" />
      </div>
      {loading ? (
        'Loading..'
      ) : (
        <div>
          {products?.products && (
            <div className={classes.home__product}>
              {products?.products?.map((product, i) => (
                <ProductCard product={product} key={i} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
