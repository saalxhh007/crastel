import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);
import { toast } from "react-toastify";

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [token, setToken] = useState("");
  const url = "http://localhost:4000";

  const getProductById = (category, id) => {
    return products.find(
      (product) => product._id === id && product.categorie === category
    );
  };

  const addToCart = async (itemCategory, itemId) => {
    try {
      if (token) {
        const response = await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );

        setCartItems((prev) => {
          const categoryItems = prev[itemCategory] || {};
          return {
            ...prev,
            [itemCategory]: {
              ...categoryItems,
              [itemId]: (categoryItems[itemId] || 0) + 1,
            },
          };
        });
      } else {
        toast.error("Log/Sign Before Adding");
      }
    } catch (error) {
      toast.error("Error adding to cart");
    }
  };

  const removeFromCart = async (itemCategory, itemId) => {
    try {
      if (token) {
        const response = await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        );
      }
      setCartItems((prev) => {
        const categoryItems = { ...prev[itemCategory] };

        if (categoryItems[itemId] > 1) {
          categoryItems[itemId] -= 1;
        } else {
          delete categoryItems[itemId];
        }

        if (Object.keys(categoryItems).length === 0) {
          const { [itemCategory]: _, ...remainingItems } = prev;
          return remainingItems;
        } else {
          return {
            ...prev,
            [itemCategory]: categoryItems,
          };
        }
      });
    } catch (error) {
      toast.error("Error Removing From Cart");
    }
  };

  const addToFavorite = async (itemCategory, itemId) => {
    try {
      const response = await axios.post(
        url + "/api/favorite/add",
        { itemId },
        { headers: { token } }
      );

      setFavoriteItems((prev) => {
        const categoryItems = prev[itemCategory] || [];
        return {
          ...prev,
          [itemCategory]: [...categoryItems, itemId],
        };
      });
    } catch (error) {
      console.error("Error Adding To Favorite", error);
    }
  };

  const removeFromFavorite = async (itemCategory, itemId) => {
    try {
      const response = await axios.post(
        url + "/api/favorite/remove",
        { itemId },
        { headers: { token } }
      );

      setFavoriteItems((prev) => {
        const categoryItems = prev[itemCategory] || [];
        const updatedCategoryItems = categoryItems.filter(
          (id) => id !== itemId
        );

        if (updatedCategoryItems === 0) {
          const { [itemCategory]: _, ...remainingItems } = prev;
          return remainingItems;
        } else {
          return { ...prev, [itemCategory]: updatedCategoryItems };
        }
      });
    } catch (error) {
      console.error("Error Removing From Favorite", error);
    }
  };

  const fetchFavorite = async () => {
    try {
      const response = await axios.get(url + "/api/favorite/list", {
        headers: { token },
      });
      setFavoriteItems(response.data.favoriteData);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalAmount = () => {
    let totalAmount = 0;

    Object.keys(cartItems).forEach((category) => {
      Object.entries(cartItems[category]).forEach(([itemId, quantity]) => {
        const product = getProductById(category, itemId);
        if (product) {
          totalAmount += product.price * quantity; // Assuming `product.price` is the price of the product
        }
      });
    });

    return totalAmount;
  };

  const fetchProductList = async () => {
    try {
      const response = await axios.get(url + "/api/product/list");
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    fetchProductList();
  }, []);

  useEffect(() => {
    getTotalAmount();
  }, []);

  useEffect(() => {
    if (token) {
      fetchFavorite();
    }
  }, [token]);
  useEffect(() => {}, [favoriteItems]);
  const contextValue = {
    products,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    favoriteItems,
    setFavoriteItems,
    addToFavorite,
    removeFromFavorite,
    getTotalAmount,
    token,
    setToken,
    url,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
