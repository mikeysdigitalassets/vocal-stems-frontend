import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  const [processing, setProcessing] = useState<boolean>(false);
  const [vocalsChecked] = useState<boolean>(true); // default checked, no longer doing types
  // const [instrumentalsChecked, setInstrumentalsChecked] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setProcessing(true);
  setErrorMessage(null);

  // no longer doing checkboxes
  // if (!vocalsChecked && !instrumentalsChecked) {
  //   setErrorMessage('Please select at least one option: Vocals or Instrumentals.');
  //   setProcessing(false);
  //   return;
  // }

  try {
    // no longer having type options, just leaving here so i dont have to refactor
    const types = [];
    if (vocalsChecked) types.push('vocals');
    // if (instrumentalsChecked) types.push('instrumentals'); -> no longer doing types

    const response = await axios.post(
      'https://18.214.117.84/api/isolate-vocals',
      { url: youtubeUrl, types },
      { withCredentials: true, responseType: 'blob' } // set response type to 'blob' to handle binary data
    );

    // create a blob from the response
    const blob = new Blob([response.data], { type: 'audio/wav' });
    const downloadUrl = window.URL.createObjectURL(blob);

    // create a temporary link to download the file
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', 'isolated_track.wav'); // Set the file name
    document.body.appendChild(link);
    link.click();
    link.remove(); // Clean up

  } catch  {
    setErrorMessage('Failed to process the URL.');
  } finally {
    setProcessing(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* support Ukraine  */}
      <div className="mt-12 lg:mt-0 lg:ml-0 flex flex-col items-center">
        <div className="ukraine mb-4">
          <a href="https://war.ukraine.ua/support-ukraine/">
            <svg
              width="100"
              height="100"
              viewBox="-82.5 0 165 230.5"
              fill="#ffd500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-81.25 1.25h162.5v172.5a31.25 31.25 0 0 1-18.578029 28.565428L0 228.867475l-62.671971-27.802047A31.25 31.25 0 0 1-81.25 172.5z"
                fill="#005bbb"
                stroke="#ffd500"
                strokeWidth="2.5"
              />
              <path
                d="M5.985561 78.82382a104.079383 104.079383 0 0 0 14.053598 56.017033 55 55 0 0 1-13.218774 70.637179A20 20 0 0 0 0 212.5a20 20 0 0 0-6.820384-7.021968 55 55 0 0 1-13.218774-70.637179A104.079383 104.079383 0 0 0-5.98556 78.82382l-1.599642-45.260519A30.103986 30.103986 0 0 1 0 12.5a30.103986 30.103986 0 0 1 7.585202 21.063301zM5 193.624749a45 45 0 0 0 6.395675-53.75496A114.079383 114.079383 0 0 1 0 112.734179a114.079383 114.079383 0 0 1-11.395675 27.13561A45 45 0 0 0-5 193.624749V162.5H5z"
              />
              <path
                id="a"
                d="M27.779818 75.17546A62.64982 62.64982 0 0 1 60 27.5v145H0l-5-10a22.5 22.5 0 0 1 17.560976-21.95122l14.634147-3.292683a10 10 0 1 0-4.427443-19.503751zm5.998315 34.353887a20 20 0 0 1-4.387889 37.482848l-14.634146 3.292683A12.5 12.5 0 0 0 5 162.5h45V48.265462a52.64982 52.64982 0 0 0-12.283879 28.037802zM42 122.5h10v10H42z"
              />
              <use href="#a" transform="scale(-1 1)" />
            </svg>
          </a>
        </div>
        <a href="https://war.ukraine.ua/support-ukraine/" className="text-indigo-600 hover:text-indigo-800 font-bold">
          Support Ukraine!❤️
        </a>
      </div>
        <div>
          <h1 className="text-4xl font-extrabold text-center text-gray-900">Isolate track vocals!</h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter a YouTube URL to isolate the vocals from a song.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="youtubeUrl" className="sr-only">
                YouTube URL
              </label>
              <input
                id="youtubeUrl"
                name="youtubeUrl"
                type="url"
                required
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter YouTube URL"
              />
            </div>
          </div>

          

          <div>
            <button
              type="submit"
              disabled={processing}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                processing ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {processing ? 'Processing...' : 'Isolate Vocals'}
            </button>
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Home;
