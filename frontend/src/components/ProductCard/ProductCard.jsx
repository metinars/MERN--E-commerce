import { useNavigate } from 'react-router-dom';
import classes from './ProductCard.module.css';
import Slider from 'react-slick';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const ProductCard = ({ product, edit }) => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div
      onClick={() => navigate(`/product/${product?._id}`)}
      className={classes.card}
    >
      <Slider {...settings}>
        {product?.images?.map((image, i) => (
          <img key={i} src={image.url} alt="" />
        ))}
      </Slider>
      <div className={classes.product__card__name}>{product?.name}</div>
      <div className={classes.product__card__price}>{product?.price}</div>
      {edit && (
        <div className={classes.admin__handler}>
          <FaEdit />
          <MdDelete />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
