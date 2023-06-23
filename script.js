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

// Save data
var saveDataKey = "legendary_skill_quest_save_data";

// Game version
var version = "1.0.0";

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
function exportSaveData() {
  var saveData = {
    version: version,
    skills: skills,
    currency: currency
  };
  
  var saveDataJSON = JSON.stringify(saveData);
  
  var a = document.createElement('a');
  a.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(saveDataJSON);
  a.download = 'savedata.json';
  a.click();
}

// Import save data from JSON
function importSaveData(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  
  reader.onload = function(e) {
    var saveDataJSON = e.target.result;
    var saveData = JSON.parse(saveDataJSON);
    
    if (saveData.version === version) {
      skills = saveData.skills;
      currency = saveData.currency;
      
      updateAllSkills();
      document.getElementById('currency').textContent = currency;
      
      localStorage.setItem(saveDataKey, saveDataJSON);
      alert("Save data imported successfully!");
    } else {
      alert("Cannot import save data. Version mismatch!");
    }
  };
  
  reader.readAsText(file);
}

// Initialize the game
function initGame() {
  initSkills();
  loadSaveData();
  updateAllSkills();
  setInterval(updateAllSkills, 1000); // Update skills every second
}

// Load save data from local storage
function loadSaveData() {
  var saveDataJSON = localStorage.getItem(saveDataKey);
  
  if (saveDataJSON) {
    var saveData = JSON.parse(saveDataJSON);
    
    if (saveData.version === version) {
      skills = saveData.skills;
      currency = saveData.currency;
      
      updateAllSkills();
      document.getElementById('currency').textContent = currency;
    } else {
      alert("Cannot load save data. Version mismatch!");
    }
  }
}

// Save game progress to local storage
function saveGame() {
  var saveData = {
    version: version,
    skills: skills,
    currency: currency
  };
  
  var saveDataJSON = JSON.stringify(saveData);
  localStorage.setItem(saveDataKey, saveDataJSON);
  
  alert("Game saved successfully!");
}

// Start the game when the page loads
window.onload = initGame;
