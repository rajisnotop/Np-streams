'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  ExternalLink,
  Film,
  Tv,
  BookOpen,
  Gamepad2,
  Radio,
  Trophy,
  Drama,
} from 'lucide-react';
import links from './data/links.json';

const categoryIcons: { [key: string]: any } = {
  'Movie Streaming': Film,
  'Anime Streaming': Tv,
  'Manga/Manhwa/Manhua': BookOpen,
  'Live TV': Radio,
  'Live Sports': Trophy,
  Dramas: Drama,
  Books: BookOpen,
  Games: Gamepad2,
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredLinks = links
    .map((category) => ({
      ...category,
      links: category.links.filter(
        (link) =>
          link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          category.category.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.links.length > 0);

  const categories = [
    'all',
    ...Array.from(new Set(links.map((category) => category.category))),
  ];

  const displayLinks =
    activeTab === 'all'
      ? filteredLinks
      : filteredLinks.filter((category) => category.category === activeTab);

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              NP Streams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search links or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <TabsList className="w-full justify-start">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="px-4 py-2 capitalize"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </ScrollArea>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {displayLinks.map((category, index) => {
                const Icon = categoryIcons[category.category] || ExternalLink;
                return (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="bg-muted">
                      <CardTitle className="flex items-center gap-2">
                        <Icon className="h-5 w-5" />
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="grid gap-2">
                        {category.links.map((link, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            className="w-full justify-start gap-2 text-left"
                            asChild
                          >
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                              {link.name}
                            </a>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
