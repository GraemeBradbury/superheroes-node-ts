import { battle, battleWithGetCharacters } from "./battle";
import { CharactersResponse, getCharacters } from "./getCharacters";

jest.mock("./getCharacters");

const getCharactersMocked = getCharacters as jest.MockedFunction<
  typeof getCharacters
>;

describe("battle", () => {
  const hero = {
    name: "Hero",
    score: 2.5,
    type: "hero",
  };
  const villain = {
    name: "Villain",
    score: 2.0,
    type: "villain",
  };

  it("should return the hero if they have a higher score", async () => {
    getCharactersMocked.mockReturnValue(
      Promise.resolve({
        items: [hero, villain],
      })
    );

    const result = await battleWithGetCharacters(hero.name, villain.name);

    expect(result).toEqual(hero);
  });

  it("should return the villain if the hero has a weakness to them", async () => {
    const weakHero = { ...hero, weakness: villain.name };
    getCharactersMocked.mockReturnValue(
      Promise.resolve({
        items: [weakHero, villain],
      })
    );

    const result = await battleWithGetCharacters(weakHero.name, villain.name);

    expect(result).toEqual(villain);
  });
});
