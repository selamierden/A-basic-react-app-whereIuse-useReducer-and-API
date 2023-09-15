import React , {useState} from "react";
import { Play, Pause} from 'react-bootstrap-icons';

function VideoComponent() {

  const [isPlaying, setIsPlaying] = useState(false);

  const playPauseVideo = () => {
    var video = document.querySelector('video');

    if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false)
      }
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <video autoPlay loop muted src="img/video.mp4" style={{position: "absolute",top: 0,left: 0,width: "100%",height: "100%",objectFit: "cover",}}></video>
      <div className="container-fluid" style={{position: "absolute",top: 0,left: 0,width: "100%",height: "100%",display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "center",backgroundColor: "transparent",}}>
        <div className="row">
          <div className="col-md-5 container my-5"style={{paddingTop: "20px",borderRadius: "10px",backgroundColor: "transparent",}}>
            <div className="text-center">
              <h1 style={{ color: "white" }}>
                Register now for an easier, more regular, more profitable
                investment!
              </h1>
            </div>
            <div className="d-flex justify-content-center mt-4">
                <div>
                    <button className="btn" style={{width:"120px", height:"40px" , fontSize:"18px" ,backgroundColor: "darkblue", color: "white" , borderRadius: "4px"}}>Login</button>
                </div>
                <div>
                    <button className="btn" style={{marginLeft: "4px" , width:"120px", height:"40px" , fontSize:"18px" ,backgroundColor: "darkblue", color: "white" , borderRadius: "4px"}}>Register</button>
                </div>
            </div>
            <div className="row justify-content-center my-3">
              <div className="col-md-2">
                <button id="play-pause-button" onClick={playPauseVideo} className="btn btn-block hvr-shrink" style={{ color: "white", fontWeight: 600 }}>
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoComponent;
