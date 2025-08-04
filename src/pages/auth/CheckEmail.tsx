import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import Layout from '../../components/Layout';

const CheckEmail: React.FC = () => {
    const location = useLocation();
    const email = location.state?.email || '';

    return (
        <Layout showNavbar={false}>
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 text-center">
                    <div className="flex justify-center">
                        <MessageSquare className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
                        Check Your Email
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        We’ve sent a verification link to{' '}
                        <span className="font-medium text-gray-900 dark:text-white">{email}</span>. Please check your inbox and click the link to verify your email. If you don’t see it, check your spam folder.
                    </p>
                    <div className="mt-6">
                        <Link
                            to="/login"
                            className="inline-block text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                        >
                            Return to Login
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CheckEmail;
