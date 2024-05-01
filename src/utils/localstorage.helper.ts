'use client';

import { generateUuid } from '@/utils/identifier.generator';
import { IList } from '@/types/types';

export const trelloListKey = 'next-trello-lists';

export const defaultTrelloLists: IList[] = [
  {
    id: generateUuid(),
    listName: 'My first list',
    cards: [
      {
        id: generateUuid(),
        cardName: 'My first card',
      },
      {
        id: generateUuid(),
        cardName: 'My second card',
      },
      {
        id: generateUuid(),
        cardName: 'Followed card',
        isFollowed: true,
      },
    ],
  },
  {
    id: generateUuid(),
    listName: 'My second list',
    cards: [
      {
        id: generateUuid(),
        cardName: 'Followed card with description',
        cardDesc: 'My first description',
        isFollowed: true,
      },
    ],
  },
];

export const localStorageHelper = {
  keyExists(key: string): boolean {
    return !!localStorage.getItem(key);
  },

  parseKey(key: string) {
    return JSON.parse(localStorage.getItem(key) ?? '');
  },

  setKey(json: IList[], key: string) {
    localStorage.setItem(key, JSON.stringify(json));
  },

  setDefaultList() {
    this.setKey(defaultTrelloLists, trelloListKey);
  },
};
