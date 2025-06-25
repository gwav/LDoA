import {ldoaActor} from './modules/documents/ldoa_actor.js';
import ldoaCombat from './modules/combat.js';
import {ldoaConfiguration} from './modules/configuration.js';
import {CLASSIC_ORIGINS} from './modules/constants.js';
import {runMigrations} from './modules/migrations.js';
import {ldoaItem} from './modules/documents/ldoa_item.js';
import CharacterSheet from './modules/sheets/character-sheet.js';
import Garysv1CharacterSheet from './modules/sheets/garysv1-character-sheet.js';
import ConsumableSheet from './modules/sheets/consumable-sheet.js';
import CreatureActionSheet from './modules/sheets/creature-action-sheet.js';
import CreatureSheet from './modules/sheets/creature-sheet.js';
import EquipmentSheet from './modules/sheets/equipment-sheet.js';
import BoonSheet from './modules/sheets/boon-sheet.js';
import OriginSheet from './modules/sheets/origin-sheet.js';
import DemonSheet from './modules/sheets/demon-sheet.js';
import SpellSheet from './modules/sheets/spell-sheet.js';
import SpiritSheet from './modules/sheets/spirit-sheet.js';
import WeaponSheet from './modules/sheets/weapon-sheet.js';
import {logDamageRoll, toggleAttributeTestDisplay} from './modules/chat_messages.js';
import {getBackgrounds, getOrigins} from './modules/origins.js';
import {LanguageSelectionDialog} from './modules/dialogs/language-selection-dialog.js';
import {capitalize, stringToKey} from './modules/shared.js';
import {CustomizableBoons} from './modules/customizable-boons.js';

async function preloadHandlebarsTemplates() {
    const paths = ["systems/lastdays/templates/messages/attack-roll.hbs",
                   "systems/lastdays/templates/messages/damage.hbs",
                   "systems/lastdays/templates/messages/damage-roll.hbs",
                   "systems/lastdays/templates/messages/demon-failure.hbs",
                   "systems/lastdays/templates/messages/demon-success.hbs",
                   "systems/lastdays/templates/messages/die-roll.hbs",
                   "systems/lastdays/templates/messages/stressed.hbs",
                   "systems/lastdays/templates/messages/stress-roll.hbs",
                   "systems/lastdays/templates/messages/roll.hbs",
                   "systems/lastdays/templates/messages/spirit-failure.hbs",
                   "systems/lastdays/templates/messages/spirit-success.hbs",
                   "systems/lastdays/templates/messages/usage-die-roll.hbs",
                   "systems/lastdays/templates/partials/cs-attribute-list.hbs",
                   "systems/lastdays/templates/partials/garysv1-attribute-list.hbs",
                   "systems/lastdays/templates/partials/cs-background-entry.hbs",
                   "systems/lastdays/templates/partials/cs-background-tab-body.hbs",
                   "systems/lastdays/templates/partials/cs-backgrounds-classic.hbs",
                   "systems/lastdays/templates/partials/cs-backgrounds-new.hbs",
                   "systems/lastdays/templates/partials/cs-base-attributes-list.hbs",
                   "systems/lastdays/templates/partials/cs-consumable-entry.hbs",
                   "systems/lastdays/templates/partials/cs-demon-entry.hbs",
                   "systems/lastdays/templates/partials/cs-equipment-entry.hbs",
                   "systems/lastdays/templates/partials/cs-equipment-tab-body.hbs",
                   "systems/lastdays/templates/partials/cs-fp-background-entry.hbs",
                   "systems/lastdays/templates/partials/cs-front-page-tab-body.hbs",
                   "systems/lastdays/templates/partials/cs-boon-entry.hbs",
                   "systems/lastdays/templates/partials/cs-magic-tab-body.hbs",
                   "systems/lastdays/templates/partials/cs-saga-tab-body.hbs",
                   "systems/lastdays/templates/partials/cs-spell-entry.hbs",
                   "systems/lastdays/templates/partials/cs-spirit-entry.hbs",
                   "systems/lastdays/templates/partials/cs-story-entry.hbs",
                   "systems/lastdays/templates/partials/cs-tab-bodies.hbs",
                   "systems/lastdays/templates/partials/cs-tab-labels.hbs",
                   "systems/lastdays/templates/partials/cs-weapon-entry.hbs",
                   "systems/lastdays/templates/partials/cr-action-entry.hbs",
                   "systems/lastdays/templates/partials/garysv1-equipment-tab.hbs",
                   "systems/lastdays/templates/partials/garysv1-magic-tab.hbs",
                   "systems/lastdays/templates/partials/garysv1-boons-tab.hbs",
                   "systems/lastdays/templates/partials/garysv1-languages-tab.hbs",
                   "systems/lastdays/templates/partials/garysv1-saga-tab.hbs",
                   "systems/lastdays/templates/dialogs/language-selection.html"];
    return(loadTemplates(paths))
}

Hooks.once("init", function() {
    console.log("Initializing the Last Days of Atlantis System.");

    CONFIG.Actor.documentClass  = ldoaActor;
    CONFIG.Combat.documentClass = ldoaCombat;
    CONFIG.configuration        = ldoaConfiguration;
    CONFIG.Item.documentClass   = ldoaItem;

    game.settings.register("lastdays", "customOrigins", {config:  true,
                                                                 default: false,
                                                                 hint:    game.i18n.localize("ldoa.settings.options.customOrigins.blurb"),
                                                                 name:    game.i18n.localize("ldoa.settings.options.customOrigins.title"),
                                                                 scope:   "world",
                                                                 type:    Boolean});

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("lastdays", ConsumableSheet, {types: ["consumable"]});
    Items.registerSheet("lastdays", CreatureActionSheet, {types: ["creature_action"]});
    Items.registerSheet("lastdays", DemonSheet, {types: ["demon"]});
    Items.registerSheet("lastdays", EquipmentSheet, {types: ["equipment"]});
    Items.registerSheet("lastdays", BoonSheet, {types: ["boon"]});
    Items.registerSheet("lastdays", OriginSheet, {types: ["origin"]});
    Items.registerSheet("lastdays", SpellSheet, {types: ["spell"]});
    Items.registerSheet("lastdays", SpiritSheet, {types: ["spirit"]});
    Items.registerSheet("lastdays", WeaponSheet, {types: ["weapon"]});

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("lastdays", CharacterSheet, {makeDefault: false, types: ["character"]});
    Actors.registerSheet("lastdays", Garysv1CharacterSheet, {makeDefault: true, types: ["character"]});
    Actors.registerSheet("lastdays", CreatureSheet, {makeDefault: true, types: ["creature"]});
    // Actors.registerSheet("bh2e", BH2eCreatureSheet, {makeDefault: true, types: ["creature"]});

    // Make dialog globally available
    globalThis.LanguageSelectionDialog = LanguageSelectionDialog;

    // Load templates.
    preloadHandlebarsTemplates();

    Handlebars.registerHelper("arrayIndexAdjuster", (index) => {
        return(`${index + 1}`);
    });

    // Register eq helper for template comparisons
    Handlebars.registerHelper("eq", (a, b) => {
        return a === b;
    });

    // Register math helper for templates
    Handlebars.registerHelper("math", (a, operator, b) => {
        if (operator === "+") return a + b;
        if (operator === "-") return a - b;
        if (operator === "*") return a * b;
        if (operator === "/") return a / b;
        return a;
    });

    // Register concat helper for templates
    Handlebars.registerHelper("concat", (a, b) => {
        return a + "-" + b;
    });

    // Register helper to show + sign for positive numbers
    Handlebars.registerHelper("plusSign", (value) => {
        const num = parseInt(value) || 0;
        return num >= 0 ? "+" + num : num.toString();
    });

    // Register helper for language localization path concatenation
    Handlebars.registerHelper("languageLocalizePath", (basePath, languageKey, field) => {
        return `${basePath}.${languageKey}.${field}`;
    });

    // Register helper to check if any array elements are truthy
    Handlebars.registerHelper("some", (array) => {
        return Array.isArray(array) && array.some(item => item && item.trim());
    });

    // Register helper for logical AND
    Handlebars.registerHelper("and", (a, b) => {
        return a && b;
    });

    // Register helper for equality check
    Handlebars.registerHelper("eq", (a, b) => {
        return a === b;
    });

    // Register helper for greater than check
    Handlebars.registerHelper("gt", (a, b) => {
        return a > b;
    });

    // Register helper for times loop
    Handlebars.registerHelper("times", function(n, block) {
        let accum = '';
        for(let i = 0; i < n; ++i) {
            accum += block.fn({index: i});
        }
        return accum;
    });

    // Register helper for add
    Handlebars.registerHelper("add", (a, b) => {
        return a + b;
    });

    // Register helper for in array check
    Handlebars.registerHelper("in", (array, value) => {
        return Array.isArray(array) && array.includes(value);
    });

    // Register helper for string concatenation
    Handlebars.registerHelper("concat", (...args) => {
        args.pop(); // Remove options object
        return args.join('');
    });

    Handlebars.registerHelper("backgroundSelect", function(offset, options) {
    	let backgrounds = {"": ""};
    	let labelKey    = `ldoa.fields.labels.${offset}Background`;
    	let context     = {field:    `../data.backgrounds.${offset}`,
                           labelKey: labelKey,
                           options:  backgrounds};

        for(var key in ldoaConfiguration.backgroundList) {
            if(options.hash.fromOrigin) {
            	if(ldoaConfiguration.backgroundList[key].origin === this.actor.system.origin) {
            		backgrounds[key] = ldoaConfiguration.backgroundList[key].name;
            	}
            } else {
                backgrounds[key] = ldoaConfiguration.backgroundList[key].name;
            }
        }        

        return(options.fn(context));
    });

    Handlebars.registerHelper("capitalize", function(text) {
        return(`${text.substring(0, 1).toUpperCase()}${text.substring(1)}`);
    });

    Handlebars.registerHelper("checkboxStateSelector", (setting) => {
        return(setting ? "checked" : "");
    });

    Handlebars.registerHelper("backgroundColourClassChooser", (value) => {
        return(value % 2 === 0 ? "ldoa-background-grey" : "ldoa-background-white");
    });

    Handlebars.registerHelper("originBackgroundSelect", (originId, originField, selectedKey) => {
        let origin   = getOrigins(originId).find((o) => stringToKey(o.name) === originId);
        let template = "<div>NO BACKGROUND OPTIONS AVAILABLE.</div>";

        if(origin) {
            let backgrounds = (origin.system ? origin.system.backgrounds : origin.backgrounds);
            let options     =  [`<option value=""></option>`];
            options = options.concat(getBackgrounds(originId).map((background) => {
                let selected = (background.key === selectedKey ? 'selected="selected"' : "");
                let suffix   = [game.i18n.localize(`ldoa.origins.${origin.id}.name`)];

                if(background.unique) {
                    suffix.push(game.i18n.localize("ldoa.fields.labels.unique"));
                }

                return(`<option ${selected}value="${background.key}">${game.i18n.localize(background.localeKeys.label)} (${suffix.join(', ')})</option>`);
            }));

            return(`<select class="ldoa-input ldoa-select ldoa-background-select" name="system.backgrounds.${originField}">${options.join("")}</select>`);
        } else {
            console.error(`Unable to locate an origin with the id '${originId}'.`);
        }

        return(template);
    });

    Handlebars.registerHelper("nonOriginBackgroundSelect", (originId, originField, selectedKey) => {
        let origins  = getOrigins();
        let template = "<div>NO BACKGROUND OPTIONS AVAILABLE.</div>";

        if(origins.length > 0) {
            let keys        = origins.map((o) => stringToKey(o.name));
            let backgrounds = getBackgrounds(...keys);
            let options     = ['<option value=""></option>'];

            backgrounds.sort((lhs, rhs) => lhs.name.localeCompare(rhs.name)).map((background) => {
                let origin   = origins.find((o) => background.origin === o.id);
                let selected = (background.key === selectedKey ? 'selected="selected"' : '');
                let suffix   = [game.i18n.localize(`ldoa.origins.${origin.id}.name`)];

                if(background.unique) {
                    suffix.push(game.i18n.localize("ldoa.fields.labels.unique"));
                }
                options.push(`<option ${selected}value="${background.key}">${game.i18n.localize(background.localeKeys.label)} (${suffix.join(', ')})</option>`);
            });

            template = `<select class="ldoa-input ldoa-select" name="system.backgrounds.${originField}">${options.join("")}</select>`;
        } else {
            console.error(`Unable to locate an origin with the id '${originId}'.`);
        }

        return(template);
    });

    Handlebars.registerHelper("originSelect", (fieldName, selectedKey) => {
        let entries = getOrigins().map((origin) => {
            return({key: origin.key, id: origin.id, name: origin.name, selected: (stringToKey(origin.name) === selectedKey)});
        }).sort((lhs, rhs) => lhs.name.localeCompare(rhs.name));
        let options = entries.map((entry) => {
            let selected = (entry.selected ? 'selected="selected"' : '');
            return(`<option ${selected} value="${stringToKey(entry.name)}">${game.i18n.localize(`ldoa.origins.${entry.id}.name`)}</option>`);
        });

        return(`<select class="ldoa-input ldoa-select" name="${fieldName}">${options.join("")}</select>`);
    });

    // New Background System Helpers
    Handlebars.registerHelper("getBackgroundName", (backgroundKey) => {
        const backgrounds = {
            "barbarian": "Barbarian (Martial)",
            "knight": "Knight (Martial)",
            "mage": "Mage (Arte)",
            "priest": "Priest (Arte)",
            "phenom": "Phenom (Martial)",
            "promethean": "Promethean (Arte)",
            "psion": "Psion (Arte)",
            "rogue": "Rogue (Martial)",
            "sandman": "Sandman (Arte)"
        };
        return backgrounds[backgroundKey] || "";
    });

    Handlebars.registerHelper("getBackgroundDescription", (backgroundKey) => {
        const descriptions = {
            "barbarian": "Those that live outside of civilizations' restraints.",
            "knight": "Those that uphold chivalry and civilization itself.",
            "mage": "Those that study occult tomes and formulas to unleash magick into the world.",
            "priest": "Those that bend knee to powerful gods, demigods and godlings for power.",
            "phenom": "Those that stand separate and outside of the other backgrounds.",
            "promethean": "Practitioners of Science, the newest magickal paradigm to come about on Evermore.",
            "psion": "Those that either have blood of the True Atlanteans flowing in their veins or have come into contact with their artifacts to give them the power of psionics.",
            "rogue": "Those that take on underhanded practices to get what they want, including assassination and stealing.",
            "sandman": "Those who have broken the barrier between the Waken World and the Dreamlands."
        };
        return descriptions[backgroundKey] || "";
    });

    Handlebars.registerHelper("spellStateClass", function(state) {
        return(state === "unavailable" ? "ldoa-disabled" : "");
    });

    Handlebars.registerHelper("spellState", function(state) {
        return(game.i18n.localize(`ldoa.spells.states.${state}`));
    });

    Handlebars.registerHelper("selectAttributeOption", function(chosen) {
        let selected = (chosen === this.key ? " selected" : " ");
        return(`<option${selected} value="${this.key}">${game.i18n.localize(this.value)}</option>`);
    });

    Handlebars.registerHelper("selectBoonOption", function(chosen) {
        let selected = (chosen === this.key ? " selected" : " ");
        return(`<option${selected} value="${this.key}">${game.i18n.localize(this.name)}</option>`);
    });

    Handlebars.registerHelper("summoningState", function(state) {
        return(game.i18n.localize(`ldoa.summoning.states.${state}`));
    });

    Handlebars.registerHelper("tabLabelSelectionClass", function(name) {
        return(this.actor.system.tabSelected === name ? "ldoa-tab-selected" : "");
    });

    Handlebars.registerHelper("tabBodySelectionClass", function(name) {
        return(this.actor.system.tabSelected === name ? "": "ldoa-tab-hidden");
    });

    Handlebars.registerHelper("usageDie", function(die) {
        let text = (die.current !== "" && die.current !== "^" ? die.current : die.maximum);

        if(text === "exhausted") {
            text = game.i18n.localize("ldoa.dice.exhausted");
        }
        return(text);
    });

    Handlebars.registerHelper("weaponType", function(type) {
        if(type === "ranged") {
            return(game.i18n.localize("ldoa.weapons.types.ranged"));
        } else if(type === "unarmed") {
            return(game.i18n.localize("ldoa.weapons.types.unarmed"));
        } else {
            return(game.i18n.localize("ldoa.weapons.types.melee"));
        };
    });

    // Helper to check if any attribute effects exist
    Handlebars.registerHelper("hasAttributeEffects", function(attributes) {
        if (!attributes) return false;
        return Object.values(attributes).some(value => value !== 0);
    });

    // Helper to show bonus values with proper +/- formatting
    Handlebars.registerHelper("showBonus", function(value) {
        if (value === 0) return "0";
        return value > 0 ? `+${value}` : `${value}`;
    });

    // Add hook functions.
    Hooks.on("renderChatMessage", (message, speaker) => {
        setTimeout(() => {
            let element = document.querySelector(`[data-message-id="${message.id}"]`);
            let node    = element.querySelector(".ldoa-roll-title");

            if(node) {
                node.addEventListener("click", toggleAttributeTestDisplay);
            }

            node = element.querySelector(".ldoa-damage-button");
            if(node) {
                node.addEventListener("click", logDamageRoll);
            }
        }, 250);
    });
});

Hooks.once("ready", function() {
    setTimeout(runMigrations, 500);
    CustomizableBoons.init();
    console.log("Customizable Boons system initialized.");
});
