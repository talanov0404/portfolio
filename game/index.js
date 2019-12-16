let memojiArr = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧',
    '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟',
    '🦂', '🐢', '🐍', '🦎', '🦖', '🐙', '🦑', '🦐', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈',
    '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🐃', '🦝', '🦨', '🦦',
    '🦥', '🐇', '🦩', '🦢', '🦜', '🦚', '🦃', '🐓', '🐈', '🐩', '🐕', '‍🦺', '🦮', '🐕', '🦌', '🐐', '🐑',
    '🦙', '🐏', '🐖', '🐎', '🐄', '🐂', '🦡', '🐁', '🐀', '🦔', '🐉', '🐲', '☃', '🌹', '🌺', '🌈'];
let memoji = [];
let clickCount = 0;

function init() {
    addOnClickEventListeners()
}
function addOnClickEventListeners() {
    let cardsBox = document.querySelector('.main_container');
    cardsBox.addEventListener('click', clickOnCard);
    formArrmemoji(memojiArr);
    addMemoji(cardsBox);
}
function formArrmemoji(memojiArr) {
    memoji = [];
    for(let i = 0; memoji.length < 30; i++) {
        let j = Math.floor(Math.random() * (memojiArr.length));
        memoji.push(memojiArr[j], memojiArr[j]);
        memojiArr.splice(j, 1);
    }
    let j, x, i;
    for (i = memoji.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = memoji[i];
        memoji[i] = memoji[j];
        memoji[j] = x;
    }
}

function clickOnCard(event) {
    clickCount = clickCount + 1;
    let countTimer = 60;
    if (clickCount === 1) startTimer(countTimer);
    let target = event.target.closest('.card-block');
    let count = document.querySelectorAll('.flip').length;
    if (!target || !this.contains(target)) return;
    if (event.target.closest('.coin') || event.target.closest('.mism')) return;
    if (count > 1){
        if (!event.target.closest('.flip')) {
            for (let j = 0; j < memoji.length; j++) {
                this.children[j].children[0].classList.remove('flip', 'mism')
            }
        }
    }
    event.target.closest('.card').classList.toggle('flip');
    colorOpenCards(this);
}

function colorOpenCards(cardsBox) {
    let cardsOpen = cardsBox.querySelectorAll('.flip');
    let count = cardsOpen.length;
    let contentArr = [];
    for(let i = 0; i < count; i++) {
        contentArr.push(cardsOpen[i].children[1].textContent);
    }
    if (count > 1){
        if (contentArr[0] === contentArr[1]){
            for(let i = 0; i < count; i++) {
                cardsOpen[i].classList.add('coin');
                cardsOpen[i].classList.remove('flip', 'mism');
            }
        }
        else {
            for(let i = 0; i < count; i++) {
                cardsOpen[i].classList.add('mism');
            }
        }
    }
    return cardsBox;
}

function addMemoji(cardsBox) {
    for (let i = 1; i < memoji.length; i++) {
        cardsBox.appendChild(cardsBox.children[0].cloneNode(true));
    }
    for (let i = 0; i < memoji.length; i++) {
        cardsBox.children[i].children[0].children[1].textContent = memoji[i];
    }
}

function startTimer(time) {
    let timerId = setInterval(() => {
        time -= 1;
        let text;
        let minutes = ('0'+ time).slice(-2);
        document.querySelector('.timer').innerHTML = `00:${minutes}`;
        if (time === 0 || document.querySelectorAll('.coin').length >= memoji.length) clearInterval(timerId);
        if (document.querySelectorAll('.coin').length >= memoji.length) alertResult(text = 'Win');
        if (time === 0) alertResult(text = 'Lose');
    }, 1000);
}

function alertResult(text) {
    document.querySelector('.modal-wrapper').style.display = 'block';
    document.querySelector('.modal').style.display = 'flex';
    for (let i = 0; i < text.length; i++){
        let elementSpan = document.createElement('span');
        document.querySelector('.game-Result').appendChild(elementSpan).innerHTML = text[i];
        document.querySelectorAll('span')[i].classList.add('anim');
        document.querySelectorAll('span')[i].style.animationDelay = `${0.2 * i}s`;
    }
    let buttonText = 'Play again';
    if (text === 'Lose') buttonText = 'Try again';
    document.querySelector('.button').innerHTML = buttonText;
    document.querySelector(".button").addEventListener('click', clickOnButton);
}

function clickOnButton() {
    let cardsBox = document.querySelector('.main_container');
    let spanBox = document.querySelector('.game-Result');
    cardsBox.children[0].children[0].children[1].textContent = '';
    cardsBox.children[0].children[0].classList.remove('coin', 'flip', 'mism');
    document.querySelector('.modal-wrapper').style.display = 'none';
    document.querySelector('.modal').style.display = 'none';
    for (let i = memoji.length - 1; i > 0; i--) {
        cardsBox.children[i].remove();
    }
    for (let j = spanBox.children.length - 1; j >= 0; j--) {
        spanBox.children[j].remove();
    }
    init();
    clickCount = 0;
    document.querySelector('.timer').innerHTML = '01:00';
}