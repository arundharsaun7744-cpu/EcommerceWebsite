import { createContext, useState } from "react";
import ToysProducts from "../data/toys.js";
import mobile from "../data/Productdata.js";
import HomeElectronics from "../data/HomeElectonics.js";
import Fashion from "../data/grocerry.js";
import TvAppliances from "../data/TvAppliances";
import HomeFurniture from "../data/furniture.js";

export const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products] = useState({
    phone: mobile,
    tvAppliances: TvAppliances,
    toys: ToysProducts,
    Fashion: Fashion,
    homeElectronics: HomeElectronics,
    homeFurniture: HomeFurniture
  });

  const getProductById = (id) => {
    for (const category in products) {
      const item = products[category].find((p) => String(p.id) === String(id));
      if (item) return item;
    }
    return null;
  };

  return (
    <ProductContext.Provider value={{ products, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
