import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin user',
    email: 'admin@example.com',
    password: bcrypt.hashSync('password', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('password', 10),
  },
  {
    name: 'Alex Doe',
    email: 'alex@example.com',
    password: bcrypt.hashSync('password', 10),
  },
  {
    name: 'Ben user',
    email: 'ben@example.com',
    password: bcrypt.hashSync('password', 10),
  },
];

export default users;
