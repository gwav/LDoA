// Enhanced boons with mechanical effects
// First, clear existing boons, then create new ones with bonuses

async function replaceBoonsWithEnhanced() {
  const pack = game.packs.get("lastdays.boons");
  if (!pack) {
    ui.notifications.error("Boons compendium not found!");
    return;
  }

  console.log("🔄 Updating boons with mechanical effects...");

  // Get all current boons and delete them
  const currentBoons = pack.index.contents;
  for (let boon of currentBoons) {
    try {
      await pack.deleteDocument(boon._id);
      console.log(`🗑️ Deleted old boon: ${boon.name}`);  
    } catch (error) {
      console.error(`Failed to delete ${boon.name}:`, error);
    }
  }

  // Create enhanced boons with mechanical effects
  const enhancedBoons = [
    // BALANCE BOONS
    {
      name: "Fortress Of The Mind (Balance)",
      type: "boon",
      system: {
        description: "Your mind is protected from mental intrusions and psychic attacks. You gain advantage on rolls to resist mental influence, fear effects, and magical compulsion. +1 Wisdom.",
        power: "balance",
        effects: {
          attributes: { wisdom: 1 },
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Advantage on mental resistance rolls"
        }
      }
    },
    {
      name: "Meditation (Balance)",
      type: "boon",
      system: {
        description: "Through focused meditation, you can center yourself and regain composure. Once per short rest, you can spend 10 minutes meditating to remove one level of stress. +1 Wisdom.",
        power: "balance",
        effects: {
          attributes: { wisdom: 1 },
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Remove 1 stress level per short rest"
        }
      }
    },
    {
      name: "Second Wind (Balance)",
      type: "boon",
      system: {
        description: "You can dig deep and find a reserve of strength when you need it most. Once per long rest, you can regain 1d6 hit points as a free action. +1 Constitution.",
        power: "balance",
        effects: {
          attributes: { constitution: 1 },
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Regain 1d6 HP once per long rest"
        }
      }
    },
    {
      name: "Spirit Alliance (Balance)",
      type: "boon",
      system: {
        description: "You have formed a bond with a benevolent spirit. Once per day, you can call upon this spirit for guidance, gaining advantage on one roll of your choice. +1 Charisma.",
        power: "balance",
        effects: {
          attributes: { charisma: 1 },
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Advantage on 1 roll per day"
        }
      }
    },
    {
      name: "Survivors Luck (Balance)",
      type: "boon",
      system: {
        description: "Lady Luck smiles upon you in dire situations. When you would take fatal damage, roll a d20. On a 15 or higher, you instead drop to 1 hit point. This can only happen once per week.",
        power: "balance",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Death save on 15+ once per week"
        }
      }
    },

    // CHAOS BOONS
    {
      name: "Armor Of Scars (Chaos)",
      type: "boon",
      system: {
        description: "Your many scars have hardened your skin like armor. You gain +1 to your natural armor rating, but your appearance becomes notably scarred and intimidating. -1 Charisma, +1 Armor Rating.",
        power: "chaos",
        effects: {
          attributes: { charisma: -1 },
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 1,
          special: "Intimidating appearance"
        }
      }
    },
    {
      name: "Bloodlust (Chaos)",
      type: "boon",
      system: {
        description: "The sight of blood sends you into a frenzy. When you deal damage in combat, you gain +1 to all damage rolls for the rest of the encounter, but you must attack every round if possible. +1 Strength.",
        power: "chaos",
        effects: {
          attributes: { strength: 1 },
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 1,
          armorRating: 0,
          special: "Must attack every round when bloodied"
        }
      }
    },
    {
      name: "Dark Revelation (Chaos)",
      type: "boon",
      system: {
        description: "You have glimpsed forbidden knowledge that both empowers and haunts you. You gain +2 to Intelligence-based rolls involving dark lore, but suffer disadvantage on social rolls with lawful characters. +1 Intelligence.",
        power: "chaos",
        effects: {
          attributes: { intelligence: 1 },
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "+2 dark lore, disadvantage with lawful NPCs"
        }
      }
    },
    {
      name: "Dubious Friendships (Chaos)",
      type: "boon",
      system: {
        description: "You have contacts in the criminal underworld. You can call upon these connections for information or minor favors, but they may ask for questionable services in return. +1 Charisma.",
        power: "chaos",
        effects: {
          attributes: { charisma: 1 },
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Criminal underworld contacts"
        }
      }
    },
    {
      name: "Paranoid (Chaos)",
      type: "boon",
      system: {
        description: "Your constant suspicion keeps you alert to danger. You gain +2 to initiative rolls and cannot be surprised, but you suffer -1 to all social rolls due to your distrustful nature. +1 Dexterity.",
        power: "chaos",
        effects: {
          attributes: { dexterity: 1 },
          hitPoints: 0,
          initiative: 2,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Cannot be surprised, -1 to social rolls"
        }
      }
    },

    // LAW BOONS
    {
      name: "Battle Hardened (Law)",
      type: "boon",
      system: {
        description: "Years of disciplined combat training have honed your skills. You gain +1 to all attack rolls with weapons you are proficient with. +1 Strength.",
        power: "law",
        effects: {
          attributes: { strength: 1 },
          hitPoints: 0,
          initiative: 0,
          attackRolls: 1,
          damageRolls: 0,
          armorRating: 0,
          special: "Weapon proficiency bonuses"
        }
      }
    },
    {
      name: "ResourceFul (Law)",
      type: "boon",
      system: {
        description: "Your methodical approach to problem-solving serves you well. Once per day, you can declare that you have exactly the right mundane item for the situation (subject to GM approval). +1 Intelligence.",
        power: "law",
        effects: {
          attributes: { intelligence: 1 },
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Produce needed mundane item 1/day"
        }
      }
    },
    {
      name: "Riddle Of Steel (Law)",
      type: "boon",
      system: {
        description: "You understand the secrets of metalcraft and weaponry. You can repair damaged weapons and armor with basic tools, and your weapons never break from normal use. +1 Intelligence.",
        power: "law",
        effects: {
          attributes: { intelligence: 1 },
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Repair gear, weapons don't break"
        }
      }
    },
    {
      name: "Tough As Nails (Law)",
      type: "boon",
      system: {
        description: "Your disciplined lifestyle has made you incredibly resilient. You gain +2 hit points and advantage on rolls to resist disease and poison. +1 Constitution.",
        power: "law",
        effects: {
          attributes: { constitution: 1 },
          hitPoints: 2,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Advantage vs disease/poison"
        }
      }
    },
    {
      name: "Will To Live (Law)",
      type: "boon",
      system: {
        description: "Your unwavering determination keeps you fighting when others would fall. When making death saves, you succeed on a roll of 8 or higher instead of 10 or higher. +1 Wisdom.",
        power: "law",
        effects: {
          attributes: { wisdom: 1 },
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Death saves succeed on 8+"
        }
      }
    }
  ];

  // Create the enhanced boons
  let created = 0;
  for (let boon of enhancedBoons) {
    try {
      await Item.create(boon, {pack: pack.collection});
      console.log(`✅ Created enhanced boon: ${boon.name}`);
      created++;
    } catch (error) {
      console.error(`❌ Failed to create ${boon.name}:`, error);
    }
  }
  
  ui.notifications.info(`🎯 Created ${created} enhanced boons with mechanical effects!`);
  console.log("🎉 Boon enhancement complete!");
}

replaceBoonsWithEnhanced();