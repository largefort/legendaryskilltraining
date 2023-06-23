<!DOCTYPE html>
<html>
<head>
  <title>Legendary Skill Quest</title>
  <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
  <h1>Legendary Skill Quest</h1>
  <div id="skills-container">
    <div class="skill">
      <h2 id="skill1-name">Skill 1</h2>
      <p>Level: <span id="skill1-level">0</span></p>
      <p>Experience: <span id="skill1-exp">0</span></p>
      <button onclick="trainSkill(1)">Train</button>
    </div>
    <!-- Repeat the above skill div for other skills -->
  </div>
  <div id="currency-container">
    <h2>Currency: <span id="currency">0</span> Coins</h2>
    <button onclick="buyAutoTrain()">Buy Auto-Train (100 Coins)</button>
    <button onclick="saveGame()">Save Game</button>
    <button onclick="loadGame()">Load Game</button>
  </div>

  <script src="script.js"></script>
</body>
</html>
