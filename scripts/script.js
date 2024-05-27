import articles from "./data.js";

function createArticleCards(articles) {
  const container = document.getElementById("articles");
  articles.forEach((article) => {

    const cardHTML = `
            <div class="article">
                <img src="${article.image}" alt="" />
                <div class="text">
                    <h4>${article.title}</h4>
                    <a href="${article.link}">Read more</a>
                    <span></span>
                    <h6>Published on 25 May 2024</h6>
                </div>
            </div>
        `;
    container.innerHTML += cardHTML;
  });
}

createArticleCards(articles);

document
  .getElementById("radioForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      fields: [
        { name: "firstname", value: formData.get("firstName") },
        { name: "lastname", value: formData.get("lastName") },
        { name: "email", value: formData.get("email") },
        { name: "phone", value: formData.get("phone") },
        { name: "zip", value: formData.get("zip") },
      ],
    };

    fetch(
      "https://api.hsforms.com/submissions/v3/integration/submit/example_ID/example_ID",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Form successfully submitted!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error submitting the form.");
      });
  });
