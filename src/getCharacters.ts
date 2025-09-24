export type Character = {
  name: string;
  score: number;
  type: string;
  weakness?: string;
};

export type CharactersResponse = {
  items: Character[];
};

export function Score(c: Character): number {
  const weakness = c.weakness != null ? 1 : 0
  return c.score - weakness
}

export async function getCharacters(): Promise<CharactersResponse> {
  const url = 'https://s3.eu-west-2.amazonaws.com/build-circle/characters.json';

  const response = await fetch(url);
  const data: CharactersResponse = await response.json();

  return data;
}

export function getCharactersHardcoded(): CharactersResponse {
  return {
    items: [
      {
        name: "Batman",
        score: 8.3,
        type: "hero",
        weakness: "Joker",
      },
      {
        name: "Joker",
        score: 8.2,
        type: "villain",
      },
      {
        name: "Superman",
        score: 9.6,
        type: "hero",
        weakness: "Lex Luthor",
      },
      {
        name: "Gamora",
        score: 8.4,
        type: "hero",
      },
      {
        name: "Thanos",
        score: 9.9,
        type: "villain",
      },
      {
        name: "Wonder Woman",
        score: 8.7,
        type: "hero",
      },
      {
        name: "Lex Luthor",
        score: 8,
        type: "villain",
      },
      {
        name: "Aquaman",
        score: 3.5,
        type: "hero",
      },
      {
        name: "Thor",
        score: 9.2,
        type: "hero",
      },
      {
        name: "Spiderman",
        score: 7.9,
        type: "hero",
      },
      {
        name: "Harley Quinn",
        score: 7.3,
        type: "villain",
      },
    ],
  };
}
