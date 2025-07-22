
import type { Content, SavedItem, User, SearchHistoryItem, TranscriptItem } from './types';

export const contentFeed: Content[] = [
  { id: '1', title: 'Lofi Beats to Relax/Study to', caption: 'Chillhop Music', thumbnail: 'https://placehold.co/600x400.png', duration: '2:34:12', dataAiHint: 'lofi anime' },
  { id: '2', title: 'Epic Gaming Moments Compilation', caption: 'Game Central', thumbnail: 'https://placehold.co/600x400.png', duration: '12:45', dataAiHint: 'gaming controller' },
  { id: '3', title: 'DIY Home Decor Ideas on a Budget', caption: 'Creative Corner', thumbnail: 'https://placehold.co/600x400.png', duration: '22:10', dataAiHint: 'home decor' },
  { id: '4', title: 'Funny Cat Videos That Will Make You Cry Laughing', caption: 'Meme Lord', thumbnail: 'https://placehold.co/600x400.png', duration: '08:19', dataAiHint: 'funny cat' },
  { id: '5', title: 'Beginner\'s Guide to Japanese Anime', caption: 'Otaku World', thumbnail: 'https://placehold.co/600x400.png', duration: '45:30', dataAiHint: 'anime character' },
];

export const trendingClips: Content[] = [
  { id: '4', title: 'Funny Cat Videos That Will Make You Cry Laughing', caption: 'Meme Lord', thumbnail: 'https://placehold.co/600x400.png', dataAiHint: 'funny cat' },
  { id: '1', title: 'Lofi Beats to Relax/Study to', caption: 'Chillhop Music', thumbnail: 'https://placehold.co/600x400.png', dataAiHint: 'lofi anime' },
  { id: '5', title: 'Beginner\'s Guide to Japanese Anime', caption: 'Otaku World', thumbnail: 'https://placehold.co/600x400.png', dataAiHint: 'anime character' },
];

export const userProfile: User = {
    name: 'Alex Doe',
    avatarUrl: 'https://placehold.co/100x100.png',
};

export const savedItems: SavedItem[] = [
    { id: '1', title: 'Lofi Beats - Moment at 1:12:05', timestamp: '1:12:05', thumbnail: 'https://placehold.co/600x400.png', dataAiHint: 'lofi anime' },
    { id: '3', title: 'DIY Home Decor - Moment at 05:30', timestamp: '05:30', thumbnail: 'https://placehold.co/600x400.png', dataAiHint: 'home decor' },
];

export const searchHistory: SearchHistoryItem[] = [
    { id: 'sh1', searchTerm: 'Cat playing piano', timestamp: '2023-10-27T10:00:00Z', videoId: '4', videoTitle: 'Funny Cat Videos That Will Make You Cry Laughing' },
    { id: 'sh2', searchTerm: 'How to make a shelf', timestamp: '2023-10-27T11:30:00Z', videoId: '3', videoTitle: 'DIY Home Decor Ideas on a Budget' },
    { id: 'sh3', searchTerm: 'Chill study music', timestamp: '2023-10-26T15:00:00Z', videoId: '1', videoTitle: 'Lofi Beats to Relax/Study to' },
];

export const filterTags = ['#lofi', '#meme', '#anime', '#gaming', '#diy', '#music', '#tutorial', '#compilation'];

export const transcriptItems: TranscriptItem[] = [
    { id: 't1', timestamp: '0:01', text: "I'm so excited to share this new song with you all. It's been a long time coming, and I can't wait for you to hear it." },
    { id: 't2', timestamp: '0:15', text: "This song is about love, loss, and everything in between." },
    { id: 't3', timestamp: '0:28', text: "I hope you enjoy it." },
    { id: 't4', timestamp: '0:45', text: "This next part is my favorite, listen closely to the baseline." },
    { id: 't5', timestamp: '1:02', text: "And that's a wrap! Thanks for listening." },
];
