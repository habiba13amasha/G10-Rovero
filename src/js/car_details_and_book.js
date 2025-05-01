import { getAuthUser } from "./auth.js";

const user = getAuthUser();
if (!user) {
    alert("You must be logged in to view bookings.");
    window.location.href = "login.html";
}

const urlParams = new URLSearchParams(window.location.search);
const idParam = urlParams.get("car_id");

if (!idParam) {
    document.body.innerHTML = `
        <div class="text-center">
            <h1>404</h1>
            <h2>Page not found</h2>
            <p>The car ID is missing from the URL.</p>
        </div>`;
    document.title = "404";
    throw new Error("car_id not found in URL");
}

// Elements
const totalPrice = document.getElementById("totalPrice");
const bookButton = document.getElementById("bookingButton");
const carName = document.getElementById("carName");
const carDesc = document.getElementById("carDescription");
const carTransmission = document.getElementById("carTransmission");
const carYear = document.getElementById("carYear");
const carSeats = document.getElementById("carSeats");
const carImage = document.getElementById("carImage");
const carFuelType = document.getElementById("carFuelType");
const carDailyRate = document.getElementById("carDailyRate");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");

// Load car data
const cars = JSON.parse(localStorage.getItem("cars")) || [];
const currentCar = cars.find(c => String(c.id) === idParam);

if (!currentCar) {
    document.body.innerHTML = `
        <div class="text-center">
            <h1>404</h1>
            <h2>Car not found</h2>
            <p>The car you are looking for does not exist.</p>
        </div>`;
    document.title = "404";
    throw new Error("Car not found");
}

// Fill car info
carName.textContent = currentCar.name;
carDesc.textContent = currentCar.manufacturer + " " + currentCar.body_type;
carTransmission.textContent = currentCar.transmission;
carYear.textContent = currentCar.year;
carSeats.textContent = currentCar.num_of_seats;
carImage.src = currentCar.image_url;
carFuelType.textContent = currentCar.fuel_type;
carDailyRate.textContent = currentCar.daily_rate;
document.title = currentCar.name;

// Calculate and update total price
function updateTotal() {
    const start = new Date(startDateInput.value);
    const end = new Date(endDateInput.value);

    if (!isNaN(start) && !isNaN(end) && end >= start) {
        const durationInDays = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
        const total = durationInDays * currentCar.daily_rate;
        totalPrice.textContent = `Total: $${total.toFixed(2)}`;
        bookButton.removeAttribute("disabled");
    } else {
        totalPrice.textContent = "Total: $0";
        bookButton.setAttribute("disabled", true);
    }
}

startDateInput.addEventListener("change", updateTotal);
endDateInput.addEventListener("change", updateTotal);

// Booking logic
bookButton.addEventListener("click", () => {
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    if (!startDate || !endDate) {
        alert("Please select both start and end dates.");
        return;
    }

    const durationInDays = Math.floor((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;
    const total = durationInDays * currentCar.daily_rate;

    const newBooking = {
        user_id: user.id,
        car_id: currentCar.id,
        carName: currentCar.name,
        carImage: currentCar.image_url,
        startDate,
        endDate,
        totalPrice: `$${total.toFixed(2)}`
    };

    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    existingBookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(existingBookings));

    alert("Booking successful!");
    window.location.href = "user_booking_history.html";
});
