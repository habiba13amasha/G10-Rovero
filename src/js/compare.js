const allCars = JSON.parse(localStorage.getItem("cars") || "[]");
const compareIds = JSON.parse(localStorage.getItem("compareCars") || "[]");
const carsToCompare = allCars.filter(car => compareIds.includes(car.id.toString()));

const tableHeaders = document.getElementById("tableHeaders");
const tableBody = document.getElementById("compareTableBody");

// Features to compare
const features = [
    { label: "Image", key: "image_url", isImage: true },
    { label: "Name", key: "name" },
    { label: "Manufacturer", key: "manufacturer" },
    { label: "Year", key: "year" },
    { label: "Body Type", key: "body_type" },
    { label: "Transmission", key: "transmission" },
    { label: "Fuel Type", key: "fuel_type" },
    { label: "Seats", key: "num_of_seats" },
    { label: "Daily Rate ($)", key: "daily_rate" },
    { label: "Status", key: "status" }
];

// Populate headers
carsToCompare.forEach(car => {
    const th = document.createElement("th");
    th.innerText = car.name;
    tableHeaders.appendChild(th);
});

// Populate each feature row
features.forEach(feature => {
    const tr = document.createElement("tr");
    const featureCell = document.createElement("th");
    featureCell.innerText = feature.label;
    tr.appendChild(featureCell);

    carsToCompare.forEach(car => {
        const td = document.createElement("td");

        if (feature.isImage) {
            const link = document.createElement("a");
            link.href = `car_details_and_book.html?car_id=${car.id}`;

            const img = document.createElement("img");
            img.src = car[feature.key];
            img.alt = car.name;
            img.style.width = "100px";
            img.style.height = "60px";
            img.style.objectFit = "cover";

            link.appendChild(img);
            td.appendChild(link);
        } else {
            td.textContent = car[feature.key];
        }

        tr.appendChild(td);
    });

    tableBody.appendChild(tr);
});
