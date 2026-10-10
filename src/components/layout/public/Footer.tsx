import React from "react";
import Link from "next/link";
import Logo from "@/asserts/svg/logo";
import { Button } from "@/components/ui/button";
import { Globe, Mail, Share2, Heart, ShieldCheck, FileText } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background text-foreground mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Logo />
              <span>DevAssess</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering developers and hiring teams with smart assessment tools and real-world skills evaluation.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/assessments" className="hover:text-foreground transition-colors">
                  Assessments
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contract" className="hover:text-foreground transition-colors">
                  Contract
                </Link>
              </li>
            </ul>
          </div>

          {/* Support / Legal Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">
              Legal & Support
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social / Contact Icons */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">
              Contact & Connect
            </h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" >
                <a href="https://devassess.com" target="_blank" rel="noreferrer" aria-label="Website">
                  <Globe className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon">
                <a href="mailto:support@devassess.com" aria-label="Email">
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" >
                <a href="sad" aria-label="Share">
                  <Share2 className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-3">
          <p>
            © {currentYear} <span className="font-semibold text-foreground">DevAssess</span>. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> for Developers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;