export default class SpellSheet  extends ItemSheet {
	get template() {
		return("systems/lastdays/templates/sheets/spell-sheet.html");
	}

	getData() {
		let data = super.getData();
		data.configuration = CONFIG.configuration;
		data.disabled      = (data.item.system.state === "unavailable");
		return(data);
	}
}