'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Video } from '../../../types';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function WatchPage() {
  const [suggestedVideos, setSuggestedVideos] = useState<Video[]>([]);
  const searchParams = useSearchParams();
  const videoId = searchParams.get('v');
  const query = searchParams.get('q');

  const fetchSuggestions = async () => {
    if (!query) return;
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=20&videoDuration=medium&key=${process.env.NEXT_PUBLIC_YOUR_API_YOUTUBE}`
    );
    const data = await res.json();
    setSuggestedVideos(data.items);
  };

  useEffect(() => {
    fetchSuggestions();
  }, [query]);

  return (
    <div className="flex flex-col p-4 gap-6 max-w-7xl mx-auto">
      <div className="w-full aspect-video">
        {videoId && (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            width="100%"
            height="80%"
            controls
          />
        )}
      </div>

      <div className="w-full">
        <h2 className="text-lg font-semibold mb-4">Suggested Videos</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {suggestedVideos.map((video) => (
            <a
              href={`/watch?v=${video.id.videoId}&q=${query}`}
              key={video.id.videoId}
              className="bg-gray-900 p-2 rounded-md hover:bg-gray-800 transition"
            >
              <Image
                src={video.snippet.thumbnails.medium.url}
                width={320}
                height={180}
                alt={video.snippet.title}
                className="rounded-sm w-full h-auto"
              />
              <p className="text-sm font-medium mt-2">{video.snippet.title}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
