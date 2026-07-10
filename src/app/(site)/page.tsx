import src1 from "../../../public/app-1@2x.webp";
import src2 from "../../../public/app-2@2x.webp";

import { HomePageAbout } from "@/components/home-page-about";
import { HomePageAgents } from "@/components/home-page-agents";
import { HomePageAppBar } from "@/components/home-page-app-bar";
import { HomePageAppImage } from "@/components/home-page-app-image";
import { HomePageContact } from "@/components/home-page-contact";
import { HomePageCommunity } from "@/components/home-page-community";
import { HomePageCurtain } from "@/components/home-page-curtain";
import { HomePageCurtainButton } from "@/components/home-page-curtain-button";
import { HomePageFooter } from "@/components/home-page-footer";
import { HomePageLab } from "@/components/home-page-lab";
import { HomePageProjects } from "@/components/home-page-projects";

const Home = () => {
  return (
    <HomePageCurtain underlay={<HomePageAgents />}>
      <HomePageAppBar />

      <main className="overflow-hidden bg-cream-50">
        <HomePageAbout />

        <div className="relative pt-8 sm:pt-0">
          <HomePageAppImage src={src1} />

          <HomePageCurtainButton className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2" />
        </div>

        <HomePageLab />
        <HomePageProjects />
        <HomePageCommunity />
        <HomePageContact />

        <HomePageAppImage src={src2} />
      </main>

      <HomePageFooter />
    </HomePageCurtain>
  );
};

export default Home;
