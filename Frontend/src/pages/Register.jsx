import { Container, Box, Typography, Button, Card, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { showError, showSuccess } from '../utils/toast';
import { validators } from '../utils/validators';
import { useAuth } from '../hooks/useContexts';

export default function Register() {
  const navigate = useNavigate();
  const { login: registerUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    const { confirmPassword, ...registerData } = data;
    try {
      registerUser(registerData);
      showSuccess('Registration successful!');
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
      showError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8, pt: 14 }}>
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
            Create Account
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
              label="Full Name"
              margin="normal"
              {...register('name', {
                required: 'Name is required',
                validate: (value) => validators.name(value) || true,
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              {...register('email', {
                required: 'Email is required',
                validate: (value) => validators.email(value) || true,
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
                validate: (value) => validators.password(value) || true,
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              margin="normal"
              {...register('confirmPassword', {
                required: 'Confirm password is required',
                validate: (value) => validators.confirmPassword(value, password) || true,
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
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
              {loading ? 'Creating Account...' : 'Register'}
            </Button>
          </form>

          <Typography sx={{ textAlign: 'center', mt: 2 }}>
            Already have an account?{' '}
            <Typography
              component="span"
              onClick={() => navigate('/login')}
              sx={{
                color: '#667eea',
                cursor: 'pointer',
                fontWeight: 'bold',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Login here
            </Typography>
          </Typography>
        </Card>
      </motion.div>
    </Container>
  );
}
