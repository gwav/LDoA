// Macro to update existing boon powers from old system to new system
// Run this in Foundry's console or as a macro

async function updateBoonPowers() {
    console.log("🔄 Starting boon power update...");
    
    // Get all actors
    const actors = game.actors.contents;
    let totalUpdated = 0;
    
    for (const actor of actors) {
        if (actor.type === "character") {
            console.log(`🎭 Checking actor: ${actor.name}`);
            
            // Get all boons on this actor
            const boons = actor.items.filter(item => item.type === "boon");
            console.log(`  - Found ${boons.length} boons`);
            
            for (const boon of boons) {
                const oldPower = boon.system.power;
                let newPower = null;
                
                // Map old powers to new powers
                switch (oldPower) {
                    case "balance":
                        newPower = "anyone";
                        break;
                    case "law":
                        newPower = "martial";
                        break;
                    case "chaos":
                        newPower = "arte";
                        break;
                    default:
                        // Already using new system or unknown power
                        continue;
                }
                
                if (newPower) {
                    console.log(`  ✏️ Updating "${boon.name}": ${oldPower} → ${newPower}`);
                    await boon.update({"system.power": newPower});
                    totalUpdated++;
                }
            }
        }
    }
    
    // Also check Items directory for standalone boons
    const worldItems = game.items.contents.filter(item => item.type === "boon");
    console.log(`🌍 Found ${worldItems.length} world boons`);
    
    for (const boon of worldItems) {
        const oldPower = boon.system.power;
        let newPower = null;
        
        switch (oldPower) {
            case "balance":
                newPower = "anyone";
                break;
            case "law":
                newPower = "martial";
                break;
            case "chaos":
                newPower = "arte";
                break;
            default:
                continue;
        }
        
        if (newPower) {
            console.log(`  ✏️ Updating world boon "${boon.name}": ${oldPower} → ${newPower}`);
            await boon.update({"system.power": newPower});
            totalUpdated++;
        }
    }
    
    console.log(`✅ Update complete! Updated ${totalUpdated} boons.`);
    ui.notifications.notify(`Updated ${totalUpdated} boons to new power system!`);
}

// Run the update
updateBoonPowers();