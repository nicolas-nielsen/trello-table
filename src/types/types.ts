export interface ICard {
  id: string;
  cardName: string;
  cardDesc?: string;
  isFollowed?: boolean;
}

export interface IList {
  id: string;
  listName: string;
  cards: ICard[];
}
