// src/layouts/PrivateLayout.jsx
// import Navbar from "./Navbar";
import Navbar from "../components/Navbar";

export default function PrivateLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
