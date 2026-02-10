import { Preview3D } from "./Preview3D";

interface Props{
    img: string;
}

export const Preview: React.FC<Props> = ({ img }) => {
    return (
        <section className="preview">
            <Preview3D />
        </section>
    )
};