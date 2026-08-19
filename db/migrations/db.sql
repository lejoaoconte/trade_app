create schema if not exists tradeapp;

create table if not exists tradeapp.account (
    account_id uuid,
    name text,
    email text,
    document text,
    password text,
    primary key (account_id)
);

create table if not exists tradeapp.balance (
    account_id uuid,
    asset_id text,
    quantity numeric,
    primary key (account_id, asset_id)
);

create table if not exists tradeapp.order (
    order_id uuid,
    market_id text,
    account_id uuid,
    side text,
    quantity numeric,
    price numeric,
    fill_quantity numeric,
    fill_price numeric,
    status text,
    timestamp timestamptz,
    primary key (order_id)
);

create table if not exists tradeapp.trade (
    trade_id uuid,
    market_id text,
    buy_order_id uuid,
    sell_order_id uuid,
    side text,
    quantity numeric,
    price numeric,
    timestamp timestamptz,
    primary key (trade_id)
);