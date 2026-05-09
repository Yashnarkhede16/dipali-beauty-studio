// ================================
// MOBILE MENU
// ================================

const menuToggle =
  document.getElementById('menuToggle');

const navLinks =
  document.getElementById('navLinks');

if(menuToggle){

  menuToggle.addEventListener('click', () => {

    navLinks.classList.toggle('show');

  });

}

// ================================
// CLOSE MENU AFTER CLICK
// ================================

if(navLinks){

  navLinks.querySelectorAll('a').forEach(link => {

    link.addEventListener('click', () => {

      navLinks.classList.remove('show');

    });

  });

}

// ================================
// CUSTOMER REVIEWS
// ================================

const reviewForm =
  document.getElementById('reviewForm');

const reviewsGrid =
  document.getElementById('reviewsGrid');

// LOAD SAVED REVIEWS

window.addEventListener('load', () => {

  const savedReviews =
    JSON.parse(localStorage.getItem('reviews'))
    || [];

  savedReviews.forEach(review => {

    addReviewToUI(review);

  });

});

// SUBMIT REVIEW

reviewForm.addEventListener('submit', function(e){

  e.preventDefault();

  const name =
    document.getElementById('reviewName')
    .value
    .trim();

  const rating =
    document.getElementById('reviewRating')
    .value;

  const text =
    document.getElementById('reviewText')
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
    JSON.parse(localStorage.getItem('reviews'))
    || [];

  savedReviews.unshift(review);

  localStorage.setItem(
    'reviews',
    JSON.stringify(savedReviews)
  );

  // RESET FORM

  reviewForm.reset();

});

// FUNCTION

function addReviewToUI(review){

  const div =
    document.createElement('div');

  div.classList.add('review-card');

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
// GALLERY EXPAND BUTTON
// ================================

const expandBtn =
  document.getElementById('expandBtn');

const galleryGrid =
  document.getElementById('galleryGrid');

if(expandBtn){

  expandBtn.addEventListener('click', () => {

    galleryGrid.classList.toggle('show-all');

    // BUTTON TEXT CHANGE

    if(
      galleryGrid.classList.contains(
        'show-all'
      )
    ){

      expandBtn.innerText =
        'Show Less';

    }

    else{

      expandBtn.innerText =
        'View All Photos';

    }

  });

}

// ================================
// BOOKING FORM
// ================================

const bookingForm =
  document.getElementById('bookingForm');

const dateInput =
  document.getElementById('date');

// ================================
// SET MINIMUM DATE = TODAY
// ================================

if(dateInput){

  const today =
    new Date();

  const yyyy =
    today.getFullYear();

  const mm =
    String(today.getMonth() + 1)
    .padStart(2, '0');

  const dd =
    String(today.getDate())
    .padStart(2, '0');

  const minDate =
    `${yyyy}-${mm}-${dd}`;

  dateInput.setAttribute(
    'min',
    minDate
  );

}

// ================================
// CONVERT 12H TO 24H
// ================================

function convertTo24Hour(time12h){

  const [time, modifier] =
    time12h.split(' ');

  let [hours, minutes] =
    time.split(':');

  hours = parseInt(hours);

  if(
    modifier === 'PM' &&
    hours !== 12
  ){

    hours += 12;

  }

  if(
    modifier === 'AM' &&
    hours === 12
  ){

    hours = 0;

  }

  return `${String(hours)
    .padStart(2,'0')}:${minutes}`;

}

// ================================
// FORM SUBMIT
// ================================

if(bookingForm){

  bookingForm.addEventListener(
    'submit',
    function(e){

    e.preventDefault();

    // ================================
    // GET VALUES
    // ================================

    const firstName =
      document.getElementById(
        'firstName'
      )
      .value
      .trim();

    const lastName =
      document.getElementById(
        'lastName'
      )
      .value
      .trim();

    const phone =
      document.getElementById(
        'phone'
      )
      .value
      .trim();

    const address =
      document.getElementById(
        'address'
      )
      .value
      .trim();

    const selectedDate =
      document.getElementById(
        'date'
      )
      .value;

    const selectedTime =
      document.getElementById(
        'time'
      )
      .value;

    const service =
      document.getElementById(
        'service'
      )
      .value;

    const message =
      document.getElementById(
        'message'
      )
      .value
      .trim();

    // ================================
    // VALIDATE MOBILE
    // ================================

    if(phone.length < 10){

      alert(
        'Please enter valid mobile number.'
      );

      return;

    }

    // ================================
    // CONVERT TIME
    // ================================

    const convertedTime =
      convertTo24Hour(selectedTime);

    // ================================
    // CURRENT DATE/TIME
    // ================================

    const currentDateTime =
      new Date();

    // ================================
    // BOOKING DATE/TIME
    // ================================

    const bookingDateTime =
      new Date(
        `${selectedDate}T${convertedTime}`
      );

    // ================================
    // CHECK FUTURE DATE/TIME
    // ================================

    if(
      bookingDateTime <=
      currentDateTime
    ){

      alert(
        'Please select future appointment date and time.'
      );

      return;

    }

    // ================================
    // WHATSAPP NUMBER
    // ================================

    const whatsappNumber =
      '919421522796';

    // ================================
    // WHATSAPP MESSAGE
    // ================================

    const whatsappMessage =

`📌 NEW APPOINTMENT BOOKING

----------------------------

🙂 First Name: ${firstName}

🙂 Last Name: ${lastName}

📞 Mobile Number: ${phone}

🏠 Address:
${address}

📅 Appointment Date:
${selectedDate}

⏰ Appointment Time:
${selectedTime}

💄 Selected Service:
${service}

📝 Additional Notes:
${message}

----------------------------

Thank you
Dipali Beauty Studio`;

    // ================================
    // ENCODE MESSAGE
    // ================================

    const encodedMessage =
      encodeURIComponent(
        whatsappMessage
      );

    // ================================
    // CREATE URL
    // ================================

    const whatsappURL =
`https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // ================================
    // OPEN WHATSAPP
    // ================================

    try {

      const newWindow =
        window.open(
          whatsappURL,
          '_blank'
        );

      if(newWindow){

        alert(
          'Appointment request sent successfully!'
        );

        bookingForm.reset();

      }

      else {

        alert(
          'Failed to open WhatsApp. Please allow popups.'
        );

      }

    }

    catch(error){

      alert(
        'Booking failed due to browser or network issue.'
      );

    }

  });

}