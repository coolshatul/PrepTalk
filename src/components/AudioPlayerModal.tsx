import React, { useState, useRef, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    RotateCcw,
    X,
} from 'lucide-react';

interface AudioPlayerModalProps {
    isOpen: boolean;
    onClose: () => void;
    audioUrl: string;
    questionTitle?: string;
}

const AudioPlayerModal: React.FC<AudioPlayerModalProps> = ({
    isOpen,
    onClose,
    audioUrl,
    questionTitle = "Interview Question Audio"
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => {
            if (!isNaN(audio.duration)) {
                setDuration(audio.duration);
            }
        };
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);

        // Fallback: if metadata is already available
        if (audio.readyState >= 1 && !isNaN(audio.duration)) {
            setDuration(audio.duration);
        }

        if (isOpen && audio.readyState >= 2) {
            audio.play().then(() => {
                setIsPlaying(true);
            }).catch((error) => {
                console.error("Autoplay failed:", error);
                setIsPlaying(false);
            });
        } else if (isOpen) {
            const handleCanPlay = () => {
                audio.play().then(() => {
                    setIsPlaying(true);
                }).catch((error) => {
                    console.error("Autoplay failed after canplay:", error);
                    setIsPlaying(false);
                });
                audio.removeEventListener('canplay', handleCanPlay);
            };
            audio.addEventListener('canplay', handleCanPlay);
        }

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
            audio.pause();
            audio.currentTime = 0;
            setIsPlaying(false);
        };
    }, [audioUrl, isOpen]);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isMuted) {
            audio.volume = volume;
            setIsMuted(false);
        } else {
            audio.volume = 0;
            setIsMuted(true);
        }
    };

    const restart = () => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.currentTime = 0;
        setCurrentTime(0);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-2 sm:p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md sm:mx-0 mx-2 transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-2xl transition-all border border-gray-200 dark:border-gray-700">
                                {/* Header */}
                                <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center space-x-3">
                                        <div className="hidden sm:flex w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full items-center justify-center">
                                            <Volume2 className="h-5 w-5 text-white" />
                                        </div>
                                        <div className="text-left">
                                            <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
                                                Question
                                            </Dialog.Title>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 break-words">
                                                {questionTitle}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                {/* Audio Element */}
                                <audio
                                    ref={audioRef}
                                    src={audioUrl}
                                    preload="metadata"
                                    className="hidden"
                                />

                                {/* Player Controls */}
                                <div className="p-6 space-y-6">

                                    {/* Main Controls */}
                                    <div className="flex items-center justify-center space-x-4">
                                        <button
                                            onClick={restart}
                                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                                            title="Restart"
                                        >
                                            <RotateCcw className="h-5 w-5" />
                                        </button>

                                        <button
                                            onClick={togglePlayPause}
                                            className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                                        >
                                            {isPlaying ? (
                                                <Pause className="h-6 w-6" />
                                            ) : (
                                                <Play className="h-6 w-6 ml-1" />
                                            )}
                                        </button>

                                        <button
                                            onClick={toggleMute}
                                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                                            title={isMuted ? "Unmute" : "Mute"}
                                        >
                                            {isMuted ? (
                                                <VolumeX className="h-5 w-5" />
                                            ) : (
                                                <Volume2 className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default AudioPlayerModal;