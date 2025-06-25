import {ldoaConfiguration} from './configuration.js';
import AttributeTestDialog from './attribute_test_dialog.js';
import {logAttackRoll, logAttributeTest, logDieRoll, logItemUsageDieRoll} from './chat_messages.js';

/**
 * Retrieves an actor from the game list of actors based on it's unique
 * identifier.
 */
export function getActorById(actorId) {
    return(game.actors.find((a) => a.id === actorId));
}

/**
 * Fetches an unowned item by it's id. Returns undefined if the item cannot
 * not found.
 */
export function getItemById(itemId) {
    return(game.items.find((a) => a.id === itemId));
}

/**
 * Fetches the owned item by it's identifier. Returns undefined if the item
 * cannot be found.
 */
export function getOwnedItemById(itemId) {
    let item = undefined;

    game.actors.find((actor) => {
        item = actor.items.find((item) => item.id === itemId);
        return(item ? true : false);
    });
    return(item);
}

/**
 * Deletes an item owned by a system actor based on the item id.
 */
export function deleteOwnedItem(itemId) {
    let item = getOwnedItemById(itemId);

    if(item && item.actor) {
        item.actor.deleteEmbeddedDocuments("Item", [itemId]);
    } else {
        console.error(`Delete of item id ${itemId} requested but unable to locate the actual item or it's owner.`);
        ui.notifications.error(game.i18n.localize("ldoa.errors.items.owned.notFound"));
    }
}

/**
 * Calculates a set of dynamic data values related to a character.
 */
export function calculateCharacterData(context, configuration) {
    const originalContext = context; // Keep reference to full context with items
    
    if(context.actor) {
        context = context.actor.system;
    } else {
        context = context.system;
    }

    context.level            = calculateLevel(context, configuration);
    context.calculated       = calculateAttributeValues(context, configuration, originalContext.items);
    context.maximumHitPoints = calculateMaximumHitPoints(context, context.level);
}

/**
 * This function calculates the final values for the characters attribute
 * values.
 */
export function calculateAttributeValues(data, configuration, items = null) {
    // Start with beginning (base rolled) values
    let calculated      = {constitution: data.beginning?.constitution || 10,
                           charisma:     data.beginning?.charisma || 10,
                           dexterity:    data.beginning?.dexterity || 10,
                           intelligence: data.beginning?.intelligence || 10,
                           wisdom:       data.beginning?.wisdom || 10,
                           strength:     data.beginning?.strength || 10};
    
    console.log("🧮 ATTRIBUTE CALCULATION BREAKDOWN:");
    console.log("📊 Starting with beginning values:", calculated);
    let backgroundNames = [data.backgrounds?.first || "",
                           data.backgrounds?.second || "",
                           data.backgrounds?.third || ""].map((name) => {
                               if(name && typeof name === "string" && name.includes("#")) {
                                   let parts = name.split("#");
                                   return(parts[parts.length - 1]);
                               } else {
                                   return(name || "");
                               }
                           });

    let backgrounds     = [];

    backgroundNames.forEach((name) => backgrounds.push(configuration.backgroundList[name]));

    backgrounds.forEach((e) => {
        if(e && e.attributes) {
            console.log("📚 Adding background bonuses:", e.attributes);
            for(let attribute in e.attributes) {
                calculated[attribute] += e.attributes[attribute];
            }
        }
    });
    console.log("📊 After backgrounds:", calculated);

    Object.keys(data.stories).forEach((key) => {
        let story = data.stories[key];

        if(story.improvements && story.improvements.attributes && story.improvements.attributes.granted) {
            let attribute = story.improvements.attributes.first.choice;

            if(attribute in calculated) {
                calculated[attribute] += 1;
            }

            if(story.improvements.attributes.second) {
                attribute = story.improvements.attributes.second.choice;
                if(attribute in calculated) {
                    calculated[attribute] += 1;
                }
            }
        }
    });
    console.log("📊 After stories:", calculated);

    // Add creation bonuses and in-game bonuses
    console.log("🎯 BONUS APPLICATION:");
    console.log("🔧 Available creationBonus:", data.creationBonus);
    console.log("🔧 Available inGameBonus:", data.inGameBonus);
    
    if (data.creationBonus) {
        Object.keys(calculated).forEach((key) => {
            if (data.creationBonus[key]) {
                console.log(`🎯 Adding creation bonus to ${key}: ${calculated[key]} + ${data.creationBonus[key]} = ${calculated[key] + data.creationBonus[key]}`);
                calculated[key] += data.creationBonus[key];
            }
        });
    }
    console.log("📊 After creation bonuses:", calculated);
    
    if (data.inGameBonus) {
        Object.keys(calculated).forEach((key) => {
            if (data.inGameBonus[key]) {
                console.log(`🎯 Adding in-game bonus to ${key}: ${calculated[key]} + ${data.inGameBonus[key]} = ${calculated[key] + data.inGameBonus[key]}`);
                calculated[key] += data.inGameBonus[key];
            }
        });
    }
    console.log("📊 After in-game bonuses:", calculated);
    
    // Add boon bonuses
    console.log("🔧 Available items for boon processing:", items?.length || 0);
    if (items) {
        const boons = items.filter(item => item.type === "boon");
        console.log("🔧 Found boons:", boons.length);
        boons.forEach(boon => {
            console.log(`🎯 Processing boon "${boon.name}":`, boon.system?.effects?.attributes);
            if (boon.system && boon.system.effects && boon.system.effects.attributes) {
                Object.keys(calculated).forEach(attribute => {
                    if (boon.system.effects.attributes[attribute]) {
                        console.log(`🎯 Adding boon bonus to ${attribute}: ${calculated[attribute]} + ${boon.system.effects.attributes[attribute]} = ${calculated[attribute] + boon.system.effects.attributes[attribute]}`);
                        calculated[attribute] += boon.system.effects.attributes[attribute];
                    }
                });
            }
        });
    }
    
    console.log("📊 After boon bonuses:", calculated);
    
    // Final summary showing the complete formula
    console.log("🎯 FINAL CALCULATION SUMMARY:");
    Object.keys(calculated).forEach((key) => {
        const beginning = data.beginning?.[key] || 10;
        const creation = data.creationBonus?.[key] || 0;
        const inGame = data.inGameBonus?.[key] || 0;
        
        // Calculate boon total for this attribute
        let boonTotal = 0;
        if (data.items) {
            const boons = data.items.filter(item => item.type === "boon");
            boons.forEach(boon => {
                if (boon.system?.effects?.attributes?.[key]) {
                    boonTotal += boon.system.effects.attributes[key];
                }
            });
        }
        
        console.log(`📊 ${key}: ${beginning} (beginning) + ${creation} (creation) + ${inGame} (inGame) + ${boonTotal} (boons) = ${calculated[key]} (final)`);
    });

    Object.keys(calculated).forEach((key) => {
        if(calculated[key] > 18) {
            calculated[key] = 18;
        }
    });

    return(calculated);
}

/**
 * Calculates a characters maximum hit points based on their constitution value
 * and level.
 */
export function calculateMaximumHitPoints(context, level) {
    let total = context.calculated.constitution;

    total += (level - 1);

    // Add boon hitPoints bonuses
    if (context.items) {
        const boons = context.items.filter(item => item.type === "boon");
        boons.forEach(boon => {
            if (boon.system && boon.system.effects && boon.system.effects.hitPoints) {
                total += boon.system.effects.hitPoints;
            }
        });
    }

    return(total);
}

/**
 * Calculates a characters level based on the number of stories they have
 * recorded against them.
 */
export function calculateLevel(data, configuration) {
    let totalStories = 0;
    let stories      = data.stories;

    Object.keys(stories).sort().forEach((index) => {
        if(stories[index].title && typeof stories[index].title === "string" && stories[index].title.trim() !== "") {
            totalStories++;
        }
    });

    return(totalStories + 1);
}

/**
 * A convenience function for moving a die down along the usage die path.
 */
export function downgradeDie(die) {
    let newDie = null;

    switch(die) {
        case "d4":
            newDie = "exhausted";
            break;
        case "d6":
            newDie = "d4";
            break;
        case "d8":
            newDie = "d6";
            break;
        case "d10":
            newDie = "d8";
            break;
        case "d12":
            newDie = "d10";
            break;
        case "d20":
            newDie = "d12";
            break;
    }
    return(newDie);
}

/**
 * Generates a string containing the formula for a single die based on the set
 * of options passed in. Recognised options include dieType, which defaults to
 * d20 if not set, and kind which should be one of 'standard', 'advantage' or
 * 'disadvantage' to generate a formula of the appropriate type ('standard' will
 * be assumed if kind if not explicitly set).
 */
export function generateDieRollFormula(options={}) {
    let formula = null;
    let dieType = (options.dieType ? options.dieType : "d20");
    let kind    = (options.kind ? options.kind : "standard");

    switch(dieType) {
        case "one":
            formula = "1";
            break;
        case "d4":
        case "d6":
        case "d8":
        case "d10":
        case "d12":
        case "d20":
            formula = `${dieType}`;
            break;
    }

    if(kind === "advantage") {
        if(formula !== "1") {
          formula = `2${formula}kl`;
        } else {
          formula = "2";
        }
    } else if(kind === "disadvantage") {
        if(formula !== "1") {
          formula = `2${formula}kh`;
        }
    } else {
        if(formula !== "1") {
          formula = `1${formula}`;
        }
    }

    return(formula);
}

/**
 * Generates a string containing a formula for a damage dice roll. Recognised
 * options include critical (accepts a true or false settings to indicate
 * whether the damage roll is for a critical hit or not) and stressed (which
 * indicates whether the character is currently stressed).
 */
export function generateDamageRollFormula(actor, weapon, options={}) {
    let formula = null;
    let dieType = null;

    if(weapon.system.type !== "unarmed") {
        dieType = actor.system.damageDice.armed;
    } else {
        dieType = actor.system.damageDice.unarmed;
    }

    formula = (options.stressed ? `2${dieType}kl` : `1${dieType}`);
    if(weapon.system.hands > 1) {
        if(options.stressed) {
            formula = `1${dieType}`;
        } else {
            formula = `2${dieType}kh`;
        }
    }

    if(options.critical) {
        formula = `${formula}+${dieType.replace("d", "")}`;
    }

    return(formula);
}

/**
 * This function provides functionality for rolling attribute tests including
 * with advantage/disadvantage (via the use of the shift or ctrl keys). This
 * function is expecting to be attached to a die icon that has attributes
 * that allow it to do it's work.
 */
export async function handleRollAttributeDieEvent(event) {
    let element = event.currentTarget;

    event.preventDefault();
    if(element.dataset.actor) {
        let actor = getActorById(element.dataset.actor);

        if(actor) {
            if(event.altKey) {
                let attribute = element.dataset.attribute;
                let rollType = "standard";
                let title     = game.i18n.localize(`ldoa.rolls.tests.${attribute}.title`);

                if(event.shiftKey) {
                    rollType = "advantage";
                } else if(event.ctrlKey) {
                    rollType = "disadvantage";
                }

                showAttributeRollModal(actor, attribute, title, {rollType: rollType});
            } else {
                logAttributeTest(actor, element.dataset.attribute, event.shiftKey, event.ctrlKey);
            }
        } else {
            console.error(`Unable to locate an actor with the id ${element.dataset.actor} for attribute die roll.`);
            ui.notifications.error(game.i18n.localize("ldoa.errors.actors.notFound"));
        }
    } else {
        console.error("Attribute die roll requested but requesting element has no actor id value.");
        ui.notifications.error(game.i18n.localize("ldoa.errors.attributes.missing"));
    }
    return(false);
}

/**
 * This function provides functionality for rolling a single die including
 * with advantage/disadvantage (via the use of the shift or ctrl keys). This
 * function is expecting to be attached to a die icon that has attributes
 * that allow it to do it's work.
 */
export async function handleRollDieEvent(event) {
    let element = event.currentTarget;
    let actor   = game.actors.find((a) => a.id === element.dataset.id);
    let title   = game.i18n.localize(`ldoa.fields.titles.dieRolls.${element.dataset.type}`)

    event.preventDefault();
    logDieRoll(actor, element.dataset.die, title, event.shiftKey, event.ctrlKey);
    return(false);
}

export async function handleRollUsageDieEvent(event) {
    let element = event.currentTarget;

    if(element.dataset.actor) {
        return(handleActorUsageDieRollEvent(event));
    } else if(element.dataset.item) {
        return(handleItemUsageDieRollEvent(event));
    } else {
        console.error("Roll usage die event occurred by source element does not have an actor or item reference id.");
        ui.notifications.error(game.i18n.localize("ldoa.errors.attributes.missing"));
    }
}

function handleActorUsageDieRollEvent(event) {
    let element = event.currentTarget;
    let actor   = game.actors.find((a) => a.id === element.dataset.actor);

    event.preventDefault();
    if(actor) {
        if(element.dataset.die) {
            let usageDie = getObjectField(element.dataset.die, actor.system);

            if(usageDie) {
                if(usageDie !== "exhausted") {
                    let message = "";

                    rollEm(new Roll(`1${usageDie}`)).then(async (roll) => {
                        await roll.toMessage({speaker: ChatMessage.getSpeaker(), user: game.user.id});
                        if(roll.total < 3) {
                            let newDie = downgradeDie(usageDie);
                            let data   = setObjectField(element.dataset.die, newDie);

                            actor.update(data, {diff: true});
                            if(newDie !== "exhausted") {
                                message  = interpolate(game.i18n.localize("ldoa.messages.usageDie.downgraded"), {die: newDie});
                            } else {
                                message = game.i18n.localize("ldoa.messages.usageDie.exhausted");
                            }
                        } else {
                            message = game.i18n.localize("ldoa.messages.usageDie.unchanged");
                        }
                        ChatMessage.create({content: message,
                                            speaker: ChatMessage.getSpeaker(),
                                            user:    game.user.id});
                    });
                } else {
                    console.warn(`Unable to roll usage die for actor id ${actor.id} as the particular usage die request is exhausted.`);
                    ui.notifications.error(game.i18n.localize("ldoa.errors.usageDie.exhausted"));
                }
            } else {
                console.error(`Unable to locate the ${element.dataset.die} usage die setting for actor id ${actor.id}.`);
                ui.notifications.error(game.i18n.localize("ldoa.errors.attributes.invalid"));
            }
        } else {
            console.error("Usage die roll requested but requesting element has no die path attribute.");
            ui.notifications.error(game.i18n.localize("ldoa.errors.attributes.missing"));
        }
    } else {
        console.error(`Unable to locate an actor with the id ${element.dataset.actor}.`);
        ui.notifications.error(game.i18n.localize("ldoa.errors.actors.notFound"));
    }
    return(false);
}

async function handleItemUsageDieRollEvent(event) {
    let element = event.currentTarget;
    let item    = getOwnedItemById(element.dataset.item);

    event.preventDefault();
    if(item) {
        if(element.dataset.die) {
            logItemUsageDieRoll(item, element.dataset.die, event.shiftKey, event.ctrlKey);
        } else {
            console.error("Usage die roll requested but requesting element has no die path attribute.");
            ui.notifications.error(game.i18n.localize("ldoa.errors.attributes.missing"));
        }
    } else {
        console.error(`Unable to locate an item with the id ${element.dataset.item}.`);
        ui.notifications.error(game.i18n.localize("ldoa.errors.items.notFound"));
    }
    return(false);
}

export async function handleWeaponRollEvent(event) {
    let element = event.currentTarget;

    event.preventDefault();
    logAttackRoll
    if(element.dataset.item) {
        let weapon = getOwnedItemById(element.dataset.item);

        if(weapon) {
            if(weapon.actor) {
                logAttackRoll(weapon.actor.id, weapon.id, event.shiftKey, event.ctrlKey);
            } else {
                console.error(`Unable to make a weapon attack roll for weapon id '${weapon.id}' as it is not an owned item.`);
                ui.notifications.error(game.i18n.localize("ldoa.errors.weapons.unowned"));
            }

        } else {
            console.error(`Unable to locate a weapon with an id of '${element.dataset.item}'.`);
            ui.notifications.error(game.i18n.localize("ldoa.errors.weapons.notFound"));
        }
    } else {
        console.error("Weapon attack roll requested but requesting element does not have an item id attribute.");
        ui.notifications.error(game.i18n.localize("ldoa.errors.attributes.missing"));
    }
    return(false);
}

/**
 * This function resets the usage die for an item that has one.
 */
export async function resetItemUsageDie(itemId) {
    let item = getOwnedItemById(itemId);

    if(item) {
        if(item.system.quantity > 0) {
            let data = {system: {usageDie: {current: item.system.usageDie.maximum}}};
            item.update(data, {diff: true});
        } else {
            console.warn(`Unable to reset the usage die for owned item id '${itemId}' as it has a quantity of zero.`);
        }
    } else {
        console.error(`Unable to locate an owned item with the id '${itemId}'.`);
        ui.notifications.error(game.i18n.localize("ldoa.errors.items.notFound"));
    }
}

/**
 * Reduces the quantity setting on an item that has one. Won't take an item
 * quantity below zero.
 */
export async function decrementItemQuantity(itemId) {
    let item = getOwnedItemById(itemId);

    if(item) {
        if(item.system.quantity > 0) {
            let data = setObjectField("system.quantity", item.system.quantity - 1);
            item.update(data, {diff: true});
        } else {
            console.error(`Unable to reduce the quantity for owned item id '${itemId}'.`);
            ui.notifications.error(game.i18n.localize("ldoa.errors.items.owned.unavailable"));
        }
    } else {
        console.error(`Unable to locate an owned item with the id '${itemId}'.`);
        ui.notifications.error(game.i18n.localize("ldoa.errors.items.owned.notFound"));
    }
}

/**
 * Increases the quantity setting on an item that has one.
 */
export async function incrementItemQuantity(itemId) {
    let item = getOwnedItemById(itemId);

    if(item) {
        let data = setObjectField("system.quantity", item.system.quantity + 1);
        item.update(data, {diff: true});
    } else {
        console.error(`Unable to locate an owned item with the id '${itemId}'.`);
        ui.notifications.error(game.i18n.localize("ldoa.errors.items.owned.notFound"));
    }
}

/**
 * A function that combines localization of a message with interpolation of
 * context specific details. The localized string can have place holders within
 * it's content that consist of a name enclosed in a set of '%' characters. The
 * names in the localized string should be all upper case to make them stand out.
 * The function also accepts a context parameter that is expected to be a JS
 * object being used as a hash/dictionary. The values of this object will be
 * the value interpolated into the localized string though the names in the
 * context need not be all upper case.
 */
export function interpolate(key, context={}) {
    let text = game.i18n.localize(key);

    for(let name in context) {
        while(text.includes(`%${name.toUpperCase()}%`)) {
            text = text.replace(`%${name.toUpperCase()}%`, `${context[name]}`);
        }
    }

    return(text);
}

/**
 * Fetch a value from a JS object using a path. A path is a String containing
 * a dot-separated list of field names that must conform to the standard JS
 * attribute naming conventions (e.g. "one.two.three"). The field will be
 * sought starting with the object passed in. If the field specified or any
 * of it's predecessors do not exist this function returns null.
 */
export function getObjectField(path, object) {
    let value = null;

    if(object) {
        let currentObject = object;
        let steps         = path.split(".");

        steps.forEach(function(field) {
            if(currentObject) {
                if(currentObject[field]) {
                    currentObject = currentObject[field];
                } else {
                    currentObject = null;
                }
            }
        });
        value = currentObject;
    }

    return(value);
}

/**
 * Event handler that pops up an information dialog when an info icon on the
 * interface is clicked on.
 */
export function onInfoIconClicked(event) {
    let icon    = event.currentTarget;
    let content = icon.dataset.content.trim();

    if(content === "") {
        content = game.i18n.localize("ldoa.creatures.actions.info.noDescription")
    }
    content = `<div class="ldoa-action-description">${content}<div><br>`;
    Dialog.prompt({callback: () => {},
                   content:  content,
                   label:    game.i18n.localize("ldoa.creatures.actions.info.dismiss"),
                   title:    game.i18n.localize("ldoa.creatures.actions.info.title")});
}

/**
 * A function to encapsulate integration with the Dice So Nice add on module.
 * Takes a Roll instance, evaluates it, shows the dice on screen (if available),
 * and returns a promise that yields the roll once resolved.
 */
export function rollEm(dice) {
    return(dice.evaluate({async: true}).then((roll) => {
        if(game.dice3d) {
            game.dice3d.showForRoll(roll);
        }
        return(roll);
    }));
}

/**
 * This function constructs a JS object or hierarchy of objects built from
 * a path. A path is string containing a dot-separated list of field names
 * that must conform to standard JS attribute naming conventions
 * (e.g "one.two.three"). You can pass an existing object as an optional
 * third parameter but, if you don't, then an object will be created to
 * get the process started. The final field name in the path will be
 * assigned the specified value.
 */
export function setObjectField(path, value, object=null) {
    let rootObject    = (object ? object : {});
    let currentObject = rootObject;
    let steps         = path.split(".");

    for(var i = 0; i < steps.length; i++) {
        if(i !== steps.length - 1) {
            if(!currentObject[steps[i]]) {
                currentObject[steps[i]] = {};
            }
            currentObject = currentObject[steps[i]];
        } else {
            currentObject[steps[i]] = value;
        }
    }

    return(rootObject);
}

/**
 * Converts an input value into a 'key'. The process of conversion involves
 * trimming leading and trailing whitespace, replacing all other spaces with
 * udnerscores and converting all the text to lower case.
 */
export function stringToKey(text) {
    return(`${text}`.trim().replaceAll(/\s+/g, "_").toLowerCase());
}

/**
 * Capitalize and returns an input string.
 */
export function capitalize(text) {
    return(`${text.substring(0, 1).toUpperCase()}${text.substring(1)}`);
}

/**
 * Displays a dialog that allows for manual and finer level control over an
 * attribute test roll.
 */
export async function showAttributeRollModal(actor, attribute, title, options={}) {
    AttributeTestDialog.build(actor, attribute, options).then((dialog) => dialog.render(true));
}