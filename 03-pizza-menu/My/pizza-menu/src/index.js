import React from "react";
import ReactDom from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      {/* Comments */}
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  // const style = { color: "red", fontSize: "22px", TextTransform: "uppercase" };
  return (
    // <h1 style={{ color: "red", fontSize: "48px" }}>Fast React Pizza Co.</h1>
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  return (
    <main className="menu">
      <h2>Our menu</h2>
      <>
        <p>
          Authantic italian cuisine. 6 creative dishes to choose from. All from
          our stone oven, all organic, all delicious.
        </p>

        {pizzas.length > 0 ? (
          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        ) : (
          <p>We're still working on our meny. Please come back later</p>
        )}
      </>

      {/* <Pizza
        name="Focaccia"
        ingredients="Bread with italian olive oil and rosemary"
        photoName="pizzas/focaccia.jpg"
        price={6}
      /> */}
    </main>
  );
}

function Pizza({ pizzaObj }) {
  // if (props.pizzaObj.soldOut) return null;

  return (
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{!pizzaObj.soldOut ? pizzaObj.price : "SOLD OUT"}</span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closedhour = 22;
  const isOpen = hour >= openHour && hour <= closedhour;

  console.log(isOpen);

  // if (hour >= openHour && hour <= closedhour) alert("We are still open");
  // else alert("Sorry we are closed");

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closedhour={closedhour} />
      ) : (
        <p>
          We are Closed ;). We are happy to welcome you between {openHour}:00 -{" "}
          {closedhour}:00
        </p>
      )}
    </footer>
  );
}

function Order({ closedhour }) {
  return (
    <div className="order">
      <p>We're open until {closedhour}:00. Come visit us or order online</p>
      <button className="btn">Order</button>
    </div>
  );
}

// React V18
const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ❌ Older React (<18) used:
// ReactDOM.render(<App />, document.getElementById("root"));
