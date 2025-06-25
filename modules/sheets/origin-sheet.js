import BackgroundDialog from "../dialogs/background_dialog.js";

export default class OriginSheet extends ItemSheet {
	static get defaultOptions() {
	    return(foundry.utils.mergeObject(super.defaultOptions,
	    	                             {classes: ["ldoa", "ldoa-sheet", "ldoa-origin"],
	    	                              height: 600,
	    	               	              template: "systems/lastdays/templates/sheets/origin-sheet.html",
	    	                              width: 700}));
	}

	get template() {
		return("systems/lastdays/templates/sheets/origin-sheet.html");
	}

	getData() {
		let data = super.getData();
		data.configuration                 = CONFIG.configuration;
		data.data.system.backgroundObjects = data.data.system.backgrounds.map((definition) => JSON.parse(definition));
		return(data);
	}

	activateListeners(html) {
		html.find(".ldoa-new-background-icon").click(this._onNewBackgroundClicked.bind(this));
		html.find(".ldoa-background-column").click(this._onEditBackgroundClicked.bind(this));
		html.find(".ldoa-background-checkbox").click(this._onBackgroundSelectionClicked.bind(this));
		html.find(".ldoa-delete-background-icon").click(this._onDeleteBackgroundClicked.bind(this));

		Array.from(html.find(".ldoa-background-column")).forEach((row) => row.dataset.origin = this.object.id);
		super.activateListeners(html);
		if(!game.settings.get("lastdays", "customOrigins")) {
		    ui.notifications.error(game.i18n.localize("ldoa.errors.origins.custom.inactive"));
		}
	}

	_findRootElement(element) {
		let root = element;

		while(!root.classList.contains("ldoa-origin-sheet-body")) {
			root = root.parentElement;
		}

		return(root);
	}

	_onBackgroundSelectionClicked(event) {
		let sheetBody  = this._findRootElement(event.currentTarget);
		let checkboxes = sheetBody.querySelectorAll('input[type="checkbox"]:checked');
		let icon       = sheetBody.querySelector('.ldoa-delete-background-icon');

		if(checkboxes.length === 0) {
			icon.classList.add("ldoa-greyed-out");
		} else {
			icon.classList.remove("ldoa-greyed-out");
		}
	}

	_onDeleteBackgroundClicked(event) {
		let sheetBody = this._findRootElement(event.currentTarget);
		let icon      = sheetBody.querySelector('.ldoa-delete-background-icon');

        if(!icon.classList.contains("ldoa-greyed-out")) {
        	let checkboxes  = sheetBody.querySelectorAll('input[type="checkbox"]:checked');
        	let keys        = Array.from(checkboxes).map((c) => c.dataset.key);
        	let backgrounds = this.object.system.backgrounds.map((e) => JSON.parse(e));

        	console.log("KEYS:", keys);
        	backgrounds = backgrounds.filter((e) => !keys.includes(e.key));
        	console.log("BACKGROUNDS:", backgrounds);
        	backgrounds = backgrounds.map((e) => JSON.stringify(e));
        	this.object.update({system: {backgrounds: backgrounds}}, {diff: true})
        }		
	}

	_onEditBackgroundClicked(event) {
		let origin     = this.object;
		let key        = event.currentTarget.dataset.key;
		let background = origin.system.backgrounds.find((entry) => JSON.parse(entry).key === key);

		event.preventDefault();
		if(background) {
			BackgroundDialog.buildForOrigin(event.currentTarget, JSON.parse(background), {}).then((dialog) => dialog.render(true));
		} else {
			console.error(`Background key '${key}' not found for origin id '${origin.id}'.`);
		}
	}

	_onNewBackgroundClicked(event) {
		event.preventDefault();
		BackgroundDialog.buildForNewOrigin(event.currentTarget, {}).then((dialog) => dialog.render(true));
	}
}