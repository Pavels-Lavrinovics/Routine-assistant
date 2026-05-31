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

  const targetTimersSwitchButton = target.closest(".clock__controls-button--timers");
  if (targetTimersSwitchButton) {
    const alarmsContent = document.querySelector(".clock__content--alarms");
    alarmsContent.classList.remove("clock__content--active");
    const timersContent = document.querySelector(".clock__content--timers");
    timersContent.classList.add("clock__content--active");
    const alarmsSwitchButton = document.querySelector(".clock__controls-button--alarms");
    alarmsSwitchButton.classList.remove("clock__controls-button--active");
    const timersSwitchButton = document.querySelector(".clock__controls-button--timers");
    timersSwitchButton.classList.add("clock__controls-button--active");
    const clockTitle = document.querySelector(".clock__title");
    clockTitle.innerText = "Timer";
    return;
  }
  const targetAlarmsSwitchButton = target.closest(".clock__controls-button--alarms");
  if (targetAlarmsSwitchButton) {
    const timersContent = document.querySelector(".clock__content--timers");
    timersContent.classList.remove("clock__content--active");
    const alarmsContent = document.querySelector(".clock__content--alarms");
    alarmsContent.classList.add("clock__content--active");
    const timersSwitchButton = document.querySelector(".clock__controls-button--timers");
    timersSwitchButton.classList.remove("clock__controls-button--active");
    const alarmsSwitchButton = document.querySelector(".clock__controls-button--alarms");
    alarmsSwitchButton.classList.add("clock__controls-button--active");
    const clockTitle = document.querySelector(".clock__title");
    clockTitle.innerText = "Alarms";
    return;
  }

  // Alarm main button functionality
  const targetAlarmButton = target.closest(".alarm-list-item-button");
  const targetAlarmButtonDelete = target.closest(
    ".alarm-list-item-button--delete",
  );

  if (targetAlarmButton) {
    const alarmListItem = targetAlarmButton.closest(".alarm-list-item");
    const alarmId = Number(alarmListItem.id);
    const alarms = JSON.parse(localStorage.getItem("alarms"));
    if (targetAlarmButtonDelete) {
      // remove alarm from local storage and alarm list
      alarmListItem.remove();
      // const alarms = JSON.parse(localStorage.getItem("alarms"));
      const updatedAlarms = alarms.filter((alarm) => alarm.id !== alarmId);
      localStorage.setItem("alarms", JSON.stringify(updatedAlarms));
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
  const targetAlarmAddButton = target.closest(".controls__button--add");
  const modal = document.querySelector(".modal");

  if (targetAlarmAddButton) {
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
      modalDescriptionInput.value = "Alarm";
    }
    // save alarm to local storage
    const alarms = JSON.parse(localStorage.getItem("alarms"));
    const nextId =
      alarms.length === 0
        ? 0
        : Math.max(...alarms.map((alarm) => alarm.id)) + 1;

    alarms.push({
      id: nextId,
      time: modalTimeInput.value,
      label: modalDescriptionInput.value,
      enabled: true,
    });
    // sort alarms by time
    alarms.sort((a, b) => a.time.localeCompare(b.time));
    localStorage.setItem("alarms", JSON.stringify(alarms));
    renderAlarms(alarms);
    modalTimeInput.value = "08:00";
    modalDescriptionInput.value = "";
    modal.classList.remove("modal-open");
  }

  const targetDeleteModalButton = target.closest(".controls__button--delete");
  const deleteModalButton = document.querySelector(".controls__button--delete");

  if (targetDeleteModalButton) {
    const alarmListButtons = document.querySelectorAll(
      ".alarm-list-item-button",
    );
    alarmListButtons.forEach((button) => {
      button.classList.toggle("alarm-list-item-button--delete");
    });
    deleteModalButton.classList.toggle("controls__button--active");
  }
});

// ================== ALARM FUNCTIONALITY ==================

// getting current time in 24 hour format
function getCurrentTimeString() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

// check alarms every 10 seconds
setInterval(checkAlarms, 10000);
function checkAlarms() {
  const now = getCurrentTimeString();
  const alarms = JSON.parse(localStorage.getItem("alarms")) || [];
  alarms.forEach((alarm) => {
    if (alarm.enabled && alarm.time === now) {
      triggerAlarm(alarm);
      localStorage.setItem("alarms", JSON.stringify(alarms));
      renderAlarms(alarms);
    }
  });
}
const alarmSound = new Audio("../audio/alarm.mp3");

async function triggerAlarm(alarm) {
  alarm.enabled = false;
  alarmSound.currentTime = 0;
  try {
    await alarmSound.play();
    alert(`It's ${alarm.label} time!`); 
  } catch (err) {
    if (err.name !== "AbortError") {
      console.error("Could not play alarm:", err);
    }
    alert(`It's ${alarm.label} time!`);
  }
  alarmSound.pause();
  alarmSound.currentTime = 0;

}