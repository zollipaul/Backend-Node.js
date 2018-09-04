export default ships => {

  let shipsArray = [];

  for (const key in ships) {
    if (ships.hasOwnProperty(key)) {
      shipsArray.push({
        type: ships[key].type,
        locations: ships[key].location
      })
    }
  }
  return shipsArray;
};
