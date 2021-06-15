import { makeAutoObservable, autorun, when, runInAction } from "mobx";
import React, { useContext } from "react";


const loginJwt = async () => {
  const response = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify({
      login: "olli",
      password: "qweqwe123",
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
    });
  const json = await response.json();
  if (json.token) {
    localStorage.setItem("token", json.token);
  }
};



// https://mobx.js.org/defining-data-stores.html
class BackendConfigStore {
  host?: string;
  port?: number;
  count?: number;
  state = "pending"; // "pending", "done" or "error"

  constructor() {
    makeAutoObservable(this);

    // https://mobx.js.org/reactions.html#when
    // when(() => this.initialized, () => console.log('Ready to begin'));
    // same using an explicit promise
    (async () => {
      await when(() => this.initialized);
      console.log("Ready to begin");
    })();
    // https://mobx.js.org/reactions.html#autorun
    autorun(() => {
      console.log(this.port);
    });
  }

  // https://mobx.js.org/actions.html#asynchronous-actions
  async fetchFromServer(url?: string) {
    this.state = "pending";
    try {
      const token = localStorage.getItem("token") || "";
      const data = await (await fetch(url || this.url, {
        method: 'get',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token
        }
      })).json();
      runInAction(() => {
        this.count = Number(data.count);
        this.state = "done";
      });
    } catch (e) {
      runInAction(() => {
        this.state = "error";
      });
    }
  }

  async login() {
    await loginJwt()
    // await fetch('/api/login')
  }

  async logout() {
    await fetch('/api/logout')
    localStorage.removeItem('token')

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

  get url(): string {
    // return `http://${this.host}:${this.port}/api/users`;
    return `/api/users`;

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
