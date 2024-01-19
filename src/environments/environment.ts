export type environmentType = {
  production: boolean;
  pokeApi: string;
}

export const environment:environmentType = {
  production: false,
  pokeApi: 'https://pokeapi.co/api/v2/',
};

