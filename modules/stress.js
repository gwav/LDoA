import {ldoaConfiguration} from './configuration.js';
import {calculateCharacterData, downgradeDie, getActorById, interpolate, rollEm} from './shared.js';

/**
 * This function makes a stress role for a specified actor, downgrading the actors
 * stress die as appropriate and returning an object detailing the results of the
 * roll. The function accepts a second parameter to indicate whether the roll
 * should be made with "advantage", "disadvantage" or just a "standard" single
 * die roll (the default).
 */
export function rollStress(actor, rollType="standard") {
    let result    = {die: {ending: null,
                           starting: null},
                     downgraded: false,
                     rolled: false};
    let actorData = actor.system;

    result.die.starting = result.die.ending = actorData.stress;
    if(actorData.stress !== "exhausted") {
        let data      = {system: {stress: actorData.stress}};
        let dice;


        result.die.starting = actorData.stress;
        result.rolled       = true;
        if(rollType === "advantage") {
            dice = new Roll(`2${actorData.stress}kh`);
        } else if(rollType === "disadvantage") {
            dice = new Roll(`2${actorData.stress}kl`);
        } else {
            dice = new Roll(`1${actorData.stress}`);
        }

        return(rollEm(dice).then((roll) => {
                    result.formula = roll.formula;
                    result.result  = roll.total;
                    if(roll.total < 3) {
                        let newDie = downgradeDie(actorData.stress);

                        result.downgraded = true;
                        result.die.ending = newDie;
                        data.system.stress  = newDie;
                        if(result.die.ending === "exhausted") {
                            ui.notifications.warn(interpolate("ldoa.messages.stress.failExhausted", {name: actor.name}));
                        }
                    } else {
                        result.die.ending = actor.stress;
                    }
                    actor.update(data, {diff: true});
                    return(result);
                }));
    } else {
        console.error(`Unable to roll stress for ${actor.name} as their stress die is exhausted.`);
        ui.notifications.error(interpolate("ldoa.messages.stress.exhausted", {name: actor.name}));
    }
}

/**
 * Sets the actors Stress die to be exhausted and tweaks a few other elements
 * that are tied to Stress.
 */
export async function exhaustStressDie(actor) {
    if(typeof actor === "string") {
        actor = getActorById(actor);
    }

    if(actor) {
        let updates = {system: {stress: "exhausted",
                                summoning: {demon: "unavailable",
                                            spirit: "unavailable"}}};

        actor.update(updates, {diff: true});
    } else {
        console.error("Unable to find the specified actor to exhaust their Stress die.");
    }
}

/**
 * Resets a characters Stress Die to it's normal maximum level.
 */
export function resetStressDie(actor) {
    if(typeof actor === "string") {
        actor = getActorById(actor);
    }

    if(actor) {
        let data    = actor.system;
        let updates = {system: {stress: "d6"}};

        calculateCharacterData(actor, CONFIG.configuration);
        if(actor.level > 9) {
            updates.system.stress = "d8";
        }
        actor.update(updates, {diff: true});
    } else {
        console.error("Unable to find the specified actor to reset their Stress die.");
    }
}
