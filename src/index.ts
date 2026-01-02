import env from "../env.ts";
import app from "./server.ts";

app.listen(env.PORT, () => {
  console.log(`app is listening on port ${env.PORT}`);
});
