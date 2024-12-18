/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { AppProvider, DashboardLayout, PageContainer } from '@toolpad/core';
//import { AppProvider, DashboardLayout, PageContainer, Grid, PlaceHolder } from '@mui/toolpad-core';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import InsertChartIcon from '@mui/icons-material/InsertChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
// import { Grid } from '@mui/material';
import logo from './assets/logo.png'
import car1 from './assets/carimage1.jpg'
import car2 from './assets/carimage2.jpg'
import AddIcon from '@mui/icons-material/Add';
import DataGridBookings from './componants/DataGridDemo2'
import FullFeaturedCrudGrid from './componants/DataGridDemo1'
import DriverGrid from './componants/DataGridDemo5';
import LocationGrid from './componants/LocationCode';
import AssignGridBookings from './componants/Assign_Vehicle';
import HorizontalLinearStepper from './componants/Stepper_screen.jsx'
import CustomizedSteppers from './componants/Stepper_screen2.jsx'
import VerticalLinearStepper from './componants/Stepper_screen3.jsx'
import RegistrationStepper from './componants/Stepper_screen4.jsx'
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DataGridBooked from './componants/BookedVehicles.jsx';
import DataGridBookedVehicleUpdateStepper from './componants/BookedVehicleUpdateStepper.jsx';
// import { WidthFull } from '@mui/icons-material';
import './FullScreenImage.css'
const NAVIGATION = [
    { kind: 'header', title: 'Main items' },
    { segment: 'home', title: 'Home', icon: <HomeIcon /> },
    { segment: 'assign', title: 'Assign Vehicle', icon: <AssignmentIcon /> },
    { segment: 'dashboard', title: 'Release Bookings', icon: <DashboardIcon /> },
    { segment: 'update', title: 'Update Bookings', icon: <DashboardIcon /> },
    { kind: 'divider' },
    { kind: 'header', title: 'Miscellaneous' },
    // {
    //     segment: 'reports', title: 'Reports', icon: <InsertChartIcon />, children: [
    //         { segment: 'sales', title: 'Sales', icon: <DescriptionIcon /> },
    //         { segment: 'traffic', title: 'Traffic', icon: <DescriptionIcon /> },
    //     ]
    // },
    { segment: 'vehicle', title: 'Add Vehicle', icon: <DirectionsCarIcon /> },
    { segment: 'driver', title: 'Add Driver', icon: <PersonAddIcon /> },
    { segment: 'location', title: 'Add Location', icon: <AddLocationIcon /> },
    { segment: 'about', title: 'About Us', icon: <InfoIcon /> },
];

function Home() {
    return <div className={'image-container'} ><img src={car2} alt={'Car Image Here'} /></div>;
}
function Dashboard() {
    return <div>Welcome to the Dashboard Page!</div>;
}

function AboutUs() {
    return <div>About Us: We are a company dedicated to providing the best services.</div>;
}
function Orders() {
    return <div>Orders:Your Orders are Here</div>;
}

function DashboardLayoutBasic1(props) {
    const { window } = props;
    const [pathname, setPathname] = useState('/home');
    const [darkMode, setDarkMode] = useState(false);

    const router = React.useMemo(() => ({
        pathname,
        searchParams: new URLSearchParams(),
        navigate: (path) => setPathname(String(path)),
    }), [pathname]);

    const demoWindow = window !== undefined ? window() : undefined;

    // const theme = createTheme({
    //     palette: {
    //         mode: darkMode ? 'dark' : 'light',
    //     },
    // });
    const theme = createTheme({
        palette: {
            primary: {
                main: '#6200ea',
            },
            secondary: {
                main: '#03dac6',
            },
            background: {
                default: '#f5f5f5',
            },
        },
    });
    // const darkTheme = createTheme({
    //     palette: {
    //       mode: 'dark',
    //     },
    //   });


    const renderContent = () => {
        switch (pathname) {
            case '/home':
                return <Home />;
            case '/about':
                return <AboutUs />;
            case '/dashboard':
                // return <DataGridBookings></DataGridBookings>;
                return <DataGridBooked></DataGridBooked>;
            case '/assign':
              //  return <AssignGridBookings></AssignGridBookings>;
                // return <HorizontalLinearStepper></HorizontalLinearStepper>
              return <CustomizedSteppers></CustomizedSteppers>
            // return  <VerticalLinearStepper></VerticalLinearStepper>
            // return <RegistrationStepper></RegistrationStepper>
            case '/driver':
                return <DriverGrid />;
            case '/vehicle':
                return <FullFeaturedCrudGrid></FullFeaturedCrudGrid>;
            case '/location':
                return <LocationGrid></LocationGrid>;
            case '/update':
                return <DataGridBookedVehicleUpdateStepper></DataGridBookedVehicleUpdateStepper>

        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppProvider theme={theme} navigation={NAVIGATION} router={router} window={demoWindow} branding={{ title: "", logo: <img src={logo} alt="Custom Logo" />, }}>

                <DashboardLayout >

                    <PageContainer>
                        {/* <FormControlLabel
              control={<Switch checked={darkMode} onChange={handleThemeChange} />}
              label="Dark Mode"
            /> */}
                        {renderContent()}
                    </PageContainer>
                </DashboardLayout>

            </AppProvider>
        </ThemeProvider>
    );
}

export default DashboardLayoutBasic1;
