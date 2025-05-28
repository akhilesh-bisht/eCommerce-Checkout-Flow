import "./config/env.js";
import { app } from "./app.js";
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("server live at", PORT));
