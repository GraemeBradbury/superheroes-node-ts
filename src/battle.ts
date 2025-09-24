import { getCharacters, Character, CharactersResponse } from "./getCharacters";

export async function battle(
  getCharacters: () => Promise<CharactersResponse>,
  heroName: string,
  villainName: string
): Promise<Character> {
  let characters: CharactersResponse;
  try {
    characters = await getCharacters();
  } catch (error) {
    characters = {
      items: [],
    };
  }

  const hero = characters.items.find((e) => e.name === heroName);
  const villain = characters.items.find((e) => e.name === villainName);

  return hero!.score >= villain!.score ? hero! : villain!;
}

export const battleWithGetCharacters = (
  heroName: string,
  villainName: string
): Promise<Character> => battle(getCharacters, heroName, villainName);
