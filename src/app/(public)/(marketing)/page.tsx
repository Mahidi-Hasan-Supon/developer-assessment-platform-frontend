import HeroSection from "@/components/layout/home/HeroSection";
import { HowItWorksSection } from "@/components/layout/home/HowItWorks";
import React from "react";

const PublicHomePage = () => {
  return (
    <div>
      <HeroSection />
      <HowItWorksSection />
      <AssessmentTypesSection />
      <WhyDevAssessSection />
      <AudienceSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
};

export default PublicHomePage;
