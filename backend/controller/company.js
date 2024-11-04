
const Company = require('../model/company');

module.exports = {
    createCompany: async (req, res) => {
        try {
            const { name, email, website } = req.body;
            const logo = req.file ? req.file.path : null;
            const company = await Company.create({ name, email, logo, website });
            res.status(201).json(company);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getAllCompanies: async (req, res) => {
        try {
            const companies = await Company.findAll();
            res.status(200).json(companies);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getCompanyById: async (req, res) => {
        try {
            const company = await Company.findByPk(req.params.id);
            if (!company) return res.status(404).json({ error: "Company not found" });
            res.json(company);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateCompany: async (req, res) => {
        try {
            const { name, email, website } = req.body;
            const logo = req.file ? req.file.path : null;
            const company = await Company.findByPk(req.params.id);

            if (!company) return res.status(404).json({ error: "Company not found" });

            await company.update({ name, email, website, logo });
            res.json(company);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteCompany: async (req, res) => {
        try {
            const company = await Company.findByPk(req.params.id);
            if (!company) return res.status(404).json({ error: "Company not found" });

            await company.destroy();
            res.status(200).json({message:"Successfully Deleted"});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

}