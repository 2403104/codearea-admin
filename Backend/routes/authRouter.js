const express=require('express');
const router=express.Router();
const {handleAdminLogin}=require('../controllers/adminController/adminAuthController')

router.post('/codearea-login',handleAdminLogin);
module.exports=router