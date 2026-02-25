"use client";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Adam Barron",
      designation: "President, Newzky Jsc",
      quote:
        '"Tech With Moonshot strategists guided us along a clear path to digital success. Their dedicated product owner crafted a detailed, data-driven plan, and the digital experts drove our remarkable performance."',
      src: "/images/testimonial-image.png",
    },
    {
      name: "Sofia Martinez",
      designation: "Head of Product, VeloPay",
      quote:
        '"Their team embedded seamlessly with ours, simplifying roadmaps and shipping on time. The results exceeded our projections and expectations. Partnership that delivered excellent value."',
      src: "/images/testimonial-image.png",
    },
    {
      name: "James Patel",
      designation: "CTO, Nimbus Cloudware",
      quote:
        '"From UX audits to production rollout, every step felt intentional. The collaboration unlocked speed without sacrificing quality and innovation. Their expertise was evident throughout our successful journey."',
      src: "/images/testimonial-image.png",
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative mt-10 lg:mt-20 1366:mt-30 1600:mt-40 font-sora"
    >
      {/* DottedMap Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" />
        <img
          src="/images/testimonials-map.png"
          alt="Dotted Map"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="relative">
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </section>
  );
}
