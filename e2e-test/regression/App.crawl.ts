import { Selector } from 'testcafe';

fixture`App Browser Crawling`
    .page `http://localhost:3000/counter/`

const inputs = Selector('input');
const buttons = Selector('button');
const appEl = Selector('#cnt-app');

// const REPEAT_INPUT = 100;
const REPEAT_INPUT = 10;

async function takeAppScreenshot(t) {
    await t.takeElementScreenshot(appEl);
} 

function randomInt(range: number = 1000) {
    return Math.floor(Math.random() * range); 
}

async function clickAllButtons(t) {
    const elementsCount = await buttons.count;
    for (let i = 0; i < elementsCount; i++) {
        const button = await buttons.nth(i)();
        await t.click(button);
        await takeAppScreenshot(t);
    }
}

async function clickRandomButtons(t, repetitions?: number) {
    const elementsCount = await buttons.count;
    repetitions = repetitions ?? elementsCount;
    for (let j =0; j < repetitions; j++) {
        const randomButtonIndex = randomInt(elementsCount);
        const button = await buttons.nth(randomButtonIndex)();
        await t.click(button);
        await takeAppScreenshot(t);
    }
}

test('chaos crawl', async t => {
    await takeAppScreenshot(t);

    const elementsCount = await inputs.count;
    for (let i = 0; i < elementsCount; i++) {
        const input: NodeSnapshot = await inputs.nth(i)();
        const type = input.getAttribute('type');
        if (type === 'number') {
            for (let j =0; j < REPEAT_INPUT; j++) {
                const randomInput = String(randomInt());
                // const randomInput = String(randomInt(1e+10));
                // const randomInput = String(randomInt(1e+15));
                // const randomInput = String(randomInt(1e+19));
                await t.typeText(input, randomInput, { replace: true });
                await clickRandomButtons(t);
            }
        }
    }

});
