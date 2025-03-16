// Custom grid elements
class RGrid extends HTMLElement {
  constructor() {
    super();
    this.updateColumns();
  }

  updateColumns() {
    const columns = this.getAttribute('columns') || '6';
    const columnsS = this.getAttribute('columns-s') || '4';
    const columnsXs = this.getAttribute('columns-xs') || '2';
    
    this.style.display = 'grid';
    this.style.gap = '2rem';
    this.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    
    // Media queries will be handled in CSS
  }

  static get observedAttributes() {
    return ['columns', 'columns-s', 'columns-xs'];
  }

  attributeChangedCallback() {
    this.updateColumns();
  }
}

class RCell extends HTMLElement {
  constructor() {
    super();
    this.updateSpan();
  }

  updateSpan() {
    const span = this.getAttribute('span') || '1';
    const spanS = this.getAttribute('span-s');
    const order = this.getAttribute('order') || '0';
    
    this.style.gridColumn = `span ${span}`;
    this.style.order = order;
  }

  static get observedAttributes() {
    return ['span', 'span-s', 'order'];
  }

  attributeChangedCallback() {
    this.updateSpan();
  }
}

// Register custom elements
customElements.define('r-grid', RGrid);
customElements.define('r-cell', RCell); 