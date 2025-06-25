// Debug script to check attribute values and identify the issue
// Run this in the console after opening a character sheet

console.log("🔍 DEBUG: Checking attribute values...");

// Get the first character actor
const actors = game.actors.filter(a => a.type === "character");
if (actors.length === 0) {
    console.log("❌ No character actors found. Create a character first.");
} else {
    const actor = actors[0];
    console.log("🎭 Checking actor:", actor.name);
    console.log("📊 Actor system data:", actor.system);
    
    // Check attribute values
    console.log("\n📋 ATTRIBUTE VALUES:");
    const attributes = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];
    
    for (const attr of attributes) {
        console.log(`${attr}:`);
        console.log(`  - calculated: ${actor.system.calculated[attr]} (type: ${typeof actor.system.calculated[attr]})`);
        console.log(`  - beginning: ${actor.system.beginning[attr]} (type: ${typeof actor.system.beginning[attr]})`);
        console.log(`  - creationBonus: ${actor.system.creationBonus[attr]} (type: ${typeof actor.system.creationBonus[attr]})`);
        console.log(`  - inGameBonus: ${actor.system.inGameBonus[attr]} (type: ${typeof actor.system.inGameBonus[attr]})`);
    }
    
    // Check if there are any string values that should be numbers
    console.log("\n🔍 CHECKING FOR STRING VALUES:");
    for (const attr of attributes) {
        const calcValue = actor.system.calculated[attr];
        const beginValue = actor.system.beginning[attr];
        
        if (typeof calcValue === 'string') {
            console.log(`⚠️  ${attr}.calculated is a string: "${calcValue}"`);
        }
        if (typeof beginValue === 'string') {
            console.log(`⚠️  ${attr}.beginning is a string: "${beginValue}"`);
        }
        
        // Check if it contains commas
        if (String(calcValue).includes(',')) {
            console.log(`🚨 ${attr}.calculated contains comma: "${calcValue}"`);
        }
        if (String(beginValue).includes(',')) {
            console.log(`🚨 ${attr}.beginning contains comma: "${beginValue}"`);
        }
    }
    
    // Check creation mode
    console.log(`\n🎭 Creation mode: ${actor.system.creationMode}`);
    
    // Try to simulate what might be causing the error
    console.log("\n🧪 TESTING ATTRIBUTE DISPLAY:");
    const testElement = document.createElement('input');
    testElement.type = 'number';
    
    for (const attr of attributes) {
        const value = actor.system.calculated[attr];
        console.log(`Setting ${attr} value: ${value}`);
        try {
            testElement.value = value;
            console.log(`✅ ${attr}: ${value} → input.value = ${testElement.value}`);
        } catch (error) {
            console.log(`❌ ${attr}: ${value} → ERROR: ${error.message}`);
        }
    }
}

// Also check the character sheet template
console.log("\n🔍 CHECKING CHARACTER SHEETS:");
const characterSheets = document.querySelectorAll('.garysv1-character-sheet');
console.log(`Found ${characterSheets.length} character sheets`);

if (characterSheets.length > 0) {
    const sheet = characterSheets[0];
    console.log("📋 Checking input values in sheet:");
    
    const inputs = sheet.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        if (input.name && input.name.includes('calculated')) {
            console.log(`Input ${input.name}: value="${input.value}" (type: ${typeof input.value})`);
            
            if (input.value && input.value.includes(',')) {
                console.log(`🚨 Found comma in input value: "${input.value}"`);
            }
        }
    });
}