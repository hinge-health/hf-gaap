import { Typography } from '@mui/material';

interface Error {
  code: number;
  message: string;
}

const ErrorMessage = ({ code, message }: Error) => {
  return (
    <>
      <Typography>
        Recieved a ${code} Error.
        <>{message}</>
      </Typography>
    </>
  );
};

export default ErrorMessage;
