export async function getConfigurationQuery() {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/_allauth/browser/v1/config`,
    { credentials: "include" },
  );
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(JSON.stringify(responseData));
  }
  return responseData;
}
