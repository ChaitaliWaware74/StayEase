// pages/MyListings.jsx - Updated with card layout
import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { FiPlus, FiEdit2, FiTrash2, FiImage, FiMapPin, FiHome } from "react-icons/fi";
import "../styles/main.css";

export default function MyListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const fetchMyListings = async () => {
    setLoading(true);
    try {
      const res = await API.get("/listings");
      const myPosts = res.data.filter(
        (l) => userId === (l.userId?._id || l.userId)
      );
      setListings(myPosts);
    } catch (err) {
      console.error("Error fetching listings", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await API.delete(`/listings/${id}`);
        fetchMyListings();
      } catch (err) {
        alert("Error deleting listing");
      }
    }
  };

  useEffect(() => {
    fetchMyListings();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading your listings...</div>
      </div>
    );
  }

  return (
    <div className="my-listings-container">
      <div className="my-listings-header">
        <h2>My Listings</h2>
        <Link to="/add" className="add-new-btn">
          <FiPlus /> Add New Listing
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className="no-listings">
          <p>You haven't posted any listings yet.</p>
          <Link to="/add" className="add-new-btn">
            <FiPlus /> Create Your First Listing
          </Link>
        </div>
      ) : (
        <div className="my-listings-grid">
          {listings.map((listing) => (
            <div key={listing._id} className="my-listing-card">
              <div className="my-listing-image">
                {listing.images && listing.images.length > 0 ? (
                  <img
                    src={`http://localhost:5000/${listing.images[0]}`}
                    alt={listing.title}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="no-image-placeholder"><FiImage /></div>';
                    }}
                  />
                ) : (
                  <div className="no-image-placeholder">
                    <FiImage />
                  </div>
                )}
              </div>
              <div className="my-listing-info">
                <h3>{listing.title}</h3>
                <div className="my-listing-details">
                  <span>
  <FiMapPin style={{ marginRight: "5px" }} />
  {listing.location}
</span>

<span>
  <FiHome style={{ marginRight: "5px" }} />
  {listing.roomType || "N/A"}
</span>
                </div>
                <div className="my-listing-rent">
                  ₹{listing.rent?.toLocaleString()}/month
                </div>
                <div className="my-listing-actions">
                  <button
                    className="edit-btn-card"
                    onClick={() => navigate(`/edit/${listing._id}`)}
                  >
                    <FiEdit2 /> Edit
                  </button>
                  <button
                    className="delete-btn-card"
                    onClick={() => handleDelete(listing._id)}
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}