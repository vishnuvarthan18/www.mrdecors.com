export const business = {
  name: "MR Decors",
  tagline: "Decor Solutions Forever",
  phoneDisplay: "+91 98943 31398",
  phoneLink: "tel:+919894331398",
  whatsappNumber: "919894331398",
  address:
    "MR Decors @ MURA DECORS PRIVATE LIMITED, 18, Sathy Rd, near Bajaj showroom, Veerappanchatram, Erode, Tamil Nadu 638003",
  hours: "Open daily, 7:00 AM to 12:00 AM",
  instagramHandle: "mr_laser_art",
  mapsEmbedSrc:
    "https://www.google.com/maps?q=MURA+DECORS+PRIVATE+LIMITED,+18+Sathy+Rd,+Veerappanchatram,+Erode,+Tamil+Nadu+638003&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=MURA+DECORS+PRIVATE+LIMITED,+18+Sathy+Rd,+Veerappanchatram,+Erode,+Tamil+Nadu+638003",
  instagram: "https://www.instagram.com/mr_laser_art/",
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
