import React from 'react';
import { Tab } from '../../types';
import { X } from 'lucide-react';

interface TabManagerProps {
  tabs: Tab[];
  activeTab: string | null;
  onTabClick: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
}

export const TabManager: React.FC<TabManagerProps> = ({
  tabs,
  activeTab,
  onTabClick,
  onTabClose
}) => {
  if (tabs.length === 0) return null;

  return (
    <div className="tabs-container">
      {tabs.map(tab => (
        <div
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabClick(tab.id)}
        >
          <span className="tab-name">{tab.name}</span>
          <button
            className="tab-close"
            onClick={(e) => {
              e.stopPropagation();
              onTabClose(tab.id);
            }}
            title="Close tab"
          >
            <X size={12} />
          </button>
        </div>
      ))}
    </div>
  );
};
