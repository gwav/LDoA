// Script to create a comprehensive test boon with all effect types
// Run this in the Foundry console (F12 → Console)

async function createComprehensiveTestBoon() {
    console.log("🎯 Creating comprehensive test boon...");
    
    try {
        // Get the boons compendium
        const boonsCompendium = game.packs.get("lastdays.boons");
        if (!boonsCompendium) {
            console.error("❌ Could not find boons compendium!");
            return;
        }

        const testBoon = {
            name: "Champion's Blessing",
            type: "boon",
            img: "icons/magic/holy/angel-wings-holy-blue.webp",
            system: {
                description: "<p><strong>Champion's Blessing</strong> is a powerful boon that enhances all aspects of a character's abilities. This legendary blessing was once bestowed upon the greatest heroes of the realm.</p><p>The blessing manifests as a golden aura around the character, providing supernatural enhancements to their physical and mental capabilities.</p>",
                power: "law",
                effects: {
                    attributes: {
                        strength: 2,
                        dexterity: 1,
                        constitution: 2,
                        intelligence: 1,
                        wisdom: 1,
                        charisma: 2
                    },
                    hitPoints: 5,
                    initiative: 2,
                    attackRolls: 1,
                    damageRolls: 2,
                    armorRating: 1,
                    special: "Advantage on all Charisma-based social interactions, Resistance to fear effects"
                }
            }
        };

        // Create the boon in the compendium
        const createdBoon = await Item.create(testBoon, {pack: boonsCompendium.collection});
        
        console.log("✅ Test boon created successfully!");
        console.log("📋 Boon Details:");
        console.log(`   Name: ${testBoon.name}`);
        console.log(`   Power: ${testBoon.system.power}`);
        console.log("   Effects:");
        console.log(`     - Strength: +${testBoon.system.effects.attributes.strength}`);
        console.log(`     - Dexterity: +${testBoon.system.effects.attributes.dexterity}`);
        console.log(`     - Constitution: +${testBoon.system.effects.attributes.constitution}`);
        console.log(`     - Intelligence: +${testBoon.system.effects.attributes.intelligence}`);
        console.log(`     - Wisdom: +${testBoon.system.effects.attributes.wisdom}`);
        console.log(`     - Charisma: +${testBoon.system.effects.attributes.charisma}`);
        console.log(`     - Hit Points: +${testBoon.system.effects.hitPoints}`);
        console.log(`     - Initiative: +${testBoon.system.effects.initiative}`);
        console.log(`     - Attack Rolls: +${testBoon.system.effects.attackRolls}`);
        console.log(`     - Damage Rolls: +${testBoon.system.effects.damageRolls}`);
        console.log(`     - Armor Rating: +${testBoon.system.effects.armorRating}`);
        console.log(`     - Special: ${testBoon.system.effects.special}`);
        
        ui.notifications.info("✅ Champion's Blessing boon created! Check your Boons compendium.");
        
        // Instructions for testing
        console.log("\n🧪 TESTING INSTRUCTIONS:");
        console.log("1. Open the Boons compendium");
        console.log("2. Find 'Champion's Blessing' boon");
        console.log("3. Right-click it and select 'Edit' to see the effects interface");
        console.log("4. Drag it to a character sheet to see effects applied");
        console.log("5. Check the Boons tab to see the effects displayed");
        
    } catch (error) {
        console.error("❌ Error creating test boon:", error);
        ui.notifications.error("Failed to create test boon. Check console for details.");
    }
}

// Create a simpler test boon too
async function createSimpleTestBoon() {
    console.log("🎯 Creating simple test boon...");
    
    try {
        const boonsCompendium = game.packs.get("lastdays.boons");
        if (!boonsCompendium) {
            console.error("❌ Could not find boons compendium!");
            return;
        }

        const simpleBoon = {
            name: "Warrior's Strength",
            type: "boon",
            img: "icons/skills/melee/sword-shield-stylized-white.webp",
            system: {
                description: "<p>A blessing that enhances physical prowess, perfect for testing the boon effects system.</p>",
                power: "balance",
                effects: {
                    attributes: {
                        strength: 1,
                        dexterity: 0,
                        constitution: 1,
                        intelligence: 0,
                        wisdom: 0,
                        charisma: 0
                    },
                    hitPoints: 2,
                    initiative: 0,
                    attackRolls: 1,
                    damageRolls: 1,
                    armorRating: 0,
                    special: "Intimidation advantage"
                }
            }
        };

        await Item.create(simpleBoon, {pack: boonsCompendium.collection});
        console.log("✅ Simple test boon 'Warrior's Strength' created!");
        
    } catch (error) {
        console.error("❌ Error creating simple test boon:", error);
    }
}

// Run both
createComprehensiveTestBoon();
createSimpleTestBoon();