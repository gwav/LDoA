export default class WeaponSheet  extends ItemSheet {
	get template() {
		return("systems/lastdays/templates/sheets/weapon-sheet.html");
	}

	getData() {
		let data = super.getData();
		data.configuration = CONFIG.configuration;
		return(data);
	}
}