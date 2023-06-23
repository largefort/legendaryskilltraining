// Array of skill name options
var skillNameOptions = [
  "Shadow Strike",
  "Dragon Fury",
  "Storm Bolt",
  "Arcane Surge",
  "Venomous Bite",
  "Holy Smite",
  "Inferno Blaze",
  "Frost Nova",
  "Earthquake",
  "Divine Shield",
  "Thunderstorm",
  "Rapid Shot",
  "Crippling Blow",
  "Soul Drain",
  "Whirlwind Slash"
];

// Skill data
var skills = [];

// Currency
var currency = 0;

// Train a skill
function trainSkill(skillIndex) {
  var skill = skills[skillIndex - 1];
  skill.exp += 10;

  if (skill.exp >= 100) {
    skill.exp -= 100;
    skill.level++;
    currency += 10; // Earn 10 coins for leveling up a skill
    document.getElementById('currency').textContent = currency;
  }

  updateSkill(skillIndex);
  animateProgressBar();
  saveGame(); // Save the game after training
}

// Update skill data on the page
function updateSkill(skillIndex) {
  var skill = skills[skillIndex - 1];
  var skillNameElement = document.getElementById('skill' + skillIndex + '-name');
  var skillLevelElement = document.getElementById('skill' + skillIndex + '-level');
  var skillExpElement = document.getElementById('skill' + skillIndex + '-exp');

  skillNameElement.textContent = skill.name;
  skillLevelElement.textContent = skill.level;
  skillExpElement.textContent = skill.exp;
}

// Animate progress bar
function animateProgressBar() {
  var progressBar = document.getElementById('progress-bar');
  progressBar.style.width = '100%';
  setTimeout(function() {
    progressBar.style.width = '0';
  }, 500);
}

// Auto-train skills
function autoTrainSkills() {
  for (var i = 1; i <= skills.length; i++) {
    trainSkill(i);
  }
}

// Buy auto-train
function buyAutoTrain() {
  if (currency >= 100) {
    setInterval(autoTrainSkills, 3000);
    currency -= 100;
    document.getElementById('currency').textContent = currency;
    document.getElementById('buy-auto-train-button').style.display = 'none'; // Hide the button after buying
    animateProgressBar();
    saveGame(); // Save the game after buying auto-train
  }
}

// Save the game data
function saveGame() {
  var gameData = {
    skills: skills,
    currency: currency
  };
  localStorage.setItem('gameData', JSON.stringify(gameData));
}

// Load the game data
function loadGame() {
  var savedData = localStorage.getItem('gameData');
  if (savedData) {
    var gameData = JSON.parse(savedData);
    skills = gameData.skills;
    currency = gameData.currency;
    document.getElementById('currency').textContent = currency;
    updateAllSkills();
  } else {
    generateRandomSkillNames(); // Generate random skill names if no saved data exists
  }
}

// Generate random skill names
function generateRandomSkillNames() {
  for (var i = 0; i < 15; i++) {
    var randomIndex = Math.floor(Math.random() * skillNameOptions.length);
    skills.push({
      name: skillNameOptions[randomIndex],
      level: 0,
      exp: 0
    });
  }
}

// Update all skills on the page
function updateAllSkills() {
  for (var i = 1; i <= skills.length; i++) {
    updateSkill(i);
  }
}

// Initialize the game
function initGame() {
  loadGame(); // Load the game data
  setInterval(updateAllSkills, 1000); // Update skills every second
}

// Start the game when the page loads
window.onload = initGame;
