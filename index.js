import { catchErr, color ,random} from "shmaker";

color(["Hello, World!", "blue","underline"]);
color([random(10,20), "red","underline"]);

try {
    throw new Error("This is a test error");
} catch (error) {
    catchErr(error,"./index.js");
}