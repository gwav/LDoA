// Add example armor pieces to test the HP and Armor system
// Run this script to add some armor to the equipment compendium

(async function addExampleArmor() {
  console.log("🛡️ Adding example armor pieces...");

  // Check if we have an equipment compendium
  let pack = game.packs.get("lastdays.equipment");
  if (!pack) {
    // If no equipment compendium exists, we'll add items directly to selected tokens
    console.log("No equipment compendium found, adding armor to selected character...");
    
    const selectedTokens = canvas.tokens.controlled;
    if (selectedTokens.length === 0) {
      ui.notifications.warn("Please select a character token first!");
      return;
    }
    
    const actor = selectedTokens[0].actor;
    if (!actor || actor.type !== "character") {
      ui.notifications.warn("Please select a character token!");
      return;
    }

    // Add armor directly to character
    const armorPieces = [
      {
        name: "Leather Armor",
        type: "equipment",
        system: {
          description: "Light armor made of hardened leather. Provides basic protection without restricting movement.",
          rarity: "common",
          armorValue: 2
        }
      },
      {
        name: "Chain Mail",
        type: "equipment", 
        system: {
          description: "Armor made of interlocking metal rings. Heavier than leather but offers better protection.",
          rarity: "uncommon",
          armorValue: 4
        }
      },
      {
        name: "Plate Armor",
        type: "equipment",
        system: {
          description: "Heavy armor crafted from solid metal plates. Excellent protection but restricts movement.",
          rarity: "rare",
          armorValue: 6
        }
      },
      {
        name: "Padded Cloth",
        type: "equipment",
        system: {
          description: "Simple cloth armor with padding. Light but offers minimal protection.",
          rarity: "common", 
          armorValue: 1
        }
      }
    ];

    let created = 0;
    for (let armor of armorPieces) {
      try {
        await Item.create(armor, {parent: actor});
        console.log(`✅ Added armor to character: ${armor.name}`);
        created++;
      } catch (error) {
        console.error(`❌ Failed to add ${armor.name}:`, error);
      }
    }

    ui.notifications.info(`🛡️ Added ${created} armor pieces to ${actor.name}!`);
    
  } else {
    // Add to compendium
    const armorPieces = [
      {
        name: "Leather Armor",
        type: "equipment",
        system: {
          description: "Light armor made of hardened leather. Provides basic protection without restricting movement.",
          rarity: "common",
          armorValue: 2
        }
      },
      {
        name: "Chain Mail", 
        type: "equipment",
        system: {
          description: "Armor made of interlocking metal rings. Heavier than leather but offers better protection.",
          rarity: "uncommon",
          armorValue: 4
        }
      },
      {
        name: "Plate Armor",
        type: "equipment",
        system: {
          description: "Heavy armor crafted from solid metal plates. Excellent protection but restricts movement.",
          rarity: "rare",
          armorValue: 6
        }
      },
      {
        name: "Padded Cloth",
        type: "equipment",
        system: {
          description: "Simple cloth armor with padding. Light but offers minimal protection.",
          rarity: "common",
          armorValue: 1
        }
      }
    ];

    let created = 0;
    for (let armor of armorPieces) {
      try {
        await Item.create(armor, {pack: pack.collection});
        console.log(`✅ Added to compendium: ${armor.name}`);
        created++;
      } catch (error) {
        console.error(`❌ Failed to add ${armor.name}:`, error);
      }
    }

    ui.notifications.info(`🛡️ Added ${created} armor pieces to equipment compendium!`);
  }
  
  console.log("🎉 Example armor setup complete!");
})();