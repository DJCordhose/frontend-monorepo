import { Selector } from "testcafe";
import { takeSnapshot } from "testcafe-blink-diff";

fixture`App Visual Regression Test`.page`http://localhost:3000/counter/`;

test("start", async (t) => {
  const valueEl = Selector("[data-testid='count:value']");
  const initialValue = 1000000;

  // wait until precondition is fulfilled, indicating app has started
  await t
    .expect(valueEl.exists)
    .ok()
    .expect(valueEl.innerText)
    .eql(String(initialValue));

  await takeSnapshot(t);
});
