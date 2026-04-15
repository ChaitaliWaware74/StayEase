// pages/ListingDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { FiMapPin, FiDollarSign, FiHome, FiUsers, FiPhone, FiCheck, FiX, FiArrowLeft } from "react-icons/fi";
import "../styles/main.css";

export default function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await API.get(`/listings/${id}`);
        setListing(res.data);
      } catch (err) {
        console.error("Error fetching listing", err);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading property details...</div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="error-container">
        <h2>Property not found</h2>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="details-page">
      <div className="details-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FiArrowLeft /> Back
        </button>
      </div>

      {/* Image Gallery */}
      {listing.images && listing.images.length > 0 && (
        <div className="image-gallery">
          <div className="main-image">
            <img src={`http://localhost:5000/${listing.images[selectedImage]}`} alt="Main view" />
          </div>
          {listing.images.length > 1 && (
            <div className="thumbnail-list">
              {listing.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img src={`http://localhost:5000/${img}`} alt={`View ${idx + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Property Details */}
      <div className="details-content">
        <div className="details-main">
          <h1>{listing.title}</h1>
          
          <div className="details-grid">
            <div className="detail-item">
              <FiMapPin className="detail-icon" />
              <div>
                <strong>Location</strong>
                <p>{listing.location}</p>
              </div>
            </div>

            <div className="detail-item">
              <FiDollarSign className="detail-icon" />
              <div>
                <strong>Rent</strong>
                <p>₹{listing.rent.toLocaleString()}/month</p>
              </div>
            </div>

            <div className="detail-item">
              <FiHome className="detail-icon" />
              <div>
                <strong>Room Type</strong>
                <p>{listing.roomType || "Not specified"}</p>
              </div>
            </div>

            <div className="detail-item">
              <FiUsers className="detail-icon" />
              <div>
                <strong>Preference</strong>
                <p>{listing.genderPreference || "Any"}</p>
              </div>
            </div>
          </div>

          <div className="detail-section">
  <h3>Address</h3>

  {listing.address && (
    <>
      {/* 🔥 MAP LINK LOGIC */}
      {(() => {
        const mapLink = listing.address.includes("maps.app.goo.gl")
          ? listing.address
          : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(listing.address)}`;

        return (
          <a href={mapLink} target="_blank" rel="noopener noreferrer">
            <button className="map-btn">View on Map</button>
          </a>
        );
      })()}

      <p style={{ marginTop: "10px" }}>{listing.address}</p>
    </>
  )}
</div>
          <div className="detail-section">
            <h3>Description</h3>
            <p>{listing.description}</p>
          </div>

          <div className="detail-section">
            <h3>Amenities</h3>
            <div className="amenities-list">
              <div className="amenity-item">
                {listing.parking ? <FiCheck className="check" /> : <FiX className="cross" />}
                <span>Parking Available</span>
              </div>
              <div className="amenity-item">
                {listing.electricityIncluded ? <FiCheck className="check" /> : <FiX className="cross" />}
                <span>Electricity Included</span>
              </div>
              <div className="amenity-item">
                {listing.water24 ? <FiCheck className="check" /> : <FiX className="cross" />}
                <span>24/7 Water Supply</span>
              </div>
            </div>
          </div>
        </div>

        <div className="details-sidebar">
          <div className="contact-card">
            <h3>Contact Owner</h3>
            <div className="contact-info">
              <FiPhone />
              <span>{listing.contactPhone}</span>
            </div>
            <button className="contact-btn">Call Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}