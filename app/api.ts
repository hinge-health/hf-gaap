export const api = (...args: Parameters<typeof fetch>) => {
  const baseUrl = process.env.CLAIMS_SERVICE_URL;
  const username = process.env.CLAIMS_SERVICE_USERNAME;
  const password = process.env.CLAIMS_SERVICE_PASSWORD;

  return fetch(`${baseUrl}/${args[0]}`, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
        'base64'
      )}`
    },
    ...args[1]
  });
};