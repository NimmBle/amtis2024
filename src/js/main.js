// Продължи с твоя vanilla JavaScript код тук.

// async function getAllData() {
//   const response = await fetch("http://localhost:4000/desserts");
//   const desserts = await response.json();

//   var allDesesrtNames = document.querySelectorAll('.dessert-name');
//   var allShortDescriptions = document.querySelectorAll('.description--showcase');
//   var allIngridiens = document.querySelectorAll('.ingridientsToChange');
//   var allImagesShowcase = document.querySelectorAll('.sourceOfImageToChangeShowcase');
//   var allImagesDetails = document.querySelectorAll('.sourceOfImageToChange');

//   // console.log(allImages[0].srcset);
//   for (let index = 0; index < allDesesrtNames.length; index++) {
//     allDesesrtNames[index].innerHTML = desserts[index].name;
//     allShortDescriptions[index].innerHTML = desserts[index].description_short;
//     allIngridiens[index].innerHTML = desserts[index].ingredients_text;
//     allImagesShowcase[index].srcset = allImagesShowcase[index].srcset + desserts[index].image;
//     allImagesDetails[index].srcset = allImagesDetails[index].srcset + desserts[index].image;
//   }

// }
// getAllData();

const hamburger = document.querySelector(".icon-hamburger");
const navLinks = document.querySelector(".primary-navigation");
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("Active");
    hamburger.classList.toggle("open");
});

const url = "https://api.jsonbin.io/v3/b/666852e0e41b4d34e401ca3f/";

async function getAllData() {
    try {
        const response = await fetch(url, {
            headers: {
                "X-Master-Key":
                    "$2a$10$uRX0CRepZjWVuXp0kAZTROWV/Opfli9la3IC7ZJrl5DL.KPeTi7IO",
                "Content-Type": "application/json",
            },
        });
        const responseAsJson = await response.record.json();
        return responseAsJson;
    } catch (error) {
        console.log(error);
    }
}

async function GenerateHTML() {
    const data = await getAllData();
    var sectionWrapper = document.getElementById("showcase-wrapper-js");
    var detailedSectionWrapper = document.getElementById(
        "dessert-details-wrapper-js"
    );

    for (let i = 0; i < data.length; i++) {
        sectionWrapper.innerHTML += `
   <div class="dessert-card">
     <picture class="image-holder">
         <source class="sourceOfImageToChangeShowcase" srcset="assets/images/desktop/${data[i].image}">
         <img class="dessert-image" src="" alt="">
     </picture>
     <div class="card-content">
         <div class="special-line">
             <div class="line"></div>
             <img class="star-image" src="assets/images/desktop/star-decoration.svg" alt="">
             <div class="line"></div>
         </div>
         <h2 class="dessert-name">${data[i].name}</h2>
         <p class="description description--showcase  | paragraph paragraph--small">${data[i].description_short}</p>
         <a href="#" class="btn btn--no-text">
             научете повече
         </a>
     </div>
   </div>`;

        detailedSectionWrapper.innerHTML += `
   <div class="dessert-detailed-card">
      <picture>
          <source class="sourceOfImageToChange" srcset="assets/images/desktop/${data[i].image}">
          <img class="dessert-image" src="" alt="">
      </picture>
      <div class="dessert-text | title">
          <h3 class="tertiary-heading">${data[i].name}</h3>
          <p class="description | paragraph ">${data[i].description_long}</p>
          <p class="main-ingridients | paragraph"> <span class="bold-text">Основни съставки:</span><span class="ingridientsToChange">${data[i].ingredients_text}. </span></p>
      </div>
      <div class="dessert-nutrients">
          <div class="grid-row">
              <div class="nutrient-box">
                  <p class="nutrient-name">Калории: <br></p>
                  <p class="nutrient-amount">${data[i].nutrition.calories}</p>
              </div>
              <div class="nutrient-box">
                  <p class="nutrient-name">Общо мазнини: <br></p>
                  <p class="nutrient-amount">${data[i].nutrition.totalFat}</p>
              </div>
          </div>
          <div class="grid-row">
              <div class="nutrient-box">
                  <p class="nutrient-name">Наситени мазнини: <br></p>
                  <p class="nutrient-amount">${data[i].nutrition.saturatedFat}</p>
              </div>
              <div class="nutrient-box">
                  <p class="nutrient-name">Общо въглехидрати:<br></p>
                  <p class="nutrient-amount">${data[i].nutrition.totalCarbs}</p>
              </div>
          </div>
          <div class="grid-row">
              <div class="nutrient-box">
                  <p class="nutrient-name">Протеин: <br></p>
                  <p class="nutrient-amount">${data[i].nutrition.protein}</p>
              </div>
              <div class="nutrient-box">
                  <p class="nutrient-name">Захари: <br></p>
                  <p class="nutrient-amount">${data[i].nutrition.sugars}</p>
              </div>
          </div>
          <div class="grid-row">
              <div class="nutrient-box">
                  <p class="nutrient-name">Натрий: <br></p>
                  <p class="nutrient-amount">${data[i].nutrition.sodium}</p>
              </div>
              <div class="nutrient-box">
                  <p class="nutrient-name">Холестерол: <br></p>
                  <p class="nutrient-amount">${data[i].nutrition.cholesterol}</p>
              </div>
          </div>  
      </div>
   </div>`;
    }
}

GenerateHTML();

async function submitForm() {}

// var form = document.getElementsByClassName('form');
// form.addEventListener('submit', async function (e) {
//     const formData = new FormData(form).entries();
//     const request = await fetch('http://localhost:4000/form_submissions', {
//         method: "POST",
//         body: formData.json()
//       })
// })

const form = document.querySelector("#contact-form");
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    var object = {};
    formData.forEach(function (value, key) {
        object[key] = value;
    });

    var json = JSON.stringify(object);

    try {
        const request = await fetch("http://localhost:4000/form_submissions", {
            method: "POST",
            body: json,
        });
        alert("Form submited");
    } catch (error) {
        console.error(error);
    }
});
