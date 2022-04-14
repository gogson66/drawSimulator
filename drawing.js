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

  const drawing = function(list, remain, match=1, stage=1, seedRound=false) {

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
    console.log(seededArray);
     
    const shuffledArray = shuffle(nextRound)  
    const seedPatern = seedPatterns.filter(pattern => pattern.length === numberOfSeeds)
    nextRound = putSeeds(shuffledArray, seededArray, ...seedPatern, length) 


    }

    drawing(numberOfSeeds !== 0 ? nextRound : shuffle(nextRound), remain=undefined, match, stage)
    }
    
    }

  export { shuffle, drawing} 
