import { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Autocomplete,
  TextField,
  Button,
  Grid,
  Box,
  FormLabel
} from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';

import { json, useLoaderData } from 'remix';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

export const loader = async () => {
  return json({
    modes: ['preview', 'submisison'],
    partnerships: [
      {
        "id": 1,
        "name": "HCSC"
      },
      {
        "id": 2,
        "name": "CVS"
      },
      {
        "id": 3,
        "name": "Aetna"
      },
      {
        "id": 7,
        "name": "BCBSAL"
      },
      {
        "id": 9,
        "name": "BCBSMA"
      },
      {
        "id": 10,
        "name": "UnitedHealthcare"
      },
      {
        "id": 13,
        "name": "HealthNow"
      },
      {
        "id": 12,
        "name": "Meritain"
      },
      {
        "id": 14,
        "name": "SurgeryPlus"
      },
      {
        "id": 4,
        "name": "Welltok"
      },
      {
        "id": 5,
        "name": "Castlight"
      },
      {
        "id": 6,
        "name": "Virgin Pulse"
      },
      {
        "id": 11,
        "name": "Evive"
      },
      {
        "id": 15,
        "name": "Anthem"
      },
      {
        "id": 17,
        "name": "ESI"
      },
      {
        "id": 18,
        "name": "Carrum"
      },
      {
        "id": 19,
        "name": "BCBSMN"
      },
      {
        "id": 20,
        "name": "Mercer HTC"
      },
      {
        "id": 21,
        "name": "Employer Health Network (EHN)"
      },
      {
        "id": 23,
        "name": "Trustmark"
      },
      {
        "id": 24,
        "name": "BCBSAZ"
      },
      {
        "id": 25,
        "name": "Accolade"
      },
      {
        "id": 16,
        "name": "Cambia"
      }
    ],
    clients: [
      { id: 1, name: 'Post' },
      { id: 2, name: 'Amazon' },
      { id: 3, name: 'UPS' }
    ],
    insurers: [
      { id: 1, name: 'Cigna' },
      { id: 2, name: 'UMR' },
      { id: 3, name: 'Aetna' },
      { id: 4, name: 'UnitedHealthcare' },
      { id: 5, name: 'Fidelity' },
    ],
    billingTypes: [
      {
        id: 1,
        name: 'claims'
      },
      {
        id: 2,
        name: 'invoices'
      }
    ],
    claimTypes: ['chronic', 'acute']
  });
}

function CustomAutoComplete({ options, formId, fieldLabel }) {
  return (
    <Autocomplete
      id={formId}
      options={options}
      autoHighlight
      getOptionLabel={(option) => {
        return option.name
      }}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          required
          label={fieldLabel}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

function BillingCycle({ mode }) {
  const [value, setValue] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {mode === 'preview' ? [...Array(3).keys()].map(i => {
        return (
          <DatePicker
            key={i}
            required={i === 0}
            label="Billing Cycle"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />);
      })
        :
        <DatePicker
          required
          label="Billing Cycle"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      }
    </LocalizationProvider>
  );
}


const Submit = () => {
  const data = useLoaderData();
  const [mode, setMode] = useState('preview');
  const handleModeChange = (ev) => {
    setMode(ev.target.value);
  }

  const [billingType, setBillingType] = useState('');
  const handleBillingTypeChange = (ev) => {
    setBillingType(ev.target.value);
  }

  const [claimType, setClaimType] = useState('');
  const handleClaimTypeChange = (ev) => {
    setClaimType(ev.target.value);
  }

  return (
    <div>
      <Box sx={{ paddingBottom: 3 }}>
        <Typography variant='h6' component='h2'>
          Billing Submission
        </Typography>
        <Typography variant='p' component='p'>
          Manual claims will be run via Airflow service
        </Typography>
      </Box>
      <form style={{ width: 800 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <FormControl required fullWidth>
              <InputLabel>Mode</InputLabel>
              <Select
                labelId="mode-select-label"
                id="mode-select"
                value={mode}
                label="Mode"
                onChange={handleModeChange}
              >
                {data.modes.map(m =>
                  <MenuItem key={m} value={m}>{m}</MenuItem>
                )}
              </Select>
              <FormLabel error color='warning'>Submission Mode may send PHI externally - please run Preview Mode first to confirm parameters!</FormLabel>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <CustomAutoComplete options={data.partnerships} fieldLabel="Choose a partnership" formId="partnership-select" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <CustomAutoComplete options={data.clients} fieldLabel="Choose a client" formId="client-select" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <CustomAutoComplete options={data.insurers} fieldLabel="Choose an insurer" formId="insurer-select" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl required fullWidth>
              <InputLabel>Billing Type</InputLabel>
              <Select
                labelId="billing-select-label"
                id="billing-select"
                value={billingType}
                label="Billing Type"
                onChange={handleBillingTypeChange}
              >
                {data.billingTypes.map(m =>
                  <MenuItem key={m.id} value={m.name}>{m.name}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <BillingCycle mode={mode} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <InputLabel>Claim Type</InputLabel>
              <Select
                labelId="claim-select-label"
                id="claim-select"
                value={claimType}
                label="Claim Type"
                onChange={handleClaimTypeChange}
              >
                {data.claimTypes.map(m =>
                  <MenuItem key={m} value={m}>{m}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="outlined-number"
              label="Claims Limit"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          `
          <Grid item xs={12} sm={12} justifyContent='flex-end' alignItems='flex-end'>
            <Button variant="contained">Run</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
};

export default Submit;
