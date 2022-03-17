const airflowOpts = {
  baseUrl: process.env.AIRFLOW_URL,
  username: process.env.AIRFLOW_USERNAME,
  password: process.env.AIRFLOW_PASSWORD
}

const claimsServiceOpts = {
  baseUrl: process.env.CLAIMS_SERVICE_URL,
  username: process.env.CLAIMS_SERVICE_USERNAME,
  password: process.env.CLAIMS_SERVICE_PASSWORD
}

export const createApi = ({ baseUrl, username, password }) => (...args: Parameters<typeof fetch>) => {
  return fetch(`${baseUrl}/${args[0]}`, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
        'base64'
      )}`
    },
    ...args[1]
  });
};

export const api = createApi(claimsServiceOpts);
export const dagApi = createApi(airflowOpts);
