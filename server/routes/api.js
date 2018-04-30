var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Contact = require('../models/contact');
var User = require('../models/User');
var jwt = require('jsonwebtoken');
//var db = "mongodb://localhost:27017/contactlist";
var db = "mongodb://user:pwd@ds123499.mlab.com:23499/contactlist"
mongoose.connect(db, function (err) {
    if (err) {
        console.error("Error! " + err);
    }
});



router.get('/contacts/:id', function (req, res, next) {
    console.log('Get request for a single video');
    Contact.findById(req.params.id)
        .exec(function (err, contacts) {
            if (err) {
                res.send("Error retrieving videos");
            } else {
                res.json(contacts);
            }
        })
})
router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(601).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});

router.post('/contacts', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        else {
            var filter = {
                age: req.body.age,
                searchvalue: req.body.searchvalue,
                pfbal: req.body.pfbal
            };


            if (filter.age > 0) {
                Contact.find({ "age": { $eq: filter.age } })

                    .exec(function (err, list) {
                        if (err) {
                            res.send("Error retrieving videos");
                        } else {
                            res.json(list);
                            // console.log("Output", list)
                        }
                    })


            }
            else if (filter.pfbal > 0) {
                Contact.find({ "pfbalance": { $eq: filter.pfbal } })

                    .exec(function (err, list) {
                        if (err) {
                            res.send("Error retrieving videos");
                        } else {
                            res.json(list);
                            // console.log("Output", list)
                        }
                    })
            }
            else if (filter.searchvalue > /\d+\.\d+|\.\d+|\d+/g) {

                // console.log("searchvalue", filter.searchvalue)
                Contact.find({
                    firstname: {
                        $regex: new RegExp(filter.searchvalue)
                    }
                })

                    .exec(function (err, list) {
                        if (err) {
                            res.send("Error retrieving videos");
                        } else {
                            res.json(list);
                            // console.log("Output", list)
                        }
                    })
            }



            else {
                Contact.find({ user })

                    .exec(function (err, list) {
                        if (err) {
                            res.send("Error retrieving videos");
                        } else {
                            res.json(list);
                        }
                    })
            }


        }
    })
})


router.post('/contact', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var newContact = new Contact();
        newContact.firstname = req.body.firstname;
        newContact.pfbalance = req.body.pfbalance;
        newContact.phone = req.body.phone;
        newContact.age = req.body.age;
        newContact.user = user;
        newContact.save(function (err, insertedcontact) {
            if (err) {
                res.send("Error saving video");
            } else {
                user.contact.push(insertedcontact);
                user.save();
                res.json(insertedcontact);
            }
        });
    });


})

router.put('/contact/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Contact.findByIdAndUpdate(req.params.id,
        {
            $set: {
                firstname: req.body.firstname, pfbalance: req.body.pfbalance, phone: req.body.phone,
                age: req.body.age
            }
        },
        {
            new: true
        },
        function (err, contact) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if (!contact) {
                return res.status(500).json({
                    title: 'No Message Found!',
                    error: { message: 'Message not found' }
                });
            }
            if (contact.user != decoded.user._id) {
                console.log("user", contact.User)
                return res.status(401).json({
                    title: 'Not Authenticated',
                    error: { message: 'Users do not match' }

                });
            }
            if (err) {
                res.send("Error updating video");
            } else {
                res.json(contact);
            }
        }
    )
})


router.delete('/contact/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Contact.findByIdAndRemove(req.params.id, function (err, deletedcontact) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!deletedcontact) {
            return res.status(500).json({
                title: 'No Message Found!',
                error: { message: 'Message not found' }
            });
        }
        if (deletedcontact.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: { message: 'Users do not match' }
            });
        }
        if (err) {
            res.send("Error deleting video");
        } else {
            res.json(deletedcontact);
        }
    })
})


module.exports = router;
