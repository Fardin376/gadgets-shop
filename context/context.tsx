'use client';

import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { CartProductType } from '@/app/product/[productId]/ProductDetailsComponent';
import { toast } from 'react-hot-toast';

interface GlobalStateContextProps {
  cartTotalQty: number;
  cartTotalAmount: number;
  setCartTotalQty: (cartTotalQty: number) => void;
  cartProducts: CartProductType[] | null;
  setCartProducts: (cartProducts: CartProductType[] | null) => void;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
  paymentIntent: string | null;
  handleSetPaymentIntent: (val: string | null) => void;
}

export const GlobalContext = createContext<
  GlobalStateContextProps | null | undefined
>(undefined);

export const useGlobalState = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    const cartItems: any = localStorage.getItem('gadgetsGalCartItems');
    const itemsAdded: CartProductType[] | null = JSON.parse(cartItems);

    const gadgetsGalPaymentIntent: any = localStorage.getItem(
      'gadgetsGalPaymentIntent'
    ); 

    const paymentIntent: string | null = JSON.parse(gadgetsGalPaymentIntent);

    setCartProducts(itemsAdded);

    setPaymentIntent(paymentIntent);
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;

            acc.total += itemTotal;
            acc.qty += item.quantity;

            return acc;
          },
          {
            total: 0,
            qty: 0,
          }
        );

        setCartTotalQty(qty);
        setCartTotalAmount(total);
      }
    };

    getTotals();
  }, [cartProducts]);

  const handleAddProductToCart = (product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart;

      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }

      localStorage.setItem('gadgetsGalCartItems', JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  const handleRemoveProductFromCart = (product: CartProductType) => {
    if (cartProducts) {
      const filteredProducts = cartProducts.filter((item) => {
        return item.id !== product.id;
      });

      setCartProducts(filteredProducts);
      toast.success('Product has been removed from cart');
      localStorage.setItem(
        'gadgetsGalCartItems',
        JSON.stringify(filteredProducts)
      );
    }
  };

  const handleCartQtyIncrease = (product: CartProductType) => {
    let updatedCart;

    if (product.quantity === 99) {
      return toast.error('You have added maximum items for this product');
    }

    if (cartProducts) {
      updatedCart = [...cartProducts];

      const existingIndex = cartProducts.findIndex((item) => {
        return item.id === product.id;
      });

      if (existingIndex > -1) {
        updatedCart[existingIndex].quantity =
          updatedCart[existingIndex].quantity + 1;
      }

      setCartProducts(updatedCart);
      localStorage.setItem('gadgetsGalCartItems', JSON.stringify(updatedCart));
    }
  };

  const handleCartQtyDecrease = (product: CartProductType) => {
    let updatedCart;

    if (product.quantity === 1) {
      return toast.error('You have added minimum items for this product');
    }

    if (cartProducts) {
      updatedCart = [...cartProducts];

      const existingIndex = cartProducts.findIndex((item) => {
        return item.id === product.id;
      });

      if (existingIndex > -1) {
        updatedCart[existingIndex].quantity =
          updatedCart[existingIndex].quantity - 1;
      }

      setCartProducts(updatedCart);
      localStorage.setItem('gadgetsGalCartItems', JSON.stringify(updatedCart));
    }
  };

  const handleClearCart = () => {
    setCartProducts(null);
    setCartTotalQty(0);
    localStorage.removeItem('gadgetsGalCartItems');
  };

  const handleSetPaymentIntent = (val: string | null) => {
    setPaymentIntent(val);

    localStorage.setItem('gadgetsGalPaymentIntent', JSON.stringify(val));
  };

  // Provide default values if theme or setTheme is undefined
  const contextValue: GlobalStateContextProps = {
    cartTotalAmount,
    cartTotalQty,
    setCartTotalQty,
    cartProducts,
    setCartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
    paymentIntent,
    handleSetPaymentIntent,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
