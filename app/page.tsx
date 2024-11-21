"use client";

import { useEffect, useState } from "react";
import styles from "./components/superhero.module.css";
import Superhero from "./components/superhero";

interface Hero {
  id: string;
  name: string;
  powerstats: {
    intelligence: string;
    strength: string;
  };
  image: {
    url: string;
  };
}

export default function Home() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const ACCESS_TOKEN = "f3dcc3d71f10fd8bb3c24111ba0da2a2";
  const BASE_URL = `https://superheroapi.com/api.php/${ACCESS_TOKEN}/`;

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const ids = [32, 99, 311];
        const promises = ids.map((id) =>
          fetch(`${BASE_URL}${id}`).then((res) => res.json())
        );
        const results: Hero[] = await Promise.all(promises);
        setHeroes(results);
      } catch (error) {
        console.error("Erro ao buscar os heróis:", error);
      }
    };

    fetchHeroes();
  }, []);

  return (
    <main className={styles.container}>
      <div className={styles.heroGrade}>
        {heroes.map((hero) => (
          <Superhero key={hero.id} hero={hero} />
        ))}
      </div>
    </main>
  );
}



