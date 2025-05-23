"use client";

import { useState, useEffect } from "react"; // ✅ Added hooks
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Package,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronUp as ChevronUpIcon,
} from "lucide-react";

export function MainFooter() {
  const [showScrollTop, setShowScrollTop] = useState(false); // ✅ State for scroll detection

  // ✅ Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 100); // Show button after scrolling 100px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 relative">
      <div className="py-8 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-white px-4 md:px-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold">
              <Package className="h-6 w-6 text-orange-600" />
              <span className="text-xl text-white tracking-widest">JEMFAVE</span>
            </Link>
            <p className="mt-4 text-white">
              #1 Global Student Shopping Platform
            </p>
            <div className="mt-6 flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="Facebook">
                  <Facebook className="h-5 w-5 fill-orange-600 text-orange-600" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="Twitter">
                  <Twitter className="h-5 w-5 fill-orange-600 text-orange-600" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="Instagram">
                  <Instagram className="h-5 w-5 text-orange-600" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5 fill-orange-600 text-orange-600" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Quick Links</h3>
            <ul className="space-y-2 text-white">
              <li><Link href="/" className="hover:text-orange-600 text-white">Home</Link></li>
              <li><Link href="/products" className="hover:text-orange-600 text-white">Products</Link></li>
              <li><Link href="/vendors" className="hover:text-orange-600 text-white">Vendors</Link></li>
              <li><Link href="/vendor/register/start" className="hover:text-orange-600 text-white">Become a Vendor</Link></li>
              <li><Link href="/about" className="hover:text-orange-600 text-white">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-orange-600 text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Contact Information</h3>
            <ul className="space-y-4 text-white">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600" />
                <span>123 Market St, San Francisco, CA 94103</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-orange-600" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-orange-600" />
                <span>support@jemfave.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Subscribe to Our Newsletter</h3>
            <p className="mb-4 text-white">
              Get the latest updates on new products and upcoming sales.
            </p>
            <form className="space-y-2">
              <Input placeholder="Your email address" type="email" />
              <Button className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button (Only show when scrolled 100px or more) */}
      {showScrollTop && (
        <div className="fixed bottom-6 right-6 z-50 flex justify-center mb-6">
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="bg-gray-100 text-white p-2 rounded-full shadow hover:bg-gray-100 transition"
          >
            <ChevronUpIcon className="h-5 w-5 text-black hover:text-white" />
          </button>
        </div>
      )}

      {/* Footer Bottom */}
      <div className="border-t border-gray-800">
        <div className="w-full px-4 md:px-8 flex flex-col items-center justify-between py-6 md:flex-row">
          <p className="text-center text-sm text-white">
            © {new Date().getFullYear()} Jemfave. All rights reserved.
          </p>
          <div className="mt-4 flex gap-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-white hover:text-orange-600">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-white hover:text-orange-600">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
