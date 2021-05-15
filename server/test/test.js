const app = require("../server");
const logger = require("../logger");
const request = require("supertest");
let token;
const baseUrl = "http://localhost:5000/api/auth";
// Signup;
describe("\n\n\n\nSignup ::", () => {
  it("Failed to signup \n\n", (done) => {
    request("http://localhost:5000/api/users")
      .post("/")
      .send({
        name: "firstname",
        email: "email@gmail.com",
        password: "password",
      })
      .end((err, res) => {
        console.log(res.body);
        if (res.body.msg === "User already exists") {
          logger.error(err);
          throw err;
        }
        if (res.body.success != "User already exists") {
          console.log(res.body);
          logger.info(res.body);
          token = res.body.token;
        }
        done();
      });
  });
});

// Login

describe("\n\n\n\nLogin test :: ", () => {
  it("should not be able log in \n\n", (done) => {
    request(baseUrl)
      .post("/")
      .send({
        email: "rajiv075@gmail.com",
        password: "rajiv",
      })
      .end((err, res) => {
        // console.log(res.body.errors[0].msg);
        if (res.body.errors[0].msg == "Invalid Credentials") {
          logger.info(res.body.errors[0].msg);
        } else {
          // console.log(res.body);
          // logger.info(res.body);
          console.log("logged in");
        }
        done();
      });
  });

  it("should be able to login \n\n", (done) => {
    request(baseUrl)
      .post("/")
      .send({
        email: "rajiv075@gmail.com",
        password: "1234567890",
      })
      .end((err, res) => {
        // console.log(res.body);
        if (!res.body.token) {
          logger.error(err);
          throw err;
        } else {
          // console.log(res.body);
          logger.info("User token :" + res.body.token);
          token = res.body.token;
        }
        done();
      });
  });
});

// Get all articles
// describe("\n\n\n\nGet all articles :: ", () => {
//   it("Cannot Fetch  the articles\n\n", (done) => {
//     request("http://localhost:5000/api/articles")
//       .get("/")
//       .end((err, res) => {
//         // console.log(res.body);
//         if ((res.body.msg = "No token, authorization denied")) {
//           logger.info("Authorization Error");
//         }
//         done();
//       });
//   });
// it("Fetch all the articles\n\n", (done) => {
//   request("http://localhost:5000/api/articles")
//     .get("/")
//     .set({ token })
//     .end((err, res) => {
//       // console.log(res.body);
//       if ((res.body.msg = "No token, authorization denied")) {
//         logger.info("Authorization Error");
//       } else {
//         console.log(res.body);
//       }
//       done();
//     });
// });
// });
