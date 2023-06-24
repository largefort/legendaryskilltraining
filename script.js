const skillNames = [
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

let skills = [];
let currency = 0;
let unlockedSkills = [];

function initSkills() {
  for (let i = 0; i < skillNames.length; i++) {
    skills.push({
      name: skillNames[i],
      level: (i === 0) ? 0 : -1,
      exp: 0
    });
  }
}

function trainSkill(skillIndex) {
  const skill = skills[skillIndex - 1];
  skill.exp += 10;

  if (skill.exp >= 100) {
    skill.exp = 0;
    skill.level++;
    currency += 10;
    document.getElementById('currency').textContent = currency.toLocaleString('en-US');
    unlockSkills();
  }

  updateSkill(skillIndex);
}

function unlockSkills() {
  for (let i = 1; i < skillNames.length; i++) {
    if (skills[0].level >= 100) {
      unlockedSkills.push(i + 1);
    }
  }
}

function updateSkill(skillIndex) {
  const skill = skills[skillIndex - 1];
  const skillLevelElement = document.getElementById(`skill${skillIndex}-level`);
  const skillExpElement = document.getElementById(`skill${skillIndex}-exp`);

  skillLevelElement.textContent = skill.level === 0 ? "N/A" : skill.level.toLocaleString('en-US');
  skillExpElement.textContent = skill.exp.toLocaleString('en-US');
}

function buyAutoTrain() {
  if (currency >= 100) {
    currency -= 100;
    document.getElementById('currency').textContent = currency.toLocaleString('en-US');
    enableAutoTrain();
    alert('Auto-Train feature purchased successfully!');
  } else {
    alert('Not enough coins to purchase Auto-Train feature!');
  }
}

let trainingInterval;

function enableAutoTrain() {
  trainingInterval = setInterval(function() {
    trainSkill(1);
    trainSkill(2);
  }, 100);
}

function disableAutoTrain() {
  clearInterval(trainingInterval);
}

function saveGame() {
  const saveData = {
    skills: skills,
    currency: currency
  };

  localStorage.setItem('skillQuestSaveData', JSON.stringify(saveData));
  alert('Game saved successfully!');
}

function loadGame() {
  const savedData = localStorage.getItem('skillQuestSaveData');

  if (savedData) {
    const saveData = JSON.parse(savedData);
    skills = saveData.skills;
    currency = saveData.currency;
    updateAllSkills();
    document.getElementById('currency').textContent = currency.toLocaleString('en-US');
    unlockSkills();
    alert('Game loaded successfully!');
  } else {
    alert('No saved game data found!');
  }
}

function updateAllSkills() {
  for (let i = 1; i <= skills.length; i++) {
    updateSkill(i);
  }
}

function initGame() {
  initSkills();
  updateAllSkills();
  document.getElementById('currency').textContent = currency.toLocaleString('en-US');
  unlockSkills();
}

function enterGame() {
  document.getElementById('changelog-container').style.display = 'none';
  document.getElementById('game-container').style.display = 'block';
  initGame();
}

window.onload = function() {
  const savedData = localStorage.getItem('skillQuestSaveData');

  if (savedData) {
    const confirmLoad = confirm('Saved game data found! Do you want to load the saved game?');
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
