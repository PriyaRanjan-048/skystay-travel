import { FC } from 'react';
import { FaPlane, FaSuitcase, FaSearch, FaMapMarkerAlt, FaHotel, FaSpinner } from 'react-icons/fa';

interface LoadingAnimationProps {
  message?: string;
  type?: 'flights' | 'hotels' | 'packages' | 'general';
  size?: 'small' | 'medium' | 'large';
  secondaryMessage?: string;
  showProgress?: boolean;
}

const LoadingAnimation: FC<LoadingAnimationProps> = ({ 
  message = "Finding the best flights for you...",
  type = "flights",
  size = "medium",
  secondaryMessage,
  showProgress = true
}) => {
  let Icon = FaPlane;
  let animationColor = "text-blue-500";
  let defaultSecondaryMessage = "We're searching hundreds of airlines to find your perfect flight";
  
  if (type === 'hotels') {
    Icon = FaHotel;
    animationColor = "text-green-500";
    defaultSecondaryMessage = "We're searching top hotel chains to find your perfect stay";
  } else if (type === 'packages') {
    Icon = FaSuitcase;
    animationColor = "text-amber-500";
    defaultSecondaryMessage = "We're finding the best flight and hotel packages for your trip";
  } else if (type === 'general') {
    Icon = FaSearch;
    animationColor = "text-purple-500";
    defaultSecondaryMessage = "We're searching to find the best options for you";
  }

  const finalSecondaryMessage = secondaryMessage || defaultSecondaryMessage;
  
  // Set dimensions based on size prop
  const dimensions = {
    small: {
      container: "p-4 h-40",
      spinner: "w-10 h-10 border-2",
      icon: "w-4 h-4",
      messageText: "text-sm",
      secondaryText: "text-xs",
      dotsSize: "w-1.5 h-1.5",
      progressWidth: "w-36"
    },
    medium: {
      container: "p-8 h-80",
      spinner: "w-16 h-16 border-4",
      icon: "w-6 h-6",
      messageText: "text-base",
      secondaryText: "text-sm",
      dotsSize: "w-2 h-2",
      progressWidth: "w-56"
    },
    large: {
      container: "p-10 h-96",
      spinner: "w-20 h-20 border-4",
      icon: "w-8 h-8",
      messageText: "text-lg",
      secondaryText: "text-base",
      dotsSize: "w-2.5 h-2.5",
      progressWidth: "w-72"
    }
  };
  
  const dim = dimensions[size];
  
  const spinnerColorClass = 
    type === 'flights' ? 'border-blue-500 border-t-transparent' :
    type === 'hotels' ? 'border-green-500 border-t-transparent' :
    type === 'packages' ? 'border-amber-500 border-t-transparent' : 
    'border-purple-500 border-t-transparent';
  
  const iconColorClass = 
    type === 'flights' ? 'text-blue-600' :
    type === 'hotels' ? 'text-green-600' :
    type === 'packages' ? 'text-amber-600' : 
    'text-purple-600';
  
  const dotsColorClass = 
    type === 'flights' ? 'bg-blue-500' :
    type === 'hotels' ? 'bg-green-500' :
    type === 'packages' ? 'bg-amber-500' : 
    'bg-purple-500';
  
  const progressBarColorClass = 
    type === 'flights' ? 'bg-blue-500' :
    type === 'hotels' ? 'bg-green-500' :
    type === 'packages' ? 'bg-amber-500' : 
    'bg-purple-500';
  
  return (
    <div className={`bg-white rounded-xl shadow-md ${dim.container} flex flex-col items-center justify-center`}>
      <div className="relative">
        {/* Outer spinning circle */}
        <div className={`${dim.spinner} ${spinnerColorClass} rounded-full animate-spin mb-4`}></div>
        
        {/* Icon in the middle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Icon className={`${dim.icon} ${iconColorClass}`} />
        </div>
        
        {/* Animated elements */}
        <div className="absolute w-full h-full">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
            <FaPlane className="w-3 h-3 text-gray-400 animate-bounce" style={{ animationDuration: '2s' }} />
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
            <FaSuitcase className="w-3 h-3 text-gray-400 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>

      <p className={`text-gray-700 font-medium mt-6 ${dim.messageText}`}>{message}</p>
      
      {/* Animated dots */}
      <div className="mt-4 flex space-x-2">
        <div className={`${dim.dotsSize} ${dotsColorClass} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
        <div className={`${dim.dotsSize} ${dotsColorClass} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
        <div className={`${dim.dotsSize} ${dotsColorClass} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
      </div>
      
      {/* Progress bar */}
      {showProgress && (
        <div className={`${dim.progressWidth} h-1 bg-gray-200 rounded-full mt-6 overflow-hidden`}>
          <div className={`h-full ${progressBarColorClass} rounded-full animate-progress`}></div>
        </div>
      )}
      
      {finalSecondaryMessage && (
        <p className={`${dim.secondaryText} text-gray-500 mt-4 max-w-xs text-center`}>
          {finalSecondaryMessage}
        </p>
      )}
    </div>
  );
};

export default LoadingAnimation;
