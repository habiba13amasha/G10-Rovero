import {getAuthUser} from "./auth.js"; // adjust the path if needed

const user = getAuthUser();

if (!user) {
    alert("You must be logged in to view bookings.");
    window.location.href = "login.html";
}

const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

// Filter bookings for the logged - in user
const userBookings = bookings.filter(b => b.user_id === user.id);

const bookingHistoryTable = document.getElementById("bookingHistoryTable");

if (userBookings.length === 0) {
    bookingHistoryTable.innerHTML = `
      <tr>
        <td colspan="6" class="text-center">No bookings found</td>
      </tr>
    `;
} else {
    userBookings.forEach((booking) => {
        const row = document.createElement("tr");
        row.innerHTML = `
  <td class="align-middle">${booking.carName || "Unknown"}</td>
  <td class="align-middle"><img src="${booking.carImage || "default.jpg"}" alt="${booking.carName || "Car"}" width="100"></td>
  <td class="align-middle">${booking.from_date}</td>
  <td class="align-middle">${booking.to_date}</td>
  <td class="align-middle">${booking.total}</td>
  <td class="align-middle">
    <button class="btn btn-danger btn-sm" onclick="cancelBooking(${booking.id})">Cancel</button>
  </td>
      `;
        bookingHistoryTable.appendChild(row);
    });
}

// Expose cancel function globally
window.cancelBooking = function (bookingId) {
    const confirmCancel = confirm("Are you sure you want to cancel this booking?");
    if (confirmCancel) {
        const updatedBookings = bookings.filter((booking) => booking.id !== bookingId || booking.user_id !== user.id);
        localStorage.setItem("bookings", JSON.stringify(updatedBookings));
        alert("Booking canceled successfully!");
        location.reload();
    }
};
