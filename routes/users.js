const express = require("express");
const User = require("../models/user");

const router = express.Router();

router
    .route("/")
        .get(async (req, res) => {
            try {
                const users = await User.find({});
        
                res.json(users);
            } catch (error) {
                res.status(500).send(error.toString());
            }
        })
        .post(async (req, res) => {
            try {
                const payload = req.body;

                let user = await User.findOne({ email: payload.email });

                if (user) return res.status(400).send("Users exists");

                user = await User.create(payload);

                await user.save();

                res.json(user);
            } catch (error) {
                const errorMessage = error.toString();

                if (/ValidationError/.test(errorMessage)) {
                    res.status(400).send(errorMessage);
                } else {
                    res.status(500).send(errorMessage);
                }
            }
        });

router
    .route("/:id")
        .get(async (req, res) => {
            try {
                const user = await User.findById(req.params.id);
        
                res.json(user);
            } catch (error) {
                res.status(500).send(error.toString());
            }
        })
        .patch(async (req, res) => {
            try {
                const payload = req.body;

                let user = await User.findById(req.params.id);

                if (!user) return res.sendStatus(404);

                user = Object.assign(user, payload);

                await user.save();

                res.json(user);
            } catch (error) {
                res.status(500).send(error.toString());
            }
        });

module.exports = router;

