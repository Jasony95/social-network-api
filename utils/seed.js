const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
const { genFirstName, genLastName, users, thoughts } = require('./data');
const { faker } = require('@faker-js/faker');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }

  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }

  let reactionCheck = await connection.db.listCollections({ name: 'reactions' }).toArray();
  if (reactionCheck.length) {
    await connection.dropCollection('reactions');
  }

  

  // for (let i = 0; i < 30; i++) {
  //   const first = genFirstName();
  //   const last = genLastName();
  //   const userName = faker.internet.displayName({ firstName: first, lastName: last });
  //   const email = faker.internet.email({ firstName: first, lastName: last });

  //   users.push({
  //     userName,
  //     email,
  //   });
  // }

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);


  console.table(users);
  console.table(thoughts);
  console.info('Seeding successfuly completed')
  process.exit(0);
});