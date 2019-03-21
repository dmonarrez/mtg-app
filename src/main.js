import './css/styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardSearch } from './backEnd.js';


$(document).ready(function() {

  let cardsArr = [];

  const api = new CardSearch;
  let counter = 1;
  $("#add").click(function(){
    counter++;
    $('.parameter').append(`<select class="searchTerms${counter}">
        <option value="name">Name</option>
        <option value="colors">Color</option>
        <option value="colorIndentity">Land</option>
        <option value="cmc">Coverted Mana Cost</option>
        <option value="types">Type</option>
        <option value="supertypes">Supertype</option>
        <option value="subtypes">Subtype</option>
        <option value="rarity">Rarity</option>
        <option value="setName">Set</option>
        <option value="artist">Artist</option>
        <option value="power">Power</option>
        <option value="toughness">Toughness</option>
        <option value="gameFormat">Format</option>
        <option value="legality">Legality</option>
      </select>
      <input type="text" id="input${counter}">`);
  });

  $("#remove").click(function(){
    $(`.searchTerms${counter}`).remove();
    $(`#input${counter}`).remove();
    counter--;
  });

  $(".search").submit(function(event){
    event.preventDefault();
    //reset cards arr after new search
    cardsArr = [];

    $(".list").text("");

    let searchParameters = '';
    for(let i = 1; i <= counter; i++){
      searchParameters += $(`.searchTerms${i}`).val() + '=' + $(`#input${i}`).val() + '&';
    }

    const getCards = api.getCard(searchParameters);


    getCards.then(function(response) {
      let body = JSON.parse(response);
      // console.log(body);
      body.cards.forEach(function(card, index){
        $(".list").append(`<img id="${index}" src="${card.imageUrl}">`);
        // console.log(card);
        cardsArr.push(card);
      });
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
    console.log(cardsArr);
  });


  // will be expand functionality to show the rest of the card information
  $('.list').on('click', 'img', function(){
    const name = cardsArr[this.id].name
    // const rarity = cardsArr[this.id].rarity
    // const name = cardsArr[this.id].name
    // const name = cardsArr[this.id].name
    // const name = cardsArr[this.id].name
    // const name = cardsArr[this.id].name
    console.log(name);
    $("#exampleModalLongTitle").text(name);
    $("#exampleModalCenter").modal('toggle');

  });

});
