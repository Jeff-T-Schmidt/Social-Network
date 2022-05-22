const router = require('express').Router();
// const videoRoutes = require('./videoRoutes');
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// router.use('/videos', videoRoutes);
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;

// This is incorrect and NTB corrected