const express = require('express');
const Admin = require('../../models/admin')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const addAdmin = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ success: false, error: "Admin already exists" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, error: "Password and Confirm Password do not match" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newAdmin = new Admin({ username, email, password: hashedPassword ,isAdmin:true});
        await newAdmin.save();
        res.json({ success: true, message: "Admin created successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: "Server error" });
    }
}

const handleAdminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.json({ success: false, error: "Wrong Credentials" });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.json({ success: false, error: "Wrong Credentials" });
        }
        const payload = { admin: { id: admin.id, isAdmin: admin.isAdmin } };
        const authToken = jwt.sign(payload, process.env.JWT_SECRET_KEY);
        res.json({ success: true, authToken });

    } catch (error) {
        console.error(error);
        res.status(500).send({ succes: false, error });
    }
}
const GetAdmin = async (req, res) => {
    try {
        const adminId = req.admin.id;
        const admin = await Admin.findById(adminId).select("-password");
        res.json(admin);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}
module.exports = { handleAdminLogin, GetAdmin ,addAdmin}