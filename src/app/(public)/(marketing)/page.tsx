import { AssessmentTypesSection } from "@/components/layout/home/AssessmentTypeSetion";
import { AudienceSection } from "@/components/layout/home/AudienceSection";
import { FAQSection } from "@/components/layout/home/FAQSection";
import { FinalCTASection } from "@/components/layout/home/FinalCTASection";
import HeroSection from "@/components/layout/home/HeroSection";
import { HowItWorksSection } from "@/components/layout/home/HowItWorks";
import { WhyDevAssessSection } from "@/components/layout/home/WhyDevAssSection";
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
