'use client';

import { useState } from 'react';
import { ThumbsUp, CheckCircle, X } from 'lucide-react';
import Image from 'next/image';
import { StarRating } from './StarRating';
import type { Review } from '@/types/review';

interface ReviewCardProps {
  review: Review;
  onHelpful?: (reviewId: string) => void;
}

export function ReviewCard({ review, onHelpful }: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const shouldTruncate = review.comment.length > 300;
  const displayComment =
    isExpanded || !shouldTruncate
      ? review.comment
      : review.comment.slice(0, 300) + '...';

  return (
    <>
      <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-dark-800 p-6 hover:border-dark-700 transition-all">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-500/20 to-purple-500/20 border border-accent-500/30 flex items-center justify-center text-lg font-bold text-accent-400">
              {review.userAvatar ? (
                <Image
                  src={review.userAvatar}
                  alt={review.userName}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              ) : (
                review.userName.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-dark-50">
                  {review.userName}
                </h4>
                {review.verified && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs">
                    <CheckCircle className="w-3 h-3" />
                    <span>Compra verificada</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-dark-400">
                {new Date(review.createdAt).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Rating */}
          <StarRating rating={review.rating} size="sm" />
        </div>

        {/* Title */}
        {review.title && (
          <h5 className="font-semibold text-dark-100 mb-2">{review.title}</h5>
        )}

        {/* Comment */}
        <p className="text-dark-300 leading-relaxed mb-4">{displayComment}</p>

        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-accent-400 hover:text-accent-300 font-medium text-sm mb-4 transition-colors"
          >
            {isExpanded ? 'Ver menos' : 'Ver más'}
          </button>
        )}

        {/* Images */}
        {review.images && review.images.length > 0 && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {review.images.map((image, index) => (
              <button
                key={`review-image-${review.id}-${index}`}
                type="button"
                onClick={() => setSelectedImage(image)}
                className="relative w-20 h-20 rounded-lg overflow-hidden hover:opacity-75 transition-opacity ring-1 ring-dark-700 hover:ring-accent-500/50"
              >
                <Image
                  src={image}
                  alt={`Review image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center gap-4 pt-4 border-t border-dark-800">
          <button
            onClick={() => onHelpful?.(review.id)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-dark-400 hover:bg-dark-800 hover:text-dark-200 rounded-lg transition-colors"
          >
            <ThumbsUp className="w-4 h-4" />
            <span>Útil ({review.helpful})</span>
          </button>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <button
          type="button"
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer border-none"
          onClick={() => setSelectedImage(null)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setSelectedImage(null);
            }
          }}
          aria-label="Cerrar imagen"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            className="absolute top-4 right-4 w-10 h-10 bg-dark-800 border border-dark-700 rounded-full flex items-center justify-center hover:bg-dark-700 transition-colors z-10"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6 text-dark-300" />
          </button>
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full pointer-events-none">
            <Image
              src={selectedImage}
              alt="Imagen ampliada de la reseña"
              fill
              className="object-contain"
            />
          </div>
        </button>
      )}
    </>
  );
}
