import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddListing from "./pages/AddListing";
import EditListing from "./pages/EditListing";
import MyListings from "./pages/MyListings";
import ListingDetails from "./pages/ListingDetails";
import "./styles/main.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />  {/* 👈 ADD THIS */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<AddListing />} />
        <Route path="/edit/:id" element={<EditListing />} />
        <Route path="/my-posts" element={<MyListings />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;