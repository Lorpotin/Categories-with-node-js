CREATE TABLE Category (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
	parent_id INTEGER,
    FOREIGN KEY (parent_id) REFERENCES Category(id)
);
CREATE INDEX section_parent_id_idx ON Category (parent_id);

CREATE TABLE public.item
(
    id integer NOT NULL DEFAULT nextval('item_id_seq'::regclass),
    name text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    category_id integer,
    CONSTRAINT item_pkey PRIMARY KEY (id),
    CONSTRAINT item_category_id_fkey FOREIGN KEY (category_id)
        REFERENCES public.category (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)