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
