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
    Download,
    Share2
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
    const [playbackRate, setPlaybackRate] = useState(1);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [audioUrl]);

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

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio) return;

        const newTime = parseFloat(e.target.value);
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio) return;

        const newVolume = parseFloat(e.target.value);
        audio.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
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

    const handlePlaybackRateChange = (rate: number) => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.playbackRate = rate;
        setPlaybackRate(rate);
    };

    const restart = () => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.currentTime = 0;
        setCurrentTime(0);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleDownload = () => {
        // Placeholder for download functionality
        alert('Download functionality would be implemented here');
    };

    const handleShare = () => {
        // Placeholder for share functionality
        alert('Share functionality would be implemented here');
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
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-2xl transition-all border border-gray-200 dark:border-gray-700">
                                {/* Header */}
                                <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                                            <Volume2 className="h-5 w-5 text-white" />
                                        </div>
                                        <div className="text-left">
                                            <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
                                                Audio Player
                                            </Dialog.Title>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-48">
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
                                    {/* Progress Bar */}
                                    <div className="space-y-2">
                                        <div className="relative">
                                            <input
                                                type="range"
                                                min="0"
                                                max={duration || 0}
                                                value={currentTime}
                                                onChange={handleSeek}
                                                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                                style={{
                                                    background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(currentTime / duration) * 100}%, #E5E7EB ${(currentTime / duration) * 100}%, #E5E7EB 100%)`
                                                }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                                            <span>{formatTime(currentTime)}</span>
                                            <span>{formatTime(duration)}</span>
                                        </div>
                                    </div>

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

                                    {/* Volume Control */}
                                    <div className="flex items-center space-x-3">
                                        <VolumeX className="h-4 w-4 text-gray-400" />
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.1"
                                            value={isMuted ? 0 : volume}
                                            onChange={handleVolumeChange}
                                            className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                        />
                                        <Volume2 className="h-4 w-4 text-gray-400" />
                                    </div>

                                    {/* Playback Speed */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Playback Speed
                                        </label>
                                        <div className="flex space-x-2">
                                            {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                                                <button
                                                    key={rate}
                                                    onClick={() => handlePlaybackRateChange(rate)}
                                                    className={`px-3 py-1 text-xs rounded-full transition-colors ${playbackRate === rate
                                                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                                                        }`}
                                                >
                                                    {rate}x
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Actions */}
                                <div className="flex items-center justify-between p-6 pt-0 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={handleDownload}
                                            className="inline-flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                        >
                                            <Download className="h-4 w-4 mr-1" />
                                            Download
                                        </button>
                                        <button
                                            onClick={handleShare}
                                            className="inline-flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                        >
                                            <Share2 className="h-4 w-4 mr-1" />
                                            Share
                                        </button>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Close
                                    </button>
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