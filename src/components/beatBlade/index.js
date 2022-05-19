

export default class BeatBlade {
    subElements = {};
    start;
    score = 0;


    onStart = (event) => {
        this.startGame();
    }

    onStop = (event) => {
        this.stopGame();
    }

    onPick = (event) => {

        const { success, failure } = this.subElements;

        const element = event.target;

        if (element.classList.contains('beadBlade__goblin')) {
            this.score += 1;
            success.textContent = this.score;
            if (this.score === 5) return alert('you are win');

            clearInterval(this.start);
            this.startGame();
        } else {
            this.fail -= 1;
            failure.textContent = this.fail;

            if (this.fail === 0) {
                this.stopGame()
                return alert('you are lose');
            }
        }
    }


    constructor(size = 4) {
        this.size = size >= 4 ? size : 4;
        this.score = 0;
        this.fail = 5;
        this.render();
    }

    render() {
        const wrapper = document.createElement('div');

        wrapper.innerHTML = this.getTemplate();
        this.element = wrapper.firstElementChild;

        this.subElements = this.getSubElements();
        this.initEventListeners();
    }

    initEventListeners() {
        const { startGame, stopGame, cells } = this.subElements;

        startGame.addEventListener('click', this.onStart);
        stopGame.addEventListener('click', this.onStop);
        cells.addEventListener('click', this.onPick);
    }

    update(size) {

        const { body } = this.subElements;
        this.stopGame();
        this.size = size;
        body.innerHTML = this.getBody()
        this.subElements = this.getSubElements();
        this.initEventListeners();

    }

    startGame() {

        const { goblin } = this.subElements;

        if (goblin.classList.contains('beadBlade__img-hidden')) {
            goblin.classList.remove('beadBlade__img-hidden');
        }

        this.start = setInterval(() => {
            const random = this.getRandomIntInclusive(this.size * this.size);
            this.subElements[random].append(this.subElements.goblin);
        }, 1000)

    }

    stopGame() {

        const { success, failure } = this.subElements;

        this.fail = 5;
        this.score = 0;

        success.textContent = this.score;
        failure.textContent = this.score;

        this.subElements.goblin.classList.add('beadBlade__img-hidden');
        clearInterval(this.start)
    }


    getRandomIntInclusive(max) {
        let min = Math.ceil(0);
        max = Math.floor(max - 1);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getSubElements() {
        const elements = this.element.querySelectorAll('[data-element]');

        for (const item of elements) {
            this.subElements[item.dataset.element] = item;
        }

        return this.subElements;
    }

    getCell(size) {
        const cells = [];
        const cell = (index) => {
            return index === 0 ?
                `<div class="beadBlade__cell" data-element="${index}">
                    <div class="beadBlade__img beadBlade__img-hidden" data-element="goblin">
                        <img src="./goblin.png" alt="goblin" class="beadBlade__goblin">
                    </div>
                 </div>` :
                `<div class="beadBlade__cell" data-element="${index}"></div>`
        }
        for (let i = 0; i < size; i++) {
            cells.push(cell(i))
        };

        return cells.join('');
    }

    getBody() {
        return `<div class="beadBlade" style="width: ${(this.size * 160)}px">
        <div class="beadBlade__cells" data-element="cells">
        ${this.getCell(this.size * this.size)}
        </div>
 </div>`
    }



    getTemplate() {
        return `<div>
        <button  class="button button_secondary" data-element="startGame">
        Start
     </button>
     <button class="button button_secondary" data-element="stopGame">
         Stop
     </button>
     <div class="score score_success" data-element="success">0</div>
     <div class="score score_failure" data-element="failure">5</div>
        <div data-element="body">
                ${this.getBody()}
        </div>
    </div>`
    }



    remove() {
        if (this.element) {
            this.element.remove();
        }
    }

    destroy() {
        this.remove();
        this.element = null;
        this.subElements = null;
    }


}