import AssessmentCategoriesSection from "@/components/layout/home/AssessmentCategorieSetion";
import BlogSection from "@/components/layout/home/BlogSeciton";
import CompanyBenefitsSection from "@/components/layout/home/CompanyBenifitsSection";
import DeveloperBenefitsSection from "@/components/layout/home/CompanyBenifitsSection";
import FAQSection from "@/components/layout/home/FAQSection";
import FeaturesSection from "@/components/layout/home/FeatureSection";
import FinalCTASection from "@/components/layout/home/FinalCTASection";
import HeroSection from "@/components/layout/home/HeroSection";
import HowItWorksSection from "@/components/layout/home/HowItWorks";
import NewsletterSection from "@/components/layout/home/NewsletterSection";
import PopularAssessmentsSection from "@/components/layout/home/PopularAssessmentSection";
import StatisticsSection from "@/components/layout/home/statisticsSction";
import TestimonialsSection from "@/components/layout/home/TestimonialsSection";
import WhyDevAssessSection from "@/components/layout/home/WhyDevAssSection";

const PublicHomePage = () => {
  return (
    <div>
      <HeroSection />
      <StatisticsSection />
      <PopularAssessmentsSection />
      <HowItWorksSection />
      <AssessmentCategoriesSection />
       <FeaturesSection />
      <DeveloperBenefitsSection />
      <CompanyBenefitsSection />
      <WhyDevAssessSection />
      <TestimonialsSection />
      <BlogSection />
      <NewsletterSection />  
      <FAQSection />
      <FinalCTASection/>
    </div>
  );
};

export default PublicHomePage;
