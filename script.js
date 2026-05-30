const form = document.querySelector("#rsvpForm");
const statusText = document.querySelector("#formStatus");

const googleForm = {
  action: "https://docs.google.com/forms/d/e/1FAIpQLSeBFGCosLkPni0dWWT49wfkhvJbYE2Swl7v1XhUAKPzQ_4SJA/formResponse",
  fields: {
    name: "entry.1741456826",
    phone: "entry.1814776853",
    attendance: "entry.1887311059",
    guests: "entry.2108928528",
    message: "entry.1112009257",
  },
};

const buildGooglePayload = (data) => {
  const payload = new FormData();

  Object.entries(googleForm.fields).forEach(([key, entryId]) => {
    payload.append(entryId, data[key] || "");
  });

  return payload;
};

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());
    localStorage.setItem("guca-rsvp", JSON.stringify({
      ...data,
      submittedAt: new Date().toISOString(),
    }));

    statusText.textContent = "Mengirim konfirmasi...";

    try {
      await fetch(googleForm.action, {
        method: "POST",
        mode: "no-cors",
        body: buildGooglePayload(data),
      });

      statusText.textContent = `Terima kasih, ${data.name}. Konfirmasi Anda telah terkirim.`;
      form.reset();
      form.querySelector('input[name="attendance"][value="Hadir"]').checked = true;
    } catch (error) {
      statusText.textContent = "Maaf, konfirmasi belum terkirim. Silakan coba lagi.";
    }
  });
}
