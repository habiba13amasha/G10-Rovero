const carData = JSON.parse(localStorage.getItem("cars") || "[]");

const listingsContainer = document.getElementById("car-listings");
const manufacturerFilters = document.getElementById("manufacturer-filters");
const fuelFilters = document.getElementById("fuel-filters");
const priceRange = document.getElementById("priceRange");
const priceLabel = document.getElementById("priceLabel");

function getUniqueValues(arr, key) {
  return [...new Set(arr.map(item => item[key]))];
}

function createFilters() {
  const manufacturers = getUniqueValues(carData, "manufacturer");
  const fuels = getUniqueValues(carData, "fuel_type");

  manufacturerFilters.innerHTML = manufacturers.map(m =>
      `<div><input type="checkbox" class="manufacturer-filter" value="${m}"> ${m}</div>`
  ).join("");

  fuelFilters.innerHTML = fuels.map(f =>
      `<div><input type="checkbox" class="fuel-filter" value="${f}"> ${f}</div>`
  ).join("");
}

function filterCars() {
  const selectedManufacturers = [...document.querySelectorAll(".manufacturer-filter:checked")].map(cb => cb.value);
  const selectedFuels = [...document.querySelectorAll(".fuel-filter:checked")].map(cb => cb.value);
  const maxPrice = parseInt(priceRange.value, 10);

  const filteredCars = carData.filter(car =>
      (selectedManufacturers.length === 0 || selectedManufacturers.includes(car.manufacturer)) &&
      (selectedFuels.length === 0 || selectedFuels.includes(car.fuel_type)) &&
      car.daily_rate <= maxPrice &&
      car.status.toLowerCase() === "available"
  );

  displayCars(filteredCars);
}

function displayCars(cars) {
  const compareList = JSON.parse(localStorage.getItem("compareCars")) || [];

  listingsContainer.innerHTML = cars.map(car => {
    const isChecked = compareList.includes(car.id.toString()) ? "checked" : "";

    return `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <img src="${car.image_url}" class="card-img-top" alt="${car.name}" />
          <div class="card-body">
            <h5 class="card-title">${car.name}</h5>
            <p class="card-text">
              <strong>$${car.daily_rate}/day</strong><br />
              ${car.fuel_type} · ${car.year} · ${car.transmission}
            </p>
            <div class="form-check mb-2">
              <input class="form-check-input compare-checkbox" type="checkbox" value="${car.id}" id="compare-${car.id}" ${isChecked}>
              <label class="form-check-label" for="compare-${car.id}">
                Compare
              </label>
            </div>
            <a href="car_details_and_book.html?car_id=${car.id}" class="btn btn-dark w-100">Rent Now</a>
          </div>
        </div>
      </div>
    `;
  }).join("");

  setupCompareCheckboxes();
}

function setupCompareCheckboxes() {
  document.querySelectorAll(".compare-checkbox").forEach(checkbox => {
    checkbox.addEventListener("change", (e) => {
      const carId = e.target.value;
      let compareList = JSON.parse(localStorage.getItem("compareCars")) || [];

      if (e.target.checked) {
        if (!compareList.includes(carId)) {
          compareList.push(carId);
        }
      } else {
        compareList = compareList.filter(id => id !== carId);
      }

      localStorage.setItem("compareCars", JSON.stringify(compareList));
    });
  });
}

function clearFilters() {
  document.querySelectorAll(".manufacturer-filter, .fuel-filter").forEach(cb => cb.checked = false);
  priceRange.value = priceRange.max;
  priceLabel.textContent = `Up to $${priceRange.max}`;
  filterCars();
}

document.addEventListener("DOMContentLoaded", () => {
  createFilters();
  priceLabel.textContent = `Up to $${priceRange.value}`;
  displayCars(carData.filter(car => car.status.toLowerCase() === "available"));

  manufacturerFilters.addEventListener("change", filterCars);
  fuelFilters.addEventListener("change", filterCars);

  priceRange.addEventListener("input", () => {
    priceLabel.textContent = `Up to $${priceRange.value}`;
    filterCars();
  });

  document.querySelector(".btn-secondary").addEventListener("click", clearFilters);
});
