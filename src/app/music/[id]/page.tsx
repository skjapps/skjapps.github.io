import { notFound } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Volume2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

interface MusicPost {
  id: string;
  title: string;
  date: string;
  description?: string;
  audioFile: string;
  coverImage?: string;
}

async function getMusicPost(id: string): Promise<MusicPost | null> {
  try {
    const posts: MusicPost[] = (await import('@/../public/music/posts.json')).default;
    return posts.find((post) => post.id === id) || null;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const posts: MusicPost[] = (await import('@/../public/music/posts.json')).default;
    return posts.map(post => ({ id: post.id }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = await getMusicPost(params.id);
  if (!post) {
    return {
      title: 'Track Not Found | Music',
    };
  }
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skjapps.github.io';
  const trackUrl = `${siteUrl}/music/${post.id}`;
  
  return {
    title: `${post.title} | Music`,
    description: post.description || `Listen to ${post.title}`,
    openGraph: {
      title: post.title,
      description: post.description || `Listen to ${post.title}`,
      url: trackUrl,
      siteName: 'SKJ Apps',
      type: 'music.song',
      images: post.coverImage ? [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description || `Listen to ${post.title}`,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function MusicTrackPage({ params }: { params: { id: string } }) {
  const post = await getMusicPost(params.id);
  if (!post) return notFound();
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto p-4">
        <Button
          variant="ghost"
          className="text-white hover:bg-white/20"
          asChild
        >
          <Link href="/music">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <div className="max-w-xl mx-auto mt-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
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
        </div>
      </div>
    </div>
  );
}
