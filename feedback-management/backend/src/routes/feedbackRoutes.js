const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: Feedback management
 */

/**
 * @swagger
 * /api/feedback:
 *   post:
 *     summary: Submit feedback
 *     tags: [Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               feedback:
 *                 type: string
 *     responses:
 *       201:
 *         description: Feedback submitted successfully
 *       500:
 *         description: Failed to submit feedback
 */
router.post('/api/feedback', feedbackController.submitFeedback);

module.exports = router;
