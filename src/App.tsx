import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import CatList from './components/CatList';
import TabSelector from './components/TabSelector';
import { Cat } from './components/types';
import useLocalStorage from './hooks/useLocalStorage';

const API_URL = 'https://api.thecatapi.com/v1/images/search';
const API_KEY = 'your_api_key_here'; // Замените на ваш ключ

const App: React.FC = () => {
    const [cats, setCats] = useState<Cat[]>([]);
    const [favorites, setFavorites] = useLocalStorage<Cat[]>('favoriteCats', []);
    const [tab, setTab] = useState<'all' | 'favorites'>('all');
    const [isLoading, setIsLoading] = useState(false);
    const [canLoadMore, setCanLoadMore] = useState(true); // Флаг для контроля загрузки

    const loadCats = async () => {
        if (isLoading || !canLoadMore) return;
        setIsLoading(true);
        try {
            const [batch1, batch2] = await Promise.all([
                axios.get(API_URL, {
                    headers: { 'x-api-key': API_KEY },
                    params: { limit: 10 },
                }),
                axios.get(API_URL, {
                    headers: { 'x-api-key': API_KEY },
                    params: { limit: 10 },
                }),
            ]);
            setCats((prev) => [...prev, ...batch1.data, ...batch2.data]);
        } catch (error) {
            console.error('Ошибка при загрузке котиков:', error);
        } finally {
            setIsLoading(false);
        }
    };


    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100
        ) {
            setCanLoadMore(true); // Разрешаем загрузку, если достигнут конец страницы
        }
    };

    useEffect(() => {
        loadCats(); // Первоначальная загрузка
    }, []);

    useEffect(() => {
        if (tab === 'all') {
            window.addEventListener('scroll', handleScroll);
        } else {
            window.removeEventListener('scroll', handleScroll);
        }
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [tab]);

    useEffect(() => {
        if (canLoadMore && !isLoading) {
            loadCats();
            setCanLoadMore(false); // После загрузки запрещаем загрузку до следующего скролла
        }
    }, [canLoadMore]);

    const toggleFavorite = (cat: Cat) => {
        setFavorites((prev) => {
            const isFavorite = prev.some((fav) => fav.id === cat.id);
            if (isFavorite) {
                return prev.filter((fav) => fav.id !== cat.id);
            } else {
                return [...prev, cat];
            }
        });
    };

    return (
        <div className="app">
            <TabSelector tab={tab} setTab={setTab} />
            <main>
                {tab === 'all' && (
                    <>
                        <CatList
                            cats={cats}
                            favorites={favorites}
                            toggleFavorite={toggleFavorite}
                        />
                        {isLoading && <p className="loading-text">...загружаем ещё котиков...</p>}
                    </>
                )}
                {tab === 'favorites' && (
                    <CatList
                        cats={favorites}
                        favorites={favorites}
                        toggleFavorite={toggleFavorite}
                    />
                )}
            </main>
        </div>
    );
};

export default App;
