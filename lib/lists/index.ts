import {
  Entity,
  ArraySet,
  Resolver,
  Value,
  State,
  Model,
  Controller,
} from "../core/index";
import { Phrase } from "../dictionary";
import { Form } from "../forms/index";

// SOURCE
//model
export type Source<V extends Value> = {} & Model;
//controller TODO

//RemoteSource
// model
export type RemoteSource<V extends Value> = {
  url: Resolver<string>;
} & Source<Value>;

// controller
export type RemoteStoreControllerState<V extends Value> = {
  value: V | null;
  loading: boolean;
  valid:boolean;
  message?: Phrase;
} & State;

export type Response<V> = {value:V,valid:boolean,message:Phrase}
export class RemoteSourceController<V extends Value>
  implements Controller<RemoteSource<V>, RemoteStoreControllerState<V>>
{
  initialState = {
    value: null,
    loading:false,
    valid:false,
  };
  state: RemoteStoreControllerState<V>;
  constructor(public model: RemoteSource<V>) {
    this.state = { ...this.initialState };
  }
  save(){

  }
  load(){
    this.state.loading = true;
    this.save();
    let url = this.model.url;
    Requester.load(url);
    // TODO REQUEST 
    this.loadCallback();
  }
  loadCallback(response:Response<V>){
    this.state.loading = false;
    this.state.valid = response.valid;
    this.state.message = response.message;
    this.state.value = response.value;
    this.save()
  }
}
export class RemoteSourceListController<V extends Value> extends RemoteSourceController<V[]>{
  loadCallback(response:Response<V>){
    this.state.loading = false;
    this.state.valid = response.valid;
    this.state.message = response.message;
    this.state.value = response.value;
    this.save()
  }
}
// examples
//models
export type Storage = Entity & { title: string; code: string };
export type StorageTransaction = Entity & { voucher: string; amount: number };

//sources
let storages: RemoteSource<Storage[]> = {
  url: "api/storages/",
};

let storage: RemoteSource<Storage> = {
  url: (storageId: string) => `accounting/storages/${storageId}/`,
};

let storageTransactions: RemoteSource<StorageTransaction[]> = {
  url: (storageId: string) => `accounting/storages/${storageId}/transactions/`,
};

// controllers
let storageController = new RemoteSourceController<Storage[]>(storage);
let storagesController = new RemoteSourceController<Storage[]>(storages);
console.log(storages);

export enum ListDisplay {
  grid,
  list,
  table,
}

export type AbstractList<E extends Entity> = {
  url: string;
  filterForm?: Form;
};
export type Column = {
  name: string;
  title: Phrase;
  resolver: Resolver<string>;
  linkResolver: Resolver<string>;
};
export type EntityList<E extends Entity> = {
  source: Source<E[]>;
  filterForm?: Form;
  columns: Column[];
  display: ArraySet<ListDisplay>;
};
export type PaginatedList<E extends Entity> = {
  pages: number;
} & EntityList<E>;
