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
          quam praesentium eius repellendus? Lorem ipsum dolor sit amet Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Sed temporibus
          velit dolor numquam eaque ducimus delectus ipsum impedit facilis
          asperiores error omnis, iusto fugiat consequatur quam nihil distinctio
          dicta. Dolorem.
        </p>
      </section>
      <section className="bottom-section">
        <a href="/graduates">
          <Button buttonName="See Our Wonderful Graduates" />
        </a>

        <a href="/trainee-form">
          <Button buttonName="Add Graduate" />
        </a>
      </section>
    </div>
  );
};
