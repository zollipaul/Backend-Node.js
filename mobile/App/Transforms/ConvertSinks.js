import Ships from "../Data/OpponentShips";

export default (sinks) => {
  const ships = Ships;

  sinks.forEach(ship => {
    ships[ship.type].isSunk = true
  })
  return ships
}
