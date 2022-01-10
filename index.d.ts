import { MutableRefObject } from "react";

declare global {
  type ObserverOptions = IntersectionObserverInit & {
    externalRef?: MutableRefObject<Element>;
    skip?: boolean;
  };

  interface IChampion {
    id: string;
    name: string;
    title: string;
    images: {
      portrait: string;
      landscape: string;
      thumbnail: string;
    };
  }

  type Versions = {
    latest: string;
    previous: string;
  };
}
