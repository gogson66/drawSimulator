const buttonContainer = document.querySelector('.button-container')
const seedContainer = document.querySelector('.seed__container')
const drawContainer = document.querySelector('.draw__container')



const download = function(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

  const updateState = function(numberOfSeeds) {
    document.querySelectorAll('.seed__number').forEach((number, i) => { 
      number.value = i + 1
      number.id = `item-${i+1}`       
  
      const film = number.closest('.seed__form').nextElementSibling    
      
      if (Number(number.value) <= numberOfSeeds) film.classList.add('seeded')
      else film.classList.remove('seeded')
  
  
     })
  
  }

  const generateButtons = function(bothButtons) {
    buttonContainer.insertAdjacentHTML('beforeend', `${bothButtons ? '<button class="draw__button back__button">Go Back</button>' : ''}<button class=" draw__button draw__save">Save as file</button>`)
    const drawSave = document.querySelector('.draw__save')
    const goBack = document.querySelector('.back__button')
    

    goBack && goBack.addEventListener('click', () => {
      seedContainer.classList.remove('hidden')
      drawContainer.classList.add('hidden')
      buttonContainer.classList.add('hidden')
    })
    
    drawSave.addEventListener('click', function() {
      const text = drawContainer.textContent.split('Save as file')[0].trim()
      
      download('draw', text)
    })
    
  }



export {download, updateState, generateButtons}