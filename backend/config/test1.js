const bcrypt = require("bcrypt");
const password = "123456789";
const hashDB = "15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225";

bcrypt.compare(password, hashDB, (err, result) => {
    console.log(result ? "✅ Coincide" : "❌ No coincide");
});
