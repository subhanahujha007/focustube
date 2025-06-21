'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Video } from '../../../types';
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});
import Image from 'next/image';


export default function WatchPage() {
  const searchParams = useSearchParams();
  const videoId = searchParams.get('v');
  const [suggestedVideos, setSuggestedVideos] = useState<Video[]>([]);

  const fetchSuggestions = async () => {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=react&type=video&maxResults=10&key=${process.env.NEXT_PUBLIC_YOUR_API_YOUTUBE}`
    );
    const data = await res.json();
    setSuggestedVideos(data.items);
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <div className="flex flex-col md:flex-row p-4 gap-6">
      <div className="flex-1">
        {videoId && (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            width="100%"
            height="60vh"
            controls
          />
        )}
      </div>
      <div className="w-full md:w-[30%] space-y-4">
        <h2 className="text-lg font-semibold">Suggested Videos</h2>
        {suggestedVideos.map((video) => (
          <a
            href={`/watch?v=${video.id.videoId}`}
            target="_blank"
            key={video.id.videoId}
            className="flex gap-2 bg-gray-900 p-2 rounded-md"
          >
           <Image
  src={video.snippet.thumbnails.medium.url}
  width={112} 
  height={63} 
  alt={video.snippet.title}
  className="rounded-sm"
/>
            <p className="text-sm font-medium">{video.snippet.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
