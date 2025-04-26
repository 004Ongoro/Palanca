document.body.insertAdjacentHTML(
  "afterbegin",
  `<div id="loader">
    <div class="spinner"></div>
    <h3 class="loading">Loading.... Almost There.</h3>
  </div>`
);

console.log("Hello from loader");

const style = document.createElement("style");

style.textContent = `
#loader{
position: fixed;
top: 0;
left: 0;
width: 100%; height: 100%;
background-color: #bde0fe;
display: flex;
flex-direction: column;
gap: 1rem;
align-items: center;
justify-content: center;
z-index: 99678799;
transition: opacity 0.5s ease;
}
.spinner{
width: 80px; height: 80px;
border: 8px solid #a2d2ff;
border-top: 8px solid #ffafcc;
border-radius: 50%;
animation: spin 1.2s linear infinite;

}

.loading{
color: black;}

@keyframes spin {
0%{transform: rotate(0deg);}
100%{transform: rotate(360deg);}
}
`;

document.head.appendChild(style);

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.opacity = 0;

  setTimeout(() => {
    loader.remove();
  }, 500);
});
