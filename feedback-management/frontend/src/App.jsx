import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [feedback, setFeedback] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUsers, setAdminUsers] = useState([]);
  const [allFeedback, setAllFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitFeedback = async () => {
    if (!feedback.trim()) {
      alert('Please enter your feedback.');
      return;
    }

    try {
      setIsLoading(true);
      await axios.post('/api/feedback', { feedback });
      alert('Feedback submitted successfully!');
      setFeedback('');
      setIsLoading(false);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback.');
      setIsLoading(false);
    }
  };

  const fetchAllFeedback = async () => {
    try {
      const response = await axios.get('/api/feedback/all');
      setAllFeedback(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const fetchAdminUsers = async () => {
    try {
      const response = await axios.get('/api/admin/users');
      setAdminUsers(response.data);
    } catch (error) {
      console.error('Error fetching admin users:', error);
    }
  };

  useEffect(() => {
    setIsAdmin(true); 

    if (isAdmin) {
      fetchAdminUsers();
      fetchAllFeedback();
    }
  }, [isAdmin]);

  return (
    <div className="App">
      <h1>Feedback Management System</h1>
      <div className="feedback-section">
        <h2>Submit Feedback</h2>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback..."
        />
        <button onClick={handleSubmitFeedback} disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </div>

      {isAdmin && (
        <div className="admin-section">
          <h2>All Feedback</h2>
          <ul>
            {allFeedback.map((item) => (
              <li key={item.id}>{item.feedback}</li>
            ))}
          </ul>

          <h2>Admin Users</h2>
          <ul>
            {adminUsers.map((user) => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
