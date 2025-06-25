// Enable Customizable Boons System
// This script updates the existing boons to work with the customization system
// Run this after adding the comprehensive boons to enable customization features

(async function enableCustomizableBoons() {
  const pack = game.packs.get("lastdays.boons");
  if (!pack) {
    ui.notifications.error("Boons compendium not found!");
    return;
  }

  console.log("🔄 Enabling customizable boons system...");

  // Get all existing boons
  const existingBoons = await pack.getDocuments();
  
  // Define boons that need to be marked as customizable
  const customizableUpdates = {
    "Ability Score Increase": {
      name: "Ability Score Increase",
      "system.description": "You gain +1 to an ability score of your choice (will prompt when added to character). This boon can be taken more than once but cannot bring an ability score above 18.",
      "system.effects.special": "Interactive: Choose ability score when added. Can be taken multiple times."
    },
    "Attack Bonus": {
      name: "Attack Bonus", 
      "system.description": "You gain +1 to your attack bonus. This pertains to both melee and range attacks. This boon can be taken more than once. The bonuses stack. Warrior Personas automatically gain +1 to Attack AND Damage.",
      "system.effects.special": "Interactive: Warriors get bonus damage. Can be taken multiple times."
    },
    "New Arte": {
      name: "New Arte",
      "system.description": "You gain one Arte that corresponds to your persona (will prompt for selection when added to character).",
      "system.effects.special": "Interactive: Choose Arte type when added."
    },
    "New Gift": {
      name: "New Gift",
      "system.description": "(Mage, Priest, Promethean, Psion, Sandman only) You gain a new gift (will prompt for selection when added to character).",
      "system.effects.special": "Interactive: Choose gift type when added. Spellcaster classes only."
    }
  };

  let updated = 0;
  
  // Update each customizable boon
  for (let boon of existingBoons) {
    const updates = customizableUpdates[boon.name];
    if (updates) {
      try {
        await boon.update(updates);
        console.log(`✅ Made customizable: ${boon.name}`);
        updated++;
      } catch (error) {
        console.error(`❌ Failed to update ${boon.name}:`, error);
      }
    }
  }

  ui.notifications.info(`🎯 Customizable boons system enabled! Updated ${updated} base boons.`);
  console.log("🎉 Customizable boons system ready!");
  console.log("💡 Instructions:");
  console.log("1. Players can now drag the base 'Ability Score Increase' boon to their character");
  console.log("2. A dialog will appear asking which ability score to increase");
  console.log("3. The boon will be automatically renamed and configured with their choice");
  console.log("4. Same applies to Attack Bonus (for Warriors), New Arte, and New Gift boons");
})();