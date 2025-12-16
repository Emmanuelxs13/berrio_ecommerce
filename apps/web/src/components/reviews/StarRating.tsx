'use client';

import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  interactive = false,
  onRatingChange,
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleClick = (value: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= Math.round(rating);
        const isPartial = starValue === Math.ceil(rating) && rating % 1 !== 0;

        return (
          <button
            key={`star-rating-${starValue}`}
            type="button"
            onClick={() => handleClick(starValue)}
            disabled={!interactive}
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
            aria-label={`${starValue} estrella${starValue > 1 ? 's' : ''}`}
          >
            {isPartial ? (
              <div className="relative">
                <Star
                  className={`${sizeClasses[size]} text-gray-300`}
                  fill="currentColor"
                />
                <div
                  className="absolute top-0 left-0 overflow-hidden"
                  style={{ width: `${(rating % 1) * 100}%` }}
                >
                  <Star
                    className={`${sizeClasses[size]} text-yellow-400`}
                    fill="currentColor"
                  />
                </div>
              </div>
            ) : (
              <Star
                className={`${sizeClasses[size]} ${
                  isFilled ? 'text-yellow-400' : 'text-dark-700'
                }`}
                fill="currentColor"
              />
            )}
          </button>
        );
      })}
      {showValue && (
        <span className="ml-2 text-sm font-semibold text-dark-300">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
