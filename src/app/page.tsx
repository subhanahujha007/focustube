'use client';
import React, { useState } from 'react';
import { Video } from '../../types';
import Image from 'next/image';
export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [query, setQuery] = useState('');

  const fetchVideos = async () => {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=50&videoDuration=medium&key=${process.env.NEXT_PUBLIC_YOUR_API_YOUTUBE}`
    );
    const data = await res.json();
    setVideos(data.items);
  };

  return (
    <div className="p-4 text-center">
      <h1 className="font-bold text-4xl">FocusTube For the Focused</h1>
      <br />
      <p className="text-gray-400 text-md md:text-lg text-center md:px-24 xl:px-4 2xl:px-52">
        The Ultimate Productivity Booster Application lets you surf the internet without procrastination. <br />
        With smart filtering, real-time nudges, and a focused workspace, it turns your browsing into a productive flow. <br />
        Whether you&apos;re studying, building, or working, this tool helps you stay on track and use the internet with intention.
      </p>
      <br />
      <br />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-[60%] rounded"
        placeholder="Enter topic (e.g., React Debouncing tutorial , Nodejs with automated tools)"
      />
      <button
        onClick={fetchVideos}
        className="ml-2 bg-orange-700 font-md text-white px-4 py-2 rounded"
      >
        Search
      </button>
      <br />
      <br />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 mt-4">
        {videos.map((video) => (
          <div
            key={video.id.videoId}
          onClick={() => {
  const title = encodeURIComponent(video.snippet.title);
  const videoId = video.id.videoId;
  window.location.href = `/watch?v=${videoId}&q=${title}`;
}}

            className="bg-gray-900 text-center gap-2 flex flex-col cursor-pointer rounded-md p-2"
          >
            <Image
              src={video.snippet.thumbnails.medium.url}
             width={450} 
  height={203} 
  alt={video.snippet.title}
  className="rounded-sm"
            />
            <h2 className="text-sm line-clamp-6 font-semibold">{video.snippet.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
