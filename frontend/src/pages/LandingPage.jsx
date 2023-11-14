import landingPic from "../images/landingPicture.jpg"
import "./landing.css" ;

export const LandingPage = () => {
    return (
        <div className="landing-Container">
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
            <div className="bottom-section">
                <div className="section-two">
                    <span>See our wonderFull graduates</span>
                </div>
                <div className="section-three">
                <img src="../images/github.svg" alt="GithubIcon" />
                    <span>Log in with Github</span>
                </div>
            </div>
        </div>

    );
    
} 