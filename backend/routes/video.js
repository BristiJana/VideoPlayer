const express = require('express');
const Video = require('../models/Video');
const User = require('../models/User');
const WatchHistory = require('../models/WatchHistory');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/upload', auth, async (req, res) => {
  if (!req.user.isAdmin) return res.sendStatus(403);
  const { title, url } = req.body;
  await Video.create({ title, url });
  res.json({ message: 'Video uploaded' });
});

router.get('/', auth, async (req, res) => {
  const videos = await Video.find();
  res.json(videos);
});

router.post('/watch', auth, async (req, res) => {
  try {
    const { videoId, watchTime } = req.body;

    if (!videoId || !watchTime || watchTime <= 0) {
      return res.status(400).json({ message: 'Invalid watch data' });
    }

    const userId = req.user.id;
    const userEmail = req.user.email;
    const isAdmin = req.user.isAdmin;

    let history = await WatchHistory.findOne({ userId, videoId });

    if (!history) {
      const creditEarned = Math.floor(watchTime / 60);

      await WatchHistory.create({ userId, videoId, watchTime });

      if (!isAdmin) {
        const user = await User.findById(userId);
        user.credits += creditEarned;
        await user.save();
      }

      return res.json({ message: 'Watch recorded', creditEarned });
    }

    const prevTime = history.watchTime;
    const newTime = watchTime - prevTime;

    if (newTime <= 0) {
      return res.json({ message: 'No new watch time', creditEarned: 0 });
    }

    history.watchTime = watchTime;
    await history.save();

    const creditEarned = Math.floor(newTime / 60);
    if (creditEarned > 0 && !isAdmin) {

      const user = await User.findById(userId);
      user.credits += creditEarned;
      await user.save();
    }

    res.json({ message: 'Watch updated', creditEarned });
  } catch (err) {
    console.error('Error in watch API:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/credits', auth, async (req, res) => {

  if (req.user.isAdmin) {
    const users = await User.find({isAdmin: false}, 'name email credits');
    return res.json({ users });
  } else {
    const user = await User.findById(req.user.id);
    res.json({ credits: user.credits });
  }
});

module.exports = router;
