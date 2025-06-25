// Classic origin backgrounds.
const BERSERKER = {description: "<p>When you go berserk add a d6 to the damage you deal. Damage you receive is divided by 2. Your rage stops when you roll a 1 on the d6. You need a <strong>long rest</strong> to be able to go berserk again.</p>",
                   index:       0,
                   key:         "barbarian#berserker",
                   localeKeys:  {"description": "ldoa.backgrounds.berserker.description",
                                 "label": "ldoa.backgrounds.berserker.label"},
                   name:        "Berserker",
                   stats:       {charisma:     "+0",
                                 constitution: "+0",
                                 dexterity:    "+0",
                                 intelligence: "+0",
                                 strength:     "+1",
                                 wisdom:       "+0"},
                   unique:      true};

const HERBALIST = {description: "<p>You can create d6 doses of healing balms (restores d6 HP + level each), hallucinogenic drugs or poisons (d6 damage per dose). You need a <strong>long rest</strong> in a natural environment to replenish it.</p>",
                   index:       1,
                   key:         "barbarian#herbalist",
                   localeKeys:  {"description": "ldoa.backgrounds.herbalist.description",
                                 "label": "ldoa.backgrounds.herbalist.label"},
                   name:        "Herbalist",
                   stats:       {charisma:     "+0",
                                 constitution: "+0",
                                 dexterity:    "+0",
                                 intelligence: "+1",
                                 strength:     "+0",
                                 wisdom:       "+0"},
                   unique:      false};

const HUNTER    = {description: "<p>In combat your first arrow always hits, add your level to the damage.</p>",
                   index:       2,
                   key:         "barbarian#hunter",
                   localeKeys:  {"description": "ldoa.backgrounds.hunter.description",
                                 "label": "ldoa.backgrounds.hunter.label"},
                   name:        "Hunter",
                   stats:       {charisma:     "+0",
                                 constitution: "+0",
                                 dexterity:    "+1",
                                 intelligence: "+0",
                                 strength:     "+0",
                                 wisdom:       "+0"},
                   unique:      false};

const SHAMAN    = {description: "<p>You have made a pact with two spirits.</p>",
                   index:       3,
                   key:         "barbarian#shaman",
                   localeKeys:  {"description": "ldoa.backgrounds.shaman.description",
                                 "label": "ldoa.backgrounds.shaman.label"},
                   name:        "Shaman",
                   stats:       {charisma:     "+0",
                                 constitution: "+0",
                                 dexterity:    "+0",
                                 intelligence: "+0",
                                 strength:     "+0",
                                 wisdom:       "+1"},
                   unique:      false};

const STORYTELLER = {description: "<p>You always know d4 interesting things about objects, places or people (one roll per session). While you tell a story, your audience doesn't notice what happens <strong>Nearby</strong>.</p>",
                     index:       4,
                     key:         "barbarian#storyteller",
                     localeKeys:  {"description": "ldoa.backgrounds.storyteller.description",
                                   "label": "ldoa.backgrounds.storyteller.label"},
                     name:        "Storyteller",
                     stats:       {charisma:     "+1",
                                   constitution: "+0",
                                   dexterity:    "+0",
                                   intelligence: "+0",
                                   strength:     "+0",
                                   wisdom:       "+0"},
                     unique:      false};

const WILDLING  = {description: "<p>You can take a <strong>long rest</strong> anywhere.</p>",
                   index:       5,
                   key:         "barbarian#wildling",
                   localeKeys:  {"description": "ldoa.backgrounds.wildling.description",
                                 "label": "ldoa.backgrounds.wildling.label"},
                   name:        "Wildling",
                   stats:       {charisma:     "+0",
                                 constitution: "+1",
                                 dexterity:    "+0",
                                 intelligence: "+0",
                                 strength:     "+0",
                                 wisdom:       "+0"},
                   unique:      false};

const CHIEFTAIN = {description: "<p>You can use Strength instead of Charisma when trying to intimidate someone.</p>",
                   index:       6,
                   key:         "barbarian#chieftain",
                   localeKeys:  {"description": "ldoa.backgrounds.chieftain.description",
                                 "label": "ldoa.backgrounds.chieftain.label"},
                   name:        "Chieftain",
                   stats:       {charisma:     "+0",
                                 constitution: "+0",
                                 dexterity:    "+0",
                                 intelligence: "+0",
                                 strength:     "+1",
                                 wisdom:       "+0"},
                   unique:      false};

const RAIDER   = {description: "<p>When you get a critical success on an Attack roll you inflict damage equal to your Strength score (no need to roll the damage).</p>",
                  index:       7,
                  key:         "barbarian#raider",
                  localeKeys:  {"description": "ldoa.backgrounds.raider.description",
                                 "label": "ldoa.backgrounds.raider.label"},
                  name:        "Raider",
                  stats:       {charisma:     "+0",
                                constitution: "+0",
                                dexterity:    "+0",
                                intelligence: "+0",
                                strength:     "+1",
                                wisdom:       "+0"},
                  unique:      false};

const SCOUT    = {description: "<p>You get Advantage on your initiative rolls.</p>",
                   index:       8,
                   key:         "barbarian#scout",
                   localeKeys:  {"description": "ldoa.backgrounds.scout.description",
                                 "label": "ldoa.backgrounds.scout.label"},
                   name:        "Scout",
                   stats:       {charisma:     "+0",
                                 constitution: "+0",
                                 dexterity:    "+0",
                                 intelligence: "+0",
                                 strength:     "+0",
                                 wisdom:       "+1"},
                   unique:      false};

const SURVIVOR = {description: "<p>It takes you 1d6 minutes to find something that can be used as a knife or club.</p>",
                   index:       9,
                   key:         "barbarian#survivor",
                   localeKeys:  {"description": "ldoa.backgrounds.survivor.description",
                                 "label": "ldoa.backgrounds.survivor.label"},
                   name:        "Survivor",
                   stats:       {charisma:     "+0",
                                 constitution: "+1",
                                 dexterity:    "+0",
                                 intelligence: "+0",
                                 strength:     "+0",
                                 wisdom:       "+0"},
                   unique:      false};

const BOOKWORM   = {description: "<p>You can substitute any attribute test with an <strong>INT</strong> test (explain how and why your knowledge helps you). Replenishes after a <strong>long rest</strong>.</p>",
                   index:       0,
                   key:         "civilized#bookworm",
                   localeKeys:  {"description": "ldoa.backgrounds.bookworm.description",
                                 "label": "ldoa.backgrounds.bookworm.label"},
                   name:        "Bookworm",
                   stats:       {charisma:     "+0",
                                 constitution: "+0",
                                 dexterity:    "+0",
                                 intelligence: "+1",
                                 strength:     "+0",
                                 wisdom:       "+0"},
                   unique:      false};

const INVENTOR   = {description: "<p>You know how to build 2 scientific marvels.</p>",
                    index:       1,
                    key:         "civilized#inventor",
                    localeKeys:  {"description": "ldoa.backgrounds.inventor.description",
                                  "label": "ldoa.backgrounds.inventor.label"},
                    name:        "Inventor",
                    stats:       {charisma:     "+0",
                                  constitution: "+0",
                                  dexterity:    "+0",
                                  intelligence: "+1",
                                  strength:     "+0",
                                  wisdom:       "+0"},
                    unique:      true};

const LEGIONNAIRE = {description: "<p>You are used to fighting in groups. Three times per session, a <strong>Nearby</strong> ally can re-roll a failed dodge, parry or attack roll.</p>",
                     index:       2,
                     key:         "civilized#legionnaire",
                     localeKeys:  {"description": "ldoa.backgrounds.legionnaire.description",
                                   "label": "ldoa.backgrounds.legionnaire.label"},
                     name:        "Legionnaire",
                     stats:       {charisma:     "+0",
                                   constitution: "+0",
                                   dexterity:    "+0",
                                   intelligence: "+0",
                                   strength:     "+1",
                                   wisdom:       "+0"},
                     unique:      false};

const SOPHIST    = {description: "<p>You can make someone believe a blatant lie if you succeed at a <strong>CHA</strong> test. The 'effect' lasts one hour.</p>",
                    index:       3,
                    key:         "civilized#sophist",
                    localeKeys:  {"description": "ldoa.backgrounds.sophist.description",
                                  "label": "ldoa.backgrounds.sophist.label"},
                    name:        "Sophist",
                    stats:       {charisma:     "+1",
                                  constitution: "+0",
                                  dexterity:    "+0",
                                  intelligence: "+0",
                                  strength:     "+0",
                                  wisdom:       "+0"},
                    unique:      false};

const STREET_URCHIN = {description: "<p>Get <strong>Advantage</strong> on actions involving stealth, pick-pocketing, eavesdropping and streetwise.</p>",
                       index:       4,
                       key:         "civilized#street_urchin",
                       localeKeys:  {"description": "ldoa.backgrounds.street_urchin.description",
                                     "label": "ldoa.backgrounds.street_urchin.label"},
	                     name:        "Street Urchin",
	                     stats:       {charisma:     "+0",
	                                   constitution: "+0",
	                                   dexterity:    "+1",
                                     intelligence: "+0",
                                     strength:     "+0",
                                     wisdom:       "+0"},
	                     unique:     false};

const SURGEON   = {description: "<p>Make an <strong>INT</strong> test when taking care of someone who has fallen to 0 HP. They roll a d4 on the Helpless table instead of a d6 if you succeed.</p>",
                   index:       5,
                   key:         "civilized#surgeon",
                   localeKeys:  {"description": "ldoa.backgrounds.surgeon.description",
                                 "label": "ldoa.backgrounds.surgeon.label"},
                   name:        "Surgeon",
                   stats:       {charisma:     "+0",
                                 constitution: "+0",
                                 dexterity:    "+0",
                                 intelligence: "+1",
                                 strength:     "+0",
                                 wisdom:       "+0"},
                   unique:      false};

const SWORDMASTER = {description: "<p>You can use <strong>DEX</strong> instead of <strong>STR</strong> when making a melee attack with one-handed bladed weapons.</p>",
                     index:       6,
                     key:         "civilized#swordmaster",
                     localeKeys:  {"description": "ldoa.backgrounds.swordmaster.description",
                                   "label": "ldoa.backgrounds.swordmaster.label"},
                     name:        "Swordmaster",
                     stats:       {charisma:     "+0",
                                   constitution: "+0",
                                   dexterity:    "+1",
                                   intelligence: "+0",
                                   strength:     "+0",
                                   wisdom:       "+0"},
                     unique:      false};

const BODYGUARD  = {description: "<p>If you use an action to protect a Close character during your turn, you absorb any damage from attacks against them, but you divide it by two (rounding up).</p>",
                    index:       7,
                    key:         "civilized#bodyguard",
                    localeKeys:  {"description": "ldoa.backgrounds.bodyguard.description",
                                  "label": "ldoa.backgrounds.bodyguard.label"},
                    name:        "Bodyguard",
                    stats:       {charisma:     "+0",
                                  constitution: "+1",
                                  dexterity:    "+0",
                                  intelligence: "+0",
                                  strength:     "+0",
                                  wisdom:       "+0"},
                    unique:      false};

const DIPLOMAT   = {description: "<p>You know two additional languages and can make yourself understood by anyone willing to do so. If all you do is talk you can act first at the beginning of any combat Turn.</p>",
                    index:       8,
                    key:         "civilized#diplomat",
                    localeKeys:  {"description": "ldoa.backgrounds.diplomat.description",
                                  "label": "ldoa.backgrounds.diplomat.label"},
                    name:        "Diplomat",
                    stats:       {charisma:     "+1",
                                  constitution: "+0",
                                  dexterity:    "+0",
                                  intelligence: "+0",
                                  strength:     "+0",
                                  wisdom:       "+0"},
                    unique:      false};

const ASSASSIN  = {description: "<p>Your first attack against an unaware target is an automatic hit that deals 2d6 + your level points of damage.</p>",
                   index:       0,
                   key:         "decadent#assassin",
                   localeKeys:  {"description": "ldoa.backgrounds.assassin.description",
                                 "label": "ldoa.backgrounds.assassin.label"},
                   name:        "Assassin",
                   stats:       {charisma:     "+0",
                                 constitution: "+0",
                                 dexterity:    "+1",
                                 intelligence: "+0",
                                 strength:     "+0",
                                 wisdom:       "+0"},
                   unique:      true};

const FORBIDDEN_KNOWLEDGE = {description: "<p>You start the game with 4 randomly selected spells.</p>",
                             index:       1,
                             key:         "decadent#forbidden_knowledge",
                             localeKeys:  {"description": "ldoa.backgrounds.forbidden_knowledge.description",
                                           "label": "ldoa.backgrounds.forbidden_knowledge.label"},
                             name:        "Forbidden Knowledge",
                             stats:       {charisma:     "+0",
                                           constitution: "+0",
                                           dexterity:    "+0",
                                           intelligence: "+1",
                                           strength:     "+0",
                                           wisdom:       "+0"},
                             unique:      false};

const PIT_FIGHTER = {description: "<p>Your unarmed damage is equal to your armed damage.</p>",
                     index:       2,
                     key:         "decadent#pit-fighter",
                     localeKeys:  {"description": "ldoa.backgrounds.pit_fighter.description",
                                   "label": "ldoa.backgrounds.pit_fighter.label"},
                     name:        "Pit-fighter",
                     stats:       {charisma:     "+0",
                                   constitution: "+0",
                                   dexterity:    "+0",
                                   intelligence: "+0",
                                   strength:     "+1",
                                   wisdom:       "+0"},
                     unique:      false};

const SNAKE_BLOOD = {description: "<p>You're immune to poisons and venom.</p>",
                     index:       3,
                     key:         "decadent#snake_blood",
                     localeKeys:  {"description": "ldoa.backgrounds.snake_blood.description",
                                   "label": "ldoa.backgrounds.snake_blood.label"},
                     name:        "Snake Blood",
                     stats:       {charisma:     "+0",
                                   constitution: "+1",
                                   dexterity:    "+0",
                                   intelligence: "+0",
                                   strength:     "+0",
                                   wisdom:       "+0"},
                     unique:      false};

const VICIOUS   = {description: "<p>Your damage die is now d8 (d6 unarmed).</p>",
                   index:       4,
                   key:         "decadent#vicious",
                   localeKeys:  {"description": "ldoa.backgrounds.vicious.description",
                                 "label": "ldoa.backgrounds.vicious.label"},
                   name:        "Vicious",
                   stats:       {charisma:     "+0",
                                 constitution: "+0",
                                 dexterity:    "+0",
                                 intelligence: "+0",
                                 strength:     "+1",
                                 wisdom:       "+0"},
                   unique:      false};

const WARLOCK   = {description: "<p>You have a pact with two demons.</p>",
                   index:       5,
                   key:         "decadent#warlock",
                   localeKeys:  {"description": "ldoa.backgrounds.warlock.description",
                                 "label": "ldoa.backgrounds.warlock.label"},
                   name:        "Warlock",
                   stats:       {charisma:     "+1",
                                 constitution: "+0",
                                 dexterity:    "+0",
                                 intelligence: "+0",
                                 strength:     "+0",
                                 wisdom:       "+0"},
                   unique:      false};

const CHANGELING = {description: "<p>You were abducted as a baby and raised by very different folk. Choose two faerie ties.</p>",
                    index:       6,
                    key:         "decadent#changeling",
                    localeKeys:  {"description": "ldoa.backgrounds.changeling.description",
                                  "label": "ldoa.backgrounds.changeling.label"},
                    name:        "Changeling",
                    stats:       {charisma:     "+1",
                                  constitution: "+0",
                                  dexterity:    "+0",
                                  intelligence: "+0",
                                  strength:     "+0",
                                  wisdom:       "+0"},
                    unique:      false};

// Classic origins.
const BARBARIAN = {backgrounds: [
	                   JSON.stringify(BERSERKER),
	                   JSON.stringify(HERBALIST),
	                   JSON.stringify(HUNTER),
	                   JSON.stringify(SHAMAN),
	                   JSON.stringify(STORYTELLER),
	                   JSON.stringify(WILDLING),
                     JSON.stringify(CHIEFTAIN),
                     JSON.stringify(RAIDER),
                     JSON.stringify(SCOUT),
                     JSON.stringify(SURVIVOR)
	                 ],
                   id:          "barbarian",
                   name:        "Barbarian"};

const CIVILIZED = {backgrounds: [
	                   JSON.stringify(BOOKWORM),
	                   JSON.stringify(INVENTOR),
	                   JSON.stringify(LEGIONNAIRE),
	                   JSON.stringify(SOPHIST),
	                   JSON.stringify(STREET_URCHIN),
	                   JSON.stringify(SURGEON),
	                   JSON.stringify(SWORDMASTER),
                     JSON.stringify(BODYGUARD),
                     JSON.stringify(DIPLOMAT)
	                 ],
                   id:          "civilized",
                   name:        "Civilized"};

const DECADENT  = {backgrounds: [
	                   JSON.stringify(ASSASSIN),
	                   JSON.stringify(FORBIDDEN_KNOWLEDGE),
	                   JSON.stringify(PIT_FIGHTER),
	                   JSON.stringify(SNAKE_BLOOD),
	                   JSON.stringify(VICIOUS),
	                   JSON.stringify(WARLOCK),
                     JSON.stringify(CHANGELING)
	                 ],
                   id:          "decadent",
                   name:        "Decadent"};

const CLASSIC_ORIGINS = {barbarian: BARBARIAN,
                         civilized: CIVILIZED,
                         decadent:  DECADENT};

const CLASSIC_ORIGIN_MAP = {
	"assassin":            {id: "decadent", index: 0, key: "assassin"},
	"berserker":           {id: "barbarian", index: 0, key: "berserker"},
  "bodyguard":           {id: "civilized", index: 7, key: "bodyguard"},
  "changeling":          {id: "decadent", index: 6, key: "changeling"},
  "chieftain":           {id: "barbarian", index: 6, key: "chieftain"},
  "diplomat":            {id: "civilized", index: 8, key: "diplomat"},
	"bookworm":            {id: "civilized", index: 0, key: "bookworm"},
	"forbidden_knowledge": {id: "decadent", index: 1, key: "forbidden_knowledge"},
	"herbalist":           {id: "barbarian", index: 1, key: "herbalist"},
	"hunter":              {id: "barbarian", index: 2, key: "hunter"},
	"inventor":            {id: "civilized", index: 1, key: "inventor"},
	"legionnaire":         {id: "civilized", index: 2, key: "legionnaire"},
	"pit-fighter":         {id: "decadent", index: 2, key: "pit-fighter"},
  "raider":              {id: "barbarian", index: 7, key: "raider"},
  "scout":               {id: "barbarian", index: 8, key: "scout"},
	"shaman":              {id: "barbarian", index: 3, key: "shaman"},
	"snake_blood":         {id: "decadent", index: 3, key: "snake_blood"},
	"sophist":             {id: "civilized", index: 3, key: "sophist"},
	"storyteller":         {id: "barbarian", index: 4, key: "storyteller"},
	"street_urchin":       {id: "civilized", index: 4, key: "street_urchin"},
	"surgeon":             {id: "civilized", index: 5, key: "surgeon"},
  "survivor":            {id: "barbarian", index: 9, key: "survivor"},
	"swordmaster":         {id: "civilized", index: 6, key: "swordmaster"},
	"vicious":             {id: "decadent", index: 4, key: "vicious"},
	"warlock":             {id: "decadent", index: 5, key: "warlock"},
	"wildling":            {id: "barbarian", index: 5, key: "wildling"}
};

// New Background System - 7 Backgrounds
const NEW_BARBARIAN = {
    description: "<p>Those that live outside of civilizations' restraints.</p>",
    index: 0,
    key: "barbarian",
    localeKeys: {
        "description": "ldoa.backgrounds.new_barbarian.description",
        "label": "ldoa.backgrounds.new_barbarian.label"
    },
    name: "Barbarian",
    type: "Martial",
    stats: {
        charisma: "+0",
        constitution: "+0",
        dexterity: "+0",
        intelligence: "+0",
        strength: "+1",
        wisdom: "+0"
    },
    unique: false
};

const NEW_KNIGHT = {
    description: "<p>Those that uphold chivalry and civilization itself.</p>",
    index: 1,
    key: "knight",
    localeKeys: {
        "description": "ldoa.backgrounds.new_knight.description",
        "label": "ldoa.backgrounds.new_knight.label"
    },
    name: "Knight",
    type: "Martial",
    stats: {
        charisma: "+1",
        constitution: "+0",
        dexterity: "+0",
        intelligence: "+0",
        strength: "+0",
        wisdom: "+0"
    },
    unique: false
};

const NEW_MAGE = {
    description: "<p>Those that study occult tomes and formulas to unleash magick into the world.</p>",
    index: 2,
    key: "mage",
    localeKeys: {
        "description": "ldoa.backgrounds.new_mage.description",
        "label": "ldoa.backgrounds.new_mage.label"
    },
    name: "Mage",
    type: "Arte",
    stats: {
        charisma: "+0",
        constitution: "+0",
        dexterity: "+0",
        intelligence: "+1",
        strength: "+0",
        wisdom: "+0"
    },
    unique: false
};

const NEW_PRIEST = {
    description: "<p>Those that bend knee to powerful gods, demigods and godlings for power.</p>",
    index: 3,
    key: "priest",
    localeKeys: {
        "description": "ldoa.backgrounds.new_priest.description",
        "label": "ldoa.backgrounds.new_priest.label"
    },
    name: "Priest",
    type: "Arte",
    stats: {
        charisma: "+0",
        constitution: "+0",
        dexterity: "+0",
        intelligence: "+0",
        strength: "+0",
        wisdom: "+1"
    },
    unique: false
};

const NEW_PHENOM = {
    description: "<p>Those that stand separate and outside of the other backgrounds.</p>",
    index: 4,
    key: "phenom",
    localeKeys: {
        "description": "ldoa.backgrounds.new_phenom.description",
        "label": "ldoa.backgrounds.new_phenom.label"
    },
    name: "Phenom",
    type: "Martial",
    stats: {
        charisma: "+0",
        constitution: "+1",
        dexterity: "+0",
        intelligence: "+0",
        strength: "+0",
        wisdom: "+0"
    },
    unique: false
};

const NEW_PROMETHEAN = {
    description: "<p>Practitioners of Science, the newest magickal paradigm to come about on Evermore.</p>",
    index: 5,
    key: "promethean",
    localeKeys: {
        "description": "ldoa.backgrounds.new_promethean.description",
        "label": "ldoa.backgrounds.new_promethean.label"
    },
    name: "Promethean",
    type: "Arte",
    stats: {
        charisma: "+0",
        constitution: "+0",
        dexterity: "+0",
        intelligence: "+1",
        strength: "+0",
        wisdom: "+0"
    },
    unique: false
};

const NEW_PSION = {
    description: "<p>Those that either have blood of the True Atlanteans flowing in their veins or have come into contact with their artifacts to give them the power of psionics.</p>",
    index: 6,
    key: "psion",
    localeKeys: {
        "description": "ldoa.backgrounds.new_psion.description",
        "label": "ldoa.backgrounds.new_psion.label"
    },
    name: "Psion",
    type: "Arte",
    stats: {
        charisma: "+0",
        constitution: "+0",
        dexterity: "+1",
        intelligence: "+0",
        strength: "+0",
        wisdom: "+0"
    },
    unique: false
};

// New Background Collections
const NEW_BACKGROUNDS = [
    NEW_BARBARIAN,
    NEW_KNIGHT,
    NEW_MAGE,
    NEW_PRIEST,
    NEW_PHENOM,
    NEW_PROMETHEAN,
    NEW_PSION
];

const NEW_MARTIAL_BACKGROUNDS = [
    NEW_BARBARIAN,
    NEW_KNIGHT,
    NEW_PHENOM
];

const NEW_ARTE_BACKGROUNDS = [
    NEW_MAGE,
    NEW_PRIEST,
    NEW_PROMETHEAN,
    NEW_PSION
];

export {BARBARIAN, CIVILIZED, DECADENT, CLASSIC_ORIGINS, CLASSIC_ORIGIN_MAP, NEW_BACKGROUNDS, NEW_MARTIAL_BACKGROUNDS, NEW_ARTE_BACKGROUNDS};
