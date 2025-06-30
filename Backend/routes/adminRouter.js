const express=require('express');
const router=express.Router();
const { addProblem } =require('../controllers/adminController/addProblem');
const {fetchAdmin}=require('../middleware/fetchAdmin')
const {handleAdminLogin,GetAdmin,addAdmin}=require('../controllers/adminController/adminAuthController')
const {createContest,getAllContest, addChallenges, getChallenge, makeAnnouncements}=require('../controllers/adminController/contestController')

router.post('/add-problem',addProblem)
router.post('/codearea-addadmin',addAdmin);
router.post('/codearea-login',handleAdminLogin)
router.post('/codearea-getadmin',fetchAdmin,GetAdmin)
router.post('/create-contest',createContest)
router.get('/get-all-contests',getAllContest)
router.post('/add-challenges',addChallenges);
router.get('/get-contest/:id',getChallenge);
router.post('/announce/:id',makeAnnouncements);
module.exports=router