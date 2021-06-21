import { Selector } from 'testcafe';
// import { screen  } from '@testing-library/testcafe'

fixture `App General E2E Test`
    .page `http://localhost:3000/counter/`
    ;


// version using testcase Selector accessibility labels
// const valueEl = Selector("[aria-label='Value']");
const incrementBtn = Selector("[aria-label='Increment value']");
const decrementBtn = Selector("[aria-label='Decrement value']");
const amountInput = Selector("[aria-label='Set increment amount']");
const addAmountBtn = Selector("[aria-label='Add Users (sync)']");
const addAmountBtnAsync = Selector("[aria-label='Add Users (async)']");
const loadBtn = Selector("[aria-label='Load data from server']");

// alternative version using testcase Selector testid
const valueEl = Selector("[data-testid='count:value']");
// const incrementBtn = Selector("[data-testid='count:increment']");
// const decrementBtn = Selector("[data-testid='count:decrement']");

// version using TL testid
// const valueEl = screen.getByTestId('count:value');
// const incrementBtn = screen.getByTestId('count:increment');
// const decrementBtn = screen.getByTestId('count:decrement');

// version using tl accessibility labels
// const valueEl = screen.getByRole('presentation');
// const incrementBtn = screen.getByLabelText('Increment value');
// const decrementBtn = screen.getByLabelText('Decrement value');
// const amountInput = screen.getByLabelText('Set increment amount')
// const addAmountBtn = screen.getByLabelText('Add Users (sync)');q
// const addAmountBtnAsync = screen.getByLabelText('Add Users (async)');
// const loadBtn = screen.getByLabelText('Load data from server');

const initialValue = 1000000;

test('increase', async t => {
    // wait until precondition is fulfilled, indicating app has started
    await t
      .expect(valueEl.exists).ok()
      .expect(valueEl.innerText).eql(String(initialValue));

    await t.click(incrementBtn);
    const newValue = Number(await valueEl.innerText)
    await t.expect(newValue).eql(initialValue + 1);

});

test('decrease', async t => {
    // wait until precondition is fulfilled, indicating app has started
    await t
      .expect(valueEl.exists).ok()
      .expect(valueEl.innerText).eql(String(initialValue));

    await t.click(decrementBtn);
    const newValue = Number(await valueEl.innerText)
    await t.expect(newValue).eql(initialValue - 1);

});

test('add amount', async t => {
    // wait until precondition is fulfilled, indicating app has started
    await t
    .expect(valueEl.exists).ok()
    .expect(valueEl.innerText).eql(String(initialValue));
  
    const increment = 9;
    await t.typeText(amountInput, String(increment), { replace: true });
    await t.click(addAmountBtn);
    const newValue = Number(await valueEl.innerText)
    await t.expect(newValue).eql(initialValue + increment);
});


test('add amount async', async t => {
    // wait until precondition is fulfilled, indicating app has started
    await t
    .expect(valueEl.exists).ok()
    .expect(valueEl.innerText).eql(String(initialValue));
    
    const increment = 9;
    await t.typeText(amountInput, String(increment), { replace: true });
    await t.click(addAmountBtnAsync);

    await t.wait(1500);

    const newValue = Number(await valueEl.innerText)
    await t.expect(newValue).eql(initialValue + increment);
});

test('load from server', async t => {
    // wait until precondition is fulfilled, indicating app has started
    await t
      .expect(valueEl.exists).ok()
      .expect(valueEl.innerText).eql(String(initialValue));

    await t.click(loadBtn);
    const newValue = Number(await valueEl.innerText)
    await t.expect(newValue).eql(2000000);
});
