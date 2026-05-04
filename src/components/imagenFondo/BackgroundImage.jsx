import { asset } from "@/utils/basePath";

const BackgroundImage = () => {
  return (
    // <div className="relative w-full min-h-screen overflow-hidden">
      
    //   {/* Imagen de fondo */}
    //   <div
    //    className="relative w-full min-h-screen overflow-hidden"
    //     // style={{
    //     //   backgroundImage: `url(${asset("img/FONDO NUBES.png")})`,
    //     // }}
    //   >
    <img
        src={asset("img/FONDO NUBES.png")}
        alt="fondo"
        className="fixed inset-0 w-full h-full object-cover -z-10"
    />
    //   </div>

      /* <div className="relative z-10">
        {children}
      </div> */
    // </div>
  );
};

export default BackgroundImage;