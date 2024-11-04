const Employee = require('../model/employee');
const Company = require('../model/company');

module.exports = {
    createEmployee: async (req, res) => {
        try {
            const { firstname, lastname, email, phone, companyId } = req.body;
            const employee = await Employee.create({ firstname, lastname, email, phone, companyId });
            res.status(201).json(employee);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getAllEmployees: async (req, res) => {
        try {
            const employees = await Employee.findAll({ include: { model: Company, as: "company" } });
            res.json(employees);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getEmployeeById: async (req, res) => {
        try {
            const employee = await Employee.findByPk(req.params.id, { include: { model: Company, as: "company" } });
            if (!employee) return res.status(404).json({ error: "Employee not found" });
            res.json(employee);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateEmployee: async (req, res) => {
        try {
            const { firstname, lastname, email, phone, companyId } = req.body;
            const employee = await Employee.findByPk(req.params.id);

            if (!employee) return res.status(404).json({ error: "Employee not found" });

            await employee.update({ firstname, lastname, email, phone, companyId });
            res.json(employee);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteEmployee: async (req, res) => {
        try {
            const employee = await Employee.findByPk(req.params.id);
            if (!employee) return res.status(404).json({ error: "Employee not found" });

            await employee.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

}