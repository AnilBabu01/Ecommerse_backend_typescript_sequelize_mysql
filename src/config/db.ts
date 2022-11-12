import { Sequelize} from 'sequelize-typescript'
import {User} from '../models/user'

export  const sequelize = new Sequelize("test", "root", "", {
    host: "localhost",
    dialect: "mysql",
    models: [User]
});



// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((error:any) => {
//     console.error("Unable to connect to the database: ", error);
//   });


  
//   sequelize
//     .sync({ force: false })
//     .then(() => {
//       console.log("Re-sync successfully!");
//     })
//     .catch((error) => {
//       console.error("Unable to Re-sync : ", error);
//     });
  
