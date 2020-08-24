const jwt = require('jsonwebtoken');
// const db = require("../model");
// const User = db.user;
// const Role = db.role;
verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];             //Bearer token
        const decoded = jwt.verify(token, "secret");
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};

// isAdmin = (req, res, next) => {
//     User.findById(req.userId).exec((err, user) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }
  
//       Role.find(
//         {
//           _id: { $in: user.roles }
//         },
//         (err, roles) => {
//           if (err) {
//             res.status(500).send({ message: err });
//             return;
//           }
  
//           for (let i = 0; i < roles.length; i++) {
//             if (roles[i].name === "admin") {
//               next();
//               return;
//             }
//           }
  
//           res.status(403).send({ message: "Require Admin Role!" });
//           return;
//         }
//       );
//     });
//   };
  
//   isModerator = (req, res, next) => {
//     User.findById(req.userId).exec((err, user) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }
  
//       Role.find(
//         {
//           _id: { $in: user.roles }
//         },
//         (err, roles) => {
//           if (err) {
//             res.status(500).send({ message: err });
//             return;
//           }
  
//           for (let i = 0; i < roles.length; i++) {
//             if (roles[i].name === "moderator") {
//               next();
//               return;
//             }
//           }
  
//           res.status(403).send({ message: "Require Moderator Role!" });
//           return;
//         }
//       );
//     });
//   };
  
//   const authJwt = {
//     verifyToken,
//     isAdmin,
//     isModerator
//   };
//   module.exports = auth;