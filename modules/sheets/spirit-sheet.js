export default class SpiritSheet  extends ItemSheet {
	get template() {
		return("systems/lastdays/templates/sheets/spirit-sheet.html");
	}

	getData() {
		let data = super.getData();
		data.configuration = CONFIG.configuration;
		return(data);
	}
}