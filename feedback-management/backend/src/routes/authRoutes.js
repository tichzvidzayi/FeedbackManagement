/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Successfully logged in
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Invalid email or password
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: Successfully registered
 *       '400':
 *         description: Invalid request body or email already registered
 */
router.post('/register', authController.register);

module.exports = router;
