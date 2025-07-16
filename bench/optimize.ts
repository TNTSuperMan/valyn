import { run, bench } from "mitata";

const arrowNoop = () => {};
const functionNoop = function(){  };

bench("Arrow Noop", () => arrowNoop());
bench("Function Noop", () => functionNoop());

await run();
