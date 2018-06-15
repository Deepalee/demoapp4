var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://djain:djain@ds237700.mlab.com:37700/mytasklist_dj', ['tasks']);

// Get all Tasks
router.get('/tasks', function (req, res, next) {
    //res.send('TASK API');
    db.tasks.find(function (err, tasks) {
        if (err) {
            res.send(err);
        }
        res.json(tasks);
    });
});

// Get Single Tasks
router.get('/task/:id', function (req, res, next) {
    db.tasks.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, task) {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
});

// Partial Text Search using REGEX
/*
router.get('/search', function (req, res, next) {
    var q = req.query.q;

    db.tasks.find({
        headline: {
            $regex: new RegExp(q)
        }
    }, {
            _id: 0,
            _v: 0
        }, function (err, tasks) {
            if (err) {
                res.send(err);
            }
            res.json(tasks);
        }).limit(5);
});*/

// Save Task
router.post('/task', function (req, res, next) {
    var task = req.body;
    console.log(task);
    if (!task.headline) {
        res.status(400);
        res.json({
            "error": "Bad data"
        });
    } else {
        db.tasks.save(task, function (err, task) {
            if (err) {
                res.send(err);
            }
            res.json(task);
        });
    }
})

// Delete task
router.delete('/task/:id', function (req, res, next) {
    db.tasks.remove({ _id: mongojs.ObjectId(req.params.id) }, function (err, task) {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
});


// Update task
router.put('/task/:id', function (req, res, next) {
    var task = req.body;
    var updTask = {};

    if (task.title) {
        updTask.title = task.title;
    }

    if (task.isdone) {
        updTask.isdone = task.isdone;
    }

    if (task.implementationDate) {
        updTask.implementationDate = task.implementationDate;
    }

    if (task.headline) {
        updTask.headline = task.headline;
    }

    if (task.description) {
        updTask.description = task.description;
    }

    if (task.actionItem) {
        updTask.actionItem = task.actionItem;
    }

    if (task.env) {
        updTask.env = task.env;
    }

    if (task.sequence) {
        updTask.sequence = task.sequence;
    }

    if (task.owner) {
        updTask.owner = task.owner;
    }

    if (task.approval) {
        updTask.approval = task.approval;
    }

    if (task.status) {
        updTask.status = task.status;
    }

    if (task.comment) {
        updTask.comment = task.comment;
    }

    if (task.currentUser) {
        updTask.currentUser = task.currentUser;
    }

    if (task.attachment) {
        updTask.attachment = task.attachment;
    }

    if (!updTask) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.update({ _id: mongojs.ObjectId(req.params.id) }, updTask, {}, function (err, task) {
            if (err) {
                res.send(err);
            }
            res.json(task);
        });
    }
});

module.exports = router;