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
      hp: data.stats[0].base_stat,
      experience: data.base_experience,
      atack: data.stats[1].base_stat,
      special:data.stats[3].base_stat,
      defense:data.stats[2].base_stat,
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
  //no modificamos el dom sino el clon
  const template = document.querySelector("#template-api").content;
  const clone = template.cloneNode(true);
  const fragment = document.createDocumentFragment();

  //usamos el template clonado

  clone.querySelector(".card-body-img").setAttribute("src", pokemon.img);
  //innerHTML usamos por que nos permite mezclar las etiquetas
  clone.querySelector(".card-body-title").innerHTML = ` ${pokemon.name}
  <span>Hp: ${pokemon.hp}</span>`;

  clone.querySelector(".card-body-text").textContent =
    pokemon.experience + " Exp";
  //querySelectorAll por que comparten la misma clase los 3,este metodo nnos decuelve un array
  clone.querySelectorAll(".card-footer-social h3")[0].textContent =
    pokemon.atack + 'K';
  clone.querySelectorAll(".card-footer-social h3")[1].textContent =
    pokemon.special + 'K';
  clone.querySelectorAll(".card-footer-social h3")[2].textContent =
    pokemon.defense + 'K';

  fragment.appendChild(clone);
  flex.appendChild(fragment);
};
