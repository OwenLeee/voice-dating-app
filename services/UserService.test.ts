import * as Knex from "knex";
const knexfile = require("../knexfile");
const knex = Knex(knexfile["testing"]);

import { UserService } from "./UserService";

describe("UserService", () => {
  let userService: UserService;

  beforeEach(async () => {
    userService = new UserService(knex);
    // await knex.raw(/*sql*/ `SELECT * from "user" where email = 'sherman@sherman.com'`);
  });
  
  test("get user by email", async () => {
    const users = await userService.getUsers('sherman@sherman.com');
    expect(users).not.toBeNull();
  });

  afterAll(() => {
    knex.destroy();
  });
});