const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const {userOneId, userOne, setupDatabase}=require('./fixtures/db')

beforeEach(setupDatabase);

test("should signup a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Atharva",
      email: "atharvakutwal@gmail.com",
      password: "ke@23456",
    })
    .expect(201);

  //assert that database was changed correctly
  const user = User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  //assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: "Atharva",
      email: "atharvakutwal@gmail.com",
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe("ke@23456");
});

test("should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      pssword: userOne.password,
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("should not login nonexistent user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(400);
});

test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not get profile for unauthenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("should delete account for user ", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});
test("should not delete account for unauthenticated user ", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile.jpg")
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("should update valid user fields", async () => {
  await request(app)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .patch("/users/me")
    .send({ name: "Durgesh" })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.name).toEqual("Durgesh");
});

test("should not update invalid user fields", async () => {
  await request(app)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .patch("/users/me")
    .send({ location: "Pune" })
    .expect(400);
});
