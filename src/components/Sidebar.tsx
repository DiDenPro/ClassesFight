import React from 'react';
import { CharacterData } from '../data/characters';

interface Props {
    characters: CharacterData[];
    selected: CharacterData;
    onSelect: (c: CharacterData) => void;
}

export const Sidebar: React.FC<Props> = ({
    characters,
    selected,
    onSelect
}) =>{
    return (
        <aside className="sidebar">
            <h2 className="sidebar-title">Characters</h2>
            <div className="character-list">
                {characters.map(c=>(
                    <div
                    key={c.name}
                    className={
                        "character-item" + 
                        (c.name === selected.name ? " selected" : "")
                    } 
                    onClick={() => onSelect(c)}
                    >
                        {c.name}
                    </div>
                ))}
            </div>
        </aside>
    );
};