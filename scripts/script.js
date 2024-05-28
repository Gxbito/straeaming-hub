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
