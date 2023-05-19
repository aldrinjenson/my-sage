/* eslint-disable no-unused-vars */
import { useState } from "react";
import { endsWithValidExtension, makePostRequest, uploadFile } from "../utils";

const VALID_FILES = [".pdf", ".txt"];

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
  const [botName, setBotName] = useState("");
  const [botInitialDescription, setBotInitialDescription] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUrls((prevUrls) => ({ ...prevUrls, [name]: value }));
  };

  const handleFileInputChange = (e) => {
    console.log(e.target.files);
    setFiles(Array.from(e.target.files));
  };

  const handleUploadFile = async () => {
    const errors = [];
    if (
      Object.values(urls).some((url) => url.length && !url.startsWith("http"))
    ) {
      errors.push("Please enter valid URLS");
    }
    if (files.some((file) => !endsWithValidExtension(file.name))) {
      errors.push(`Currently, support is only for ${VALID_FILES} files.`);
    }

    // Display form errors, if any
    if (errors.length > 0) {
      console.log(errors.join("\n"));
      setFormError(errors.join("\n"));
      return;
    }
    setFormError("");

    await uploadFile(files[0], userId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlArray = Object.values(urls).filter((url) => url.length);
    try {
      const res = await makePostRequest("/train", {
        filename: files[0].name,
        urls: urlArray,
        userId,
        botName,
        botInitialDescription,
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-900'>
      <div className='bg-white rounded-lg p-8'>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div id='part1'>
            <h2 className='text-2xl text-gray-900 font-bold mb-4'>
              Add Data sources
            </h2>
            {formError && (
              <p
                className='text-red-500 mb-4'
                style={{ whiteSpace: "pre-line" }}
              >
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
          </div>
          <button
            disabled={isLoading}
            className='bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300'
          >
            Upload files
          </button>
          <br />
          <div id='part2'>
            <h2 className='text-2xl text-gray-900 font-bold mb-4'>
              Customize chatbot
            </h2>
            <div>
              <label htmlFor='botname'>Choose Your Bot Name</label>
              <input
                type='text'
                name='botname'
                required
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500'
              />
            </div>
            <div>
              <label htmlFor='botdesc'>
                Choose Initial Description for Bot{" "}
              </label>
              <input
                type='text'
                name='botdesc'
                required
                value={botInitialDescription}
                onChange={(e) => setBotInitialDescription(e.target.value)}
                className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500'
              />
            </div>
          </div>
          <button
            type='submit'
            disabled={isLoading}
            className='bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300'
          >
            Create Bot
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
