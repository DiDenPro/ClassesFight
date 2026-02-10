import { CharacterData } from "../data/characters";
import { useState, useRef } from "react";

interface Props{
    character: CharacterData;
}

export const Tabs: React.FC<Props> = ({character}) =>{
    const [tab, setTab] = useState<"lore" | "stats" | "talents">("lore");
    const [tooltip, setTooltip] = useState<{text:string; x: number; y: number} | null>(null);
    const tabContentRef = useRef<HTMLDivElement>(null);

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

            <div 
                ref={tabContentRef}
                className="tab-content">
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
                        <div
                            key={t.name}
                            className="talent"
                            onMouseMove={e => {
                                const rect = tabContentRef.current!.getBoundingClientRect();
                                setTooltip({
                                text: t.details || "",
                                x: e.clientX - rect.left + 25, // координаты относительно блока
                                y: e.clientY - rect.top + 75,
                                });
                            }}
                            onMouseLeave={() => setTooltip(null)}
                        >
                            <h3 className="tab-title">{t.name}</h3>
                            <p className="talent-description">{t.description}</p>
                            <br />
                        </div>
                    ))
                }
                {tooltip && (
                    <div
                        className={`tooltip`}
                        style={{
                            top: tooltip.y+5,
                            left: tooltip.x+5,
                        }}
                    >
                        {tooltip.text.split("|").map((line, i) =>{
                            const [label, value] = line.split(":");
                            return (
                                <div key={i} className="tooltip-line">
                                    <span className="tooltip-label">{label.trim()}:</span>
                                    <span className="tooltip-value">{value?.trim()}</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
};