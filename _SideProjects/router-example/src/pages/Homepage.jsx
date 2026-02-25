import { Link } from "react-router";

function Homepage() {
  return (
    <>
      <h1>Homepage</h1>
      <Link to="pricing">Pricing</Link> / <Link to="login">Login</Link>
    </>
  );
}

export default Homepage;
