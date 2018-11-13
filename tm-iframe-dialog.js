import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@vaadin/vaadin-dialog/vaadin-dialog.js';
import '@polymer/paper-button/paper-button.js';

/**
 * `tm-iframe-dialog`
 * Polymer web component to preview an external page in a dialog
 *
 * The dialog will display a given page, and then give an option to close the dialog,
 * load the page in a new tab.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TmIframeDialog extends PolymerElement {
    static get template() {
        return html`
        <style>
            :host {
                display: block;
            }
        
            .page {
                display: flex;
                flex-direction: column;
                padding: 1vmin;
                
            }
            iframe {
                width: 90vw;
                height: 75vh;
                outline: none;
                box-sizing: border-box;
                border: solid lightgray 1px;
            }
        
            div.toolbar {
                flex:1;
                display: flex;
                flex-direction: row;
                height: 5vh;
                width: 100%;
            }
        
            div.toolbar > span.title {
                flex: 1;
                margin-top:0.3vh;
                float:left;
                font-style: italic;
                font-size: 2vh;
            }
        
            div.toolbar > div.buttons {
                flex: 1;
            }
        
           div.toolbar .buttons {
                float:right;
                flex:1;
            }
            div.toolbar > .buttons paper-button {
                padding:0.3vh 0.5vw 0.3vh 0.5vw;
                font-size: 2vh;
                border: solid lightgray 1px;
                float: right;
            }
            
            div.footer {
                flex:1;
                display: flex;
                flex-direction: row;
                height: 5vh;
                width: 100%;
            }
            div.footer > span.url {
                font-size: 2vh;
                font-style: italic;
                color: lightgray;
            }
        </style>
        <vaadin-dialog id="sourceDialog">
            <template>
                <div class="page">
                    <div class="toolbar">
                        <span class="title">[[title]]</span>
                        <div class="buttons">
                            <paper-button on-tap="_openSourceInTab">Open in Tab</paper-button>
                            <paper-button on-tap="_closeSourceDialog">Close</paper-button>
                        </div>
                    </div>
                    <iframe src="[[src]]"></iframe>   
                    <div class="footer">
                        <span class="url">[[src]]</span>
                    </div>             
                </div>
            </template>
        </vaadin-dialog>
    `;
    }

    static get properties() {
        return {
            /** The url of the page that is to be load. */
            src: {
                type: String,
                value: 'https://google.com',
            },
            /** Title to describe what is being loaded. */
            title: {
                type: String,
                value: 'Google',
            },
        };
    }

    /**
     * Open the dialog and view the required page.
     */
    open() {
        this.$.sourceDialog.opened = true;
    }

    /**
     * Close the dialog.
     */
    close() {
        this.$.sourceDialog.opened = false;
    }

    _openSourceInTab() {
        window.open(this.src, '_black');
        this.$.sourceDialog.opened = false;
    }

    _closeSourceDialog() {
        this.$.sourceDialog.opened = false;
    }

    ready() {
        super.ready();
    }
}

window.customElements.define('tm-iframe-dialog', TmIframeDialog);
