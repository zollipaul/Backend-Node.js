export default data => {
  let gameGridEmpty = {};
  const rows = ["0", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const cols = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  rows.forEach(row => {
    cols.forEach(col => {
      gameGridEmpty[row + col] = {
        id: row + col,
        title: getTitle(row, col),
        isShip: false,
        isShipId: null,
        isMissed: false,
        horizontal: null,
        part: null,
        salvo: false,
        newSalvo: false,
        hit: false
      };
    });
  });

  const playerId = data.id;
  const opponentId = data.opponentId;

  let gameGridsOfPlayerAndOpponent = {
    [playerId]: gameGridEmpty,
    // copy of gameGridEmpty
    [opponentId]: JSON.parse(JSON.stringify(gameGridEmpty))
  };

  const ships = data.ships;

  ships.forEach(ship => {
    const horizontal =
      ship.locations[0].charAt(0) === ship.locations[1].charAt(0);

    ship.locations.forEach((location, i) => {
      gameGridsOfPlayerAndOpponent[playerId][location].isShip = true;
      gameGridsOfPlayerAndOpponent[playerId][location].horizontal = horizontal;
      gameGridsOfPlayerAndOpponent[playerId][location].part =
        i === 0 ? "Start" : i === ship.locations.length - 1 ? "End" : "Mid";
    });
  });

  const hits = data.hits;
  const sinks = data.sinks;

  hits.forEach(location => {
    gameGridsOfPlayerAndOpponent[opponentId][location].hit = true;
  });

  sinks.forEach(ship => {
    const horizontal =
      ship.locations[0].charAt(0) === ship.locations[1].charAt(0);
    ship.locations.forEach((location, i) => {
      gameGridsOfPlayerAndOpponent[opponentId][location].isShip = true;
      gameGridsOfPlayerAndOpponent[opponentId][location].isShipId = ship.id;
      gameGridsOfPlayerAndOpponent[opponentId][
        location
      ].horizontal = horizontal;
      gameGridsOfPlayerAndOpponent[opponentId][location].part =
        i === 0 ? "Start" : i === ship.locations.length - 1 ? "End" : "Mid";
    });
  });

  const salvoes = data.salvoes;
  let salvoId;
  salvoes.forEach(salvo => {
    salvo.locations.forEach(location => {
      salvoId = salvo.gamePlayerId === playerId ? opponentId : playerId;
      gameGridsOfPlayerAndOpponent[salvoId][location].salvo = true;
    });
  });

  const missedShips = data.missedShips;
  if (missedShips !== null) {
    missedShips.forEach(ship => {
      const horizontal =
        ship.locations[0].charAt(0) === ship.locations[1].charAt(0);
      ship.locations.forEach((location, i) => {
        gameGridsOfPlayerAndOpponent[opponentId][location].isMissed = true;
        gameGridsOfPlayerAndOpponent[opponentId][
          location
          ].horizontal = horizontal;
        gameGridsOfPlayerAndOpponent[opponentId][location].part =
          i === 0 ? "Start" : i === ship.locations.length - 1 ? "End" : "Mid";
      });
    });
  }

  gameGridsOfPlayerAndOpponent[playerId] = Object.values(
    gameGridsOfPlayerAndOpponent[playerId]
  );

  gameGridsOfPlayerAndOpponent[opponentId] = Object.values(
    gameGridsOfPlayerAndOpponent[opponentId]
  );

  return gameGridsOfPlayerAndOpponent;
};

getTitle = (row, col) => {
  if (row === "0" && col !== "0") {
    return col;
  } else if (row !== "0" && col === "0") {
    return row;
  } else {
    return false;
  }
};
