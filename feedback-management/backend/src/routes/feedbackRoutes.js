/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: API endpoints for managing feedback
 */

const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/feedback:
 *   post:
 *     summary: Submit feedback
 *     tags: [Feedback]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *             required:
 *               - message
 *     responses:
 *       '201':
 *         description: Feedback submitted successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized, missing or invalid token
 */
router.post('/feedback', authMiddleware.authenticate, feedbackController.submitFeedback);

/**
 * @swagger
 * /api/feedback:
 *   get:
 *     summary: Get all feedback
 *     tags: [Feedback]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved feedback
 *       '401':
 *         description: Unauthorized, missing or invalid token
 */
router.get('/feedback', authMiddleware.authenticate, feedbackController.getAllFeedback);

module.exports = router;
