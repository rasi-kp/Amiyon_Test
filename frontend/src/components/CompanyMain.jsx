import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import { FaSignOutAlt, FaTrash, FaEdit } from "react-icons/fa";
import AddCompany from "./AddCompany";
import {  deletecompany, editcompany, getallcompany} from "../services/service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminMain = () => {
  const [company, setCompany] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', logo: null, website: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetching();
  }, []);
  
  const fetching = async () => {
    try {
      const response = await getallcompany();
      setCompany(response);
    } catch (error) {
      if (error.response && error.response.data.error === "Failed to authenticate token") {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        console.error("An error occurred:", error);
      }
    }
  };
  const handleDelete = async (id) => {
    const confirmBlock = window.confirm("Are you sure you want to Delete this Company ?");
    if (!confirmBlock) return;
    const response = await deletecompany(id);
    if (response.message) {
      toast.success(response.message)
    }
    setCompany(company.filter((user) => user.id !== id));
  };
  const handleEdit = (company) => {
    setSelectedCompany(company);
    setFormData({
      id:company.id,
      name: company.name,
      email: company.email,
      logo: company.logo,
      website: company.website,
    });
    setShowModal(true);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogoChange = (e) => {
    setFormData((prevData) => ({ ...prevData, logo: e.target.files[0] }));
  };
  const handleSubmit = async () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("website", formData.website);
    if (formData.logo) {
      data.append("logo", formData.logo);
    }

    try {
      await editcompany(data,formData.id);
      toast.success("successfully Updated Data")
      fetching()
      setShowModal(false);
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div className="container my-1 py-3">
        <div className="d-flex justify-content-between align-items-center">
          <button onClick={e=>setShowAddModal(true)}
            className="btn btn-outline-dark btn-primary m-2"
          >
            Add New Company
          </button>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            <FaSignOutAlt className="me-1" /> Logout
          </button>
        </div>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-12 col-md-8 col-lg-8 col-sm-12 mx-auto">
            {company.length > 0 && (
              <div className="mt-4">
                <h5>Current Companies:</h5>
                <ul className="list-group">
                  {company.map((user, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <img
                        src={`http://localhost:5000/${user.logo}` || "https://amiyon.com/wp-content/uploads/2023/05/amiyom-logo-1-800x320.png"}
                        alt={`${user.name} logo`}
                        className="me-3"
                        style={{ width: "60px", height: "60px", borderRadius: "50%" }}
                      />

                      <div className="flex-grow-1">
                        <strong>{user.name}</strong>
                        <div className="text-muted" style={{ fontSize: "0.9rem" }}>{user.email}</div>
                        <div className="text-primary" style={{ fontSize: "0.9rem" }}>
                          <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
                            {user.website}
                          </a>
                        </div>
                      </div>
                      <div>
                        <button
                          className="btn btn-info btn-sm me-2"
                          onClick={() => handleEdit(user)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(user.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Modal for Editing Company */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Company</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Website</label>
                    <input
                      type="text"
                      className="form-control"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                    />
                  </div>
                  <label className="form-label">Logo</label>
                  <div className="mb-3">

                    <img
                      src={`http://localhost:5000/${formData.logo}` || "https://amiyon.com/wp-content/uploads/2023/05/amiyom-logo-1-800x320.png"} alt='logo'
                      className="me-3"
                      style={{ width: "100px", height: "100px" }}
                    />
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleLogoChange}
                    />
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        {showAddModal && <AddCompany setShowAddModal={setShowAddModal} fetching={fetching}/>}
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminMain;
