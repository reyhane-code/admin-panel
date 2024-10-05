export interface IGetGameResponse {
  game: Game
  likes?: number;
}


export interface Game {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image: string;
  metacritic: number;
  rating_top: number;
  platforms: [
    {
      id: number;
      name: string;
      slug: string;
      createdAt: Date;
      updatedAt: Date;
      PlatformGame: {
        game_id: number;
        platform_id: number;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  ];
  genres: [
    {
      id: number;
      name: string;
      createdAt: Date;
      updatedAt: Date;
      GenreGame: {
        game_id: number;
        genre_id: number;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  ];
  publishers: [
    {
      id: number;
      name: string;
      createdAt: Date;
      updatedAt: Date;
      PublisherGame: {
        game_id: number;
        publisher_id: number;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  ];
  screenshots: [
    {
      id: number;
      hash_key: string;
      createdAt: Date;
      updatedAt: Date | null;
      deletedAt: Date | null;
    }
  ];
};
