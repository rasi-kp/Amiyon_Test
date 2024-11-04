import React, { useState } from "react";
import { addcompany } from "../services/service";
import { toast } from "react-toastify";

const AddCompany = ({ setShowAddModal ,fetching}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("website", formData.website);
    if (formData.logo) {
      data.append("logo", formData.logo);
    }

    try {
      const response = await addcompany(data);
      console.log("Company added:", response);
      toast.success("successfulyy added new Company")
      setShowAddModal(false);
      fetching()
    } catch (error) {
      console.error("Error adding company:", error);
    }
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Company</h5>
            <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Website</label>
                <input
                  type="text"
                  className="form-control"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Logo</label>
                <input
                  type="file"
                  className="form-control"
                  name="logo"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">Add Company</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
