import request from "supertest"
import app from "./index"
import { Server } from "http";

let server: Server;

beforeAll((done) => {
  server = app.listen(8080, () => {
    done();
  });
});

afterAll((done) => {
  server.close(done);
});


describe("GET /battle", () => {
  it("should return 200", async () => {
    const response = await request(app).get("/battle?hero=Batman&villain=Joker");

    expect(response.statusCode).toBe(200);
  });
});

