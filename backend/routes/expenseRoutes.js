const router = require("express").Router();
const Expense = require("../models/Expense");
const auth = require("../middleware/authMiddleware");

router.post("/expense", auth, async(req,res)=>{

 const {title,amount,category} = req.body;

 const expense = new Expense({
   userId:req.user.id,
   title,
   amount,
   category
 });

 await expense.save();

 res.json({msg:"Expense Added"});
});

router.get("/expenses", auth, async(req,res)=>{

 const data = await Expense.find({
   userId:req.user.id
 });

 res.json(data);
});

module.exports = router;