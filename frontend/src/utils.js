export async function makePostRequest(url, body) {
  const BASE_URL = "http://localhost:8000"; // Replace with your desired base URL

  const finalUrl = BASE_URL + url;

  try {
    const response = await fetch(finalUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    return null; // Or any value you want to return for error cases
  }
}
