// Debug script to check boons tab setup
// Run this in the Foundry console to diagnose issues

console.log("🔍 Debugging Boons Tab Setup...");

// Check if tab label exists in DOM
const boonTabs = document.querySelectorAll('[data-tab="boons"]');
console.log(`Found ${boonTabs.length} boon tab elements:`, boonTabs);

// Check if translations exist
try {
    const tabLabel = game.i18n.localize("ldoa.tabs.labels.boons");
    console.log(`✅ Tab label translation: "${tabLabel}"`);
} catch (error) {
    console.error("❌ Tab label translation missing:", error);
}

// Check if character sheet is open
const characterSheets = document.querySelectorAll('.ldoa-character-sheet');
console.log(`Found ${characterSheets.length} character sheets open`);

// Check current tab selection for each open character
const actors = game.actors.filter(a => a.type === "character");
actors.forEach(actor => {
    console.log(`Actor "${actor.name}" current tab: ${actor.system.tabSelected}`);
});

// Check if boons tab body template exists
if (boonTabs.length > 0) {
    console.log("✅ Boons tab labels found in DOM");
    
    // Try to click the first boons tab
    const firstBoonTab = boonTabs[0];
    if (firstBoonTab) {
        console.log("🖱️ Attempting to click boons tab...");
        try {
            firstBoonTab.click();
            console.log("✅ Tab click successful");
        } catch (error) {
            console.error("❌ Tab click failed:", error);
        }
    }
} else {
    console.error("❌ No boons tab found in DOM - check if character sheet is rendered properly");
}

// Check if boons tab body exists
const boonTabBodies = document.querySelectorAll('[data-tab="boons"].ldoa-tab-body');
console.log(`Found ${boonTabBodies.length} boon tab body elements:`, boonTabBodies);

console.log("🔍 Debug complete. Check console for any errors above.");