/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, TextField, Box } from '@mui/material';

const steps = ['Personal Information', 'Education', 'Experience'];

const RegistrationStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({
    personalInfo: { name: '', email: '', phone: '' },
    education: { school: '', degree: '', year: '' },
    experience: { company: '', role: '', duration: '' },
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (step, field) => (event) => {
    setFormValues({
      ...formValues,
      [step]: {
        ...formValues[step],
        [field]: event.target.value,
      },
    });
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <TextField
              label="Name"
              value={formValues.personalInfo.name}
              onChange={handleChange('personalInfo', 'name')}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              value={formValues.personalInfo.email}
              onChange={handleChange('personalInfo', 'email')}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone"
              value={formValues.personalInfo.phone}
              onChange={handleChange('personalInfo', 'phone')}
              fullWidth
              margin="normal"
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <TextField
              label="School"
              value={formValues.education.school}
              onChange={handleChange('education', 'school')}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Degree"
              value={formValues.education.degree}
              onChange={handleChange('education', 'degree')}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Year"
              value={formValues.education.year}
              onChange={handleChange('education', 'year')}
              fullWidth
              margin="normal"
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <TextField
              label="Company"
              value={formValues.experience.company}
              onChange={handleChange('experience', 'company')}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Role"
              value={formValues.experience.role}
              onChange={handleChange('experience', 'role')}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Duration"
              value={formValues.experience.duration}
              onChange={handleChange('experience', 'duration')}
              fullWidth
              margin="normal"
            />
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box>
        {renderStepContent(activeStep)}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
          >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RegistrationStepper;
