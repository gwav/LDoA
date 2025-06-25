// EMERGENCY FIX for corrupted attribute data
// Run this immediately in the console (F12) to fix the "8010,0" errors

async function emergencyFixCharacterData() {
    console.log("🚨 EMERGENCY FIX: Cleaning corrupted attribute data...");
    
    const characters = game.actors.filter(a => a.type === "character");
    console.log(`Found ${characters.length} characters to fix`);
    
    for (const actor of characters) {
        console.log(`\n🔧 Emergency fixing ${actor.name}...`);
        
        const attributes = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];
        const updates = {};
        let hasCorruption = false;
        
        for (const attr of attributes) {
            const sections = ['calculated', 'beginning', 'creationBonus', 'inGameBonus'];
            
            for (const section of sections) {
                const value = actor.system[section][attr];
                
                // Check for corruption patterns
                if (typeof value === 'string' || String(value).includes(',') || String(value).includes('010')) {
                    hasCorruption = true;
                    
                    // Extract the first meaningful number from corrupted values like "8010,0"
                    let cleanValue;
                    if (String(value).includes('010,')) {
                        // For values like "8010,0", extract the first digit(s) before "010"
                        const match = String(value).match(/^(\d+)010/);
                        cleanValue = match ? parseInt(match[1]) : (section === 'calculated' || section === 'beginning' ? 10 : 0);
                    } else {
                        // For other corrupted values, clean normally
                        cleanValue = parseInt(String(value).replace(/[^0-9]/g, '')) || (section === 'calculated' || section === 'beginning' ? 10 : 0);
                    }
                    
                    // Ensure reasonable bounds
                    if (cleanValue < 3) cleanValue = 3;
                    if (cleanValue > 18) cleanValue = 18;
                    
                    updates[`system.${section}.${attr}`] = cleanValue;
                    console.log(`  🔧 ${section}.${attr}: "${value}" → ${cleanValue}`);
                }
            }
        }
        
        if (hasCorruption) {
            console.log(`  💾 Updating ${actor.name} with:`, updates);
            await actor.update(updates);
            console.log(`  ✅ ${actor.name} EMERGENCY FIXED!`);
        } else {
            console.log(`  ✅ ${actor.name} is clean`);
        }
    }
    
    console.log("\n🎉 EMERGENCY FIX COMPLETE!");
    console.log("💡 Close and reopen any character sheets to see the fixes");
    
    ui.notifications.info("🚨 Emergency fix complete! Close and reopen character sheets.");
}

// Run the emergency fix immediately
emergencyFixCharacterData();

// Also provide a function to reset to completely clean defaults
async function resetToDefaults() {
    const characters = game.actors.filter(a => a.type === "character");
    
    for (const actor of characters) {
        const attributes = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];
        const updates = {};
        
        for (const attr of attributes) {
            updates[`system.calculated.${attr}`] = 10;
            updates[`system.beginning.${attr}`] = 10;
            updates[`system.creationBonus.${attr}`] = 0;
            updates[`system.inGameBonus.${attr}`] = 0;
        }
        
        await actor.update(updates);
        console.log(`✅ ${actor.name} reset to clean defaults`);
    }
    
    ui.notifications.info("All characters reset to default values (10 for all attributes)");
}

console.log("\n📋 AVAILABLE FUNCTIONS:");
console.log("• emergencyFixCharacterData() - Fix corrupted data");
console.log("• resetToDefaults() - Reset all characters to 10 for all attributes");