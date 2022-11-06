import { PORT } from "./src/utils/config";
import { app } from "./src/controllers";
import * as http from "http";

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
