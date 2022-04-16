import {generateDraw} from './drawing.js'
import { updateState } from './helpers.js'
import { draggingFunc } from './dragAndDropin.js'
import { updateAvaliableSeeds } from './seeding.js'


 
const drawContainer = document.querySelector('.draw__container')
const drawList = document.querySelector('.draw__list')
const drawForm = document.querySelector('.draw__form')
const drawParticipants = document.querySelector('.draw__participants')
const buttonContainer = document.querySelector('.button-container')
const seedButton = document.querySelector('.draw__seeds-button')
const seedContainer = document.querySelector('.seed__container')
const seedOptions = document.querySelector('.seed__options')
const seedHeader = document.querySelector('.seed__header')
const pageHeader = document.querySelector('header > h1')

let numberOfSeeds = 0;


drawForm.addEventListener('submit', function(e) {
  e.preventDefault()

  const participantsArr = afterParticipantsSubmit()

  generateDraw(participantsArr, drawParticipants, numberOfSeeds)
  
})


seedButton.addEventListener('click', function(e) {

  const participants = afterParticipantsSubmit()

  let html = ''
  participants.forEach((participant, i) =>  html += `<div class="film__container" draggable="true"><form class="seed__form ""><input class="seed__number" id="item-${i + 1}" value="${i+1}"></input></form><div class="unseeded" >${participant} </div><form class="form__edit hidden"><input spellcheck="false" class="unseeded__input change-name hidden" value="${participant}"></input></form><i class="seed__delete fa fa-edit"></i><i class="seed__delete fa fa-close"></i>
  </div>`
  )


  seedContainer.classList.remove('hidden')
  seedHeader.insertAdjacentHTML('beforeend', `<button class="draw__button draw__button-seed" disabled>Draw</button>`)
  seedContainer.insertAdjacentHTML('beforeend', html)

  const deleteOptions = document.querySelectorAll('.fa-close')  
  deleteOptions.forEach(option => option.addEventListener('click', (e) => {
    option.parentElement.remove()

    numberOfSeeds = updateAvaliableSeeds(document.querySelectorAll('.film__container'), numberOfSeeds)
    updateState(numberOfSeeds)
    draggingFunc(seedContainer, numberOfSeeds)

  
  }))

  const editOptions = document.querySelectorAll('.fa-edit')
  editOptions.forEach(option => option.addEventListener('click', (e) => {
    
    const input = option.previousSibling.querySelector('input')
    const form = input.parentElement
    form.parentElement.draggable = false
    
    
    input.classList.remove('hidden')
    form.classList.remove('hidden')
    input.focus()
    const value = input.value
    input.value = ''
    input.value = value
    const originalElement = form.previousSibling
    originalElement.classList.add('hidden')
    option.style.pointerEvents = 'none'

    const changeName = function(e) {
      e.preventDefault()
      originalElement.textContent = input.value.trim().length === 0 ? value : input.value
      input.classList.add('hidden')
      form.classList.add('hidden')
      originalElement.classList.remove('hidden')
      option.style.pointerEvents = 'initial'
      form.parentElement.draggable = true
    }
    

    input.addEventListener('blur', changeName)
    form.addEventListener('submit', changeName)

    
  }))


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
    
    updateState(numberOfSeeds)
    draggingFunc(seedContainer, numberOfSeeds)


  }))

  draggingFunc(seedContainer, numberOfSeeds)
  updateAvaliableSeeds(participants, numberOfSeeds)

  seedOptions.addEventListener('click', function(e) {

    drawSeedButton.disabled = false
  
    if (e.target.classList.contains('seed__options')) return
    numberOfSeeds = Number(e.target.textContent);
    
    draggingFunc(seedContainer, numberOfSeeds)
  
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
    generateDraw(unseededArray, drawParticipants, numberOfSeeds, true)
    seedContainer.classList.add('hidden')
    
  })

  
  
  
  seedContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('seed__container') || e.target.classList.contains('seed__options')) return
    const seed = e.target    
  })
   
})


pageHeader.addEventListener('click', () => {
  window.location.reload()
})


const afterParticipantsSubmit = function() {
  drawForm.classList.add('hidden')
  seedButton.classList.add('hidden')
  return drawParticipants.value.split('\n')

}










