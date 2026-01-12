  import React, { useState } from "react";
  import "./LogicaP2.css";
  import HamburgerButton from "./hamburgesa.jsx";
  import Sidebar from "./sidebar.jsx";
  import SidebarC from "./sidebarc.jsx";
  // import Overlay from "./overlay.jsx";
  import Hotspot from "./hotspot.jsx";  
  import InfoOverlay from "./infooverlay.jsx";
  import ReturnButton from "./returnbutton.jsx";
  import useSidebar from "./useSidebar";
  import { CustomCanvas, ModelLoader, OceanComponent, SkyComponent } from "@/components/SceneComp";


  export default function LogicaP2() {
    const [isModalOver, setIsModalOver] = useState(false);
    const {
      isSidebarOpen,
      isSidebarCOpen,
      toggleSidebar,
      toggleSidebarC,
      closeAllSidebars,
      handleOpenContactSidebar,
      handleOpenChatSidebar,
      handleOpenPregSidebar,
      handleOpenTermiSidebar,
    } = useSidebar();
  
    // const handleRedirect = () => {
    //   window.location.href = "./";
    // };|| isSidebarCOpen==="contacto" || isSidebarCOpen === "faq" ||isSidebarCOpen === "chatbot" ||isSidebarCOpen === "terminos"|| isSidebarCOpen==="contacto" || isSidebarCOpen === "faq" ||isSidebarCOpen === "chatbot" ||isSidebarCOpen === "terminos"

    return (
      <>
{/* <HamburgerButton
  isActive={isSidebarOpen || isSidebarCOpen !== null} // Activo si cualquier sidebar está abierto
  onClick={() => {
    if (isSidebarOpen || isSidebarCOpen !== null) {
      closeAllSidebars(); // Cierra todos los sidebars
    } else {
      toggleSidebar(); // Abre el sidebar general si está cerrado
    }
  }}
/> */}

  <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar}>
    <ul className="lista">
    <li><a  onClick={handleOpenContactSidebar}>Contacto</a></li>
    <li><a onClick={handleOpenPregSidebar}>Preguntas Frecuentes</a></li>
    <li><a onClick={handleOpenChatSidebar}>Chatbot</a></li>
    <li><a onClick={handleOpenTermiSidebar}>Términos y Condiciones</a></li>

    </ul>
  </Sidebar>
  <SidebarC isOpen={isSidebarCOpen === "contacto"} onClose={toggleSidebar}>
  <ul className="listan">
        <li><h1>Contacto Alternativo</h1></li>
        <li className="video">
          <video width="520" height="340" controls controlsList="nodownload">
            <source src="videos/alveariumExampleVideo.mp4" type="video/mp4" />
            Tu navegador no soporta la etiqueta de video.
          </video>
        </li>
        {/* <li><h3><a>Más información de contacto</a></h3></li> */}
        <li><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex deserunt voluptas sequi dolores ipsam architecto atque ipsa voluptatum laboriosam cumque exercitationem nihil, velit ut officia tempore sunt necessitatibus repudiandae distinctio?</p></li>
        <li><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex deserunt voluptas sequi dolores ipsam architecto atque ipsa voluptatum laboriosam cumque exercitationem nihil, velit ut officia tempore sunt necessitatibus repudiandae distinctio?</p></li>

      </ul>
  </SidebarC>

  <SidebarC isOpen={isSidebarCOpen === "faq"} onClose={toggleSidebarC}>
  <ul className="listan">
        <li><h1>Preguntas Frecuentes</h1></li>
        <li>
          <video width="520" height="340" controls controlsList="nodownload">
            <source src="videos/alveariumExampleVideo.mp4" type="video/mp4" />
            Tu navegador no soporta la etiqueta de video.
          </video>
        </li>
        {/* <li><h3><a>Más información de contacto</a></h3></li>*/}
        <li><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex deserunt voluptas sequi dolores ipsam architecto atque ipsa voluptatum laboriosam cumque exercitationem nihil, velit ut officia tempore sunt necessitatibus repudiandae distinctio?</p></li>
        <li><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex deserunt voluptas sequi dolores ipsam architecto atque ipsa voluptatum laboriosam cumque exercitationem nihil, velit ut officia tempore sunt necessitatibus repudiandae distinctio?</p></li>

      </ul>
  </SidebarC>

  <SidebarC isOpen={isSidebarCOpen === "chatbot"} onClose={toggleSidebarC}>
  <ul className="listan">
        <li><h1>ChatBot</h1></li>
        <li>
          <video width="520" height="340" controls controlsList="nodownload">
            <source src="videos/alveariumExampleVideo.mp4" type="video/mp4" />
            Tu navegador no soporta la etiqueta de video.
          </video>
        </li>
        <li>
        {/* <ModelLoader position={[0,0.1, 5] } rotation={[0, 240 * (Math.PI / 180), 0]} url={"/models/Alvy-AI_Alvearium.glb"}/>  */}
        </li>
        {/* <li><h3><a>Más información de contacto</a></h3></li>*/}
        <li><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex deserunt voluptas sequi dolores ipsam architecto atque ipsa voluptatum laboriosam cumque exercitationem nihil, velit ut officia tempore sunt necessitatibus repudiandae distinctio?</p></li>
        <li><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex deserunt voluptas sequi dolores ipsam architecto atque ipsa voluptatum laboriosam cumque exercitationem nihil, velit ut officia tempore sunt necessitatibus repudiandae distinctio?</p></li>

      </ul>
  </SidebarC>

  <SidebarC isOpen={isSidebarCOpen === "terminos"} onClose={toggleSidebarC}>
  <ul className="listan">
        <li><h1>Términos y Condiciones</h1></li>
        <li>
          <video width="520" height="340" controls controlsList="nodownload">
            <source src="videos/alveariumExampleVideo.mp4" type="video/mp4" />
            Tu navegador no soporta la etiqueta de video.
          </video>
        </li>
        {/* <li><h3><a>Más información de contacto</a></h3></li>*/}
        <li><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex deserunt voluptas sequi dolores ipsam architecto atque ipsa voluptatum laboriosam cumque exercitationem nihil, velit ut officia tempore sunt necessitatibus repudiandae distinctio?</p></li>
        <li><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex deserunt voluptas sequi dolores ipsam architecto atque ipsa voluptatum laboriosam cumque exercitationem nihil, velit ut officia tempore sunt necessitatibus repudiandae distinctio?</p></li>

      </ul>
  </SidebarC>

        {/* <SidebarC isOpen={isSidebarCOpen} onClose={closeAllSidebars}>
          <ul className="listan">
        <li><h1><a href="#home">Contacto Alternativo</a></h1></li>
        <li>
          <video width="520" height="340" controls controlsList="nodownload">
            <source src="/videos/alveariumExampleVideo.mp4" type="video/mp4" />
            Tu navegador no soporta la etiqueta de video.
          </video>
        </li>
        {/* <li><h3><a>Más información de contacto</a></h3></li> 
        <li><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex deserunt voluptas sequi dolores ipsam architecto atque ipsa voluptatum laboriosam cumque exercitationem nihil, velit ut officia tempore sunt necessitatibus repudiandae distinctio?</p></li>
        <li><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex deserunt voluptas sequi dolores ipsam architecto atque ipsa voluptatum laboriosam cumque exercitationem nihil, velit ut officia tempore sunt necessitatibus repudiandae distinctio?</p></li>

      </ul>
          </SidebarC> 
          */}
 
        {/* <Overlay
          isVisible={isSidebarOpen || isSidebarCOpen !== null}
          onClick={() => {
            closeAllSidebars();
            setIsModalOver(false);
          }}
        /> */}

         <Hotspot
          onClick={handleOpenContactSidebar}
          onMouseEnter={() => setIsModalOver(true)}
          onMouseLeave={() => setIsModalOver(false)}
        /> 

      <InfoOverlay isVisible={isModalOver} />
      
      

    </>
  );
}
