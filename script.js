(function () {
  emailjs.init("REMHATuDX6DJpFY-9"); // Replace with your actual EmailJS Public Key
})();

function sendAlert() {
  const sound = document.getElementById("alertSound");

  // ✅ Play siren sound on click
  if (sound) {
    sound.pause();
    sound.currentTime = 0;
    sound.play().catch((e) => {
      console.warn("Autoplay blocked or sound couldn't play:", e);
    });
  }

  // ✅ Trigger vibration (if supported)
  if (navigator.vibrate) {
    navigator.vibrate([300, 100, 300]);
  }

  // ✅ Get location and send email
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const locationURL = `https://www.google.com/maps?q=${lat},${lon}`;
      const currentTime = new Date().toLocaleString();

      const templateParams = {
        name: "Emergency Alert",
        time: currentTime,
        location: locationURL,
        message: "🚨 I am in danger. Please help me immediately.",
      };

      emailjs.send("service_wdrdkrv", "template_k0f9zue", templateParams)
        .then(() => {
          alert("✅ Emergency alert sent!");
        })
        .catch((error) => {
          console.error("❌ Email failed:", error);
          alert("❌ Could not send alert. Please check your network or EmailJS setup.");
        });
    },
    () => {
      alert("❌ Unable to access location.");
    }
  );
}

function showSafetyTips() {
  const tips = [
    "📱 Always keep your phone charged and accessible.",
    "🚨 Share your live location with a trusted contact when in unfamiliar areas.",
    "🕒 Avoid walking alone at night in poorly lit areas.",
    "📍 Let someone know your whereabouts when going out.",
    "🧠 Trust your instincts – if something feels wrong, leave the situation.",
    "🚗 Lock your car immediately upon entering.",
    "👜 Carry pepper spray or a personal alarm if possible.",
    "🔑 Keep keys between your fingers when walking alone for added defense."
  ];

  const list = document.getElementById("tipsList");
  list.innerHTML = "";

  tips.forEach((tip) => {
    const li = document.createElement("li");
    li.textContent = tip;
    list.appendChild(li);
  });

  list.style.display = "block";
}
