// let API = "https://raw.githubusercontent.com/Full-Tape/NAO/main";
fetch(`card.json`)
  .then((response) => response.json())
  .then((data) => showInfo(data));

function showInfo(data) {
  const placeAllCards = document.querySelector(".allCards");
  const placeFindCards = document.querySelector(".findCards");
  const placeInvalidFind = document.querySelector(".invalidFind");
  const placeTemplate = document.querySelector(".template");

  const form = document.forms.filterCard;
  const formInputs = form.querySelectorAll(".aside__form-input");
  const formButton = form.elements.btnFilter;

	for(let inputKey = 0; inputKey < formInputs.length; inputKey ++){
		const formInputsPlaceholder = formInputs[inputKey].placeholder;
		formInputs[inputKey].addEventListener("focus", () => formInputs[inputKey].placeholder = "");
		formInputs[inputKey].addEventListener("blur", () => formInputs[inputKey].placeholder = formInputsPlaceholder)	;
	}

  async function postData(newData){
    let response = await fetch(`card.json`,{
      method: 'POST',
      body: newData
    });

    return await response.json()
  }


  function sendData(){

    let newSD = {
      firstName:"Васильев"
    }


    let aa = JSON.stringify(newSD)
    postData(aa)
  }

  sendData()

  let allCards = data.cards;

  allCards.forEach((cardInfo) => {
    renderCard(cardInfo,placeAllCards)
  });

  function renderCard({image,firstName,secondName,thirdName,placeOfBirth,dateOfBirth,rank,placeOfCall,dateDeath,deathPlace}, place) {
    const placeElement = placeTemplate.querySelector(".card").cloneNode(true);
    placeElement.querySelector(".card__img").src = image != ("" && undefined) ? image : "img/face.jpg";
    placeElement.querySelector(".card__title").textContent = `${firstName} ${secondName} ${thirdName}`;
    placeElement.querySelector(".card__placeOfBirth").textContent = `Место рождения: ${placeOfBirth != ("" && undefined) ? placeOfBirth : "Неизвестно"}`;
    placeElement.querySelector(".card__dateOfBirth").textContent = `Дата рождения: ${dateOfBirth != ("" && undefined) ? dateOfBirth: "Неизвестно"}`;
    placeElement.querySelector(".card__rank").textContent = `Звание: ${rank != ("" && undefined) ? rank: "Неизвестно"}`;
    placeElement.querySelector(".card__placeOfCall").textContent = `Место призыва: ${placeOfCall != ("" && undefined) ? placeOfCall: "Неизвестно"}`;
    placeElement.querySelector(".card__dateDeath").textContent = `Дата смерти: ${dateDeath != ("" && undefined) ? dateDeath : "Неизвестно"}`;
    placeElement.querySelector(".card__deathPlace").textContent = `Место смерти: ${deathPlace != ("" && undefined) ? deathPlace : "Неизвестно"}`;

    place.append(placeElement);
  }

  function findCard(
    firstName = formInputs[0].value,
    secondName = formInputs[1].value,
    thirdName = formInputs[2].value,
    placeOfBirth = formInputs[3].value,
    dateOfBirth = formInputs[4].value,
    rank = formInputs[5].value,
    placeOfCall = formInputs[6].value,
    dateDeath = formInputs[7].value,
    deathPlace = formInputs[8].value
  ) {
		let emptyFind = true;
    allCards.forEach((el) => {
      const regexFN = RegExp(firstName, "gi");
      const regexSN = RegExp(secondName, "gi");
      const regexTN = RegExp(thirdName, "gi");
      const regexPOB = RegExp(placeOfBirth, "gi");
      const regexDOB = RegExp(dateOfBirth, "gi");
      const regexR = RegExp(rank, "gi");
      const regexPOC = RegExp(placeOfCall, "gi");
      const regexDD = RegExp(dateDeath, "gi");
      const regexDP = RegExp(deathPlace, "gi");
      if (
        el.firstName.match(regexFN) &&
        el.secondName.match(regexSN) &&
        el.thirdName.match(regexTN) &&
        el.placeOfBirth.match(regexPOB) &&
        el.dateOfBirth.match(regexDOB) &&
        el.rank.match(regexR) &&
        el.placeOfCall.match(regexPOC) &&
        el.dateDeath.match(regexDD) &&
        el.deathPlace.match(regexDP)
      ) {
				emptyFind = false;
        renderCard(el,placeFindCards);
      }
    });
		
		if(emptyFind){
			placeAllCards.classList.add("sectionHidden")
			placeFindCards.classList.add("sectionHidden")
			placeInvalidFind.classList.remove("sectionHidden")
		}
  }

  formButton.addEventListener("click", (e) => {
    e.preventDefault();

		let validFind = false;

		formInputs.forEach((input)=>{
			if(input.value !== "")
				validFind = true
		})

		if(!validFind){
			placeAllCards.classList.remove("sectionHidden")
			placeFindCards.classList.add("sectionHidden")
			placeInvalidFind.classList.add("sectionHidden")
		}else{
			while (placeFindCards.firstChild) {
				placeFindCards.removeChild(placeFindCards.firstChild);
			}
			placeAllCards.classList.add("sectionHidden")
			placeFindCards.classList.remove("sectionHidden")
			placeInvalidFind.classList.add("sectionHidden")
			findCard();
		}
  });
}

//   const placeInfo = allCards.map(function (item) {
//     return {
//       image: item.image,
//       name: `${item.firstName} ${item.secondName} ${item.thirdName}`,
//       placeOfBirth: item.placeOfBirth,
//       dateOfBirth: item.dateOfBirth,
//       rank: item.rank,
//       placeOfCall: item.placeOfCall,
//       dateDeath: item.dateDeath,
//       deathPlace: item.deathPlace,
//     };
//   });

//   function render() {
//     placeInfo.forEach(renderCard);
//   }
