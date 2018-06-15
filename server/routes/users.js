var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://djain:djain@ds237700.mlab.com:37700/mytasklist_dj', ['users']);

// Get all Users
router.get('/users', function (req, res, next) {
    db.users.find(function (err, users) {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
});



// Get Single User
router.get('/user/:id', function (req, res, next) {
    db.tasks.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
});

// Save User
router.post('/user', function (req, res, next) {
    var user = req.body;
    console.log(user);
    if (!user.username) {
        res.status(400);
        res.json({
            "error": "Bad data"
        });
    } else {
        db.users.save(user, function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }
})

// Delete user
router.delete('/user/:id', function (req, res, next) {
    db.users.remove({ _id: mongojs.ObjectId(req.params.id) }, function (err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
});


//Update User
router.put('/user/:id', function (req, res, next) {
    var user = req.body;
    var updUser = {};

    if (user.firstName) {
        updUser.firstName = user.firstName;
    }

    if (user.lastName) {
        updUser.lastName = user.lastName;
    }

    if (user.username) {
        updUser.username = user.username;
    }

    if (user.password) {
        updUser.password = user.password;
    }

    if (!updUser) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.users.update({ _id: mongojs.ObjectId(req.params.id) }, updUser, {}, function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }
});

module.exports = router;