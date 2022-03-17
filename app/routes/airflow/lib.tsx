import { GridRenderCellParams } from '@mui/x-data-grid';
import { Link } from '@mui/material';

const generateLink = (param: GridRenderCellParams) => {
  return <Link href={'https://github.com/'}>{param.row.logs}</Link>;
};

export const isSuccessful = (total: string): boolean => {
  const num = Number(total.replace(/[^0-9.-]+/g, ''));

  return num > 0;
};

export default generateLink;
