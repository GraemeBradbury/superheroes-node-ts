export type Character = {
  name: string;
  score: number;
  type: string;
  weakness?: string;
};

export type CharactersResponse = {
  items: Character[];
};

export async function getCharacters(): Promise<CharactersResponse> {
  const url = "https://s3.eu-west-2.amazonaws.com/build-circle/characters.json";

  const response = await fetch(url);
  const data: CharactersResponse = await response.json();

  return data;
}
