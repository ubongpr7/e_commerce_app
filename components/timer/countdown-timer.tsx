'use client';

import React, { useEffect, useState } from 'react';

interface TimeLeft {
    hours: string;
    minutes: string;
    seconds: string;
}

interface CountdownTimerProps {
    targetDate: string | number | Date;
    repeatIntervalInSeconds?: number | null;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
    targetDate,
    repeatIntervalInSeconds = null,
}) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
    const [currentTarget, setCurrentTarget] = useState<number>(
        new Date(targetDate).getTime()
    );
    const [isClient, setIsClient] = useState(false);
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const calculateTimeLeft = (target: number): TimeLeft | null => {
            const now = new Date().getTime();
            const difference = target - now;

            if (difference <= 0) return null;

            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            return {
                hours: String(hours).padStart(2, '0'),
                minutes: String(minutes).padStart(2, '0'),
                seconds: String(seconds).padStart(2, '0'),
            };
        };

        const updateCountdown = () => {
            const newTime = calculateTimeLeft(currentTarget);

            if (!newTime) {
                if (repeatIntervalInSeconds) {
                    const newTarget = new Date().getTime() + repeatIntervalInSeconds * 1000;
                    setCurrentTarget(newTarget);
                    setIsExpired(false);
                } else {
                    setTimeLeft(null);
                    setIsExpired(true);
                }
            } else {
                setTimeLeft(newTime);
                setIsExpired(false);
            }
        };

        const timer = setInterval(updateCountdown, 1000);
        updateCountdown();

        return () => clearInterval(timer);
    }, [currentTarget, repeatIntervalInSeconds]);

    if (!isClient) return null;

    if (isExpired && !repeatIntervalInSeconds) {
        return <div className="text-white text-xs">Expired</div>;
    }

    if (!timeLeft) return null;

    return (
        <div className="flex gap-2 justify-center items-center text-white text-lg lg:hidden">
            <div>
                <p className="text-white text-xs">TIME LEFT:</p>
            </div>
            <div className="flex flex-row gap-1">
                <div className="flex flex-col items-center">
                    <span className="text-xs font-bold">{timeLeft.hours}h</span>
                </div>
                <span className="text-xs">:</span>
                <div className="flex flex-col items-center">
                    <span className="text-xs font-bold">{timeLeft.minutes}m</span>
                </div>
                <span className="text-xs">:</span>
                <div className="flex flex-col items-center">
                    <span className="text-xs font-bold">{timeLeft.seconds}s</span>
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;
