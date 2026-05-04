import Link from "next/link";
import "./Menu.css"
import { asset } from '@/utils/basePath';

const Menu = ({  }) => {
    return (
        <div className="menu">
            <ul className="menu-list">
                <li><Link href="/about">Sobre mí</Link></li>
                <li><Link href="/projects">Proyectos</Link></li>
                <li><Link href="/contact">Contacto</Link></li>
            </ul>
        </div>
    );
};

export default Menu