import React from "react";
import Image from "next/image";

const ProductHuntEmbed: React.FC = () => {
  return (
    <a
      href="https://www.producthunt.com/posts/trendfast-ai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-trendfast-ai"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=938320&theme=light&t=1741133259186"
        alt="TrendFast AI - AI agent to help content creators with viral videos | Product Hunt"
        width={250} // Adjust these numbers as needed
        height={100}
        className="max-w-[175px] md:max-w-[250px] w-auto h-auto mx-auto"
      />
    </a>
  );
};

export default ProductHuntEmbed;
