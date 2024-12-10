export interface Elixir {
    id: string;
    name: string;
    effect: string;
    sideEffects: string | null;
    characteristics: string;
    time: string | null;
    difficulty: string;
    ingredients: { id: string; name: string }[];
    inventors: string[];
    manufacturer: string | null;
  }
  