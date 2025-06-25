import {CLASSIC_ORIGIN_MAP} from './constants.js';

/**
 * Update character birth options if they are just a reference to a localized
 * text entry.
 */
async function updateCharacterBirthPlaces() {
    game.actors.forEach((actor) => {
        if(actor.type === "character") {
            console.log(`Attempting birthplace migration for '${actor.name}' (id: ${actor.id}).`);
            if(actor.system.birth && typeof actor.system.birth === "string" && actor.system.birth.startsWith("ldoa.births")) {
                actor.update({system: {birth: game.i18n.localize(actor.system.birth)}}, {diff: true});
            }
        }
    });
}

/**
 * This migration upgrades character backgrounds from being a simple string to
 * one based on an origin id and background index.
 */
async function updateClassicCharacterBackgrounds() {
    if(!game.settings.get("lastdays", "customOrigins")) {
    	game.actors.forEach((actor) => {
    		if(actor.type === "character") {
    			// Check if backgrounds exists, if not skip this actor
    			if (!actor.system.backgrounds) {
    				console.log(`Skipping actor ${actor.name} - no backgrounds data`);
    				return;
    			}
    			
    			// Handle corrupted array backgrounds
    			let first = actor.system.backgrounds.first;
    			if (Array.isArray(first)) {
    				first = first.find(val => typeof val === 'string' && val.trim() !== '') || '';
    			}
    			first = `${first}`.trim();
    			
    			let second = actor.system.backgrounds.second;
    			if (Array.isArray(second)) {
    				second = second.find(val => typeof val === 'string' && val.trim() !== '') || '';
    			}
    			second = `${second}`.trim();
    			
    			let third = actor.system.backgrounds.third;
    			if (Array.isArray(third)) {
    				third = third.find(val => typeof val === 'string' && val.trim() !== '') || '';
    			}
    			third = `${third}`.trim();

                console.log(`Attempting classic background migration for '${actor.name}' (id: ${actor.id}).`);
    			if(typeof actor.system.backgrounds?.first === "string" ||
    			   typeof actor.system.backgrounds?.second === "string" ||
    			   typeof actor.system.backgrounds?.third === "string") {
                    let updatable = true;
    				let updates   = {system: {
    					                    backgrounds: {first: first, second: second, third:  third}
    					                }
    					            };

                    Object.values(actor.system.backgrounds || {}).forEach((name) => {
                        // Handle corrupted array data
                        let cleanName = name;
                        if (Array.isArray(name)) {
                            console.warn(`Migration: fixing corrupted background array for ${actor.name}:`, name);
                            cleanName = name.find(val => typeof val === 'string' && val.trim() !== '') || '';
                        }
                        
                        if(cleanName && typeof cleanName === 'string' && cleanName.trim() !== "") {
                            let match = `${cleanName}`.trim().match(/^(barbarian|civilized|decadent)#(.*)/);

                        	if(!match) {
                                let origin = CLASSIC_ORIGIN_MAP[cleanName.trim()];
                                if(!origin) {
                                    console.error(`Unable to migrate the '${cleanName}' background for character id '${actor.id}' (${actor.name}).`);
                                    updatable = false;
                                }
                            }
                        }
                    });

                    if(updatable) {
                        if(first !== "" && typeof actor.system.backgrounds?.first === "string" && CLASSIC_ORIGIN_MAP[first]) {
                            let key = `${CLASSIC_ORIGIN_MAP[first].id}#${CLASSIC_ORIGIN_MAP[first].key}`

                        	console.log(`Migrating '${actor.system.backgrounds?.first}' to`, key);
                        	updates.system.backgrounds.first = key;
                        }

                        if(second !== "" && typeof actor.system.backgrounds?.second === "string" && CLASSIC_ORIGIN_MAP[second]) {
                            let key = `${CLASSIC_ORIGIN_MAP[first].id}#${CLASSIC_ORIGIN_MAP[second].key}`;

                        	console.log(`Migrating '${actor.system.backgrounds?.second}' to`, key);
                        	updates.system.backgrounds.second = key;
                        }

                        if(third !== "" && typeof actor.system.backgrounds?.third === "string" && CLASSIC_ORIGIN_MAP[third]) {
                            let key = `${CLASSIC_ORIGIN_MAP[first].id}#${CLASSIC_ORIGIN_MAP[third].key}`;

                        	console.log(`Migrating '${actor.system.backgrounds?.third}' to`, key);
                        	updates.system.backgrounds.third = key;
                        }

                        actor.update(updates, {diff: true});
                    }
    			}
    		}
    	});
    }
}

/**
 * Update the background for every custom origin to given them unique keys.
 */
async function updateOriginBackgrounds() {
    game.items.forEach((item) => {
        if(item.type === "origin") {
            console.log(`Attempting background key migration for '${item.name}' (id: ${item.id}).`);
            let backgrounds = item.system.backgrounds.map((e) => JSON.parse(e));

            backgrounds.forEach((background) => {
                if(background.key.split("#").length < 2) {
                    console.log(`Updating background key for '${background.name}' from '${background.key}' to '${item.id}#${background.key}'.`);
                    background.key = `${item.id}#${background.key}`;
                }
            });
            backgrounds = backgrounds.map((e) => JSON.stringify(e));
            item.update({system: {backgrounds: backgrounds}}, {diff: true});
        }
    });
}

/**
 * Update characters created under the custom origins option so that they have
 * the correct background keys.
 */
async function updateNewCharacterBackgrounds() {
    if(game.settings.get("lastdays", "customOrigins")) {
        game.actors.forEach((actor) => {
            if(actor.type === "character") {
                let backgrounds = actor.system.backgrounds;
                let key;
                let pattern     = /[^#]+#(.*)/;
                let match;
                let updates     = {system: {backgrounds: Object.assign({}, backgrounds)}}

                console.log(`Attempting new background migration for '${actor.name}' (id: ${actor.id}).`);
                key = (backgrounds.first.key ? backgrounds.first.key : backgrounds.first);
                match = key.match(pattern);
                if(!match) {
                    let newKey = getNewBackgroundKey(key);

                    if(newKey) {
                        console.log(`Updating the '${key}' background key to '${newKey}'.`);
                        updates.system.backgrounds.first = newKey;
                    } else {
                        console.error(`Unable to migrate the '${key}' for actor id '${actor.id}' (${actor.name}).`);
                    }
                }

                key = (backgrounds.second.key ? backgrounds.second.key : backgrounds.second);
                match = key.match(pattern);
                if(!match) {
                    let newKey = getNewBackgroundKey(key);

                    if(newKey) {
                        console.log(`Updating the '${key}' background key to '${newKey}'.`);
                        updates.system.backgrounds.second = newKey;
                    } else {
                        console.error(`Unable to migrate the '${key}' for actor id '${actor.id}' (${actor.name}).`);
                    }
                }

                key = (backgrounds.third.key ? backgrounds.third.key : backgrounds.third);
                match = key.match(pattern);
                if(!match) {
                    let newKey = getNewBackgroundKey(key);

                    if(newKey) {
                        console.log(`Updating the '${key}' background key to '${newKey}'.`);
                        updates.system.backgrounds.third = newKey;
                    } else {
                        console.error(`Unable to migrate the '${key}' for actor id '${actor.id}' (${actor.name}).`);
                    }
                }

                actor.update(updates, {diff: true});
            }
        });
    }
}

function getNewBackgroundKey(oldKey) {
    let newKey;
    let origins = game.items.filter((e) => e.type === "origin");

    for(let i = 0; i < origins.length && !newKey; i++) {
        let backgrounds = origins[i].system.backgrounds.map((e) => JSON.parse(e));
        let background  = backgrounds.find((e) => {
            let match = e.key.match(/[^#]+#(.*)/);

            return(match && match[1] === oldKey);
        });

        if(background) {
            newKey = background.key;
        }
    }
    return(newKey);
}

function runMigrations() {
    console.log("Running migrations...");
    updateOriginBackgrounds();
    updateClassicCharacterBackgrounds();
    updateNewCharacterBackgrounds();
    updateCharacterBirthPlaces();
}

export {runMigrations};
