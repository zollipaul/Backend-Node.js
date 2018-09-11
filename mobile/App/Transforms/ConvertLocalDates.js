export default games => {
    return games.map(gamesList => {
   return gamesList.data.map(game => (game["createdAt"] = convertLocalDates(game.createdAt)));
  });
};

const convertLocalDates = string => {
  let d = new Date(string);

  const options = {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  };

  return d.toLocaleDateString("en-GB", options);
};
