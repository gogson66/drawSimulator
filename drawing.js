import { putSeeds } from "./seeding.js";
import { generateButtons } from "./helpers.js";


const seedPatterns = [[1, 2], [1, 4, 3, 2], [1, 8, 5, 4, 3, 6, 7, 2], [1, 16, 9, 8, 13, 4, 5, 12, 11, 6, 14, 3, 7, 10, 15, 2], [1, 32, 17, 16, 9, 24, 25, 8, 5, 28, 12, 21, 13, 20, 29, 4, 11, 22, 27, 6, 14, 19, 3, 30, 23, 7, 26, 10, 15, 18, 31, 2] ]
const drawList = document.querySelector('.draw__list')

const shuffle = function(array) {
    
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }  
    
  
    return array;
  }

const drawing = function(list, remain, match=1, stage=1, seedRound=false, numberOfSeeds) {

    let round
    if (list.length === 2 && !remain ) round = 'FINAL'
    else if (list.length === 4 && !remain ) round = 'SEMI-FINALS'
    else if (list.length === 8 && !remain) round = 'QUARTER-FINALS' 
    else round = `${stage}. ROUND`

    

    let html = `<li><h1 class="draw__round">\n${round}\n\n</h1></li>`
    stage++
    let nextRound = []

    
    remain && nextRound.push(...remain)

    list.length % 2 !== 0 && list.splice(1, 0, 'slobodan')

    for (let i=0; i < list.length; i += 2) {
      html += `<li class="draw__match"><span class="match">MATCH ${match}</span> - ${list[i]} - ${list[i + 1]}\n</li>`
      nextRound.push(`Winner of Match ${match}`)
      match++
    }

    drawList.insertAdjacentHTML('beforeend', html)
    

    

    if (list.length >= 2 && round !== 'FINAL') {
    
    

    if (seedRound && numberOfSeeds !== 0) {

    const length = nextRound.length  
    const seededArray = nextRound.splice(0, numberOfSeeds) 
     
    const shuffledArray = shuffle(nextRound)  
    const seedPatern = seedPatterns.filter(pattern => pattern.length === numberOfSeeds)
    nextRound = putSeeds(shuffledArray, seededArray, ...seedPatern, length) 


    }

    drawing(numberOfSeeds !== 0 ? nextRound : shuffle(nextRound), remain=undefined, match, stage, seedRound=false, numberOfSeeds)
    }
    
    }

    const generateDraw = function(array, drawParticipants, numberOfSeeds, seed=false) {


        if (!array || array.length === 1) {
          drawParticipants.style.border = '2px solid red'  
          drawParticipants.value = ''
          drawParticipants.placeholder = 'You must enter at least two participants'
          return
        }
        
        drawParticipants.style.border = '1px solid black'  
        
        
        
        let newList;
        
        
        if(!Number.isInteger(Math.log2(array.length)) && !Number.isInteger(Math.log2(array.length + 1))) {
          const closest = 2 ** Math.floor(Math.log2(array.length))
          
          
          
          const numberOfFirstRound = (array.length - closest) * 2
          
          newList = array.splice(-numberOfFirstRound)
        
          if (array.length < numberOfSeeds) {
            const seeds = newList.splice(0, numberOfSeeds - array.length)
            console.log(numberOfSeeds - array.length);
            
            shuffle(newList)
            seeds.forEach((item, i) => newList.splice(i * 2, 0, item + ` (${i + 1 + array.length})`))    
          } else shuffle(newList)
        
          drawing(numberOfSeeds !== 0 ? newList : shuffle(newList), array, 1, 1, true, numberOfSeeds) 
           
        }
        else {
        
          if (numberOfSeeds !== 0) {  
          const length = array.length  
          const seededArray = array.splice(0, numberOfSeeds)  
          const shuffledArray = shuffle(array)  
          const seedPatern = seedPatterns.filter(pattern => pattern.length === numberOfSeeds)
          const fullArray = putSeeds(shuffledArray, seededArray, ...seedPatern, length) 
        
          newList = fullArray
          drawing(newList, undefined, 1, 1, false, numberOfSeeds)
          }else drawing(shuffle(newList), undefined, 1, 1, false, numberOfSeeds)
        }
        
        seed ? generateButtons(true) : generateButtons()
        
        
        }


  export { shuffle, drawing, generateDraw} 
