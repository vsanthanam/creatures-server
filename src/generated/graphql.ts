import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type BerriesConnection = {
  __typename?: 'BerriesConnection';
  edges: Array<BerriesEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type BerriesEdge = {
  __typename?: 'BerriesEdge';
  cursor: Scalars['String']['output'];
  node: Berry;
};

export type Berry = Item & NamedResource & {
  __typename?: 'Berry';
  attributes?: Maybe<Array<Maybe<ItemAttribute>>>;
  category?: Maybe<ItemCategory>;
  cost?: Maybe<Scalars['Int']['output']>;
  effects?: Maybe<Array<Maybe<VerboseEffect>>>;
  firmness?: Maybe<BerryFirmness>;
  flavors?: Maybe<Array<Maybe<BerryFlavorPresence>>>;
  flingEffect?: Maybe<FlingEffect>;
  flingPower?: Maybe<Scalars['Int']['output']>;
  growthTime?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  naturalGiftPower?: Maybe<Scalars['Int']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  smoothness?: Maybe<Scalars['Int']['output']>;
  soilDryness?: Maybe<Scalars['Int']['output']>;
  url: Scalars['String']['output'];
};

export type BerryFirmness = NamedResource & {
  __typename?: 'BerryFirmness';
  berries?: Maybe<Array<Maybe<Berry>>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type BerryFlavor = NamedResource & {
  __typename?: 'BerryFlavor';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type BerryFlavorPresence = {
  __typename?: 'BerryFlavorPresence';
  flavor?: Maybe<BerryFlavor>;
  potency?: Maybe<Scalars['Int']['output']>;
};

export type Description = {
  __typename?: 'Description';
  description?: Maybe<Scalars['String']['output']>;
  language?: Maybe<Language>;
};

export type Effect = {
  __typename?: 'Effect';
  effect?: Maybe<Scalars['String']['output']>;
  language?: Maybe<Language>;
};

export type FlingEffect = NamedResource & {
  __typename?: 'FlingEffect';
  effects?: Maybe<Array<Maybe<Effect>>>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<Maybe<Item>>>;
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type GenericItem = Item & NamedResource & {
  __typename?: 'GenericItem';
  attributes?: Maybe<Array<Maybe<ItemAttribute>>>;
  category?: Maybe<ItemCategory>;
  cost?: Maybe<Scalars['Int']['output']>;
  effects?: Maybe<Array<Maybe<VerboseEffect>>>;
  flingEffect?: Maybe<FlingEffect>;
  flingPower?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Item = {
  attributes?: Maybe<Array<Maybe<ItemAttribute>>>;
  category?: Maybe<ItemCategory>;
  cost?: Maybe<Scalars['Int']['output']>;
  effects?: Maybe<Array<Maybe<VerboseEffect>>>;
  flingEffect?: Maybe<FlingEffect>;
  flingPower?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type ItemAttribute = NamedResource & {
  __typename?: 'ItemAttribute';
  descriptions?: Maybe<Array<Maybe<Description>>>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<Maybe<Item>>>;
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type ItemCategory = NamedResource & {
  __typename?: 'ItemCategory';
  id: Scalars['ID']['output'];
  items?: Maybe<Array<Maybe<Item>>>;
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type ItemsConnection = {
  __typename?: 'ItemsConnection';
  edges: Array<ItemsEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type ItemsEdge = {
  __typename?: 'ItemsEdge';
  cursor: Scalars['String']['output'];
  node: Item;
};

export type Language = {
  __typename?: 'Language';
  id: Scalars['ID']['output'];
  iso639?: Maybe<Scalars['String']['output']>;
  iso3166?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  names?: Maybe<Array<Maybe<LanguageName>>>;
  official?: Maybe<Scalars['Boolean']['output']>;
  url: Scalars['String']['output'];
};

export type LanguageName = {
  __typename?: 'LanguageName';
  language?: Maybe<Language>;
  name: Scalars['String']['output'];
};

export type NamedResource = {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  berries: BerriesConnection;
  berry?: Maybe<Berry>;
  item?: Maybe<Item>;
  items: ItemsConnection;
};


export type QueryBerriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryBerryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryItemArgs = {
  id: Scalars['ID']['input'];
};


export type QueryItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type VerboseEffect = {
  __typename?: 'VerboseEffect';
  effect?: Maybe<Scalars['String']['output']>;
  language?: Maybe<Language>;
  shortEffect?: Maybe<Scalars['String']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;




/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  Item:
    | ( Omit<Berry, 'attributes' | 'category' | 'firmness' | 'flingEffect'> & { attributes?: Maybe<Array<Maybe<_RefType['ItemAttribute']>>>, category?: Maybe<_RefType['ItemCategory']>, firmness?: Maybe<_RefType['BerryFirmness']>, flingEffect?: Maybe<_RefType['FlingEffect']> } )
    | ( Omit<GenericItem, 'attributes' | 'category' | 'flingEffect'> & { attributes?: Maybe<Array<Maybe<_RefType['ItemAttribute']>>>, category?: Maybe<_RefType['ItemCategory']>, flingEffect?: Maybe<_RefType['FlingEffect']> } )
  ;
  NamedResource:
    | ( Omit<Berry, 'attributes' | 'category' | 'firmness' | 'flingEffect'> & { attributes?: Maybe<Array<Maybe<_RefType['ItemAttribute']>>>, category?: Maybe<_RefType['ItemCategory']>, firmness?: Maybe<_RefType['BerryFirmness']>, flingEffect?: Maybe<_RefType['FlingEffect']> } )
    | ( Omit<BerryFirmness, 'berries'> & { berries?: Maybe<Array<Maybe<_RefType['Berry']>>> } )
    | ( BerryFlavor )
    | ( Omit<FlingEffect, 'effects' | 'items'> & { effects?: Maybe<Array<Maybe<_RefType['Effect']>>>, items?: Maybe<Array<Maybe<_RefType['Item']>>> } )
    | ( Omit<GenericItem, 'attributes' | 'category' | 'flingEffect'> & { attributes?: Maybe<Array<Maybe<_RefType['ItemAttribute']>>>, category?: Maybe<_RefType['ItemCategory']>, flingEffect?: Maybe<_RefType['FlingEffect']> } )
    | ( Omit<ItemAttribute, 'items'> & { items?: Maybe<Array<Maybe<_RefType['Item']>>> } )
    | ( Omit<ItemCategory, 'items'> & { items?: Maybe<Array<Maybe<_RefType['Item']>>> } )
  ;
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  BerriesConnection: ResolverTypeWrapper<Omit<BerriesConnection, 'edges'> & { edges: Array<ResolversTypes['BerriesEdge']> }>;
  BerriesEdge: ResolverTypeWrapper<Omit<BerriesEdge, 'node'> & { node: ResolversTypes['Berry'] }>;
  Berry: ResolverTypeWrapper<Omit<Berry, 'attributes' | 'category' | 'firmness' | 'flingEffect'> & { attributes?: Maybe<Array<Maybe<ResolversTypes['ItemAttribute']>>>, category?: Maybe<ResolversTypes['ItemCategory']>, firmness?: Maybe<ResolversTypes['BerryFirmness']>, flingEffect?: Maybe<ResolversTypes['FlingEffect']> }>;
  BerryFirmness: ResolverTypeWrapper<Omit<BerryFirmness, 'berries'> & { berries?: Maybe<Array<Maybe<ResolversTypes['Berry']>>> }>;
  BerryFlavor: ResolverTypeWrapper<BerryFlavor>;
  BerryFlavorPresence: ResolverTypeWrapper<BerryFlavorPresence>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Description: ResolverTypeWrapper<Description>;
  Effect: ResolverTypeWrapper<Effect>;
  FlingEffect: ResolverTypeWrapper<Omit<FlingEffect, 'effects' | 'items'> & { effects?: Maybe<Array<Maybe<ResolversTypes['Effect']>>>, items?: Maybe<Array<Maybe<ResolversTypes['Item']>>> }>;
  GenericItem: ResolverTypeWrapper<Omit<GenericItem, 'attributes' | 'category' | 'flingEffect'> & { attributes?: Maybe<Array<Maybe<ResolversTypes['ItemAttribute']>>>, category?: Maybe<ResolversTypes['ItemCategory']>, flingEffect?: Maybe<ResolversTypes['FlingEffect']> }>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Item: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Item']>;
  ItemAttribute: ResolverTypeWrapper<Omit<ItemAttribute, 'items'> & { items?: Maybe<Array<Maybe<ResolversTypes['Item']>>> }>;
  ItemCategory: ResolverTypeWrapper<Omit<ItemCategory, 'items'> & { items?: Maybe<Array<Maybe<ResolversTypes['Item']>>> }>;
  ItemsConnection: ResolverTypeWrapper<Omit<ItemsConnection, 'edges'> & { edges: Array<ResolversTypes['ItemsEdge']> }>;
  ItemsEdge: ResolverTypeWrapper<Omit<ItemsEdge, 'node'> & { node: ResolversTypes['Item'] }>;
  Language: ResolverTypeWrapper<Language>;
  LanguageName: ResolverTypeWrapper<LanguageName>;
  NamedResource: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['NamedResource']>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  VerboseEffect: ResolverTypeWrapper<VerboseEffect>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BerriesConnection: Omit<BerriesConnection, 'edges'> & { edges: Array<ResolversParentTypes['BerriesEdge']> };
  BerriesEdge: Omit<BerriesEdge, 'node'> & { node: ResolversParentTypes['Berry'] };
  Berry: Omit<Berry, 'attributes' | 'category' | 'firmness' | 'flingEffect'> & { attributes?: Maybe<Array<Maybe<ResolversParentTypes['ItemAttribute']>>>, category?: Maybe<ResolversParentTypes['ItemCategory']>, firmness?: Maybe<ResolversParentTypes['BerryFirmness']>, flingEffect?: Maybe<ResolversParentTypes['FlingEffect']> };
  BerryFirmness: Omit<BerryFirmness, 'berries'> & { berries?: Maybe<Array<Maybe<ResolversParentTypes['Berry']>>> };
  BerryFlavor: BerryFlavor;
  BerryFlavorPresence: BerryFlavorPresence;
  Boolean: Scalars['Boolean']['output'];
  Description: Description;
  Effect: Effect;
  FlingEffect: Omit<FlingEffect, 'effects' | 'items'> & { effects?: Maybe<Array<Maybe<ResolversParentTypes['Effect']>>>, items?: Maybe<Array<Maybe<ResolversParentTypes['Item']>>> };
  GenericItem: Omit<GenericItem, 'attributes' | 'category' | 'flingEffect'> & { attributes?: Maybe<Array<Maybe<ResolversParentTypes['ItemAttribute']>>>, category?: Maybe<ResolversParentTypes['ItemCategory']>, flingEffect?: Maybe<ResolversParentTypes['FlingEffect']> };
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Item: ResolversInterfaceTypes<ResolversParentTypes>['Item'];
  ItemAttribute: Omit<ItemAttribute, 'items'> & { items?: Maybe<Array<Maybe<ResolversParentTypes['Item']>>> };
  ItemCategory: Omit<ItemCategory, 'items'> & { items?: Maybe<Array<Maybe<ResolversParentTypes['Item']>>> };
  ItemsConnection: Omit<ItemsConnection, 'edges'> & { edges: Array<ResolversParentTypes['ItemsEdge']> };
  ItemsEdge: Omit<ItemsEdge, 'node'> & { node: ResolversParentTypes['Item'] };
  Language: Language;
  LanguageName: LanguageName;
  NamedResource: ResolversInterfaceTypes<ResolversParentTypes>['NamedResource'];
  PageInfo: PageInfo;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
  VerboseEffect: VerboseEffect;
};

export type BerriesConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['BerriesConnection'] = ResolversParentTypes['BerriesConnection']> = {
  edges?: Resolver<Array<ResolversTypes['BerriesEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};

export type BerriesEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['BerriesEdge'] = ResolversParentTypes['BerriesEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Berry'], ParentType, ContextType>;
};

export type BerryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Berry'] = ResolversParentTypes['Berry']> = {
  attributes?: Resolver<Maybe<Array<Maybe<ResolversTypes['ItemAttribute']>>>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['ItemCategory']>, ParentType, ContextType>;
  cost?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  effects?: Resolver<Maybe<Array<Maybe<ResolversTypes['VerboseEffect']>>>, ParentType, ContextType>;
  firmness?: Resolver<Maybe<ResolversTypes['BerryFirmness']>, ParentType, ContextType>;
  flavors?: Resolver<Maybe<Array<Maybe<ResolversTypes['BerryFlavorPresence']>>>, ParentType, ContextType>;
  flingEffect?: Resolver<Maybe<ResolversTypes['FlingEffect']>, ParentType, ContextType>;
  flingPower?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  growthTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  naturalGiftPower?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  smoothness?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  soilDryness?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BerryFirmnessResolvers<ContextType = any, ParentType extends ResolversParentTypes['BerryFirmness'] = ResolversParentTypes['BerryFirmness']> = {
  berries?: Resolver<Maybe<Array<Maybe<ResolversTypes['Berry']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BerryFlavorResolvers<ContextType = any, ParentType extends ResolversParentTypes['BerryFlavor'] = ResolversParentTypes['BerryFlavor']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BerryFlavorPresenceResolvers<ContextType = any, ParentType extends ResolversParentTypes['BerryFlavorPresence'] = ResolversParentTypes['BerryFlavorPresence']> = {
  flavor?: Resolver<Maybe<ResolversTypes['BerryFlavor']>, ParentType, ContextType>;
  potency?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};

export type DescriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Description'] = ResolversParentTypes['Description']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['Language']>, ParentType, ContextType>;
};

export type EffectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Effect'] = ResolversParentTypes['Effect']> = {
  effect?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['Language']>, ParentType, ContextType>;
};

export type FlingEffectResolvers<ContextType = any, ParentType extends ResolversParentTypes['FlingEffect'] = ResolversParentTypes['FlingEffect']> = {
  effects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Effect']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['Item']>>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenericItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['GenericItem'] = ResolversParentTypes['GenericItem']> = {
  attributes?: Resolver<Maybe<Array<Maybe<ResolversTypes['ItemAttribute']>>>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['ItemCategory']>, ParentType, ContextType>;
  cost?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  effects?: Resolver<Maybe<Array<Maybe<ResolversTypes['VerboseEffect']>>>, ParentType, ContextType>;
  flingEffect?: Resolver<Maybe<ResolversTypes['FlingEffect']>, ParentType, ContextType>;
  flingPower?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = {
  __resolveType: TypeResolveFn<'Berry' | 'GenericItem', ParentType, ContextType>;
};

export type ItemAttributeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ItemAttribute'] = ResolversParentTypes['ItemAttribute']> = {
  descriptions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Description']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['Item']>>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ItemCategory'] = ResolversParentTypes['ItemCategory']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['Item']>>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ItemsConnection'] = ResolversParentTypes['ItemsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ItemsEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};

export type ItemsEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ItemsEdge'] = ResolversParentTypes['ItemsEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Item'], ParentType, ContextType>;
};

export type LanguageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Language'] = ResolversParentTypes['Language']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  iso639?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  iso3166?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  names?: Resolver<Maybe<Array<Maybe<ResolversTypes['LanguageName']>>>, ParentType, ContextType>;
  official?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type LanguageNameResolvers<ContextType = any, ParentType extends ResolversParentTypes['LanguageName'] = ResolversParentTypes['LanguageName']> = {
  language?: Resolver<Maybe<ResolversTypes['Language']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type NamedResourceResolvers<ContextType = any, ParentType extends ResolversParentTypes['NamedResource'] = ResolversParentTypes['NamedResource']> = {
  __resolveType: TypeResolveFn<'Berry' | 'BerryFirmness' | 'BerryFlavor' | 'FlingEffect' | 'GenericItem' | 'ItemAttribute' | 'ItemCategory', ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  berries?: Resolver<ResolversTypes['BerriesConnection'], ParentType, ContextType, Partial<QueryBerriesArgs>>;
  berry?: Resolver<Maybe<ResolversTypes['Berry']>, ParentType, ContextType, RequireFields<QueryBerryArgs, 'id'>>;
  item?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType, RequireFields<QueryItemArgs, 'id'>>;
  items?: Resolver<ResolversTypes['ItemsConnection'], ParentType, ContextType, Partial<QueryItemsArgs>>;
};

export type VerboseEffectResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerboseEffect'] = ResolversParentTypes['VerboseEffect']> = {
  effect?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['Language']>, ParentType, ContextType>;
  shortEffect?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  BerriesConnection?: BerriesConnectionResolvers<ContextType>;
  BerriesEdge?: BerriesEdgeResolvers<ContextType>;
  Berry?: BerryResolvers<ContextType>;
  BerryFirmness?: BerryFirmnessResolvers<ContextType>;
  BerryFlavor?: BerryFlavorResolvers<ContextType>;
  BerryFlavorPresence?: BerryFlavorPresenceResolvers<ContextType>;
  Description?: DescriptionResolvers<ContextType>;
  Effect?: EffectResolvers<ContextType>;
  FlingEffect?: FlingEffectResolvers<ContextType>;
  GenericItem?: GenericItemResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  ItemAttribute?: ItemAttributeResolvers<ContextType>;
  ItemCategory?: ItemCategoryResolvers<ContextType>;
  ItemsConnection?: ItemsConnectionResolvers<ContextType>;
  ItemsEdge?: ItemsEdgeResolvers<ContextType>;
  Language?: LanguageResolvers<ContextType>;
  LanguageName?: LanguageNameResolvers<ContextType>;
  NamedResource?: NamedResourceResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  VerboseEffect?: VerboseEffectResolvers<ContextType>;
};

