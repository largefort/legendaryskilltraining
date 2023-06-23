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

// Hold button interval ID
var holdButtonInterval;

// Autosave interval ID
var autosaveInterval;

// Game version number
var versionNumber = "1.0";

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

// Hold button for automatic training
function holdButton(skillIndex) {
  trainSkill(skillIndex);
  holdButtonInterval = setInterval(function() {
    trainSkill(skillIndex);
  }, 500);
}

// Release button to stop automatic training
function releaseButton() {
  clearInterval(holdButtonInterval);
}

// Autosave function
function autosave() {
  // Save game data
  var saveData = {
    skills: skills,
    currency: currency,
    version: versionNumber
  };

  // Store save data in local storage
  localStorage.setItem('skillQuestSaveData', JSON.stringify(saveData));
}

// Load saved game data
function loadSavedData() {
  var savedData = localStorage.getItem('skillQuestSaveData');

  if (savedData) {
    var saveData = JSON.parse(savedData);

    // Check version number compatibility
    if (saveData.version === versionNumber) {
      skills = saveData.skills;
      currency = saveData.currency;
    }
  }
}

// Initialize the game
function initGame() {
  initSkills();
  loadSavedData();
  updateAllSkills();
  document.getElementById('currency').textContent = currency;

  // Autosave every 10 seconds
  autosaveInterval = setInterval(autosave, 10000);
}

// Start the game when the page loads
window.onload = initGame;

// Copyright notice
console.log("© 2023 Jafet Egill. All rights reserved.");

// Stop autosave and release button on page unload
window.onbeforeunload = function() {
  clearInterval(autosaveInterval);
  releaseButton();
};
