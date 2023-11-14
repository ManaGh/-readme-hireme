import landingPic from "../images/landingPicture.jpg"
import "./landing.css" ;

export const LandingPage = () => {
    return (
        <div>
            <div className="firstSection">
                <img className="landingPic" src = {landingPic} alt="landingPic" />
                <p className="landingText">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores 
                    ipsam nisi maxime, repellat amet repellendus soluta laborum dignissimos 
                    porro! Quis tempore libero repudiandae culpa ad architecto quam praesentium 
                    eius repellendus?
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores 
                    ipsam nisi maxime, repellat amet repellendus soluta laborum dignissimos 
                    porro! Quis tempore libero repudiandae culpa ad architecto quam praesentium 
                    eius repellendus?</p>
            </div>
            <div>
                <div>
                    <span></span>
                </div>
                <div>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>

    );
    
} 