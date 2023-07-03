const API_KEY = "";
const API_URL_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=2&api_key=${API_KEY}`;
const API_URL_FAVORIES = `https://api.thecatapi.com/v1/favourites?api_key=${API_KEY}`;
const API_URL_FAVORIE_DELETE = (id) =>
  `https://api.thecatapi.com/v1/favourites/${id}?api_key=${API_KEY}`;
const spanError = document.getElementById("error");

async function loadRandomInfo() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();

  console.log("Random", data);
  if (res.status !== 200) {
    spanError.innerHTML = "ERROR " + res.status + " " + data.message;
  } else {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");

    img1.src = data[0].url;
    img2.src = data[1].url;

    btn1.onclick = () => saveFavoritesInfo(data[0].id);
    btn2.onclick = () => saveFavoritesInfo(data[1].id);
  }
}

async function loadFavoritesInfo() {
  const res = await fetch(API_URL_FAVORIES);
  const data = await res.json();
  console.log("Favorites", data);
  if (res.status !== 200) {
    spanError.innerHTML = "ERROR " + res.status + " " + data.message;
  } else {
    const section = document.getElementById("favoritesMichis");
    section.innerHTML = "";
    const h2 = document.createElement("h2");
    const titulo = document.createTextNode("Gatos guardados");
    h2.appendChild(titulo);
    section.appendChild(h2);
    data.forEach((element) => {
      const article = document.createElement("article");
      const img = document.createElement("img");
      const btn = document.createElement("button");
      const btnText = document.createTextNode("Quitar de favoritos");
      btn.appendChild(btnText);
      btn.onclick = () => deleteFavoriteInfo(element.id);
      img.src = element.image.url;
      img.width = "150";
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  }
}

async function saveFavoritesInfo(id) {
  const res = await fetch(API_URL_FAVORIES, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });
  const data = await res.json();
  console.log("res", data);
  if (res.status !== 200) {
    spanError.innerHTML = "ERROR " + res.status + " " + data.message;
  } else {
    console.log("Guardado exitoso");
    loadFavoritesInfo();
  }
}

async function deleteFavoriteInfo(id) {
  const res = await fetch(API_URL_FAVORIE_DELETE(id), {
    method: "DELETE",
  });
  const data = await res.json();
  if (res.status !== 200) {
    spanError.innerHTML = "ERROR " + res.status + " " + data.message;
  } else {
    console.log("Eliminado con exito");
    loadFavoritesInfo();
  }
}

loadRandomInfo();
loadFavoritesInfo();
