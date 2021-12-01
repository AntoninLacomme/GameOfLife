class FullCanvas extends HTMLElement {
    constructor () {
        super ()
        const shadow = this.attachShadow ({mode: "open"})
        this.canvas = document.createElement ("canvas")
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        this.canvas.style.position = "absolute"
        this.canvas.style.top = "0px"
        this.canvas.style.left = "0px"

        this.canvas.style.backgroundColor = "black"
        this.ctx = this.canvas.getContext ("2d")

        window.addEventListener ("resize", () => {
            this.canvas.width = window.innerWidth
            this.canvas.height = window.innerHeight
            let c = this.canvas.getContext ("2d");
            c.WIDTH = this.canvas.width;
            c.HEIGHT = this.canvas.height;
        })

        this.ctx.translationX = 0,
        this.ctx.translationY = 0,
        this.listEventCallBackClic = new Array (),
        this.listEventCallBackMove = new Array ()

        let zoom = 1
        this.ctx.currentZoom = 1
        window.addEventListener ("mousewheel", (ev) => {
            zoom = 1
            if (ev.deltaY < 0) {
                zoom = 1.2
                this.ctx.currentZoom *= 1 / 1.2;
            }
            if (ev.deltaY > 0) {
                zoom = 0.8;
                this.ctx.currentZoom *= 1 / 0.8;
            }
            
            this.getContext ().scale (zoom, zoom);
        })


        this.listEventCallBackMove.push ((x, y, lastX, lastY) => {
            if (lastX != null && lastY != null) {
                this.translate (((x- lastX) * this.ctx.currentZoom) | 0, ((y-lastY) * this.ctx.currentZoom) | 0)
            }
        })

        this.ctx.clearAll = () => {
            this.ctx.clearRect (-5000000,-5000000,10000000,10000000)
        }
    }
    translate (x, y) {
        this.ctx.translationX += x,
        this.ctx.translationY += y
        this.ctx.translate (x, y)
    }
    connectedCallback () {
        this.shadowRoot.appendChild (this.canvas);

        let mousedown = false,
            mousemove = false
        let clicOrgX = null,
            clicOrgY = null,
            moveLastX = null,
            moveLastY = null
        this.shadowRoot.addEventListener ("mousedown", (ev) => {
            mousedown = true
            clicOrgX = ev.clientX
            clicOrgY = ev.clientY
        })
        this.shadowRoot.addEventListener ("mouseup", (ev) => {
            if (mousedown && !mousemove) {
                this.listEventCallBackClic.forEach ((callback) => {
                    callback (clicOrgX, clicOrgY, ev.button, clicOrgX)
                })
            }

            moveLastX = null,
            moveLastY = null,
            mousedown = false,
            mousemove = false
        })
        this.shadowRoot.addEventListener ("mousemove", (ev) => {
            if (mousedown) {
                mousemove = true
                this.listEventCallBackMove.forEach ((callback) => {
                    callback (ev.clientX, ev.clientY, moveLastX, moveLastY)
                })
            }

            moveLastX = ev.clientX,
            moveLastY = ev.clientY
        })
    }
    getContext () {
        this.ctx.WIDTH = this.canvas.width,
        this.ctx.HEIGHT = this.canvas.height
        return this.ctx
    }
    addEventListenerClic (fxCallback) {
        this.listEventCallBackClic.push (fxCallback)
    }
    addEventListenerMove (fxCallback) {
        this.listEventCallBackMove.push (fxCallback)
    }
}

customElements.define ("full-canvas", FullCanvas);
