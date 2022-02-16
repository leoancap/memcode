export const request = {
  post: async (url: string, body: any, config = {}) => {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      ...config,
    });
    const data = response.json();
    return data;
  },
};
