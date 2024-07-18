"use client";
import { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
}

export default function Home() {
  const URL_API = "https://jsonplaceholder.typicode.com/todos";
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Todo[] | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch(URL_API);
      const data: Todo[] = await response.json();

      if (!data) throw new Error("Falha ao buscar os dados...");
      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-bold text-4xl text-center my-8">Teste de API</h1>
      {loading && !data && <p>Carregando informações...</p>}
      {data && data.map((item) => <p key={item.id}>{item.title}</p>)}
    </div>
  );
}
