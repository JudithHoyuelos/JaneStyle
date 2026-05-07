import React from 'react';
import { asset } from '@/utils/basePath';

const FooterLinks = ({ isSidebarhmOpen }) => {
  return (
    <div
      className="fixed left-1/2 transform -translate-x-1/2 bottom-4 z-40 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
      style={{ bottom: '0%' }} 
    >
      {/* Redes sociales */}
      <div
        className={`mb-2 pt-2 rounded z-50 text-white ${
          isSidebarhmOpen ? 'translate-y-[300px]' : '-translate-y-0'
        } transition-transform duration-300`}
        id="redes"
        style={{
          userSelect: 'none',
          marginLeft: '50px', 
          marginRight: '30px', 
        }}
      >
        <div className="flex justify-center items-center w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          <SocialIcon
            href="https://www.linkedin.com/in/janet-cambr%C3%B3n-mart%C3%ADn-864b97268/"
            src={asset("img/icons/IN 2.png")}
            alt="LinkedIn"
          />
          <SocialIcon
            href="https://www.instagram.com/jane_style__/"
            src={asset("img/icons/IG 2.png")}
            alt="Instagram"
          />
          {/* <SocialIcon
            href="https://www.facebook.com/people/Alvearium/100083367819508/"
            src={asset("img/icons/icons8-facebook.svg")}
            alt="Facebook"
          />
          <SocialIcon
            href="https://x.com/alvearium__"
            src={asset("img/icons/6627-x-logo.png")}
            alt="Twitter"
          /> */}
        </div>
      </div>

      {/* Términos y condiciones
      <div className="w-full">
        <div className="flex flex-row flex-wrap items-center justify-center text-center gap-1 sm:gap-2 p-1 terminos">
          <FooterLink href="https://alvearium.io/bases-legales" text="Bases Legales" />
          <FooterLink href="https://alvearium.io/term-and-conditions" text="Términos y condiciones" />
          <FooterLink href="https://alvearium.io/privacy-policy" text="Política de privacidad" />
        </div>
      </div> */}
    </div>
  );
};

const SocialIcon = ({ href, src, alt }) => (
  <a
    href={href}
    className="mx-0.5"
    target="_blank"
    rel="noopener noreferrer"
    style={{ pointerEvents: 'auto' }}
  >
    <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded"
        loading="lazy"
      />
    </div>
  </a>
);

const FooterLink = ({ href, text }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-white underline"
  >
    {text}
  </a>
);

export default FooterLinks;
