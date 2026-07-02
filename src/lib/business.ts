export const business = {
  name: "MR Decors",
  tagline: "Decor Solutions Forever",
  phoneDisplay: "+91 98943 31398",
  phoneLink: "tel:+919894331398",
  whatsappNumber: "919894331398",
  address: "Municipal Colony, Sathy Road, Veerappanchatram, Erode 638004",
  hours: "Open daily · 7:00 AM – 12:00 AM",
  mapsEmbedSrc:
    "https://www.google.com/maps?q=Municipal+Colony,+Sathy+Road,+Veerappanchatram,+Erode+638004&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Municipal+Colony,+Sathy+Road,+Veerappanchatram,+Erode+638004",
  instagram: "https://www.instagram.com/mr_laser_art/",
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/craftsmanship", label: "Craftsmanship" },
  { href: "/about", label: "About" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
] as const;
