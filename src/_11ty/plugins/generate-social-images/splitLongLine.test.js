import test from "ava";
import splitLongLine from "./splitLongLine.js";

  test("short line returns single line array", (t) => {
    t.is(splitLongLine("short title"), "short title");
  });
  
});
