const dev = process.env.NODE_ENV !== "production"
export const fetchGql = async (
  query: string,
  url = dev ? "http://localhost:4000/be" : "https://memcode.leoancap.now.sh/be",
) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      query,
    }),
  })
  const data = await res.json()
  return { ...data }
}
