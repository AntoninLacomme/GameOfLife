import './TemplatePlayPause.js'

var myTemplate = "<style>" +
    "div#main-menu{" +
        "position: absolute;" +
        "background-color: rgb(80,80,80);" +
        "width: 400px;" +
    "}" +
    "</style>" +
    "<div id='main-menu'>" +
        "<div id='compteur'></div>" +
        "<div id='info'>" +
            "<table>" +
                "<tr>" +
                    "<td>Transition</td><td id='info-transition'>" +
                "</tr><tr>" +
                    "<td>Zoom</td><td id='info-zoom'>" +
                "</tr>" +
            "</table>" +
        "</div>" +
        "<button id='button-restart'>RESTART</button>" +
        "<button-play-pause></button-play-pause>" +
    "</div>"

class TemplateMenu extends HTMLElement {
    constructor () {
        super ()
        this.attachShadow ({mode: "open"})

        this.hidden = true
    }

    connectedCallback () {
        this.shadowRoot.innerHTML = myTemplate
    }

    setPlayPause (fx) {
        this.getButtonPlayPause ().setEventClic ((ev) => fx (ev) )
    }

    setRestart (fx) {
        this.getButtonRestart ().onclick = ev => fx (ev)
    }

    getButtonPlayPause () { return this.shadowRoot.querySelector ('button-play-pause') }

    getButtonRestart () { return this.shadowRoot.querySelector ('#button-restart') }

    getCompteur () { return this.shadowRoot.querySelector ("div#compteur") }

    setInfoTransition (info) { this.shadowRoot.querySelector ("td#info-transition").innerHTML = info }
    setInfoZoom (info) { this.shadowRoot.querySelector ("td#info-zoom").innerHTML = info }

    hide () { this.hidden = !this.hidden }
}

customElements.define ("self-menu", TemplateMenu);