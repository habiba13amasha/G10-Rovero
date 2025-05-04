import {getAuthUser} from "./auth.js"; // Adjust path if needed

const user = getAuthUser();

if (!user) {
    alert("You must be logged in to view bookings.");
    window.location.href = "login.html";
}

const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
const cars = JSON.parse(localStorage.getItem("cars")) || [];

const userBookings = bookings.filter(b => b.user_id === user.id);

const bookingHistoryTable = document.getElementById("bookingHistoryTable");

if (userBookings.length === 0) {
    bookingHistoryTable.innerHTML = `
      <tr>
        <td colspan="7" class="text-center">No bookings found</td>
      </tr>
    `;
} else {
    userBookings.forEach((booking) => {
        const car = cars.find(c => c.id === booking.car_id) || {};
        const carName = car.name || "Unknown";
        const carImage = car.image_url || "default.jpg";

        const fromDate = new Date(booking.from_date).toLocaleString();
        const toDate = new Date(booking.to_date).toLocaleString();

        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="align-middle">${carName}</td>
            <td class="align-middle"><img src="${carImage}" alt="${carName}" width="100"></td>
            <td class="align-middle">${fromDate}</td>
            <td class="align-middle">${toDate}</td>
            <td class="align-middle">$${booking.total}</td>
            <td class="align-middle">${booking.booking_status || "Pending"}</td>
            <td class="align-middle">
                <button class="btn btn-danger btn-sm mb-1" onclick="cancelBooking(${booking.id})">Cancel</button><br/>
                <button class="btn btn-primary btn-sm" onclick="proceedToCheckout(${booking.id})">Checkout</button>
            </td>
        `;
        bookingHistoryTable.appendChild(row);
    });
}

// Cancel booking function
window.cancelBooking = function (bookingId) {
    const confirmCancel = confirm("Are you sure you want to cancel this booking?");
    if (confirmCancel) {
        const updatedBookings = bookings.filter((booking) => booking.id !== bookingId || booking.user_id !== user.id);
        localStorage.setItem("bookings", JSON.stringify(updatedBookings));
        alert("Booking canceled successfully!");
        location.reload();
    }
};

// Proceed to checkout
window.proceedToCheckout = function (bookingId) {
    window.location.href = `./checkout/checkout.html?booking_id=${bookingId}`;
};
