//Tests for L9
/* eslint-disable no-undef */
const request = require("supertest");
const cheerio = require("cheerio");
const db = require("../models/index");
const app = require("../app");

let server, agent;

// function extractCsrfToken(res) {
//   const a = cheerio.load(res.text);
//   return a("[name=_csrf]").val();
// }

describe("Todo test suite", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    server = app.listen(5000, () => { });
    agent = request.agent(server);
  });

  afterAll(async () => {
    await db.sequelize.close();
    server.close();
  });

  test("Should not create a todo item with empty date", async () => {
    const res = await agent.post("/todos").send({
      title: "Empty duedate",
      dueDate: "",
      completed: false,
    });
    expect(res.status).toBe(500);
  });

  // test("Create a sample due today item", async () => {
  //   const res = await agent.post("/todos").send({
  //     title: "Due-Today Todo",
  //     dueDate: new Date().toISOString().split("T")[0],
  //     completed: false,
  //   });

  //   expect(res.status).toBe(500);
  // });

  // test("Create a sample due later item", async () => {
  //   const tomorrow = new Date();
  //   tomorrow.setDate(tomorrow.getDate() + 1);
  //   const res = await agent.post("/todos").send({
  //     title: "Go Goa",
  //     dueDate: tomorrow.toISOString().split("T")[0],
  //     completed: false,
  //   });
  //   expect(res.status).toBe(302);
  // });

  // test("Create a sample overdue item", async () => {
  //   const yesterday = new Date();
  //   yesterday.setDate(yesterday.getDate() - 1);
  //   const res = await agent.post("/todos").send({
  //     title: "Buy milk",
  //     dueDate: yesterday.toISOString().split("T")[0],
  //     completed: false,
  //   });
  //   expect(res.status).toBe(302);
  // });

  // test("Marking a sample overdue item as completed", async () => {
  //   const overdueResponse = await agent.post("/todos").send({
  //     title: "Overdue Todo",
  //     dueDate: "2000-11-01",
  //     completed: false,
  //   });

  //   // Extract the ID of the created todo
  //   const Id = Number(overdueRes.header.location.split("/")[2]);

  //   const markCompletedResponse = await agent.put(`/todos/${Id}`).send({
  //     _csrf: extractCsrfToken(overdueResponse),
  //     completed: true,
  //   });

  //   expect(markCompletedResponse.status).toBe(200);
  //   expect(markCompletedResponse.body.completed).toBe(true);
  // });

  // test("Toggle a completed item to incomplete when clicked on it", async () => {
  //   const completedTodo = await agent.post("/todos").send({
  //     title: "Complete Todo",
  //     dueDate: new Date().toISOString().split("T")[0],
  //     completed: true,
  //   });

  //   const completedTodoId = Number(completedTodo.header.location.split("/")[2]);

  //   const toggleResponse = await agent.put(`/todos/${completedTodoId}`).send({
  //     _csrf: extractCsrfToken(completedTodo),
  //     completed: false,
  //   });

  //   expect(toggleResponse.status).toBe(200);
  //   expect(toggleResponse.body.completed).toBe(false);
  // });

  // test("Delete a todo item", async () => {
  //   const createTodo = await agent.post("/todos").send({
  //     title: "Delete todo",
  //     dueDate: new Date().toISOString().split("T")[0],
  //     completed: false,
  //   });

  //   const Id = Number(createTodo.header.location.split("/")[2]);

  //   const dlt = await agent.delete(`/todos/${Id}`).send();

  //   expect(dlt.status).toBe(302);
  // });
});

// Tests for L8
// const request = require("supertest");
// const db = require("../models/index");
// const app = require("../app");

// let server, agent;

// describe("Todo Application", function () {
//   beforeAll(async () => {
//     await db.sequelize.sync({ force: true });
//     server = app.listen(3000, () => {});
//     agent = request.agent(server);
//   });

//   afterAll(async () => {
//     try {
//       await db.sequelize.close();
//       await server.close();
//     } catch (error) {
//       console.log(error);
//     }
//   });

//   test("Creates a todo and responds with json at /todos POST endpoint", async () => {
//     const response = await agent.post("/todos").send({
//       title: "Buy milk",
//       dueDate: new Date().toISOString(),
//       completed: false,
//     });
//     expect(response.statusCode).toBe(200);
//     expect(response.header["content-type"]).toBe(
//       "application/json; charset=utf-8"
//     );
//     const parsedResponse = JSON.parse(response.text);
//     expect(parsedResponse.id).toBeDefined();
//   });

//   test("Marks a todo as complete", async () => {
//     const response = await agent.post("/todos").send({
//       title: "Buy milk",
//       dueDate: new Date().toISOString(),
//       completed: false,
//     });
//     const parsedResponse = JSON.parse(response.text);
//     const todoID = parsedResponse.id;

//     expect(parsedResponse.completed).toBe(false);


//     const markCompleteResponse = await agent
//       .put(`/todos/${todoID}/markASCompleted`)
//       .send();
//     const parsedUpdateResponse = JSON.parse(markCompleteResponse.text);
//     expect(parsedUpdateResponse.completed).toBe(true);
//   });

//   test("Fetches all todos in the database using /todos endpoint", async () => {
//     await agent.post("/todos").send({
//       title: "Buy xbox",
//       dueDate: new Date().toISOString(),
//       completed: false,
//     });
//     await agent.post("/todos").send({
//       title: "Buy ps3",
//       dueDate: new Date().toISOString(),
//       completed: false,
//     });
//     const response = await agent.get("/todos");
//     const parsedResponse = JSON.parse(response.text);

//     expect(parsedResponse.length).toBe(4);
//     expect(parsedResponse[3]["title"]).toBe("Buy ps3");
//   });

//   test("Deletes a todo", async () => {
//     const response = await agent.post("/todos").send({
//       title: "Buy Everything",
//       dueDate: new Date().toISOString(),
//       completed: false,
//     });

//     const parsedResponse = JSON.parse(response.text);
//     const todoID = parsedResponse.id;

//     const deleteTodoResponse = await agent.delete(`/todos/${todoID}`).send();
//     const parsedDeleteResponse = JSON.parse(deleteTodoResponse.text);
//     expect(parsedDeleteResponse).toBe(true);
//   });
// });
