export default async function fetchSearchResults(query) {
  try {
    const response = await fetch("http://localhost:3000/content/search", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: query }),
    });

    if (!response.ok) {
      console.error("Failed to fetch:", response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    return data.result || [];
  } catch (error) {
    console.error("Search API error:", error);
    return [];
  }
}
