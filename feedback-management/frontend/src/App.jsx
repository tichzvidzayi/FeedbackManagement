import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from '@material-ui/core';
import axios from 'axios';

const App = () => {
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [allFeedback, setAllFeedback] = useState([]);

  useEffect(() => {
    fetchAllFeedback();
  }, []);

  const fetchAllFeedback = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/feedback');
      setAllFeedback(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitFeedback = async () => {
    try {
      setLoading(true);
      await axios.post('/api/feedback', { message: feedback });
      setFeedback('');
      fetchAllFeedback();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Customer Feedback Management</Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>Submit Feedback</Typography>
                <TextField
                  label="Enter your feedback"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '10px' }}
                  onClick={handleSubmitFeedback}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Feedback'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>All Feedback</Typography>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <ul>
                    {allFeedback.map(feedback => (
                      <li key={feedback.id}>{feedback.message}</li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
