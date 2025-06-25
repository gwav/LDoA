// Customizable Boons System
// This module handles boons that need player choices when added

export class CustomizableBoons {
    
    static init() {
        // Hook into item creation to catch customizable boons
        Hooks.on("createItem", this._onItemCreate.bind(this));
    }
    
    static async _onItemCreate(item, options, userId) {
        // Only process for the current user and only boons
        if (game.user.id !== userId || item.type !== "boon") return;
        
        // Check if this is a customizable boon
        const customizableId = this._getCustomizableBoonId(item.name);
        if (!customizableId) return;
        
        // Show customization dialog
        await this._showCustomizationDialog(item, customizableId);
    }
    
    static _getCustomizableBoonId(boonName) {
        const customizableBoons = {
            "Ability Score Increase": "abilityScore",
            "Attack Bonus": "attackBonus", // For Warriors who get both attack and damage
            "New Arte": "newArte",
            "New Gift": "newGift"
        };
        
        return customizableBoons[boonName] || null;
    }
    
    static async _showCustomizationDialog(item, customizationId) {
        switch(customizationId) {
            case "abilityScore":
                await this._customizeAbilityScore(item);
                break;
            case "attackBonus":
                await this._customizeAttackBonus(item);
                break;
            case "newArte":
                await this._customizeNewArte(item);
                break;
            case "newGift":
                await this._customizeNewGift(item);
                break;
        }
    }
    
    static async _customizeAbilityScore(item) {
        const abilities = {
            "strength": "Strength",
            "dexterity": "Dexterity", 
            "constitution": "Constitution",
            "intelligence": "Intelligence",
            "wisdom": "Wisdom",
            "charisma": "Charisma"
        };
        
        // Create dialog content
        let dialogContent = `
            <form>
                <div class="form-group">
                    <label>Choose which ability score to increase:</label>
                    <select name="ability" style="width: 100%; margin-top: 5px;">
                        ${Object.entries(abilities).map(([key, label]) => 
                            `<option value="${key}">${label}</option>`
                        ).join('')}
                    </select>
                </div>
            </form>
        `;
        
        const choice = await new Promise((resolve) => {
            new Dialog({
                title: "Ability Score Increase",
                content: dialogContent,
                buttons: {
                    confirm: {
                        icon: '<i class="fas fa-check"></i>',
                        label: "Confirm",
                        callback: (html) => {
                            const ability = html.find('[name="ability"]').val();
                            resolve(ability);
                        }
                    },
                    cancel: {
                        icon: '<i class="fas fa-times"></i>',
                        label: "Cancel",
                        callback: () => resolve(null)
                    }
                },
                default: "confirm"
            }).render(true);
        });
        
        if (choice) {
            // Update the boon with the chosen ability
            const abilityName = abilities[choice];
            const updates = {
                name: `Ability Score Increase (${abilityName})`,
                "system.description": `You gained +1 to your ${abilityName} score. This boon can be taken more than once but cannot bring an ability score above 18.`,
                "system.effects.special": `+1 ${abilityName} (max 18). Can be taken multiple times.`
            };
            
            // Also set the attribute bonus
            updates[`system.effects.attributes.${choice}`] = 1;
            
            await item.update(updates);
            ui.notifications.info(`${abilityName} increased by 1!`);
            
            // Force character sheet to recalculate and re-render
            if (item.parent) {
                await item.parent.sheet.render(false);
            }
        } else {
            // Remove the item if cancelled
            await item.delete();
        }
    }
    
    static async _customizeAttackBonus(item) {
        // Check if the character is a Warrior persona
        const actor = item.parent;
        if (!actor) return;
        
        // Get character's persona/background to check if they're a warrior
        const isWarrior = this._checkIfWarrior(actor);
        
        if (isWarrior) {
            const updates = {
                name: "Attack Bonus (Warrior)",
                "system.description": "You gain +1 to your attack bonus and +1 to damage rolls. This pertains to both melee and range attacks. This boon can be taken more than once. The bonuses stack.",
                "system.effects.attackRolls": 1,
                "system.effects.damageRolls": 1,
                "system.effects.special": "Warrior bonus: +1 attack AND +1 damage. Can be taken multiple times."
            };
            await item.update(updates);
            ui.notifications.info("Warrior Attack Bonus applied: +1 Attack and +1 Damage!");
            
            // Force character sheet to recalculate and re-render
            if (item.parent) {
                await item.parent.sheet.render(false);
            }
        }
        // Non-warriors keep the default version
    }
    
    static async _customizeNewArte(item) {
        const actor = item.parent;
        if (!actor) return;
        
        // Get character's persona to suggest appropriate Artes
        const persona = this._getCharacterPersona(actor);
        
        let dialogContent = `
            <form>
                <div class="form-group">
                    <label>Choose your new Arte:</label>
                    <p><em>Suggested for your ${persona || 'current'} persona:</em></p>
                    <select name="arte" style="width: 100%; margin-top: 5px;">
                        <option value="custom">Custom Arte (specify with GM)</option>
                        <option value="combat">Combat Arte</option>
                        <option value="social">Social Arte</option>
                        <option value="utility">Utility Arte</option>
                        <option value="magical">Magical Arte</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Arte Name (optional):</label>
                    <input type="text" name="arteName" placeholder="Enter custom arte name..." style="width: 100%; margin-top: 5px;">
                </div>
            </form>
        `;
        
        const choice = await new Promise((resolve) => {
            new Dialog({
                title: "New Arte Selection",
                content: dialogContent,
                buttons: {
                    confirm: {
                        icon: '<i class="fas fa-check"></i>',
                        label: "Confirm",
                        callback: (html) => {
                            const arte = html.find('[name="arte"]').val();
                            const arteName = html.find('[name="arteName"]').val();
                            resolve({arte, arteName});
                        }
                    },
                    cancel: {
                        icon: '<i class="fas fa-times"></i>',
                        label: "Cancel",
                        callback: () => resolve(null)
                    }
                },
                default: "confirm"
            }).render(true);
        });
        
        if (choice) {
            let name = "New Arte";
            let description = "You gained one Arte that corresponds to your persona.";
            
            if (choice.arteName) {
                name = `New Arte (${choice.arteName})`;
                description = `You gained the "${choice.arteName}" Arte that corresponds to your persona.`;
            } else if (choice.arte !== "custom") {
                name = `New Arte (${choice.arte.charAt(0).toUpperCase() + choice.arte.slice(1)})`;
                description = `You gained a ${choice.arte} Arte that corresponds to your persona.`;
            }
            
            const updates = {
                name: name,
                "system.description": description,
                "system.effects.special": `Gained ${choice.arteName || choice.arte} Arte matching your persona`
            };
            
            await item.update(updates);
            ui.notifications.info(`${name} added to your character!`);
        } else {
            await item.delete();
        }
    }
    
    static async _customizeNewGift(item) {
        const actor = item.parent;
        if (!actor) return;
        
        // Check if character can have gifts (spellcaster classes)
        const canHaveGifts = this._checkCanHaveGifts(actor);
        
        if (!canHaveGifts) {
            ui.notifications.warn("This boon is only available to Mage, Priest, Promethean, Psion, and Sandman characters.");
            await item.delete();
            return;
        }
        
        let dialogContent = `
            <form>
                <div class="form-group">
                    <label>Choose your new Gift type:</label>
                    <select name="gift" style="width: 100%; margin-top: 5px;">
                        <option value="custom">Custom Gift (specify with GM)</option>
                        <option value="offensive">Offensive Gift</option>
                        <option value="defensive">Defensive Gift</option>
                        <option value="utility">Utility Gift</option>
                        <option value="healing">Healing Gift</option>
                        <option value="divination">Divination Gift</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Gift Name (optional):</label>
                    <input type="text" name="giftName" placeholder="Enter custom gift name..." style="width: 100%; margin-top: 5px;">
                </div>
            </form>
        `;
        
        const choice = await new Promise((resolve) => {
            new Dialog({
                title: "New Gift Selection",
                content: dialogContent,
                buttons: {
                    confirm: {
                        icon: '<i class="fas fa-check"></i>',
                        label: "Confirm",
                        callback: (html) => {
                            const gift = html.find('[name="gift"]').val();
                            const giftName = html.find('[name="giftName"]').val();
                            resolve({gift, giftName});
                        }
                    },
                    cancel: {
                        icon: '<i class="fas fa-times"></i>',
                        label: "Cancel",
                        callback: () => resolve(null)
                    }
                },
                default: "confirm"
            }).render(true);
        });
        
        if (choice) {
            let name = "New Gift";
            let description = "You gained a new gift appropriate to your class.";
            
            if (choice.giftName) {
                name = `New Gift (${choice.giftName})`;
                description = `You gained the "${choice.giftName}" gift.`;
            } else if (choice.gift !== "custom") {
                name = `New Gift (${choice.gift.charAt(0).toUpperCase() + choice.gift.slice(1)})`;
                description = `You gained a ${choice.gift} gift appropriate to your class.`;
            }
            
            const updates = {
                name: name,
                "system.description": description,
                "system.effects.special": `Gained ${choice.giftName || choice.gift} gift`
            };
            
            await item.update(updates);
            ui.notifications.info(`${name} added to your character!`);
        } else {
            await item.delete();
        }
    }
    
    static _checkIfWarrior(actor) {
        // Check character's background/persona for warrior indicators
        // This is a simplified check - you may need to adjust based on your system
        const system = actor.system;
        if (!system) return false;
        
        // Check backgrounds for warrior-type backgrounds
        const warriorBackgrounds = ['soldier', 'mercenary', 'guard', 'fighter', 'warrior', 'knight'];
        
        if (system.background && system.background.name) {
            const backgroundName = system.background.name.toLowerCase();
            return warriorBackgrounds.some(warrior => backgroundName.includes(warrior));
        }
        
        return false;
    }
    
    static _getCharacterPersona(actor) {
        // Get character's persona/class - adjust based on your system structure
        const system = actor.system;
        if (system && system.background && system.background.name) {
            return system.background.name;
        }
        return "Unknown";
    }
    
    static _checkCanHaveGifts(actor) {
        // Check if character class can have gifts
        const system = actor.system;
        if (!system || !system.background || !system.background.name) return false;
        
        const spellcasterClasses = ['mage', 'priest', 'promethean', 'psion', 'sandman'];
        const backgroundName = system.background.name.toLowerCase();
        
        return spellcasterClasses.some(cls => backgroundName.includes(cls));
    }
}