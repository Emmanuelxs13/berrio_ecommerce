'use client';

import { useState } from 'react';
import { Star, Filter } from 'lucide-react';
import { StarRating } from './StarRating';
import { ReviewCard } from './ReviewCard';
import { ReviewForm } from './ReviewForm';
import { useAuthStore } from '@/store/auth';
import type { Review, ReviewSummary } from '@/types/review';

interface ProductReviewsProps {
  productId: string;
  productName: string;
  reviews: Review[];
  summary: ReviewSummary;
}

export function ProductReviews({
  productId,
  productName,
  reviews: initialReviews,
  summary,
}: ProductReviewsProps) {
  const { isAuthenticated } = useAuthStore();
  const [reviews, setReviews] = useState(initialReviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating'>(
    'recent'
  );

  const handleSubmitReview = async (reviewData: {
    rating: number;
    title: string;
    comment: string;
    images: string[];
  }) => {
    // TODO: Enviar al backend
    const newReview: Review = {
      id: Math.random().toString(36),
      productId,
      userId: 'current-user-id',
      userName: 'Usuario Actual',
      rating: reviewData.rating,
      title: reviewData.title,
      comment: reviewData.comment,
      images: reviewData.images,
      helpful: 0,
      verified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setReviews([newReview, ...reviews]);
    setShowReviewForm(false);
  };

  const handleHelpful = (reviewId: string) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId
          ? { ...review, helpful: review.helpful + 1 }
          : review
      )
    );
  };

  // Filtrar y ordenar reseñas
  let filteredReviews = filterRating
    ? reviews.filter((r) => r.rating === filterRating)
    : reviews;

  filteredReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'helpful':
        return b.helpful - a.helpful;
      case 'rating':
        return b.rating - a.rating;
      case 'recent':
      default:
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  });

  const ratingDistributionData = [
    {
      stars: 5,
      count: summary.distribution[5],
      percentage: (summary.distribution[5] / summary.totalReviews) * 100,
    },
    {
      stars: 4,
      count: summary.distribution[4],
      percentage: (summary.distribution[4] / summary.totalReviews) * 100,
    },
    {
      stars: 3,
      count: summary.distribution[3],
      percentage: (summary.distribution[3] / summary.totalReviews) * 100,
    },
    {
      stars: 2,
      count: summary.distribution[2],
      percentage: (summary.distribution[2] / summary.totalReviews) * 100,
    },
    {
      stars: 1,
      count: summary.distribution[1],
      percentage: (summary.distribution[1] / summary.totalReviews) * 100,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Summary Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Opiniones de Clientes
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
              <div className="text-6xl font-bold text-gray-900">
                {summary.averageRating.toFixed(1)}
              </div>
              <div>
                <StarRating rating={summary.averageRating} size="lg" />
                <p className="text-sm text-gray-600 mt-2">
                  {summary.totalReviews}{' '}
                  {summary.totalReviews === 1 ? 'opinión' : 'opiniones'}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                if (!isAuthenticated) {
                  alert('Debes iniciar sesión para escribir una reseña');
                  return;
                }
                setShowReviewForm(true);
              }}
              className="w-full lg:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
            >
              Escribir una opinión
            </button>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-3">
            {ratingDistributionData.map((item) => (
              <button
                key={item.stars}
                onClick={() =>
                  setFilterRating(
                    filterRating === item.stars ? null : item.stars
                  )
                }
                className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors ${
                  filterRating === item.stars
                    ? 'bg-blue-50 border-2 border-blue-500'
                    : ''
                }`}
              >
                <div className="flex items-center gap-1 w-24">
                  <span className="text-sm font-medium text-gray-700">
                    {item.stars}
                  </span>
                  <Star
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                  />
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">
                  {item.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">
            Mostrando {filteredReviews.length} de {reviews.length} opiniones
          </span>
          {filterRating && (
            <button
              onClick={() => setFilterRating(null)}
              className="ml-2 text-sm text-blue-600 hover:text-blue-700"
            >
              Limpiar filtro
            </button>
          )}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="recent">Más recientes</option>
          <option value="helpful">Más útiles</option>
          <option value="rating">Mejor calificación</option>
        </select>
      </div>

      {/* Reviews List */}
      {filteredReviews.length > 0 ? (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onHelpful={handleHelpful}
            />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-2xl p-12 text-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-10 h-10 text-gray-400" />
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            No hay opiniones
            {filterRating ? ` con ${filterRating} estrellas` : ''}
          </h4>
          <p className="text-gray-600 mb-6">
            {filterRating
              ? 'Intenta con otro filtro para ver más opiniones'
              : 'Sé el primero en compartir tu opinión sobre este producto'}
          </p>
          {!filterRating && (
            <button
              onClick={() => {
                if (!isAuthenticated) {
                  alert('Debes iniciar sesión para escribir una reseña');
                  return;
                }
                setShowReviewForm(true);
              }}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
            >
              Escribir la primera opinión
            </button>
          )}
        </div>
      )}

      {/* Review Form Modal */}
      {showReviewForm && (
        <ReviewForm
          productId={productId}
          productName={productName}
          onSubmit={handleSubmitReview}
          onCancel={() => setShowReviewForm(false)}
        />
      )}
    </div>
  );
}
