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

var skills = [];
var currency = 0;
var unlockedSkills = [];
var quests = [];

function initSkills() {
  for (var i = 0; i < skillNames.length; i++) {
    skills.push({
      name: skillNames[i],
      level: (i === 0) ? 0 : -1,
      exp: 0
    });
  }
}

function trainSkill(skillIndex) {
  var skill = skills[skillIndex - 1];
  skill.exp += 10;

  if (skill.exp >= 100) {
    skill.exp = 0;
    skill.level++;
    currency += 10;
    document.getElementById('currency').textContent = currency.toLocaleString(undefined, { notation: 'compact' });
    unlockSkills();
    checkQuestCompletion(skillIndex);
  }

  updateSkill(skillIndex);
}

function unlockSkills() {
  for (var i = 1; i < skillNames.length; i++) {
    if (skills[0].level >= 100) {
      unlockedSkills.push(i + 1);
    }
  }
}

function updateSkill(skillIndex) {
  var skill = skills[skillIndex - 1];
  var skillLevelElement = document.getElementById('skill' + skillIndex + '-level');
  var skillExpElement = document.getElementById('skill' + skillIndex + '-exp');

  skillLevelElement.textContent = skill.level === 0 ? "N/A" : skill.level;
  skillExpElement.textContent = skill.exp;
}

function buyAutoTrain() {
  if (currency >= 100) {
    currency -= 100;
    document.getElementById('currency').textContent = currency.toLocaleString(undefined, { notation: 'compact' });
    enableAutoTrain();
    alert('Auto-Train feature purchased successfully!');
  } else {
    alert('Not enough coins to purchase Auto-Train feature!');
  }
}

var trainingInterval;

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
  var saveData = {
    skills: skills,
    currency: currency,
    quests: quests
  };

  localStorage.setItem('skillQuestSaveData', JSON.stringify(saveData));
  alert('Game saved successfully!');
}

function loadGame() {
  var savedData = localStorage.getItem('skillQuestSaveData');

  if (savedData) {
    var saveData = JSON.parse(savedData);
    skills = saveData.skills;
    currency = saveData.currency;
    quests = saveData.quests;
    updateAllSkills();
    document.getElementById('currency').textContent = currency.toLocaleString(undefined, { notation: 'compact' });
    unlockSkills();
    updateQuests();
    alert('Game loaded successfully!');
  } else {
    alert('No saved game data found!');
  }
}

function updateAllSkills() {
  for (var i = 1; i <= skills.length; i++) {
    updateSkill(i);
  }
}

function initGame() {
  initSkills();
  updateAllSkills();
  document.getElementById('currency').textContent = currency.toLocaleString(undefined, { notation: 'compact' });
  unlockSkills();
  initQuests();
  updateQuests();
}

function enterGame() {
  document.getElementById('changelog-container').style.display = 'none';
  document.getElementById('game-container').style.display = 'block';
  initGame();
}

function checkQuestCompletion(skillIndex) {
  for (var i = 0; i < quests.length; i++) {
    var quest = quests[i];
    if (!quest.completed && quest.skillIndex === skillIndex && skills[skillIndex - 1].level >= quest.requiredLevel) {
      quest.completed = true;
      currency += quest.reward;
      alert('Quest "' + quest.name + '" completed! You earned ' + quest.reward + ' coins.');
      updateQuests();
      break;
    }
  }
}

function initQuests() {
  quests.push({
    name: "Quest 1",
    skillIndex: 1,
    requiredLevel: 5,
    reward: 20,
    completed: false
  });

  quests.push({
    name: "Quest 2",
    skillIndex: 2,
    requiredLevel: 3,
    reward: 15,
    completed: false
  });

  // Add more quests here as needed
}

function updateQuests() {
  var questsContainer = document.getElementById('quests-container');
  questsContainer.innerHTML = '';

  for (var i = 0; i < quests.length; i++) {
    var quest = quests[i];
    var questElement = document.createElement('div');
    questElement.classList.add('quest');

    var questHeading = document.createElement('h3');
    questHeading.textContent = quest.name;

    var questDescription = document.createElement('p');
    questDescription.textContent = 'Complete task to earn rewards.';

    var questButton = document.createElement('button');
    questButton.textContent = quest.completed ? 'Completed' : 'Accept';
    questButton.disabled = quest.completed;
    questButton.addEventListener('click', acceptQuest.bind(null, i));

    questElement.appendChild(questHeading);
    questElement.appendChild(questDescription);
    questElement.appendChild(questButton);

    questsContainer.appendChild(questElement);
  }
}

function acceptQuest(questIndex) {
  var quest = quests[questIndex];
  if (!quest.completed) {
    alert('Quest "' + quest.name + '" accepted!');
  }
}

function interactWithNPC() {
  var npcDialog = document.getElementById('npc-dialog');
  var npcButton = document.getElementById('npc-button');

  npcDialog.textContent = "Hello, adventurer! I have a quest for you.";
  npcButton.textContent = "Accept Quest";
  npcButton.removeEventListener('click', interactWithNPC);
  npcButton.addEventListener('click', function() {
    acceptQuest(0);
    npcDialog.textContent = "Great! You accepted the quest.";
    npcButton.textContent = "Quest Accepted";
    npcButton.disabled = true;
  });
}

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
