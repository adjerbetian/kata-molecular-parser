require("ts-node").register({
  transpileOnly: process.env.NODE_ENV === "production",
});

const { app } = require("./app");
app.listen(8080, () => console.log(`Api listening...`));
