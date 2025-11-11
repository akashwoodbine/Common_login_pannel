import React from 'react';

type LogoItemProps = {
  src: string;
  title: string;
};

const LogoItem: React.FC<LogoItemProps> = ({ src, title }) => (
  <div className="flex flex-col items-center mx-4">
    <img
      src={src}
      alt={title}
      className="w-10 h-10 object-contain mb-2 shadow-md rounded-lg"
    />
  </div>
);

export const LogoListScreen: React.FC = () => {
  return (
    <div className="bg-white flex flex-col items-center pt-10 justify-center">
      {/* Centered Heading */}
    

      {/* Logos Row */}
      <div className="flex flex-row justify-center items-center flex-wrap">
        <LogoItem src="../components/Images/prernaLogo.png" title="Prerna" />
        <LogoItem src="../components/Images/upgovtLogo.png" title="Ashoka Pillar" />
        <LogoItem src="../components/Images/ashokStumb.png" title="Uttar Pradesh Government" />
      </div>
      <div>
      <h1 className="text-4xl font-bold text-[#FFB57F]  drop-shadow-sm text-center">
        Pragati Setu
      </h1>
      </div>
    </div>
  );
};
