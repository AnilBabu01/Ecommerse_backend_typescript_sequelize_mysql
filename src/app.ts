import express, { ErrorRequestHandler } from "express";
import { sequelize } from "./config/db";
import cors from "cors";
import bodyparser from "body-parser";
import { router as auth_router } from "./routes/auth";
import { router as product_router } from "./routes/product";
import { router as order_router } from "./routes/order";
import { router as payment_router } from "./routes/payment";
const PORT = process.env.PORT || 8080;

const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use("/images", express.static("images"));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
// app.use(()=>{
//     throw createHttpError(404,"Route Not Found")
// })
// app.use(error_handler)

app.use("/api/auth", auth_router);
app.use("/api", product_router);
app.use("/api", order_router);
app.use("/api", payment_router);

app.get("/api", (req, res) => {
  res.send("Api is working");
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  sequelize.databaseVersion().then((databaseVersion) => {
    console.log(databaseVersion);
  });
  sequelize
    .authenticate()
    .then(async () => {
      console.log("Connection has been established successfully.");
      try {
        await sequelize
          .sync({ force: false })
          .then(() => {
            console.log("Re-sync successfully!");
          })
          .catch((error) => {
            console.error("Unable to Re-sync : ", error);
          });
      } catch (error) {}
    })
    .catch((error: any) => {
      console.error("Unable to connect to the database: ", error);
    });
});
