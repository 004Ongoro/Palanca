document
  .getElementById("contact-Form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    try {
  const res = await fetch("https://palanca-kohl.vercel.app/api/sendEmail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone, message }),
  });

  if (!res.ok) {
    const text = await res.text(); 
    throw new Error(`Server responded with ${res.status}: ${text}`);
  }

  const result = await res.json();
  document.querySelector(".sbmsg").textContent = result.message;

} catch (err) {
  console.error("Send error:", err.message);
  document.querySelector(".sbmsg").textContent = "Something went wrong. Please try again later.";
}

  });
