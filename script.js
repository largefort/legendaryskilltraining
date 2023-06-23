// Random skill names
var skillNames = [
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

// Initialize skills
function initSkills() {
  for (var i = 0; i < skillNames.length; i++) {
    skills.push({
      name: skillNames[i],
      level: 0,
      exp: 0
    });
  }
}

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
    document.getElementById('currency-container').style.display = 'none';
  }
}

// Save game progress
function saveGame() {
  var savedData = {
    skills: skills,
    currency: currency
  };

  localStorage.setItem('skillQuestSave', JSON.stringify(savedData));
  console.log('Game progress saved.');
}

// Load game progress
function loadGame() {
  var savedData = localStorage.getItem('skillQuestSave');

  if (savedData) {
    savedData = JSON.parse(savedData);
    skills = savedData.skills;
    currency = savedData.currency;
    document.getElementById('currency').textContent = currency;
    updateAllSkills();
    console.log('Game progress loaded.');
  } else {
    console.log('No saved data found.');
  }
}

// Initialize the game
function initGame() {
  initSkills();
  updateAllSkills();
  setInterval(updateAllSkills, 1000); // Update skills every second

  document.getElementById('save-button').addEventListener('click', saveGame);
  document.getElementById('load-button').addEventListener('click', loadGame);
}

// Start the game when the page loads
window.onload = initGame;
