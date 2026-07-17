// regular();
// arrow();
// function regular() {
//   console.log('Regular');
// }
// const arrow = () => {
//   console.log('Here in arrow');
// };

// We cannot call arrow function before initialization

// const person = {
//   name: 'Brad',
//   sayHelloRegular: function () {
//     console.log('Regular: ', this.name);
//   },
//   sayHelloArrow: () => console.log('Arrow ', this.name),
// };
// person.sayHelloArrow();
// An arrow function will be undefined in arrow function

/// Templete Literals
// const name = 'John';
// const age = 30;
// const greeting = 'Hellow, my namne is ' + name + ' age: ' + age;
// const formatDate = (timestamp) => {
//   const date = new Date(timestamp);
//   return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
// };
// const note = {
//   title: 'Discuss Project',
//   timestamp: Date.now(),
// };

// console.log(`Last Edited: ${formatDate(note.timestamp)}`);

/// Ternary Operations
// const number = 2;
// let message;
// // if (number % 2 === 0) {
// //   message = 'Even Number';
// // } else {
// //   message = 'Odd Number';
// // }
// message = number % 2 === 0 ? 'Even Number' : 'Odd Number';
// console.log(message);

// const note = {
//   title: 'Meeting Notes',
//   content: 'Discuss Project roadmap',
//   timestamp: Date.now(),
//   isPinned: true,
// };
// const noteText = `
// Title: ${note.title}
// Status: ${note.isPinned ? '📌 Pinned Note' : 'Regular Note'}
// Last Updated: ${new Date(note.timestamp).toLocaleString()}
// `;

// console.log(noteText);

// // Short Circuit Rendering
// // It is not going to show whatever is on the right if the value at left is a falsy value
// console.log(true && 'Hello');

// // Destructuring
// const notes = [
//   { title: 'Meeting Notes', content: '1' },
//   { title: 'Meeting Notes', content: '2' },
//   { title: 'Meeting Notes', content: '3' },
//   { title: 'Meeting Notes', content: '4' },
// ];
// // Using rest operator as well
// const [firstNote, secondNote, ...otherNotes] = notes;
// console.log(otherNotes);

//Object destructuring
const note = {
  title: 'Meeting Notes',
  content: 'Discuss Project Roadmap',
  isPinned: true,
};
// Name has to be same
const { title } = note;
console.log(title);
// IF you want to rename it
const { content: noteContent } = note;
console.log(noteContent);

// Nested dstructuring
// const user = {
//   name: 'Zaid',
//   address: {
//     city: 'Boston',
//     state: 'O,bad',
//   },
//   hobbies: ['Movies','Sports', 'Sex']
// };
// const {
//   name,
//   address: { city, state },
//   hobbies: [hobby1,...otherHobbies] // This is rest operator
// } = user;
// console.log(otherHobbies);

const notes = [
  {
    title: 'Meeting Notes',
    content: 'Discuss project roadmap',
    isPinned: true,
  },
  {
    title: 'Grocery Notes',
    content: 'Discuss Grocery roadmap',
    isPinned: false,
  },
  {
    title: 'Workout Notes',
    content: 'Discuss workout roadmap',
    isPinned: true,
  },
  {
    title: 'Recipe Notes',
    content: 'Discuss recipe roadmap',
    isPinned: false,
  },
];
// Map, Creates new Array and transform one array to other depending upon the condition
const noteTitle = notes.map((note, index) => `${index}. ${note.title}`);
// console.log(noteTitle);

// Filter, Similar to map but it reuqires a condition to filter
const pinnedNote = notes
  .filter((note) => note.isPinned)
  .map((note) => note.title);
// console.log(pinnedNote);

// Reduce, it is used to reduce array to a single value
const numbers = [1, 2, 3, 4, 5];
// Zero is default here
const sum = numbers.reduce((total, number) => total + number, 0);
// console.log(sum);

const totalChar = notes.reduce((total, note) => total + note.content.length, 0);
console.log(totalChar);

// For each
notes.forEach((note) => console.log(note.title));
