import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination
} from '@mui/material';
import { useState } from 'react';
import { json, useLoaderData, useNavigate, useSearchParams } from 'remix';
import { api } from '~/api';

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page'), 10) || 0;
  const pageSize = parseInt(url.searchParams.get('pageSize'), 10) || 20;
  const skip = (page * pageSize);
  const claimsData = await api(`api/v0/claims?skip=${skip}&limit=${pageSize}`, {
    method: 'GET'
  });
  const total = await api('api/v0/claims/total');
  const totalJSON = await total.json();
  const data = await claimsData.json();

  console.log(`Skipping: ${skip}`);

  return json({
    total: totalJSON.total,
    claims: data
  });
};

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'charge', label: 'Charge' }
];

const ClaimsTable = ({ claims, total }) => {
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const handlePageChange = (event, newPage: number) => {
    nav(`?page=${newPage}&pageSize=${rowsPerPage}`);
  };
  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page'), 10);
  const toRender = claims;

  return (
    <Paper>
      <TableContainer>
        <Table size='small' stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map(c => (
                <TableCell key={c.id}>{c.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {toRender.map(c => (
              <TableRow key={c.id}>
                <TableCell>{c.claimIdentifier}</TableCell>
                <TableCell>{c.charge}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[20]}
        component='div'
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Paper>
  );
};

const Claims = () => {
  const data = useLoaderData();
  return (
    <ClaimsTable claims={data.claims} total={data.total}/>
  );
};

export default Claims;
