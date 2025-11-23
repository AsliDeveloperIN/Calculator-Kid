import React from 'react';
import { X } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-sm rounded-[20px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-slide-up">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xl font-extrabold text-[#6B4423]">About & Privacy</h2>
          <button
            onClick={onClose}
            className="bg-[#FF6B6B] p-2 rounded-xl text-white hover:bg-[#ff5252] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto no-scrollbar">
          <h3 className="text-lg font-bold text-[#6B4423] mb-2">Math Game Calculator</h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            A fun, game-like calculator designed for kids to make learning math enjoyable!
          </p>

          <h3 className="text-lg font-bold text-[#6B4423] mb-2">Privacy Policy</h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-3">
            This app does not collect, store, or share any personal information. All calculations and scores are stored locally in the temporary session of your browser.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            We do not use any third-party analytics, advertising, or tracking services. Your child's privacy is our top priority.
          </p>

          <h3 className="text-lg font-bold text-[#6B4423] mb-2">Data Collection</h3>
          <ul className="list-none space-y-1 text-gray-500 text-sm mb-6">
            <li>• No personal information collected</li>
            <li>• No account registration required</li>
            <li>• No data shared with third parties</li>
            <li>• Scores reset when you refresh</li>
          </ul>

          <a
            href="https://createanything.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#4ECDC4] text-white font-bold text-center py-4 rounded-xl shadow-md hover:bg-[#3dbdb4] transition-colors active:scale-95 transform duration-100"
          >
            View Full Privacy Policy
          </a>

          <p className="text-center text-xs text-gray-400 mt-6">Version 1.0.0 (Web)</p>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;