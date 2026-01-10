import React from 'react';
import Viewer from "@/components/logicaP2/modelviewer";

const Contacto = () => {
    return (
        <>
            <ul className="listan">
                <li><h1>Contacto</h1></li>

                <li style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                }}>
                    <Viewer modelUrl="@/public/models/Alvearium-TarjetaVirtual(1).glb" />

                    <div className="infocontacto">
                        <p>Lmfernandez@alvearium.io</p>
                        <p>(+34)625804391</p>
                        <p>Palacio de Santoña(Sede Cámara de Comercio de Madrid), C. de las Huertas, 13, Centro, 28012 Madrid</p>
                        <div className="flex items-center space-x-1">
                            <a
                                href="https://www.linkedin.com/company/alveariumvr/"
                                className=""
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="w-20 h-20 sm:w-24 sm:h-24 redes-img">
                                    <img
                                        src="/img/icons/icons8-linkedin.svg"
                                        alt="LinkedIn"
                                        className="w-full h-full object-cover rounded"
                                        loading="lazy"
                                    />
                                </div>
                            </a>

                            <div className="w-20 h-20 sm:w-24 sm:h-24 redes-img bg-black">
                                <img
                                    src="/img/QR.jpg"
                                    alt="QR"
                                    className="w-full h-full object-cover rounded"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <p>¿Quieres estar al día de todas las novedades, o colaborar en el proyecto? Contacta con nosotros y síguenos en redes</p>
                </li>

                {/* Redes Sociales */}
                <li className="p-4 rounded text-center text-white">
                    <div className="flex justify-between items-center w-full max-w-md mx-auto">
                        <a
                            href="https://www.linkedin.com/company/alveariumvr/"
                            className="flex-1 mx-2"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="w-20 h-20 sm:w-24 sm:h-24 redes-img">
                                <img
                                    src="/img/icons/icons8-linkedin.svg"
                                    alt="LinkedIn"
                                    className="w-full h-full object-cover rounded"
                                    loading="lazy"
                                />
                            </div>
                        </a>
                        <a
                            href="https://www.instagram.com/alvearium_/"
                            className="flex-1 mx-2"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="w-20 h-20 sm:w-24 sm:h-24 redes-img">
                                <img
                                    src="/img/icons/icons8-insta.svg"
                                    alt="Instagram"
                                    className="w-full h-full object-cover rounded"
                                    loading="lazy"
                                />
                            </div>
                        </a>
                        <a
                            href="https://www.facebook.com/people/Alvearium/100083367819508/"
                            className="flex-1 mx-2"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="w-20 h-20 sm:w-24 sm:h-24 redes-img">
                                <img
                                    src="/img/icons/icons8-facebook.svg"
                                    alt="Facebook"
                                    className="w-full h-full object-cover rounded"
                                    loading="lazy"
                                />
                            </div>
                        </a>
                        <a
                            href="https://x.com/alvearium__"
                            className="flex-1 mx-2"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="w-20 h-20 sm:w-24 sm:h-24 redes-img">
                                <img
                                    src="/img/icons/6627-x-logo.png"
                                    alt="Twitter"
                                    className="w-full h-full object-cover rounded"
                                    loading="lazy"
                                />
                            </div>
                        </a>
                    </div>
                </li>
            </ul>
        </>
    );
}

export default Contacto;