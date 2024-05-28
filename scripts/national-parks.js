"use strict";
// Populate the dropdown menu with U.S. states
window.onload = function () {
  // HTML element variables
  const stateDropdown = document.getElementById("stateDropdown");
  const parkTypeDropdown = document.getElementById("parkTypeDropdown");
  const tableBody = document.getElementById("tableBody");
  const searchButton = document.getElementById("searchButton");
  // let searchTypeDropdown = document.getElementById("searchTypeDropdown");

  //functions
  function loadStateDropdown() {
    for (const state of locationsArray) {
      const option = document.createElement("option");
      option.value = state;
      option.innerText = state;
      stateDropdown.appendChild(option);
    }
  }
  function loadParkTypeDropdown() {
    for (const parkType of parkTypesArray) {
      const option = document.createElement("option");
      option.value = parkType;
      option.innerText = parkType;
      parkTypeDropdown.appendChild(option);
    }
  }

  function loadParkTable() {
    tableBody.innerHTML = "";

    let selectedValue = stateDropdown.value;
    const filteredParks = nationalParksArray.filter((park) => park.State === selectedValue);

    let locations = nationalParksArray;
    for (let location of filteredParks) {
      let row = tableBody.insertRow();

      let cellOne = row.insertCell(0);
      cellOne.innerText = location.LocationName;

      let cellTwo = row.insertCell(1);
      cellTwo.innerText = location.Address;

      let cellThree = row.insertCell(2);
      cellThree.innerText = location.City;

      let cellFour = row.insertCell(3);
      cellFour.innerText = location.State;

      let cellFive = row.insertCell(4);
      cellFive.innerText = location.ZipCode;

      let cellSix = row.insertCell(5);
      cellSix.innerText = location.Phone;

      let cellSeven = row.insertCell(6);
      cellSeven.innerText = location.Fax;
    }
  }
  //event handling
  searchButton.onclick = loadParkTable;
  //initial loading
  loadStateDropdown();
  loadParkTypeDropdown();
};

// // Display the selected state
// function displayState() {
//   const dropdown = document.getElementById("stateDropdown");
//   const selectedState = dropdown.options[dropdown.selectedIndex].text;
//   document.getElementById("selectedState").textContent = `Selected State: ${selectedState}`;
// }

// // Search button click event handler
// document.getElementById("searchButton").addEventListener("click", function () {
//   const searchType = document.getElementById("searchType").value;

//   if (searchType === "location") {
//     searchByLocation();
//   } else if (searchType === "type") {
//     searchByType();
//   }
// });

// // Search by location function
// function searchByLocation() {
//   const selectedState = document.getElementById("stateDropdown").value;
//   const results = nationalParksArray.filter((park) => park.State === selectedState);
//   displayResults(results);
// }

// // Search by park type function
// function searchByType() {
//   const selectedType = document.getElementById("typeSelect").value;
//   const results = nationalParksArray.filter((park) =>
//     park.LocationName.toLowerCase().includes(selectedType.toLowerCase())
//   );
//   displayResults(results);
// }

// // Display search results function
// function displayResults(results) {
//   const tableBody = document.getElementById("resultsTable").getElementsByTagName("tbody")[0];
//   tableBody.innerHTML = "";

//   results.forEach((park) => {
//     const row = tableBody.insertRow();
//     row.insertCell().textContent = park.LocationName;
//     row.insertCell().textContent = park.State;
//     if (park.Visit) {
//       const visitLink = document.createElement("a");
//       visitLink.href = park.Visit;
//       visitLink.textContent = "Visit";
//       visitLink.target = "_blank";
//       row.insertCell().appendChild(visitLink);
//     } else {
//       row.insertCell().textContent = "N/A";
