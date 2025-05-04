const params = new URLSearchParams(window.location.search);
const bookingId = params.get("booking_id");

const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
const allCars = JSON.parse(localStorage.getItem("cars")) || [];

const bookingData = allBookings.find(b => String(b.id) === bookingId);

if (bookingData) {
    const car = allCars.find(c => c.id === bookingData.car_id);

    if (!car) {
        alert("Car not found for this booking.");
    } else {
        const from = new Date(bookingData.from_date);
        const to = new Date(bookingData.to_date);
        const diffMs = to - from;
        const days = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

        const pricePerDay = car.daily_rate;
        const total = pricePerDay * (days + 1);

        // Update UI
        document.getElementById("carImage").src = car.image_url || "default.jpg";
        document.getElementById("carName").textContent = car.name || "N/A";
        document.getElementById("pricePerDay").textContent = pricePerDay.toFixed(2);
        document.getElementById("bookingDays").textContent = days + 1;
        document.getElementById("totalPrice").textContent = total.toFixed(2);

        // Save enriched data to bookingData for later submission
        bookingData.total = total;
        bookingData.days = days;
        bookingData.carName = car.name;
        bookingData.carImage = car.image_url;
        bookingData.price_per_day = pricePerDay;
    }
} else {
    alert("Booking not found.");
}

// Handle form submission
document.getElementById("checkoutForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const location = document.getElementById("location").value.trim();
    const phone = document.getElementById("phone").value.trim();

    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("locationError").textContent = "";
    document.getElementById("phoneError").textContent = "";

    let isValid = true;

    if (name.length < 3) {
        document.getElementById("nameError").textContent = "Name must be at least 3 characters long";
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById("emailError").textContent = "Please enter a valid email address";
        isValid = false;
    }

    if (location.length < 3) {
        document.getElementById("locationError").textContent = "Location must be at least 3 characters long";
        isValid = false;
    }

    if (phone.length < 10) {
        document.getElementById("phoneError").textContent = "Phone number must be at least 10 digits long";
        isValid = false;
    }

    if (isValid && bookingData) {
        const checkoutInfo = {
            ...bookingData,
            name,
            email,
            location,
            phone,
            booking_status: "Completed"
        };

        localStorage.setItem("checkoutDetails", JSON.stringify(checkoutInfo));

        // Update booking in localStorage
        const updatedBookings = allBookings.map(b =>
            String(b.id) === bookingId ? {...checkoutInfo} : b
        );
        localStorage.setItem("bookings", JSON.stringify(updatedBookings));

        alert("Booking successful! Redirecting to browse car page...");
        window.location.href = "../car_list.html";
    }
});
