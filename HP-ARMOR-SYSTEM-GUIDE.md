# HP and Armor System - Implementation Guide

## 🎯 **What's New**

The character sheet now includes **Hit Points (HP)** and **Armor** displays in the Game Play mode, positioned in the top stats section.

### **Hit Points (HP)**
- 📍 **Location**: Under character image in Game Play mode
- 🧮 **Calculation**: Constitution + Level - 1 + Boon bonuses
- 💾 **Display**: Current HP / Maximum HP (e.g., "12/16")
- ✏️ **Editable**: Players can edit current HP to track damage

### **Armor**
- 📍 **Location**: To the right of HP in Game Play mode  
- 📋 **Dropdown**: Lists all armor from character's inventory
- 🌟 **Auto-bonuses**: Includes armor bonuses from boons automatically
- 🔢 **Display**: Shows total armor value next to dropdown

---

## 🔧 **How to Test**

### **Step 1: Prepare a Character**
1. Open any character sheet
2. Switch to **"Game Play"** mode (if in Character Creation mode)
3. Look for the new HP and Armor fields in the top stats section

### **Step 2: Test HP Calculation**
1. Note the character's Constitution score
2. Note the character's Level
3. Check that Max HP = Constitution + Level - 1
4. **Example**: CON 14, Level 3 → Max HP should be 16 (14 + 3 - 1)

### **Step 3: Add Test Armor** (Optional)
Run this script in Foundry's console:
```javascript
// Paste the contents of scripts/add-example-armor.js
```

### **Step 4: Test Armor System**
1. Add armor to character's inventory (drag from compendium or use test script)
2. Open character sheet - armor should appear in dropdown
3. Select armor from dropdown
4. Armor value should update on the right

### **Step 5: Test Boon Integration**
1. Add a boon with HP or Armor bonuses to the character
2. Refresh character sheet
3. HP should increase with boon HP bonuses
4. Armor value should include boon armor bonuses

---

## 🧪 **Testing Scripts**

### **Add Example Armor**
```javascript
// Run: scripts/add-example-armor.js
// Adds: Leather Armor (2), Chain Mail (4), Plate Armor (6), Padded Cloth (1)
```

### **Verify HP Calculation**
```javascript
// Run: scripts/verify-hp-calculation.js  
// Tests: HP calculation and armor detection for selected character
```

### **Test Guide**
```javascript
// Run: scripts/test-hp-armor-system.js
// Shows: Complete testing instructions in console
```

---

## 🎨 **Visual Layout**

```
Game Play Mode - Top Stats Section:
┌─────────────┬─────────────────────┬──────────────────────┬─────────────┬─────────────┐
│ Rest Icons  │    Hit Points       │       Armor          │   Level     │ Stress Die  │
│  ⏸️ 🛏️      │      12/16          │ [Chain Mail ▼]   4  │     3       │     d6      │
│             │    (centered)       │ (dropdown)  (value)  │             │             │
└─────────────┴─────────────────────┴──────────────────────┴─────────────┴─────────────┘
```

**Layout Details:**
- **Rest Icons**: Left side (Short Rest ⏸️ and Long Rest 🛏️)
- **Hit Points**: Centered in the middle section
- **Armor**: To the right of HP with dropdown and value on one horizontal line
- **Level**: Left of Stress Die (right-justified area)
- **Stress Die**: Rightmost position

---

## 🔍 **Technical Details**

### **Files Modified:**
- `templates/sheets/garysv1-character-sheet.html` - Added UI elements
- `modules/sheets/garysv1-character-sheet.js` - Added armor data preparation  
- `template.json` - Added selectedArmor field and equipment armorValue
- `lastdays.css` - Added styling for HP and Armor displays

### **HP Calculation Location:**
- Function: `calculateMaximumHitPoints()` in `modules/shared.js`
- Already includes boon bonuses automatically

### **Armor Sources:**
- **Equipment**: Items with `system.armorValue > 0` (selectable in dropdown)
- **Boons**: Items with `system.effects.armorRating > 0` (always active)

### **Data Fields Added:**
- `actor.system.selectedArmor` - Stores selected equipment armor ID
- `item.system.armorValue` - Armor value for equipment items

---

## 🚀 **Ready to Use!**

The HP and Armor system is now fully implemented and ready for use. Players will see:

1. **Automatic HP calculation** based on their stats and boons
2. **Armor selection dropdown** with their available armor
3. **Real-time armor value updates** including boon bonuses
4. **Clean, intuitive interface** integrated into the existing character sheet

Just restart Foundry VTT to load all the changes!