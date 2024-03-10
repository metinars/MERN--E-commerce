import classes from './ProductCard.module.css';
import Slider from 'react-slick';

const ProductCard = ({ product }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className={classes.card}>
      <Slider {...settings}>
        {product?.images?.map((image, i) => (
          <img key={i} src={image.url} alt="" />
        ))}
      </Slider>
    </div>
  );
};

export default ProductCard;
