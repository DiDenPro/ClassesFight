import { Preview3D } from "./Preview3D";
import { CharacterData } from "../data/characters";

interface Props {
    character: CharacterData;
}

export const Preview: React.FC<Props> = ({ character }) => {
    return (
        <section className="preview">
            <Preview3D character={character} />
        </section>
    );
};
