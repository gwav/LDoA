export default class ConsumableSheet  extends ItemSheet {
	static get defaultOptions() {
	    return(foundry.utils.mergeObject(super.defaultOptions,
	    	                             {classes: ["ldoa", "ldoa-sheet", "ldoa-consumable"],
	    	                              height: 450,
	    	               	              template: "systems/lastdays/templates/sheets/consumable-sheet.html",
	    	                              width: 600}));
	}

	get template() {
		return("systems/lastdays/templates/sheets/consumable-sheet.html");
	}

	getData() {
		let context = super.getData();

		context.configuration = CONFIG.configuration;
		return(context);
	}
}