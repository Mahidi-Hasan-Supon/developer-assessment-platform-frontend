import AssessmentCategoriesSection from "@/components/layout/home/AssessmentCategorieSetion";
import BlogSection from "@/components/layout/home/BlogSeciton";
import CompanyBenefitsSection from "@/components/layout/home/CompanyBenifitsSection";
import DeveloperBenefitsSection from "@/components/layout/home/DeveloperBenefitsSection";
import FAQSection from "@/components/layout/home/FAQSection";
import FeaturesSection from "@/components/layout/home/FeatureSection";
import FinalCTASection from "@/components/layout/home/FinalCTASection";
import HeroSection from "@/components/layout/home/HeroSection";
import HomePageContent from "@/components/layout/home/HomePageContent";
import HowItWorksSection from "@/components/layout/home/HowItWorks";
import NewsletterSection from "@/components/layout/home/NewsletterSection";
import PopularAssessmentsSection from "@/components/layout/home/PopularAssessmentSection";
import StatisticsSection from "@/components/layout/home/statisticsSction";
import TestimonialsSection from "@/components/layout/home/TestimonialsSection";
import WhyDevAssessSection from "@/components/layout/home/WhyDevAssSection";
import HomePageLoading from "@/components/layout/public/HomePageLoading";

const PublicHomePage = () => {
  return (
    <div>
      <HomePageContent>
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
        <FinalCTASection />
      </HomePageContent>
    </div>
  );
};

export default PublicHomePage;
