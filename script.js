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
    document.getElementById('buy-auto-train').style.display = 'none';
  }
}

// Save game
function saveGame() {
  var saveData = {
    skills: skills,
    currency: currency
  };
  localStorage.setItem('legendarySkillQuestSaveData', JSON.stringify(saveData));
  console.log('Game saved!');
}

// Load game
function loadGame() {
  var saveData = localStorage.getItem('legendarySkillQuestSaveData');
  if (saveData) {
    saveData = JSON.parse(saveData);
    skills = saveData.skills;
    currency = saveData.currency;
    updateAllSkills();
    document.getElementById('currency').textContent = currency;
    console.log('Game loaded!');
  } else {
    console.log('No saved game found!');
  }
}

// Initialize the game
function initGame() {
  initSkills();
  updateAllSkills();
  setInterval(updateAllSkills, 1000); // Update skills every second
}

// Start the game when the page loads
window.onload = initGame;

