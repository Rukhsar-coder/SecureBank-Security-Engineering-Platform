const getUsers = (req, res) => {
  res.json([
    {
      id: 1,
      username: "john_doe",
      balance: 5000,
    },
    {
      id: 2,
      username: "jane_smith",
      balance: 7200,
    },
  ]);
};

module.exports = {
  getUsers,
};
