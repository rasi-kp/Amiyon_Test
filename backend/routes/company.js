const express = require('express');
const router = express.Router();
const upload = require('../midleware/multer');
const { createCompany, getAllCompanies, getCompanyById, updateCompany, deleteCompany } = require('../controller/company');
const { auth } = require('../midleware/isAuthUser');

// Company routes
router.post("/companies",upload.single('logo'), auth, createCompany);
router.get("/companies", auth, getAllCompanies);
router.get("/companies/:id", auth, getCompanyById);
router.put("/companies/:id",upload.single('logo'), auth, updateCompany);
router.delete("/companies/:id", auth, deleteCompany);


module.exports = router;
