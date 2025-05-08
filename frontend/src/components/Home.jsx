import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api';
import { use } from 'react';

const Home = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [bugs, setBugs] = useState([]);
  const [form, setForm] = useState({});
  const [filterSeverity, setFilterSeverity] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchBugs = async () => {
    setLoading(true);
    try {
      const query = filterSeverity
        ? `?severity=${filterSeverity.toUpperCase()}`
        : '';
      const response = await api.get(`/bugs${query}`);
      setBugs(response.data);
    } catch (error) {
      console.error('Error fetching bugs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/bugs', form);
      setForm({ title: '', description: '', severity: 'LOW' });
      fetchBugs();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, [filterSeverity]);

  const handleLogout = async () => {
    try {
      await api.post('/users/logout');
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to Our App</h1>
      {isAuthenticated ? (
        <div className="body-bugListForm">
          <div className="form">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              required
              maxLength={120}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              required
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            ></textarea>

            <select
              name="severity"
              id="severity"
              onChange={(e) => setForm({ ...form, severity: e.target.value })}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="table-list">
            <h1>Bug List</h1>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ul>
                {bugs.map((bug) => (
                  <div className="line">
                    <div className="col-1">
                      <p>{bug.title}</p>
                    </div>
                    <div className="col-2">{bug.description}</div>
                    <div className="col-3">{bug.severity}</div>
                  </div>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/signup">
            <button>Signup</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
