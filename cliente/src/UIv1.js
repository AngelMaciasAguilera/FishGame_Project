import { UI_BUILDER } from "./Ui.js";
import { GivenID } from "./entities/Player.js";
import { ConnectionHandler } from "./services/ConnectionHandler.js";
import { GameHandler } from "./services/GameHandler.js";
import { GameService } from "./services/GameService.js";
import { PositionsHandler } from "./services/PositionsHandler.js";

export const UIv1 = UI_BUILDER.init();

UIv1.initUI = () => {
  const base = document.getElementById(UIv1.uiElements.board);
  base.classList.add("board");
};

UIv1.waitPlayers = () => {
  if (
    document.getElementById("loadingContainer") === null ||
    document.getElementById("loadingContainer") === undefined
  ) {
    const loadingContainer = document.createElement("div");
    const textNode = document.createTextNode(
      "Esperando al resto de jugadores por favor espera"
    );
    const loadingImage = document.createElement("div");

    loadingContainer.setAttribute("id", "loadingContainer");
    loadingContainer.classList.add("loadingContainer");
    loadingImage.classList.add("loading");

    loadingContainer.appendChild(loadingImage);
    loadingContainer.appendChild(textNode);

    document.body.appendChild(loadingContainer);
  }
};

UIv1.drawBoard = (board, players) => {
  if (
    document.getElementById("loadingContainer") != null ||
    document.getElementById("loadingContainer") != undefined
  ) {
    document.getElementById("loadingContainer").style.display = "none";
  }

  console.log("Este es el tamblero que me llega masters: ");
  console.log(board);

  if (board !== undefined) {
  
    const base = document.getElementById(UIv1.uiElements.board);
    base.innerHTML = "";
    base.style.gridTemplateColumns = `repeat(${board.length}, 100px)`;
    base.style.gridTemplateRows = `repeat(${board.length}, 100px)`;
    board.forEach((row, rowIndex) => {
      row.forEach((element, colIndex) => {
        const tile = document.createElement("div");
        tile.setAttribute("id", colIndex + '' +rowIndex);
        tile.classList.add("tile");
        base.appendChild(tile);
        anime({
          targets: tile,
          opacity: [0, 1],
          duration: Math.random() * 8000 + 1000,
          easing: "easeInOutQuad",
        });

        // Find a player which position is the same row and column we are looping
        const player = players.find(
          (item) => item.x == colIndex && item.y == rowIndex
        );

        if (player != undefined) {
          console.log(player);
          const playerIcon = document.createElement("i");
          playerIcon.classList.add("fa-solid");
          playerIcon.classList.add("fa-fish");

          //We set the direction that comes from the server
          let degs = PositionsHandler.translateDirectionToDegs(player.direction);
          playerIcon.style.transform = `rotate(${degs}deg)`;

          // If an element with that id doesn't exist we add its id to be identified later
          if (document.getElementById(player.gameID) === null ||
            document.getElementById(player.gameID) === undefined) {
            playerIcon.setAttribute('id', player.gameID);
          }

          tile.appendChild(playerIcon);


          if (
            document.getElementById("buttonsContainer") === null ||
            document.getElementById("buttonsContainer") === undefined
          )
            UIv1.generatePlayerButtons(player.id, base, player.boardPosition);
        }

        if (element == 5) {
          const bush = document.createElement("i");
          bush.classList.add("fa-solid");
          bush.classList.add("fa-cloud");
          tile.appendChild(bush);
        }
      });
    });
  }
};


UIv1.generatePlayerButtons = (player_id, referenceNode) => {

  //First we create the rotate button
  const buttonsContainer = document.createElement('div');
  const movilityButtons = document.createElement('div');
  const rotateButton = document.createElement('div');
  const upButton = document.createElement('div');
  const downButton = document.createElement('div');
  const leftButton = document.createElement('div');
  const rightButton = document.createElement('div');

  buttonsContainer.setAttribute('id', 'buttonsContainer');
  buttonsContainer.classList.add('buttons-container');
  movilityButtons.classList.add('movility-buttons');

  rotateButton.classList.add('fa-solid');
  rotateButton.classList.add('fa-rotate');

  upButton.classList.add('fa-solid');
  upButton.classList.add('fa-arrow-up');

  downButton.classList.add('fa-solid');
  downButton.classList.add('fa-arrow-down');

  leftButton.classList.add('fa-solid');
  leftButton.classList.add('fa-arrow-left');

  rightButton.classList.add('fa-solid');
  rightButton.classList.add('fa-arrow-right');

  rotateButton.dataset.player_id = player_id;
  upButton.dataset.player_id = player_id;

  rotateButton.addEventListener('click', (event) => {
    //We locate our player character
    const myCharacter = document.getElementById(GivenID.getID());

    //We ensure it exists preventing errors
    if (myCharacter != undefined) {
      /* We rotate the element associated to our GivenID, to do that, we will translate the direction of the actualPlayer,
         and we will plus 90 to it, after that we will traduce again to directions and we will set that to the player in the array
      */
      const player = GameHandler.get_player(player_id);
      console.log(player);
      let degs = PositionsHandler.translateDirectionToDegs(player.direction) + 90;
      if (degs == 360) degs = 0;

      myCharacter.style.transform = `rotate(${degs}deg)`;

      let direction = PositionsHandler.translateDegsToDirection(degs);

      GameHandler.set_player_direction(player_id, direction);
      console.log("Nueva posicion del player: ");
      console.log(player);

      ConnectionHandler.sendPlayerRotates(GameHandler.game.room, direction, player.id);
    }

  })


  upButton.addEventListener('click', (event) => {
      
    let player = GameHandler.get_player_inPosition(GivenID.getID());
    let possibleY = player.y - 1;

    if(possibleY >= 0){
      
    }    

  });

  downButton.addEventListener('click', (event) => {
    
  });

  movilityButtons.appendChild(upButton);
  movilityButtons.appendChild(downButton);
  movilityButtons.appendChild(leftButton);
  movilityButtons.appendChild(rightButton);

  buttonsContainer.appendChild(rotateButton);
  buttonsContainer.appendChild(movilityButtons);


  document.body.insertBefore(buttonsContainer, referenceNode);


};



UIv1.drawPlayerRotation = (payload) => {
  const player_game_id = payload.playerBoardId;
  if (player_game_id != GivenID.getID()) {
    const otherCharacter = document.getElementById(player_game_id);

    //We ensure it exists preventing errors
    if (otherCharacter != undefined) {
      /* We rotate the element associated to our GivenID, to do that, we will translate the direction of the actualPlayer,
         and we will plus 90 to it, after that we will traduce again to directions and we will set that to the player in the array
      */
      const rival = GameHandler.get_player_inPosition(player_game_id);

      if (rival != null) {
        let degs = PositionsHandler.translateDirectionToDegs(payload.direction);
        if (degs == 360) degs = 0;

        otherCharacter.style.transform = `rotate(${degs}deg)`;

        let direction = payload.direction;

        GameHandler.set_player_direction(rival.id, direction);
      }

    }
  }
}

