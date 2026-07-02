import { whatsappLink } from "@/lib/business";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink("Hi MR Decors, I'd like to enquire about event decor.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with MR Decors on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/20 transition-transform hover:scale-105 active:scale-95"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="white"
        aria-hidden="true"
      >
        <path d="M16.004 3c-7.18 0-13 5.82-13 13 0 2.29.6 4.44 1.65 6.3L3 29l6.87-1.6a12.94 12.94 0 0 0 6.13 1.56h.01c7.18 0 13-5.82 13-13s-5.82-13-13-13Zm0 23.72h-.01a10.72 10.72 0 0 1-5.46-1.5l-.39-.23-4.08.95.97-3.98-.25-.41a10.72 10.72 0 0 1-1.65-5.55c0-5.93 4.83-10.76 10.78-10.76 2.88 0 5.58 1.12 7.62 3.16a10.7 10.7 0 0 1 3.16 7.61c0 5.93-4.83 10.71-10.69 10.71Zm5.89-8.02c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.51-.16-.73.16-.21.32-.84 1.05-1.03 1.26-.19.21-.38.24-.7.08-.32-.16-1.35-.5-2.57-1.6-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.38.48-.56.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.73-1.76-1-2.41-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.85.4-.29.32-1.12 1.1-1.12 2.67s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.82.67.77.24 1.46.21 2.02.13.62-.09 1.9-.78 2.16-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37Z" />
      </svg>
    </a>
  );
}
