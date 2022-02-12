export const request = {
  post: async (url: string, body: any) => {
    const rawResponse = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      method: "POST",
      body: JSON.stringify(body),
    });
    const res = await rawResponse.json();
    return res;
  },
};
