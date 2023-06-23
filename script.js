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

// Version number
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

// Export save data as JSON
function exportSave() {
  var saveData = {
    skills: skills,
    currency: currency,
    versionNumber: versionNumber
  };

  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(saveData));
  var downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', 'savedata.json');
  downloadAnchor.click();
}

// Import save data from JSON
function importSave(event) {
  var file = event.target.files[0];
  var reader = new FileReader();

  reader.onload = function (e) {
    var saveData = JSON.parse(e.target.result);
    skills = saveData.skills;
    currency = saveData.currency;
    versionNumber = saveData.versionNumber;

    updateAllSkills();
    document.getElementById('currency').textContent = currency;
  };

  reader.readAsText(file);
}

// Initialize the game
function initGame() {
  initSkills();
  updateAllSkills();
  setInterval(updateAllSkills, 1000); // Update skills every second

  // Sync version number
  document.getElementById('version-number').textContent = versionNumber;
}

// Start the game when the page loads
window.onload = initGame;

// Event listener for export button
document.getElementById('export-button').addEventListener('click', exportSave);

// Event listener for import input
document.getElementById('import-input').addEventListener('change', importSave);
