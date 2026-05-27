import { Container, Box, Typography, Button, Card, TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatPrice } from '../utils/formatters';
import { CreditCard } from '@mui/icons-material';
import { useLocation } from "react-router-dom";
export default function Payment() { 
  const navigate = useNavigate();
    const location = useLocation();
  const { product, qty } = location.state || {}; 
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const orderId = product?.id;
  const total =  formatPrice(product?.price + (product?.price * 0.18)*qty);
  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      navigate('/order-confirmation', {
        state: { orderId, total, product }
      });
      setProcessing(false);
    }, 2000);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4, pt: 14, pb: 8 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#111' }}>
          💳 Payment Details
        </Typography>

        {/* Static Requirements */}
        <Card sx={{ p: 2, mb: 3, backgroundColor: '#fef3c7', borderRadius: '8px', border: '1px solid #fde68a' }}>
          <Typography variant="body2" sx={{ color: '#92400e', fontWeight: 600, mb: 1 }}>
            ⚠️ Payment Requirements:
          </Typography>

          {paymentMethod === 'card' && (
            <Box sx={{ color: '#92400e', fontSize: '0.75rem' }}>
              <div>• Cardholder name should not be empty</div>
              <div>• Card number should be 16 digits</div>
              <div>• Expiry date format: MM/YY</div>
              <div>• CVV should be 3–4 digits</div>
              <div>• Email required for order confirmation</div>
            </Box>
          )}

          {paymentMethod === 'upi' && (
            <Box sx={{ color: '#92400e', fontSize: '0.75rem' }}>
              <div>• Enter a valid UPI ID (example: name@bank)</div>
              <div>• Email required for order confirmation</div>
            </Box>
          )}

          {paymentMethod === 'wallet' && (
            <Box sx={{ color: '#92400e', fontSize: '0.75rem' }}>
              <div>• You will be redirected to wallet provider</div>
              <div>• Email required for order confirmation</div>
            </Box>
          )}
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>

          {/* Left: Form */}
          <Box>
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: '600' }}>Select Payment Method</Typography>
              <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} sx={{ mb: 3 }}>
                <FormControlLabel value="card" control={<Radio />} label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CreditCard fontSize="small" /> Credit/Debit Card
                  </Box>
                }/>
                <FormControlLabel value="upi" control={<Radio />} label="UPI Payment" />
                <FormControlLabel value="wallet" control={<Radio />} label="Digital Wallet" />
              </RadioGroup>
            </Card>

            <Card sx={{ p: 3 }}>
              <Box>
                {paymentMethod === 'card' && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Card Details</Typography>
                    <TextField fullWidth label="Cardholder Name" margin="normal" disabled={processing}/>
                    <TextField fullWidth label="Card Number" margin="normal" placeholder="1234 5678 9012 3456" disabled={processing}/>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 2 }}>
                      <TextField label="Expiry Date" margin="normal" placeholder="MM/YY" disabled={processing}/>
                      <TextField label="CVV" margin="normal" type="password" placeholder="123" disabled={processing}/>
                    </Box>
                  </Box>
                )}

                {paymentMethod === 'upi' && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>UPI Details</Typography>
                    <TextField fullWidth label="UPI ID" margin="normal" placeholder="username@bank" disabled={processing}/>
                  </Box>
                )}

                {paymentMethod === 'wallet' && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Digital Wallet</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                      You will be redirected to your wallet provider.
                    </Typography>
                  </Box>
                )}

                <TextField fullWidth label="Email" margin="normal" type="email"
                  helperText="We'll send order confirmation here"
                  disabled={processing}
                />

                {processing && (
                  <Box sx={{ p: 2, mt: 2, mb: 2, backgroundColor: '#dbeafe', borderRadius: '8px', textAlign: 'center' }}>
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }} style={{ fontSize: '24px', marginBottom: '8px' }}>
                      ⏳
                    </motion.div>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Processing...</Typography>
                  </Box>
                )}

                <motion.button
                  whileHover={{ scale: processing ? 1 : 1.02 }}
                  whileTap={{ scale: processing ? 1 : 0.98 }}
                  onClick={handlePayment}
                  disabled={processing}
                  style={{
                    width: '100%',
                    marginTop: '1.5rem',
                    padding: '12px',
                    backgroundColor: processing ? '#ccc' : '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: processing ? 'not-allowed' : 'pointer',
                  }}
                >
                  Pay {formatPrice(1999)}
                </motion.button>

                <Button fullWidth variant="outlined" onClick={() => navigate('/checkout')} disabled={processing} sx={{ mt: 1 }}>
                  Back to Checkout
                </Button>
              </Box>
            </Card>
          </Box>

          {/* Right: Static Order Summary */}
          <Box>
            <Card sx={{ p: 3, position: 'sticky', top: 100 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>📦 Order Summary</Typography>

              {/* Static Items */}
              <Box sx={{ mb: 3, borderBottom: '1px solid #eee', pb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{product?.name}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{formatPrice(product?.price)}</Typography>
                </Box>
              </Box>

              {/* Static Price Breakdown */}
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Subtotal:</Typography>
                  <Typography variant="body2">{formatPrice(product?.price)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2">Tax (18%):</Typography>
                  <Typography variant="body2">{formatPrice(product?.price * 0.18)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 2, borderTop: '2px solid #eee', borderBottom: '2px solid #eee' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Total:</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{formatPrice(product?.price + (product?.price * 0.18)*qty)}</Typography>
                </Box>
              </Box>

              {/* Static Secure Badge */}
              <Box sx={{ p: 2, backgroundColor: '#f0f9ff', borderRadius: '8px', textAlign: 'center', border: '1px solid #cce5ff' }}>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>🔒 Safe & Secure Payment</Typography>
              </Box>
            </Card>
          </Box>

        </div>
      </motion.div>
    </Container>
  );
}
