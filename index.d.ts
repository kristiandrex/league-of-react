declare global {
  interface IChampion {
    id: string;
    name: string;
    title: string;
    lore;
    thumbnail: string;
    skins: {
      name: string;
      url: string;
    }[];
  }

  type Versions = {
    latest: string;
    previous: string;
  };
}
