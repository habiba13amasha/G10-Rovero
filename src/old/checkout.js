// Parse booking_id from URL
const params = new URLSearchParams(window.location.search);
const bookingId = params.get("booking_id");

// Fetch all bookings from localStorage
const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];

// Find the booking by ID
const bookingData = allBookings.find(b => String(b.id) === bookingId);

// Populate the Booking Summary if booking found
if (bookingData) {
  document.getElementById("carImage").src = bookingData.carImage || "default.jpg";
  document.getElementById("carName").textContent = bookingData.carName || "N/A";
  document.getElementById("pricePerHour").textContent = bookingData.pricePerHour || 0;

  // Calculate booking hours
  const from = new Date(bookingData.from_date);
  const to = new Date(bookingData.to_date);
  const diffMs = to - from;
  const hours = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60)));

  document.getElementById("bookingHours").textContent = hours;
  const total = bookingData.pricePerHour * hours;
  document.getElementById("totalPrice").textContent = total.toFixed(2);

  // Save hours and total in case needed later
  bookingData.hours = hours;
  bookingData.totalPrice = total;
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

  if (typeof name !== "string" || name.length < 3) {
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
    };

    localStorage.setItem("checkoutDetails", JSON.stringify(checkoutInfo));
    alert("Booking successful! Redirecting to Payment page...");
    window.location.href = "payment.html";
  }
});
