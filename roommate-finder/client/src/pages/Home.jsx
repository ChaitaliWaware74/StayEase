// pages/Home.jsx
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import { FiMapPin, FiDollarSign, FiHome, FiUsers, FiSearch } from "react-icons/fi";
import "../styles/main.css";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    location: "",
    rent: "",
    genderPreference: ""
  });

  const fetchListings = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await API.get(`/listings?${query}`);
      setListings(res.data);
    } catch (err) {
      console.error("Error fetching listings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Find Your Perfect Spcae</h1>
        <p>Discover comfortable living spaces</p>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <div className="filter-wrapper">
          <div className="filter-input">
            <FiMapPin className="input-icon" />
            <input
              placeholder="Search by location..."
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            />
          </div>

          <div className="filter-input">
            <FiDollarSign className="input-icon" />
            <input
              type="number"
              placeholder="Max rent"
              onChange={(e) => setFilters({ ...filters, rent: e.target.value })}
            />
          </div>

          <div className="filter-input">
            <FiUsers className="input-icon" />
            <select onChange={(e) => setFilters({ ...filters, genderPreference: e.target.value })}>
              <option value="">Any Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <button onClick={fetchListings} className="search-btn">
            <FiSearch /> Search
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="results-section">
        <h2>
          {listings.length} {listings.length === 1 ? 'Property Found' : 'Properties Found'}
        </h2>

        {loading ? (
          <div className="loading-spinner">Loading amazing properties...</div>
        ) : (
          // pages/Home.jsx - Updated image section
// Replace just the property-card section with this:

<div className="properties-grid">
  {listings.map((listing) => (
    <div
      key={listing._id}
      className="property-card"
      onClick={() => navigate(`/listing/${listing._id}`)}
    >
      {listing.images?.length > 0 && (
        <div className="property-image">
          <img 
            src={`http://localhost:5000/${listing.images[0]}`} 
            alt={listing.title}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
            }}
          />
          <div className="price-tag">₹{listing.rent?.toLocaleString()}/mo</div>
        </div>
      )}
      <div className="property-info">
        <h3>{listing.title}</h3>
        <div className="property-details">
          <span><FiMapPin /> {listing.location}</span>
          <span><FiHome /> {listing.roomType || "Room"}</span>
          <span><FiUsers /> {listing.genderPreference || "Any"}</span>
        </div>
        {listing.description && (
          <p className="property-description">
            {listing.description.length > 100
              ? listing.description.substring(0, 100) + "..."
              : listing.description}
          </p>
        )}
      </div>
    </div>
  ))}
</div>
        )}
      </div>
    </div>
  );
}