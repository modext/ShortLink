"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState(null);
  const [allUrls, setAllUrls] = useState([]);
  const [visibleStatsPath, setVisibleStatsPath] = useState('');
  const [decodedUrl, setDecodedUrl] = useState('');

  function ensureHttpScheme(url) {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  }

  const handleShortenUrl = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:8000/encode', { originalUrl });
      setShortUrl(data.shortUrl);
      setError('');
      setStats(null); 
      await fetchAllUrls(); 
    } catch (err) {
      setError('Failed to shorten URL');
    }
  };
  const handleDecodeShortUrl = async (shortUrlPath) => {
    try {
        const shortUrl = `http://short.url/${shortUrlPath}`;
        const { data } = await axios.post('http://localhost:8000/decode', { shortUrl });
        setDecodedUrl(data.originalUrl);
    } catch (error) {
        setError('Failed to decode URL');
        setDecodedUrl('');
    }
};

  const handleFetchStats = async (shortUrlPath) => {
    if (visibleStatsPath === shortUrlPath) {
      setVisibleStatsPath(null);
      setStats(null);
      return;
    }

    try {
      const { data } = await axios.get(`http://localhost:8000/statistic/${shortUrlPath}`);
      setStats(data.stats);
      setVisibleStatsPath(shortUrlPath); 
    } catch (error) {
      setError('Failed to fetch statistics');
      setStats(null);
    }
  };

  const fetchAllUrls = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/urls');
      setAllUrls(data);
    } catch (error) {
      setError('Failed to fetch URLs');
    }
  };

  useEffect(() => {
    fetchAllUrls();
  }, []);

  return (
    <div className="max-w-lg mx-auto my-10 p-5 border rounded shadow-lg">
      <h1 className="text-3xl font-bold mb-4">URL Shortener</h1>
      <form onSubmit={handleShortenUrl} className="mb-4">
        <input
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter URL"
          required
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button type="submit" className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Shorten
        </button>
      </form>
      {shortUrl && (
        <>
          <p>Short URL: <a href={`http://localhost:8000/${shortUrl.split('/').pop()}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">{shortUrl}</a></p>
          <button onClick={() => handleFetchStats(shortUrl.split('/').pop())} className="mt-2 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Fetch Stats
          </button>
        </>
      )}
      
      {error && <p className="text-red-500">{error}</p>}
      <div className="my-4">
        <h2 className="text-2xl font-bold mb-3">My URLs</h2>
        {allUrls.map((urlEntry, index) => {
  const shortUrlPath = urlEntry.shortPath;

  return (
    <div key={index} className="flex justify-between items-center border-b py-2">
      <span className="text-gray-700">{urlEntry.originalUrl}</span>
      <button
        onClick={() => handleFetchStats(shortUrlPath)}
        className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
      >
        {visibleStatsPath === shortUrlPath ? 'Hide Stats' : 'View Stats'}
      </button>
      
    </div>
  );
})}
      </div>
      {stats && visibleStatsPath && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <p>Access Count: {stats.accesses}</p>
          <p>Creation Date: {new Date(stats.createdAt).toLocaleString()}</p>
          <p>Original Url: {stats.originalUrl}</p>
          <div>
          <div>
    <p>Shortened Url: {stats.shortenedUrl}</p>
    <a href={`http://localhost:8000/${stats.shortenedUrl.split('/').pop()}`}  target="_blank" rel="noopener noreferrer" 
       className="inline-block mt-2 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 text-center">
        Visit shortened url
    </a>
    <button onClick={() => handleDecodeShortUrl(visibleStatsPath)} 
            className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Decode shortened url
    </button>
    {decodedUrl && (
        <p className="mt-2">Decoded URL: 
<a href={ensureHttpScheme(decodedUrl)} target="_blank" rel="noopener noreferrer">
  {decodedUrl}
</a>        </p>
    )}
</div>

  
</div>        </div>
      )}
    </div>
  );
}
