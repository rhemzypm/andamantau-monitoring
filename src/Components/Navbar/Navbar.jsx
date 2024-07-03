import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import './Navbar.css'; 

export default function Navbar() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className="bottom-navigation" 
      >
        <BottomNavigationAction label="Dashboard" icon={<HomeIcon />} />
        <BottomNavigationAction label="Pengaturan" icon={<SettingsIcon />} />
      </BottomNavigation>
    </Box>
  );
}
