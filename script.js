const form = document.querySelector("#rsvpForm");
const statusText = document.querySelector("#formStatus");

const whatsappNumber = "6285183004380";

const buildWhatsappMessage = (data) => {
  return [
    "Halo, saya ingin konfirmasi kehadiran untuk undangan GUCA.",
    "",
    `Nama: ${data.name || "-"}`,
    `Nomor WhatsApp: ${data.phone || "-"}`,
    `Kehadiran: ${data.attendance || "-"}`,
    `Jumlah Tamu: ${data.guests || "-"}`,
    `Ucapan: ${data.message || "-"}`,
  ].join("\n");
};

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());
    localStorage.setItem("guca-rsvp", JSON.stringify({
      ...data,
      submittedAt: new Date().toISOString(),
    }));

    const message = encodeURIComponent(buildWhatsappMessage(data));
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    statusText.textContent = `Terima kasih, ${data.name}. WhatsApp akan terbuka untuk mengirim konfirmasi.`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    form.reset();
  });
}
