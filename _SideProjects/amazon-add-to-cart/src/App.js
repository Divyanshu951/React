import { useState } from "react";

const items = [
  {
    id: 1,
    name: "Portronics 35W Adapto 35G Type C PD Fast Charging Adaptor,PPS Support,GaN Technology, iPhone",
    price: 111.6,
    image:
      "https://m.media-amazon.com/images/I/41KkmvDScwL._SY300_SX300_QL70_FMwebp_.jpg",
    cart: false,
  },

  {
    id: 2,
    name: "Lenovo LOQ 2024 Intel Core i5-12450HX 15.6 (39.6cm) 144Hz 300Nits FHD IPS Gaming Laptop (24GB/512GB SSD/Win 11/NVIDIA RTX 3050 6GB Graphics/1Yr ADP Free/MSO 21/3 Mon Game Pass/Grey/2.4Kg), 83GS0098IN",
    price: 256.4,
    image:
      "https://m.media-amazon.com/images/I/51+U6oOCx4L._SY300_SX300_QL70_FMwebp_.jpg",
    cart: false,
  },

  {
    id: 3,
    name: "Lenovo 130 Wireless Compact Mouse, 1K DPI Optical sensor, 2.4GHz Wireless NanoUSB, 10m range, 3button(left,right,scroll) upto 3M left/right clicks, 10 month battery, Ambidextrous, Ergonomic GY51C12380",
    price: 569.4,
    image:
      "https://m.media-amazon.com/images/I/3189oRC5hnL._SY300_SX300_QL70_FMwebp_.jpg",
    cart: false,
  },

  {
    id: 4,
    name: "Optimum Nutrition (ON) Micronized Creatine Powder - 250 Gram, 83 Serves, 3g of 100% Creatine Monohydrate per serve, Supports Athletic Performance & Power, Unflavored.",
    price: 870.4,
    image:
      "https://m.media-amazon.com/images/I/41BaEOs31RL._SY300_SX300_QL70_FMwebp_.jpg",
    cart: false,
  },

  {
    id: 5,
    name: "Samsung 8 kg, 5 star, Eco Bubble Technology, AI Control, Wi-Fi, Digital Inverter, Motor, Fully-Automatic Front Load Washing Machine (WW80T504DAX1TL, Hygiene Steam, Inox)",
    price: 2874.4,
    image:
      "https://m.media-amazon.com/images/I/41Nt02oU46L._SX342_SY445_QL70_FMwebp_.jpg",
    cart: false,
  },

  {
    id: 6,
    name: "Apple 2025 MacBook Air (13-inch, Apple M4 chip with 10-core CPU and 8-core GPU, 16GB Unified Memory, 256GB) -",
    price: 93900.9,
    image:
      "https://m.media-amazon.com/images/I/71CjP9jmqZL._AC_UY436_FMwebp_QL65_.jpg",
    cart: false,
  },
];

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  const total = cartItems.reduce((sum, i) => sum + i.price, 0);

  function handleAddToCart(id) {
    setCartItems((prev) => {
      const item = items.find((i) => i.id === id);
      if (prev.some((i) => i.id === id)) return prev;
      return [...prev, { ...item, cart: true }];
    });
  }

  function handleRemoveFromCart(id) {
    setCartItems(cartItems.filter((item) => item.id !== id));
  }

  function handleClearAllItems() {
    setCartItems([]);
  }

  return (
    <div>
      <ItemList items={items} onAddToCart={handleAddToCart} />
      <CartItems
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
        total={total}
        onClearAllItems={handleClearAllItems}
      />
    </div>
  );
}

function CartItems({ cartItems, onRemoveFromCart, total, onClearAllItems }) {
  return (
    <div style={{ display: "flex" }}>
      <div>
        <h1>Cart</h1>
        <h3>Total: {total.toFixed(2)}</h3>
        <button onClick={onClearAllItems}>Clear All</button>
      </div>

      {cartItems.map((item) => (
        <Item
          key={item.id}
          item={item}
          cart={true}
          onRemoveFromCart={onRemoveFromCart}
        />
      ))}
    </div>
  );
}

function ItemList({ items, onAddToCart }) {
  return (
    <div style={{ display: "flex" }}>
      {items.map((item) => (
        <Item key={item.id} item={item} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

function Item({ item, onAddToCart, onRemoveFromCart }) {
  return (
    <div>
      <img src={item.image} alt={item.image} />
      <p>{item.name}</p>
      <p>${item.price}</p>
      {item.cart ? (
        <button
          onClick={() => onRemoveFromCart(item.id)}
          className="amazon-add-to-cart-button"
        >
          Remove
        </button>
      ) : (
        <button
          onClick={() => onAddToCart(item.id)}
          className="amazon-add-to-cart-button"
        >
          Add to cart
        </button>
      )}
    </div>
  );
}
