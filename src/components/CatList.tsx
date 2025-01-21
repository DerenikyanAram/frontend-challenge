import React from 'react';

interface Cat {
    id: string;
    url: string;
}

interface CatListProps {
    cats: Cat[];
    favorites: Cat[];
    toggleFavorite: (cat: Cat) => void;
}

const CatList: React.FC<CatListProps> = ({ cats, favorites, toggleFavorite }) => {
    return (
        <div className="cat-list">
            {cats.map((cat) => {
                const isFavorite = favorites.some((fav) => fav.id === cat.id);
                return (
                    <div key={cat.id} className="cat-item">
                        <img src={cat.url} alt="Cat" loading="lazy"/>
                        <div
                            className={`heart ${isFavorite ? 'active' : ''}`}
                            onClick={() => toggleFavorite(cat)}
                        ></div>
                    </div>
                );
            })}
        </div>
    );
};

export default CatList;
