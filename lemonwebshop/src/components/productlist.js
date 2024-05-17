import React, { useState, useEffect } from 'react';
import { useCart } from '../context/cartcontext';
import '../style/customstyle.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      console.log("API response:", data);

      // Giver forskellige priser til drinks, eftersom der ikke er noget at hente fra API'en
      const productsWithDetails = data.drinks.map((product, index) => ({
        ...product,
        price: generateRandomPrice(),
        description: generateRandomDescription(index)
      }));
      setProducts(productsWithDetails);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  //tilføjer til kurven den drink og som standard sætter den det til 1.
  const handleAddToCart = (product) => {
    const cartItem = {
      id: product.idDrink,
      image: product.strDrinkThumb,
      name: product.strDrink,
      price: product.price,
      quantity: 1
    };
    addToCart(cartItem);
  };

  const generateRandomPrice = () => {
    // Udvælger et random tal som er prisen på en drink.
    return Math.floor(Math.random() * 99) + 1;
  };

  const generateRandomDescription = (index) => {
    // 32 forskellige beskrivelse til 32 forskellige produkter.
    const descriptions = [
      "Refreshing and tangy lemon drink.",
      "Citrus-infused cocktail with a zesty twist.",
      "Lemon-flavored beverage perfect for any occasion.",
      "Delicious lemon concoction to tantalize your taste buds.",
      "Lemon-infused beverage with a burst of citrus flavor.",
      "Tangy lemon delight for a refreshing experience.",
      "Lemonade-inspired cocktail to quench your thirst.",
      "Zesty lemon concoction with a hint of sweetness.",
      "Lemon-flavored refresher to invigorate your senses.",
      "Citrusy lemon blend for a taste of summer.",
      "Lemon zest in every sip for a bright and vibrant drink.",
      "Sour lemon twist to awaken your taste buds.",
      "Lemon essence captured in a refreshing drink.",
      "Lemon-infused libation for a crisp and clean taste.",
      "Lemon-lime fusion for a balanced citrus experience.",
      "Lemonade-inspired cocktail with a tangy kick.",
      "Lemon essence with a hint of effervescence.",
      "Sour lemon cocktail with a refreshing finish.",
      "Lemon-lime concoction for a burst of citrus flavor.",
      "Citrusy lemon beverage with a touch of sweetness.",
      "Tangy lemon libation to tantalize your taste buds.",
      "Lemon-inspired cocktail with a zesty twist.",
      "Lemon-infused beverage for a bright and sunny day.",
      "Citrusy lemon drink with a hint of fizz.",
      "Lemonade-inspired concoction with a refreshing finish.",
      "Zesty lemon cocktail to awaken your senses.",
      "Tangy lemon blend with a touch of sweetness.",
      "Citrusy lemon libation for a burst of flavor.",
      "Lemon-infused delight with a refreshing kick.",
      "Sour lemon concoction with a bright and lively taste.",
      "Lemon-inspired refresher with a crisp finish.",
      "Citrusy lemon beverage to elevate your mood."
    ];

  // retunere beskrivelser baseret på index'et
    return descriptions[index % descriptions.length];
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Fejl: {error}</p>;
  }

  if (products && products.length > 0) {
    return (
      <div className="row row-cols-1 row-cols-md-4 g-4 mt-4 ms-3 me-3">
        {products.map(product => (
          <div key={product.idDrink} className="col">
            <div className="card">
              <img className="w-full h-[500px] object-cover rounded" src={product.strDrinkThumb} alt={product.strDrink} />
              <div className="card-body">
                <h4 className="card-title text-center fw-bold">{product.strDrink}</h4>
                <p className="card-text text-center">{product.description}</p>
                <p className="card-text text-center fw-bold">Pris: {product.price},-</p>
                <div className="text-center">
                  <button onClick={() => handleAddToCart(product)} className="btn btn-lemon ps-3 pe-3 pt-2 pb-2 fs-5 fw-bold text-dark">Tilføj til kurv</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return <p>Der er ingen produkter tilgængelig</p>;
  }
};

export default ProductList;






