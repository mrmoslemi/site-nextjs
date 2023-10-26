import { Entity, Data, Related, TreeNode, DateTime } from "@/lib/core/data";
import { Phrase } from "../core/dictionary";
/**
 * Address types
 * Province, City, District, Address, 
 * foreign key (strong) : City to Province, District to City
 * foreign key (weak): Address to City, District and Province
 */
export type Province = Entity & {
  name: Phrase;
  cities: Related<City[]>;
};

export type City = Entity & {
  name: Phrase;
  province: Related<Province>;
  districts: Related<District[]>;
};

export type District = Entity & {
  name: Phrase;
  city: Related<City>;
};

export type Address = Entity & {
  province: Related<Province>;
  city: Related<City>;
  district: Related<District>;
  text: Phrase;
  postal_code: string;
};

/**
 * Auth types
 * User, Group, Permission, Credential(+Type)
 * many to many example User and Group
 * foreign key (weak): Credential to User
 * tree example: Permission
 * enum example: CredentialType
 */

export type User = Entity & {
  username: string;
  password: string;
  permissions: TreeNode<Permission>;
  credentials: Related<Credential[]>;
  groups: Related<Group[]>;
};

export type Group = Entity & {
  title: Phrase;
  users: Related<User[]>;
};

export type Permission = Entity & {
  key: string;
  title: Phrase;
};
export type Credential = Data & {
  type: CredentialType;
  value: string;
};
export type CredentialType = "mobile" | "email";


/**
 * Profiles types
 *
 */
export type Profile = Entity & {
  first_name: string;
  last_name: string;
  address: Related<Address>;
};

export type Appointment = {
  owner: Profile;
  time: DateTime;
  notes: Related<Note[]>;
};

export type Note = Entity & {
  appointment: Appointment;
  writer: Profile;
  is_respond: boolean;
};
