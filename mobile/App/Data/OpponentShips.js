export default {
  "aircraftCarrier": {
    id: "1",
    size: 5,
    type: "aircraftCarrier",
    isSunk: false,
    squares: [
      {
        part: "Start",
        horizontal: true
      },
      {
        part: "Mid",
        horizontal: true
      },
      {
        part: "Mid",
        horizontal: true
      },
      {
        part: "Mid",
        horizontal: true
      },
      {
        part: "End",
        horizontal: true
      }
    ]
  },
  "battleship": {
    id: "2",
    size: 4,
    type: "battleship",
    isSunk: false,
    squares: [
      {
        part: "Start",
        horizontal: true
      },
      {
        part: "Mid",
        horizontal: true
      },
      {
        part: "Mid",
        horizontal: true
      },
      {
        part: "End",
        horizontal: true
      }
    ]
  },
  "submarine": {
    id: "3",
    size: 3,
    type: "submarine",
    isSunk: false,
    squares: [
      {
        id: '1',
        part: "Start",
        horizontal: true
      },
      {
        part: "Mid",
        horizontal: true
      },
      {
        part: "End",
        horizontal: true
      }
    ]
  },
  "destroyer": {
    id: "4",
    type: "destroyer",
    isSunk: false,
    size: 3,
    squares: [
      {
        part: "Start",
        horizontal: true,
      },
      {
        part: "Mid",
        horizontal: true
      },
      {
        part: "End",
        horizontal: true
      }
    ]
  },
  "patrolBoat": {
    id: "5",
    type: "patrolBoat",
    isSunk: false,
    size: 2,
    squares: [
      {
        part: "Start",
        horizontal: true
      },
      {
        part: "End",
        horizontal: true
      }
    ]
  }
};
