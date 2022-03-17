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

import { json, useLoaderData, useTransition, Form } from 'remix';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { api, dagApi } from '~/api';

const DAG_ID = "generate_bills";

function formatDagPayload(data) {
  return {
    billing_cycle: data.billingCycle,
    mode: data.mode,
    claim_type: data.claimType,
    limit: parseInt(data.claimsLimit, 10),
    insurer_id: parseInt(data.insurer, 10),
    client: data.client,
    partnership: data.partnership,
    billing_type: data.billingType
  };
}

// action that handles form submission
export const action = async ({
  request,
}) => {
  const formData = await request.formData();
  const deserializedData = Object.fromEntries(formData)
  const newDagPayload = formatDagPayload(deserializedData);

  console.log(newDagPayload);

  const newDag = await api(`api/v0/submissions/submit/${DAG_ID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newDagPayload)
  });
  console.log(await newDag.json());
  // change return value to redirect location
  return '/billing-tool';
};

export const loader = async () => {
  const [partnershipsReq, clientsReq, insurersReq] = await Promise.all([
    api('api/v0/entities/partnerships', {
      method: 'GET'
    }),
    api('api/v0/entities/clients', {
      method: 'GET'
    }),
    api('api/v0/entities/insurers', {
      method: 'GET'
    })
  ]);

  const [partnerships, clients, insurers] = await Promise.all([
    partnershipsReq.json(),
    clientsReq.json(),
    insurersReq.json()
  ]);

  return json({
    modes: ['preview', 'submission'],
    partnerships,
    clients,
    insurers,
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

function CustomAutoComplete({ name, options, formId, fieldLabel, valueField }) {
  return (
    <Autocomplete
      autoHighlight
      id={formId}
      options={options}
      getOptionLabel={(option) => {
        if (valueField) {
          return option[valueField];
        }
        return option.name;
      }}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {option.name}
        </Box>
      )}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            required
            name={name}
            label={fieldLabel}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        );
      }}
    />
  );
}

function BillingCycle({ mode }) {
  const [value, setValue] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Billing Cycle"
        value={value}
        inputFormat='yyyy-MM-dd'
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField required name="billingCycle" {...params} />}
      />
    </LocalizationProvider>
  );
}


const BillingTool = () => {
  const data = useLoaderData();
  const transition = useTransition();
  const [formState, setFormState] = useState({
    mode: 'preview'
  });

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    setFormState({
      [name]: value
    });
  }

  return (
    <div>
      <Box sx={{ paddingBottom: 3 }}>
        <Typography variant='h6' component='h2'>
          Billing Tool
        </Typography>
        <Typography variant='p' component='p'>
          Manual claims will be run via Airflow service
        </Typography>
      </Box>
      <Form method="post" style={{ width: 800 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <FormControl required fullWidth>
              <InputLabel>Mode</InputLabel>
              <Select
                labelId="mode-select-label"
                id="mode-select"
                name="mode"
                value={formState.mode}
                label="Mode"
                onChange={handleInputChange}
              >
                {data.modes.map(m =>
                  <MenuItem key={m} value={m}>{m}</MenuItem>
                )}
              </Select>
              <FormLabel error color='warning'>Submission Mode may send PHI externally - please run Preview Mode first to confirm parameters!</FormLabel>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <CustomAutoComplete options={data.partnerships} name="partnership" fieldLabel="Choose a partnership" formId="partnership-select" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <CustomAutoComplete options={data.clients} valueField='identifier' name="client" fieldLabel="Choose a client" formId="client-select" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <CustomAutoComplete options={data.insurers} valueField='id' name="insurer" fieldLabel="Choose an insurer" formId="insurer-select" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl required fullWidth>
              <InputLabel>Billing Type</InputLabel>
              <Select
                labelId="billing-select-label"
                id="billing-select"
                value={formState.billingType}
                name="billingType"
                label="Billing Type"
                onChange={handleInputChange}
              >
                {data.billingTypes.map(m =>
                  <MenuItem key={m.id} value={m.name}>{m.name}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <BillingCycle mode={formState.mode} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <InputLabel>Claim Type</InputLabel>
              <Select
                labelId="claim-select-label"
                id="claim-select"
                name="claimType"
                value={formState.claimType}
                label="Claim Type"
                onChange={handleInputChange}
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
              name="claimsLimit"
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} justifyContent='flex-end' alignItems='flex-end'>
            <Button type='submit' variant='contained' disabled={transition.state === 'submitting'}>Run</Button>
          </Grid>
        </Grid>
      </Form>
    </div>
  )
};

export default BillingTool;
