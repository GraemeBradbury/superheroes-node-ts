import { battle } from "./battle";
import { getCharacters } from "./getCharacters";

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

    const result = await battle(hero.name, villain.name);

    expect(result).toEqual(hero);
  });

  it("should return the villain when the hero weakness means the score is effectively below the villain", async () => {
    const weakHero = { ...hero, weakness: villain.name };
    getCharactersMocked.mockReturnValue(
      Promise.resolve({
        items: [weakHero, villain],
      })
    );

    const result = await battle(weakHero.name, villain.name);

    expect(result).toEqual(villain);
  });
});
