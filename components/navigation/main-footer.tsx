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
} from "lucide-react";

export function MainFooter() {
  return (
    <footer className="bg-gray-100">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-gray-800">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold">
              <Package className="h-6 w-6" />
              <span className="text-xl">MultiVendor</span>
            </Link>
            <p className="mt-4 text-gray-600">
              A multivendor e-commerce platform connecting customers with quality vendors.
            </p>
            <div className="mt-6 flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="Facebook">
                  <Facebook className="h-5 w-5 text-gray-600" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="Twitter">
                  <Twitter className="h-5 w-5 text-gray-600" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="Instagram">
                  <Instagram className="h-5 w-5 text-gray-600" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5 text-gray-600" />
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Quick Links</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
              <li><Link href="/products" className="hover:text-blue-600">Products</Link></li>
              <li><Link href="/vendors" className="hover:text-blue-600">Vendors</Link></li>
              <li><Link href="/vendor/register/start" className="hover:text-blue-600">Become a Vendor</Link></li>
              <li><Link href="/about" className="hover:text-blue-600">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Contact Information</h3>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                <span>123 Market St, San Francisco, CA 94103</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-blue-600" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-blue-600" />
                <span>support@multivendor.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Subscribe to Our Newsletter</h3>
            <p className="mb-4 text-gray-600">
              Get the latest updates on new products and upcoming sales.
            </p>
            <form className="space-y-2">
              <Input placeholder="Your email address" type="email" />
              <Button className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300">
        <div className="container flex flex-col items-center justify-between py-6 md:flex-row">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} MultiVendor Marketplace. All rights reserved.
          </p>
          <div className="mt-4 flex gap-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-blue-600">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:text-blue-600">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
