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
import Image from "next/image";

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
            <Link href="/" className="lg:flex hidden items-center gap-0 font-bold flex-row">
              {/* Logo Desktop */}
              <div className="bg-orange-600 text-gray-900 text-5xl rounded-full w-14 h-14 flex items-center justify-center font-bold">
                J
              </div>

              <div className="text-white font-bold text-4xl -ml-6">emfave</div>
            </Link>

            <Link href="/" className="flex lg:hidden items-center gap-0 font-bold flex-row">
              {/* Logo Mobile */}
              <div className="bg-orange-600 text-gray-900 text-4xl rounded-full w-12 h-12 flex items-center justify-center font-bold">
                J
              </div>

              <div className="text-white font-bold text-3xl -ml-5">emfave</div>
            </Link>
            <p className="mt-4 text-white">
              #1 Global Student Shopping App
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
            <ul className="space-y-2 text-white hidden md:block">
              <li><Link href="/" className="hover:text-orange-600 text-white">Home</Link></li>
              <li><Link href="/products" className="hover:text-orange-600 text-white">Products</Link></li>
              <li><Link href="/services" className="hover:text-orange-600 text-white">Services</Link></li>
              <li><Link href="/specials" className="hover:text-orange-600 text-white">Specials</Link></li>
              <li><Link href="/vendors" className="hover:text-orange-600 text-white">Vendors</Link></li>
              <li><Link href="/vendor/register/start" className="hover:text-orange-600 text-white">Become a Vendor</Link></li>
              <li><Link href="/about" className="hover:text-orange-600 text-white">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-orange-600 text-white">Contact</Link></li>
            </ul>

            <ul className="space-y-2 text-white flex flex-row justify-between md:hidden">
              <div>
                <li><Link href="/" className="hover:text-orange-600 text-white">Home</Link></li>
                <li><Link href="/products" className="hover:text-orange-600 text-white">Products</Link></li>
                <li><Link href="/services" className="hover:text-orange-600 text-white">Services</Link></li>
                <li><Link href="/specials" className="hover:text-orange-600 text-white">Specials</Link></li>
              </div>

              <div>
                <li><Link href="/vendors" className="hover:text-orange-600 text-white">Vendors</Link></li>
                <li><Link href="/vendor/register/start" className="hover:text-orange-600 text-white">Become a Vendor</Link></li>
                <li><Link href="/about" className="hover:text-orange-600 text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-orange-600 text-white">Contact</Link></li>
              </div>
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
              <Input placeholder="Your email address" type="email" className="text-white" />
              <Button className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button (Only show when scrolled 100px or more) */}
      {showScrollTop && (
        <div className="fixed bottom-6 right-6 z-10 flex justify-center mb-6">
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
