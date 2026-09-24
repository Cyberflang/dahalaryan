import Image from "next/image";
import { person } from "../../lib/site-data";

/** Profile photo used as the hero's visual anchor. */
export function HeroPanel() {
  return (
    <div className="relative mx-auto w-56 max-w-full sm:w-72 lg:mx-0 lg:w-full lg:max-w-sm">
      <div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 rounded-full bg-accent/[0.12] blur-3xl"
      />

      <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_1px_0_0_rgba(0,0,0,0.02)]">
        <Image
          src="/images/james.png"
          alt={`Portrait of ${person.name}`}
          fill
          priority
          sizes="(min-width: 1024px) 24rem, (min-width: 640px) 18rem, 14rem"
          className="object-cover"
        />
      </div>
    </div>
  );
}
