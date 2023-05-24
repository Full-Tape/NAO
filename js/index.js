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
      firstName: item.firstName,
      secondName: item.secondName,
      thirdName: item.thirdName,
      dateOfBirth: item.dateOfBirth,
    };
  });

  function render() {
    placeInfo.forEach(renderCard);
  }

  function renderCard({firstName,secondName,thirdName,dateOfBirth}) {
    const placeElement = placeTemplate.querySelector(".card").cloneNode(true);
    placeElement.querySelector(".card__title").textContent = firstName;
    placeElement.querySelector(".card__dateOfBirth").textContent = "Дата рождения: " + dateOfBirth;

    placesContainer.prepend(placeElement);
  }

  render();
}