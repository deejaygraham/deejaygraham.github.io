import test from "ava";
import socialImageFile from "./socialImageFile.js";

test("returns slugified jpg filename", (t) => {
  t.is(socialImageFile("aggressive-dates"), "aggressive-dates.jpg");
  t.is(socialImageFile("Hello World"), "hello-world.jpg");
});
