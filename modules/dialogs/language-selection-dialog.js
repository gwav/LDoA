export class LanguageSelectionDialog extends FormApplication {
    constructor(actor, options = {}) {
        super({}, {
            title: "Select Languages",
            classes: ["language-selection-dialog"],
            width: 500,
            height: "auto",
            resizable: true
        });
        
        this.actor = actor;
        this.dialogOptions = options;
    }
    
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            template: "systems/lastdays/templates/dialogs/language-selection.html",
            classes: ["dialog", "language-selection-dialog"],
            width: 500,
            height: "auto",
            resizable: true,
            submitOnChange: false,
            submitOnClose: false
        });
    }
    
    async getData() {
        const data = await super.getData();
        
        // Safely prepare data for template
        const safeOptions = {
            availableLanguages: this.dialogOptions.availableLanguages || {},
            availableSlots: Math.max(0, this.dialogOptions.availableSlots || 0),
            currentLanguages: Array.isArray(this.dialogOptions.currentLanguages) ? 
                this.dialogOptions.currentLanguages.filter(l => l && l.trim()) : [],
            automaticLanguages: Array.isArray(this.dialogOptions.automaticLanguages) ? 
                this.dialogOptions.automaticLanguages.filter(l => l && l.trim()) : []
        };
        
        console.log("🔧 FormApplication getData:", safeOptions);
        
        data.options = safeOptions;
        return data;
    }
    
    activateListeners(html) {
        super.activateListeners(html);
        
        // Language selection change handlers
        html.find('.language-select').change(this._onLanguageChange.bind(this));
        
        // Button handlers
        html.find('.save-languages').click(this._onSave.bind(this));
        html.find('.cancel-languages').click(this._onCancel.bind(this));
    }
    
    _onLanguageChange(event) {
        const select = event.currentTarget;
        const selectedLang = select.value;
        const descriptionDiv = $(select).siblings('.language-description');
        
        if (selectedLang) {
            try {
                const description = game.i18n.localize(`ldoa.languages.${selectedLang}.description`);
                descriptionDiv.text(description || "No description available");
            } catch (e) {
                descriptionDiv.text("No description available");
            }
        } else {
            descriptionDiv.text("");
        }
    }
    
    async _updateObject(event, formData) {
        const selectedLanguages = [];
        
        // Collect selected languages
        for (let i = 0; i < this.dialogOptions.availableSlots; i++) {
            const value = formData[`language_${i}`];
            if (value && value.trim()) {
                selectedLanguages.push(value.trim());
            }
        }
        
        // Validate no duplicates
        const uniqueLanguages = [...new Set(selectedLanguages)];
        if (uniqueLanguages.length !== selectedLanguages.length) {
            ui.notifications.error("Cannot select the same language multiple times!");
            return;
        }
        
        // Call the callback with the selected languages
        if (this.dialogOptions.callback) {
            this.dialogOptions.callback(selectedLanguages);
        }
    }
    
    _onSave(event) {
        event.preventDefault();
        
        const form = this.element.find('.language-selection-form')[0];
        if (form) {
            const formData = new FormData(form);
            const formObject = {};
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }
            this._updateObject(event, formObject);
        }
        
        this.close();
    }
    
    _onCancel(event) {
        event.preventDefault();
        this.close();
    }
    

}