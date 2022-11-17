import styles from "./PageError.module.css";
import styleBoton from "./boton.module.css";
import style from "./fondo.module.css";
import { Link, Routes, Route } from "react-router-dom";
const imagenError = "pageNotFound.png";

export default function PageError() {
    return (
        <li className={styles.pageError}>
            <div className={style.fondo}>
                <div>
                    Error 404
                    <div>
                        Page Not Found
                        <div>
                            <img className={styles.imagen404}
                                width={700}
                                height={600}
                                src={imagenError}
                                alt=""
                            />
                            <div>
                                <Link to= "/">
                                    <button className={styleBoton.boton}>
                                    Volver</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}