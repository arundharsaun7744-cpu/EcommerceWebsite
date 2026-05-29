import { Box, Container, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  const footerSections = [
    {
      title: "About Us",
      links: ["Our Story", "Careers", "Press", "Blog"],
    },
    {
      title: "Help",
      links: ["Contact Us", "FAQ", "Shipping Info", "Returns"],
    },
    {
      title: "Policies",
      links: [
        "Privacy Policy",
        "Terms of Service",
        "Refund Policy",
        "Cookie Policy",
      ],
    },
    {
      title: "Follow Us",
      links: ["Facebook", "Twitter", "Instagram", "LinkedIn"],
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(135deg, #0f172a 0%, #111827 100%)",
        color: "white",
        pt: { xs: 4, sm: 5, md: 6 },
        pb: { xs: 2, sm: 3 },
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 3, sm: 4, md: 5 }}
          sx={{
            mb: { xs: 3, sm: 4 },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          {footerSections.map((section, index) => (
            <Grid item xs={6} sm={6} md={3} key={section.title}>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: { xs: 1.2, sm: 1.8 },
                    fontWeight: 800,
                    fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.15rem" },
                    letterSpacing: "0.2px",
                  }}
                >
                  {section.title}
                </Typography>
                {section.title === "Follow Us" ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: { xs: "center", sm: "flex-start" },
                      gap: { xs: 1.5, sm: 2 },
                      fontSize: { xs: "1.25rem", sm: "1.45rem" },
                      mt: { xs: 1, sm: 0 },
                    }}
                  >
                    <FaFacebook className="transition cursor-pointer hover:text-blue-400" />
                    <FaTwitter className="transition cursor-pointer hover:text-blue-400" />
                    <FaInstagram className="transition cursor-pointer hover:text-pink-400" />
                    <FaLinkedin className="transition cursor-pointer hover:text-blue-500" />
                  </Box>
                ) : (
                  <Box
                    component="ul"
                    sx={{
                      listStyle: "none",
                      p: 0,
                      m: 0,
                    }}
                  >
                    {section.links.map((link) => (
                      <Typography
                        key={link}
                        component="li"
                        sx={{
                          mb: { xs: 0.7, sm: 0.9 },
                          cursor: "pointer",
                          fontSize: { xs: "0.78rem", sm: "0.9rem" },
                          color: "rgba(255,255,255,0.72)",
                          transition: "0.2s ease",
                          "&:hover": {
                            color: "#93c5fd",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        {link}
                      </Typography>
                    ))}
                  </Box>
                )}
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            pt: { xs: 2, sm: 3 },
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              mb: 0.7,
              fontSize: { xs: "0.75rem", sm: "0.85rem" },
              color: "rgba(255,255,255,0.9)",
            }}
          >
            © 2024 FlipCart. All rights reserved.
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: { xs: "0.72rem", sm: "0.82rem" },
            }}
          >
            Made with ❤️ by Development Team
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;