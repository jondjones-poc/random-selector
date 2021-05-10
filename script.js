const tags = document.getElementById('tags');
const textarea = document.getElementById('textarea');
const timePeriod = 100;

textarea.focus();

textarea.addEventListener('keyup', (e) => {
    createTags(e.target.value);

    if (e.key === 'Enter' 
        && e.target.value.trim().length > 1) {
        setTimeout(() => {
            e.target.value = '';
        })
        randomSelect();
    }
})

function randomSelect() {
    const times = 15;
    const interval = getIntervalAndHighlight();
    setTimeout(() => {
        clearInterval(interval);
        setTimeout(() => {
            const span = pickRandomSpan();
            AddHighLightClass(span);
        })
    }, timePeriod)
}

function getIntervalAndHighlight() {
    return setInterval(() => {
        const span = pickRandomSpan();
        if (!span) {
            console.log('Invalid Choice');
            return;
        }

        AddHighLightClass(span);
        setTimeout(() => {
            RemoveHighLightClass(span)
        }, 150);

    }, 150);
}

function AddHighLightClass(tag) {
    tag.classList.add('highlight');
}

function RemoveHighLightClass(tag) {
    tag.classList.remove('highlight');
}

function pickRandomSpan() {
    const spanElements = document.querySelectorAll('.tag');
    return spanElements[Math.floor(Math.random() * spanElements.length)];
}

function createTags(input) {
    const userInput = input.split(',')
        .filter(tag => tag.trim() !== '')
        .map(tag => tag.trim());
    console.log(userInput)
    tags.innerHTML = '';

    userInput.forEach((tag, index) => {
        const tagEl = document.createElement('span');
        tagEl.classList.add('tag');
        tagEl.id = index;
        tagEl.innerHTML = tag;
        tags.appendChild(tagEl)
    })
}