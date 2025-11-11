import React from 'react';
import { Link } from 'react-router-dom';

type DashboardItem = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  to?: string;
};

type DashboardColors = {
  titleColor?: string;
  iconColor?: string;
  descriptionColor?: string;
  cardHoverShadowColor?: string;
};

type DashboardProps = {
  title: string;
  welcomeContent?: React.ReactNode;
  items: DashboardItem[];
  colors?: DashboardColors;
  // Optional custom render function for item display
  renderItem?: (item: DashboardItem, colors: DashboardColors) => React.ReactNode;
};

export const Dashboard: React.FC<DashboardProps> = ({
  title,
  welcomeContent,
  items,
  colors = {},
  renderItem,
}) => {
  const {
    titleColor = '#000',
    iconColor = '#3b82f6', // Tailwind's blue-500
    descriptionColor = '#4b5563', // Tailwind's gray-600
    cardHoverShadowColor = '',
  } = colors;

  // Default card style render function
  const defaultRenderItem = (item: DashboardItem, colors: DashboardColors) => {
    const content = (
      <div
        className={`bg-white p-6 rounded-lg shadow-md border flex items-center space-x-4 transition-shadow hover:shadow-lg`}
        style={
          cardHoverShadowColor
            ? { boxShadow: `0 1px 3px 0 ${cardHoverShadowColor}` }
            : undefined
        }
      >
        {item.icon && (
          <div className="w-10 h-10" style={{ color: colors.iconColor }}>
            {item.icon}
          </div>
        )}
        <div>
          <h3 className="font-semibold text-lg">{item.title}</h3>
          <p className="mt-2" style={{ color: colors.descriptionColor }}>
            {item.description}
          </p>
        </div>
      </div>
    );

    if (item.to) {
      return (
        <Link to={item.to} key={item.title}>
          {content}
        </Link>
      );
    }

    return <div key={item.title}>{content}</div>;
  };

  const renderFunction = renderItem || defaultRenderItem;

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ color: titleColor }}>
          {title}
        </h1>
        {welcomeContent && <div className="text-lg">{welcomeContent}</div>}
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <React.Fragment key={item.title}>
            {renderFunction(item, colors)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
