

class SearchBar extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    set clickEvent(event) {
        this._clickEvent = event;
        this.render();
    }

    get value() {
        return this.querySelector("#searchElement").value;
    }

    render() {
        this.innerHTML = `

        <style>
            .search-container .form-group{
                background-color: black;
            }

            button{
                background-color: blue;
            }
        </style>

        <div class="search-container form-group">
            <span class="fa fa-search placeholder-icon"></span>
            <input placeholder="Search receipes and more..." class="form-control mr-sm-2" id="searchElement" type="search">
            <button class="btn btn-dark" id="searchButtonElement" type="button">Search</button>
        </div>`;

        this.querySelector("#searchButtonElement").addEventListener("click", this._clickEvent);
    }
}

customElements.define("search-bar", SearchBar);