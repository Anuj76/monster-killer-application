const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

let battleLog = [];

function getMaxLifeValue()
{
const enteredValue = prompt('Mxaimum life for you and monster','100');
let parsedValue = parseInt(enteredValue);
if(isNaN(parsedValue) || parsedValue<=0)
{
throw{Message : 'Invalide user Input,not a number!'};
}
return parsedValue;
}

let chosenMaxLife;
try{
chosenMaxLife=getMaxLifeValue();
}
catch(error)
{
console.log(error);
chosenMaxLife=100;
alert('You entered somting wrong ,default value of 100 was used');
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonesLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(ev,val,monsterHealth,playerHealth)
{
let logEntry ={
event : ev,
value : val,
finalMonesterHealth : monsterHealth,
finalPlayerHealth : playerHealth
};
/*
switch(ev)
{
case LOG_EVENT_PLAYER_ATTACK:
logEntry.target='MONSTER';
break;

case LOG_EVENT_PLAYER_STRONG_ATTACK:
logEntry={
event:ev,
value:val,
target:'MONSTER',
finalMonesterHealth:monsterHealth,
finalPlayerHealth:playerHealth
};
break;


case LOG_EVENT_MONSTER_ATTACK:
logEntry={
event:ev,
value:val,
target:'PLAYER',
finalMonesterHealth:monsterHealth,
finalPlayerHealth:playerHealth
};
break;

case LOG_EVENT_PLAYER_HEAL:
logEntry={
event:ev,
value:val,
target:'PLAYER',
finalMonesterHealth:monsterHealth,
finalPlayerHealth:playerHealth
};
break;

case LOG_EVENT_GAME_OVER:
logEntry={
event:ev,
value:val,
finalMonesterHealth:monsterHealth,
finalPlayerHealth:playerHealth
};
break;
default:
logEntry = {};
}
*/
if(ev===LOG_EVENT_PLAYER_ATTACK)
{
logEntry.target='MONSTER';
}
else if(ev===LOG_EVENT_PLAYER_STRONG_ATTACK)
{
logEntry = {
event:ev,
value:val,
target:'MONSTER',
finalMonesterHealth:monsterHealth,
finalPlayerHealth:playerHealth
};
}
else if(ev===LOG_EVENT_MONSTER_ATTACK)
{
logEntry = {
event:ev,
value:val,
target:'PLAYER',
finalMonesterHealth:monsterHealth,
finalPlayerHealth:playerHealth
};
}
else if(ev===LOG_EVENT_PLAYER_HEAL)
{
logEntry = {
event:ev,
value:val,
target:'PLAYER',
finalMonesterHealth:monsterHealth,
finalPlayerHealth:playerHealth
};
}
else if(ev===LOG_EVENT_GAME_OVER)
{
logEntry = {
event:ev,
value:val,
finalMonesterHealth:monsterHealth,
finalPlayerHealth:playerHealth
};
}
battleLog.push(logEntry);
}

function reset()
{
currentMonsterHealth = chosenMaxLife;
currentPlayerHealth = chosenMaxLife;
resetGame(chosenMaxLife);
}

function endRound()
{
const intalPlayerHealth = currentPlayerHealth;
const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
currentPlayerHealth -= playerDamage;
writeToLog(LOG_EVENT_MONSTER_ATTACK,playerDamage,currentMonsterHealth,currentPlayerHealth);
if(currentPlayerHealth <=0 && hasBonesLife)
{
hasBonesLife=false;
removeBonusLife();
currentPlayerHealth=intalPlayerHealth;
setPlayerHealth(intalPlayerHealth);
alert('You would be Dead id Bonuslife dont save you!')
}
if(currentMonsterHealth <=0 && currentPlayerHealth >0)
{
alert("You won");
writeToLog(LOG_EVENT_GAME_OVER,'PLAYER WON',currentMonsterHealth,currentPlayerHealth);
}else if(currentPlayerHealth <=0 && currentMonsterHealth>0)
{
alert('You Lost');
writeToLog(LOG_EVENT_GAME_OVER,'MONSTER WON',currentMonsterHealth,currentPlayerHealth);
}else if(currentPlayerHealth<=0 && currentMonsterHealth<=0)
{
alert('you have Draw');
writeToLog(LOG_EVENT_GAME_OVER,'DRAW',currentMonsterHealth,currentPlayerHealth);
}
if(currentMonsterHealth <=0 || currentPlayerHealth<=0)
{
reset();
}
}

function attackMonster(mode)
{

let maxDamage=mode===MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
const logEvent=mode===MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;

/*
if(mode==='ATTACK')
{
maxDamage=ATTACK_VALUE;
logEvent=LOG_EVENT_PLAYER_ATTACK;
}else if(mode==='STRONG_ATTACK')
{
maxDamage=STRONG_ATTACK_VALUE;
logEvent=LOG_EVENT_PLAYER_STRONG_ATTACK;
}
*/
const damage=dealMonsterDamage(maxDamage);
currentMonsterHealth -=damage;
writeToLog(logEvent,damage,currentMonsterHealth,currentPlayerHealth);
endRound();
}

function attackHandeler()
{
attackMonster(MODE_ATTACK);
}

function strongAttackHandeler()
{
attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler()
{
let healValue;
if(currentPlayerHealth >= chosenMaxLife - HEAL_VALUE)
{
alert('you can not heal to more than your max intial health');
healValue = chosenMaxLife - currentPlayerHealth;
}
else 
{
healValue = HEAL_VALUE;
}
increasePlayerHealth(healValue);
currentPlayerHealth +=healValue;
writeToLog(LOG_EVENT_PLAYER_HEAL,healValue,currentMonsterHealth,currentPlayerHealth);
endRound();
}

function printLogHandler()
{
i=0;
for(let i=0;i<battleLog.length;i++)
{
console.log(battleLog[i]);
}
}

attackBtn.addEventListener('click',attackHandeler);
strongAttackBtn.addEventListener('click',strongAttackHandeler);
healBtn.addEventListener('click',healPlayerHandler);
logBtn.addEventListener('click',printLogHandler);