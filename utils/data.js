const { faker } = require('@faker-js/faker');

// console.log(faker.internet.userName());

// for (i = 0; i < 10; i++) {
//   console.log(faker.internet.userName());
// }

const genFirstName = () => {
  return faker.person.firstName()
}

const genLastName = () => {
  return faker.person.lastName()
}

const genRandomUsername = (first, last) => {
  return faker.internet.userName({})
}

const genRandomEmail = () => {
  `${faker.internet.email()}`
}

const users =
  [{
    username: 'Ephraim_Mraz8',
    email: 'Ephraim46@gmail.com',
  },
  {
    username: 'Anais.Mayer',
    email: 'Anais.Mayer18@gmail.com',
  },
  {
    username: 'Laurence_Hand',
    email: 'Laurence_Hand49@hotmail.com',
  },
  {
    username: 'Kassandra36',
    email: 'Kassandra_Ward74@yahoo.com',
  },
  {
    username: 'Waylon88',
    email: 'Waylon_Lubowitz@gmail.com',
  },
  {
    username: 'Edgar63',
    email: 'Edgar.Prohaska@yahoo.com'
  },
  ];

const thoughts =
  [{
    thoughtText: 'Interesting book read. Would like to read the sequel.',
    username: 'Anais.Mayer',
    reactions: {
      reactionBody: 'I like it too.',
      username: 'Waylon88',
    }
  },
  {
    thoughtText: 'Watched a tv show on the economy. I would like to uncover more beyond this.',
    username: 'Kassandra36',
    reactions: {
      reactionBody: 'Sequel?',
      username: 'Edgar63',
    }
  },
  {
    thoughtText: 'What is a healthy snack to eat before sleep?',
    username: 'Edgar63',
  },
  ]

module.exports = {genFirstName, genLastName, genRandomUsername, genRandomEmail, users, thoughts}