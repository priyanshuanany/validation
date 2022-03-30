const express = require("express");
const { body, validationResult } = require("express-validator");

const User = require("../model/userModel");

const router = express.Router();

router.post(
    "/",
    body("firstName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("first Name cannot be empty"),
    
    body("email")
    .isEmail()
    .normalizeEmail()
    .custom(async(value) => {
        const user = await User.findOne({email: value});

        if(user) {
            throw new Error("Email is already taken");
        }
        return true;
    }),
    body("pincode")
    .isNumeric()
    .isLength({min: 6})
    .isPostalCode(),

    body("age")
    .isNumeric()
    .not().isEmpty()
    .withMessage("Age cannot be empty")
    .custom((value) => {
        if(value < 1 || value > 100){
            throw new Error("Incorrect age provided");
        }
        return true;
    }),


    async(req, res) => {
        try{
            const user = await User.create(req.body);
            return res.status(201).send(user);
        }catch(err) {
            return res.status(500).send({message: err.message});
        }
});

module.exports = router;