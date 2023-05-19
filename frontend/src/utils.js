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

// FileUploader.js

const VALID_FILES = [".pdf", ".txt"];

export function endsWithValidExtension(fileName) {
  const extension = fileName.split(".").pop();
  return VALID_FILES.includes("." + extension);
}

export async function uploadFile(file) {
  const API_URL = "http://localhost:8000";

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log("File uploaded successfully:", data);
    } else {
      throw new Error(`Error uploading file: ${response.status}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
