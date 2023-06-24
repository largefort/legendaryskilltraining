let skillNames = ["Shadow Strike", "Dragon Fury", "Storm Bolt", "Arcane Surge", "Venomous Bite", "Holy Smite", "Inferno Blaze", "Frost Nova", "Earthquake", "Divine Shield", "Thunderstorm", "Rapid Shot", "Crippling Blow", "Soul Drain", "Whirlwind Slash"];
let skills = [], currency = 0, unlockedSkills = [];

const initSkills = () => {
  for (let i = 0; i < skillNames.length; i++) {
    skills.push({ name: skillNames[i], level: (i === 0) ? 0 : -1, exp: 0 });
  }
}

const trainSkill = (skillIndex) => {
  let skill = skills[skillIndex - 1];
  skill.exp += 10;

  if (skill.exp >= 100) {
    skill.exp = 0;
    skill.level++;
    currency += 10;
    document.getElementById('currency').textContent = currency;
    unlockSkills();
  }

  updateSkill(skillIndex);
}

const unlockSkills = () => {
  for (let i = 1; i < skillNames.length; i++) {
    if (skills[0].level >= 100) {
      unlockedSkills.push(i + 1);
    }
  }
}

const updateSkill = (skillIndex) => {
  let skill = skills[skillIndex - 1];
  let skillLevelElement = document.getElementById('skill' + skillIndex + '-level');
  let skillExpElement = document.getElementById('skill' + skillIndex + '-exp');

  skillLevelElement.textContent = skill.level === 0 ? "N/A" : skill.level;
  skillExpElement.textContent = skill.exp;
}

const buyAutoTrain = () => {
  if (currency >= 100) {
    currency -= 100;
    document.getElementById('currency').textContent = currency;
    enableAutoTrain();
    alert('Auto-Train feature purchased successfully!');
  } else {
    alert('Not enough coins to purchase Auto-Train feature!');
  }
}

let trainingInterval;

const enableAutoTrain = () => {
  trainingInterval = setInterval(() => {
    trainSkill(1);
    trainSkill(2);
  }, 100);
}

const disableAutoTrain = () => {
  clearInterval(trainingInterval);
}

const saveGame = () => {
  let saveData = { skills: skills, currency: currency };

  localStorage.setItem('skillQuestSaveData', JSON.stringify(saveData));
  alert('Game saved successfully!');
}

const loadGame = () => {
  let savedData = localStorage.getItem('skillQuestSaveData');

  if (savedData) {
    let saveData = JSON.parse(savedData);
    skills = saveData.skills;
    currency = saveData.currency;
    updateAllSkills();
    document.getElementById('currency').textContent = currency;
    unlockSkills();
    alert('Game loaded successfully!');
  } else {
    alert('No saved game data found!');
  }
}

const updateAllSkills = () => {
  for (let i = 1; i <= skills.length; i++) {
    updateSkill(i);
  }
}

const initGame = () => {
  initSkills();
  updateAllSkills();
  document.getElementById('currency').textContent = currency;
  unlockSkills();
}

const enterGame = () => {
  document.getElementById('changelog-container').style.display = 'none';
  document.getElementById('game-container').style.display = 'block';
  initGame();
}

window.onload = () => {
  let savedData = localStorage.getItem('skillQuestSaveData');

  if (savedData) {
    let confirmLoad = confirm('Saved game data found! Do you want to load the saved game?');
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
