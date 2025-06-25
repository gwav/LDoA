// Verify HP Calculation
// This script checks if HP calculation is working correctly

(function verifyHPCalculation() {
  console.log("🩺 HP Calculation Verification");
  console.log("==============================");
  
  const selectedTokens = canvas.tokens.controlled;
  if (selectedTokens.length === 0) {
    ui.notifications.warn("Please select a character token to test HP calculation!");
    return;
  }
  
  const actor = selectedTokens[0].actor;
  if (!actor || actor.type !== "character") {
    ui.notifications.warn("Please select a character token!");
    return;
  }
  
  console.log(`📋 Testing HP calculation for: ${actor.name}`);
  console.log("─".repeat(50));
  
  // Get current values
  const constitution = actor.system.calculated.constitution;
  const level = actor.system.level;
  const currentHP = actor.system.currentHitPoints;
  const maxHP = actor.system.maximumHitPoints;
  
  console.log(`🎯 Constitution: ${constitution}`);
  console.log(`📊 Level: ${level}`);
  console.log(`❤️ Current HP: ${currentHP}`);
  console.log(`💚 Max HP: ${maxHP}`);
  
  // Calculate expected HP manually
  let expectedHP = constitution + level - 1;
  console.log(`🧮 Base calculation: ${constitution} + ${level} - 1 = ${expectedHP}`);
  
  // Check for boon bonuses
  const boons = actor.items.filter(item => item.type === "boon");
  let boonHPBonus = 0;
  
  boons.forEach(boon => {
    if (boon.system && boon.system.effects && boon.system.effects.hitPoints > 0) {
      boonHPBonus += boon.system.effects.hitPoints;
      console.log(`🌟 Boon "${boon.name}": +${boon.system.effects.hitPoints} HP`);
    }
  });
  
  if (boonHPBonus > 0) {
    expectedHP += boonHPBonus;
    console.log(`✨ Total with boons: ${expectedHP - boonHPBonus} + ${boonHPBonus} = ${expectedHP}`);
  }
  
  // Verify calculation
  console.log("\n🔍 Verification:");
  if (maxHP === expectedHP) {
    console.log(`✅ HP calculation is CORRECT! (${maxHP} = ${expectedHP})`);
    ui.notifications.info(`✅ HP calculation verified for ${actor.name}!`);
  } else {
    console.log(`❌ HP calculation is INCORRECT!`);
    console.log(`   Expected: ${expectedHP}, Got: ${maxHP}`);
    ui.notifications.error(`❌ HP calculation error detected!`);
  }
  
  // Test armor too
  console.log("\n🛡️ Armor Verification:");
  const selectedArmor = actor.system.selectedArmor;
  const armorItems = actor.items.filter(item => item.type === "equipment" && item.system.armorValue > 0);
  
  console.log(`🎯 Selected Armor ID: ${selectedArmor || "None"}`);
  
  let totalArmor = 0;
  
  // Add selected equipment armor
  if (selectedArmor) {
    const selectedArmorItem = armorItems.find(item => item._id === selectedArmor);
    if (selectedArmorItem) {
      totalArmor += selectedArmorItem.system.armorValue;
      console.log(`⚔️ Equipment armor: ${selectedArmorItem.name} (+${selectedArmorItem.system.armorValue})`);
    }
  }
  
  // Add boon armor bonuses
  boons.forEach(boon => {
    if (boon.system && boon.system.effects && boon.system.effects.armorRating > 0) {
      totalArmor += boon.system.effects.armorRating;
      console.log(`🌟 Boon armor: ${boon.name} (+${boon.system.effects.armorRating})`);
    }
  });
  
  console.log(`🛡️ Total Armor: ${totalArmor}`);
  
  if (armorItems.length > 0) {
    console.log("\n📦 Available Armor in Inventory:");
    armorItems.forEach(item => {
      console.log(`   • ${item.name}: Armor Value ${item.system.armorValue}`);
    });
  } else {
    console.log("📦 No armor found in inventory");
    console.log("💡 Run 'add-example-armor.js' to add test armor");
  }
  
})();