import { useDispatch, useSelector } from 'react-redux';
import classes from './Admin.module.css';
import { useEffect, useState } from 'react';
import { addProductAdmin, getProductAdmin } from '../../redux/productSlice';
import ProductCard from '../../components/ProductCard';
import Button from '../../components/Button';
import { openModalFunc } from '../../redux/generalSlice';
import Modal from '../../components/Modal';
import Input from '../../components/Input';

const Admin = () => {
  const dispatch = useDispatch();
  const { adminProducts } = useSelector((state) => state.products);
  const { openModal } = useSelector((state) => state.general);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    stock: 'Stok Yok',
    category: '',
    rating: '',
    images: [],
  });

  useEffect(() => {
    dispatch(getProductAdmin());
  }, [dispatch]);

  const addProduct = () => {
    dispatch(openModalFunc());
  };

  const productHandle = (e) => {
    if (e.target.name == 'images') {
      const files = Array.from(e.target.files);

      const imagesArray = [];

      files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            imagesArray.push(reader.result);
            setData((prev) => ({ ...prev, images: imagesArray }));
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const modalAddFunc = () => {
    dispatch(addProductAdmin(data));
    dispatch(openModalFunc());
  };

  const content = (
    <div>
      <Input
        onChange={productHandle}
        name={'name'}
        id={''}
        placeholder={'Ürün Adı'}
        type={'text'}
        value={data.name}
      />
      <Input
        onChange={productHandle}
        name={'description'}
        id={''}
        placeholder={'Açıklama'}
        type={'text'}
        value={data.description}
      />
      <Input
        onChange={productHandle}
        name={'price'}
        id={''}
        placeholder={'Fiyat'}
        type={'number'}
        value={data.price}
      />
      <Input
        onChange={productHandle}
        name={'stock'}
        id={''}
        placeholder={'Stok'}
        type={'number'}
        value={data.stock}
      />
      <Input
        onChange={productHandle}
        name={'rating'}
        id={''}
        placeholder={'Rating'}
        type={'number'}
        value={data.rating}
      />
      <Input
        onChange={productHandle}
        name={'category'}
        id={''}
        placeholder={'Kategori'}
        type={'text'}
        value={data.category}
      />
      <Input onChange={productHandle} name={'images'} id={''} type={'file'} />
    </div>
  );

  console.log(adminProducts, 'adminProducts');
  return (
    <div className={classes.admin__page}>
      <Button text={'Ürün Ekle'} onClick={addProduct} />
      {adminProducts?.products && (
        <div className={classes.admin__product}>
          {adminProducts?.products?.map((product, i) => (
            <ProductCard edit={true} product={product} key={i} />
          ))}
        </div>
      )}
      {openModal && (
        <Modal
          title={'ÜRÜN EKLE'}
          content={content}
          btnName={'Ekle'}
          onClick={modalAddFunc}
        />
      )}
    </div>
  );
};

export default Admin;
