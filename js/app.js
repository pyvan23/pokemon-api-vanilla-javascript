//se dispara cuando el html esta totalmente cargado y parseado
document.addEventListener("DOMContentLoaded", () => {
  const random = getRandomInt(1, 151);
  FetchApi(random);
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
const FetchApi = async (id) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    console.log(data);
    const pokemon = {
      img: data.sprites.other.dream_world.front_default,
      name: data.name,
      hp:data.stats[0].base_stat,
    };
    paintData(pokemon);
  } catch (error) {
    console.log(error);
  }
};
const paintData = (pokemon) => {
  console.log(pokemon);
  const flex = document.querySelector(".flex");
  //content por que necesito lo que esta dento de las etiquetas template no en esa
  const template = document.querySelector("#template-api").content;
  const clone = template.cloneNode(true);
  const fragment = document.createDocumentFragment();

  //usamos el template clonado

  clone.querySelector(".card-body-img").setAttribute("src", pokemon.img);
  //innerHTML usamos por que nos permite mezclar las etiquetas
  clone.querySelector(".card-body-title").innerHTML = ` ${pokemon.name}
  <span>Hp: ${pokemon.hp}</span>`;
  fragment.appendChild(clone);
  flex.appendChild(fragment);
};
