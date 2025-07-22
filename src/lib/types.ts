
export type Content = {
  id: string;
  title: string;
  caption: string;
  thumbnail: string;
  duration?: string;
  dataAiHint: string;
};

export type SavedItem = {
  id: string;
  title: string;
  timestamp: string;
  thumbnail: string;
  dataAiHint: string;
};

export type User = {
    name: string;
    avatarUrl: string;
};

export type SearchHistoryItem = {
  id: string;
  searchTerm: string;
  timestamp: string;
  videoId: string;
  videoTitle: string;
}

export type TranscriptItem = {
    id: string;
    timestamp: string;
    text: string;
}
