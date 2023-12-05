import * as dao from "./dao.js";

// let currentUser = null;

function UserRoutes(app) {
  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };
  const findUserById = async (req, res) => {
    const id = req.params.id;
    const user = await dao.findUserById(id);
    res.json(user);
  };
  const findByUsername = async (req, res) => {
    const username = req.params.username;
    const user = await dao.findUserByUsername(username);
    res.json(user);
  };
  const findUserByCredentials = async (req, res) => {
    const { username, password } = req.params;
    const user = await dao.findUserByCredentials(username, password);
    res.json(user);
  };

  const findUsersByRole = async (req, res) => {
    const role = req.params.role;
    const users = await dao.findUsersByRole(role);
    res.json(users);
  };

  // const createUser = async (req, res) => {
  //   const { username, password, email, role } = req.params;
  //   const user = await dao.createUser({
  //     username,
  //     password,
  //     email,
  //     role,
  //   });
  //   res.json(user);
  // };
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  const updateUser = async (req, res) => {
    const id = req.params.id;
    const newUser = req.body;
    const status = await dao.updateUser(id, newUser);
    const currentUser = await dao.findUserById(id);
    req.session["currentUser"] = currentUser;
    res.json(status);
  };

  // const updateUser1 = async (req, res) => {
  //   const { userId } = req.params;
  //   const status = await dao.updateUser1(userId, req.body);
  //   currentUser = await dao.findUserById(userId);
  //   res.json(status);
  // };


  const updateFirstName = async (req, res) => {
    const id = req.params.id;
    const newFirstName = req.params.newFirstName;
    const status = await dao.updateUser(id, { firstName: newFirstName });
    res.json(status);
  };
  const deleteUser = async (req, res) => {
    const id = req.params.id;
    const status = await dao.deleteUser(id);
    res.json(status);
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const user = await dao.findUserByCredentials(username, password);
    if (user) {
      const currentUser = user;
      req.session["currentUser"] = currentUser;
      res.json(user);
    } else {
      res.sendStatus(403);
    }
  };

  const signout = async (req, res) => {
    // currentUser = null;
    req.session.destroy();
    res.sendStatus(200);
  };
  
  const account = async (req, res) => {
     const currentUser = req.session["currentUser"];
    // if (!currentUser) {
    //   res.sendStatus(403);
    //   return;
    // }
    res.json(currentUser);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(
      req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already taken" });
    }
    const currentUser = await dao.createUser(req.body);
    req.session['currentUser'] = currentUser;
    res.json(currentUser);
  };



  app.post("/api/users/signout", signout);
  app.post("/api/users/signin", signin);
  app.post("/api/users/account", account);
  app.post("/api/users/create", createUser);
  app.post("/api/users/signup", signup);

  app.delete("/api/users/:id", deleteUser);
  app.get("/api/users/updateFirstName/:id/:newFirstName", updateFirstName);
  // app.get("/api/users/:username/:password/:email/:role", createUser);
  app.get("/api/users/role/:role", findUsersByRole);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:id", findUserById);
  app.get("/api/users/username/:username", findByUsername);
  app.get("/api/users/credentials/:username/:password", findUserByCredentials);
  app.put("/api/users/:id", updateUser);
}

export default UserRoutes;


// import * as dao from "./dao.js";

// let currentUser = null;

// function UserRoutes(app) {
//   const findAllUsers = async (req, res) => {
//     const users = await dao.findAllUsers();
//     res.json(users);
//   };
//   const findUserById = async (req, res) => {
//     const id = req.params.id;
//     const user = await dao.findUserById(id);
//     res.json(user);
//   };
//   const findByUsername = async (req, res) => {
//     const username = req.params.username;
//     const user = await dao.findUserByUsername(username);
//     res.json(user);
//   };
//   const findUserByCredentials = async (req, res) => {
//     const { username, password } = req.params;
//     const user = await dao.findUserByCredentials(username, password);
//     res.json(user);
//   };

//   const findUsersByRole = async (req, res) => {
//     const role = req.params.role;
//     const users = await dao.findUsersByRole(role);
//     res.json(users);
//   };

//   // const createUser = async (req, res) => {
//   //   const { username, password, email, role } = req.params;
//   //   const user = await dao.createUser({
//   //     username,
//   //     password,
//   //     email,
//   //     role,
//   //   });
//   //   res.json(user);
//   // };
//   const createUser = async (req, res) => {
//     const user = await dao.createUser(req.body);
//     res.json(user);
//   };

//   const updateUser = async (req, res) => {
//     const id = req.params.id;
//     const newUser = req.body;
//     const status = await dao.updateUser(id, newUser);
//     currentUser = await dao.findUserById(id);
//     // req.session["currentUser"] = currentUser;
//     res.json(status);
//   };

//   // const updateUser1 = async (req, res) => {
//   //   const { userId } = req.params;
//   //   const status = await dao.updateUser1(userId, req.body);
//   //   currentUser = await dao.findUserById(userId);
//   //   res.json(status);
//   // };


//   const updateFirstName = async (req, res) => {
//     const id = req.params.id;
//     const newFirstName = req.params.newFirstName;
//     const status = await dao.updateUser(id, { firstName: newFirstName });
//     res.json(status);
//   };
//   const deleteUser = async (req, res) => {
//     const id = req.params.id;
//     const status = await dao.deleteUser(id);
//     res.json(status);
//   };

//   const signin = async (req, res) => {
//     // res.json(currentUser);
//     const { username, password } = req.body;
//     const user = await dao.findUserByCredentials(username, password);
//     if (user) {
//       currentUser = user;
//       // req.session["currentUser"] = currentUser;
//       res.json(currentUser);
//     } else {
//       res.sendStatus(403);
//     }
//   };
//   const signout = async (req, res) => {
//     currentUser = null;
//     // req.session.destroy();
//     res.sendStatus(200);
//   };
//   const account = async (req, res) => {
//     // console.log(currentUser);
//     if (!currentUser) {
//       res.sendStatus(403);
//       return;
//     }
//     res.json(currentUser);
//   };
//   const signup = async (req, res) => {
//     const user = await dao.findUserByUsername(
//       req.body.username);
//     if (user) {
//       res.status(400);
//     }
//     currentUser = await dao.createUser(req.body);
//     res.json(currentUser);
//   };


//   app.post("/api/users/signout", signout);
//   app.post("/api/users/signin", signin);
//   app.post("/api/users/account", account);
//   app.post("/api/users/create", createUser);
//   app.post("/api/users/signup", signup);

//   app.delete("/api/users/:id", deleteUser);
//   app.get("/api/users/updateFirstName/:id/:newFirstName", updateFirstName);
//   // app.get("/api/users/:username/:password/:email/:role", createUser);
//   app.get("/api/users/role/:role", findUsersByRole);
//   app.get("/api/users", findAllUsers);
//   app.get("/api/users/:id", findUserById);
//   app.get("/api/users/username/:username", findByUsername);
//   app.get("/api/users/credentials/:username/:password", findUserByCredentials);
//   app.put("/api/users/:id", updateUser);
// }

// export default UserRoutes;