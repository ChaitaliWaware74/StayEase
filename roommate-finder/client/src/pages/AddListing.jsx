// pages/AddListing.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { FiUpload, FiCheckSquare, FiSquare } from "react-icons/fi";

export default function AddListing() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });
    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    try {
      await API.post("/listings", data);
      alert("Listing added successfully!");
      navigate("/my-posts");
    } catch (err) {
      alert("Error adding listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>Post New Listing</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              required
              placeholder="e.g., Cozy 2BHK Apartment"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              required
              placeholder="e.g., Indiranagar, Bangalore"
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Rent (₹/month)</label>
              <input
                required
                type="number"
                placeholder="e.g., 25000"
                onChange={(e) => setForm({ ...form, rent: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Room Type</label>
              <select onChange={(e) => setForm({ ...form, roomType: e.target.value })}>
                <option value="">Select</option>
                <option value="1RK">1RK</option>
                <option value="1BHK">1BHK</option>
                <option value="2BHK">2BHK</option>
                <option value="3BHK">3BHK</option>
                <option value="Shared Room">Shared Room</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Gender Preference</label>
              <select onChange={(e) => setForm({ ...form, genderPreference: e.target.value })}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Any">Any</option>
              </select>
            </div>

            <div className="form-group">
              <label>Contact Phone</label>
              <input
                required
                placeholder="Your phone number"
                onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Full Address</label>
            <textarea
              rows="2"
              placeholder="Complete address with landmark"
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="3"
              placeholder="Describe your property, nearby amenities, etc."
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Amenities</label>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  onChange={(e) => setForm({ ...form, parking: e.target.checked })}
                />
                Parking Available
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  onChange={(e) => setForm({ ...form, electricityIncluded: e.target.checked })}
                />
                Electricity Included
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  onChange={(e) => setForm({ ...form, water24: e.target.checked })}
                />
                24/7 Water Supply
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Upload Images</label>
            <div className="file-upload">
              <FiUpload />
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setImages(e.target.files)}
              />
              <p>Click or drag to upload</p>
            </div>
            {images.length > 0 && <p className="file-count">{images.length} file(s) selected</p>}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Posting..." : "Post Listing"}
          </button>
        </form>
      </div>
    </div>
  );
}