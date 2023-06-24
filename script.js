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

// Unlocked skills
var unlockedSkills = [];

// Initialize skills
function initSkills() {
  for (var i = 0; i < skillNames.length; i++) {
    skills.push({
      name: skillNames[i],
      level: (i === 0) ? 0 : -1, // Set initial level to 0 for first skill, -1 for others
      exp: 0
    });
  }
}

// Train a skill
function trainSkill(skillIndex) {
  var skill = skills[skillIndex - 1];
  skill.exp += 10;

  if (skill.exp >= 100) {
    skill.exp = 0;
    skill.level++;
    currency += 10; // Earn 10 coins for leveling up a skill
    document.getElementById('currency').textContent = currency;
    unlockSkills(); // Check if new skills can be unlocked
  }

  updateSkill(skillIndex);
}

// Unlock new skills
function unlockSkills() {
  for (var i = 1; i < skillNames.length; i++) {
    if (skills[0].level >= 100) {
      unlockedSkills.push(i + 1);
    }
  }
}

// Update skill data on the page
function updateSkill(skillIndex) {
  var skill = skills[skillIndex - 1];
  var skillLevelElement = document.getElementById('skill' + skillIndex + '-level');
  var skillExpElement = document.getElementById('skill' + skillIndex + '-exp');

  skillLevelElement.textContent = skill.level;
  skillExpElement.textContent = skill.exp;
}

// Buy auto-train feature
function buyAutoTrain() {
  if (currency >= 100) {
    currency -= 100;
    document.getElementById('currency').textContent = currency;
    enableAutoTrain();
    alert('Auto-Train feature purchased successfully!');
  } else {
    alert('Not enough coins to purchase Auto-Train feature!');
  }
}

// Auto-train variables
var trainingInterval;

// Enable auto-train
function enableAutoTrain() {
  trainingInterval = setInterval(function() {
    trainSkillsAutomatically(); // Train all skills automatically
  }, 100);
}

// Train all skills automatically
function trainSkillsAutomatically() {
  for (var i = 0; i < skills.length; i++) {
    trainSkill(i + 1);
  }
}


// Disable auto-train
function disableAutoTrain() {
  clearInterval(trainingInterval);
}

// Save the game data
function saveGame() {
  var saveData = {
    skills: skills,
    currency: currency
  };

  localStorage.setItem('skillQuestSaveData', JSON.stringify(saveData));
  alert('Game saved successfully!');
}

// Load the game data
function loadGame() {
  var savedData = localStorage.getItem('skillQuestSaveData');

  if (savedData) {
    var saveData = JSON.parse(savedData);
    skills = saveData.skills;
    currency = saveData.currency;
    updateAllSkills();
    document.getElementById('currency').textContent = currency;
    unlockSkills(); // Check if new skills can be unlocked
    alert('Game loaded successfully!');
  } else {
    alert('No saved game data found!');
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
  initSkills();
  updateAllSkills();
  document.getElementById('currency').textContent = currency;
  unlockSkills(); // Check if new skills can be unlocked
}

// Enter the game
function enterGame() {
  document.getElementById('changelog-container').style.display = 'none';
  document.getElementById('game-container').style.display = 'block';
  initGame();
}

// Start the game when the page loads
window.onload = function() {
  var savedData = localStorage.getItem('skillQuestSaveData');

  if (savedData) {
    var confirmLoad = confirm('Saved game data found! Do you want to load the saved game?');
    if (confirmLoad) {
      loadGame();
      enterGame();
    } else {
      localStorage.removeItem('skillQuestSaveData');
      enterGame();
    }
  } else {
    enterGame();
  }
};
