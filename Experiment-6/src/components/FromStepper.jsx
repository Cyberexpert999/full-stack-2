import React from 'react';
import { Stepper, Step, StepLabel, Box, Button, Paper } from '@mui/material';
import { Check } from '@mui/icons-material';

const steps = ['Personal Info', 'Contact Info', 'Preferences', 'Review'];

const FormStepper = ({ activeStep, handleNext, handleBack, handleReset, isStepValid }) => {
  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} completed={activeStep > index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          
          <Box>
            {activeStep === steps.length - 1 ? (
              <>
                <Button
                  onClick={handleReset}
                  variant="outlined"
                  sx={{ mr: 1 }}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<Check />}
                  onClick={handleNext}
                >
                  Submit
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!isStepValid}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default FormStepper;