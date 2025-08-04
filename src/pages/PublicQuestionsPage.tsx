import React, { useState, useMemo, useEffect } from 'react';
import Layout from '../components/Layout';
import QuestionCard from '../components/QuestionCard';
import Filters from '../components/Filters';
import { api } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Question } from '@/types';

export default function PublicQuestionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { token } = useAuth();

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await api.get('/getPublicQuestions', token || undefined);
        setQuestions(res.data?.data || []);
      } catch (err: any) {
        toast.error(err.message || 'Failed to load public questions');
      } finally {
        setIsLoading(false);
      }
    }

    if (token) {
      fetchQuestions();
    }
  }, [token]);

  const publicQuestions = Array.isArray(questions) ? questions : [];

  const availableTags = useMemo(() => {
    const tags = publicQuestions.flatMap(q => q.tags ?? []);
    return [...new Set(tags)].sort();
  }, [publicQuestions]);

  const filteredQuestions = useMemo(() => {
    return publicQuestions.filter(question => {
      const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || question.category === selectedCategory;
      const matchesTag = !selectedTag || question.tags?.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [publicQuestions, searchTerm, selectedCategory, selectedTag]);

  const handlePlayAudio = (id: string) => {
    // Placeholder audio logic
    alert(`Play audio for question ${id} (placeholder)`);
  };

  return (
    <Layout>
      {isLoading ? (
        <div className="text-center py-16 text-gray-500 dark:text-gray-400">Loading...</div>
      ) : (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Public Questions</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Explore interview questions shared by the community
              </p>
            </div>

            <Filters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedTag={selectedTag}
              onTagChange={setSelectedTag}
              availableTags={availableTags}
            />

            {filteredQuestions.length === 0 ? (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No public questions found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try adjusting your filters or search terms to find more questions.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredQuestions.map((question) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    onPlayAudio={handlePlayAudio}
                    showAuthor={true}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  );
}