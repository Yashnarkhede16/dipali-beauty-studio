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

  navLinks
    .querySelectorAll('a')
    .forEach(link => {

      link.addEventListener('click', () => {

        navLinks.classList.remove('show');

      });

    });

}

// ================================
// GALLERY EXPAND
// ================================

const expandBtn =
  document.getElementById('expandBtn');

const galleryGrid =
  document.getElementById('galleryGrid');

if(expandBtn){

  expandBtn.addEventListener('click', () => {

    galleryGrid.classList.toggle('show-all');

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
// REVIEW SYSTEM
// ================================

const reviewForm =
  document.getElementById('reviewForm');

const reviewsGrid =
  document.getElementById('reviewsGrid');

// LOAD REVIEWS

window.addEventListener('load', () => {

  const savedReviews =
    JSON.parse(
      localStorage.getItem('reviews')
    ) || [];

  savedReviews.forEach(review => {

    addReviewToUI(review);

  });

});

// SUBMIT REVIEW

if(reviewForm){

  reviewForm.addEventListener(
    'submit',
    function(e){

      e.preventDefault();

      const name =
        document
          .getElementById('reviewName')
          .value
          .trim();

      const rating =
        document
          .getElementById('reviewRating')
          .value;

      const text =
        document
          .getElementById('reviewText')
          .value
          .trim();

      const review = {

        name,
        rating,
        text

      };

      // ADD TO UI

      addReviewToUI(review);

      // SAVE LOCAL STORAGE

      const savedReviews =
        JSON.parse(
          localStorage.getItem('reviews')
        ) || [];

      savedReviews.unshift(review);

      localStorage.setItem(
        'reviews',
        JSON.stringify(savedReviews)
      );

      // RESET FORM

      reviewForm.reset();

      // SUCCESS MESSAGE

      alert(
        'Thank you for your review ❤️'
      );

    });

}

// ADD REVIEW FUNCTION

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
// BOOKING FORM
// ================================

const bookingForm =
  document.getElementById('bookingForm');

const dateInput =
  document.getElementById('date');

// ================================
// MIN DATE = TODAY
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
// CONVERT TIME
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
// OTP SYSTEM
// ================================

let generatedOTP = "";

// ================================
// BOOKING SUBMIT
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
        document
          .getElementById('firstName')
          .value
          .trim();

      const lastName =
        document
          .getElementById('lastName')
          .value
          .trim();

      const phone =
        document
          .getElementById('phone')
          .value
          .trim();

      const address =
        document
          .getElementById('address')
          .value
          .trim();

      const selectedDate =
        document
          .getElementById('date')
          .value;

      const selectedTime =
        document
          .getElementById('time')
          .value;

      const service =
        document
          .getElementById('service')
          .value;

      const message =
        document
          .getElementById('message')
          .value
          .trim();

      // ================================
      // MOBILE VALIDATION
      // ================================

      const mobilePattern =
        /^[6-9]\d{9}$/;

      if(
        !mobilePattern.test(phone)
      ){

        alert(
          'Enter valid 10 digit mobile number.'
        );

        return;

      }

      // ================================
      // CHECK DATE & TIME
      // ================================

      const convertedTime =
        convertTo24Hour(selectedTime);

      const currentDateTime =
        new Date();

      const bookingDateTime =
        new Date(
          `${selectedDate}T${convertedTime}`
        );

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
      // GENERATE OTP
      // ================================

      generatedOTP =
        Math.floor(
          1000 + Math.random() * 9000
        ).toString();

      // ================================
      // SEND OTP MESSAGE
      // ================================

      const otpMessage =
`Your Dipali Beauty Studio OTP is: ${generatedOTP}`;

      const otpWhatsappURL =
`https://wa.me/91${phone}?text=${encodeURIComponent(otpMessage)}`;

      window.open(
        otpWhatsappURL,
        '_blank'
      );

      // ================================
      // ASK USER OTP
      // ================================

      const enteredOTP =
        prompt(
          'Enter OTP received on WhatsApp'
        );

      // ================================
      // OTP CHECK
      // ================================

      if(
        enteredOTP !== generatedOTP
      ){

        alert(
          'Invalid OTP. Please try again.'
        );

        return;

      }

      // ================================
      // FINAL WHATSAPP MESSAGE
      // ================================

      const whatsappNumber =
        '919421522796';

      const whatsappMessage =

`🌸 NEW APPOINTMENT BOOKING 🌸

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

      const encodedMessage =
        encodeURIComponent(
          whatsappMessage
        );

      const whatsappURL =
`https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // ================================
      // OPEN WHATSAPP
      // ================================

      window.open(
        whatsappURL,
        '_blank'
      );

      // ================================
      // SUCCESS
      // ================================

      alert(
        'Booking request submitted successfully ❤️'
      );

      bookingForm.reset();

    });

}