import { updateState } from "./helpers.js"


const draggingFunc = function(container, numberOfSeeds) {

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
  
      updateState(numberOfSeeds)
  
      
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


export {draggingFunc}