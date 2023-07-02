export interface Carta {
  success: boolean,
  deck_id: string,
  cards: [
    {
      code: string,
      image: string,
      images: {
        svg: string,
        png: string
      },
      value: string,
      suit: string
    }
  ],
  remaining: number
}


export interface Mazo {
  success: boolean,
  deck_id: string,
  shuffled: boolean,
  remaining: number
}
