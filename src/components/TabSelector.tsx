import React from 'react';

interface TabSelectorProps {
    tab: 'all' | 'favorites';
    setTab: (tab: 'all' | 'favorites') => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ tab, setTab }) => {
    return (
        <div className="tab-selector">
            <button
                className={tab === 'all' ? 'active' : ''}
                onClick={() => setTab('all')}
            >
                Все котики
            </button>
            <button
                className={tab === 'favorites' ? 'active' : ''}
                onClick={() => setTab('favorites')}
            >
                Любимые котики
            </button>
        </div>
    );
};

export default TabSelector;
