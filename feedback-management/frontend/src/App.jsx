import React, { useState } from 'react';
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
} from '@material-ui/core';
import axios from 'axios';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/login', { username, password });
      console.log('Login successful:', response.data);
      //    Add logic to handle successful login (e.g., redirect to dashboard)
    } catch (error) {
      console.error('Error logging in:', error.response.data.message);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/register', { username, password });
      console.log('Registration successful:', response.data);
      // Add logic to handle successful registration (e.g., show success message)
    } catch (error) {
      console.error('Error registering:', error.response.data.message);
      setError(error.response.data.message);
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
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>Login</Typography>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ marginTop: '10px' }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '10px' }}
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>Register</Typography>
                <TextField
                  label="Username/email"
                  variant="outlined"
                  fullWidth
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ marginTop: '10px' }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '10px' }}
                  onClick={handleRegister}
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Register'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography variant="body1" color="error" style={{ marginTop: '10px' }}>
                {error}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default App;
