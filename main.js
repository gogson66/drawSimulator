import {shuffle, drawing} from './drawing.js'


 
const drawContainer = document.querySelector('.draw__container')
const drawList = document.querySelector('.draw__list')
const drawForm = document.querySelector('.draw__form')
const drawParticipants = document.querySelector('.draw__participants')
const buttonContainer = document.querySelector('.button-container')
const seedButton = document.querySelector('.draw__seeds-button')
const seedContainer = document.querySelector('.seed__container')
const seedOptions = document.querySelector('.seed__options')
const seedHeader = document.querySelector('.seed__header')

let numberOfSeeds = 0;
const seedPatterns = [[1, 2], [1, 4, 3, 2], [1, 8, 5, 4, 3, 6, 7, 2], [1, 16, 9, 8, 13, 4, 5, 12, 11, 6, 14, 3, 7, 10, 15, 2], [1, 32, 17, 16, 9, 24, 25, 8, 5, 28, 12, 21, 13, 20, 29, 4, 11, 22, 27, 6, 14, 19, 3, 30, 23, 7, 26, 10, 15, 18, 31, 2] ]


// const shuffle = function(array) {
    
//     let currentIndex = array.length,  randomIndex;
  
//     // While there remain elements to shuffle...
//     while (currentIndex != 0) {
  
//       // Pick a remaining element...
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex--;
  
//       // And swap it with the current element.
//       [array[currentIndex], array[randomIndex]] = [
//         array[randomIndex], array[currentIndex]];
//     }  
    
  
//     return array;
//   }

// const drawing = function(list, remain, match=1, stage=1, seedRound=false) {

//     let round
//     if (list.length === 2 && !remain ) round = 'FINAL'
//     else if (list.length === 4 && !remain ) round = 'SEMI-FINALS'
//     else if (list.length === 8 && !remain) round = 'QUARTER-FINALS' 
//     else round = `${stage}. ROUND`

    

//     let html = `<li><h1 class="draw__round">\n${round}\n\n</h1></li>`
//     stage++
//     let nextRound = []

    
//     remain && nextRound.push(...remain)

//     list.length % 2 !== 0 && list.splice(1, 0, 'slobodan')

//     for (let i=0; i < list.length; i += 2) {
//       html += `<li class="draw__match"><span class="match">MATCH ${match}</span> - ${list[i]} - ${list[i + 1]}\n</li>`
//       nextRound.push(`Winner of Match ${match}`)
//       match++
//     }

//     drawList.insertAdjacentHTML('beforeend', html)
    

    

//     if (list.length >= 2 && round !== 'FINAL') {

//     if (seedRound && numberOfSeeds !== 0) {

//     const length = nextRound.length  
//     const seededArray = nextRound.splice(0, numberOfSeeds) 
//     console.log(seededArray);
     
//     const shuffledArray = shuffle(nextRound)  
//     const seedPatern = seedPatterns.filter(pattern => pattern.length === numberOfSeeds)
//     nextRound = putSeeds(shuffledArray, seededArray, ...seedPatern, length) 


//     }

//     drawing(numberOfSeeds !== 0 ? nextRound : shuffle(nextRound), remain=undefined, match, stage)
//     }
    
//     }
  


const generateDraw = function(array) {


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

  drawing(numberOfSeeds !== 0 ? newList : shuffle(newList), array, 1, 1, true) 
   
}
else {

  if (numberOfSeeds !== 0) {  
  const length = array.length  
  const seededArray = array.splice(0, numberOfSeeds)  
  const shuffledArray = shuffle(array)  
  const seedPatern = seedPatterns.filter(pattern => pattern.length === numberOfSeeds)
  const fullArray = putSeeds(shuffledArray, seededArray, ...seedPatern, length) 

  newList = fullArray
  drawing(newList)
  }else drawing(shuffle(newList))
}



buttonContainer.insertAdjacentHTML('beforeend', '<button class="draw__button back__button">Go Back</button><button class=" draw__button draw__save">Save as file</button>')
const drawSave = document.querySelector('.draw__save')
const goBack = document.querySelector('.back__button')

goBack.addEventListener('click', () => {
  seedContainer.classList.remove('hidden')
  drawContainer.classList.add('hidden')
  buttonContainer.classList.add('hidden')
})

drawSave.addEventListener('click', function() {
  const text = drawContainer.textContent.split('Save as file')[0].trim()
  
  download('draw', text)
})

}

const download = function(filename, text) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}




drawForm.addEventListener('submit', function(e) {
  e.preventDefault()
  drawForm.classList.add('hidden')
  seedButton.classList.add('hidden')

  drawParticipants.placeholder = ''
  const participantsArr = drawParticipants.value.split('\n')
  drawList.textContent = ''
  buttonContainer.textContent = ''
  generateDraw(participantsArr)

  
  
})

const updateState = function() {
  document.querySelectorAll('.seed__number').forEach((number, i) => { 
    number.value = i + 1
    number.id = `item-${i+1}` 

    const film = number.closest('.seed__form').nextElementSibling    
    
    if (Number(number.value) <= numberOfSeeds) film.classList.add('seeded')
    else film.classList.remove('seeded')


   })

}



seedButton.addEventListener('click', function(e) {

  drawForm.classList.add('hidden')
  seedButton.classList.add('hidden')
  let html = ''
  const participants = drawParticipants.value.split('\n')
  participants.forEach((participant, i) =>  html += `<div class="film__container" draggable="true"><form class="seed__form ""><input class="seed__number" id="item-${i + 1}" value="${i+1}"></input></form><div class="unseeded" >${participant}</div><span class="seed__delete">x</span></div>`
  )


  seedContainer.classList.remove('hidden')
  seedHeader.insertAdjacentHTML('beforeend', `<button class="draw__button draw__button-seed" disabled>Draw</button>`)
  seedContainer.insertAdjacentHTML('beforeend', html)

  const deleteOptions = document.querySelectorAll('.seed__delete')  
  deleteOptions.forEach(option => option.addEventListener('click', (e) => {
    option.parentElement.remove()


    updateAvaliableSeeds(document.querySelectorAll('.film__container'))
    updateState()
  
  }))


  draggingFunc(seedContainer)

  const formSeed = document.querySelectorAll('.seed__form')
  
  formSeed.forEach((form) => form.addEventListener('submit', (e) => {
    e.preventDefault()
    let toNode;
    const formSibling = form.querySelector('.seed__number')
    const inputValue = Number(formSibling.value)
    const index = Number(formSibling.id.split('-')[1])

    if (inputValue < 1) return formSibling.value = index
    const fromNode = form.parentElement
    const filmNodes = document.querySelectorAll('.film__container')
    if (inputValue <= participants.length) toNode =  index < inputValue ? filmNodes[inputValue] : filmNodes[inputValue - 1]
    seedContainer.insertBefore(fromNode, toNode)
    
    updateState()


  }))

  updateAvaliableSeeds(participants)

  seedOptions.addEventListener('click', function(e) {

    drawSeedButton.disabled = false
  
    if (e.target.classList.contains('seed__options')) return
    numberOfSeeds = Number(e.target.textContent);
  
    seedContainer.querySelectorAll('.unseeded').forEach((node, i) => {
      node.classList.remove('seeded')
      const span = node.querySelector('.seed__number')
      if (span) node.removeChild(span)
      if (i >= numberOfSeeds) return
  
      node.classList.add('seeded')
      
    })

    
    
  })

  const drawSeedButton = document.querySelector('.draw__button-seed')
  drawSeedButton.addEventListener('click', () => {
    const unseededArray = [...document.querySelectorAll('.film__container')].map(node => node.textContent.slice(0, -1))

    drawContainer.classList.remove('hidden')
    buttonContainer.classList.remove('hidden')
    drawList.innerHTML = ''
    buttonContainer.innerHTML = ''
    generateDraw(unseededArray)
    seedContainer.classList.add('hidden')
    
  })

  
  
  
  seedContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('seed__container') || e.target.classList.contains('seed__options')) return
    const seed = e.target    
  })
   
})

  



const draggingFunc = function(container) {

  const draggables = container.querySelectorAll('.film__container')

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging')
    })

    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging')
    })

  } )


  container.addEventListener('dragover', e => {
    e.preventDefault()
    
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }

    updateState()

    
  })
  

}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.film__container:not(.dragging)')]
  

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}

const updateAvaliableSeeds = function(participants) {
  document.querySelectorAll('.seed__options li').forEach(option => {
    if (participants.length < Number(option.textContent)) {
     option.style.pointerEvents = 'none'
     option.style.backgroundColor = 'grey'
    }

    if (participants.length + 1 === numberOfSeeds) {
      numberOfSeeds = numberOfSeeds/2
    }
  })
}


const putSeeds = function(shuffled, seeded, numbers, length) {
      
  numbers.forEach((number, i) => {        
    shuffled.splice(i % 2 === 0 ? i * length/numbers.length : i  * length/numbers.length + (length/numbers.length -1), 0,  seeded[number - 1] + (seeded[number - 1].includes('Winner of Match') ? '' : ` (${number})`) )
  })
  return shuffled


}





