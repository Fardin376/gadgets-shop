import Image from 'next/image';

function HomePageBanner() {
  return (
    <div className="banner-wrapper">
      <div className="banner-content">
        <div>
          <h1>Winter Sale!</h1>
          <p className="banner-content-p1">Enjoy discounts on selected items</p>
          <p className="banner-content-p2">GET UPTO 50% OFF</p>
        </div>
        <div className="banner-image-wrapper">
          <Image
            src="/banner-img.png"
            alt="banner-img"
            width={500}
            height={500}
            className="object-contain w-full h-full"
            priority
          />
        </div>
      </div>
    </div>
  );
}
export default HomePageBanner;
