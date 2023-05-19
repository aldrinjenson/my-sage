import { useState } from "react";

const VALID_FILES = [".pdf", ".txt"];
const endsWithValidExtension = (fileName) => {
  const extension = fileName.split(".").pop();
  return VALID_FILES.includes("." + extension);
};

const API_URL = "http://localhost:8000";

const uploadFile = async (file, userId) => {
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
      console.log("Error uploading file:", response.status);
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

const uploadDataAndTrain = async (file, urlArray, userId) => {
  const fileName = file.name;
  console.log(fileName);
};

const Dashboard = () => {
  const [urls, setUrls] = useState({
    url1: "",
    url2: "",
    url3: "",
  });
  const [userId, setUserId] = useState("1234");
  const [files, setFiles] = useState([]);
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUrls((prevUrls) => ({ ...prevUrls, [name]: value }));
  };

  const handleFileInputChange = (e) => {
    console.log(e.target.files);
    setFiles(e.target.files);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errors = [];
    if (
      Object.values(urls).some((url) => url.length && !url.startsWith("http"))
    ) {
      errors.push("Please enter valid URLS");
    }
    if (Array.from(files).some((file) => !endsWithValidExtension(file.name))) {
      errors.push(`Currently, support is only for ${VALID_FILES} files.`);
    }

    // Display form errors, if any
    if (errors.length > 0) {
      console.log(errors.join("\n"));
      setFormError(errors.join("\n"));
      return;
    }
    const urlArray = Object.values(urls).filter((url) => url.length);

    await uploadFile(files[0], userId);
    await uploadDataAndTrain(files[0], urlArray, userId);

    // Process the form data
    // Add your logic here

    // Reset the form
    // setUrls({ url1: "", url2: "", url3: "" });
    // setFiles([]);
    setFormError("");
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-900'>
      <div className='bg-white rounded-lg p-8'>
        <h2 className='text-2xl text-gray-900 font-bold mb-4'>
          Add Data sources
        </h2>
        <form className='space-y-4' onSubmit={handleFormSubmit}>
          {formError && (
            <p className='text-red-500 mb-4' style={{ whiteSpace: "pre-line" }}>
              {formError}
            </p>
          )}
          <div>
            <label className='block text-gray-900 font-medium mb-2'>
              URL 1
            </label>
            <input
              type='text'
              name='url1'
              value={urls.url1}
              onChange={handleInputChange}
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500'
              required
            />
          </div>
          <div>
            <input
              type='text'
              name='url2'
              value={urls.url2}
              onChange={handleInputChange}
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500'
            />
          </div>
          <div>
            <input
              type='text'
              name='url3'
              value={urls.url3}
              onChange={handleInputChange}
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500'
            />
          </div>
          <div>
            <label className='block text-gray-900 font-medium mb-2'>
              Select Files
            </label>
            <input
              type='file'
              onChange={handleFileInputChange}
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500'
            />
          </div>
          <button
            type='submit'
            disabled={isLoading}
            className='bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300'
          >
            Upload and Process
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
