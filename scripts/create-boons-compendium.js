// Script to create boons for the compendium
// Run this in Foundry's console or as a macro

const boonData = [
  {
    name: "Fortress Of The Mind (Balance)",
    type: "boon",
    system: {
      description: "Your mind is protected from mental intrusions and psychic attacks. You gain advantage on rolls to resist mental influence, fear effects, and magical compulsion.",
      power: "balance"
    }
  },
  {
    name: "Meditation (Balance)",
    type: "boon",
    system: {
      description: "Through focused meditation, you can center yourself and regain composure. Once per short rest, you can spend 10 minutes meditating to remove one level of stress.",
      power: "balance"
    }
  },
  {
    name: "Second Wind (Balance)",
    type: "boon",
    system: {
      description: "You can dig deep and find a reserve of strength when you need it most. Once per long rest, you can regain 1d6 hit points as a free action.",
      power: "balance"
    }
  },
  {
    name: "Spirit Alliance (Balance)",
    type: "boon",
    system: {
      description: "You have formed a bond with a benevolent spirit. Once per day, you can call upon this spirit for guidance, gaining advantage on one roll of your choice.",
      power: "balance"
    }
  },
  {
    name: "Survivors Luck (Balance)",
    type: "boon",
    system: {
      description: "Lady Luck smiles upon you in dire situations. When you would take fatal damage, roll a d20. On a 15 or higher, you instead drop to 1 hit point. This can only happen once per week.",
      power: "balance"
    }
  },
  {
    name: "Armor Of Scars (Chaos)",
    type: "boon",
    system: {
      description: "Your many scars have hardened your skin like armor. You gain +1 to your natural armor rating, but your appearance becomes notably scarred and intimidating.",
      power: "chaos"
    }
  },
  {
    name: "Bloodlust (Chaos)",
    type: "boon",
    system: {
      description: "The sight of blood sends you into a frenzy. When you deal damage in combat, you gain +1 to all damage rolls for the rest of the encounter, but you must attack every round if possible.",
      power: "chaos"
    }
  },
  {
    name: "Dark Revelation (Chaos)",
    type: "boon",
    system: {
      description: "You have glimpsed forbidden knowledge that both empowers and haunts you. You gain +2 to Intelligence-based rolls involving dark lore, but suffer disadvantage on social rolls with lawful characters.",
      power: "chaos"
    }
  },
  {
    name: "Dubious Friendships (Chaos)",
    type: "boon",
    system: {
      description: "You have contacts in the criminal underworld. You can call upon these connections for information or minor favors, but they may ask for questionable services in return.",
      power: "chaos"
    }
  },
  {
    name: "Paranoid (Chaos)",
    type: "boon",
    system: {
      description: "Your constant suspicion keeps you alert to danger. You gain +2 to initiative rolls and cannot be surprised, but you suffer -1 to all social rolls due to your distrustful nature.",
      power: "chaos"
    }
  },
  {
    name: "Battle Hardened (Law)",
    type: "boon",
    system: {
      description: "Years of disciplined combat training have honed your skills. You gain +1 to all attack rolls with weapons you are proficient with.",
      power: "law"
    }
  },
  {
    name: "ResourceFul (Law)",
    type: "boon",
    system: {
      description: "Your methodical approach to problem-solving serves you well. Once per day, you can declare that you have exactly the right mundane item for the situation (subject to GM approval).",
      power: "law"
    }
  },
  {
    name: "Riddle Of Steel (Law)",
    type: "boon",
    system: {
      description: "You understand the secrets of metalcraft and weaponry. You can repair damaged weapons and armor with basic tools, and your weapons never break from normal use.",
      power: "law"
    }
  },
  {
    name: "Tough As Nails (Law)",
    type: "boon",
    system: {
      description: "Your disciplined lifestyle has made you incredibly resilient. You gain +2 hit points and advantage on rolls to resist disease and poison.",
      power: "law"
    }
  },
  {
    name: "Will To Live (Law)",
    type: "boon",
    system: {
      description: "Your unwavering determination keeps you fighting when others would fall. When making death saves, you succeed on a roll of 8 or higher instead of 10 or higher.",
      power: "law"
    }
  }
];

// Function to create all boons in the compendium
async function createBoonsCompendium() {
  const pack = game.packs.get("lastdays.boons");
  if (!pack) {
    ui.notifications.error("Boons compendium not found!");
    return;
  }

  for (let boon of boonData) {
    try {
      await Item.create(boon, {pack: pack.collection});
      console.log(`Created boon: ${boon.name}`);
    } catch (error) {
      console.error(`Failed to create boon ${boon.name}:`, error);
    }
  }
  
  ui.notifications.info("Boons compendium populated successfully!");
}

// Run the function
createBoonsCompendium();