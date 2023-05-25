let API = "https://raw.githubusercontent.com/Full-Tape/NAO/main";
fetch(`${API}/card.json`)
  .then((response) => response.json())
  .then((data) => showInfo(data));

function showInfo(data) {
  let allCards = data.cards;
  console.table(allCards);
  const placesContainer = document.querySelector(".sectionCards");
  const placeTemplate = document.querySelector(".template");

  const placeInfo = allCards.map(function (item) {
    return {
      image: item.image,
      name: `${item.firstName} ${item.secondName} ${item.thirdName}`,
      placeOfBirth: item.placeOfBirth,
      dateOfBirth: item.dateOfBirth,
      rank: item.rank,
      placeOfCall: item.placeOfCall,
      dateDeath: item.dateDeath,
      deathPlace: item.deathPlace,
    };
  });

  function render() {
    placeInfo.forEach(renderCard);
  }

  function renderCard({image,name,placeOfBirth,dateOfBirth,rank,placeOfCall,dateDeath,deathPlace}) {
    const placeElement = placeTemplate.querySelector(".card").cloneNode(true);
    placeElement.querySelector(".card__img").src = image != "" ? image : "img/face.jpg";
    placeElement.querySelector(".card__title").textContent = name;
    placeElement.querySelector(".card__placeOfBirth").textContent = `Место рождения: ${placeOfBirth != "" ? placeOfBirth : "Неизвестно"}`;
    placeElement.querySelector(".card__dateOfBirth").textContent = `Дата рождения: ${dateOfBirth != "" ? dateOfBirth: "Неизвестно"}`;
    placeElement.querySelector(".card__rank").textContent = `Звание: ${rank != "" ? rank: "Неизвестно"}`;
    placeElement.querySelector(".card__placeOfCall").textContent = `Место призыва: ${placeOfCall != "" ? placeOfCall: "Неизвестно"}`;
    placeElement.querySelector(".card__dateDeath").textContent = `Дата смерти: ${dateDeath != "" ? dateDeath : "Неизвестно"}`;
    placeElement.querySelector(".card__deathPlace").textContent = `Место смерти: ${deathPlace != "" ? deathPlace : "Неизвестно"}`;

    placesContainer.prepend(placeElement);
  }

  render();
}