const app = require("../server");
const logger = require("../logger");
const request = require("supertest");
let token;
const baseUrl = "http://localhost:5000/api/auth";
// Signup;
describe("\nSignup ::", () => {
  it("Failed to signup \n\n", (done) => {
    request("http://localhost:5000/api/users")
      .post("/")
      .send({
        name: "firstname",
        email: "email@gmail.com",
        password: "password",
      })
      .end((err, res) => {
        if (res.body.errors[0].msg === "User already exists") {
          // logger.error(err);
          console.log("Sign Up Failed");
          logger.info(res.body.errors);
          // throw err;
        }
        if (res.body.errors[0].msg != "User already exists") {
          logger.info(res.body);
          console.log("Sign Up Sucess");
          token = res.body.token;
        }
        done();
      });
  });
});

// Login

describe("\nLogin test :: ", () => {
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
          console.log(res.body.errors[0].msg);
          console.log("Login Failed");
        } else {
          console.log("logged in");
          logger.log(res.body);
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
          logger.info("Login Failed");
        } else {
          // console.log(res.body);
          logger.info("User token :" + res.body.token);
          token = res.body.token;
          console.log("Login Sucess");
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
