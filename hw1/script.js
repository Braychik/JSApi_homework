const workoutsInfo = JSON.parse(data);


console.log(workoutsInfo);

const contentTable = document.querySelector('.table');
workoutsInfo.forEach((element) => {
    contentTable.insertAdjacentHTML(
      "beforeend",
      `
    // <table>
    //     <tr><th>название занятия</th><td>${element.name}</td></tr> 
    //     <tr><th>время проведения занятия</th><td>${element.time}</td></tr> 
    //     <tr><th>максимальное количество участников</th><td class = "span">${element.maxParticipants}</td></tr> 
    //     <tr><th>текущее количество участников</th><td class = "span">${element.currentParticipants}</td></tr> 
    //     <tr><th>кнопка "записаться"</th><td><button class = "button-submit" id="${element.id}>Записаться</button></td></tr> 
    //     <tr><th>кнопка "отменить запись""</th><td><button class = "button-cansel-submit" data-id="${element.name}>Отменить запись</button></td></tr> 
    // </table>
  `
    );
    if (Number(element.maxParticipants) === Number(element.currentParticipants)) {
      const submitButton = document.getElementById(`${element.id}`);
      submitButton.classList.add('disabled');
  }
  });


  contentTable.addEventListener('click', function (e) {
    if (e.target.classList.contains('button-submit')) {
        workoutsInfo[e.target.id - 1].currentParticipants = Number(workoutsInfo[e.target.id - 1].currentParticipants) + 1;
        const currentNumberOfParticipants = document.querySelector(`[data-id="${e.target.id}"]`);
        const span = currentNumberOfParticipants.querySelector('.span');
        span.textContent = workoutsInfo[e.target.id - 1].currentParticipants;

        const currentSubmitButton = document.getElementById(`${e.target.id}`);
        currentSubmitButton.classList.add('disabled');
        currentSubmitButton.nextElementSibling.classList.remove('disabled');
    }
    if (e.target.classList.contains('button-cansel-submit')) {
        console.log(workoutsInfo);
        let currentWorkoutsInfoItem = workoutsInfo.filter(element => element.name === e.target.dataset.id);
        let index = Number(currentWorkoutsInfoItem[0].id) - 1;
        workoutsInfo[index].currentParticipants = workoutsInfo[index].currentParticipants - 1;

        const currentNumberOfParticipants = document.querySelector(`[data-id="${index + 1}"]`);
        const span = currentNumberOfParticipants.querySelector('.span');
        span.textContent = workoutsInfo[index].currentParticipants;

        const currentCancelButton = document.querySelector(`[data-id="${e.target.dataset.id}"]`);
        currentCancelButton.classList.add('disabled');
        currentCancelButton.previousElementSibling.classList.remove('disabled');
    }
});