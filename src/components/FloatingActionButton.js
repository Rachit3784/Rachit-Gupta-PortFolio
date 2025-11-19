'use client'
import React, { useState } from 'react';
// Importing necessary icons from lucide-react
import { Bot, Phone, MessageSquare, MessageCircle } from 'lucide-react';
import { useRouter } from "next/navigation";

const FloatingActionButton = () => {
    const router = useRouter();
    // State to control whether the action buttons are visible (on hover)
    const [isHovered, setIsHovered] = useState(false);
    const [chatClicked , setChatClicked] = useState(false)

    // --- BUTTON CONFIGURATION ARRAY ---
    // The buttons will animate up in the order they appear here: 'Call' will be the lowest.
    const actionButtons = [
        {
            name: 'Call',
            icon: Phone, // Lucide React Icon Component
            onClick: () => console.log('Call button clicked!'),
            // Specific hover color for Call (used in light mode to override base hover)
            // In dark mode, we rely on the subtle dark:hover:bg-gray-700 set below
            hoverClass: 'hover:bg-green-500 hover:text-white cursor-pointer hover:', 
        },
        {
            name: 'Chat',
            icon: MessageCircle, // Lucide React Icon Component
            onClick: () => {
                setChatClicked(true)
                setTimeout(()=>{
                setChatClicked(false)
                
                router.push('/Chat')
                },300)
            }, 
            
            hoverClass: `hover:bg-blue-500 hover:text-white  transition-all cursor-pointer ${chatClicked ? 'scale-90' : 'hover:scale-120'}`,
        },
    
    ];
    
    // The total number of action buttons
    const buttonCount = actionButtons.length;

    return (
        <div
            // Use flex-col and items-end to stack buttons from bottom-right up
            className="fixed bottom-10 right-10 flex flex-col items-end space-y-4 z-50"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* 1. Map through the action buttons (reverse for bottom-up stacking and animation) */}
            {actionButtons.slice().reverse().map((button, index) => {
                // Calculate delay index for the sequential animation
                const delayIndex = buttonCount - 1 - index; 
                
                return (
                    <button
                        key={button.name}
                        onClick={button.onClick}
                        // Base classes for size, shape, and animation
                        className={`
                            // Base styling: rounded, sized, shadow
                            w-12 h-12 p-4 mt-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform-gpu
                            
                            // --------------------- DARK MODE STYLES (Priority: Black, White Icon, Yellow Glow) ---------------------
                            dark:bg-black dark:text-white 
                            // Custom glowing shadow for dark mode
                            dark:shadow-[0_0_15px_rgba(252,211,77,0.7)] 
                            // Subtle hover in dark mode
                            dark:hover:bg-gray-800 dark:hover:shadow-[0_0_20px_rgba(252,211,77,1)]

                            // --------------------- LIGHT MODE STYLES ---------------------
                            bg-gray-800 text-white 
                            // Apply custom light mode hover from the array (e.g., hover:bg-green-500)
                            ${button.hoverClass}

                            // --------------------- VISIBILITY & ANIMATION LOGIC ---------------------
                            ${isHovered 
                                // Visible State: Move to original position, full opacity
                                ? 'opacity-100 translate-y-0' 
                                // Hidden State: Move down (hidden below main button), zero opacity, and unclickable
                                : 'opacity-0 translate-y-full pointer-events-none'
                            }
                        `}
                        // Use inline style to control the sequential animation delay (75ms per button)
                        style={{ 
                            transitionDelay: isHovered ? `${delayIndex * 75}ms` : '0ms',
                            // The margin is optional, but helps ensure proper stacking on hover
                            marginBottom: isHovered ? '0.25rem' : '0' 
                        }}
                    >
                        {/* Render the Lucide Icon component, size automatically set by parent w/h */}
                        <button.icon className="w-4 h-4" />
                    </button>
                );
            })}

            {/* 2. The Main Bot Button (Always visible) */}
            <button

                // Apply the primary glowing style to the main button
                className={`
                    cursor-pointer p-4 rounded-full shadow-lg z-10 transition-all duration-300 transform-gpu
                    mt-5
                    // --------------------- DARK MODE (Black/Yellow Glow) ---------------------
                    dark:bg-black dark:text-yellow-400 
                    // Intense glowing shadow in dark mode
                    dark:shadow-[0_0_25px_rgba(252,211,77,0.9)] 
                    dark:hover:scale-110 dark:hover:shadow-[0_0_35px_rgba(252,211,77,1)]
                    
                    // --------------------- LIGHT MODE (White/Subtle Glow) ---------------------
                    bg-white text-black 
                    shadow-xl hover:scale-110 hover:shadow-yellow-400/50
                `}
            >
                {/* Use the Bot icon from Lucide React */}
                <Bot className='w-5 h-5' />
            </button>
        </div>
    );
};

export default FloatingActionButton;