import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Layout from '../components/Layout';
import QuestionCard from '../components/QuestionCard';
import Filters from '../components/Filters';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Question } from '@/types';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await api.get('/getMyQuestions', token || undefined);
        setQuestions(res.data?.data || []);
      } catch (err: any) {
        toast.error(err.message || 'Failed to load questions');
      } finally {
        setIsLoading(false);
      }
    }

    if (token) {
      fetchQuestions();
    }
  }, [token]);

  const userQuestions = Array.isArray(questions) ? questions : [];

  const availableTags = useMemo(() => {
    const tags = userQuestions.flatMap(q => q.tags ?? []);
    return [...new Set(tags)].sort();
  }, [userQuestions]);

  const filteredQuestions = useMemo(() => {
    return userQuestions.filter(question => {
      const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || question.category === selectedCategory;
      const matchesTag = !selectedTag || question.tags?.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [userQuestions, searchTerm, selectedCategory, selectedTag]);

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return;

    try {
      await api.delete(`/deleteQuestion/${id}`, token || undefined);
      toast.success('Question deleted successfully!');
      setQuestions(prev => prev.filter(q => q.id !== id));
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete question');
    }
  };

  const handlePlayAudio = (id: string) => {
    // Placeholder audio logic
    alert(`Play audio for question ${id} (placeholder)`);
  };

  return (
    <Layout>
      {isLoading ? (
        <div className="text-center py-16 text-gray-500 dark:text-gray-400">Loading...</div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Questions</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Manage your interview preparation questions
              </p>
            </div>

            <button
              onClick={() => navigate('/add')}
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto w-full"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Question
            </button>
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
                  No questions found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {userQuestions.length === 0
                    ? "Get started by adding your first interview question."
                    : "Try adjusting your filters or search terms."}
                </p>
                {userQuestions.length === 0 && (
                  <button
                    onClick={() => navigate('/add')}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Your First Question
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuestions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onPlayAudio={handlePlayAudio}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}