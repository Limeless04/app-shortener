const adjectives = [
  'Sarcastic',
  'Unimpressed',
  'MildlyConfused',
  'Overcaffeinated',
  'SleepDeprived',
  'AccidentProne',
  'Clueless',
  'Questionable',
  'SociallyAwkward',
  'WittyButLazy',
];

const nouns = [
  'Potato',
  'Sloth',
  'Toaster',
  'Penguin',
  'Cactus',
  'Taco',
  'Dumpster',
  'Banana',
  'Goblin',
  'Algorithm',
];


export function generateRandomUsername() {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 100);
  return `${adjective}${noun}${number}`;
}
