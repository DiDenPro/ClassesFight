import { CharacterData } from '../characters';
import preview from '../../img/Pytaria.png';

export const pytaria: CharacterData = {
    name: "Pytaria",
    archetype: "Damage",
    lore: "Pytaria is a fierce and agile warrior, known for her lightning-fast attacks and relentless pursuit of victory. Born in the heart of a storm, she harnesses the power of electricity to strike down her foes with precision and speed. With a fiery spirit and unwavering determination, Pytaria is a force to be reckoned with on the battlefield.",
    weapon: {
        name: "Annihilallium",
        description: "A powerful weapon that channels the energy of storms, allowing Pytaria to unleash devastating electrical attacks on her enemies."
    },
    stats:{
        health: 125,
        attack: 90,
        defence: 100,
        speed: 100,
        critChance: 20,
        critDamage: 40,
        attackSpeed: 100
    },
    talents: [
        {
            name: "Thunder Strike",
            type: "Active",
            description: "Pytaria strikes her enemy with a powerful electrical attack, dealing damage and stunning them for a short duration.",
            details: "Damage: 150% of attack. Stun duration: 2 seconds. Cooldown: 8 seconds."
        },
        {
            name: "Static Charge",
            type: "Passive",
            description: "Pytaria's basic attacks build up static electricity, increasing her attack speed and damage with each hit.",
            details: "Attack speed bonus: 5% per stack. Max stacks: 5."
        },
        {
            name: "Storm's Fury",
            type: "Ultimate",
            description: "Pytaria unleashes a devastating storm, dealing massive damage to all enemies in the area and leaving them stunned for a short duration."
        }
    ],
    previewImg: preview
};
