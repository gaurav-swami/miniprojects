function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  const timeString = `${hours}:${minutes}:${seconds}`;

  document.getElementById("clock").innerText = timeString;
  // format to two digits
}
function getRandomColor() {
  let hexString = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    index = Math.floor(Math.random() * 10);
    color += hexString[index];
  }
  return color;
}
function updateColor() {
  let clock = document.getElementById("clock");
  clock.addEventListener("click", () => {
    clock.style.color = getRandomColor();
  });
}
updateClock();
updateColor();
setInterval(updateClock, 1000);
  