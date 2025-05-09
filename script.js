const glyphInput = document.getElementById('glyphLevel');
const noDeathBonus = document.getElementById('noDeathBonus');
const calcPlus20 = document.getElementById('calcPlus20');
const output = document.getElementById('output');
const applyFinalLevel = document.getElementById('applyFinalLevel');

const currentLevel = document.getElementById('currentLevel');
const desiredLevel = document.getElementById('desiredLevel');
const stoneNoDeath = document.getElementById('stoneNoDeath');
const pitPlus20 = document.getElementById('pitPlus20');
const stoneOutput = document.getElementById('stoneOutput');

let lastFinalGlyphLevel = 1;

function updateResults() {
    const glyphLevel = parseInt(glyphInput.value);
    const attempts = noDeathBonus.checked ? 4 : 3;
    const extraUpgrade = calcPlus20.checked ? 1 : 0;

    if (isNaN(glyphLevel) || glyphLevel < 1) {
        output.innerText = 'Please enter a valid glyph level (1 or higher).';
        return;
    }

    const finalGlyphLevel = glyphLevel + attempts - 1 + extraUpgrade;
    lastFinalGlyphLevel = finalGlyphLevel;
    const requiredPit = calcPlus20.checked ? glyphLevel + 20 : finalGlyphLevel + 10;

    output.innerHTML = `<strong>Minimum Pit Level: ${requiredPit}</strong><br>` +
        `Glyph level after run: <strong>${finalGlyphLevel}</strong>`;
}

function adjustGlyphLevel(delta) {
    let current = parseInt(glyphInput.value) || 1;
    current = Math.max(1, current + delta);
    glyphInput.value = current;
    updateResults();
}

function resetGlyphLevel() {
    glyphInput.value = 1;
    updateResults();
}

applyFinalLevel.addEventListener('click', () => {
    glyphInput.value = lastFinalGlyphLevel;
    updateResults();
});

function updateStoneCost() {
    let from = parseInt(currentLevel.value);
    let to = parseInt(desiredLevel.value);
    let stones = 0;
    let runs = 0;
    const upgradesPerRun = stoneNoDeath.checked ? 4 : 3;

    if (isNaN(from) || isNaN(to) || from < 1 || to <= from) {
        stoneOutput.innerText = 'Please enter valid levels (desired must be higher than current).';
        return;
    }

    let level = from;
    while (level < to) {
        const gain = pitPlus20.checked ? upgradesPerRun + 1 : upgradesPerRun;
        level += gain;
        stones += 3;
        runs += 1;
    }

    stoneOutput.innerHTML = `<strong>Minimum Runs Needed: ${runs}</strong><br><strong>Total Artificer's Stones Needed: ${stones}</strong>`;
}

function setRange(start, end) {
    currentLevel.value = start;
    desiredLevel.value = end;
    updateStoneCost();
}

glyphInput.addEventListener('input', updateResults);
noDeathBonus.addEventListener('change', updateResults);
calcPlus20.addEventListener('change', updateResults);

currentLevel.addEventListener('input', updateStoneCost);
desiredLevel.addEventListener('input', updateStoneCost);
stoneNoDeath.addEventListener('change', updateStoneCost);
pitPlus20.addEventListener('change', updateStoneCost);

updateResults();
updateStoneCost();
