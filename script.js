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

// Train interval ID
var trainIntervalId = null;

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
    setInterval(autoTrainSkills, 1000);
    currency -= 100;
    document.getElementById('currency').textContent = currency;
    document.getElementById('currency-container').style.display = 'none';
  }
}

// Start training on button hold
function startTraining(skillIndex) {
  trainSkill(skillIndex);
  trainIntervalId = setInterval(function() {
    trainSkill(skillIndex);
  }, 200);
}

// Stop training on button release
function stopTraining() {
  clearInterval(trainIntervalId);
}

// Autosave progress
function autosave() {
  // Simulate autosaving process
  document.getElementById('autosave-text').style.display = 'block';
  setTimeout(function() {
    document.getElementById('autosave-text').style.display = 'none';
  }, 2000);
  
  // Save data to localStorage
  var saveData = {
    skills: skills,
    currency: currency
  };
  localStorage.setItem('skillQuestSaveData', JSON.stringify(saveData));
}

// Load saved progress
function loadSavedProgress() {
  var saveData = localStorage.getItem('skillQuestSaveData');
  if (saveData) {
    saveData = JSON.parse(saveData);
    skills = saveData.skills;
    currency = saveData.currency;
    document.getElementById('currency').textContent = currency;
    updateAllSkills();
  }
}

// Update all skills data on the page
function updateAllSkills() {
  for (var i = 1; i <= skills.length; i++) {
    updateSkill(i);
  }
}

// Initialize the game
function initGame() {
  initSkills();
  loadSavedProgress();
  updateAllSkills();
  setInterval(autosave, 5000); // Autosave every 5 seconds
}

// Start the game when the page loads
window.onload = initGame;
