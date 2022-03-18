import { Button, Typography } from '@mui/material';

const renderErrorName = (name: Error['name']) => {
  return (
    <>
      <Typography variant={'h6'}>error name:</Typography>
      {/* <br /> */}
      {name}
    </>
  );
};

const renderErrorStack = (stack: Error['stack']) => {
  return (
    <>
      <Typography variant={'h6'}>the error's stack trace:</Typography>
      {stack}
    </>
  );
};

const ErrorMessage = ({
  error,
  handleClear
}: {
  error: Error;
  handleClear: () => unknown;
}) => {
  const errHeader = 'Error getting Billing results';
  return (
    <>
      <Typography
        variant={'h4'}
        sx={{
          color: '#F44336'
        }}
      >
        {errHeader}
      </Typography>

      <Button></Button>

      {error.name && renderErrorName(error.name)}

      <br />
      <br />
      {error.stack && renderErrorStack(error.stack)}
    </>
  );
};

export default ErrorMessage;
