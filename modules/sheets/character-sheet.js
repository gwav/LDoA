import {randomizeCharacter} from '../characters.js';
import {CLASSIC_ORIGINS} from '../constants.js';
import {initializeCollapsibles} from '../collapsible.js';
import {logDefendRoll,
	    logStressDieRoll,
	    logInitiativeRoll,
	    logPerceptionRoll} from '../chat_messages.js';
import {resetDarkPact,
        summonDemon,
        summonSpirit} from '../darkpacts.js';
import {rollStress} from '../stress.js';
import {getCharacterBackgrounds,
        getCustomOrigins} from '../origins.js';
import {takeLongRest,
        takeShortRest} from '../rests.js';
import {calculateCharacterData,
	    decrementItemQuantity,
	    getActorById,
	    getOwnedItemById,
	    deleteOwnedItem,
	    handleRollAttributeDieEvent,
	    handleRollDieEvent,
	    handleRollUsageDieEvent,
	    handleWeaponRollEvent,
	    incrementItemQuantity,
	    onInfoIconClicked,
	    resetItemUsageDie,
	    showAttributeRollModal,
	    stringToKey} from '../shared.js';
import {castSpell,
        resetSpellState,
        resetSpellStatesForActor} from '../spells.js';

export default class CharacterSheet extends ActorSheet {
	static get defaultOptions() {
	    return(foundry.utils.mergeObject(super.defaultOptions,
                                         {classes: ["ldoa", "ldoa-sheet", "ldoa-character"],
                			    	      height: 920,
                			    	      template: "systems/lastdays/templates/sheets/character-sheet.html"}));
	}

    /** @override */
	async getData() {
        const context = super.getData();
        let   data    = context.actor.system;

        context.flags         = context.actor.flags;
        context.customOrigins = game.settings.get("lastdays", "customOrigins");
        Object.keys(data.stories).forEach((key) => data.stories[key].configuration = CONFIG.configuration);

        if(context.actor.type === "character") {
            // Fix corrupted base attributes before calculation
            const attributes = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];
            const attributeUpdates = {};
            let needsUpdate = false;
            
            for (const attribute of attributes) {
                if (Array.isArray(context.actor.system.attributes[attribute])) {
                    console.warn(`Old sheet: fixing corrupted base ${attribute}:`, context.actor.system.attributes[attribute]);
                    let value = context.actor.system.attributes[attribute].find(val => typeof val === 'number' && !isNaN(val) && val > 0);
                    if (value === undefined) {
                        const numericValues = context.actor.system.attributes[attribute].filter(val => !isNaN(Number(val)) && Number(val) > 0);
                        if (numericValues.length > 0) {
                            value = Math.max(...numericValues.map(v => Number(v)));
                        } else {
                            value = 10;
                        }
                    }
                    context.actor.system.attributes[attribute] = value;
                    attributeUpdates[`system.attributes.${attribute}`] = value;
                    needsUpdate = true;
                }
            }
            
            if (needsUpdate) {
                console.log("Old sheet: permanently saving fixed attributes...");
                await this.actor.update(attributeUpdates);
            }
            
            this._prepareCharacterData(context);
            
            // Fix corrupted calculated values after calculation
            const calculatedUpdates = {};
            let needsCalculatedUpdate = false;
            
            if (context.actor.system.calculated) {
                for (const attribute of attributes) {
                    const rawCalculatedValue = this.actor._source.system.calculated?.[attribute];
                    const fixedCalculatedValue = context.actor.system.calculated[attribute];
                    
                    if (Array.isArray(rawCalculatedValue) || rawCalculatedValue !== fixedCalculatedValue) {
                        calculatedUpdates[`system.calculated.${attribute}`] = fixedCalculatedValue;
                        needsCalculatedUpdate = true;
                    }
                }
            }
            
            if (needsCalculatedUpdate) {
                console.log("Old sheet: permanently saving fixed calculated values...");
                await this.actor.update(calculatedUpdates);
            }
        }

        context.backgrounds.forEach((background) => {
        	background.originLocaleKey = `ldoa.origins.${background.origin}.name`;
        });

        return(context);
	}

    /** @override */
    get template() {
        return(`systems/lastdays/templates/sheets/character-sheet.html`);
    }

	activateListeners(html) {
		html.find(".ldoa-tab-label").click(this._onTabLabelClicked.bind(this));
		html.find(".ldoa-attribute-roll-icon").click(this._onAttributeRollClicked.bind(this));
		html.find(".ldoa-background-select").click(this._onBackgroundSelected.bind(this));
		html.find(".ldoa-dice-roll-icon").click(this._onDieRollClicked.bind(this));
		html.find(".ldoa-usage-die-roll-icon").click(this._onUsageDieRollClicked.bind(this));
		html.find(".ldoa-attack-roll-icon").click(this._onWeaponRollClicked.bind(this));
		html.find(".ldoa-delete-item-icon").click(this._onDeleteItemClicked.bind(this));
		html.find(".ldoa-decrease-quantity-icon").click(this._onDecreaseItemQuantityClicked.bind(this));
		html.find(".ldoa-increase-quantity-icon").click(this._onIncreaseItemQuantityClicked.bind(this));
		html.find(".ldoa-reset-usage-die-icon").click(this._onResetUsageDieClicked.bind(this));
		html.find(".ldoa-info-icon").click(onInfoIconClicked);
		html.find(".ldoa-item-name").click(this._onItemNameClicked.bind(this));
		html.find(".ldoa-cast-spell-icon").click(this._onCastSpellClicked.bind(this));
		html.find(".ldoa-reset-spell-state-icon").click(this._onResetSpellStateClicked.bind(this));
		html.find(".ldoa-reset-all-spells-icon").click(this._onResetAllSpellStatesClicked.bind(this));
		html.find(".ldoa-stress-roll-icon").click(this._onRollStressDieClicked.bind(this));
		html.find(".ldoa-reset-dark-pact-icon").click(this._onResetDarkPactClicked.bind(this));
		html.find(".ldoa-summon-demon-icon").click(this._onSummonDemonClicked.bind(this));
		html.find(".ldoa-summon-spirit-icon").click(this._onSummonSpiritClicked.bind(this));
		html.find(".ldoa-random-character-generator-button").click(this._onRandomizeMyCharacterClicked.bind(this));
		html.find(".ldoa-rest-icon").click(this._onTakeRestClicked.bind(this));
		initializeCollapsibles();
		super.activateListeners(html);
	}


    _onBackgroundSelected(event) {
        if(event.currentTarget.value !== "") {
            let actor = game.actors.get(this.object.id);
            calculateCharacterData(actor.system, CONFIG.configuration);
        }
    }

	_getCustomOrigins() {
		let origins = {};

		getCustomOrigins().forEach((origin) => {
			let key = stringToKey(origin.name);

			origins[key] = {backgrounds: [].concat(origin.system.backgrounds), id: key, name: origin.name};
		});

		return(origins);
	}

	_onAttributeRollClicked(event) {
		handleRollAttributeDieEvent(event);
	}

	_onCastSpellClicked(event) {
		let element = event.currentTarget;

		event.preventDefault();
		if(element.dataset.spell) {
			castSpell(element.dataset.spell);
		} else {
			console.error("Spell casting requested but requesting element does not have a spell attribute.");
		}
		return(false);
	}

	_onDecreaseItemQuantityClicked(event) {
		let element = event.currentTarget;

		event.preventDefault();
		if(element.dataset.item) {
			decrementItemQuantity(element.dataset.item);
		} else {
			console.error("Decrease of item quantity requested but requesting element has no item attribute.");
		}
		return(false);
	}

	_onDeleteItemClicked(event) {
		let element = event.currentTarget;

		if(element.dataset.item) {
			deleteOwnedItem(element.dataset.item);
		} else {
			console.error("Delete item requested but requesting element has no item attribute.")
		}

		return(false);
	}

	_onRandomizeMyCharacterClicked(event) {
		let element = event.currentTarget;
		let actor   = game.actors.find((a) => a.id === element.dataset.id);

		event.preventDefault();
		if(actor) {
			randomizeCharacter(actor);
		}
	}

	_onResetDarkPactClicked(event) {
		let element = event.currentTarget;

		event.preventDefault();
		if(element.dataset.actor && element.dataset.type) {
			resetDarkPact(element.dataset.actor, element.dataset.type);
		} else {
			console.error("Reset of dark pact requested but requesting element does not have an actor and/or type attribute.");
		}
		return(false);
	}

	_onResetSpellStateClicked(event) {
		let element = event.currentTarget;

		event.preventDefault();
		if(element.dataset.spell) {
			resetSpellState(element.dataset.spell);
		} else {
			console.error("Spell state reset requested but requesting element does not have a spell attribute.");
		}
		return(false);
	}

	_onResetAllSpellStatesClicked(event) {
		let element = event.currentTarget;

		event.preventDefault();
		if(element.dataset.actor) {
			resetSpellStatesForActor(element.dataset.actor);
		} else {
			console.error("Reset of all spell states requested but requesting element does not have an actor attribute.");
		}
		return(false);
	}

	_onSummonDemonClicked(event) {
		let element = event.currentTarget;

		event.preventDefault();
		if(element.dataset.demon) {
			let rollType = "standard";

			if(event.shiftKey) {
				rollType = "advantage";
			} else if(event.ctrlKey) {
				rollType = "disadvantage";
			}
			summonDemon(element.dataset.demon, rollType);
		} else {
			console.error("Summoning of a demon was requested but requesting element does not have an actor attribute.");
		}
		return(false);
	}

	_onSummonSpiritClicked(event) {
		let element = event.currentTarget;

		event.preventDefault();
		if(element.dataset.spirit) {
			let rollType = "standard";

			if(event.shiftKey) {
				rollType = "advantage";
			} else if(event.ctrlKey) {
				rollType = "disadvantage";
			}
			summonSpirit(element.dataset.spirit, rollType);
		} else {
			console.error("Summoning of a spirit was requested but requesting element does not have an actor attribute.");
		}
		return(false);
	}

	_onDieRollClicked(event) {
		handleRollDieEvent(event);
	}

	_onIncreaseItemQuantityClicked(event) {
		let element = event.currentTarget;

		event.preventDefault();
		if(element.dataset.item) {
			incrementItemQuantity(element.dataset.item);
		} else {
			console.error("Increase of item quantity requested but requesting element has no item attribute.");
		}
		return(false);
	}

	_onItemNameClicked(event) {
		let element = event.currentTarget;
		event.preventDefault();
		if(element.dataset.item) {
		    let item = getOwnedItemById(element.dataset.item);
		    if(item && !item.sheet.rendered) {
		    	item.sheet.render(true);
		    }
		}
		return(false);
	}

	_onResetUsageDieClicked(event) {
		let element = event.currentTarget;

		event.preventDefault();
		if(element.dataset.item) {
			resetItemUsageDie(element.dataset.item);
		} else {
			console.error("Reset of item usage die requested but requesting element has no item attribute.");
		}
		return(false);
	}

	_onRollStressDieClicked(event) {
		let element = event.currentTarget;

		event.preventDefault();
		if(element.dataset.actor) {
			let actor = getActorById(element.dataset.actor);

			if(actor) {
				logStressDieRoll(actor, event.shiftKey, event.ctrlKey)
			} else {
				console.error(`Unable to find an actor with the id '${element.dataset.actor}'.`);
			}
		} else {
			console.error("Roll of the stress die requested but requesting element has no actor id.");
		}

		return(false);
	}

	_onTabLabelClicked(event) {
		let element   = event.currentTarget;
		event.preventDefault();
		if(element.dataset.tab !== undefined && element.dataset.actor !== undefined) {
			let actor     = null;
			let container = Array.from(document.querySelectorAll(".ldoa-character-sheet")).filter((e) => e.dataset.id === element.dataset.actor);
	
	        if(container.length === 1) {			
				let data      = {system: {tabSelected: element.dataset.tab}};

                container = container[0];
				if(!container) {
					throw("Failed to locate the character sheet container element.");
				}

		        actor = getActorById(element.dataset.actor);
		        if(!actor) {
		        	throw(`Failed to locate an actor with an id of ${container.data.id}.`);
		        }

		        data.id = actor.id;
				actor.update(data, {diff: true});
				this.selectTabLabel(element.dataset.tab, actor);
				this.showTabBody(element.dataset.tab, actor);
			} else {
				return(false);
			}
		}
		return(false);
	}

	_onTakeRestClicked(event) {
		let element = event.currentTarget;

        if(element.dataset.actor) {
		    if(element.dataset.type) {
		    	let actor = getActorById(element.dataset.actor);

		    	if(actor) {
		    		if(element.dataset.type === "long") {
		    			takeLongRest(actor);
		    		} else if(element.dataset.type === "short") {
		    			takeShortRest(actor);
		    		} else {
		    			console.error(`Unrecognised type '${element.dataset.type}' specified for rest.`);
		    		}
		    	} else {
		    		console.error(`Unable to locate an actor with the id ${element.dataset.actor}.`);
		    	}
		    } else {
		    	console.error("Rest requested but requesting element has no rest type data attribute.");
		    }
        } else {
        	console.error("Rest requested but requesting element has no actor data attribute.");
        }
	}

	_onUsageDieRollClicked(event) {
		return(handleRollUsageDieEvent(event));
	}

	_onWeaponRollClicked(event) {
		return(handleWeaponRollEvent(event));
	}

    _prepareCharacterData(context) {
        context.configuration                = CONFIG.configuration;
        context.configuration.classicOrigins = foundry.utils.mergeObject({}, CLASSIC_ORIGINS);
        context.configuration.customOrigins  = this._getCustomOrigins();
        calculateCharacterData(context, CONFIG.configuration);

        context.backgrounds = getCharacterBackgrounds(this.object);
        context.consumables = context.items.filter((item) => item.type === "consumable");
        context.demons      = context.items.filter((item) => item.type === "demon");
        context.equipment   = context.items.filter((item) => item.type === "equipment");
        context.boons       = context.items.filter((item) => item.type === "boon");
        context.spells      = context.items.filter((item) => item.type === "spell");
        context.spirits     = context.items.filter((item) => item.type === "spirit");
        context.weapons     = context.items.filter((item) => item.type === "weapon");
        context.hasDemons   = (context.demons.length > 0);
        context.hasSpells   = (context.spells.length > 0);
        context.hasSpirits  = (context.spirits.length > 0);
    }

	selectTabLabel(tabName, actor) {
		let rootElement = Array.from(document.querySelectorAll(".ldoa-character-sheet")).filter((e) => e.dataset.id === actor._id);

		if(rootElement.length === 1) {
			let tabLabels = rootElement[0].getElementsByClassName("ldoa-tab-label");
			for(let i = 0; i < tabLabels.length; i++) {
				if(tabLabels[i].dataset.tab === tabName) {
					tabLabels[i].classList.add("ldoa-tab-selected");
				} else {
					tabLabels[i].classList.remove("ldoa-tab-selected");
				}
			}
		} else {
			console.error(`Failed to locate the character sheet for actor id '${actor._id}'.`);
		}
	}

	showTabBody(tabName, actor) {
		let rootElement = Array.from(document.querySelectorAll(".ldoa-character-sheet")).filter((e) => e.dataset.id === actor._id);

		if(rootElement.length === 1) {
			let tabBodies = rootElement[0].getElementsByClassName("ldoa-tab-body");

			for(let i = 0; i < tabBodies.length; i++) {
				tabBodies[i].classList.add("ldoa-tab-hidden");
			}
			rootElement[0].getElementsByClassName(`ldoa-${tabName}-tab`)[0].classList.remove("ldoa-tab-hidden");
		} else {
			console.error(`Failed to locate the character sheet for actor id '${actor._id}'.`);
		}
	}
}
