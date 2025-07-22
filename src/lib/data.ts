import type { Content, SavedItem, User } from './types';

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

export const filterTags = ['#lofi', '#meme', '#anime', '#gaming', '#diy', '#music', '#tutorial', '#compilation'];
