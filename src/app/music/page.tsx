'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowLeft, Volume2 } from 'lucide-react';
import Image from 'next/image';

interface MusicPost {
  id: string;
  title: string;
  date: string;
  description?: string;
  audioFile: string;
  coverImage?: string;
  tab?: string;
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

  // Group posts by tab/category
  const tabMap: Record<string, MusicPost[]> = {};
  posts.forEach((post) => {
    const tab = post.tab || 'Other';
    if (!tabMap[tab]) tabMap[tab] = [];
    tabMap[tab].push(post);
  });
  const tabNames = Object.keys(tabMap);
  const defaultTab = tabNames[0] || 'Other';

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
        <div className="flex justify-center gap-6 m-4"></div>
        {/* Tabbed Music Posts */}
        <div className="max-w-2xl mx-auto mt-8">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="mb-4 w-full">
              {tabNames.map((tab) => (
                <TabsTrigger key={tab} value={tab} className="capitalize">
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabNames.map((tab) => (
              <TabsContent key={tab} value={tab} className="space-y-6">
                {tabMap[tab].map((post) => (
                  <Card key={post.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300">
                    <CardContent className="flex flex-col items-center align-middle">
                      <div className="flex flex-col sm:flex-row align-middle justify-center items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className="flex-shrink-0 flex flex-row items-center space-x-2 space-y-2">
                          {/* Cover Image */}
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
                          {/* Main Text */}
                          <div className="flex-1 text-center sm:text-left">
                            <h3 className="text-xl font-semibold text-white mb-1">{post.title}</h3>
                            <p className="text-sm text-gray-300">{formatDate(post.date)}</p>
                          </div>
                          {/* The music */}
                          <audio
                            src={post.audioFile}
                            controls
                            className="mx-auto sm:my-4 flex align-middle"
                          />
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed text-center sm:text-left">{post.description}</p>
                    </CardContent>
                  </Card>
                ))}
                {tabMap[tab].length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-white text-xl mb-4">No music posts in this tab</div>
                    <p className="text-gray-300">
                      Check back soon for new tracks!
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
        {/* No music posts at all */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-white text-xl mb-4">No music posts yet</div>
            <p className="text-gray-300">
              Check back soon for new tracks!
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 