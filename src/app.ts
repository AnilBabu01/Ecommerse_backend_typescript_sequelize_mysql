import express, { ErrorRequestHandler } from "express";
import { sequelize } from "./config/db";
import cors from "cors";
import { router as auth_router } from "./routes/auth";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(()=>{
//     throw createHttpError(404,"Route Not Found")
// })
// app.use(error_handler)

app.use("/api/auth", auth_router);
app.get("/api", (req, res) => {
  res.send("Api is working");
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);

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
