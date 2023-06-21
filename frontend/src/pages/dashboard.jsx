/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FaClipboard } from "react-icons/fa";
import { endsWithValidExtension, makePostRequest, uploadFile } from "../utils";
import useAuth from "../hooks/useAuth";
import {} from "@firebase/firestore";
import { addDoc, collection, getFirestore } from "@firebase/firestore";
import { firestore } from "../services/firebase";

const VALID_FILES = [".pdf", ".txt"];
const botId = "lxRQjIH7Zx5a61dHcsvK";

const Dashboard = () => {
  const [urls, setUrls] = useState({
    url1: "",
    url2: "",
    url3: "",
  });
  const user = useAuth();
  const [files, setFiles] = useState([]);
  const [formError, setFormError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [botName, setBotName] = useState("");
  const [botDomain, setBotDomain] = useState("");
  const [botInitialDescription, setBotInitialDescription] = useState("");
  const [embedData, setEmbedData] = useState("");
  const [userCopied, setUserCopied] = useState(false);
  const userId = user?.uid;

  const db = getFirestore();
  const botsCollectionRef = collection(db, "bots");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedData);
    setUserCopied(true);
    setTimeout(() => setUserCopied(false), 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUrls((prevUrls) => ({ ...prevUrls, [name]: value }));
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

    if (errors.length > 0) {
      console.log(errors.join("\n"));
      setFormError(errors.join("\n"));
      return;
    }
    setFormError("");
    setIsUploading(true);
    await uploadFile(files[0], userId);
    setIsUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlArray = Object.values(urls).filter((url) => url.length);
    setTimeout(() => {
      setEmbedData(
        `<script defer src="http://localhost:3000/chattemplate.js"></script>
    <script defer
      src="http://localhost:3000/api/chatscriptExtra?id=${userId}"
    ></script>`
      );
    }, 1200);
    try {
      const userRef = firestore.doc(`users/${userId}`);
      const newBot = {
        filename: files[0].name,
        urls: urlArray,
        userId,
        botName,
        botInitialDescription,
        personality: "",
        createdUser: userRef,
      };
      const res = await makePostRequest("/train", newBot);
      console.log(res);
      const addedBot = await addDoc(botsCollectionRef, newBot);
      console.log({ addedBot });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {});

  return (
    <div className='flex items-center justify-center h-screen bg-gray-900'>
      <div className='bg-white rounded-lg p-8'>
        <h2 className='text-4xl text-gray-900 font-bold mb-4'>
          Hello {user?.displayName}
        </h2>
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
                placeholder='https://en.wikipedia.org/wiki/Maze_Runner_(film_series)'
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
                placeholder='https://en.wikipedia.org/wiki/Artificial_intelligence'
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
                onChange={(e) => setFiles(Array.from(e.target.files))}
                className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500'
              />
            </div>
          </div>
          <button
            type='button'
            onClick={handleUploadFile}
            disabled={isUploading}
            className={`bg-blue-500 ${
              isUploading && "bg-gray-500"
            } text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300`}
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
              <textarea
                type='text'
                name='botdesc'
                required
                placeholder='Hi, I am the constitute bot. Ask me about Constitution of India'
                value={botInitialDescription}
                onChange={(e) => setBotInitialDescription(e.target.value)}
                className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500'
              />
            </div>
            {/* <div>
              <label htmlFor='botdomain'>
                Your Website domain(The domain where the chatbot will be
                deployed)
              </label>
              <textarea
                type='text'
                name='botdomain'
                required
                placeholder='example.com'
                value={botDomain}
                onChange={(e) => setBotDomain(e.target.value)}
                className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500'
              />
            </div> */}
          </div>
          <button
            type='submit'
            disabled={isCreating}
            className={`${
              isCreating ? "bg-gray-200" : "bg-blue-500"
            } text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300`}
          >
            Create Bot
          </button>
        </form>

        {embedData?.length ? (
          <div>
            <p>Bot is being created..</p>
            <span>
              Copy and paste the following script tags to your website to get a
              custom chatbot working!
            </span>
            <div className='border border-gray-300 rounded p-4'>
              {userCopied && (
                <p className='text-xs text-green-500 mt-2'>
                  Code copied to clipboard!
                </p>
              )}
              <div className='relative'>
                <pre className='overflow-auto whitespace-pre-line text-sm'>
                  {embedData}
                </pre>
                <button
                  className='absolute top-2 right-2 text-gray-500 focus:outline-none'
                  onClick={copyToClipboard}
                >
                  <FaClipboard size={16} />
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
