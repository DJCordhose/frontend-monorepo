import { makeAutoObservable, autorun, when  } from "mobx";
import React, { useContext } from "react";

// https://mobx.js.org/defining-data-stores.html
class BackendConfigStore {
  host?: string;
  port?: number;

  constructor() {
    makeAutoObservable(this);
    
    // https://mobx.js.org/reactions.html#when
    // when(() => this.initialized, () => console.log('Ready to begin'));
    // same using an explicit promise
    (async () => {
      await when(() => this.initialized)
      console.log('Ready to begin')
    })()
    // https://mobx.js.org/reactions.html#autorun
    autorun(() => {
      console.log(this.port)
    })
    
  }

  updateHost(host: string) {
    this.host = host;
  }

  updatePort(port: number) {
    this.port = port;
  }

  get initialized(): boolean {
    return this.host !== undefined && this.port !== undefined;
  }
}

const backendConfigStore = new BackendConfigStore();

// effects can be defined anywhere
// https://mobx.js.org/reactions.html#autorun
// autorun(() => {
//   console.log(backendConfigStore.port)
// })


type IStoreContext = {
  backendConfigStore: BackendConfigStore;
};
export const StoreContext = React.createContext<IStoreContext>(null!);

type StoreProviderProps = {
  children: React.ReactNode;
};

export function StoreProvider(props: StoreProviderProps) {
  return (
    <StoreContext.Provider value={{ backendConfigStore }}>
      {props.children}
    </StoreContext.Provider>
  );
}

export function useStore() {
    return useContext(StoreContext).backendConfigStore;
}