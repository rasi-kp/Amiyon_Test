import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button ,Form} from 'react-bootstrap';
import { FaSignOutAlt, FaTrash, FaEdit } from "react-icons/fa";
import AddEmployee from "./AddEmployee";
import {deleteemployee, editemployee, getallemployee,} from "../services/service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeMain = () => {
  const [company, setCompany] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetching();
  }, []);

  const fetching = async () => {
    try {
      const response = await getallemployee();
      setEmployees(response);
      setCompany(response.map(emp => emp.company));
    } catch (error) {
      if (error.response && error.response.data.error === "Failed to authenticate token") {
        // redirect to /login
        localStorage.removeItem("token");
        navigate("/");
      } else {
        console.error("An error occurred:", error);
      }
    }
  };
  const handleDelete = async (id) => {
    const confirmBlock = window.confirm("Are you sure you want to Delete this Employee ?");
    if (!confirmBlock) return;
    const response = await deleteemployee(id);
      toast.success("Succesfully Deleted Employee")
    setCompany(employees.filter((user) => user.id !== id));
  };
  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };
  const handleSave = async (formData, employeeId) => {
    try {
      await editemployee(formData, employeeId);
      toast.success("successfully Edit Employee Details")
      fetching();
      handleClose();
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployee({ ...selectedEmployee, [name]: value });
  };
  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div className="container my-1 py-3">
        <div className="d-flex justify-content-between align-items-center">
          <button onClick={e => setShowAddModal(true)}
            className="btn btn-outline-dark btn-primary m-2"
          >
            Add New Employee
          </button>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            <FaSignOutAlt className="me-1" /> Logout
          </button>
        </div>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-12 col-md-8 col-lg-8 col-sm-12 mx-auto">
            {employees.length > 0 && (
              <div className="mt-4">
                <h5>Current Employees:</h5>
                <ul className="list-group">
                  {employees.map((user, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div className="flex-grow-1">
                        <strong>{user.firstname} {user.lastname}</strong>
                        <div className="text-muted" style={{ fontSize: "0.9rem" }}>{user.email}</div>
                        <div className="text-muted" style={{ fontSize: "0.9rem" }}>{user.phone}
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <strong>{user.company.name}</strong>
                        <div className="text-muted" style={{ fontSize: "0.9rem" }}>{user.email}</div>
                        <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                          {user.company.website}
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
            {showModal && selectedEmployee && (
              <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstname"
                        value={selectedEmployee.firstname}
                        onChange={handleChange}
                        placeholder="Enter first name"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastname"
                        value={selectedEmployee.lastname}
                        onChange={handleChange}
                        placeholder="Enter last name"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={selectedEmployee.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={selectedEmployee.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Company</Form.Label>
                      <Form.Select
                        name="companyId"
                        value={selectedEmployee.companyId}
                        onChange={handleChange}
                      >
                        <option value="">Select Company</option>
                        {company.map((company) => (
                          <option key={company.id} value={company.id}>
                            {company.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleSave(selectedEmployee, selectedEmployee.id)}
                  >
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </div>
        </div>
        {showAddModal && <AddEmployee setShowAddModal={setShowAddModal} fetching={fetching} />}
      </div>
      <ToastContainer />
    </>
  );
};

export default EmployeeMain;
