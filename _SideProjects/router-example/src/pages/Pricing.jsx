import { Link, NavLink, Outlet } from "react-router";

function Pricing() {
  return (
    <>
      <h1>Pricing</h1>
      <NavLink to="montly">Monthly</NavLink> /{" "}
      <NavLink to="yearly">yearly</NavLink>
      <br />
      <Link to="/">Home</Link>
      <Outlet />
    </>
  );
}

export default Pricing;
