'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Volume2 } from 'lucide-react';
import Image from 'next/image';

interface MusicPost {
  id: string;
  title: string;
  date: string;
  description?: string;
  audioFile: string;
  coverImage?: string;
}

export default function MusicPage() {
  const [posts, setPosts] = useState<MusicPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await fetch('/music/posts.json');
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Error loading music posts:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading music...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto p-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="text-white hover:bg-white/20"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        {/* Music Title */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Music
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Some tracks I&apos;ve been working on. Click play to listen!
          </p>
        </div>
        {/* Music Platform Links */}
        <div className="flex justify-center gap-6 m-8">
          <a href="https://open.spotify.com/user/your-spotify-id" target="_blank" rel="noopener noreferrer" title="Spotify" className="hover:scale-110 transition-transform">
            <Image src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" alt="Spotify" width={64} height={64} className="object-cover w-16 h-16 rounded-md" unoptimized />
          </a>
          <a href="https://soundcloud.com/your-soundcloud-id" target="_blank" rel="noopener noreferrer" title="SoundCloud" className="hover:scale-110 transition-transform">
            <Image src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Antu_soundcloud.svg" alt="SoundCloud" width={64} height={64} className="object-cover w-16 h-16 rounded-md" unoptimized />
          </a>
          <a href="https://music.apple.com/profile/your-apple-music-id" target="_blank" rel="noopener noreferrer" title="Apple Music" className="hover:scale-110 transition-transform">
            <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Apple_Music_icon.svg" alt="Apple Music" width={64} height={64} className="object-cover w-16 h-16 rounded-md" unoptimized />
          </a>
          <a href="https://tidal.com/your-tidal-id" target="_blank" rel="noopener noreferrer" title="Tidal" className="hover:scale-110 transition-transform">
            <Image src="https://upload.wikimedia.org/wikipedia/commons/4/41/Tidal_%28service%29_logo_only.svg" alt="Tidal" width={64} height={64} className="object-cover w-16 h-16 rounded-md" unoptimized />
          </a>
          <a href="https://music.youtube.com/your-youtube-music-id" target="_blank" rel="noopener noreferrer" title="YouTube Music" className="hover:scale-110 transition-transform">
            <Image src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Youtube_Music_icon.svg" alt="YouTube Music" width={64} height={64} className="object-cover w-16 h-16 rounded-md" unoptimized />
          </a>
          <a href="https://music.amazon.com/your-amazon-music-id" target="_blank" rel="noopener noreferrer" title="Amazon Music" className="hover:scale-110 transition-transform">
            <Image src="https://upload.wikimedia.org/wikipedia/commons/9/92/Amazon_Music_logo.svg" alt="Amazon Music" width={64} height={64} className="object-cover w-16 h-16 rounded-md" unoptimized />
          </a>
        </div>
        {/* Music Posts List */}
        <div className="max-w-xl mx-auto space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300">
              <CardContent className="flex flex-col items-center align-middle">
                <div className="flex flex-col sm:flex-row align-middle justify-center items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="flex-shrink-0 flex flex-row items-center space-x-2 space-y-2">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <Volume2 className="h-8 w-8 text-white" />
                      </div>
                    )}
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl font-semibold text-white mb-1">{post.title}</h3>
                      <p className="text-sm text-gray-300">{formatDate(post.date)}</p>
                    </div>
                  </div>
                  <audio
                    src={post.audioFile}
                    controls
                    className="mx-auto sm:my-4 flex align-middle"
                  />
                </div>
                <div className="sm:pl-22 w-full">
                  <p className="text-gray-300 text-sm leading-relaxed text-center sm:text-left">{post.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* No music posts yet */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-white text-xl mb-4">No music posts yet</div>
            <p className="text-gray-300">
              Check back soon for new tracks!
            </p>
          </div>
        )}
      </div>
    </div >
  );
} 