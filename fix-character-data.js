// Script to fix corrupted character attribute data
// Run this in the console if you're experiencing the "150,010,0" error

async function fixCharacterData() {
    console.log("🔧 Fixing character attribute data...");
    
    const characters = game.actors.filter(a => a.type === "character");
    console.log(`Found ${characters.length} characters to check`);
    
    for (const actor of characters) {
        console.log(`\n🎭 Checking ${actor.name}...`);
        
        const attributes = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];
        const updates = {};
        let needsUpdate = false;
        
        for (const attr of attributes) {
            // Check all attribute data types
            const sections = ['calculated', 'beginning', 'creationBonus', 'inGameBonus'];
            
            for (const section of sections) {
                const value = actor.system[section][attr];
                const key = `system.${section}.${attr}`;
                
                // Check if value is a string or contains commas
                if (typeof value === 'string' || String(value).includes(',')) {
                    const cleanValue = parseInt(String(value).replace(/,/g, '')) || (section === 'calculated' || section === 'beginning' ? 10 : 0);
                    updates[key] = cleanValue;
                    needsUpdate = true;
                    console.log(`  🔧 Fixed ${key}: "${value}" → ${cleanValue}`);
                }
                
                // Check for non-numeric values
                if (isNaN(Number(value))) {
                    const defaultValue = (section === 'calculated' || section === 'beginning' ? 10 : 0);
                    updates[key] = defaultValue;
                    needsUpdate = true;
                    console.log(`  🔧 Fixed NaN ${key}: "${value}" → ${defaultValue}`);
                }
                
                // Check for extremely large values (likely corrupted)
                if (Number(value) > 100) {
                    const normalValue = (section === 'calculated' || section === 'beginning' ? 10 : 0);
                    updates[key] = normalValue;
                    needsUpdate = true;
                    console.log(`  🔧 Fixed large ${key}: ${value} → ${normalValue}`);
                }
            }
        }
        
        if (needsUpdate) {
            console.log(`  ✅ Updating ${actor.name} with:`, updates);
            await actor.update(updates);
            console.log(`  ✅ ${actor.name} fixed!`);
        } else {
            console.log(`  ✅ ${actor.name} data is clean`);
        }
    }
    
    console.log("\n🎉 Character data fix complete!");
    console.log("💡 You may need to refresh character sheets to see the changes");
    
    ui.notifications.info("Character data fix complete! Refresh your character sheets.");
}

// Also provide a function to reset a specific character to defaults
async function resetCharacterAttributes(actorId) {
    const actor = game.actors.get(actorId);
    if (!actor) {
        console.error("Actor not found!");
        return;
    }
    
    console.log(`🔄 Resetting ${actor.name} to default attributes...`);
    
    const attributes = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];
    const updates = {};
    
    for (const attr of attributes) {
        updates[`system.calculated.${attr}`] = 10;
        updates[`system.beginning.${attr}`] = 10;
        updates[`system.creationBonus.${attr}`] = 0;
        updates[`system.inGameBonus.${attr}`] = 0;
    }
    
    await actor.update(updates);
    console.log(`✅ ${actor.name} reset to defaults`);
    ui.notifications.info(`${actor.name} attributes reset to defaults`);
}

// Run the fix
fixCharacterData();

// Instructions
console.log("\n📋 AVAILABLE FUNCTIONS:");
console.log("• fixCharacterData() - Fixes all characters");
console.log("• resetCharacterAttributes('actor-id') - Resets specific character");
console.log("• To get actor ID: game.actors.contents[0].id");