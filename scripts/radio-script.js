import articles from "./data.js";

function createArticleCards(articles) {
    const container = document.getElementById('articles');
    articles.forEach(article => {

        const shortenedTitle = article.title.length > 16 ? article.title.substring(0, 100) + '...' : article.title;

        const cardHTML = `
            <div class="article">
                <img src="${article.image}" alt="" />
                <div class="text">
                    <h4>${shortenedTitle}</h4>
                    <span></span>
                    <h6>Published on ${article.date}</h6>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

createArticleCards(articles);

document.getElementById('radioForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = {
      firstName: document.getElementById('radioFirstName').value,
      lastName: document.getElementById('radioLastName').value,
      email: document.getElementById('radioEmail').value,
      phoneNumber: document.getElementById('radioPhoneNumber').value,
      postalCode: document.getElementById('radioPostalCode').value,
      platformPreference: document.getElementById('radioPlatformPreference').value
    };

    // Envía los datos a HubSpot
    var xhr = new XMLHttpRequest();
    var url = 'https://api.hsforms.com/submissions/v3/integration/submit/portalId/radioFormId'; // Reemplaza con tu URL de HubSpot
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    var data = JSON.stringify({
      fields: [
        { name: 'firstname', value: formData.firstName },
        { name: 'lastname', value: formData.lastName },
        { name: 'email', value: formData.email },
        { name: 'phone', value: formData.phoneNumber },
        { name: 'postalcode', value: formData.postalCode },
        { name: 'platform_preference', value: formData.platformPreference }
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title
      }
    });

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log('Form successfully submitted to HubSpot');
      } else if (xhr.readyState === 4) {
        console.log('Error submitting form to HubSpot');
      }
    };

    xhr.send(data);
  });