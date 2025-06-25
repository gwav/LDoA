// Test HP and Armor System
// This script explains how to test the new HP and Armor features

(function testHPArmorSystem() {
  console.log("🎯 HP and Armor System Testing Guide");
  console.log("====================================");
  
  console.log("📋 What's New:");
  console.log("• Hit Points (HP) display under character image in Game Play mode");
  console.log("• Armor dropdown with equipment and boon bonuses");
  console.log("• Automatic HP calculation: Constitution + Level - 1 + Boons");
  console.log("• Armor rating from equipment and boons");
  
  console.log("\n🔧 How to Test:");
  console.log("1. Open a character sheet and switch to 'Game Play' mode");
  console.log("2. Look for HP and Armor fields in the top stats section");
  console.log("3. HP should show: Current HP / Maximum HP");
  console.log("4. Armor dropdown should list available armor from inventory");
  console.log("5. Armor value shows total protection (equipment + boons)");
  
  console.log("\n⚙️ HP Calculation:");
  console.log("• Base: Constitution score + Character Level - 1");
  console.log("• Boons: Any boons with hitPoints bonuses are added");
  console.log("• Example: CON 14, Level 3 = 14 + 3 - 1 = 16 HP");
  
  console.log("\n🛡️ Armor System:");
  console.log("• Equipment armor: Shows in dropdown, select one");
  console.log("• Boon armor: Always active, added to total automatically");
  console.log("• Total displays: Selected equipment + all boon bonuses");
  
  console.log("\n📝 To Add Test Armor:");
  console.log("1. Select a character token");
  console.log("2. Run the 'add-example-armor.js' script");
  console.log("3. Refresh character sheet to see new armor options");
  
  console.log("\n🔄 To Refresh Character Sheet:");
  console.log("• Close and reopen the character sheet");
  console.log("• Or reload Foundry if changes aren't showing");
  
  ui.notifications.info("📖 HP and Armor system testing guide logged to console!");
})();