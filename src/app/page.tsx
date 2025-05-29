import {
  DownloadSection,
  FunctionalSection,
  HomePageTitle,
  OpportunitiesSection,
  ReviewsSection,
  SubscriptionSection
} from "~/app/components";

export default function Home() {

  return (
    <main className="">
      <a href="/" className="anchor" id="/"></a>
      <HomePageTitle />
      <SubscriptionSection />
      <a href="/#opportunities" className="anchor" id="opportunities" style={{scrollMarginTop: '60px'}}></a>
      <OpportunitiesSection />
      <a href="/#functional" className="anchor" id="functional" style={{scrollMarginTop: '40px'}}></a>
      <FunctionalSection />
      <a href="/#reviews" className="anchor" id="reviews"></a>
      <ReviewsSection />
      <DownloadSection />
    </main>
  );
}
