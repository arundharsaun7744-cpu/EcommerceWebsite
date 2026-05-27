import { Container, Box, Typography, Button, Card, Stepper, Step, StepLabel, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { formatPrice } from '../utils/formatters';
import { validators } from '../utils/validators';
import { useCart } from '../hooks/useContexts';

const steps = ['Address', 'Payment', 'Review', 'Confirm'];

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (cartItems.length === 0) {
    navigate('/');
    return null;
  }

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Delivery Address
            </Typography>
            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              {...register('name', { required: 'Name is required' })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              fullWidth
              label="Phone Number"
              margin="normal"
              {...register('phone', {
                required: 'Phone is required',
                validate: (value) => validators.phone(value) || true,
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
            <TextField
              fullWidth
              label="Address"
              margin="normal"
              multiline
              rows={3}
              {...register('address', {
                required: 'Address is required',
                validate: (value) => validators.address(value) || true,
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
            <TextField
              fullWidth
              label="City"
              margin="normal"
              {...register('city', {
                required: 'City is required',
                validate: (value) => validators.city(value) || true,
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
            <TextField
              fullWidth
              label="State"
              margin="normal"
              {...register('state', {
                required: 'State is required',
                validate: (value) => validators.state(value) || true,
              })}
              error={!!errors.state}
              helperText={errors.state?.message}
            />
            <TextField
              fullWidth
              label="Pincode"
              margin="normal"
              {...register('pincode', {
                required: 'Pincode is required',
                validate: (value) => validators.pincode(value) || true,
              })}
              error={!!errors.pincode}
              helperText={errors.pincode?.message}
            />
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Payment Details
            </Typography>
            <TextField
              fullWidth
              label="Card Number"
              margin="normal"
              {...register('cardNumber', {
                required: 'Card number is required',
                validate: (value) => validators.cardNumber(value) || true,
              })}
              error={!!errors.cardNumber}
              helperText={errors.cardNumber?.message}
              placeholder="1234 5678 9012 3456"
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 2 }}>
              <TextField
                label="Expiry Date"
                margin="normal"
                placeholder="MM/YY"
                {...register('expiry', { required: 'Expiry date is required' })}
                error={!!errors.expiry}
                helperText={errors.expiry?.message}
              />
              <TextField
                label="CVV"
                margin="normal"
                type="password"
                {...register('cvv', {
                  required: 'CVV is required',
                  validate: (value) => validators.cvv(value) || true,
                })}
                error={!!errors.cvv}
                helperText={errors.cvv?.message}
              />
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Order Review
            </Typography>
            {items.map((item) => (
              <Card key={item.id} sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography>{item.product?.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Qty: {item.quantity}
                  </Typography>
                </Box>
                <Typography>{formatPrice(item.product?.price * item.quantity)}</Typography>
              </Card>
            ))}
          </Box>
        );

      case 3:
        return (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'green' }}>
              ✓ Order Confirmed!
            </Typography>
            <Typography>Your order has been placed successfully.</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Order ID: #123456789
            </Typography>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4, pt: 14 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Checkout
      </Typography>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Card sx={{ p: 3, mb: 3 }}>{renderStepContent(activeStep)}</Card>

        <Card sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography>Subtotal:</Typography>
            <Typography>{formatPrice(total)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography>Tax (18%):</Typography>
            <Typography>{formatPrice(total * 0.18)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
            <Typography>Total:</Typography>
            <Typography sx={{ color: '#667eea' }}>{formatPrice(total * 1.18)}</Typography>
          </Box>
        </Card>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
          >
            {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
}
