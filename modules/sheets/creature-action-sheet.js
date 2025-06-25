export default class CreatureActionSheet extends ItemSheet {
    static get defaultOptions() {
        return(foundry.utils.mergeObject(super.defaultOptions,
                                         {classes: ["ldoa", "ldoa-sheet", "ldoa-creature-action"],
                                          height: 375,
                                          width: 750}));
    }

    get template() {
        return("systems/lastdays/templates/sheets/creature-action-sheet.html");
    }

    getData() {
        let data = super.getData();

        data.configuration = CONFIG.configuration;
        return(data);
    }

    activateListeners(html) {
        // html.find('.ldoa-attribute-selector').on("change", (e) => this._onAttributeSelectionChange(e, html));
        super.activateListeners(html);
    }

    _onAttributeSelectionChange(event, html) {
        let field = html[0].querySelector('input[name="system.attributes"]');
        let selected = html[0].querySelectorAll(".ldoa-attribute-selector:checked");

        if(selected.length > 0) {
            let names = [];

            selected.forEach((checkbox) => names.push(checkbox.value));
            field.value = names.join(",");
        } else {
            field.value = "none";
        }
    }
}