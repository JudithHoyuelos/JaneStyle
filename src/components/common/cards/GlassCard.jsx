import React from 'react';
import clsx from 'clsx';

export default function GlassCard({ children, className, ...props }) {
    return (
        <div
            className={clsx(
                'max-w-lg w-full h-auto max-h-[90vh] bg-white bg-opacity-40 backdrop-blur-sm border-2 border-white rounded-2xl shadow-lg p-8 space-y-3 overflow-y-auto',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
