interface Props{
    img: string;
}

export const Preview: React.FC<Props> = ({ img }) => {
    return (
        <section className="preview">
            <img src={img} alt="Character Preview" />
        </section>
    )
};