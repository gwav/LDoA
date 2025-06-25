// Add comprehensive boons list to the compendium
// This script adds all the new boons and replaces any duplicates

(async function addComprehensiveBoons() {
  const pack = game.packs.get("lastdays.boons");
  if (!pack) {
    ui.notifications.error("Boons compendium not found!");
    return;
  }

  console.log("🔄 Adding comprehensive boons list...");

  // Define all the new boons
  const newBoons = [
    {
      name: "Ability Score Increase",
      type: "boon",
      system: {
        description: "You gain +1 to an ability score of your choice. This boon can be taken more than once but cannot bring an ability score above 18.",
        power: "balance",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "+1 to chosen ability score (max 18). Can be taken multiple times."
        }
      }
    },
    {
      name: "Arte Mastery",
      type: "boon",
      system: {
        description: "You are able to ignore a roll of 1 on an arte once per day.",
        power: "balance",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Ignore one Arte roll of 1 per day"
        }
      }
    },
    {
      name: "Attack Bonus",
      type: "boon",
      system: {
        description: "You gain +1 to your attack bonus. This pertains to both melee and range attacks. This boon can be taken more than once. The bonuses stack. Warrior Personas gain a +1 to Attack AND Damage.",
        power: "law",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 1,
          damageRolls: 0,
          armorRating: 0,
          special: "Warriors also get +1 damage. Can be taken multiple times."
        }
      }
    },
    {
      name: "Brawler",
      type: "boon",
      system: {
        description: "Your unarmed attacks do the same damage as your regular attack. This boon is available to Martial backgrounds only.",
        power: "law",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Unarmed attacks use regular damage. Martial backgrounds only."
        }
      }
    },
    {
      name: "Brutal Critical",
      type: "boon",
      system: {
        description: "When you get a critical success on an attack roll, you inflict damage equal to your Strength score (no need to roll the damage).",
        power: "chaos",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Critical hits deal Strength score in damage"
        }
      }
    },
    {
      name: "Critical Precision",
      type: "boon",
      system: {
        description: "When you get a critical success on an attack roll, you inflict damage equal to your Dexterity score (no need to roll the damage).",
        power: "chaos",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Critical hits deal Dexterity score in damage"
        }
      }
    },
    {
      name: "Cleave",
      type: "boon",
      system: {
        description: "If you drop a foe you get an extra attack against another foe. At 5th level you can keep cleaving if foes drop.",
        power: "chaos",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Extra attack when dropping foes. Chain attacks at 5th level."
        }
      }
    },
    {
      name: "Companion",
      type: "boon",
      system: {
        description: "Upon taking this boon, you gain a 1st level Companion. Companion can mean anything from a devoted sidekick, a pet or even a lover. This boon can be taken more than once. Each time it's taken you must decide to either level up your companion or to choose a new 1st level companion.",
        power: "balance",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Gain 1st level companion. Can be taken multiple times."
        }
      }
    },
    {
      name: "Damage Reduction",
      type: "boon",
      system: {
        description: "You reduce the damage you receive by 1 when you're not wearing any armor. This boon can only be taken three times.",
        power: "law",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Reduce damage by 1 when unarmored. Max 3 times."
        }
      }
    },
    {
      name: "Diplomat",
      type: "boon",
      system: {
        description: "You know two additional languages and can make yourself understood by anyone willing to do so. If all you do is talk you can act first at the beginning of any combat Turn.",
        power: "balance",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "+2 languages, act first if only talking in combat"
        }
      }
    },
    {
      name: "Dragon Breath",
      type: "boon",
      system: {
        description: "(Dragonborn Only) Each day you get a ud4 use of Dragon Breath. You breath out a 12' cone of fire that does damage.",
        power: "chaos",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "ud4 uses of 12' fire cone per day. Dragonborn only."
        }
      }
    },
    {
      name: "Fortress of the mind",
      type: "boon",
      system: {
        description: "You have Advantage on your attribute tests when resisting spells.",
        power: "balance",
        effects: {
          attributes: { wisdom: 1 },
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Advantage on spell resistance tests"
        }
      }
    },
    {
      name: "Glamour",
      type: "boon",
      system: {
        description: "(Changeling only) Each day you have ud4 uses of gift Visual Illusion.",
        power: "chaos",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "ud4 uses of Visual Illusion per day. Changeling only."
        }
      }
    },
    {
      name: "Grand Trick",
      type: "boon",
      system: {
        description: "(Trickster only) Upon taking on this boon the GM secretly rolls a ud8. The number gained is the number of times the trickster can come back from the dead.",
        power: "chaos",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "ud8 resurrections (GM rolls secretly). Trickster only."
        }
      }
    },
    {
      name: "Greater Enacting",
      type: "boon",
      system: {
        description: "Have advantage on enacting an Arte you know.",
        power: "balance",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Advantage on Arte enacting rolls"
        }
      }
    },
    {
      name: "New Arte",
      type: "boon",
      system: {
        description: "You gain one Arte that corresponds to your persona.",
        power: "balance",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Gain one Arte matching your persona"
        }
      }
    },
    {
      name: "Halo",
      type: "boon",
      system: {
        description: "(Nephilim Only) The Nephilim can manifest a halo ud4 times a day of either light or darkness about them. A halo of light pacifies all those that look upon it.",
        power: "law",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "ud4 halos of light/darkness per day. Nephilim only."
        }
      }
    },
    {
      name: "Herbalist",
      type: "boon",
      system: {
        description: "You can create d6 doses of healing balm (each one restores d6 + Level HP), hallucinogenic drugs, or poison (d6 damage per dose). You need a long rest close to nature to replenish your stock.",
        power: "balance",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Create d6 doses of healing/drugs/poison per long rest in nature"
        }
      }
    },
    {
      name: "Hidden Compartment",
      type: "boon",
      system: {
        description: "(Manikin Only) The manikin has someplace in their person to hide an item. This could be the empty head filled with straw to a door that opens in the chest. The manikin can store one gear slot in the compartment.",
        power: "law",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Hidden storage for one item. Manikin only."
        }
      }
    },
    {
      name: "Improvised Weapon",
      type: "boon",
      system: {
        description: "Normally an improvised weapon does 1d4 damage. With this boon the weapon does your current damage.",
        power: "chaos",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Improvised weapons use full damage die"
        }
      }
    },
    {
      name: "Improved Critical",
      type: "boon",
      system: {
        description: "In combat, you get a critical success on an unmodified roll of 1 to 3.",
        power: "chaos",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Critical hits on rolls of 1-3"
        }
      }
    },
    {
      name: "Improved Damage",
      type: "boon",
      system: {
        description: "Upgrade your damage die by one die with d12 being the limit.",
        power: "chaos",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Upgrade damage die by one step (max d12)"
        }
      }
    },
    {
      name: "Improved Intuitive",
      type: "boon",
      system: {
        description: "You get Advantage on your Initiative rolls.",
        power: "balance",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Advantage on Initiative rolls"
        }
      }
    },
    {
      name: "Improved Usage Die",
      type: "boon",
      system: {
        description: "This boon brings a usage die up by one die. This cannot include stress dice. You can take this boon more than once. Each time you take it you must choose to either increase the same dice or another one.",
        power: "balance",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Upgrade one usage die by one step. Can be taken multiple times."
        }
      }
    },
    {
      name: "Intimidating Brute",
      type: "boon",
      system: {
        description: "You can use Strength instead of Charisma when trying to intimidate someone.",
        power: "chaos",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Use Strength for intimidation instead of Charisma"
        }
      }
    },
    {
      name: "Kasbah",
      type: "boon",
      system: {
        description: "You have a place that serves as a fortress to the outside world. Where and what is this kasbah is up to you and the GM. It can be a castle, keep, a secret cave, dungeon or if you're a Dream Sovereign a dream fortress in the Dreamlands. The size and amenities of the kasbah depends on the level you are when you take this boon.",
        power: "law",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Gain a fortress/stronghold. Size depends on level."
        }
      }
    },
    {
      name: "Legionnaire Fighting",
      type: "boon",
      system: {
        description: "You are used to fighting in groups. ud6 per session, a Nearby ally can re-roll a failed dodge, parry, or attack roll.",
        power: "law",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "ud6 ally re-rolls per session"
        }
      }
    },
    {
      name: "Meditation",
      type: "boon",
      system: {
        description: "1/day one of your Stress die replenishes after a short rest.",
        power: "balance",
        effects: {
          attributes: { wisdom: 1 },
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Replenish one stress die per day on short rest"
        }
      }
    },
    {
      name: "Mental Stoicism",
      type: "boon",
      system: {
        description: "Once per day if your stress die goes down you can ignore it.",
        power: "balance",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Ignore one stress die reduction per day"
        }
      }
    },
    {
      name: "New Gift",
      type: "boon",
      system: {
        description: "(Mage, Priest, Promethean, Psion, Sandman only) The character gains a new gift.",
        power: "balance",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Gain new gift. Spellcaster classes only."
        }
      }
    },
    {
      name: "Rapid Shot",
      type: "boon",
      system: {
        description: "You are able to shoot off two arrows at once. Each arrow must rolled to see if they hit.",
        power: "chaos",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Fire two arrows at once, roll each separately"
        }
      }
    },
    {
      name: "Resourceful",
      type: "boon",
      system: {
        description: "Replenish a Usage die (except Stress) once per session without needing a rest.",
        power: "law",
        effects: {
          attributes: { intelligence: 1 },
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Replenish one usage die per session without rest"
        }
      }
    },
    {
      name: "Rugged",
      type: "boon",
      system: {
        description: "You gain one extra hit point for every level that you take. Can only be taken once.",
        power: "law",
        effects: {
          attributes: {},
          hitPoints: 1,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "+1 HP per level. Can only be taken once."
        }
      }
    },
    {
      name: "Second Wind",
      type: "boon",
      system: {
        description: "Regain a number of HP equal to your level once per day, even in combat.",
        power: "balance",
        effects: {
          attributes: { constitution: 1 },
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Regain level in HP once per day"
        }
      }
    },
    {
      name: "Sophist",
      type: "boon",
      system: {
        description: "You can make someone believe a blatant lie if you succeed at a CHA test. The effect lasts one hour.",
        power: "chaos",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Make someone believe a lie for 1 hour on CHA test"
        }
      }
    },
    {
      name: "Surgeon",
      type: "boon",
      system: {
        description: "Make an INT test when attending someone with 0 HP. They roll a d4 on the Helpless table instead of a d6 if you succeed.",
        power: "balance",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Help others roll d4 on Helpless table instead of d6"
        }
      }
    },
    {
      name: "Survivor's luck",
      type: "boon",
      system: {
        description: "Once per game session, ignore all damage done by an attack but lose a weapon in the process.",
        power: "balance",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Ignore damage once per session, lose weapon"
        }
      }
    },
    {
      name: "Survivalist",
      type: "boon",
      system: {
        description: "You have advantage on all rolls concerning surviving in the wilderness, knowing how to make basic lodging and gathering food and determining direction. While you can identify plants and mushrooms, you do not know how to create potions with them. That is the foray of an herbalist.",
        power: "balance",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Advantage on wilderness survival rolls"
        }
      }
    },
    {
      name: "Swallow",
      type: "boon",
      system: {
        description: "(Trickster Only) The trickster can swallow any item that fits their mouth and keep the object inside in a suspended animation until regurgitate. This can even include living things that will not remember their time swallowed.",
        power: "chaos",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Swallow and store items/creatures. Trickster only."
        }
      }
    },
    {
      name: "Weapon Finesse",
      type: "boon",
      system: {
        description: "You can use DEX instead of STR when making a melee attack with one-handed bladed weapons.",
        power: "balance",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Use DEX for melee attacks with one-handed blades"
        }
      }
    },
    {
      name: "Weapon Mastery",
      type: "boon",
      system: {
        description: "One of your weapons now inflicts d12 damage but if you get a 1 on its damage roll, it breaks.",
        power: "chaos",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "One weapon does d12 damage, breaks on damage roll of 1"
        }
      }
    },
    {
      name: "Tough as nails",
      type: "boon",
      system: {
        description: "If you survived after rolling on the Helpless table, add your level to the HP you get back.",
        power: "law",
        effects: {
          attributes: { constitution: 1 },
          hitPoints: 2,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Add level to HP recovered from Helpless table"
        }
      }
    },
    {
      name: "Will to live",
      type: "boon",
      system: {
        description: "You get Advantage when you roll on the Helpless table.",
        power: "law",
        effects: {
          attributes: { wisdom: 1 },
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Advantage on Helpless table rolls"
        }
      }
    },
    {
      name: "Wings",
      type: "boon",
      system: {
        description: "(Blooded Only) This boon can only be taken at 6th level. Either the blooded had wings before this boon but couldn't fly or they developed them after taking the boon. Can only fly as fast as your land movement. You can double your movement by taking two movement actions.",
        power: "chaos",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Gain flight at normal movement speed. 6th level+ only. Blooded only."
        }
      }
    },
    {
      name: "Increased Movement",
      type: "boon",
      system: {
        description: "This boon can only be taken once; It increases movement by 10'.",
        power: "balance",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "+10' movement speed. Can only be taken once."
        }
      }
    },
    {
      name: "Token",
      type: "boon",
      system: {
        description: "You gain one Token that is decided on by the GM and player. This boon comes with a drawback of some kind. It could be that you have a token that powerful being wants or it is cursed in some way.",
        power: "chaos",
        effects: {
          attributes: {},
          hitPoints: 0,
          initiative: 0,
          attackRolls: 0,
          damageRolls: 0,
          armorRating: 0,
          special: "Gain a Token with powers and drawbacks (GM decides)"
        }
      }
    }
  ];

  // First, find and remove any existing boons with the same names
  const existingBoons = await pack.getDocuments();
  const namesToReplace = newBoons.map(boon => boon.name.toLowerCase());
  
  for (let existingBoon of existingBoons) {
    if (namesToReplace.includes(existingBoon.name.toLowerCase())) {
      try {
        await pack.deleteDocument(existingBoon.id);
        console.log(`🗑️ Replaced existing boon: ${existingBoon.name}`);
      } catch (error) {
        console.error(`Failed to delete ${existingBoon.name}:`, error);
      }
    }
  }

  // Create all the new boons
  let created = 0;
  for (let boon of newBoons) {
    try {
      await Item.create(boon, {pack: pack.collection});
      console.log(`✅ Created boon: ${boon.name}`);
      created++;
    } catch (error) {
      console.error(`❌ Failed to create ${boon.name}:`, error);
    }
  }
  
  ui.notifications.info(`🎯 Successfully added/updated ${created} comprehensive boons!`);
  console.log("🎉 Comprehensive boons update complete!");
})();