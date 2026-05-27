
import AuthProvider from "../Context/AuthContext";
import { ProductProvider } from "./ProductContext";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";

const ContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default ContextProvider;