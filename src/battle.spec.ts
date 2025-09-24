import { battle, battleWithGetCharacters } from "./battle";
import { CharactersResponse, getCharacters } from "./getCharacters";

jest.mock("./getCharacters");

const getCharactersMocked = getCharacters as jest.MockedFunction<
  typeof getCharacters
>;

it("battle should return the hero if they have a higher score", async () => {
  getCharactersMocked.mockReturnValue(
    Promise.resolve({
      items: [
        { name: "Winner", score: 9.0, type: "hero" },
        { name: "Loser", score: 8.0, type: "villain" },
      ],
    })
  );

  const result = await battleWithGetCharacters("Winner", "Loser");

  expect(result).toEqual({
    name: "Winner",
    score: 9.0,
    type: "hero",
  });
});

describe("battle", () => {
  const expectedVictor = {
    name: "Batman",
    score: 8.3,
    type: "hero",
    weakness: "Joker",
  };

  it("with weakness", async () => {
    const getCharactersWithWeaknessMocked = (): Promise<CharactersResponse> => {
      return Promise.resolve({
        items: [
          expectedVictor,
          {
            name: "Joker",
            score: 8.2,
            type: "villain",
          },
        ],
      });
    };

    const victor = await battle(getCharactersWithWeaknessMocked, "Batman", "Joker");
    expect(victor).toEqual(expectedVictor);
  });
});
