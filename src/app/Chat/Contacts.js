'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, MessageSquare, Star, X, Sun, Moon } from 'lucide-react';


const DUMMY_MESSAGES = [
    { id: 1, text: "Hello! Sir/Ma'am , Glad to See you", sender: 'bot' },
    { id: 2, text: "It would be great for me if you could explore and understand more about Rachit.", sender: 'bot' },
     { id: 3, text: "Tell me how can I assist you?", sender: 'bot' },
];

const CHAT_CHIPS = [
    { label: "Email", response: "Email : grachit736@gmail.com" },
    { label: "Contact No", response: "+91-9009634404 , +91-8817998451" },
    { label: "About Rachit", response: "I recommend names that are short, memorable, and relevant to your app's function. Could you tell me what your app does?" },
    { label: "Services", response: "Great! Feel free to type in your question, no matter the topic. I'm ready to assist you now." },
];
const BOTTOM_CHIPS = [
     { label: "Resume", response: "Email : grachit736@gmail.com" },
    { label: "Live Chat", response: "+91-9009634404 , +91-8817998451" },
    { label: "Generate Meet Link", response: "I recommend names that are short, memorable, and relevant to your app's function. Could you tell me what your app does?" },
    { label: "Call", response: "Great! Feel free to type in your question, no matter the topic. I'm ready to assist you now." },
]

const ChatScreen = () => {
    const [messages, setMessages] = useState(DUMMY_MESSAGES);
    const [input, setInput] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(true);
    // const [showPremiumModal, setShowPremiumModal] = useState(false);
    
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        
    }, [messages]);

    // const sendMessage = (text, sender = 'user') => {
        
    //     if (!text.trim()) return;

    //     const newUserMessage = {
    //         id: Date.now(),
    //         text: text.trim(),
    //         sender: sender,
    //     };
    //     setMessages(prev => [...prev, newUserMessage]);
    //     setInput('');

    //     if (sender === 'user') {

    //         //will happen api call and then message will be saved into db

    //         setTimeout(() => {
    //             const botResponse = {
    //                 id: Date.now() + 1,
    //                 text: `Acknowledged: "${text.trim()}". Analyzing and generating a response... (This is a simulated AI reply.)`,
    //                 sender: 'bot',
    //             };
    //             setMessages(prev => [...prev, botResponse]);
    //         }, 700);
    //     }
    // };



  const sendMessage = async (text, sender = "user") => {
  if (!text.trim()) return;
  const newUserMessage = {
    id: Date.now(),
    text: text.trim(),
    sender: sender,
  };

  setMessages((prev) => [...prev, newUserMessage]);
  setInput("");

  // Only call API when user sends a message (not chip)
  if (sender === "user") {
    // 1️⃣ Show temporary "AI is thinking…" message
    const loadingId = Date.now() + 1;
    const loadingMessage = {
      id: loadingId,
      text: "Thinking... ⏳",
      sender: "bot",
    };

    setMessages((prev) => [...prev, loadingMessage]);

    try {
      // 2️⃣ API call to /botreply
      const res = await fetch("/botreply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      // 3️⃣ Remove loading message
      setMessages((prev) =>
        prev.filter((msg) => msg.id !== loadingId)
      );

      // 4️⃣ Add actual AI response
      const botMessage = {
        id: Date.now() + 2,
        text: data.reply || "Sorry, I couldn't generate a response.",
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("API ERROR:", err);

      setMessages((prev) =>
        prev.filter((msg) => msg.id !== loadingId)
      );

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 3,
          text: "❌ Something went wrong. Please try again.",
          sender: "bot",
        },
      ]);
    }
  }
};



    const handleChipClick = (chip) => {
        sendMessage(chip.label, 'chip');
        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 2,
                text: chip.response,
                sender: 'bot',
            };
            setMessages(prev => [...prev, botResponse]);
        }, 200);
    };

    const handleTopChipClick = (chip) => {
        sendMessage(chip.label, 'user');
        
        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 2,
                text: chip.response,
                sender: 'bot',
            };
            setMessages(prev => [...prev, botResponse]);
        }, 1200);
    };

    
   const [bottomChipClicked , setbottomChipClicked] = useState("")
    const primaryText = isDarkMode ? 'text-white' : 'text-gray-900';
    const secondaryText = isDarkMode ? 'text-gray-400' : 'text-gray-600';
    const accentBg = isDarkMode ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' : 'bg-black hover:bg-gray-900';
    const accentText = 'text-white';
    const cardBg = isDarkMode ? 'bg-black' : 'bg-white';
    const headerBg = isDarkMode ? 'bg-gray-900' : 'bg-white';
    const inputBg = isDarkMode ? 'bg-gray-900' : 'bg-gray-50';
    const borderColor = isDarkMode ? 'border-gray-800' : 'border-gray-200';
    const botBubbleBg = isDarkMode ? 'bg-gray-900' : 'bg-gray-100';
    const botBubbleText = isDarkMode ? 'text-gray-100' : 'text-gray-900';
    const userBubbleBg = isDarkMode ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-black';
    const userBubbleText = 'text-white';

    const ChatBubble = ({ message }) => {
        const isBot = message.sender === 'bot';
        
        return (
            <div className={`flex mb-3 sm:mb-4 ${isBot ? 'justify-start' : 'justify-end'} px-2 sm:px-0`}>
                <div 
                    className={` flex items-start max-w-[85%] sm:max-w-[80%] md:max-w-[70%] p-2.5 sm:p-3 rounded-xl 
                        ${isBot 
                            ? `${botBubbleBg} ${botBubbleText} rounded-tl-none mr-1 flex-row` 
                            : `${userBubbleBg} ${userBubbleText} rounded-tr-none ml-1 flex-row-reverse`
                        }
                        shadow-md transition-colors duration-300
                    `}
                >

                    <div className={`p-1 flex-shrink-0 ${isBot ? 'mr-2' : 'ml-2'}`}>
                        {isBot 
                            ? <Bot className={`w-4 h-4 sm:w-5 sm:h-5 ${isDarkMode ? 'text-yellow-400' : 'text-gray-800'}`} /> 
                            : <User className="w-4 h-4 sm:w-5 sm:h-5" />
                        }
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>
                </div>
            </div>
        );
    };

    const Chip = ({ chip }) => (
        <button
            onClick={() => handleChipClick(chip)}
            className={`
                min-w-max px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300
                flex-shrink-0
                ${isDarkMode 
                    ? 'bg-gray-900 border border-gray-800 text-gray-300 hover:bg-gray-800 hover:border-gray-700 shadow-lg' 
                    : 'bg-white text-gray-800 hover:bg-gray-50 border border-gray-200 shadow-md hover:shadow-lg'
                }
            `}
        >
            {chip.label}
        </button>
    );

     const BottomChip = ({ chip }) => (
        <button
            onClick={()=>{
                setbottomChipClicked(chip.label)
                setTimeout(()=>{
setbottomChipClicked("")
                },300)
            }}
            className={`
                cursor-pointer  ${bottomChipClicked === chip.label ? "scale-90" : "hover:scale-110"}
                min-w-max px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300
                flex-shrink-0
                ${isDarkMode 
                    ? 'bg-gray-900 border border-gray-800 text-gray-300 hover:bg-gray-800 hover:border-gray-700 shadow-lg' 
                    : 'bg-white text-gray-800 hover:bg-gray-50 border border-gray-200 shadow-md hover:shadow-lg'
                }
            `}
        >
            {chip.label}
        </button>
    );

    // const PremiumModal = ({ onClose }) => (
    //     <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md ${isDarkMode ? 'bg-black/80' : 'bg-black/50'}`}>
    //         <div className={`w-full max-w-md p-8 rounded-3xl shadow-2xl ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black border border-gray-800' : 'bg-white border border-gray-200'}`}>
    //             <div className="flex justify-end mb-4">
    //                 <button onClick={onClose} className={`p-2 rounded-full transition-all ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
    //                     <X className="w-5 h-5" />
    //                 </button>
    //             </div>
    //             <div className="text-center">
    //                 <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-purple-600 to-pink-600' : 'bg-gradient-to-br from-purple-500 to-pink-500'} shadow-2xl`}>
    //                     <Star className="w-10 h-10 text-white fill-white" />
    //                 </div>
    //                 <h2 className={`text-3xl font-bold mb-3 ${primaryText}`}>Upgrade to Premium</h2>
    //                 <p className={`text-base mb-8 ${secondaryText}`}>
    //                     Unlock unlimited conversations, priority support, and exclusive AI models
    //                 </p>
                    
    //                 <div className={`mb-8 p-6 rounded-2xl ${isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-gray-50 border border-gray-200'}`}>
    //                     <div className="space-y-4">
    //                         <div className="flex items-center space-x-3">
    //                             <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-purple-500' : 'bg-purple-600'}`}></div>
    //                             <span className={`text-sm ${primaryText}`}>Unlimited messages & conversations</span>
    //                         </div>
    //                         <div className="flex items-center space-x-3">
    //                             <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-pink-500' : 'bg-pink-600'}`}></div>
    //                             <span className={`text-sm ${primaryText}`}>Access to advanced AI models</span>
    //                         </div>
    //                         <div className="flex items-center space-x-3">
    //                             <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-purple-500' : 'bg-purple-600'}`}></div>
    //                             <span className={`text-sm ${primaryText}`}>Priority customer support 24/7</span>
    //                         </div>
    //                         <div className="flex items-center space-x-3">
    //                             <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-pink-500' : 'bg-pink-600'}`}></div>
    //                             <span className={`text-sm ${primaryText}`}>Early access to new features</span>
    //                         </div>
    //                     </div>
    //                 </div>

    //                 <div className="mb-6">
    //                     <div className="flex items-baseline justify-center space-x-2 mb-2">
    //                         <span className={`text-4xl font-bold ${primaryText}`}>$14.99</span>
    //                         <span className={secondaryText}>/month</span>
    //                     </div>
    //                     <p className={`text-xs ${secondaryText}`}>Cancel anytime • No hidden fees</p>
    //                 </div>
                    
    //                 <button 
    //                     onClick={() => { console.log('Upgrading...'); onClose(); }}
    //                     className={`w-full py-4 rounded-2xl text-lg font-bold transition-all transform hover:scale-[1.02] shadow-xl
    //                         ${isDarkMode 
    //                             ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
    //                             : 'bg-black hover:bg-gray-900'
    //                         } ${accentText}`}
    //                 >
    //                     Start Premium Trial
    //                 </button>
    //                 <p className={`text-xs mt-4 ${secondaryText}`}>7-day free trial • Then $14.99/month</p>
    //             </div>
    //         </div>
    //     </div>
    // );

    return (
        <div className={`fixed inset-0 ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
            {/* {showPremiumModal && <PremiumModal onClose={() => setShowPremiumModal(false)} />} */}

            <div className="h-full max-w-5xl mx-auto flex flex-col">
                
                <header className={`p-3 sm:p-4 flex items-center justify-between ${headerBg} border-b ${borderColor} ${isDarkMode ? '' : 'shadow-sm'}`}>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-gradient-to-br from-purple-600 to-pink-600' : 'bg-black'} shadow-lg`}>
                            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <h1 className={`text-lg sm:text-xl font-bold ${primaryText}`}>AI Chat</h1>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        {/* <button 
                            onClick={() => setShowPremiumModal(true)}
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-semibold text-sm transition-all transform hover:scale-105 shadow-lg
                                ${isDarkMode 
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' 
                                    : 'bg-black hover:bg-gray-900 text-white'
                                }`}  >
                            <div className="flex items-center space-x-1.5">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="hidden sm:inline">Premium</span>
                            </div>
                        </button> */}
                        <button 
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={`p-2 rounded-xl transition-all ${isDarkMode ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'} ${isDarkMode ? '' : 'shadow-md'}`}
                        >
                            {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
                        </button>
                    </div>
                </header>

                <section className={`p-3  overflow-x-scroll hide-scrollbar border-t ${borderColor} ${cardBg}`}>
                    <div className="flex space-x-2 sm:space-x-3">
                        {CHAT_CHIPS.map((chip, index) => (
                            <Chip key={index} chip={chip} />
                        ))}
                    </div>
                </section>


                <main className={`flex-1 relative overflow-y-scroll hide-scrollbar  py-4 ${cardBg}`}>
                    

                    {messages.map(msg => (
                        <ChatBubble key={msg.id} message={msg} />
                    ))}
                    <div ref={messagesEndRef} />
                </main>

                <section className={`p-3 overflow-x-scroll hide-scrollbar border-t ${borderColor} ${cardBg}`}>
                    <div className="flex space-x-2 sm:space-x-3 pb-1">
                        {BOTTOM_CHIPS.map((chip, index) => (
                            <BottomChip key={index} chip={chip} />
                        ))}
                    </div>
                </section>

                <footer className={`p-3 sm:p-4 border-t ${borderColor} ${cardBg} ${isDarkMode ? '' : 'shadow-lg'}`}>
                    <div className={`flex items-center p-2.5 sm:p-3 rounded-2xl ${inputBg} ${isDarkMode ? 'border border-gray-800' : 'shadow-lg border border-gray-200'}`}>
                        
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    sendMessage(input);
                                }
                            }}
                            placeholder="Type your message..."
                            className={`flex-1 w-full px-2 py-1 focus:outline-none text-sm sm:text-base transition-colors duration-300
                                ${inputBg} ${primaryText} 
                                bg-transparent placeholder:${secondaryText}
                            `}
                        />

                        <button
                            onClick={() => sendMessage(input)}
                            disabled={!input.trim()}
                            className={`p-2.5 sm:p-3 ml-2 rounded-xl transition-all duration-300 flex-shrink-0 transform
                                ${input.trim() 
                                    ? `${accentBg} ${accentText} shadow-lg hover:scale-105` 
                                    : `${isDarkMode ? 'bg-gray-800 text-gray-600' : 'bg-gray-200 text-gray-400'} cursor-not-allowed`
                                }
                            `}
                        >
                            <Send className="w-5 h-5 sm:w-5 sm:h-5" />
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default ChatScreen;