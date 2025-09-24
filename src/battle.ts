import { getCharacters, Character, CharactersResponse } from "./getCharacters";

function scoreWhenFighting(h: Character, v: Character): number {
  const weaknessModifier = h.weakness != null && h.weakness == v.name ? 1 : 0;

  return h.score - weaknessModifier;
}

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

  let hero = characters.items.find((e) => e.name === heroName);
  hero = hero ?? { name: "", score: 0.0, type: "hero" };
  let villain = characters.items.find((e) => e.name === villainName);
  villain = villain ?? { name: "", score: 0.0, type: "villain" };

  return scoreWhenFighting(hero, villain) >= villain.score ? hero : villain;
}

export const battleWithGetCharacters = (
  heroName: string,
  villainName: string
): Promise<Character> => battle(getCharacters, heroName, villainName);
