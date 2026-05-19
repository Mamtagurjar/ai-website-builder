const express = require('express');
const router = express.Router();
const { generateContent, regenerateSection } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/generate', generateContent);
router.post('/regenerate-section', regenerateSection);

module.exports = router;
