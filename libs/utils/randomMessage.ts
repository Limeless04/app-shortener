// randomMessage.ts
const randomMessages = [
    "Congrats! You’ve created a URL that’s as fleeting as your attention span. Don’t forget to save it!",
    "Well done! You've made a URL so unique, it’ll disappear faster than your motivation to work out.",
    "Look at you! You've created a URL that’s practically a ghost. Better save it before it vanishes!",
    "Hooray! You've just made a URL that’s more temporary than a Snapchat message. Remember to save it!",
    "Boom! Here’s your URL, it’s almost as elusive as your willpower. Don’t forget to save it!",
    "You did it! Created a URL that’s as ephemeral as your New Year’s resolution. Better save it!",
    "You’ve created a URL so short, it might vanish before you even finish reading this. Better save it now!"
  ];

  const randomTopMessages = [
    "Well, look at you! Making URLs shorter than your attention span. Nice work!",
    "Who needs long URLs when you can have one that fits in your pocket? You’re a genius!",
    "You’ve officially made the internet even more compact. Now, don’t lose this masterpiece.",
    "Behold the power of shortening URLs. If only you could shrink your problems this easily.",
    "You’ve done it! A URL so short, it might be lost forever by the time you finish reading this!",
    "Creating short URLs? Check. Being awesome? Double check. Save it before it’s gone!",
    "Look at you creating URLs like a wizard. Now, don’t let it vanish into thin air!",
    "Congratulations! You've just created a URL that's shorter than your patience with this process."
  ];
  
  // Function to get a random message
  export const getRandomMessage = (): string => {
    const randomIndex = Math.floor(Math.random() * randomMessages.length);
    return randomMessages[randomIndex];
  };


  
  // Function to get a random congratulatory message
  export const getRandomTopMessage = (): string => {
    const randomIndex = Math.floor(Math.random() * randomTopMessages.length);
    return randomTopMessages[randomIndex];
  };
  