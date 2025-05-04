# Rovero Car Rental Website

**Rovero** is a web-based car rental service that simulates a real-world rental experience using only client-side technologies. It features user authentication, car browsing, bookings, and an admin dashboard.

---

## 🚀 Technologies Used

- **HTML**, **CSS**, **JavaScript**
- **Bootstrap 5** for responsive UI
- **LocalStorage** to simulate a backend/database

---

## 🔄 User Flow

1. **Landing Page**  
   Visitors are introduced to Rovero with a clean, attractive landing page.

2. **Browse Cars**  
   Users can explore the available cars for rent.

3. **Authentication Required**  
   To view detailed car information or booking history, users must log in.

4. **Car Details & Booking**  
   After logging in, users can:
   - View full car details
   - Book a car (creates a booking with status: `Pending`)

5. **Checkout**  
   Users proceed to checkout and enter their personal and payment information.  
   Upon successful submission, the booking status is updated to `Completed`.

---

## 👤 User Roles

### Regular User
- Can browse and book cars
- Can view their own bookings
- Must be logged in to access certain features

### Admin
- If a user logs in with an **admin email**, they are redirected to the **Admin Dashboard**
- The admin can:
  - View all cars and bookings
  - Edit or manage car and booking data stored in LocalStorage

---

## 📦 Data Persistence

All data including:
- Cars
- Users
- Bookings
- Checkout details

...is stored in **LocalStorage** on the client’s browser, simulating a basic backend.

---

## 🧪 Development Notes

- Bookings are based on **price per day**, not hourly rates.
- Each booking includes: user ID, car ID, start/end dates, status, and total cost.
- Date calculations handle multiple-day rentals accurately.
- Admin features are triggered by checking for a predefined admin email.

---

## 🔐 Authentication (Simulated)

- No real backend or sessions — login state is stored in LocalStorage
- A sample user and admin email should be pre-populated in LocalStorage for testing

---

## ✅ To Do / Future Improvements

- Integrate a real backend (e.g., Firebase or Express + MongoDB)
- Add search and filter functionality for cars
- Improve validation and error handling
- Responsive design improvements for mobile devices
