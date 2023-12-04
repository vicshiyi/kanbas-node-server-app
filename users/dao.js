// import model from "./model.js";
// export const createUser = (user) => model.create(user);
// export const findAllUsers = () => model.find();
// export const findUserById = (userId) => model.findById(userId);
// export const findUserByUsername = (username) =>
//   model.findOne({ username: username });
// // export const findUserByCredentials = (username, password) =>
// //   model.findOne({ username, password });

// export const findUserByCredentials = (usr, pass) => 
//   model.findOne({ username: usr, password: pass });


// export const updateUser = (userId, user) =>
//   model.updateOne({ _id: userId }, { $set: user });
// export const deleteUser = (userId) => model.deleteOne({ _id: userId });


import model from "./model.js";

export const findAllUsers = () => model.find();
export const findUserById = (id) => model.findById(id); //model.find({ _id: id });
export const findUserByUsername = (username) =>
  model.findOne({ username: username });
//   model.find({ username: username });
export const findUserByCredentials = (username, password) =>
  model.findOne({ username, password });
export const findUsersByRole = (role) => model.find({ role: role });
export const createUser = (user) => model.create(user);
export const updateUser = (id, user) =>
  model.updateOne({ _id: id }, { $set: user });
export const deleteUser = (id) => model.deleteOne({ _id: id });