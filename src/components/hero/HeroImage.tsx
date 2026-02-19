import Image from 'next/image';

// Generate this once via: https://plaiceholder.co/ or npx plaiceholder
const BLUR_DATA_URL = `data:image/webp;base64,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`;

const HeroImage: React.FC = () => {
  return (
    <div className="order-1 lg:order-2 w-1/2 lg:w-full lg:max-w-xl xl:max-w-2xl flex justify-center lg:justify-end animate-fade-right [animation-delay:180ms]">
      <div className="relative w-full aspect-square group max-w-50 sm:max-w-70 md:max-w-[320px] lg:max-w-none">
        <div className="absolute -top-3 md:-top-6 -right-3 md:-right-6 w-12 md:w-32 h-12 md:h-32 border-t-2 border-r-2 border-sky-500/30 rounded-tr-3xl md:rounded-tr-[3rem] group-hover:border-sky-500 transition-all duration-500" />
        <div className="absolute -bottom-3 md:-bottom-4 -left-3 md:-left-6 w-12 md:w-32 h-12 md:h-32 border-b-2 border-l-2 border-sky-500/30 rounded-bl-3xl md:rounded-bl-[3rem] group-hover:border-sky-500 transition-all duration-500" />

        <div className="relative w-full h-full overflow-hidden rounded-2xl md:rounded-4xl border border-white/10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)] group-hover:shadow-sky-500/10 transition-shadow duration-500">
          <Image
            src="/heroImage.webp"
            fill
            priority
            alt="Sunil Bhattarai"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 pointer-events-none" />
          <div className="absolute inset-x-0 top-1/4 h-1/3 bg-gradient-to-b from-transparent via-sky-500/15 to-transparent -skew-y-12 pointer-events-none hidden lg:block" />
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
