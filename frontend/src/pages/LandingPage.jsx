import landingPic from "../images/landingPicture.jpg";
// import githubIcon from "../images/github-mark.svg";
import Button from "../components/shared/Button";
import "./landing.css";

export const LandingPage = () => {
  return (
    <div className="landing-Container">
      <section className="firstSection">
        <img className="landingPic" src={landingPic} alt="landingPic" />
        <p className="landingText">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores
          ipsam nisi maxime, repellat amet repellendus soluta laborum
          dignissimos porro! Quis tempore libero repudiandae culpa ad architecto
          quam praesentium eius repellendus? Lorem ipsum dolor sit amet
        </p>
      </section>
      <section className="bottom-section">
        <Button
          buttonName="See Our Wonderful Graduates"
          className="section-two"
        />
        <Button buttonName="Add Graduate" className="section-two" />
      </section>
    </div>
  );
};
