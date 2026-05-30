// set the clock to the current time in 24 hour format
const clock = document.querySelector(".alarm-clock");
const currentTime = new Date();
const hours = currentTime.getHours().toString().padStart(2, "0");
const minutes = currentTime.getMinutes().toString().padStart(2, "0");
clock.innerText = `${hours}:${minutes}`;

// update the clock every 10 seconds
setInterval(() => {
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  clock.innerText = `${hours}:${minutes}`;
}, 10000);

// render alarms from js or memory
function renderAlarms(alarms) {
  const alarmList = document.querySelector(".alarm-list");
  alarmList.innerHTML = "";
  alarms.forEach((alarm) => {
    const li = document.createElement("li");
    li.className = "alarm-list-item";
    if (alarm.enabled) {
      li.classList.add("alarm-list-item-active");
    }
    li.id = alarm.id;
    li.innerHTML = `
    <div class="alarm-list-item-element alarm-list-item-button-wrapper">
    <button class="alarm-list-item-button"></button>
    </div>
    <div class="alarm-list-item-element alarm-list-item-time">${alarm.time}</div>
    <div class="alarm-list-item-element alarm-list-item-description">${alarm.label}</div>
    `;
    alarmList.appendChild(li);
  });
}

if (localStorage.getItem("alarms")) {
  alarms = JSON.parse(localStorage.getItem("alarms"));

  renderAlarms(alarms);
} else {
  // create default alarms
  alarms = [
    {
      id: 0,
      time: "08:00",
      label: "Wake up!",
      enabled: false,
    },
    {
      id: 1,
      time: "13:30",
      label: "Lunch",
      enabled: false,
    },
    {
      id: 2,
      time: "19:20",
      label: "Training",
      enabled: false,
    },
  ];
  localStorage.setItem("alarms", JSON.stringify(alarms));

  renderAlarms(alarms);
}

// ================== EVENT LISTENERS ==================

document.addEventListener("click", (e) => {
  const target = e.target;

  // Alarm main button functionality
  const alarmButton = target.closest(".alarm-list-item-button");
  const alarmButtonDelete = target.closest(".alarm-list-item-button--delete");

  if (alarmButton) {
    const alarmListItem = alarmButton.closest(".alarm-list-item");
    const alarmId = Number(alarmListItem.id);
    const alarms = JSON.parse(localStorage.getItem("alarms"));
    if (alarmButtonDelete) {
      // FUTURE PLACE FOR IMPLEMENTING ALARM DELETE FUNCTIONALITY 🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥⬜🟥
      console.log("alarm button delete pressed");
      return;
    }
    alarms.forEach((alarm) => {
      if (alarm.id === alarmId) {
        if (alarm.enabled) {
          alarm.enabled = false;
          alarmListItem.classList.remove("alarm-list-item-active");
        } else {
          alarm.enabled = true;
          alarmListItem.classList.add("alarm-list-item-active");
        }
      }
    });
    localStorage.setItem("alarms", JSON.stringify(alarms));
    return;
  }

  // Alarm add button functionality
  const alarmAddButton = target.closest(".controls__button--add");
  const modal = document.querySelector(".modal");

  if (alarmAddButton) {
    modal.classList.add("modal-open");
    return;
  }

  const targetModalInner = target.classList.contains("modal__inner");
  const targetModalCloseButton = target.closest(".modal__close-btn");

  const modalTimeInput = document.querySelector(".modal__window-input--time");
  const modalDescriptionInput = document.querySelector(
    ".modal__window-input--description",
  );
  const targetModalSaveButton = target.closest(".modal__save-btn");

  if (targetModalInner || targetModalCloseButton) {
    modal.classList.remove("modal-open");
    modalTimeInput.value = "08:00";
    modalDescriptionInput.value = "";
    return;
  }

  if (targetModalSaveButton) {
    if (!modalTimeInput.value || !modalDescriptionInput.value) {
      modalTimeInput.value = "08:00";
      modalDescriptionInput.value = "Alarm";
    }
    // save alarm to local storage
    const alarms = JSON.parse(localStorage.getItem("alarms"));
    alarms.push({
      id: alarms.length,
      time: modalTimeInput.value,
      label: modalDescriptionInput.value,
      enabled: true,
    });
    // sort alarms by time
    alarms.sort((a, b) => a.time.localeCompare(b.time));
    localStorage.setItem("alarms", JSON.stringify(alarms));
    renderAlarms(alarms);
    modal.classList.remove("modal-open");
  }
});

// toggle alarm
// function toggleAlarm(id) {

// update alarms in local storage
// const alarms = JSON.parse(localStorage.getItem("alarms"));
// alarms.forEach((alarm) => {
//   if (alarm.id === id) {
//     const alarmListItem = document.getElementById(id);
//     const clickedButton = alarmListItem.querySelector(".alarm-list-item-button");
//     if (clickedButton.classList.contains("alarm-list-item-button--delete")) {
// we need to delete the alarm
//   alarmListItem.remove();
//   get new alarm list and save it to the local storage
//   const newAlarmList = document.querySelectorAll(".alarm-list-item");
//   localStorage.setItem("alarms", JSON.stringify(newAlarmList));
//   renderAlarms(newAlarmList);
//   return;
// }

//       if (alarm.enabled) {
//         // console.log("was enabled");
//         alarm.enabled = false;
//         alarmListItem.classList.remove("alarm-list-item-active");
//       } else {
//         // console.log("was disabled");
//         alarm.enabled = true;
//         alarmListItem.classList.add("alarm-list-item-active");
//       }
//     }
//   });
//   localStorage.setItem("alarms", JSON.stringify(alarms));
// }

// // save alarm
// function saveAlarm() {
//   const modal = document.querySelector('.modal');
//   const modalInput = document.querySelector('.modal__window-input--time');
//   const modalInputDescription = document.querySelector('.modal__window-input--description');
//   const alarmTime = modalInput.value;
//   const alarmDescription = modalInputDescription.value;
//   const alarms = JSON.parse(localStorage.getItem("alarms"));
//   alarms.push({
//     id: alarms.length,
//     time: alarmTime,
//     label: alarmDescription,
//     enabled: true,
//   });
//   localStorage.setItem("alarms", JSON.stringify(alarms));
//   renderAlarms(alarms);
//   modal.classList.remove('modal-open');
// }

// // close modal
// function closeModal() {
//   const modal = document.querySelector('.modal');
//   modal.classList.remove('modal-open');
// }

// // open modal
// function openModal() {
//   const modal = document.querySelector('.modal');
//   modal.classList.add('modal-open');
// }

// // delete alarm functionality

// function deleteMode() {
//   const alarmList = document.querySelector(".alarm-list");
//   console.log(alarmList);
//   alarmList.querySelectorAll(".alarm-list-item").forEach((alarm) => {
//     console.log(alarm.querySelector(".alarm-list-item-button"));
//     alarm.querySelector(".alarm-list-item-button").classList.toggle("alarm-list-item-button--delete");
//   });
//   const deleteButton = document.querySelector(".controls__button--delete");
//   deleteButton.classList.toggle("controls__button--active");
// }
