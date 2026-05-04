import "./VideoBackground.css";
import { asset } from '@/utils/basePath';

const VideoBackground = () => {
    return (
        <div className="video-container">
            <video
                className="video-bg"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src={asset("videos/ANIMACION JANESTYLE fondo nubes.mp4")} type="video/mp4" />
                Tu navegador no soporta video HTML5
            </video>

            {/* <div className="overlay">
                <h1>Bienvenido</h1>
                <p>Tu contenido aquí</p>
            </div> */}
        </div>
    );
};

export default VideoBackground;