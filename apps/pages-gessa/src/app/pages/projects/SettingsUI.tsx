import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import AddMenu from './Setup/AddMenu';
import AddPages from './Setup/AddPage';
import AddTheme from './Setup/AddTheme';
export interface Props {
  closePopup: (data?: any) => void;
}

const SettingsUI = (props: Props) => {
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', height: '600px', flex: 100 }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Add Theme" value="1" sx={{ textTransform: 'none' }} />
            <Tab label="Add Pages" value="2" sx={{ textTransform: 'none' }} />
            <Tab label="Add Menus" value="3" sx={{ textTransform: 'none' }} />
          </TabList>
        </Box>
        <TabPanel value="1">
          <AddTheme />
        </TabPanel>
        <TabPanel value="2">
          <AddPages />
        </TabPanel>
        <TabPanel value="3">
          <AddMenu closePopup={() => props.closePopup()} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default SettingsUI;
