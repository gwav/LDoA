export const ldoaConfiguration = {};

ldoaConfiguration.armourNames = {
	"none": "ldoa.armour.none",
	"light": "ldoa.armour.light",
	"medium": "ldoa.armour.medium",
	"heavy": "ldoa.armour.heavy"
};

ldoaConfiguration.armourTypes = {
	"none": {
		"name": "ldoa.armour.none",
	    "rating": 0
	},
	"light": {
		"name": "ldoa.armour.light",
	    "rating": 1
	},
	"medium": {
		"name": "ldoa.armour.medium",
	    "rating": 2
	},
	"heavy": {
		"name": "ldoa.armour.heavy",
		"rating": 3
	}
};

ldoaConfiguration.backgroundList = {
	"assassin": {
		"attributes": {
			"dexterity": 1
		},
		"key": "assassin",
		"origin": "decadent",
		"name": "ldoa.backgrounds.assassin.name",
		"unique": true
	},
	"berserker": {
		"attributes": {
			"strength": 1
		},
		"key": "berserker",
		"origin": "barbarian",
		"name": "ldoa.backgrounds.berserker.name",
		"unique": true
	},
	"bodyguard": {
		"attributes": {
			"constitution": 1
		},
		"key": "bodyguard",
		"origin": "civilized",
		"name": "ldoa.backgrounds.bodyguard.name",
		"unique": false
	},
	"bookworm": {
		"attributes": {
			"intelligence": 1
		},
		"key": "bookworm",
		"origin": "civilized",
		"name": "ldoa.backgrounds.bookworm.name",
		"unique": false
	},
	"changeling": {
		"attributes": {
			"charisma": 1
		},
		"key": "changeling",
		"origin": "decadent",
		"name": "ldoa.backgrounds.changeling.name",
		"unique": true
	},
	"chieftain": {
		"attributes": {
			"strength": 1
		},
		"key": "chieftain",
		"origin": "barbarian",
		"name": "ldoa.backgrounds.chieftain.name",
		"unique": false
	},
	"diplomat": {
		"attributes": {
			"charisma": 1
		},
		"key": "diplomat",
		"origin": "civilized",
		"name": "ldoa.backgrounds.diplomat.name",
		"unique": false
	},
	"forbidden_knowledge": {
		"attributes": {
			"intelligence": 1
		},
		"key": "forbidden_knowledge",
		"origin": "decadent",
		"name": "ldoa.backgrounds.forbidden_knowledge.name",
		"unique": false
	},
	"herbalist": {
		"attributes": {
			"intelligence": 1
		},
		"key": "herbalist",
		"origin": "barbarian",
		"name": "ldoa.backgrounds.herbalist.name",
		"unique": false
	},
	"hunter": {
		"attributes": {
			"dexterity": 1
		},
		"key": "hunter",
		"origin": "barbarian",
		"name": "ldoa.backgrounds.hunter.name",
		"unique": false
	},
	"inventor": {
		"attributes": {
			"intelligence": 1
		},
		"key": "inventor",
		"origin": "civilized",
		"name": "ldoa.backgrounds.inventor.name",
		"unique": true
	},
	"legionnaire": {
		"attributes": {
			"strength": 1
		},
		"key": "legionnaire",
		"origin": "civilized",
		"name": "ldoa.backgrounds.legionnaire.name",
		"unique": false
	},
	"pit-fighter": {
		"attributes": {
			"strength": 1
		},
		"key": "pit-fighter",
		"origin": "decadent",
		"name": "ldoa.backgrounds.pit_fighter.name",
		"unique": false
	},
	"raider": {
		"attributes": {
			"strength": 1
		},
		"key": "raider",
		"origin": "barbarian",
		"name": "ldoa.backgrounds.raider.name",
		"unique": false
	},
	"scout": {
		"attributes": {
			"wisdom": 1
		},
		"key": "scout",
		"origin": "barbarian",
		"name": "ldoa.backgrounds.scout.name",
		"unique": false
	},
	"shaman": {
		"attributes": {
			"wisdom": 1
		},
		"key": "shaman",
		"origin": "barbarian",
		"name": "ldoa.backgrounds.shaman.name",
		"unique": false
	},
	"snake_blood": {
		"attributes": {
			"constitution": 1
		},
		"key": "snake_blood",
		"origin": "decadent",
		"name": "ldoa.backgrounds.snake_blood.name",
		"unique": false
	},
	"sophist": {
		"attributes": {
			"charisma": 1
		},
		"key": "sophist",
		"origin": "civilized",
		"name": "ldoa.backgrounds.sophist.name",
		"unique": false
	},
	"storyteller": {
		"attributes": {
			"charisma": 1
		},
		"key": "storyteller",
		"origin": "barbarian",
		"name": "ldoa.backgrounds.storyteller.name",
		"unique": false
	},
	"street_urchin": {
		"attributes": {
			"dexterity": 1
		},
		"key": "street_urchin",
		"origin": "civilized",
		"name": "ldoa.backgrounds.street_urchin.name",
		"unique": false
	},
	"surgeon": {
		"attributes": {
			"intelligence": 1
		},
		"key": "surgeon",
		"origin": "civilized",
		"name": "ldoa.backgrounds.surgeon.name",
		"unique": false
	},
	"survivor": {
		"attributes": {
			"constitution": 1
		},
		"key": "survivor",
		"origin": "barbarian",
		"name": "ldoa.backgrounds.survivor.name",
		"unique": false
	},
	"swordmaster": {
		"attributes": {
			"dexterity": 1
		},
		"key": "swordmaster",
		"origin": "civilized",
		"name": "ldoa.backgrounds.swordmaster.name",
		"unique": false
	},
	"vicious": {
		"attributes": {
			"strength": 1
		},
		"key": "vicious",
		"origin": "decadent",
		"name": "ldoa.backgrounds.vicious.name",
		"unique": false
	},
	"warlock": {
		"attributes": {
			"charisma": 1
		},
		"key": "warlock",
		"origin": "decadent",
		"name": "ldoa.backgrounds.warlock.name",
		"unique": false
	},
	"wildling": {
		"attributes": {
			"constitution": 1
		},
		"key": "wildling",
		"origin": "barbarian",
		"name": "ldoa.backgrounds.wildling.name",
		"unique": false
	}
};

ldoaConfiguration.birthList = {
	barbarian: ["ldoa.births.barbarian.1",
		          "ldoa.births.barbarian.2",
		          "ldoa.births.barbarian.3",
		          "ldoa.births.barbarian.4",
		          "ldoa.births.barbarian.5",
		          "ldoa.births.barbarian.6",
		          "ldoa.births.barbarian.7",
		          "ldoa.births.barbarian.8",
		          "ldoa.births.barbarian.9",
		          "ldoa.births.barbarian.10",
		          "ldoa.births.barbarian.11",
		          "ldoa.births.barbarian.12",
		          "ldoa.births.barbarian.13",
		          "ldoa.births.barbarian.14",
		          "ldoa.births.barbarian.15",
		          "ldoa.births.barbarian.16",
		          "ldoa.births.barbarian.17",
		          "ldoa.births.barbarian.18",
		          "ldoa.births.barbarian.19",
		          "ldoa.births.barbarian.20"],
	civilized: ["ldoa.births.civilized.1",
		          "ldoa.births.civilized.2",
		          "ldoa.births.civilized.3",
		          "ldoa.births.civilized.4",
		          "ldoa.births.civilized.5",
		          "ldoa.births.civilized.6",
		          "ldoa.births.civilized.7",
		          "ldoa.births.civilized.8",
		          "ldoa.births.civilized.9",
		          "ldoa.births.civilized.10",
		          "ldoa.births.civilized.11",
		          "ldoa.births.civilized.12",
		          "ldoa.births.civilized.13",
		          "ldoa.births.civilized.14",
		          "ldoa.births.civilized.15",
		          "ldoa.births.civilized.16",
		          "ldoa.births.civilized.17",
		          "ldoa.births.civilized.18",
		          "ldoa.births.civilized.19",
		          "ldoa.births.civilized.20"],
	decadent:  ["ldoa.births.decadent.1",
		          "ldoa.births.decadent.2",
		          "ldoa.births.decadent.3",
		          "ldoa.births.decadent.4",
		          "ldoa.births.decadent.5",
		          "ldoa.births.decadent.6",
		          "ldoa.births.decadent.7",
		          "ldoa.births.decadent.8",
		          "ldoa.births.decadent.9",
		          "ldoa.births.decadent.10",
		          "ldoa.births.decadent.11",
		          "ldoa.births.decadent.12",
		          "ldoa.births.decadent.13",
		          "ldoa.births.decadent.14",
		          "ldoa.births.decadent.15",
		          "ldoa.births.decadent.16",
		          "ldoa.births.decadent.17",
		          "ldoa.births.decadent.18",
		          "ldoa.births.decadent.19",
		          "ldoa.births.decadent.20"]
};

ldoaConfiguration.classicBirthList = [
  "ldoa.births.1",
  "ldoa.births.2",
  "ldoa.births.3",
  "ldoa.births.4",
  "ldoa.births.5",
  "ldoa.births.6",
  "ldoa.births.7",
  "ldoa.births.8",
  "ldoa.births.9",
  "ldoa.births.10",
  "ldoa.births.11",
  "ldoa.births.12",
  "ldoa.births.13",
  "ldoa.births.14",
  "ldoa.births.15",
  "ldoa.births.16",
  "ldoa.births.17",
  "ldoa.births.18",
  "ldoa.births.19",
  "ldoa.births.20"
];

ldoaConfiguration.diceList = {
	"d4": "ldoa.dice.d4",
	"d6": "ldoa.dice.d6",
	"d8": "ldoa.dice.d8",
	"d10": "ldoa.dice.d10",
	"d12": "ldoa.dice.d12",
	"d20": "ldoa.dice.d20"
};

ldoaConfiguration.boonList = [
  {key: "none",
   name: "ldoa.none"},
	{key:   "fortressOfTheMind",
	 label: "ldoa.boons.fortressOfTheMind.label",
	 name:  "ldoa.boons.fortressOfTheMind.name",
	 power: "balance"},
	{key:   "meditation",
	 label: "ldoa.boons.meditation.label",
	 name:  "ldoa.boons.meditation.name",
	 power: "balance"},
	{key:   "secondWind",
	 label: "ldoa.boons.secondWind.label",
	 name:  "ldoa.boons.secondWind.name",
	 power: "balance"},
	{key:   "spiritAlliance",
	 label: "ldoa.boons.spiritAlliance.label",
	 name:  "ldoa.boons.spiritAlliance.name",
	 power: "balance"},
	{key:   "survivorsLuck",
	 label: "ldoa.boons.survivorsLuck.label",
	 name:  "ldoa.boons.survivorsLuck.name",
	 power: "balance"},
	{key:   "armourOfScars",
	 label: "ldoa.boons.armorOfScars.label",
	 name:  "ldoa.boons.armorOfScars.name",
	 power: "chaos"},
	{key:   "bloodlust",
	 label: "ldoa.boons.bloodlust.label",
	 name:  "ldoa.boons.bloodlust.name",
	 power: "chaos"},
	{key:   "darkRevelation",
	 label: "ldoa.boons.darkRevelation.label",
	 name:  "ldoa.boons.darkRevelation.name",
	 power: "chaos"},
	{key:   "dubiousFriendships",
	 label: "ldoa.boons.dubiousFriendships.label",
	 name:  "ldoa.boons.dubiousFriendships.name",
	 power: "chaos"},
	{key:   "paranoid",
	 label: "ldoa.boons.paranoid.label",
	 name:  "ldoa.boons.paranoid.name",
	 power: "chaos"},
	{key:   "battleHardened",
	 label: "ldoa.boons.battleHardened.label",
	 name:  "ldoa.boons.battleHardened.name",
	 power: "law"},
	{key:   "resourceful",
	 label: "ldoa.boons.resourceful.label",
	 name:  "ldoa.boons.resourceful.name",
	 power: "law"},
	{key:   "riddleOfSteel",
	 label: "ldoa.boons.riddleOfSteel.label",
	 name:  "ldoa.boons.riddleOfSteel.name",
	 power: "law"},
	{key:   "toughAsNails",
	 label: "ldoa.boons.toughAsNails.label",
	 name:  "ldoa.boons.toughAsNails.name",
	 power: "law"},
	{key:   "willToLive",
	 label: "ldoa.boons.willToLive.label",
	 name:  "ldoa.boons.willToLive.name",
	 power: "law"}
];

ldoaConfiguration.itemRarityList = {
	"common": "ldoa.rarities.common",
	"rare": "ldoa.rarities.rare",
	"exotic": "ldoa.rarities.exotic",
	"unique": "ldoa.rarities.unique"
};

ldoaConfiguration.levelSettings = [
  {level: 1, stories: 0},
  {level: 2, stories: 1},
  {level: 3, stories: 3},
  {level: 4, stories: 7},
  {level: 5, stories: 11},
  {level: 6, stories: 16},
  {level: 7, stories: 22},
  {level: 8, stories: 29},
  {level: 9, stories: 37},
  {level: 10, stories: 46},
];

ldoaConfiguration.languageList = {
	"alashan": {
		"origin": "A corrupt empire.",
		"name": "ldoa.languages.alashan"
	},
	"amaric": {
		"origin": "The Caliphate.",
		"name": "ldoa.languages.amaric"
	},
	"askavan": {
		"origin": "A crumbling empire.",
		"name": "ldoa.languages.askavan"
	},
	"chalidim": {
		"origin": "The desert tribes.",
		"name": "ldoa.languages.chaladim"
	},
	"duhuang": {
		"origin": "The Forbidden City & the Eastern Principalities",
		"name": "ldoa.languages.duhuang"
	},
	"jurka": {
		"origin": "The Iron Horde.",
		"name": "ldoa.languages.jurka"
	},
	"naruan": {
		"origin": "The Golden Archipelago.",
		"name": "ldoa.languages.naruan"
	},
	"pictish": {
		"origin": "The Picts.",
		"name": "ldoa.languages.pictish"
	},
	"thyrenian": {
		"origin": "The Merchant League.",
		"name": "ldoa.languages.thyrenian"
	},
	"urgic": {
		"origin": "The northern raiders.",
		"name": "ldoa.languages.urgic"
	}
};

ldoaConfiguration.optionalAttributeList = {
	"charisma": "ldoa.attributes.charisma.long",
	"constitution": "ldoa.attributes.constitution.long",
	"dexterity": "ldoa.attributes.dexterity.long",
	"intelligence": "ldoa.attributes.intelligence.long",
	"none": "ldoa.none",
	"strength": "ldoa.attributes.strength.long",
	"wisdom": "ldoa.attributes.wisdom.long"
};

ldoaConfiguration.optionalAttributeListLong = [
    {"key": "charisma", "value": "ldoa.attributes.charisma.long"},
    {"key": "constitution", "value": "ldoa.attributes.constitution.long"},
    {"key": "dexterity", "value": "ldoa.attributes.dexterity.long"},
    {"key": "intelligence", "value": "ldoa.attributes.intelligence.long"},
    {"key": "none", "value": "ldoa.none"},
    {"key": "strength", "value": "ldoa.attributes.strength.long"},
    {"key": "wisdom", "value": "ldoa.attributes.wisdom.long"}
];

ldoaConfiguration.originList = {
	"barbarian": "ldoa.origins.barbarian.name",
	"civilized": "ldoa.origins.civilized.name",
	"decadent": "ldoa.origins.decadent.name",
};

ldoaConfiguration.powersList = {
	"anyone": "ldoa.powers.anyone.name",
	"arte": "ldoa.powers.arte.name",
	"martial": "ldoa.powers.martial.name",
	"blooded": "ldoa.powers.blooded.name",
	"human": "ldoa.powers.human.name",
	"manikin": "ldoa.powers.manikin.name",
	"trickster": "ldoa.powers.trickster.name"
};

ldoaConfiguration.languagesList = {
	// Universal Language
	"thyrenian": "ldoa.languages.thyrenian.name",
	
	// Barbarian Tongues
	"amaric": "ldoa.languages.amaric.name",
	"chalidim": "ldoa.languages.chalidim.name",
	"jurka": "ldoa.languages.jurka.name",
	"naruan": "ldoa.languages.naruan.name",
	"pictish": "ldoa.languages.pictish.name",
	"urgic": "ldoa.languages.urgic.name",
	
	// Civilized Tongues
	"alashan": "ldoa.languages.alashan.name",
	"duhuang": "ldoa.languages.duhuang.name",
	
	// Decadent Tongues
	"askavian": "ldoa.languages.askavian.name",
	"polari": "ldoa.languages.polari.name",
	"silenttongue": "ldoa.languages.silenttongue.name",
	
	// Non-Human Tongues
	"celestial": "ldoa.languages.celestial.name",
	"enochian": "ldoa.languages.enochian.name",
	"draconic": "ldoa.languages.draconic.name",
	"highelven": "ldoa.languages.highelven.name",
	"infernal": "ldoa.languages.infernal.name",
	"primordial": "ldoa.languages.primordial.name",
	"sylvian": "ldoa.languages.sylvian.name",
	"undercommon": "ldoa.languages.undercommon.name"
};

ldoaConfiguration.languageGroups = {
	"universal": {
		"name": "ldoa.languages.groups.universal.name",
		"languages": ["thyrenian"]
	},
	"barbarian": {
		"name": "ldoa.languages.groups.barbarian.name", 
		"languages": ["amaric", "chalidim", "jurka", "naruan", "pictish", "urgic"]
	},
	"civilized": {
		"name": "ldoa.languages.groups.civilized.name",
		"languages": ["alashan", "duhuang"]
	},
	"decadent": {
		"name": "ldoa.languages.groups.decadent.name",
		"languages": ["askavian", "polari", "silenttongue"]
	},
	"nonhuman": {
		"name": "ldoa.languages.groups.nonhuman.name",
		"languages": ["celestial", "enochian", "draconic", "highelven", "infernal", "primordial", "sylvian", "undercommon"]
	}
};

ldoaConfiguration.languageBonuses = {
	backgrounds: {
		"barbarian": {
			slots: 1,
			automatic: [],
			restricted: ["barbarian"],
			description: "1 language from Barbarian tongues"
		},
		"knight": {
			slots: 1,
			automatic: [],
			restricted: ["civilized", "decadent"],
			description: "1 language from Civilized or Decadent tongues"
		},
		"mage": {
			slots: 3,
			automatic: ["draconic"],
			restricted: [],
			description: "Draconic + any 3 other languages"
		},
		"priest": {
			slots: 1,
			automatic: [],
			restricted: ["celestial", "infernal"],
			description: "1 language: Celestial or Infernal"
		},
		"phenom": {
			slots: 2,
			automatic: [],
			restricted: ["origin"],
			description: "2 languages from origin background"
		},
		"promethean": {
			slots: 1,
			automatic: ["enochian"],
			restricted: [],
			description: "Enochian + 1 other language (any)"
		},
		"psion": {
			slots: 1,
			automatic: ["enochian"],
			restricted: ["origin"],
			description: "Enochian + 1 language from origin"
		},
		"rogue": {
			slots: 1,
			automatic: ["silenttongue"],
			restricted: [],
			description: "Silent Tongue + any 1 other language"
		},
		"sandman": {
			slots: 3,
			automatic: [],
			restricted: [],
			description: "3 languages from any group"
		}
	},
	kin: {
		"human": 1,
		"manikin": 2,
		"trickster": 1
	}
};

ldoaConfiguration.rollTypes = {
	"advantage": "ldoa.rolls.types.advantage",
	"disadvantage": "ldoa.rolls.types.disadvantage",
	"standard": "ldoa.rolls.types.standard"
};

ldoaConfiguration.spellStates = {
	"available": "ldoa.spells.states.available",
	"cast": "ldoa.spells.states.cast",
	"unavailable": "ldoa.spells.states.unavailable"
};

ldoaConfiguration.summoningStates = {
	"unused": "ldoa.summoning.states.unused",
	"used": "ldoa.summoning.states.used"
};

ldoaConfiguration.usageDieList = {
	"exhausted": "ldoa.dice.exhausted",
	"d4": "ldoa.dice.d4",
	"d6": "ldoa.dice.d6",
	"d8": "ldoa.dice.d8",
	"d10": "ldoa.dice.d10",
	"d12": "ldoa.dice.d12",
	"d20": "ldoa.dice.d20"
};

ldoaConfiguration.usageDieOptionList = {
	"d4": "ldoa.dice.d4",
	"d6": "ldoa.dice.d6",
	"d8": "ldoa.dice.d8",
	"d10": "ldoa.dice.d10",
	"d12": "ldoa.dice.d12",
	"d20": "ldoa.dice.d20"
};

ldoaConfiguration.weaponHandsList = {
	"1": "ldoa.weapons.hands.one",
	"2": "ldoa.weapons.hands.two"
};

ldoaConfiguration.weaponTypes = {
	"melee": "ldoa.weapons.types.melee",
	"ranged": "ldoa.weapons.types.ranged",
	"unarmed": "ldoa.weapons.types.unarmed"
};

ldoaConfiguration.yesNoList = {
	"yes": "ldoa.yes",
	"no": "ldoa.no"
};