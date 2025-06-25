export default class BoonSheet  extends ItemSheet {
    static get defaultOptions() {
        return(foundry.utils.mergeObject(super.defaultOptions,
                                         {classes:  ["ldoa", "ldoa-sheet", "ldoa-boon-sheet", "sheet"],
                                          height:   450,
                                          template: "systems/lastdays/templates/sheets/boon-sheet.html",
                                          width:    600}));
    }

	get template() {
		return("systems/lastdays/templates/sheets/boon-sheet.html");
	}

	getData() {
		let context = super.getData();

		context.configuration = CONFIG.configuration;
		return(context);
	}
}