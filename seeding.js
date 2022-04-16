const updateAvaliableSeeds = function(participants, numberOfSeeds) {
    document.querySelectorAll('.seed__options li').forEach(option => {
      if (participants.length < Number(option.textContent)) {
       option.style.pointerEvents = 'none'
       option.style.backgroundColor = 'grey'
      }
  
      if (participants.length + 1 === numberOfSeeds) {
        numberOfSeeds = numberOfSeeds/2
        
      }
    })

    return numberOfSeeds
  }
  
  
  const putSeeds = function(shuffled, seeded, numbers, length) {    
    
        
    numbers.forEach((number, i) => {        
      shuffled.splice(i % 2 === 0 ? i * length/numbers.length : i  * length/numbers.length + (length/numbers.length -1), 0,  seeded[number - 1] + (seeded[number - 1].includes('Winner of Match') ? '' : ` (${number})`) )
    })
    return shuffled
  
  
  }

export {putSeeds, updateAvaliableSeeds}