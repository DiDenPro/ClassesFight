import { CharacterData } from "../data/characters";
import { useState } from "react";

interface Props{
    character: CharacterData;
}

export const Tabs: React.FC<Props> = ({character}) =>{
    const [tab, setTab] = useState<"lore" | "stats" | "talents">("lore");

    return(
        <main className="center">
            <div className="tabs">
                <div 
                    className={tab==="lore" ? "tab active" : "tab"}
                    onClick={() => setTab("lore")}>
                    Lore
                </div>
                <div 
                    className={tab==="stats" ? "tab active" : "tab"}
                    onClick={() => setTab("stats")}>
                    Stats
                </div>
                <div 
                    className={tab==="talents" ? "tab active" : "tab"}
                    onClick={() => setTab("talents")}>
                    Talents
                </div>
            </div>

            <div className="tab-content">
                {tab === "lore" && <p>{character.lore}</p>}
                
                {tab === "stats" && (
                    <ul>
                        <li>Health: {character.stats.health}</li>
                        <li>Attack: {character.stats.attack}</li>
                        <li>Defence: {character.stats.defence}</li>
                        <li>Speed: {character.stats.speed}</li>
                        <li>Crit Chance: {character.stats.critChance}</li>
                        <li>Crit Damage: {character.stats.critDamage}</li>
                        <li>Attack Speed: {character.stats.attackSpeed}</li>
                    </ul>
                )}

                {tab === "talents" && 
                    character.talents.map(t =>(
                        <div key={t.name}>
                            <h3 className="tab-title">{t.name}</h3>
                            <p className="talent-description">{t.description}</p>
                            <p className="talent-details">{t.details && <small>{t.details}</small>}</p>
                        </div>
                    ))
                }
            </div>
        </main>
    );
};