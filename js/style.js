// ================================
// MOBILE MENU
// ================================

const menuToggle =
  document.getElementById("menuToggle");

const navLinks =
  document.getElementById("navLinks");

if (menuToggle) {

  menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("show");

  });

}

// ================================
// CLOSE MENU AFTER CLICK
// ================================

if (navLinks) {

  navLinks
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("show");

      });

    });

}

// =========================
// GALLERY SCROLL
// =========================

const galleryScroll =
  document.getElementById("galleryScroll");

const scrollLeftBtn =
  document.getElementById("scrollLeft");

const scrollRightBtn =
  document.getElementById("scrollRight");

if (scrollLeftBtn && galleryScroll) {

  scrollLeftBtn.addEventListener("click", () => {

    galleryScroll.scrollBy({
      left: -320,
      behavior: "smooth"
    });

  });

}

if (scrollRightBtn && galleryScroll) {

  scrollRightBtn.addEventListener("click", () => {

    galleryScroll.scrollBy({
      left: 320,
      behavior: "smooth"
    });

  });

}

// =========================
// IMAGE POPUP
// =========================

const popup =
  document.getElementById("imagePopup");

const popupImage =
  document.getElementById("popupImage");

const closePopup =
  document.getElementById("closePopup");

const galleryImages =
  document.querySelectorAll(".gallery-card img");

galleryImages.forEach((img) => {

  img.addEventListener("click", () => {

    popup.style.display = "flex";

    popupImage.src = img.src;

  });

});

if (closePopup) {

  closePopup.addEventListener("click", () => {

    popup.style.display = "none";

  });

}

if (popup) {

  popup.addEventListener("click", (e) => {

    if (e.target === popup) {

      popup.style.display = "none";

    }

  });

}

// ================================
// REVIEW SYSTEM
// ================================

const reviewForm =
  document.getElementById("reviewForm");

const reviewsGrid =
  document.getElementById("reviewsGrid");

// LOAD REVIEWS

window.addEventListener("load", () => {

  const savedReviews =
    JSON.parse(
      localStorage.getItem("reviews")
    ) || [];

  savedReviews.forEach(review => {

    addReviewToUI(review);

  });

});

// SUBMIT REVIEW

if (reviewForm) {

  reviewForm.addEventListener(
    "submit",
    function (e) {

      e.preventDefault();

      const name =
        document
          .getElementById("reviewName")
          .value
          .trim();

      const rating =
        document
          .getElementById("reviewRating")
          .value;

      const text =
        document
          .getElementById("reviewText")
          .value
          .trim();

      const review = {
        name,
        rating,
        text
      };

      // ADD TO UI

      addReviewToUI(review);

      // SAVE TO LOCAL STORAGE

      const savedReviews =
        JSON.parse(
          localStorage.getItem("reviews")
        ) || [];

      savedReviews.unshift(review);

      localStorage.setItem(
        "reviews",
        JSON.stringify(savedReviews)
      );

      // RESET FORM

      reviewForm.reset();

      alert(
        "Thank you for your review ❤️"
      );

    });

}

// ADD REVIEW FUNCTION

function addReviewToUI(review) {

  const div =
    document.createElement("div");

  div.classList.add("review-card");

  div.innerHTML = `

    <div class="review-stars">
      ${review.rating}
    </div>

    <p class="review-text">
      "${review.text}"
    </p>

    <div class="review-name">
      — ${review.name}
    </div>

  `;

  reviewsGrid.prepend(div);

}

// ================================
// BOOKING FORM
// ================================

const bookingForm =
  document.getElementById("bookingForm");

const dateInput =
  document.getElementById("date");

const timeSelect =
  document.getElementById("time");

// ================================
// MIN DATE = TODAY
// ================================

if (dateInput) {

  const today =
    new Date();

  const yyyy =
    today.getFullYear();

  const mm =
    String(today.getMonth() + 1)
      .padStart(2, "0");

  const dd =
    String(today.getDate())
      .padStart(2, "0");

  const minDate =
    `${yyyy}-${mm}-${dd}`;

  dateInput.setAttribute(
    "min",
    minDate
  );

}

// ================================
// ALL TIME OPTIONS
// ================================

const allTimeOptions = [

  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM"

];

// ================================
// CONVERT TIME
// ================================

function convertTo24Hour(time12h) {

  const [time, modifier] =
    time12h.split(" ");

  let [hours, minutes] =
    time.split(":");

  hours = parseInt(hours);

  if (
    modifier === "PM" &&
    hours !== 12
  ) {

    hours += 12;

  }

  if (
    modifier === "AM" &&
    hours === 12
  ) {

    hours = 0;

  }

  return `${String(hours)
    .padStart(2, "0")}:${minutes}`;

}

// ================================
// UPDATE TIME OPTIONS
// ================================

function updateTimeOptions() {

  if (!dateInput || !timeSelect) return;

  const selectedDate =
    dateInput.value;

  const today =
    new Date();

  const currentDate =
    today.toISOString().split("T")[0];

  // RESET OPTIONS

  timeSelect.innerHTML = `
    <option value="">
      Select Time
    </option>
  `;

  allTimeOptions.forEach(time => {

    let showOption = true;

    // IF TODAY SELECTED

    if (selectedDate === currentDate) {

      const currentHours =
        today.getHours();

      const currentMinutes =
        today.getMinutes();

      const currentTime =
        `${String(currentHours)
          .padStart(2, "0")}:${String(currentMinutes)
          .padStart(2, "0")}`;

      const option24 =
        convertTo24Hour(time);

      // HIDE PAST TIME

      if (option24 <= currentTime) {

        showOption = false;

      }

    }

    // ADD OPTION

    if (showOption) {

      const option =
        document.createElement("option");

      option.value = time;

      option.textContent = time;

      timeSelect.appendChild(option);

    }

  });

}

// DATE CHANGE

if (dateInput) {

  dateInput.addEventListener(
    "change",
    updateTimeOptions
  );

}

// INITIAL LOAD

updateTimeOptions();

// ================================
// BOOKING SUBMIT
// ================================

if (bookingForm) {

  bookingForm.addEventListener(
    "submit",
    function (e) {

      e.preventDefault();

      // GET VALUES

      const firstName =
        document
          .getElementById("firstName")
          .value
          .trim();

      const lastName =
        document
          .getElementById("lastName")
          .value
          .trim();

      const phone =
        document
          .getElementById("phone")
          .value
          .trim();

      const address =
        document
          .getElementById("address")
          .value
          .trim();

      const selectedDate =
        document
          .getElementById("date")
          .value;

      const selectedTime =
        document
          .getElementById("time")
          .value;

      const service =
        document
          .getElementById("service")
          .value;

      const message =
        document
          .getElementById("message")
          .value
          .trim();

      // MOBILE VALIDATION

      const mobilePattern =
        /^[6-9]\d{9}$/;

      if (
        !mobilePattern.test(phone)
      ) {

        alert(
          "Enter valid 10 digit mobile number."
        );

        return;

      }

      // CHECK DATE & TIME

      const convertedTime =
        convertTo24Hour(selectedTime);

      const currentDateTime =
        new Date();

      const bookingDateTime =
        new Date(
          `${selectedDate}T${convertedTime}`
        );

      if (
        bookingDateTime <=
        currentDateTime
      ) {

        alert(
          "Please select future appointment date and time."
        );

        return;

      }

      // WHATSAPP MESSAGE

      const whatsappMessage =

`🌸 *NEW APPOINTMENT BOOKING* 🌸

👩 Name:
${firstName} ${lastName}

📞 Mobile:
${phone}

🏠 Address:
${address}

📅 Appointment Date:
${selectedDate}

⏰ Appointment Time:
${selectedTime}

💄 Service:
${service}

📝 Notes:
${message || "NA"}

Thank you ❤️
Dipali Beauty Studio`;

      // WHATSAPP NUMBER

      const whatsappNumber =
        "919421522796";

      // WHATSAPP URL

      const whatsappURL =
`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

      // OPEN WHATSAPP

      window.open(
        whatsappURL,
        "_blank"
      );

      // SUCCESS MESSAGE

      alert(
        "Booking request submitted successfully ❤️"
      );

      // RESET FORM

      bookingForm.reset();

    });

}