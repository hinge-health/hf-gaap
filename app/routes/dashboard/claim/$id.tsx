import { useLoaderData, json } from 'remix';

export const loader = async ({ params }) => {
  console.log(params);

  // TODO: Fetch details about claim by id

  return json({ id: params.id });
};

const Claim = () => {
  const data = useLoaderData();

  return <div>Claim: {data.id}</div>;
};

export default Claim;
