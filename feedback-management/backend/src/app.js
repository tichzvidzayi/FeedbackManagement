const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(bodyParser.json());

// Swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Customer Feedback Management API',
      version: '1.0.0',
      description: 'API documentation for the Customer Feedback Management System',
    },
    servers: [{ url: 'http://localhost:3000/api' }],
  },
  apis: ['./routes/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', feedbackRoutes);

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
