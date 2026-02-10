export interface Stats{
    health: number;
    attack: number;
    defence: number;
    speed: number;
    critChance: number;
    critDamage: number;
    attackSpeed: number;
}

export interface Talent{
    name: string;
    type: string;
    description: string;
    details?: string;
}

export interface Weapon{
    name: string;
    description: string;
}

export interface CharacterData{
    name: string;
    archetype: string;
    lore: string;
    weapon:  Weapon;
    stats: Stats;
    talents: Talent[];
    previewImg: string;
}