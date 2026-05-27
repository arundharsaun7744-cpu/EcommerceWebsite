import React from "react";
import "../styles/productbar.css";

// Assuming these paths are correct
import img1 from "../assets/am0.webp";
import img2 from "../assets/am1.png";
import img3 from "../assets/am2.png";
import img4 from "../assets/am4.webp";
import img5 from "../assets/am5.webp";
import img6 from "../assets/am6.webp";
import img7 from "../assets/am8.jpg";

const products = [
  { name: "Dress", img: img2 },
  { name: "Grocery", img: img7 },
  { name: "Bookings", img: img6 },
  { name: "Electronics", img: img3 },
  { name: "Mobile Phones", img: img5 },
  { name: "Furniture", img: img4 },
  { name: "Grocery ", img: img7 },
  { name: "Dress 2", img: img2 },
  { name: "Toys", img: img1 },
];

const ProductBar = () => {
  return (
    <div
    className="class_products_list"
      style={{
        display: "flex",
        gap: "20px",
        overflowX: "auto",
        padding: "20px",
        // CSS to hide scrollbar
        scrollbarWidth: "none", // For Firefox
        msOverflowStyle: "none", // For IE and Edge
        textAlign: "center",
        // *** KEY FOR SCROLLING RTL ***
        direction: "rtl",
      }}
    >
      {products.map((item, index) => (
          <div
            className="product_item"
            key={index}
            style={{
              flexShrink: 0,
              width: item.name === "Mobile Phones" ? "400px" : "150px",
              direction: "ltr",
              textAlign: "center",
            }}
          >
            
            <img
              src={item.img}
              alt={item.name}
              style={{
                width: "100%",
                height: item.name === "Mobile Phones" ? "180px" : "150px",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
            <p>{item.name}</p>
          </div>
      
      ))}
    </div>
  );
};

export default ProductBar;
