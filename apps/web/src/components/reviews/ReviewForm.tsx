'use client';

import { useState } from 'react';
import { X, Camera } from 'lucide-react';
import { StarRating } from './StarRating';
import { useAuthStore } from '@/store/auth';
import Image from 'next/image';

interface ReviewFormProps {
  productId: string;
  productName: string;
  onSubmit: (review: {
    rating: number;
    title: string;
    comment: string;
    images: string[];
  }) => Promise<void>;
  onCancel: () => void;
}

export function ReviewForm({
  productId: _productId,
  productName,
  onSubmit,
  onCancel,
}: ReviewFormProps) {
  const { user } = useAuthStore();
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Simular upload de imágenes
    // En producción, subir a servidor/cloud storage
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (rating === 0) {
      newErrors.rating = 'Por favor selecciona una calificación';
    }
    if (!title.trim()) {
      newErrors.title = 'El título es requerido';
    }
    if (!comment.trim()) {
      newErrors.comment = 'El comentario es requerido';
    }
    if (comment.trim().length < 20) {
      newErrors.comment = 'El comentario debe tener al menos 20 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        rating,
        title: title.trim(),
        comment: comment.trim(),
        images,
      });
      // Reset form
      setRating(0);
      setTitle('');
      setComment('');
      setImages([]);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error al enviar la reseña. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Escribir Reseña
              </h2>
              <p className="text-sm text-gray-600 mt-1">{productName}</p>
            </div>
            <button
              onClick={onCancel}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Calificación *
            </label>
            <div className="flex items-center gap-4">
              <StarRating
                rating={rating}
                interactive
                onRatingChange={setRating}
                size="lg"
              />
              <span className="text-lg font-semibold text-gray-700">
                {rating > 0 ? (
                  <>
                    {rating} {rating === 1 ? 'estrella' : 'estrellas'}
                  </>
                ) : (
                  'Selecciona tu calificación'
                )}
              </span>
            </div>
            {errors.rating && (
              <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título de la reseña *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Resumen de tu experiencia"
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              maxLength={100}
            />
            <div className="flex items-center justify-between mt-1">
              {errors.title ? (
                <p className="text-sm text-red-600">{errors.title}</p>
              ) : (
                <p className="text-sm text-gray-500">Máximo 100 caracteres</p>
              )}
              <p className="text-sm text-gray-500">{title.length}/100</p>
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tu opinión *
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Cuéntanos sobre tu experiencia con este producto..."
              rows={6}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                errors.comment ? 'border-red-500' : 'border-gray-300'
              }`}
              maxLength={1000}
            />
            <div className="flex items-center justify-between mt-1">
              {errors.comment ? (
                <p className="text-sm text-red-600">{errors.comment}</p>
              ) : (
                <p className="text-sm text-gray-500">Mínimo 20 caracteres</p>
              )}
              <p className="text-sm text-gray-500">{comment.length}/1000</p>
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fotos (opcional)
            </label>
            <p className="text-sm text-gray-500 mb-3">
              Agrega hasta 5 fotos para compartir tu experiencia
            </p>

            {/* Image Preview */}
            {images.length > 0 && (
              <div className="flex gap-2 mb-3 flex-wrap">
                {images.map((image, index) => (
                  <div
                    key={`preview-image-${index}-${image.substring(0, 20)}`}
                    className="relative w-24 h-24 rounded-lg overflow-hidden group"
                  >
                    <Image
                      src={image}
                      alt={`Vista previa de imagen ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Button */}
            {images.length < 5 && (
              <label className="flex items-center justify-center gap-3 px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer">
                <Camera className="w-6 h-6 text-gray-400" />
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700">
                    Click para subir fotos
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG hasta 5MB</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* User Info */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">Publicar como:</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Publicando...' : 'Publicar Reseña'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
