"use strict";

window.onload = function () {
  const mountainSelect = document.querySelector("#mountainSelect");
  const mountainInfoDiv = document.querySelector("#mountainInfo");
  const bgVideo = document.getElementById("bgVideo");
  const videoSources = ["videos/1.mp4", "videos/2.mp4", "videos/3.mp4", "videos/4.mp4", "videos/5.mp4", "videos/6.mp4"];
  let currentVideoIndex = 0;

  function preloadVideos() {
    videoSources.forEach((src) => {
      const video = new Audio(src);
      video.load();
    });
  }

  function playNextVideo() {
    bgVideo.src = videoSources[currentVideoIndex];
    bgVideo.play();
    currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
    setTimeout(playNextVideo, 6000); // Play the next video after 6 seconds
  }

  bgVideo.addEventListener("ended", playNextVideo);

  // Initial play
  playNextVideo();

  // Function to initialize the mountain options and details
  function initializeMountains() {
    const sortedMountains = mountainsArray.sort((a, b) => a.name.localeCompare(b.name));
    sortedMountains.forEach((mountain) => {
      createMountainOption(mountain);
    });
  }

  // Function to create an option element for each mountain
  function createMountainOption(mountain) {
    const option = document.createElement("option");
    option.value = mountain.name;
    option.textContent = mountain.name;
    mountainSelect.appendChild(option);
  }

  // Function to display the details of the selected mountain
  function displayMountainDetails() {
    mountainInfoDiv.innerHTML = "";

    const selectedMountain = mountainsArray.find((mountain) => mountain.name === mountainSelect.value);
    if (selectedMountain) {
      const card = document.createElement("div");
      card.className = "card mt-5 custom-card-m d-flex justify-content-center";
      mountainInfoDiv.appendChild(card);

      const cardBody = document.createElement("div");
      cardBody.className = "card-body cardb-bg justify-content-center";
      card.appendChild(cardBody);

      // Create and append name element
      const name = document.createElement("h5");
      name.textContent = selectedMountain.name;
      cardBody.appendChild(name);

      // Create and append description element
      const description = document.createElement("p");
      description.textContent = `Description: ${selectedMountain.desc}`;
      cardBody.appendChild(description);

      // Create and append elevation element
      const elevation = document.createElement("p");
      elevation.textContent = `Elevation: ${selectedMountain.elevation}`;
      cardBody.appendChild(elevation);

      // Fetch and display sunrise and sunset times
      fetchSunsetTimes(selectedMountain.coords.lat, selectedMountain.coords.lng).then((data) => {
        const sunrise = document.createElement("p");
        sunrise.textContent = `Sunrise: ${data.results.sunrise} UTC`;
        cardBody.appendChild(sunrise);

        const sunset = document.createElement("p");
        sunset.textContent = `Sunset: ${data.results.sunset} UTC`;
        cardBody.appendChild(sunset);
      });
    }
  }

  initializeMountains();
  mountainSelect.addEventListener("change", displayMountainDetails);
};
