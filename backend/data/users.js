import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Joh Doe",
    email: "joh@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "David",
    email: "david@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
