import { CharacterData } from "../characters";
import preview from '../../img/Archer.png';

export const archer: CharacterData = {
    name: "Archer",
    archetype: "Range",
    lore: "A skilled marksman with unparalleled accuracy.",
    weapon:{
        name: "Bow",
        description: "A ranged weapon that fires arrows with great precision."
    },
    stats: {
        health: 100,
        attack: 80,
        defence: 50,
        speed: 70,
        critChance: 20,
        critDamage: 150,
        attackSpeed: 1.2
    },
    talents: [
        {
            name: "Eagle Eye",
            type: "passive",
            description: "Increases critical hit chance by 10%.",
            details: "A passive ability that enhances the Archer's precision."
        },
        {
            name: "Rapid Fire",
            type: "active",
            description: "Fires three arrows in quick succession.",
            details: "A powerful attack that can deal massive damage."
        }
    ],
    previewImg: preview,

    // ─── Броня Archer ─────────────────────────────────────────────────────────
    armor: {
        chestplate: {
            texture: "/armor/archer_chestplate.png",
            material: "leather",
            leatherColor: "#8B4513", // коричневый цвет кожи
            trim: {
                pattern: "wild",
                material: "gold",
            },
        },
        leggings: {
            texture: "/armor/archer_leggings.png",
            material: "leather",
            leatherColor: "#8B4513",
        },
        boots: {
            texture: "/armor/archer_boots.png",
            material: "leather",
            leatherColor: "#8B4513",
        },
    },
};
