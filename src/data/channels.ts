export interface Channel {
  id: string;
  name: string;
  url: string;
  language: string;
  type: 'sports' | 'entertainment';
}

export const channels: Channel[] = [
  {
    id: 'star-hindi',
    name: 'Star Sports 1 Hindi',
    url: 'https://allroundersd.pages.dev/channel/star-sports-1-hindi',
    language: 'Hindi',
    type: 'sports'
  },
  {
    id: 'prime-hindi',
    name: 'Prime Video Hindi',
    url: 'https://allrounder-rho.vercel.app/prame-hin.html',
    language: 'Hindi',
    type: 'sports'
  },
  {
    id: 'prime-eng',
    name: 'Prime Video English',
    url: 'https://allrounder-rho.vercel.app/prame.html',
    language: 'English',
    type: 'sports'
  },
  {
    id: 'willow',
    name: 'Willow Sports',
    url: 'https://cricketstan.github.io/Willow-Sports/',
    language: 'English',
    type: 'sports'
  },
  {
    id: 'star-eng',
    name: 'Star Sports English',
    url: 'https://cricketstan.github.io/Channel-14/',
    language: 'English',
    type: 'sports'
  }
];
