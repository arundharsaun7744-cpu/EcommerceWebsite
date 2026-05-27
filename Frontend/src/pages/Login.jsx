import { useState, useEffect } from 'react';
import { Container, Button, Typography, Box, TextField, Card, Divider, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { showError, showSuccess } from '../utils/toast';
import { Phone as PhoneIcon } from '@mui/icons-material';
import googleIcon from '../assets/unnamed.png';
import { useAuth } from '../hooks/useContexts';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  // 10 sec timer popup trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      setPopupOpen(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await login(data);  // FIXED: await added
      showSuccess('Login successful!');
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
      showError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8, pt: 14 }}>
      {/* SIGN-IN REQUIRED POPUP */}
      <Dialog open={popupOpen} onClose={() => setPopupOpen(false)}>
        <DialogTitle>Sign-in Required</DialogTitle>
        <DialogContent>
          You are not logged in. Please sign in to continue.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate("/login")} variant="contained">
            Login Now
          </Button>
        </DialogActions>
      </Dialog>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          sx={{
            p: 4,
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(102, 126, 234, 0.1)',
          }}
        >
          <Typography variant="h4" component="h1" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
            Welcome Back!
          </Typography>

          {error && (
            <Box
              sx={{
                mb: 2,
                p: 2,
                backgroundColor: '#ffebee',
                color: '#c62828',
                borderRadius: '4px',
              }}
            >
              {typeof error === 'string' ? error : JSON.stringify(error)}
            </Box>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              {...register('email', {
                required: 'Email is required',
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={loading}
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                mt: 3,
                mb: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                py: 1.5,
                fontSize: '1rem',
              }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <Divider sx={{ my: 2 }}>OR</Divider>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 3 }}>
              {/* GOOGLE LOGIN BUTTON */}
              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
                <IconButton
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    border: '2px solid #4285F4',
                    padding: 0,
                    background: '#ffffff',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    zIndex: 1200,
                    '&:hover': { backgroundColor: '#ffffff', transform: 'scale(1.03)' },
                  }}
                  onClick={() => showError('Google login coming soon!')}
                  title="Login with Google"
                >
                  <img
                    src={googleIcon}
                    alt="Google Login"
                    style={{ width: '50px', height: '24px', objectFit: 'contain', borderRadius: 4 }}
                  />
                </IconButton>
              </motion.div>

              {/* PHONE LOGIN BUTTON */}
              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
                <IconButton
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    border: '2px solid #667eea',
                    color: '#667eea',
                    padding: 0,
                    background: '#ffffff',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    zIndex: 1200,
                    '&:hover': { backgroundColor: '#ffffff', transform: 'scale(1.03)' },
                  }}
                  onClick={() => showError('Phone Number login coming soon!')}
                  title="Login with phone number"
                >
                  <PhoneIcon sx={{ fontSize: 28 }} />
                </IconButton>
              </motion.div>
            </Box>

            <Typography sx={{ textAlign: 'center', mt: 2 }}>
              Don't have an account?{' '}
              <Typography
                component="span"
                onClick={() => navigate('/register')}
                sx={{
                  color: '#667eea',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Register here
              </Typography>
            </Typography>
          </form>
        </Card>
      </motion.div>
    </Container>
  );
}
