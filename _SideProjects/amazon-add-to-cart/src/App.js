import { useState } from "react";
import PropTypes from "prop-types";

// const items = [
//   {
//     id: 1,
//     name: "Portronics 35W Adapto 35G Type C PD Fast Charging Adaptor,PPS Support,GaN Technology, iPhone",
//     price: 111.6,
//     image:
//       "https://m.media-amazon.com/images/I/41KkmvDScwL._SY300_SX300_QL70_FMwebp_.jpg",
//   },

//   {
//     id: 2,
//     name: "Lenovo LOQ 2024 Intel Core i5-12450HX 15.6 (39.6cm) 144Hz 300Nits FHD IPS Gaming Laptop (24GB/512GB SSD/Win 11/NVIDIA RTX 3050 6GB Graphics/1Yr ADP Free/MSO 21/3 Mon Game Pass/Grey/2.4Kg), 83GS0098IN",
//     price: 256.4,
//     image:
//       "https://m.media-amazon.com/images/I/51+U6oOCx4L._SY300_SX300_QL70_FMwebp_.jpg",
//   },

//   {
//     id: 3,
//     name: "Lenovo 130 Wireless Compact Mouse, 1K DPI Optical sensor, 2.4GHz Wireless NanoUSB, 10m range, 3button(left,right,scroll) upto 3M left/right clicks, 10 month battery, Ambidextrous, Ergonomic GY51C12380",
//     price: 569.4,
//     image:
//       "https://m.media-amazon.com/images/I/3189oRC5hnL._SY300_SX300_QL70_FMwebp_.jpg",
//   },
// ];

// export default function App() {
//   const [cartItems, setCartItems] = useState([]);

//   const total = cartItems.reduce((sum, i) => sum + i.price, 0);

//   function handleAddToCart(id) {
//     setCartItems((prev) => {
//       const item = items.find((i) => i.id === id);
//       if (prev.some((i) => i.id === id)) return prev;
//       return [...prev, { ...item, cart: true }];
//     });
//   }

//   function handleRemoveFromCart(id) {
//     setCartItems(cartItems.filter((item) => item.id !== id));
//   }

//   function handleClearAllItems() {
//     setCartItems([]);
//   }

//   return (
//     <div>
//       <ItemList items={items} onAddToCart={handleAddToCart} />
//       <CartItems
//         cartItems={cartItems}
//         onRemoveFromCart={handleRemoveFromCart}
//         total={total}
//         onClearAllItems={handleClearAllItems}
//       />
//     </div>
//   );
// }

// function CartItems({ cartItems, onRemoveFromCart, total, onClearAllItems }) {
//   return (
//     <div style={{ display: "flex" }}>
//       <div>
//         <h1>Cart</h1>
//         <h3>Total: {total.toFixed(2)}</h3>
//         <button onClick={onClearAllItems}>Clear All</button>
//       </div>

//       {cartItems.map((item) => (
//         <Item
//           key={item.id}
//           item={item}
//           cart={true}
//           onRemoveFromCart={onRemoveFromCart}
//         />
//       ))}
//     </div>
//   );
// }

// function ItemList({ items, onAddToCart }) {
//   return (
//     <div style={{ display: "flex" }}>
//       {items.map((item) => (
//         <Item key={item.id} item={item} onAddToCart={onAddToCart} />
//       ))}
//     </div>
//   );
// }

// function Item({ item, onAddToCart, onRemoveFromCart }) {
//   return (
//     <div>
//       <img src={item.image} alt={item.image} />
//       <p>{item.name}</p>
//       <p>${item.price}</p>
//       {item.cart ? (
//         <button
//           onClick={() => onRemoveFromCart(item.id)}
//           className="amazon-add-to-cart-button"
//         >
//           Remove
//         </button>
//       ) : (
//         <button
//           onClick={() => onAddToCart(item.id)}
//           className="amazon-add-to-cart-button"
//         >
//           Add to cart
//         </button>
//       )}
//     </div>
//   );
// }

const data = {
  pizzas: ["Margherita", "Pepperoni", "Veggie"],
  iceCream: ["Mango", "Vanilla", "Chocolate"],
};

export default function App() {
  const [type, setType] = useState("pizzas");

  const typeData = data[type];

  function handlePizzaSelection() {
    setType("pizzas");
  }

  function handleIceCreamSelection() {
    setType("iceCream");
  }

  return (
    <>
      {/* <button onClick={handlePizzaSelection}>Pizza</button>
      <button onClick={handleIceCreamSelection}>Ice Cream</button>
      <ul>
        {typeData.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul> */}
      <Component />
    </>
  );
}

function Component() {
  return (
    <>
      <Model>
        <Success />
      </Model>

      <Model>
        <Failure />
      </Model>
    </>
  );
}

function Success() {
  return <p>Success 🎉</p>;
}

function Failure() {
  return <p>Fail 💥</p>;
}

function Model({ children }) {
  return (
    <div
      style={{
        marginTop: "10px",
        height: "100px",
        width: "100px",
        border: "1px solid red",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
}

function StarRating({
  maxRating,
  defaultRating,
  color,
  size,
  messages,
  className,
  onSetRating,
}) {
  return <div>{maxRating}</div>;
}

StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.array,
  className: PropTypes.string,
  onSetRating: PropTypes.func,
};
