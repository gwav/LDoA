// Quick test to see if tab JavaScript is working
// Run this in the Foundry console (F12 → Console)

console.log("🧪 Testing Garysv1 Tab System...");

// Check if character sheets are open
const characterSheets = document.querySelectorAll('.garysv1-character-sheet');
console.log(`Found ${characterSheets.length} garysv1 character sheets`);

if (characterSheets.length > 0) {
    const sheet = characterSheets[0];
    
    // Check if tabs exist
    const tabLabels = sheet.querySelectorAll('.garysv1-tab-label');
    const tabPanels = sheet.querySelectorAll('.garysv1-tab-panel');
    
    console.log(`Found ${tabLabels.length} tab labels`);
    console.log(`Found ${tabPanels.length} tab panels`);
    
    // List all tabs
    tabLabels.forEach((tab, index) => {
        console.log(`Tab ${index + 1}: ${tab.dataset.tab} - ${tab.textContent.trim()}`);
    });
    
    // Test clicking the boons tab
    const boonsTab = sheet.querySelector('[data-tab="boons"]');
    if (boonsTab) {
        console.log("🎯 Found boons tab, testing click...");
        boonsTab.click();
        
        // Check if it worked
        setTimeout(() => {
            const activeTab = sheet.querySelector('.garysv1-tab-label.garysv1-tab-active');
            const activePanel = sheet.querySelector('.garysv1-tab-panel.garysv1-tab-active');
            
            console.log(`Active tab: ${activeTab ? activeTab.dataset.tab : 'none'}`);
            console.log(`Active panel: ${activePanel ? activePanel.dataset.tab : 'none'}`);
            
            if (activeTab && activeTab.dataset.tab === 'boons') {
                console.log("✅ Boons tab is working!");
            } else {
                console.log("❌ Boons tab click failed");
            }
        }, 100);
    } else {
        console.log("❌ Could not find boons tab");
    }
} else {
    console.log("❌ No garysv1 character sheets found. Open a character sheet first.");
}