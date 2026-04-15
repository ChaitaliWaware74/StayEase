// pages/EditListing.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { FiUpload, FiImage } from "react-icons/fi";
import "../styles/main.css";

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({});
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await API.get(`/listings/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error("Error fetching listing", err);
        alert("Error loading listing");
        navigate("/my-posts");
      }
    };
    fetchListing();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key] !== undefined && form[key] !== null) {
        data.append(key, form[key]);
      }
    });
    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    try {
      await API.put(`/listings/${id}`, data);
      alert("Listing updated successfully!");
      navigate("/my-posts");
    } catch (err) {
      alert("Error updating listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-listing-page">
      <div className="edit-listing-card">
        <h2>Edit Listing</h2>
        <form onSubmit={handleSubmit}>
          <div className="edit-form-group">
            <label>Title</label>
            <input
              required
              value={form.title || ""}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g., Cozy 2BHK Apartment"
            />
          </div>

          <div className="edit-form-group">
            <label>Location</label>
            <input
              required
              value={form.location || ""}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g., Indiranagar, Bangalore"
            />
          </div>

          <div className="edit-form-row">
            <div className="edit-form-group">
              <label>Rent (₹/month)</label>
              <input
                required
                type="number"
                value={form.rent || ""}
                onChange={(e) => setForm({ ...form, rent: e.target.value })}
                placeholder="e.g., 25000"
              />
            </div>

            <div className="edit-form-group">
              <label>Room Type</label>
              <select
                value={form.roomType || ""}
                onChange={(e) => setForm({ ...form, roomType: e.target.value })}
              >
                <option value="">Select Room Type</option>
                <option value="1RK">1RK</option>
                <option value="1BHK">1BHK</option>
                <option value="2BHK">2BHK</option>
                <option value="3BHK">3BHK</option>
                <option value="Shared Room">Shared Room</option>
              </select>
            </div>
          </div>

          <div className="edit-form-row">
            <div className="edit-form-group">
              <label>Gender Preference</label>
              <select
                value={form.genderPreference || ""}
                onChange={(e) => setForm({ ...form, genderPreference: e.target.value })}
              >
                <option value="">Select Gender Preference</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Any">Any</option>
              </select>
            </div>

            <div className="edit-form-group">
              <label>Contact Phone</label>
              <input
                required
                value={form.contactPhone || ""}
                onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                placeholder="Your phone number"
              />
            </div>
          </div>

          <div className="edit-form-group">
            <label>Full Address</label>
            <textarea
              rows="2"
              value={form.address || ""}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Complete address with landmark"
            />
          </div>

          <div className="edit-form-group">
            <label>Description</label>
            <textarea
              rows="3"
              value={form.description || ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe your property, nearby amenities, etc."
            />
          </div>

          <div className="edit-form-group">
            <label>Amenities</label>
            <div className="edit-checkbox-group">
              <label className="edit-checkbox-label">
                <input
                  type="checkbox"
                  checked={form.parking || false}
                  onChange={(e) => setForm({ ...form, parking: e.target.checked })}
                />
                Parking Available
              </label>
              <label className="edit-checkbox-label">
                <input
                  type="checkbox"
                  checked={form.electricityIncluded || false}
                  onChange={(e) => setForm({ ...form, electricityIncluded: e.target.checked })}
                />
                Electricity Included
              </label>
              <label className="edit-checkbox-label">
                <input
                  type="checkbox"
                  checked={form.water24 || false}
                  onChange={(e) => setForm({ ...form, water24: e.target.checked })}
                />
                24/7 Water Supply
              </label>
            </div>
          </div>

          {form.images && form.images.length > 0 && (
            <div className="current-images">
              <h4>Current Images ({form.images.length})</h4>
              <div className="current-images-list">
                {form.images.slice(0, 4).map((img, idx) => (
                  <div key={idx} className="current-image-thumb">
                    <img src={`http://localhost:5000/${img}`} alt={`Current ${idx + 1}`} />
                  </div>
                ))}
                {form.images.length > 4 && (
                  <div className="current-image-thumb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6' }}>
                    <span>+{form.images.length - 4}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="edit-form-group">
            <label>Upload New Images (Optional)</label>
            <div className="edit-file-upload">
              <FiUpload />
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setImages(e.target.files)}
              />
              <p>Click or drag to upload new images</p>
            </div>
            {images.length > 0 && (
              <div className="edit-file-count">{images.length} new file(s) selected</div>
            )}
          </div>

          <button type="submit" className="update-btn" disabled={loading}>
            {loading ? "Updating..." : "Update Listing"}
          </button>
        </form>
      </div>
    </div>
  );
}