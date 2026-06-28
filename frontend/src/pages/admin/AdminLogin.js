import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, isAuthenticated } from '../../api/admin';
import { Input, Button } from './widgets';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Already logged in? skip straight to the dashboard.
  React.useEffect(() => {
    if (isAuthenticated()) navigate('/admin', { replace: true });
  }, [navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username.trim(), password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(
        err?.response?.status === 401
          ? 'Incorrect username or password.'
          : 'Could not reach the server. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Arai Lab Admin</h1>
          <p className="text-neutral-400 mt-2">Sign in to manage site content</p>
        </div>
        <form
          onSubmit={onSubmit}
          className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 space-y-5 shadow-2xl"
        >
          <Input
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            autoComplete="username"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {error && (
            <div className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">
              {error}
            </div>
          )}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
        <p className="text-center text-neutral-400 text-sm mt-6">
          <a href="/" className="hover:text-neutral-200">← Back to website</a>
        </p>
      </div>
    </div>
  );
};
