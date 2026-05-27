import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const footerSections = [
    {
      title: 'About Us',
      links: ['Our Story', 'Careers', 'Press', 'Blog'],
    },
    {
      title: 'Help',
      links: ['Contact Us', 'FAQ', 'Shipping Info', 'Returns'],
    },
    {
      title: 'Policies',
      links: ['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Cookie Policy'],
    },
    {
      title: 'Follow Us',
      links: ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'],
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        color: 'white',
        marginTop: '4rem',
        padding: '3rem 0 1rem',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ marginBottom: '2rem' }}>
          {footerSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{ width: '25%' }}
            >
              <Typography variant="h6" sx={{ marginBottom: '1rem', fontWeight: '600' }}>
                {section.title}
              </Typography>
              {section.title === 'Follow Us' ? (
                <Box sx={{ display: 'flex', gap: '1rem', fontSize: '1.5rem' }}>
                  <FaFacebook className="transition cursor-pointer hover:text-blue-400" />
                  <FaTwitter className="transition cursor-pointer hover:text-blue-400" />
                  <FaInstagram className="transition cursor-pointer hover:text-pink-400" />
                  <FaLinkedin className="transition cursor-pointer hover:text-blue-500" />
                </Box>
              ) : (
                <Box component="ul" sx={{ listStyle: 'none', padding: 0 }}>
                  {section.links.map((link, idx) => (
                    <Typography
                      key={idx}
                      component="li"
                      sx={{
                        marginBottom: '0.5rem',
                        cursor: 'pointer',
                        '&:hover': { color: '#667eea', textDecoration: 'underline' },
                      }}
                    >
                      {link}
                    </Typography>
                  ))}
                </Box>
              )}
            </motion.div>
          ))}
        </Grid>

        <Box
          sx={{
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            paddingTop: '2rem',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ marginBottom: '0.5rem' }}>
            © 2024 FlipCart. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Made with ❤️ by Development Team
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
