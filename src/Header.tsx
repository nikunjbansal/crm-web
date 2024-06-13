import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import { styled } from '@mui/system';
import { NavLink, useLocation } from 'react-router-dom';

const pages = [
  { label: 'Non Profits', path: '/non-profits' },
  { label: 'Email Template', path: '/email-template' },
  { label: 'Sent Emails', path: '/sent-emails' },
];

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#1976d2', // Adjust as needed
});

const LogoTypography = styled(Typography)({
  alignItems: 'center',
  fontWeight: 700,
  fontFamily: 'monospace',
  letterSpacing: '0.3rem',
  color: 'inherit',
  textDecoration: 'none',
  marginRight: '12px', // Adjust margin as needed
});

const StyledLink = styled(NavLink)({
  color: 'inherit',
  marginRight: '16px',
});

const Header = () => {
  
  const location = useLocation()

  console.log("location", location.pathname);

  return (
    <StyledAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <LogoTypography variant="h6">
            CRM
          </LogoTypography>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 3 }}>
            {pages.map((page) => (
              <StyledLink 
                key={page.label} 
                to={page.path} 
                style={({ isActive, isPending, isTransitioning }) => {
                  return {
                    textDecoration: isActive ? 'underline' : 'none'
                  };
                }}
              >
                {page.label}
              </StyledLink>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Header;
