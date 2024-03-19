import { useDispatch, useSelector } from 'react-redux';
import Filter from '../../layout/Filter';
import { useEffect, useState } from 'react';
import { getProducts } from '../../redux/productSlice';
import ProductCard from '../../components/ProductCard';
import ReactPaginate from 'react-paginate';

import classes from './Products.module.css';

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { keyword } = useSelector((state) => state.general);
  const [price, setPrice] = useState({ min: 0, max: 30000 });
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState('');
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + 3;
  const currentItems = products?.products?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products?.products?.length / 3);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 3) % products?.products?.length;

    setItemOffset(newOffset);
  };

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
    <div className={classes.products__page}>
      <div className={classes.products__filter__container}>
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
                  {currentItems?.map((product, i) => (
                    <ProductCard product={product} key={i} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className={classes.paginate}>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default Products;
