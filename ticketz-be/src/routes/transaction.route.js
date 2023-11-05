const { Router } = require("express");
const transactionRoute = Router();

const transactionController = require("../controllers/transaction.controller");
const authMiddleware = require("../middleware/auth");

transactionRoute.get(
  "/:transaction_id",
  authMiddleware.checkToken,
  transactionController.getTransaction
);
transactionRoute.patch(
  "/",
  authMiddleware.checkToken,
  transactionController.createTransaction
);
transactionRoute.get(
  "/all",
  authMiddleware.checkToken,
  transactionController.getAllTransaction
);

module.exports = transactionRoute;
