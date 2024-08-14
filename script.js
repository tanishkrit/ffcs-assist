document.addEventListener("DOMContentLoaded", () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const slots = ["08:30 - 10:00", "10:05 - 11:35" , "11:40 - 1:10", "1:15 - 2:45", "2:50 - 4:20", "4:25 - 5:55", "6:00 - 7:30"];

  const data = [
    ["A11", "B11", "C11", "A21", "A14", "B21", "C21"], // Monday
    ["D11", "E11", "F11", "D21", "E14", "E21", "F21"], // Tuesday
    ["A12", "B12", "C12", "A22", "B14", "B22", "A24"], // Wednesday
    ["D12", "E12", "F12", "D22", "F14", "E22", "F22"], // Thursday
    ["A13", "B13", "C13", "A23", "C14", "B23", "B24"], // Friday
    ["D13", "E13", "F13", "D23", "D14", "D24", "E23"], // Saturday
  ];

  const gridContainer = document.getElementById("grid-container");
  const colorOptionsContainer = document.getElementById("color-options");

  const headerEmpty = document.createElement("div");
  headerEmpty.classList.add("grid-item", "header");
  gridContainer.appendChild(headerEmpty);

  slots.forEach((slot, index) => {
    const slotHeader = document.createElement("div");
    slotHeader.classList.add("grid-item", "header");
    slotHeader.textContent = `Slot ${slot}`;
    gridContainer.appendChild(slotHeader);
    if (index === 2) {
      const lunchHeader = document.createElement("div");
      lunchHeader.classList.add("grid-item", "header");
      lunchHeader.textContent = "Lunch";
      gridContainer.appendChild(lunchHeader);
    }
  });

  let selectedColor = "";

  const handleClick = (event) => {
    const target = event.target;
    if (target.classList.contains("slot")) {
      if (target.classList.contains("highlight")) {
        target.classList.remove("highlight");
        target.style.backgroundColor = "";
        target.removeAttribute("data-color");
      } else {
        target.classList.add("highlight");
        if (selectedColor) {
          target.style.backgroundColor = selectedColor;
          target.setAttribute("data-color", selectedColor);
        }
      }
    }
  };

  days.forEach((day, dayIndex) => {
    const dayHeader = document.createElement("div");
    dayHeader.classList.add("grid-item", "header");
    dayHeader.textContent = day;
    gridContainer.appendChild(dayHeader);

    data[dayIndex].forEach((slotData, slotIndex) => {
      const slotItem = document.createElement("div");
      slotItem.classList.add("grid-item", "slot");
      slotItem.textContent = slotData;
      slotItem.addEventListener("click", handleClick);
      gridContainer.appendChild(slotItem);

      if (slotIndex === 2) {
        const lunchItem = document.createElement("div");
        lunchItem.classList.add("grid-item", "slot");
        lunchItem.textContent = "Lunch";
        lunchItem.style.backgroundColor = "#FFFFE0";
        gridContainer.appendChild(lunchItem);
      }
    });
  });

  const colors = [
    "#FFDDC1",
    "#FFC3A0",
    "#FFABAB",
    "#C1E1C1",
    "#D5AAFF",
    "#FFD700",
    "#ADFF2F",
  ];

  colors.forEach((color) => {
    const colorOption = document.createElement("div");
    colorOption.classList.add("color-option");
    colorOption.style.backgroundColor = color;
    colorOption.addEventListener("click", () => {
      document.querySelectorAll(".color-option.selected").forEach((option) => {
        option.classList.remove("selected");
      });

      colorOption.classList.add("selected");
      selectedColor = color;

      document.querySelectorAll(".grid-item.highlight").forEach((item) => {
        if (!item.getAttribute("data-color")) {
          item.style.backgroundColor = selectedColor;
          item.setAttribute("data-color", selectedColor);
        }
      });
    });
    colorOptionsContainer.appendChild(colorOption);
  });
});
