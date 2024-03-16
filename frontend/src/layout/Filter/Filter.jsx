import classes from './Filter.module.css';

const Filter = ({ setPrice, setRating, setCategory }) => {
  const categoryList = [
    'Çanta',
    'Ayakkabı',
    'Bilgisayar',
    'Telefon',
    'Pantolon',
  ];
  const ratingList = [1, 2, 3, 4, 5];

  return (
    <div className={classes.filter}>
      <div>Filtreleme</div>
      <div className={classes.input__group}>
        <input
          onChange={(e) =>
            setPrice((prev) => ({ ...prev, min: e.target.value }))
          }
          className={classes.border}
          type="number"
          placeholder="Min"
        />
        <input
          onChange={(e) =>
            setPrice((prev) => ({ ...prev, max: e.target.value }))
          }
          className={classes.border}
          type="number"
          placeholder="Max"
        />
      </div>
      <div>
        <div className={classes.category__label}>Kategori</div>
        {categoryList.map((category, i) => (
          <div
            onClick={() => setCategory(category)}
            className={classes.category}
            key={i}
          >
            {category}
          </div>
        ))}
        <hr />
        <div className={classes.category__label}>Puanlama</div>
        {ratingList.map((rating, i) => (
          <div
            onClick={() => setRating(rating)}
            className={classes.rating}
            key={i}
          >
            {rating}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
