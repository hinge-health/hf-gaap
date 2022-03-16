import { json, useLoaderData } from 'remix';

export const loader = async ({ params }) => {
  console.log(params);

// TODO: Fetch details about invoice by id

  return json({ id: params.id });
};

const Invoice = () => {
  const data = useLoaderData();

  return <div>Invoice: {data.id}</div>;
};

export default Invoice;
