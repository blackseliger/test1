import BeatBlade from "../../components/beatBlade";


export default class Page {
    subElements = {};
    components = {};



    onChangeSize = (event) => {
        this.components.beadBlade.update(event.target.value)
    }



    render() {

        const element = document.createElement('div');
        element.innerHTML = this.getTemplate();

        this.element = element.firstElementChild;

        this.subElements = this.getSubElements();
        console.log('gdhkjhdgkj')
        this.initComponents();
        this.renderComponents();
        this.initEventListeners();

        return this.element;
    }


    initComponents() {
        const beadBlade = new BeatBlade()

        this.components = {
            beadBlade,
        }
    }

    renderComponents() {
        Object.keys(this.components).forEach(component => {
            const root = this.subElements[component];
            const { element } = this.components[component];
            root.append(element);
        })
    }

    initEventListeners() {
        let change = this.element.querySelectorAll('input[name="size"]');
        change.forEach((radio) => {
            radio.addEventListener('change', this.onChangeSize);
        })

    }

    getSubElements() {
        const elements = this.element.querySelectorAll('[data-element]')
        for (const item of elements) {
            this.subElements[item.dataset.element] = item;
        }
        return this.subElements;
    }

    removeEventListeners() {
        this.removeEventListeners();
    }

    remove() {
        if (this.element) {
            this.element.remove()
        }
    }

    destroy() {
        this.remove();
        this.element = null;
        this.subElements = null;


        for (const component of Object.values(this.components)) {
            component.destroy();
        }
    }


    getTemplate() {
        return `
        <div data-element="beadBlade">
        
        <div data-element="beadBlade">

        <input type="radio" id="contactChoice1"
         name="size" value="4">
        <label for="contactChoice1">4</label>
    
        <input type="radio" id="contactChoice2"
         name="size" value="5">
        <label for="contactChoice2">5</label>
    
        <input type="radio" id="contactChoice3"
         name="size" value="6">
        <label for="contactChoice3">6</label>

        </div>
    </div>
        `
    }
}