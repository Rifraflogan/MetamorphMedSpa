let currentStep = 1;
let serviceStep = 1;
let selectedProvider = "";

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".service-chip").forEach(chip => {
    chip.addEventListener("click", function() {
      chip.classList.toggle("selected");
      chip.classList.add("pop");
      setTimeout(() => chip.classList.remove("pop"), 300);
    });
  });
});

function bookService(service, event) {
  event.preventDefault();
  document.getElementById("selectedService").value = service;
  if (service === "consultation" || service === "aesthetic-consultation") {
    document.getElementById("normalForm").style.display = "none";
    document.getElementById("serviceSteps").style.display = "none";
    document.getElementById("consultationSteps").style.display = "block";
    initConsultationSteps();
  } else {
    document.getElementById("consultationSteps").style.display = "none";
    document.getElementById("normalForm").style.display = "none";
    document.getElementById("serviceSteps").style.display = "block";
    initServiceSteps();
  }
  document.getElementById("bookingFormModal").classList.add("active");
}

document.getElementById("closeFormModal").addEventListener("click", function () {
  document.getElementById("bookingFormModal").classList.remove("active");
});

if (document.getElementById("bookingForm")) {
  document.getElementById("bookingForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const service = document.getElementById("selectedService").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    let bookingURL = "https://metamorph.myaestheticrecord.com/online-booking?service=" +
      encodeURIComponent(service) +
      "&firstName=" + encodeURIComponent(firstName) +
      "&lastName=" + encodeURIComponent(lastName) +
      "&phone=" + encodeURIComponent(phone) +
      "&email=" + encodeURIComponent(email);
    showThankYou(bookingURL);
  });
}

function initConsultationSteps() {
  currentStep = 1;
  showStep(currentStep);
  updateProgressBar(currentStep);
}

function showStep(step) {
  const steps = document.querySelectorAll("#consultationSteps .step-content");
  steps.forEach(el => {
    el.style.display = "none";
    el.classList.remove("visible");
  });
  const current = document.getElementById("step" + step);
  current.style.display = "block";
  current.classList.add("visible");
  updateProgressBar(step);
}

function nextStep() {
  if (currentStep === 1 && selectedProvider === "") {
    alert("Please select a provider.");
    return;
  }
  if (currentStep === 2) {
    const chips = document.querySelectorAll(".service-chip.selected");
    if (chips.length === 0) {
      alert("Please select at least one service.");
      return;
    }
  }
  if (currentStep === 3) {
    const cFirstName = document.getElementById("cFirstName").value.trim();
    const cLastName = document.getElementById("cLastName").value.trim();
    const cPhone = document.getElementById("cPhone").value.trim();
    const cEmail = document.getElementById("cEmail").value.trim();
    if (!cFirstName || !cLastName || !cPhone || !cEmail) {
      alert("Please fill out all required fields.");
      return;
    }
    if (!/^\d+$/.test(cPhone)) {
      alert("Please enter a valid phone number (digits only).");
      return;
    }
  }
  if (currentStep < 4) {
    currentStep++;
    if (currentStep === 4) {
      document.getElementById("confirmProvider").innerText = selectedProvider || "";
      const selectedServices = [];
      document.querySelectorAll(".service-chip.selected").forEach(el => {
        selectedServices.push(el.getAttribute("data-value"));
      });
      document.getElementById("confirmServices").innerText = selectedServices.join(", ");
      document.getElementById("confirmEmail").innerText = document.getElementById("cEmail").value;
    }
    showStep(currentStep);
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
  }
}

function selectProvider(el) {
  document.querySelectorAll(".provider-card").forEach(card => card.classList.remove("selected"));
  el.classList.add("selected");
  selectedProvider = el.getAttribute("data-provider");
}

function updateProgressBar(step) {
  const progressSteps = document.querySelectorAll("#progressBar .step");
  progressSteps.forEach((el, index) => {
    if (index < step) { el.classList.add("active"); }
    else { el.classList.remove("active"); }
  });
}

document.getElementById("consultationForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const service = document.getElementById("selectedService").value;
  const cFirstName = document.getElementById("cFirstName").value;
  const cLastName = document.getElementById("cLastName").value;
  const cPhone = document.getElementById("cPhone").value;
  const cEmail = document.getElementById("cEmail").value;
  const consultServices = [];
  document.querySelectorAll(".service-chip.selected").forEach(el => {
    consultServices.push(el.getAttribute("data-value"));
  });
  let bookingURL = "https://metamorph.myaestheticrecord.com/online-booking?service=" +
    encodeURIComponent(service) +
    "&provider=" + encodeURIComponent(selectedProvider) +
    "&firstName=" + encodeURIComponent(cFirstName) +
    "&lastName=" + encodeURIComponent(cLastName) +
    "&phone=" + encodeURIComponent(cPhone) +
    "&email=" + encodeURIComponent(cEmail) +
    "&interestedServices=" + encodeURIComponent(consultServices.join(','));
  showThankYou(bookingURL);
});

function initServiceSteps() {
  serviceStep = 1;
  showServiceStep(serviceStep);
  updateServiceProgressBar(serviceStep);
}

function showServiceStep(step) {
  const steps = document.querySelectorAll("#serviceSteps .step-content");
  steps.forEach(el => {
    el.style.display = "none";
    el.classList.remove("visible");
  });
  const current = document.getElementById("sStep" + step);
  current.style.display = "block";
  current.classList.add("visible");
  updateServiceProgressBar(step);
}

function nextServiceStep() {
  if (serviceStep === 2) {
    const sFirstName = document.getElementById("sFirstName").value.trim();
    const sLastName = document.getElementById("sLastName").value.trim();
    const sPhone = document.getElementById("sPhone").value.trim();
    const sEmail = document.getElementById("sEmail").value.trim();
    if (!sFirstName || !sLastName || !sPhone || !sEmail) {
      alert("Please fill out all required fields.");
      return;
    }
    if (!/^\d+$/.test(sPhone)) {
      alert("Please enter a valid phone number (digits only).");
      return;
    }
  }
  if (serviceStep < 4) {
    serviceStep++;
    if (serviceStep === 4) {
      document.getElementById("sConfirmService").innerText = document.getElementById("selectedService").value;
      document.getElementById("sConfirmEmail").innerText = document.getElementById("sEmail").value;
      document.getElementById("sConfirmDate").innerText = document.getElementById("appointmentDate").value;
    }
    showServiceStep(serviceStep);
  }
}

function prevServiceStep() {
  if (serviceStep > 1) {
    serviceStep--;
    showServiceStep(serviceStep);
  }
}

function updateServiceProgressBar(step) {
  const progressSteps = document.querySelectorAll("#serviceProgressBar .step");
  progressSteps.forEach((el, index) => {
    if (index < step) { el.classList.add("active"); }
    else { el.classList.remove("active"); }
  });
}

function closeServiceModal() {
  document.getElementById("bookingFormModal").classList.remove("active");
}

document.getElementById("serviceForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const service = document.getElementById("selectedService").value;
  const sFirstName = document.getElementById("sFirstName").value;
  const sLastName = document.getElementById("sLastName").value;
  const sPhone = document.getElementById("sPhone").value;
  const sEmail = document.getElementById("sEmail").value;
  const appointmentDate = document.getElementById("appointmentDate").value;
  let bookingURL = "https://metamorph.myaestheticrecord.com/online-booking?service=" +
    encodeURIComponent(service) +
    "&firstName=" + encodeURIComponent(sFirstName) +
    "&lastName=" + encodeURIComponent(sLastName) +
    "&phone=" + encodeURIComponent(sPhone) +
    "&email=" + encodeURIComponent(sEmail) +
    "&appointmentDate=" + encodeURIComponent(appointmentDate);
  showThankYou(bookingURL);
});

function launchConfetti() {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };
  function randomInRange(min, max) { return Math.random() * (max - min) + min; }
  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) { clearInterval(interval); return; }
    const particleCount = 50 * (timeLeft / duration);
    confetti(Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    }));
    confetti(Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    }));
  }, 250);
}

function showThankYou(bookingURL) {
  const modalContent = document.querySelector("#bookingFormModal .modal-content");
  modalContent.innerHTML = `
    <div id="thankYouMessage" style="text-align: center; padding: 20px;">
      <h2>Thanks for booking with Metamorph!</h2>
      <p>We'll see you soon.</p>
    </div>
  `;
  launchConfetti();
  setTimeout(() => { window.location.href = bookingURL; }, 3000);
}

function showCategory(categoryId, tabElement) {
  document.querySelectorAll(".category-tab").forEach(tab => tab.classList.remove("active"));
  document.querySelectorAll(".category").forEach(cat => {
    cat.style.display = "none";
    cat.classList.remove("active");
  });
  tabElement.classList.add("active");
  const newCategory = document.getElementById(categoryId);
  newCategory.style.display = "block";
  setTimeout(() => { newCategory.classList.add("active"); }, 10);
}

document.addEventListener("DOMContentLoaded", function () {
  const defaultCategory = document.getElementById("injectables");
  defaultCategory.style.display = "block";
  setTimeout(() => { defaultCategory.classList.add("active"); }, 50);
});
