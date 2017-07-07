var data = require('../data.json');

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getShortage = ()=>{
  let shortage = getRandomElement(data.shortages);
  if(shortage === "Roll Twice and Combine Results" || shortage === "Roll Thrice and Combine Results")
  {
    let shortageCount = shortage === "Roll Twice and Combine Results"?1:2;
    shortage = getRandomElement(data.shortages.slice(0,data.shortages.length-3))
    for(let i=1; i<=shortageCount;i++){
        if(i>1){
          shortage += ", "+getRandomElement(data.shortages.slice(0,data.shortages.length-3).filter(s=>!shortage.split(", ").includes(s)));
        }
        else{
          shortage += ", "+getRandomElement(data.shortages.slice(0,data.shortages.length-3).filter(s=>s!==shortage));
        }
    }
  }

  return shortage;
};
const getMisfortune = ()=>{
  let misfortune = getRandomElement(data.misfortunes);
  if(misfortune === "Roll Twice (it was a bad night)")
  {
    misfortune = getRandomElement(data.misfortunes.slice(0,data.misfortunes.length-2))
    misfortune += ", "+getRandomElement(data.misfortunes.slice(0,data.misfortunes.length-2).filter(s=>s!==misfortune));
  }

  return misfortune;
};
const generateTavern = () => {
  let tavern = {};
  tavern.clientele = getRandomElement(data.clientele);
  tavern.shortage = getShortage();
  tavern.attitude = getRandomElement(data.attitudes);
  tavern.mystery = getRandomElement(data.mystery);
  tavern.facility = getRandomElement(data.facilities);
  tavern.game = getRandomElement(data.games);
  tavern.quality = getRandomElement(data.quality);
  tavern.entertainment = getRandomElement(data.entertainment);
  tavern.misfortune = getMisfortune();
  tavern.drink = getRandomElement(data.drinkFirstNames)+" "+getRandomElement(data.drinkSecondNames);
  tavern.atmosphere = getRandomElement(data.atmosphere);
  tavern.accomodations = getRandomElement(data.accomodations);
  tavern.unwelcome = getRandomElement(data.unwelcome);
  tavern.cleanliness = getRandomElement(data.cleanliness);
  tavern.name = getRandomElement(data.tavernFirstNames)+" "+getRandomElement(data.tavernSecondNames);
  tavern.room = getRandomElement(data.rooms);
  return tavern;
};

const tavern = (state=generateTavern(),action) => {
  switch(action.type){
    case 'GET_TAVERN':
      return generateTavern();
    default:
      return state;
  }
}

export default tavern;
