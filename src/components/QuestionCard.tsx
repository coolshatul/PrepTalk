import { Edit, Trash2, Play, Globe, Lock, Tag, Volume2 } from 'lucide-react';
import { Question } from '@/types';
import { useState } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface QuestionCardProps {
  question: Question;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onPlayAudio?: (question: Question) => void;
  showAuthor?: boolean;
}

export default function QuestionCard({
  question,
  onEdit,
  onDelete,
  onPlayAudio,
}: QuestionCardProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const { token } = useAuth();

  const handleGenerateAudio = async (id: string) => {
    try {
      setLoadingId(id);
      await api.post('/generateAudio', { questionId: id }, token || undefined);
      toast.success('Audio generated successfully');
      question.audioKey = 'generated'; // Simulate audioKey to force re-render
    } catch (error) {
      toast.error('Failed to generate audio');
    } finally {
      setLoadingId(null);
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
            {question.category}
          </span>
          {question.isPublic ? (
            <Globe className="h-4 w-4 text-green-500" />
          ) : (
            <Lock className="h-4 w-4 text-gray-400" />
          )}
        </div>

        <div className="flex items-center space-x-2">
          {!question.audioKey && (
            <button
              onClick={() => handleGenerateAudio(question.id)}
              className="p-1 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20 rounded"
              title="Generate Audio"
              disabled={loadingId === question.id}
            >
              {loadingId === question.id ? (
                <svg className="animate-spin h-4 w-4 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
          )}
          {question.audioKey && onPlayAudio && (
            <button
              onClick={() => onPlayAudio(question)}
              className="p-1 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded"
              title="Play Audio"
            >
              <Play className="h-4 w-4" />
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(question.id)}
              className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              title="Edit"
            >
              <Edit className="h-4 w-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(question.id)}
              className="p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 leading-snug">
        {truncateText(question.question, 120)}
      </h3>

      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
        {truncateText(question.answer, 150)}
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        {question.tags?.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
          >
            <Tag className="h-3 w-3 mr-1" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}