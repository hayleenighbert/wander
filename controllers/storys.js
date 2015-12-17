var express = require('express');
var Story = require('../models/story');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    Story.find(function(err, storys) {
      if (err) return res.status(500).send(err);
      res.send(storys);
    });
  })
  .post(function(req, res) {
    console.log(req.body)
    Story.create(req.body, function(err, story) {
      if (err) return res.status(500).send(err);
      res.send(story);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    Story.findById(req.params.id, function(err, story) {
      if (err) return res.status(500).send(err);
      res.send(story);
    });
  })
  .put(function(req, res) {
    Story.findByIdAndUpdate(req.params.id, req.body, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  })
  .delete(function(req, res) {
    Story.findByIdAndRemove(req.params.id, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  });

module.exports = router;
